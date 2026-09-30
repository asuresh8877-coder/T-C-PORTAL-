#!/usr/bin/env python3
"""WEPL T&C Portal local server: static files + shared login store."""
from __future__ import print_function

import json
import os
import socket
import sys
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
AUTH_FILE = DATA / "auth.json"
PORT = int(os.environ.get("PORT", "8080"))
MAX_AUTH_BODY = 2_000_000


def read_auth():
    if not AUTH_FILE.is_file():
        return {"users": [], "notifications": []}
    try:
        data = json.loads(AUTH_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {"users": [], "notifications": []}
    if not isinstance(data, dict) or not isinstance(data.get("users"), list):
        return {"users": [], "notifications": []}
    if not isinstance(data.get("notifications"), list):
        data["notifications"] = []
    return data


def write_auth(data):
    DATA.mkdir(parents=True, exist_ok=True)
    tmp = AUTH_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(AUTH_FILE)


class PortalHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args))

    def _api_path(self):
        return urlparse(self.path).path.rstrip("/") or "/"

    def _blocked_static(self, rel):
        rel = rel.replace("\\", "/").lstrip("/").lower()
        if rel == "api/directory.json":
            return True
        return rel == "data" or rel.startswith("data/")

    def translate_path(self, path):
        mapped = super().translate_path(path)
        try:
            rel = os.path.relpath(mapped, str(ROOT))
        except ValueError:
            return str(ROOT / "__no_such_file__")
        if self._blocked_static(rel):
            return str(ROOT / "__no_such_file__")
        return mapped

    def _send_bytes(self, code, body, content_type):
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _send_json(self, code, obj):
        self._send_bytes(code, json.dumps(obj, ensure_ascii=False), "application/json; charset=utf-8")

    def do_GET(self):
        if self._api_path() == "/api/auth":
            self._send_json(200, read_auth())
            return
        super().do_GET()

    def do_HEAD(self):
        if self._api_path() == "/api/auth":
            body = json.dumps(read_auth(), ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return
        super().do_HEAD()

    def do_POST(self):
        if self._api_path() != "/api/auth":
            self.send_error(501, "Unsupported method")
            return
        length = 0
        try:
            length = int(self.headers.get("Content-Length", "0") or "0")
        except ValueError:
            length = 0
        if length < 0 or length > MAX_AUTH_BODY:
            self._send_json(400, {"ok": False, "error": "Invalid request."})
            return
        raw = self.rfile.read(length) if length else b""
        try:
            data = json.loads(raw.decode("utf-8") or "{}")
        except Exception:
            self._send_json(400, {"ok": False, "error": "Invalid JSON."})
            return
        if not isinstance(data, dict) or not isinstance(data.get("users"), list):
            self._send_json(400, {"ok": False, "error": "Invalid auth store."})
            return
        if not isinstance(data.get("notifications"), list):
            data["notifications"] = []
        try:
            write_auth(data)
        except Exception:
            self._send_json(500, {"ok": False, "error": "Could not save login data."})
            return
        self._send_json(200, {"ok": True})


def trial_links():
    links = []
    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None, socket.AF_INET):
            ip = info[4][0]
            if ip.startswith("127."):
                continue
            link = "http://%s:%s/" % (ip, PORT)
            if link not in links:
                links.append(link)
    except Exception:
        pass
    return links


def main():
    os.chdir(str(ROOT))
    DATA.mkdir(parents=True, exist_ok=True)
    server = None
    last_err = None
    for attempt in range(8):
        try:
            server = ThreadingHTTPServer(("0.0.0.0", PORT), PortalHandler)
            break
        except OSError as e:
            last_err = e
            time.sleep(0.4)
    if server is None:
        print("ERROR: Could not start on port %s. %s" % (PORT, last_err), flush=True)
        sys.exit(1)
    print("This computer: http://127.0.0.1:%s/" % PORT, flush=True)
    links = trial_links()
    if links:
        print("Trial link for Android, iPhone, and other laptops on this Wi-Fi:", flush=True)
        for link in links:
            print("  %s" % link, flush=True)
    else:
        print("No Wi-Fi address found. Phones can open the portal only on this computer.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

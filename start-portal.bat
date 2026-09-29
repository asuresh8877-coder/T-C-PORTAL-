@echo off
setlocal DisableDelayedExpansion
cd /d "%~dp0"

set "PORT=8080"
set "URL=http://127.0.0.1:%PORT%/"

title WEPL T^&C Portal
echo.
echo ========================================
echo   WEPL T^&C Portal
echo ========================================
echo.
echo Starting the local portal server...
echo The portal opens in Google Chrome.
echo.

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /I /C:":%PORT% " ^| findstr /I "LISTENING"') do (
  echo Port %PORT% was already in use. Closing the old process %%P ...
  taskkill /PID %%P /F >nul 2>&1
)
timeout /t 1 /nobreak >nul

set "PY="
py -3 -c "import http.server" >nul 2>&1
if not errorlevel 1 set "PY=py -3"
if not defined PY (
  python -c "import http.server" >nul 2>&1
  if not errorlevel 1 set "PY=python"
)

echo Open on this computer: %URL%
echo Android, iPhone, and other laptops on the same Wi-Fi use the trial link printed below.
echo.
echo Leave this window open while you use the portal.
echo Press Ctrl+C to stop the server.
echo.

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if defined CHROME (
  start "" cmd /c timeout /t 1 /nobreak ^>nul ^& start "" "%CHROME%" %URL%
) else (
  start "" cmd /c timeout /t 1 /nobreak ^>nul ^& start chrome %URL%
)

if defined PY (
  %PY% "%~dp0portal_server.py"
  exit /b %errorlevel%
)

echo Python was not found. Using the built-in Windows server instead.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$p='%~f0'; $lines=Get-Content -LiteralPath $p; $hit=$lines | Select-String -Pattern '^:::POWERSHELL:::$' | Select-Object -First 1; if(-not $hit){ Write-Host 'Internal error: server script missing.'; exit 1 }; Invoke-Expression (($lines | Select-Object -Skip $hit.LineNumber) -join [Environment]::NewLine)"
exit /b %errorlevel%

:::POWERSHELL:::
$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$port = 8080
$prefix = "http://127.0.0.1:$port/"
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.htm'  = 'text/html; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.csv'  = 'text/csv; charset=utf-8'
  '.txt'  = 'text/plain; charset=utf-8'
  '.pdf'  = 'application/pdf'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.xlsx' = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  '.xls'  = 'application/vnd.ms-excel'
  '.docx' = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  '.doc'  = 'application/msword'
  '.pptx' = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  '.zip'  = 'application/zip'
  '.wasm' = 'application/wasm'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
} catch {
  Write-Host "ERROR: Port $port is already in use or could not be bound."
  Write-Host $_.Exception.Message
  exit 1
}
$rootFull = [IO.Path]::GetFullPath($root).TrimEnd('\') + '\'
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    try {
      $path = [Uri]::UnescapeDataString($req.Url.LocalPath)
      if ($path -eq '/api/auth' -or $path -eq '/api/auth/') {
        $dataDir = Join-Path $root 'data'
        $authFile = Join-Path $dataDir 'auth.json'
        New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
        if ($req.HttpMethod -eq 'GET' -or $req.HttpMethod -eq 'HEAD') {
          if (Test-Path -LiteralPath $authFile -PathType Leaf) {
            $bytes = [IO.File]::ReadAllBytes($authFile)
          } else {
            $bytes = [Text.Encoding]::UTF8.GetBytes('{"users":[],"notifications":[]}')
          }
          $res.StatusCode = 200
          $res.ContentType = 'application/json; charset=utf-8'
          $res.Headers.Add('Cache-Control', 'no-store')
          $res.ContentLength64 = $bytes.Length
          if ($req.HttpMethod -ne 'HEAD') {
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
          }
          $res.Close()
          continue
        }
        if ($req.HttpMethod -eq 'POST') {
          $reader = New-Object IO.StreamReader($req.InputStream, [Text.Encoding]::UTF8)
          $body = $reader.ReadToEnd()
          $reader.Close()
          $parsed = $body | ConvertFrom-Json
          if (-not $parsed -or $null -eq $parsed.users) { throw 'Invalid auth store.' }
          [IO.File]::WriteAllText($authFile, $body, [Text.UTF8Encoding]::new($false))
          $bytes = [Text.Encoding]::UTF8.GetBytes('{"ok":true}')
          $res.StatusCode = 200
          $res.ContentType = 'application/json; charset=utf-8'
          $res.Headers.Add('Cache-Control', 'no-store')
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
          $res.Close()
          continue
        }
        $res.StatusCode = 405
        $res.Close()
        continue
      }
      if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
      $rel = $path.TrimStart('/').Replace('/', '\')
      if ($rel -eq 'data' -or $rel.StartsWith('data\')) {
        $res.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes('Not found')
        $res.ContentType = 'text/plain; charset=utf-8'
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        $res.Close()
        continue
      }
      $full = [IO.Path]::GetFullPath((Join-Path $root $rel))
      if (-not $full.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
        $res.StatusCode = 403
        $res.Close()
        continue
      }
      if (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
        $res.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes('Not found')
        $res.ContentType = 'text/plain; charset=utf-8'
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        $res.Close()
        continue
      }
      $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
      $ctype = $mime[$ext]
      if (-not $ctype) { $ctype = 'application/octet-stream' }
      $bytes = [IO.File]::ReadAllBytes($full)
      $res.StatusCode = 200
      $res.ContentType = $ctype
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      $res.Close()
    } catch {
      try {
        $res.StatusCode = 500
        $res.Close()
      } catch { }
    }
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}

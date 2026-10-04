
    (function () {
      'use strict';

      // =========================================================================
      // 1. DATA STATE & PRESETS
      // =========================================================================
      let currentUnit = 'm';
      let currentTool = 'select'; // 'select' or 'draw'
      let isDrawing = false;
      let drawPoints = [];
      let currentHoverWorldPos = null;
      let snapGridSizeMeters = 0.1;

      // 3D Viewport Flags & Material State
      let showCeiling = true;
      let isAutoRotating = true;
      let selectedWallMaterialType = 'blueprint';

      // Geometric Presets
      const PRESETS = {
        lshape_wepl: [
          { x: 0.000, y: 0.000 },
          { x: 0.000, y: 7.761 },
          { x: 3.849, y: 7.761 },
          { x: 3.849, y: 2.914 },
          { x: 2.030, y: 2.914 },
          { x: 2.030, y: 0.000 }
        ],
        ushape: [
          { x: 0.000, y: 0.000 },
          { x: 0.000, y: 6.000 },
          { x: 6.000, y: 6.000 },
          { x: 6.000, y: 0.000 },
          { x: 4.200, y: 0.000 },
          { x: 4.200, y: 3.800 },
          { x: 1.800, y: 3.800 },
          { x: 1.800, y: 0.000 }
        ],
        rectangle: [
          { x: 0.000, y: 0.000 },
          { x: 0.000, y: 6.000 },
          { x: 8.000, y: 6.000 },
          { x: 8.000, y: 0.000 }
        ],
        tshape: [
          { x: 2.000, y: 0.000 },
          { x: 2.000, y: 3.500 },
          { x: 0.000, y: 3.500 },
          { x: 0.000, y: 6.500 },
          { x: 6.000, y: 6.500 },
          { x: 6.000, y: 3.500 },
          { x: 4.000, y: 3.500 },
          { x: 4.000, y: 0.000 }
        ],
        octagon: [
          { x: 1.750, y: 0.000 },
          { x: 0.000, y: 1.750 },
          { x: 0.000, y: 4.250 },
          { x: 1.750, y: 6.000 },
          { x: 4.250, y: 6.000 },
          { x: 6.000, y: 4.250 },
          { x: 6.000, y: 1.750 },
          { x: 4.250, y: 0.000 }
        ]
      };

      let vertices = JSON.parse(JSON.stringify(PRESETS.lshape_wepl));
      let selectedEdgeIndex = -1;

      // =========================================================================
      // 2. DOM REFERENCES
      // =========================================================================
      const inputProjectName = document.getElementById('inputProjectName');
      const inputRoomName = document.getElementById('inputRoomName');

      const unitBtnM = document.getElementById('unitM');
      const unitBtnMM = document.getElementById('unitMM');
      const unitLabels = document.querySelectorAll('.unit-label');
      const selectRoomPreset = document.getElementById('selectRoomPreset');

      const inputHeight = document.getElementById('inputHeight');
      const inputSpecMultiplier = document.getElementById('specMultiplier');
      const selectSpecMode = document.getElementById('specMode');
      const badgeMultiplier = document.getElementById('badgeMultiplier');

      // Results Elements
      const resTotalSurfaceArea = document.getElementById('resTotalSurfaceArea');
      const resSpecFlowRate = document.getElementById('resSpecFlowRate');
      const resLeakRate = document.getElementById('resLeakRate');
      const resFlowLs = document.getElementById('resFlowLs');
      const resFloorCeilingArea = document.getElementById('resFloorCeilingArea');
      const resSingleFloorArea = document.getElementById('resSingleFloorArea');
      const resWallArea = document.getElementById('resWallArea');
      const resPerimeterStat = document.getElementById('resPerimeterStat');
      const resRoomVolume = document.getElementById('resRoomVolume');
      const resRoomVolumeCuFt = document.getElementById('resRoomVolumeCuFt');
      const statPerimeter2D = document.getElementById('statPerimeter2D');
      const statPointCount = document.getElementById('statPointCount');
      const statWallArea3D = document.getElementById('statWallArea3D');
      const hud3DVolume = document.getElementById('hud3DVolume');
      const hudWallMaterialLabel = document.getElementById('hudWallMaterialLabel');
      const tableSummaryPerimeter = document.getElementById('tableSummaryPerimeter');

      // Math Proof Elements
      const mathStep1 = document.getElementById('mathStep1');
      const mathStep2 = document.getElementById('mathStep2');
      const mathStep3 = document.getElementById('mathStep3');
      const mathStep4 = document.getElementById('mathStep4');
      const mathStep5 = document.getElementById('mathStep5');

      // Table body
      const wallTableBody = document.getElementById('wallTableBody');

      // 2D Canvas Elements
      const canvas2D = document.getElementById('cadCanvas2D');
      const ctx2D = canvas2D.getContext('2d');
      const container2D = document.getElementById('canvasContainer2D');
      const canvasCoordReadout = document.getElementById('canvasCoordReadout');
      const canvasZoomReadout = document.getElementById('canvasZoomReadout');
      const canvasToast = document.getElementById('canvasToast');

      // 2D Tool Buttons
      const toolSelectBtn = document.getElementById('toolSelect');
      const toolDrawBtn = document.getElementById('toolDraw');
      const btnToggleSnap = document.getElementById('btnToggleSnap');
      const snapStatusText = document.getElementById('snapStatusText');
      const btnFit2D = document.getElementById('btnFit2D');
      const drawModeBanner = document.getElementById('drawModeBanner');
      const drawBannerText = document.getElementById('drawBannerText');
      const btnFinishDraw = document.getElementById('btnFinishDraw');
      const btnCancelDraw = document.getElementById('btnCancelDraw');

      // 3D Viewport Controls & Material Dropdown
      const container3D = document.getElementById('container3D');
      const selectWallMaterial = document.getElementById('selectWallMaterial');
      const btnToggleSpin = document.getElementById('btnToggleSpin');
      const spinStateText = document.getElementById('spinStateText');
      const btnViewIso = document.getElementById('btnViewIso');
      const btnViewTop = document.getElementById('btnViewTop');
      const btnViewFront = document.getElementById('btnViewFront');
      const btnToggleCeiling = document.getElementById('btnToggleCeiling');
      const ceilingStateText = document.getElementById('ceilingStateText');

      // Modal Elements
      const dimModal = document.getElementById('dimModal');
      const modalWallIdBadge = document.getElementById('modalWallIdBadge');
      const modalWallTitle = document.getElementById('modalWallTitle');
      const modalDimInput = document.getElementById('modalDimInput');
      const btnDimModalClose = document.getElementById('btnDimModalClose');
      const btnDimModalCancel = document.getElementById('btnDimModalCancel');
      const btnDimModalApply = document.getElementById('btnDimModalApply');

      // Top Actions
      const btnReset = document.getElementById('btnReset');
      const btnCopyReport = document.getElementById('btnCopyReport');
      const copyBtnText = document.getElementById('copyBtnText');
      const btnExportPDF = document.getElementById('btnExportPDF');
      const btnCloseRoom = document.getElementById('btnCloseRoom');
      if (btnCloseRoom) {
        btnCloseRoom.addEventListener('click', function () {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: 'wepl-close-room' }, '*');
            return;
          }
          if (window.opener) {
            window.close();
            return;
          }
          window.location.href = 'index.html';
        });
      }

      // =========================================================================
      // 3. MATHEMATICAL & GEOMETRIC CALCULATIONS
      // =========================================================================
      function calculateShoelaceArea(pts) {
        if (!pts || pts.length < 3) return 0;
        let area = 0;
        const n = pts.length;
        for (let i = 0; i < n; i++) {
          const j = (i + 1) % n;
          area += pts[i].x * pts[j].y;
          area -= pts[j].x * pts[i].y;
        }
        return Math.abs(area) / 2.0;
      }

      function calculateCentroid(pts) {
        if (!pts || pts.length === 0) return { x: 0, y: 0 };
        let cx = 0, cy = 0;
        pts.forEach(p => { cx += p.x; cy += p.y; });
        return { x: cx / pts.length, y: cy / pts.length };
      }

      function calculatePerimeterAndEdges(pts) {
        if (!pts || pts.length < 2) return { perimeter: 0, edges: [] };
        let perimeter = 0;
        const edges = [];
        const n = pts.length;

        for (let i = 0; i < n; i++) {
          const j = (i + 1) % n;
          const dx = pts[j].x - pts[i].x;
          const dy = pts[j].y - pts[i].y;
          const len = Math.sqrt(dx * dx + dy * dy);
          perimeter += len;

          const label = String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : '');
          edges.push({
            index: i,
            label: `Wall ${label}`,
            tag: label.toLowerCase(),
            p1: pts[i],
            p2: pts[j],
            length: len,
            dx: dx,
            dy: dy
          });
        }
        return { perimeter, edges };
      }

      function format3(val) {
        if (isNaN(val)) return '0.000';
        return (Math.round((val + Number.EPSILON) * 1000) / 1000).toFixed(3);
      }

      function toDisplayUnit(valInMeters) {
        return currentUnit === 'mm' ? (valInMeters * 1000).toFixed(0) : format3(valInMeters);
      }

      function getClearHeight() {
        const val = parseFloat(inputHeight.value);
        if (isNaN(val) || val <= 0) return 2.7;
        return currentUnit === 'mm' ? val / 1000 : val;
      }

      // Clean ASCII string sanitizer for jsPDF
      function sanitizeForPdf(str) {
        if (!str) return '';
        return String(str)
          .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu, '')
          .replace(/∑/g, 'Sum of ')
          .replace(/→/g, ' to ')
          .replace(/×/g, 'x')
          .replace(/²/g, ' sq.m')
          .replace(/³/g, ' cu.m')
          .replace(/·/g, '-')
          .replace(/●/g, '')
          .replace(/Ø=ÜÍ/g, '')
          .replace(/Ø<ßâ/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      }

      // =========================================================================
      // 4. CORE ENGINE RECALCULATION & UI UPDATE
      // =========================================================================
      function updateCalculations() {
        const h = getClearHeight();
        const { perimeter, edges } = calculatePerimeterAndEdges(vertices);
        const singleFloorArea = calculateShoelaceArea(vertices);
        const totalFloorCeilingArea = singleFloorArea * 2;
        const totalWallArea = perimeter * h;
        const combinedTotalSurfaceArea = totalFloorCeilingArea + totalWallArea;
        const roomVolume = singleFloorArea * h;

        const multiplier = parseFloat(inputSpecMultiplier.value) || 0;
        const mode = selectSpecMode.value;

        let flowCMH = 0;
        if (mode === 'ach') {
          flowCMH = roomVolume * multiplier;
          badgeMultiplier.textContent = `${multiplier.toFixed(1)} ACH`;
        } else {
          flowCMH = combinedTotalSurfaceArea * multiplier;
          badgeMultiplier.textContent = `× ${multiplier.toFixed(1)}`;
        }

        const leakCMH = flowCMH * 0.10;
        const flowLs = flowCMH / 3.6;
        const roomVolumeCuFt = roomVolume * 35.3147;

        // Update Dashboard
        resTotalSurfaceArea.textContent = format3(combinedTotalSurfaceArea);
        resSpecFlowRate.textContent = format3(flowCMH);
        if (resLeakRate) resLeakRate.textContent = format3(leakCMH);
        resFlowLs.textContent = `${format3(flowLs)} L/s`;

        resFloorCeilingArea.textContent = `${format3(totalFloorCeilingArea)} m²`;
        resSingleFloorArea.textContent = `Floor: ${format3(singleFloorArea)} m²`;
        resWallArea.textContent = `${format3(totalWallArea)} m²`;
        resPerimeterStat.textContent = `P: ${format3(perimeter)} m`;
        resRoomVolume.textContent = `${format3(roomVolume)} m³`;
        resRoomVolumeCuFt.textContent = `${format3(roomVolumeCuFt)} ft³`;

        statPerimeter2D.textContent = `Perimeter: ${format3(perimeter)} m`;
        statPointCount.textContent = `${vertices.length} Vertices`;
        statWallArea3D.textContent = `Wall Surface: ${format3(totalWallArea)} m²`;
        hud3DVolume.textContent = `V = ${format3(roomVolume)} m³`;
        tableSummaryPerimeter.textContent = `Perimeter: ${format3(perimeter)} m (${format3(perimeter * (currentUnit === 'mm' ? 1000 : 1))} ${currentUnit})`;

        mathStep1.textContent = `A_floor = ${format3(singleFloorArea)} m² → A_floor/ceiling = 2 × ${format3(singleFloorArea)} = ${format3(totalFloorCeilingArea)} m²`;
        mathStep2.textContent = `P = ∑(wall lengths) = ${format3(perimeter)} m`;
        mathStep3.textContent = `A_walls = ${format3(perimeter)} m × ${format3(h)} m = ${format3(totalWallArea)} m²`;
        mathStep4.textContent = `A_total = ${format3(totalFloorCeilingArea)} + ${format3(totalWallArea)} = ${format3(combinedTotalSurfaceArea)} m²`;
        mathStep5.textContent = `Spec Flow Rate = ${format3(combinedTotalSurfaceArea)} m² × ${multiplier} = ${format3(flowCMH)} CMH · Available Leak Rate = ${format3(leakCMH)} CMH`;

        renderWallTable(edges, h);
        draw2DCanvas();
        update3DGeometry();
      }

      function renderWallTable(edges, h) {
        wallTableBody.innerHTML = '';
        edges.forEach((edge, idx) => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-blue-50/50 transition-colors';

          const wallArea = edge.length * h;
          const unitSym = currentUnit;
          const displayLen = toDisplayUnit(edge.length);
          const displayH = toDisplayUnit(h);
          const p1X = toDisplayUnit(edge.p1.x);
          const p1Y = toDisplayUnit(edge.p1.y);
          const p2X = toDisplayUnit(edge.p2.x);
          const p2Y = toDisplayUnit(edge.p2.y);

          row.innerHTML = `
            <td class="py-2.5 px-3 font-bold text-blue-700 flex items-center space-x-1.5">
              <span class="w-5 h-5 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">${edge.tag.toUpperCase()}</span>
              <span>${edge.label}</span>
            </td>
            <td class="py-2.5 px-3 text-slate-500">(${p1X}, ${p1Y})</td>
            <td class="py-2.5 px-3 text-slate-500">(${p2X}, ${p2Y})</td>
            <td class="py-2.5 px-3 font-bold text-slate-900">
              <input type="number" step="any" min="0.001" class="wall-len-input w-[4.5rem] bg-white border border-slate-300 rounded-md px-1.5 py-1 text-xs font-bold text-slate-900 outline-none focus:border-blue-600" value="${displayLen}" data-edge="${idx}" title="Type the wall length, then press Enter">
              <span class="ml-1 text-slate-500">${unitSym}</span>
            </td>
            <td class="py-2.5 px-3 text-slate-600">${displayH} ${unitSym}</td>
            <td class="py-2.5 px-3 font-bold text-indigo-700">${format3(wallArea)} m²</td>
            <td class="py-2.5 px-3 text-right">
              <button type="button" class="btn-edit-dim px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-md transition shadow-2xs cursor-pointer" data-edge="${idx}">
                ✏️ Edit Length
              </button>
            </td>
          `;
          wallTableBody.appendChild(row);
        });

        wallTableBody.querySelectorAll('.btn-edit-dim').forEach(btn => {
          btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-edge'), 10);
            openDimensionModal(idx);
          });
        });
        wallTableBody.querySelectorAll('.wall-len-input').forEach(input => {
          input.addEventListener('click', function (e) { e.stopPropagation(); });
          input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.blur();
            }
          });
          input.addEventListener('change', function () {
            const idx = parseInt(this.getAttribute('data-edge'), 10);
            setWallLengthFromDisplay(idx, this.value);
          });
        });
      }

      // =========================================================================
      // 5. DIRECT DIMENSION EDITING MODAL
      // =========================================================================
      function openDimensionModal(edgeIndex) {
        const { edges } = calculatePerimeterAndEdges(vertices);
        if (edgeIndex < 0 || edgeIndex >= edges.length) return;

        selectedEdgeIndex = edgeIndex;
        const edge = edges[edgeIndex];

        modalWallIdBadge.textContent = edge.tag.toUpperCase();
        modalWallTitle.textContent = `Edit ${edge.label} Length`;
        modalDimInput.value = currentUnit === 'mm' ? Math.round(edge.length * 1000) : format3(edge.length);

        dimModal.classList.remove('hidden');
        modalDimInput.focus();
        modalDimInput.select();
      }

      function closeDimensionModal() {
        dimModal.classList.add('hidden');
        selectedEdgeIndex = -1;
      }

      function setWallLengthFromDisplay(edgeIndex, raw) {
        const val = parseFloat(raw);
        if (isNaN(val) || val <= 0) {
          alert('Please enter a valid positive wall length.');
          updateCalculations();
          return;
        }
        const targetLengthMeters = currentUnit === 'mm' ? val / 1000 : val;
        const n = vertices.length;
        const i = edgeIndex;
        if (i < 0 || i >= n) return;
        const j = (i + 1) % n;

        const p1 = vertices[i];
        const p2 = vertices[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const currentLen = Math.sqrt(dx * dx + dy * dy);

        if (currentLen < 0.0001) {
          vertices[j].x = p1.x + targetLengthMeters;
          vertices[j].y = p1.y;
        } else {
          const unitX = dx / currentLen;
          const unitY = dy / currentLen;
          vertices[j].x = p1.x + unitX * targetLengthMeters;
          vertices[j].y = p1.y + unitY * targetLengthMeters;
        }

        closeDimensionModal();
        updateCalculations();
      }

      function applyNewDimension() {
        if (selectedEdgeIndex === -1) return;
        setWallLengthFromDisplay(selectedEdgeIndex, modalDimInput.value);
      }

      btnDimModalApply.addEventListener('click', applyNewDimension);
      btnDimModalCancel.addEventListener('click', closeDimensionModal);
      btnDimModalClose.addEventListener('click', closeDimensionModal);
      modalDimInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyNewDimension();
        if (e.key === 'Escape') closeDimensionModal();
      });

      // =========================================================================
      // 6. 2D INTERACTIVE CAD CANVAS ENGINE (OUTWARD BADGES)
      // =========================================================================
      let panX = 70;
      let panY = 70;
      let zoom = 36;
      let isDraggingVertex = false;
      let draggedVertexIndex = -1;
      let isPanning = false;
      let lastPointerPos = { x: 0, y: 0 };
      let hoveredVertexIndex = -1;
      let hoveredEdgeIndex = -1;
      let isHoveringClosingTarget = false;

      function worldToScreen(wx, wy) {
        const dpr = window.devicePixelRatio || 1;
        return {
          x: panX + wx * zoom,
          y: (canvas2D.height / dpr) - (panY + wy * zoom)
        };
      }

      function screenToWorld(sx, sy) {
        const dpr = window.devicePixelRatio || 1;
        return {
          x: (sx - panX) / zoom,
          y: ((canvas2D.height / dpr) - sy - panY) / zoom
        };
      }

      function snap(val) {
        return Math.round(val / snapGridSizeMeters) * snapGridSizeMeters;
      }

      function resizeCanvas() {
        const rect = container2D.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        const dpr = window.devicePixelRatio || 1;
        canvas2D.width = rect.width * dpr;
        canvas2D.height = rect.height * dpr;
        ctx2D.setTransform(1, 0, 0, 1, 0, 0);
        ctx2D.scale(dpr, dpr);
        draw2DCanvas();
      }

      window.addEventListener('resize', resizeCanvas);

      function fit2DView() {
        const activePts = isDrawing && drawPoints.length > 0 ? drawPoints : vertices;
        if (!activePts || activePts.length === 0) return;

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        activePts.forEach(p => {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        });

        const roomW = Math.max(maxX - minX, 2);
        const roomH = Math.max(maxY - minY, 2);
        const cw = container2D.clientWidth;
        const ch = container2D.clientHeight;

        const padding = 110;
        const zoomX = (cw - padding * 2) / roomW;
        const zoomY = (ch - padding * 2) / roomH;
        zoom = Math.min(Math.max(Math.min(zoomX, zoomY), 15), 90);

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;

        panX = cw / 2 - midX * zoom;
        panY = ch / 2 - midY * zoom;

        canvasZoomReadout.textContent = `Zoom: ${Math.round((zoom / 36) * 100)}%`;
        draw2DCanvas();
      }

      function draw2DCanvas() {
        const cw = container2D.clientWidth;
        const ch = container2D.clientHeight;
        if (cw <= 0 || ch <= 0) return;

        // Clean Background
        ctx2D.fillStyle = '#f8fafc';
        ctx2D.fillRect(0, 0, cw, ch);

        // Architectural Grid
        const gridSpacingMeters = zoom > 50 ? 0.5 : (zoom > 25 ? 1.0 : 2.0);
        const startWorld = screenToWorld(0, ch);
        const endWorld = screenToWorld(cw, 0);

        ctx2D.lineWidth = 0.6;
        ctx2D.strokeStyle = '#e2e8f0';

        ctx2D.beginPath();
        for (let x = Math.floor(startWorld.x / gridSpacingMeters) * gridSpacingMeters; x <= endWorld.x; x += gridSpacingMeters) {
          const s = worldToScreen(x, 0);
          ctx2D.moveTo(s.x, 0);
          ctx2D.lineTo(s.x, ch);
        }
        for (let y = Math.floor(startWorld.y / gridSpacingMeters) * gridSpacingMeters; y <= endWorld.y; y += gridSpacingMeters) {
          const s = worldToScreen(0, y);
          ctx2D.moveTo(0, s.y);
          ctx2D.lineTo(cw, s.y);
        }
        ctx2D.stroke();

        // Origin Axes
        const origin = worldToScreen(0, 0);
        ctx2D.lineWidth = 1.5;
        ctx2D.strokeStyle = '#f87171';
        ctx2D.beginPath();
        ctx2D.moveTo(origin.x, origin.y);
        ctx2D.lineTo(origin.x + 35, origin.y);
        ctx2D.stroke();

        ctx2D.strokeStyle = '#34d399';
        ctx2D.beginPath();
        ctx2D.moveTo(origin.x, origin.y);
        ctx2D.lineTo(origin.x, origin.y - 35);
        ctx2D.stroke();

        // -----------------------------------------------------------------------
        // DRAWING MODE
        // -----------------------------------------------------------------------
        if (isDrawing) {
          if (drawPoints.length >= 2) {
            ctx2D.beginPath();
            const first = worldToScreen(drawPoints[0].x, drawPoints[0].y);
            ctx2D.moveTo(first.x, first.y);
            for (let i = 1; i < drawPoints.length; i++) {
              const s = worldToScreen(drawPoints[i].x, drawPoints[i].y);
              ctx2D.lineTo(s.x, s.y);
            }
            ctx2D.lineWidth = 3;
            ctx2D.strokeStyle = '#2563eb';
            ctx2D.stroke();
          }

          // Rubberband Preview Line
          if (drawPoints.length >= 1 && currentHoverWorldPos) {
            const lastPt = drawPoints[drawPoints.length - 1];
            const pLastScreen = worldToScreen(lastPt.x, lastPt.y);

            let targetScreen = worldToScreen(currentHoverWorldPos.x, currentHoverWorldPos.y);
            let targetWorld = currentHoverWorldPos;

            if (drawPoints.length >= 3 && isHoveringClosingTarget) {
              targetScreen = worldToScreen(drawPoints[0].x, drawPoints[0].y);
              targetWorld = drawPoints[0];
            }

            ctx2D.beginPath();
            ctx2D.setLineDash([5, 5]);
            ctx2D.moveTo(pLastScreen.x, pLastScreen.y);
            ctx2D.lineTo(targetScreen.x, targetScreen.y);
            ctx2D.lineWidth = 2;
            ctx2D.strokeStyle = isHoveringClosingTarget ? '#059669' : '#d97706';
            ctx2D.stroke();
            ctx2D.setLineDash([]);

            const rdx = targetWorld.x - lastPt.x;
            const rdy = targetWorld.y - lastPt.y;
            const rLen = Math.sqrt(rdx * rdx + rdy * rdy);

            if (rLen > 0.1) {
              const midScreen = { x: (pLastScreen.x + targetScreen.x) / 2, y: (pLastScreen.y + targetScreen.y) / 2 };
              const txt = `${toDisplayUnit(rLen)} ${currentUnit}`;
              ctx2D.font = "bold 10px 'JetBrains Mono', monospace";
              const tw = ctx2D.measureText(txt).width + 10;

              ctx2D.fillStyle = '#ffffff';
              ctx2D.strokeStyle = isHoveringClosingTarget ? '#059669' : '#d97706';
              ctx2D.lineWidth = 1.2;
              ctx2D.beginPath();
              ctx2D.roundRect(midScreen.x - tw / 2, midScreen.y - 10, tw, 18, 4);
              ctx2D.fill();
              ctx2D.stroke();

              ctx2D.fillStyle = '#1e293b';
              ctx2D.textAlign = 'center';
              ctx2D.textBaseline = 'middle';
              ctx2D.fillText(txt, midScreen.x, midScreen.y);
            }
          }

          // Placed Points
          drawPoints.forEach((p, idx) => {
            const s = worldToScreen(p.x, p.y);
            const isFirst = idx === 0;

            if (isFirst && drawPoints.length >= 3) {
              const pulseSize = isHoveringClosingTarget ? 22 : 16;

              ctx2D.beginPath();
              ctx2D.arc(s.x, s.y, pulseSize, 0, Math.PI * 2);
              ctx2D.fillStyle = isHoveringClosingTarget ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.2)';
              ctx2D.fill();

              ctx2D.beginPath();
              ctx2D.arc(s.x, s.y, pulseSize, 0, Math.PI * 2);
              ctx2D.lineWidth = 2;
              ctx2D.strokeStyle = '#059669';
              ctx2D.stroke();

              ctx2D.beginPath();
              ctx2D.arc(s.x, s.y, 8, 0, Math.PI * 2);
              ctx2D.fillStyle = '#10b981';
              ctx2D.fill();
              ctx2D.lineWidth = 2;
              ctx2D.strokeStyle = '#ffffff';
              ctx2D.stroke();

              const closeTag = '🎯 Click to Close Room';
              ctx2D.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
              const ctw = ctx2D.measureText(closeTag).width + 12;
              ctx2D.fillStyle = '#059669';
              ctx2D.beginPath();
              ctx2D.roundRect(s.x - ctw / 2, s.y - 32, ctw, 20, 5);
              ctx2D.fill();

              ctx2D.fillStyle = '#ffffff';
              ctx2D.textAlign = 'center';
              ctx2D.textBaseline = 'middle';
              ctx2D.fillText(closeTag, s.x, s.y - 22);

            } else {
              ctx2D.beginPath();
              ctx2D.arc(s.x, s.y, 6.5, 0, Math.PI * 2);
              ctx2D.fillStyle = '#0284c7';
              ctx2D.fill();
              ctx2D.lineWidth = 2;
              ctx2D.strokeStyle = '#ffffff';
              ctx2D.stroke();

              ctx2D.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
              ctx2D.fillStyle = '#0369a1';
              ctx2D.textAlign = 'left';
              ctx2D.fillText(`V${idx + 1} (${toDisplayUnit(p.x)}, ${toDisplayUnit(p.y)})`, s.x + 10, s.y - 8);
            }
          });

        } else {
          // -----------------------------------------------------------------------
          // EDIT LAYOUT MODE
          // -----------------------------------------------------------------------
          if (vertices.length >= 3) {
            const centroid = calculateCentroid(vertices);
            const cScreen = worldToScreen(centroid.x, centroid.y);

            // Polygon Fill
            ctx2D.beginPath();
            const first = worldToScreen(vertices[0].x, vertices[0].y);
            ctx2D.moveTo(first.x, first.y);
            for (let i = 1; i < vertices.length; i++) {
              const s = worldToScreen(vertices[i].x, vertices[i].y);
              ctx2D.lineTo(s.x, s.y);
            }
            ctx2D.closePath();
            ctx2D.fillStyle = 'rgba(37, 99, 235, 0.08)';
            ctx2D.fill();

            // Wall Outlines
            ctx2D.beginPath();
            ctx2D.moveTo(first.x, first.y);
            for (let i = 1; i < vertices.length; i++) {
              const s = worldToScreen(vertices[i].x, vertices[i].y);
              ctx2D.lineTo(s.x, s.y);
            }
            ctx2D.closePath();
            ctx2D.lineWidth = 3;
            ctx2D.strokeStyle = '#1d4ed8';
            ctx2D.stroke();

            // Centroid Room Name Label & Area Badge
            const roomName = (inputRoomName.value || 'Cleanroom Enclosure').trim();
            const areaTxt = `Area: ${format3(calculateShoelaceArea(vertices))} m²`;

            ctx2D.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
            const rnw = ctx2D.measureText(roomName).width + 20;
            
            ctx2D.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx2D.strokeStyle = '#cbd5e1';
            ctx2D.lineWidth = 1.2;
            ctx2D.beginPath();
            ctx2D.roundRect(cScreen.x - rnw / 2, cScreen.y - 20, rnw, 40, 8);
            ctx2D.fill();
            ctx2D.stroke();

            ctx2D.fillStyle = '#1e3a8a';
            ctx2D.textAlign = 'center';
            ctx2D.textBaseline = 'middle';
            ctx2D.fillText(roomName, cScreen.x, cScreen.y - 8);

            ctx2D.font = "bold 11px 'JetBrains Mono', monospace";
            ctx2D.fillStyle = '#2563eb';
            ctx2D.fillText(areaTxt, cScreen.x, cScreen.y + 8);

            // Dimension Badges - Placed Outward from Polygon Centroid
            const { edges } = calculatePerimeterAndEdges(vertices);
            edges.forEach((edge, idx) => {
              const p1Screen = worldToScreen(edge.p1.x, edge.p1.y);
              const p2Screen = worldToScreen(edge.p2.x, edge.p2.y);
              const midScreen = { x: (p1Screen.x + p2Screen.x) / 2, y: (p1Screen.y + p2Screen.y) / 2 };

              const dx = p2Screen.x - p1Screen.x;
              const dy = p2Screen.y - p1Screen.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              if (len < 10) return;

              let nx = -dy / len;
              let ny = dx / len;

              const toCentroidX = cScreen.x - midScreen.x;
              const toCentroidY = cScreen.y - midScreen.y;
              if (nx * toCentroidX + ny * toCentroidY > 0) {
                nx = -nx;
                ny = -ny;
              }

              const offsetDist = 26;
              const badgeX = midScreen.x + nx * offsetDist;
              const badgeY = midScreen.y + ny * offsetDist;

              edge.badgePos = { x: badgeX, y: badgeY };

              ctx2D.beginPath();
              ctx2D.moveTo(midScreen.x, midScreen.y);
              ctx2D.lineTo(badgeX, badgeY);
              ctx2D.lineWidth = 1;
              ctx2D.strokeStyle = '#cbd5e1';
              ctx2D.stroke();

              const text = `${edge.tag.toUpperCase()} = ${toDisplayUnit(edge.length)} ${currentUnit}`;
              ctx2D.font = "bold 11px 'JetBrains Mono', monospace";
              const textMetrics = ctx2D.measureText(text);
              const bw = textMetrics.width + 16;
              const bh = 22;

              ctx2D.fillStyle = (hoveredEdgeIndex === idx) ? '#1d4ed8' : '#ffffff';
              ctx2D.strokeStyle = (hoveredEdgeIndex === idx) ? '#1e40af' : '#94a3b8';
              ctx2D.lineWidth = 1.4;

              ctx2D.beginPath();
              ctx2D.roundRect(badgeX - bw / 2, badgeY - bh / 2, bw, bh, 6);
              ctx2D.fill();
              ctx2D.stroke();

              ctx2D.fillStyle = (hoveredEdgeIndex === idx) ? '#ffffff' : '#0f172a';
              ctx2D.textAlign = 'center';
              ctx2D.textBaseline = 'middle';
              ctx2D.fillText(text, badgeX, badgeY);
            });

            // Vertex Handles
            vertices.forEach((p, idx) => {
              const s = worldToScreen(p.x, p.y);
              const isHovered = hoveredVertexIndex === idx;

              ctx2D.beginPath();
              ctx2D.arc(s.x, s.y, isHovered ? 8 : 5.5, 0, Math.PI * 2);
              ctx2D.fillStyle = isHovered ? '#3b82f6' : '#1d4ed8';
              ctx2D.fill();
              ctx2D.lineWidth = 2;
              ctx2D.strokeStyle = '#ffffff';
              ctx2D.stroke();

              ctx2D.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
              ctx2D.fillStyle = '#334155';
              ctx2D.textAlign = 'left';
              ctx2D.fillText(`V${idx + 1}`, s.x + 8, s.y - 8);
            });
          }
        }
      }

      // =========================================================================
      // 7. UNIFIED POINTER EVENTS ENGINE
      // =========================================================================
      canvas2D.addEventListener('pointerdown', (e) => {
        if (e.target !== canvas2D) return;
        
        try {
          canvas2D.setPointerCapture(e.pointerId);
        } catch (err) {}

        const rect = canvas2D.getBoundingClientRect();
        const pointerX = e.clientX - rect.left;
        const pointerY = e.clientY - rect.top;
        const worldPos = screenToWorld(pointerX, pointerY);

        lastPointerPos = { x: pointerX, y: pointerY };

        if (e.button === 1 || e.button === 2 || e.shiftKey) {
          isPanning = true;
          return;
        }

        if (isDrawing) {
          const snappedPos = { x: snap(worldPos.x), y: snap(worldPos.y) };

          if (drawPoints.length >= 3) {
            const firstScreen = worldToScreen(drawPoints[0].x, drawPoints[0].y);
            const distToV1 = Math.hypot(pointerX - firstScreen.x, pointerY - firstScreen.y);
            if (distToV1 <= 24) {
              finishCustomDraw();
              return;
            }
          }

          drawPoints.push(snappedPos);

          if (drawPoints.length >= 3) {
            drawBannerText.textContent = `🎯 Corner ${drawPoints.length} placed! Tap the green glowing V1 target or 'Close Room' to finish.`;
            btnFinishDraw.classList.remove('hidden');
          } else {
            drawBannerText.textContent = `✏️ Placed ${drawPoints.length} point(s). Continue tapping corners around the room perimeter.`;
          }

          draw2DCanvas();
          return;
        }

        // Dimension badge check
        const { edges } = calculatePerimeterAndEdges(vertices);
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].badgePos) {
            const dist = Math.hypot(pointerX - edges[i].badgePos.x, pointerY - edges[i].badgePos.y);
            if (dist < 22) {
              openDimensionModal(i);
              return;
            }
          }
        }

        // Vertex drag check
        for (let i = 0; i < vertices.length; i++) {
          const s = worldToScreen(vertices[i].x, vertices[i].y);
          if (Math.hypot(pointerX - s.x, pointerY - s.y) < 15) {
            isDraggingVertex = true;
            draggedVertexIndex = i;
            return;
          }
        }

        isPanning = true;
      });

      canvas2D.addEventListener('pointermove', (e) => {
        const rect = canvas2D.getBoundingClientRect();
        const pointerX = e.clientX - rect.left;
        const pointerY = e.clientY - rect.top;
        const worldPos = screenToWorld(pointerX, pointerY);

        currentHoverWorldPos = { x: snap(worldPos.x), y: snap(worldPos.y) };
        canvasCoordReadout.textContent = `X: ${worldPos.x.toFixed(2)}m, Y: ${worldPos.y.toFixed(2)}m`;

        if (isPanning) {
          panX += (pointerX - lastPointerPos.x);
          panY -= (pointerY - lastPointerPos.y);
          lastPointerPos = { x: pointerX, y: pointerY };
          draw2DCanvas();
          return;
        }

        if (isDraggingVertex && draggedVertexIndex !== -1) {
          vertices[draggedVertexIndex].x = snap(worldPos.x);
          vertices[draggedVertexIndex].y = snap(worldPos.y);
          updateCalculations();
          return;
        }

        hoveredVertexIndex = -1;
        hoveredEdgeIndex = -1;
        isHoveringClosingTarget = false;

        if (isDrawing && drawPoints.length >= 3) {
          const firstScreen = worldToScreen(drawPoints[0].x, drawPoints[0].y);
          const distToV1 = Math.hypot(pointerX - firstScreen.x, pointerY - firstScreen.y);
          if (distToV1 <= 24) {
            isHoveringClosingTarget = true;
            canvas2D.style.cursor = 'pointer';
          } else {
            canvas2D.style.cursor = 'crosshair';
          }
        } else if (!isDrawing) {
          for (let i = 0; i < vertices.length; i++) {
            const s = worldToScreen(vertices[i].x, vertices[i].y);
            if (Math.hypot(pointerX - s.x, pointerY - s.y) < 15) {
              hoveredVertexIndex = i;
              canvas2D.style.cursor = 'grab';
              break;
            }
          }

          if (hoveredVertexIndex === -1) {
            const { edges } = calculatePerimeterAndEdges(vertices);
            for (let i = 0; i < edges.length; i++) {
              if (edges[i].badgePos && Math.hypot(pointerX - edges[i].badgePos.x, pointerY - edges[i].badgePos.y) < 20) {
                hoveredEdgeIndex = i;
                canvas2D.style.cursor = 'pointer';
                break;
              }
            }
          }

          if (hoveredVertexIndex === -1 && hoveredEdgeIndex === -1) {
            canvas2D.style.cursor = 'default';
          }
        }

        draw2DCanvas();
      });

      function handlePointerUp(e) {
        try {
          if (canvas2D.hasPointerCapture(e.pointerId)) {
            canvas2D.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
        
        isPanning = false;
        if (isDraggingVertex) {
          isDraggingVertex = false;
          draggedVertexIndex = -1;
          updateCalculations();
        }
      }

      canvas2D.addEventListener('pointerup', handlePointerUp);
      canvas2D.addEventListener('pointercancel', handlePointerUp);

      canvas2D.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = canvas2D.getBoundingClientRect();
        const pointerX = e.clientX - rect.left;
        const pointerY = e.clientY - rect.top;

        const worldBefore = screenToWorld(pointerX, pointerY);
        const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
        zoom = Math.min(Math.max(zoom * zoomFactor, 8), 160);

        const dpr = window.devicePixelRatio || 1;
        panX = pointerX - worldBefore.x * zoom;
        panY = (canvas2D.height / dpr - pointerY) - worldBefore.y * zoom;

        canvasZoomReadout.textContent = `Zoom: ${Math.round((zoom / 36) * 100)}%`;
        draw2DCanvas();
      }, { passive: false });

      // Mode toggles
      function enterDrawMode() {
        currentTool = 'draw';
        isDrawing = true;
        drawPoints = [];
        toolDrawBtn.className = 'px-3 py-1.5 rounded-lg font-bold bg-emerald-600 text-white shadow-xs transition cursor-pointer';
        toolSelectBtn.className = 'px-3 py-1.5 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs cursor-pointer';
        drawModeBanner.classList.remove('hidden');
        btnFinishDraw.classList.add('hidden');
        drawBannerText.textContent = '✏️ Draw Walls Active: Tap anywhere on the canvas to place room corners.';
        draw2DCanvas();
      }

      function exitDrawMode() {
        currentTool = 'select';
        isDrawing = false;
        drawPoints = [];
        toolSelectBtn.className = 'px-3 py-1.5 rounded-lg font-bold bg-blue-600 text-white shadow-xs transition cursor-pointer';
        toolDrawBtn.className = 'px-3 py-1.5 rounded-lg font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs cursor-pointer';
        drawModeBanner.classList.add('hidden');
        btnFinishDraw.classList.add('hidden');
        draw2DCanvas();
      }

      function finishCustomDraw() {
        if (drawPoints.length >= 3) {
          vertices = JSON.parse(JSON.stringify(drawPoints));
          selectRoomPreset.value = 'custom';
          exitDrawMode();
          updateCalculations();
          fit2DView();

          canvasToast.textContent = '✅ Room Completed! Switched to Edit Layout Mode.';
          canvasToast.classList.add('bg-emerald-600', 'text-white');
          setTimeout(() => {
            canvasToast.textContent = '💡 Click dimension badges to edit wall lengths';
            canvasToast.classList.remove('bg-emerald-600', 'text-white');
          }, 3000);
        } else {
          alert('A closed room enclosure requires at least 3 vertices.');
        }
      }

      toolSelectBtn.addEventListener('click', exitDrawMode);
      toolDrawBtn.addEventListener('click', enterDrawMode);
      btnFinishDraw.addEventListener('click', finishCustomDraw);
      btnCancelDraw.addEventListener('click', exitDrawMode);
      btnFit2D.addEventListener('click', fit2DView);

      inputRoomName.addEventListener('input', draw2DCanvas);
      inputProjectName.addEventListener('input', () => {});

      btnToggleSnap.addEventListener('click', () => {
        if (snapGridSizeMeters === 0.1) {
          snapGridSizeMeters = 0.5;
          snapStatusText.textContent = '0.5m';
        } else if (snapGridSizeMeters === 0.5) {
          snapGridSizeMeters = 1.0;
          snapStatusText.textContent = '1.0m';
        } else {
          snapGridSizeMeters = 0.1;
          snapStatusText.textContent = '0.1m';
        }
      });

      // =========================================================================
      // 8. PROCEDURAL 3D TEXTURES ENGINE
      // =========================================================================
      const proceduralTextures = {};

      function generateBrickTexture() {
        if (proceduralTextures.brick) return proceduralTextures.brick;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(0, 0, 512, 512);

        const rows = 16;
        const cols = 8;
        const rowH = 512 / rows;
        const colW = 512 / cols;
        const mortar = 3.5;

        for (let r = 0; r < rows; r++) {
          const isOffset = r % 2 === 1;
          const offsetX = isOffset ? colW / 2 : 0;
          for (let c = -1; c <= cols; c++) {
            const x = c * colW + offsetX + mortar / 2;
            const y = r * rowH + mortar / 2;
            const w = colW - mortar;
            const h = rowH - mortar;

            const rVal = 160 + Math.floor(Math.random() * 35);
            const gVal = 55 + Math.floor(Math.random() * 25);
            const bVal = 40 + Math.floor(Math.random() * 20);
            ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
            ctx.fillRect(x, y, w, h);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            for (let s = 0; s < 10; s++) {
              ctx.fillRect(x + Math.random() * w, y + Math.random() * h, 2, 2);
            }
          }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        proceduralTextures.brick = texture;
        return texture;
      }

      function generateCleanroomPanelTexture() {
        if (proceduralTextures.cleanroom) return proceduralTextures.cleanroom;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(256, 0);
        ctx.lineTo(256, 512);
        ctx.stroke();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 256);
        ctx.lineTo(512, 256);
        ctx.stroke();

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        proceduralTextures.cleanroom = texture;
        return texture;
      }

      function generateConcreteTexture() {
        if (proceduralTextures.concrete) return proceduralTextures.concrete;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, 512, 512);

        for (let i = 0; i < 2000; i++) {
          const val = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
          ctx.fillStyle = val;
          ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 4 + 1, Math.random() * 4 + 1);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        proceduralTextures.concrete = texture;
        return texture;
      }

      function getWallMaterialForType(type, edgeLength, wallHeight) {
        if (type === 'brick') {
          const tex = generateBrickTexture();
          tex.repeat.set(edgeLength / 0.6, wallHeight / 0.6);
          return new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.85,
            metalness: 0.05,
            side: THREE.DoubleSide
          });
        } else if (type === 'cleanroom') {
          const tex = generateCleanroomPanelTexture();
          tex.repeat.set(edgeLength / 1.2, wallHeight / 2.7);
          return new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.25,
            metalness: 0.1,
            color: 0xffffff,
            side: THREE.DoubleSide
          });
        } else if (type === 'glass') {
          return new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.1,
            metalness: 0.3,
            transparent: true,
            opacity: 0.35,
            side: THREE.DoubleSide
          });
        } else if (type === 'steel') {
          return new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            roughness: 0.3,
            metalness: 0.85,
            side: THREE.DoubleSide
          });
        } else if (type === 'concrete') {
          const tex = generateConcreteTexture();
          tex.repeat.set(edgeLength / 2, wallHeight / 2);
          return new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.9,
            metalness: 0.02,
            side: THREE.DoubleSide
          });
        } else {
          return new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.2,
            metalness: 0.1,
            transparent: false,
            opacity: 0.92,
            side: THREE.DoubleSide
          });
        }
      }

      // =========================================================================
      // 9. SYNCHRONIZED THREE.JS 3D VIEWPORT & CAMERA CONTROLS
      // =========================================================================
      let scene3D, camera3D, renderer3D, controls3D;
      let room3DGroup;

      function init3DViewport() {
        if (typeof THREE === 'undefined') {
          console.warn('Three.js not loaded, 3D viewport disabled.');
          container3D.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-slate-400">3D WebGL initializing...</div>';
          return;
        }

        const cw = container3D.clientWidth || 300;
        const ch = container3D.clientHeight || 300;

        scene3D = new THREE.Scene();
        scene3D.background = new THREE.Color(0xf8fafc);

        camera3D = new THREE.PerspectiveCamera(40, cw / ch, 0.1, 1000);
        camera3D.position.set(15, 20, 20);

        renderer3D = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        renderer3D.setSize(cw, ch);
        renderer3D.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer3D.shadowMap.enabled = true;
        renderer3D.shadowMap.type = THREE.PCFSoftShadowMap;

        container3D.innerHTML = '';
        container3D.appendChild(renderer3D.domElement);

        if (typeof THREE.OrbitControls !== 'undefined') {
          controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
          controls3D.enableDamping = true;
          controls3D.dampingFactor = 0.05;
          controls3D.autoRotate = isAutoRotating;
          controls3D.autoRotateSpeed = 2.0;
          controls3D.target.set(2, 1.35, 4);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene3D.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
        dirLight.position.set(15, 28, 20);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene3D.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
        fillLight.position.set(-15, 12, -15);
        scene3D.add(fillLight);

        const gridHelper = new THREE.GridHelper(30, 30, 0x94a3b8, 0xe2e8f0);
        gridHelper.position.y = -0.01;
        scene3D.add(gridHelper);

        room3DGroup = new THREE.Group();
        scene3D.add(room3DGroup);

        function animate() {
          requestAnimationFrame(animate);
          if (controls3D) controls3D.update();
          if (renderer3D && scene3D && camera3D) {
            renderer3D.render(scene3D, camera3D);
          }
        }
        animate();

        window.addEventListener('resize', () => {
          const w = container3D.clientWidth;
          const h = container3D.clientHeight;
          if (w > 0 && h > 0 && camera3D && renderer3D) {
            camera3D.aspect = w / h;
            camera3D.updateProjectionMatrix();
            renderer3D.setSize(w, h);
          }
        });
      }

      function update3DGeometry() {
        if (!room3DGroup || !vertices || vertices.length < 3 || typeof THREE === 'undefined') return;

        while (room3DGroup.children.length > 0) {
          const obj = room3DGroup.children[0];
          room3DGroup.remove(obj);
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
        }

        const h = getClearHeight();

        const shape = new THREE.Shape();
        shape.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
          shape.lineTo(vertices[i].x, vertices[i].y);
        }
        shape.closePath();

        // 1. Floor Slab
        const floorGeo = new THREE.ShapeGeometry(shape);
        floorGeo.rotateX(Math.PI / 2);
        const floorMat = new THREE.MeshStandardMaterial({
          color: 0x1d4ed8,
          roughness: 0.25,
          metalness: 0.2,
          side: THREE.DoubleSide
        });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.receiveShadow = true;
        room3DGroup.add(floorMesh);

        // 2. Extruded Walls
        const edgeLineMat = new THREE.LineBasicMaterial({ color: 0x1e40af, linewidth: 2 });

        for (let i = 0; i < vertices.length; i++) {
          const j = (i + 1) % vertices.length;
          const p1 = vertices[i];
          const p2 = vertices[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const edgeLen = Math.sqrt(dx * dx + dy * dy);

          const wallGeo = new THREE.BufferGeometry();
          const positions = new Float32Array([
            p1.x, 0, p1.y,
            p2.x, 0, p2.y,
            p2.x, h, p2.y,

            p1.x, 0, p1.y,
            p2.x, h, p2.y,
            p1.x, h, p1.y
          ]);
          wallGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

          const uvs = new Float32Array([
            0, 0,
            edgeLen, 0,
            edgeLen, h,

            0, 0,
            edgeLen, h,
            0, h
          ]);
          wallGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
          wallGeo.computeVertexNormals();

          const wallMat = getWallMaterialForType(selectedWallMaterialType, edgeLen, h);
          const wallMesh = new THREE.Mesh(wallGeo, wallMat);
          wallMesh.castShadow = true;
          wallMesh.receiveShadow = true;
          room3DGroup.add(wallMesh);

          const edgeGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(p1.x, 0, p1.y),
            new THREE.Vector3(p1.x, h, p1.y)
          ]);
          const edgeLine = new THREE.Line(edgeGeo, edgeLineMat);
          room3DGroup.add(edgeLine);
        }

        // 3. Ceiling Cap
        if (showCeiling) {
          const ceilingGeo = new THREE.ShapeGeometry(shape);
          ceilingGeo.rotateX(Math.PI / 2);
          ceilingGeo.translate(0, h, 0);

          const ceilingMat = new THREE.MeshStandardMaterial({
            color: 0x93c5fd,
            roughness: 0.3,
            metalness: 0.1,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide
          });
          const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
          room3DGroup.add(ceilingMesh);
        }

        if (controls3D) {
          let cx = 0, cz = 0;
          vertices.forEach(v => { cx += v.x; cz += v.y; });
          cx /= vertices.length;
          cz /= vertices.length;
          controls3D.target.set(cx, h / 2, cz);
        }
      }

      // Wall Material Selector Listener
      selectWallMaterial.addEventListener('change', (e) => {
        selectedWallMaterialType = e.target.value;
        const selectedText = selectWallMaterial.options[selectWallMaterial.selectedIndex].text;
        hudWallMaterialLabel.textContent = `Wall: ${selectedText}`;
        update3DGeometry();
      });

      // 3D Camera Controls & Toggles
      btnToggleSpin.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        if (controls3D) controls3D.autoRotate = isAutoRotating;
        spinStateText.textContent = isAutoRotating ? 'ON' : 'OFF';
        btnToggleSpin.className = isAutoRotating 
          ? 'px-2 py-1 rounded-md font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer'
          : 'px-2 py-1 rounded-md font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs cursor-pointer';
      });

      btnViewIso.addEventListener('click', () => {
        let cx = 0, cz = 0;
        vertices.forEach(v => { cx += v.x; cz += v.y; });
        cx /= vertices.length;
        cz /= vertices.length;
        const h = getClearHeight();

        if (camera3D) camera3D.position.set(cx + 12, h + 14, cz + 14);
        if (controls3D) controls3D.target.set(cx, h / 2, cz);
      });

      btnViewTop.addEventListener('click', () => {
        let cx = 0, cz = 0;
        vertices.forEach(v => { cx += v.x; cz += v.y; });
        cx /= vertices.length;
        cz /= vertices.length;

        if (camera3D) camera3D.position.set(cx, 28, cz + 0.001);
        if (controls3D) controls3D.target.set(cx, 0, cz);
      });

      btnViewFront.addEventListener('click', () => {
        let cx = 0, cz = 0;
        vertices.forEach(v => { cx += v.x; cz += v.y; });
        cx /= vertices.length;
        cz /= vertices.length;
        const h = getClearHeight();

        if (camera3D) camera3D.position.set(cx, h / 2, cz + 20);
        if (controls3D) controls3D.target.set(cx, h / 2, cz);
      });

      btnToggleCeiling.addEventListener('click', () => {
        showCeiling = !showCeiling;
        ceilingStateText.textContent = showCeiling ? 'ON' : 'OFF';
        ceilingStateText.className = showCeiling ? 'font-bold text-blue-600' : 'font-bold text-slate-400';
        update3DGeometry();
      });

      // =========================================================================
      // 10. PRESETS & UNIT SWITCHING
      // =========================================================================
      selectRoomPreset.addEventListener('change', (e) => {
        const key = e.target.value;
        if (PRESETS[key]) {
          vertices = JSON.parse(JSON.stringify(PRESETS[key]));
          updateCalculations();
          fit2DView();
        }
      });

      function switchUnit(newUnit) {
        if (currentUnit === newUnit) return;

        const factor = newUnit === 'mm' ? 1000 : 0.001;
        const hVal = parseFloat(inputHeight.value);
        if (!isNaN(hVal)) {
          inputHeight.value = newUnit === 'mm' ? Math.round(hVal * factor) : format3(hVal * factor);
        }

        currentUnit = newUnit;
        unitLabels.forEach(lbl => lbl.textContent = currentUnit);

        if (currentUnit === 'm') {
          unitBtnM.className = 'px-3 py-1 rounded text-xs font-bold transition-all shadow-xs bg-white text-blue-700 cursor-pointer';
          unitBtnMM.className = 'px-3 py-1 rounded text-xs font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer';
        } else {
          unitBtnMM.className = 'px-3 py-1 rounded text-xs font-bold transition-all shadow-xs bg-white text-blue-700 cursor-pointer';
          unitBtnM.className = 'px-3 py-1 rounded text-xs font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer';
        }

        updateCalculations();
      }

      unitBtnM.addEventListener('click', () => switchUnit('m'));
      unitBtnMM.addEventListener('click', () => switchUnit('mm'));

      inputHeight.addEventListener('input', updateCalculations);
      inputSpecMultiplier.addEventListener('input', updateCalculations);
      selectSpecMode.addEventListener('change', updateCalculations);

      btnReset.addEventListener('click', () => {
        selectRoomPreset.value = 'lshape_wepl';
        vertices = JSON.parse(JSON.stringify(PRESETS.lshape_wepl));
        selectWallMaterial.value = 'blueprint';
        selectedWallMaterialType = 'blueprint';
        hudWallMaterialLabel.textContent = 'Wall: Blueprint Blue';
        inputProjectName.value = 'WEPL Cleanroom Facility Alpha';
        inputRoomName.value = 'ISO Class 7 Production Suite';
        inputHeight.value = '2.7';
        inputSpecMultiplier.value = '10';
        selectSpecMode.value = 'surface';
        currentUnit = 'm';
        unitBtnM.className = 'px-3 py-1 rounded text-xs font-bold transition-all shadow-xs bg-white text-blue-700 cursor-pointer';
        unitBtnMM.className = 'px-3 py-1 rounded text-xs font-medium transition-all text-slate-600 hover:text-slate-900 cursor-pointer';
        unitLabels.forEach(lbl => lbl.textContent = 'm');
        updateCalculations();
        fit2DView();
      });

      // =========================================================================
      // 11. COPY SPECIFICATION REPORT
      // =========================================================================
      btnCopyReport.addEventListener('click', () => {
        const { perimeter, edges } = calculatePerimeterAndEdges(vertices);
        const singleFloor = calculateShoelaceArea(vertices);
        const h = getClearHeight();
        const wallMaterialName = selectWallMaterial.options[selectWallMaterial.selectedIndex].text;

        const wallSummary = edges.map(e => `  - ${e.label}: ${toDisplayUnit(e.length)} ${currentUnit} | Wall Area: ${format3(e.length * h)} m²`).join('\n');

        const report = `=====================================================
ROOM SURFACE AREA & AIR FLOW REPORT
WEPL TESTING & COMMISSIONING ENGINEERING PORTAL
=====================================================
Project: ${inputProjectName.value || 'N/A'}
Room Suite: ${inputRoomName.value || 'N/A'}
Geometry Preset: ${selectRoomPreset.options[selectRoomPreset.selectedIndex].text}
Wall Construction: ${wallMaterialName}
Unit Mode: ${currentUnit.toUpperCase()}
Clear Enclosure Height (H): ${inputHeight.value} ${currentUnit}
Point Count: ${vertices.length} Vertices

WALL SEGMENTS BREAKDOWN:
${wallSummary}
Calculated Perimeter (P): ${statPerimeter2D.textContent}

-----------------------------------------------------
ENGINEERING RESULTS SUMMARY:
-----------------------------------------------------
1. Total Floor & Ceiling Area: ${resFloorCeilingArea.textContent} (Single Floor: ${resSingleFloorArea.textContent})
2. Total Vertical Wall Area:    ${resWallArea.textContent}
3. Combined Total Surface Area: ${resTotalSurfaceArea.textContent} m²
4. Spec Multiplier:            ${inputSpecMultiplier.value}x (${selectSpecMode.value})
5. Final Spec Airflow Rate:    ${resSpecFlowRate.textContent} CMH
   Available Leak Rate (10%):  ${resLeakRate ? resLeakRate.textContent : ''} CMH
   L/s:                        ${resFlowLs.textContent}
6. Enclosed Volume:            ${resRoomVolume.textContent} (${resRoomVolumeCuFt.textContent})
=====================================================
Generated via WEPL Testing & Commissioning Engineering Portal`;

        navigator.clipboard.writeText(report).then(() => {
          copyBtnText.textContent = 'Report Copied to Clipboard!';
          btnCopyReport.classList.remove('bg-slate-900');
          btnCopyReport.classList.add('bg-emerald-600');
          setTimeout(() => {
            copyBtnText.textContent = 'Copy Engineering Specification Report';
            btnCopyReport.classList.remove('bg-emerald-600');
            btnCopyReport.classList.add('bg-slate-900');
          }, 2500);
        });
      });

      // =========================================================================
      // 12. HIGH-RES DEDICATED BLUEPRINT SNAPSHOT GENERATOR FOR PDF
      // =========================================================================
      function generateDedicatedBlueprintSnapshot(pts, roomName, heightVal, unitVal) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 1600;
        offCanvas.height = 1050;
        const ctx = offCanvas.getContext('2d');

        // Background & subtle grid
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#f1f5f9';
        for (let x = 0; x < offCanvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, offCanvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < offCanvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(offCanvas.width, y);
          ctx.stroke();
        }

        // Compute Bounding Box
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        pts.forEach(p => {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        });

        const roomW = Math.max(maxX - minX, 1);
        const roomH = Math.max(maxY - minY, 1);
        const padX = 150;
        const padY = 120;
        const scaleX = (offCanvas.width - padX * 2) / roomW;
        const scaleY = (offCanvas.height - padY * 2) / roomH;
        const sc = Math.min(scaleX, scaleY);

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const offX = offCanvas.width / 2 - midX * sc;
        const offY = offCanvas.height / 2 + midY * sc;

        function toPrintScreen(wx, wy) {
          return {
            x: offX + wx * sc,
            y: offY - wy * sc
          };
        }

        // Fill Polygon
        ctx.beginPath();
        const p0 = toPrintScreen(pts[0].x, pts[0].y);
        ctx.moveTo(p0.x, p0.y);
        for (let i = 1; i < pts.length; i++) {
          const sp = toPrintScreen(pts[i].x, pts[i].y);
          ctx.lineTo(sp.x, sp.y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(219, 234, 254, 0.45)';
        ctx.fill();

        // Outline Walls
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#1e40af';
        ctx.stroke();

        // Centroid Information Plaque
        const centroid = calculateCentroid(pts);
        const cSc = toPrintScreen(centroid.x, centroid.y);
        const singleArea = calculateShoelaceArea(pts);

        ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
        const titleStr = sanitizeForPdf(roomName) || 'Room Suite';
        const areaStr = `Floor Area = ${format3(singleArea)} m²`;
        const tw1 = ctx.measureText(titleStr).width;
        ctx.font = "bold 20px 'JetBrains Mono', monospace";
        const tw2 = ctx.measureText(areaStr).width;
        const boxW = Math.max(tw1, tw2) + 48;
        const boxH = 80;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(cSc.x - boxW / 2, cSc.y - boxH / 2, boxW, boxH, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#1e3a8a';
        ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(titleStr, cSc.x, cSc.y - 14);

        ctx.fillStyle = '#2563eb';
        ctx.font = "bold 19px 'JetBrains Mono', monospace";
        ctx.fillText(areaStr, cSc.x, cSc.y + 18);

        // Outer Dimension Strings & Badges
        const { edges } = calculatePerimeterAndEdges(pts);
        edges.forEach((edge) => {
          const s1 = toPrintScreen(edge.p1.x, edge.p1.y);
          const s2 = toPrintScreen(edge.p2.x, edge.p2.y);
          const mid = { x: (s1.x + s2.x) / 2, y: (s1.y + s2.y) / 2 };

          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 5) return;

          let nx = -dy / len;
          let ny = dx / len;

          const toCentroidX = cSc.x - mid.x;
          const toCentroidY = cSc.y - mid.y;
          if (nx * toCentroidX + ny * toCentroidY > 0) {
            nx = -nx;
            ny = -ny;
          }

          const calloutDist = 48;
          const badgeX = mid.x + nx * calloutDist;
          const badgeY = mid.y + ny * calloutDist;

          // Dimension Leader Line
          ctx.beginPath();
          ctx.moveTo(mid.x, mid.y);
          ctx.lineTo(badgeX, badgeY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();

          // Dimension Text Pill
          const dimText = `${edge.tag.toUpperCase()} = ${toDisplayUnit(edge.length)} ${unitVal}`;
          ctx.font = "bold 20px 'JetBrains Mono', monospace";
          const dtw = ctx.measureText(dimText).width + 26;
          const dth = 40;

          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#1e3a8a';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(badgeX - dtw / 2, badgeY - dth / 2, dtw, dth, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(dimText, badgeX, badgeY);
        });

        // Corner Vertices
        pts.forEach((p, idx) => {
          const s = toPrintScreen(p.x, p.y);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#1d4ed8';
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
          ctx.fillStyle = '#334155';
          ctx.textAlign = 'left';
          ctx.fillText(`V${idx + 1}`, s.x + 14, s.y - 12);
        });

        // Legend / Scale Stamp
        ctx.fillStyle = 'rgba(248, 250, 252, 0.95)';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(24, offCanvas.height - 70, 420, 46, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 15px 'JetBrains Mono', monospace";
        ctx.fillStyle = '#475569';
        ctx.textAlign = 'left';
        ctx.fillText(`SCALE: N.T.S. | UNITS: ${unitVal.toUpperCase()} | H = ${format3(heightVal)}m`, 38, offCanvas.height - 42);

        return offCanvas.toDataURL('image/png');
      }

      // =========================================================================
      // 13. PROFESSIONAL PDF REPORT GENERATION (CAPITALIZED HEADER & ICON)
      // =========================================================================
      btnExportPDF.addEventListener('click', async () => {
        if (!window.jspdf) {
          alert('PDF engine is loading, please try again in a moment.');
          return;
        }

        btnExportPDF.innerHTML = '⏳ Generating PDF...';
        btnExportPDF.disabled = true;

        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

          const pageWidth = doc.internal.pageSize.getWidth();
          const h = getClearHeight();
          const { perimeter, edges } = calculatePerimeterAndEdges(vertices);
          const singleFloor = calculateShoelaceArea(vertices);
          const totalFloorCeiling = singleFloor * 2;
          const totalWallArea = perimeter * h;
          const totalSurface = totalFloorCeiling + totalWallArea;
          const volume = singleFloor * h;
          const multiplier = parseFloat(inputSpecMultiplier.value) || 10;
          const flowCMH = totalSurface * multiplier;

          const rawProjectName = (inputProjectName.value || 'Cleanroom Project').trim();
          const rawRoomName = (inputRoomName.value || 'Production Suite').trim();
          const projectName = sanitizeForPdf(rawProjectName);
          const roomName = sanitizeForPdf(rawRoomName);

          const rawPresetText = selectRoomPreset.options[selectRoomPreset.selectedIndex].text;
          const presetName = sanitizeForPdf(rawPresetText);
          const rawWallFinish = selectWallMaterial.options[selectWallMaterial.selectedIndex].text;
          const wallFinishName = sanitizeForPdf(rawWallFinish);

          let logoData = null;
          try {
            const logoRes = await fetch('wepl_logo.png');
            if (logoRes.ok) {
              const blob = await logoRes.blob();
              logoData = await new Promise(function (resolve) {
                const reader = new FileReader();
                reader.onload = function () { resolve(reader.result); };
                reader.onerror = function () { resolve(null); };
                reader.readAsDataURL(blob);
              });
            }
          } catch (e) { logoData = null; }

          doc.setFillColor(30, 58, 138);
          doc.rect(0, 0, pageWidth, 22, 'F');

          doc.setFillColor(255, 255, 255);
          doc.roundedRect(10, 3, 28, 16, 1.5, 1.5, 'F');
          if (logoData) {
            doc.addImage(logoData, 'PNG', 11.2, 3.6, 25.6, 14.6);
          } else {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(30, 58, 138);
            doc.text('WEPL', 24, 12.5, { align: 'center' });
          }

          doc.setTextColor(255, 255, 255);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('ROOM SURFACE AREA & AIR FLOW REPORT', 42, 9);

          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'normal');
          doc.text('Winner Engineering Pte Ltd  ·  WEPL Testing & Commissioning', 42, 14);
          doc.text(`Project: ${projectName}   |   Room Suite: ${roomName}`, 42, 18.5);

          doc.setFontSize(7);
          doc.text(`Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - 10, 9, { align: 'right' });

          let y = 26;
          doc.setTextColor(30, 41, 59);
          doc.setFontSize(9.5);
          doc.setFont('helvetica', 'bold');
          doc.text('1. Enclosure Specification & Layout Snapshots', 12, y);

          y += 4;
          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'normal');
          doc.text(`Preset: ${presetName}   |   Wall Finish: ${wallFinishName}   |   Clear Height: ${inputHeight.value} ${currentUnit}`, 12, y);

          y += 3;

          const img2D = generateDedicatedBlueprintSnapshot(vertices, roomName, h, currentUnit);

          let prevPos = null;
          let prevTarget = null;
          if (camera3D && controls3D && renderer3D && scene3D) {
            prevPos = camera3D.position.clone();
            prevTarget = controls3D.target.clone();
            let cx = 0, cz = 0;
            vertices.forEach(v => { cx += v.x; cz += v.y; });
            cx /= vertices.length;
            cz /= vertices.length;
            camera3D.position.set(cx + 7, h + 8, cz + 8);
            controls3D.target.set(cx, h / 2, cz);
            camera3D.updateProjectionMatrix();
            controls3D.update();
            renderer3D.render(scene3D, camera3D);
          }
          const img3D = renderer3D ? renderer3D.domElement.toDataURL('image/png') : null;
          if (prevPos && controls3D && camera3D && renderer3D && scene3D) {
            camera3D.position.copy(prevPos);
            controls3D.target.copy(prevTarget);
            camera3D.updateProjectionMatrix();
            controls3D.update();
            renderer3D.render(scene3D, camera3D);
          }

          const imgW = 91;
          const imgH = 64;
          doc.addImage(img2D, 'PNG', 12, y, imgW, imgH);
          if (img3D) {
            doc.addImage(img3D, 'PNG', 12 + imgW + 4, y, imgW, imgH);
          }

          doc.setFontSize(7);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(71, 85, 105);
          doc.text('Figure 1: 2D Blueprint Plan Layout', 12 + imgW / 2, y + imgH + 3.5, { align: 'center' });
          doc.text(`Figure 2: 3D Extruded Model (${wallFinishName})`, 12 + imgW + 4 + imgW / 2, y + imgH + 3.5, { align: 'center' });

          y += imgH + 7;

          doc.setFontSize(9.5);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 41, 59);
          doc.text('2. Surface Area & Airflow Specification Summary', 12, y);

          y += 2;
          doc.autoTable({
            startY: y,
            theme: 'grid',
            pageBreak: 'avoid',
            headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold', fontSize: 7.5, cellPadding: 1 },
            bodyStyles: { fontSize: 7, textColor: [30, 41, 59], cellPadding: 0.9 },
            columns: [
              { header: 'Metric Parameter', dataKey: 'metric' },
              { header: 'Calculation Method', dataKey: 'formula' },
              { header: 'Commissioning Value (3-Decimals)', dataKey: 'value' }
            ],
            body: [
              { metric: 'Single Floor Area', formula: 'Shoelace Polygon Algorithm', value: `${format3(singleFloor)} m²` },
              { metric: 'Floor & Ceiling Dual Area', formula: '2 x Single Floor Area', value: `${format3(totalFloorCeiling)} m²` },
              { metric: 'Enclosure Perimeter (P)', formula: `Sum of all wall segments (Wall A to Wall ${String.fromCharCode(65 + (edges.length - 1))})`, value: `${format3(perimeter)} m` },
              { metric: 'Vertical Wall Envelope Area', formula: 'Perimeter (P) x Height (H)', value: `${format3(totalWallArea)} m²` },
              { metric: 'Wall Construction Finish', formula: 'Architectural Specification', value: wallFinishName },
              { metric: 'Combined Total Surface Area (A_total)', formula: 'A_floor/ceiling + A_walls', value: `${format3(totalSurface)} m²` },
              { metric: 'Enclosed Cleanroom Volume (V)', formula: 'Single Floor Area x Height (H)', value: `${format3(volume)} m³` },
              { metric: 'Final Airflow Specification Flow Rate', formula: `A_total x ${multiplier} (Spec Factor)`, value: `${format3(flowCMH)} CMH` },
              { metric: 'Available Leak Rate (10%)', formula: '10% of Final Airflow', value: `${format3(flowCMH * 0.10)} CMH` }
            ],
            margin: { left: 12, right: 12 }
          });

          y = doc.lastAutoTable.finalY + 4;

          doc.setFontSize(9.5);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 41, 59);
          doc.text('3. Wall Segments Schedule', 12, y);

          y += 2;
          const tableRows = edges.map(e => [
            e.label,
            `(${toDisplayUnit(e.p1.x)}, ${toDisplayUnit(e.p1.y)})`,
            `(${toDisplayUnit(e.p2.x)}, ${toDisplayUnit(e.p2.y)})`,
            `${toDisplayUnit(e.length)} ${currentUnit}`,
            `${toDisplayUnit(h)} ${currentUnit}`,
            `${format3(e.length * h)} m²`
          ]);

          doc.autoTable({
            startY: y,
            theme: 'striped',
            pageBreak: 'avoid',
            headStyles: { fillColor: [51, 65, 85], textColor: 255, fontStyle: 'bold', fontSize: 7, cellPadding: 0.9 },
            bodyStyles: { fontSize: 6.5, textColor: [30, 41, 59], cellPadding: 0.7 },
            head: [['Wall ID', 'Start (X,Y)', 'End (X,Y)', 'Length', 'Height', 'Wall Area (m²)']],
            body: tableRows,
            margin: { left: 12, right: 12 }
          });

          y = doc.lastAutoTable.finalY + 5;
          const boxH = 18;
          const pageH = doc.internal.pageSize.getHeight();
          y = Math.max(y, pageH - boxH - 12);
          if (y + boxH > pageH - 8) y = pageH - boxH - 8;

          doc.setDrawColor(203, 213, 225);
          doc.setFillColor(248, 250, 252);
          doc.roundedRect(12, y, pageWidth - 24, boxH, 1.5, 1.5, 'FD');

          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 58, 138);
          doc.text('Commissioning Verification & Quality Assurance Sign-Off', 16, y + 4.5);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(30, 41, 59);
          doc.text('Tested by: ________________________     Signature: ________________________     Date: ______________', 16, y + 9.5);
          doc.text('Witness by: ______________________     Signature: ________________________     Date: ______________', 16, y + 14.5);

          const safeFilename = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_${roomName.replace(/[^a-zA-Z0-9]/g, '_')}_Report.pdf`;
          doc.save(safeFilename);

        } catch (err) {
          console.error('PDF Generation Error:', err);
          alert('Error generating PDF report. Please check console.');
        } finally {
          btnExportPDF.innerHTML = `
            <svg class="w-4 h-4 mr-1.5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export Engineering PDF</span>
          `;
          btnExportPDF.disabled = false;
        }
      });

      // =========================================================================
      // 14. INITIALIZATION
      // =========================================================================
      function init() {
        resizeCanvas();
        init3DViewport();
        updateCalculations();
        fit2DView();
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }

    })();
  
import re

def update_admin_html():
    with open("admin.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add html5-qrcode.min.js before qrcode.min.js
    if 'src="js/html5-qrcode.min.js"' not in content:
        content = content.replace(
            '<script src="js/qrcode.min.js">',
            '<script src="js/html5-qrcode.min.js"></script>\n  <script src="js/qrcode.min.js">',
            1
        )
        print("Injected html5-qrcode.min.js into admin.html")

    # 2. Add Gate QR Scanner nav button in the sidebar
    nav_marker = """      <button type="button" class="admin-nav-btn" data-tab="tab-registrations" onclick="switchAdminTab('tab-registrations')">
        👥 Registrations &amp; Portal
      </button>"""

    scanner_nav_btn = """      <button type="button" class="admin-nav-btn" data-tab="tab-registrations" onclick="switchAdminTab('tab-registrations')">
        👥 Registrations &amp; Portal
      </button>
      <button type="button" class="admin-nav-btn" data-tab="tab-scanner" onclick="switchAdminTab('tab-scanner')" style="color: #0284C7; font-weight: 800;">
        📷 Gate QR Scanner &amp; Terminal
      </button>"""

    if nav_marker in content and 'data-tab="tab-scanner"' not in content:
        content = content.replace(nav_marker, scanner_nav_btn, 1)
        print("Injected Gate QR Scanner button into admin sidebar")

    # 3. Add shortcut button in Overview Quick Shortcuts
    shortcut_marker = """          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="addNewAdminEvent()">+ Add New Event</button>"""

    shortcut_replacement = """          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="switchAdminTab('tab-scanner')" style="background: rgba(2, 132, 199, 0.15); border: 1.5px solid #0284C7; color: #0284C7; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem;">
              📷 Launch Gate QR Scanner
            </button>
            <button class="btn btn-primary" onclick="addNewAdminEvent()">+ Add New Event</button>"""

    if shortcut_marker in content:
        content = content.replace(shortcut_marker, shortcut_replacement, 1)
        print("Injected shortcut button into Overview quick shortcuts")

    # 4. Add shortcut button in Registrations tab header
    reg_header_marker = '<button class="btn btn-secondary" id="btn-sync-sheet" onclick="syncRegistrationsFromGoogleSheet()"'
    reg_header_replacement = '<button class="btn btn-secondary" onclick="switchAdminTab(\'tab-scanner\')" style="background: rgba(2, 132, 199, 0.15); border: 1.5px solid #0284C7; color: #0284C7; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.1rem; font-size: 0.82rem;">📷 Scan Pass QR</button>\n            <button class="btn btn-secondary" id="btn-sync-sheet" onclick="syncRegistrationsFromGoogleSheet()"'

    if reg_header_marker in content and "Scan Pass QR" not in content:
        content = content.replace(reg_header_marker, reg_header_replacement, 1)
        print("Injected Scan Pass QR button in tab-registrations header")

    # 5. Add tab-scanner pane markup right before tab-schedule
    tab_schedule_marker = """      <!-- --------------------------------------------------------------------
           TAB: EVENT SCHEDULES
           -------------------------------------------------------------------- -->
      <div id="tab-schedule" class="admin-tab-pane" style="display: none;">"""

    tab_scanner_markup = """      <!-- --------------------------------------------------------------------
           TAB: GATE QR SCANNER & CHECK-IN TERMINAL
           -------------------------------------------------------------------- -->
      <div id="tab-scanner" class="admin-tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-tag" style="color: #0284C7; background: #E0F2FE; border-color: #BAE6FD;">[GATE SECURITY &amp; CHECK-IN TERMINAL]</span>
            <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #0F172A; margin: 0.2rem 0;">OFFICIAL GATE QR SCANNER &amp; CHECK-IN</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.2rem;">
              Scan delegate passes using your device webcam, mobile camera, or QR screenshot file to verify registration authenticity and clear gate entry in real time.
            </p>
          </div>
          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="syncRegistrationsFromGoogleSheet()" style="background: rgba(16, 185, 129, 0.15); border: 1.5px solid #10B981; color: #047857; font-weight: 700; padding: 0.5rem 1rem; font-size: 0.8rem;">
              🔄 Sync / Refresh Database
            </button>
            <button class="btn btn-ghost" onclick="switchAdminTab('tab-registrations')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
              👥 View All Registrations
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <!-- Left: Live Scanner Box -->
          <div class="cyber-card" style="padding: 1.5rem; background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="color: #0284C7; font-family: var(--font-display); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                📷 LIVE CAMERA SCANNER
              </h3>
              <span id="scanner-status-indicator" style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; background: #F1F5F9; color: #64748B;">
                READY
              </span>
            </div>

            <!-- Video Camera Viewport -->
            <div id="gate-qr-reader" style="width: 100%; min-height: 280px; background: #0F172A; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #94A3B8; text-align: center; border: 2px dashed #38BDF8;">
              <div id="gate-qr-reader-placeholder" style="padding: 2rem 1rem;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📷</div>
                <div style="color: #FFFFFF; font-weight: 700; margin-bottom: 0.3rem;">Camera Terminal Idle</div>
                <div style="font-size: 0.78rem; color: #94A3B8; margin-bottom: 1rem;">Click the button below to start live scanning with your device camera.</div>
                <button type="button" class="btn btn-primary" onclick="startGateQrScanner()" style="padding: 0.6rem 1.6rem; font-size: 0.85rem; border-radius: 50px;">
                  ⚡ START CAMERA SCANNER
                </button>
              </div>
            </div>

            <div style="display: flex; gap: 0.6rem; margin-top: 1rem; flex-wrap: wrap;">
              <button type="button" id="btn-stop-scanner" class="btn btn-ghost" onclick="stopGateQrScanner()" style="display: none; padding: 0.4rem 1rem; font-size: 0.8rem; color: #EF4444; border-color: #EF4444;">
                ⏹️ Stop Camera
              </button>
              <label class="btn btn-ghost" style="padding: 0.4rem 1rem; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; color: #0284C7; border-color: #0284C7; margin: 0;">
                📁 Scan QR Image File
                <input type="file" id="gate-qr-file-input" accept="image/*" style="display: none;" onchange="scanQrFromFile(this.files[0])">
              </label>
            </div>

            <!-- Manual Reg ID / USN Search Fallback -->
            <div style="margin-top: 1.4rem; padding-top: 1.2rem; border-top: 1px dashed #CBD5E1;">
              <label class="admin-label" style="font-size: 0.75rem; color: #475569; font-weight: 800;">MANUAL USN / REG ID LOOKUP</label>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
                <input type="text" id="manual-scan-input" class="admin-input" placeholder="e.g. ARENIUM27-REG-7911 or 20241BCI0063" style="font-family: var(--font-mono); font-size: 0.85rem;" onkeydown="if(event.key==='Enter') lookupManualGatePass()">
                <button type="button" class="btn btn-primary" onclick="lookupManualGatePass()" style="padding: 0.5rem 1.1rem; font-size: 0.82rem; white-space: nowrap;">
                  🔍 Lookup
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Scan Result & Gate Clearance Card -->
          <div class="cyber-card" style="padding: 1.5rem; background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="color: #0F172A; font-family: var(--font-display); font-size: 1.15rem; margin: 0;">
                🛡️ VERIFICATION &amp; CLEARANCE
              </h3>
              <span id="gate-clearance-pill" style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; background: #F1F5F9; color: #64748B;">
                AWAITING SCAN
              </span>
            </div>

            <div id="gate-scan-result-body" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: #94A3B8; padding: 2rem 1rem; border: 1.5px dashed #E2E8F0; border-radius: 12px; background: #F8FAFC;">
              <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎯</div>
              <div style="font-weight: 700; color: #475569; font-size: 0.95rem;">No Pass Scanned Yet</div>
              <div style="font-size: 0.78rem; color: #64748B; max-width: 260px; margin-top: 0.3rem;">
                Position a delegate's QR code in front of the camera, or upload their pass image, or type their Reg ID above.
              </div>
            </div>
          </div>
        </div>
      </div>
"""

    if 'id="tab-scanner"' not in content and tab_schedule_marker in content:
        content = content.replace(tab_schedule_marker, tab_scanner_markup + "\n" + tab_schedule_marker, 1)
        print("Injected tab-scanner pane into admin.html")

    with open("admin.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("admin.html updated successfully")


def update_main_js():
    with open("js/main.js", "r", encoding="utf-8") as f:
        content = f.read()

    # In switchAdminTab, auto-stop camera if leaving tab-scanner
    if "typeof stopGateQrScanner" not in content:
        content = content.replace(
            'window.switchAdminTab = function(targetTabId) {',
            'window.switchAdminTab = function(targetTabId) {\n        if (targetTabId !== "tab-scanner" && typeof stopGateQrScanner === "function") { try { stopGateQrScanner(); } catch(e){} }',
            1
        )
        print("Added auto-stop camera hook in switchAdminTab")

    scanner_controller_code = r"""
// ==========================================================================
// 18.3 GATE QR SCANNER & LIVE VERIFICATION TERMINAL
// ==========================================================================
let gateHtml5QrCode = null;
let currentScannedReg = null;

function playScanBeep(success = true) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(success ? 880 : 330, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + (success ? 0.15 : 0.3));
  } catch(e) {}
}

window.startGateQrScanner = function() {
  const placeholder = document.getElementById("gate-qr-reader-placeholder");
  const stopBtn = document.getElementById("btn-stop-scanner");
  const indicator = document.getElementById("scanner-status-indicator");

  if (typeof Html5Qrcode === "undefined") {
    alert("QR Scanner engine is initializing or blocked. Please refresh the page.");
    return;
  }

  if (placeholder) placeholder.style.display = "none";
  if (stopBtn) stopBtn.style.display = "inline-flex";
  if (indicator) {
    indicator.textContent = "● ACTIVE SCANNING";
    indicator.style.background = "#ECFDF5";
    indicator.style.color = "#047857";
  }

  if (!gateHtml5QrCode) {
    gateHtml5QrCode = new Html5Qrcode("gate-qr-reader");
  }

  const config = { fps: 10, qrbox: { width: 220, height: 220 } };

  gateHtml5QrCode.start(
    { facingMode: "environment" },
    config,
    (decodedText) => {
      handleGateQrScanned(decodedText);
    },
    (errorMessage) => {}
  ).catch(err => {
    console.error("Camera start error:", err);
    alert("Camera access denied or device has no camera: " + err + "\n\nYou can still click '📁 Scan QR Image File' or use 'Manual Lookup'!");
    stopGateQrScanner();
  });
};

window.stopGateQrScanner = function() {
  const placeholder = document.getElementById("gate-qr-reader-placeholder");
  const stopBtn = document.getElementById("btn-stop-scanner");
  const indicator = document.getElementById("scanner-status-indicator");

  if (gateHtml5QrCode && gateHtml5QrCode.isScanning) {
    gateHtml5QrCode.stop().then(() => {
      gateHtml5QrCode.clear();
      if (placeholder) placeholder.style.display = "block";
      if (stopBtn) stopBtn.style.display = "none";
      if (indicator) {
        indicator.textContent = "STOPPED";
        indicator.style.background = "#F1F5F9";
        indicator.style.color = "#64748B";
      }
    }).catch(err => console.error(err));
  } else {
    if (placeholder) placeholder.style.display = "block";
    if (stopBtn) stopBtn.style.display = "none";
    if (indicator) {
      indicator.textContent = "IDLE";
      indicator.style.background = "#F1F5F9";
      indicator.style.color = "#64748B";
    }
  }
};

window.scanQrFromFile = function(file) {
  if (!file) return;
  if (!gateHtml5QrCode) {
    gateHtml5QrCode = new Html5Qrcode("gate-qr-reader");
  }

  gateHtml5QrCode.scanFile(file, true)
    .then(decodedText => {
      handleGateQrScanned(decodedText);
    })
    .catch(err => {
      alert("No valid QR code could be detected in this image: " + err);
    });
};

window.lookupManualGatePass = function() {
  const input = document.getElementById("manual-scan-input");
  const query = input ? input.value.trim() : "";
  if (!query) {
    alert("Please enter a Registration ID or USN to look up.");
    return;
  }
  handleGateQrScanned(query);
};

window.handleGateQrScanned = function(rawText) {
  playScanBeep(true);
  const resultBody = document.getElementById("gate-scan-result-body");
  const clearancePill = document.getElementById("gate-clearance-pill");
  if (!resultBody) return;

  const db = FestDB.getData();
  const list = db.registrations || [];

  // 1. Try to find Registration ID in rawText
  let matchedReg = null;

  // Exact ID match or substring
  const regIdMatch = rawText.match(/ARENIUM27-REG-[0-9]+/i) || rawText.match(/AR27-[A-Z0-9-]+/i) || rawText.match(/TEST-[A-Z0-9-]+/i);
  const targetId = regIdMatch ? regIdMatch[0].toUpperCase() : rawText.trim().toUpperCase();

  matchedReg = list.find(r => 
    (r.id && r.id.toUpperCase() === targetId) ||
    (r.usn && r.usn.toUpperCase() === targetId) ||
    (r.fullName && r.fullName.toUpperCase() === targetId) ||
    (r.utrId && r.utrId.toUpperCase() === targetId)
  );

  currentScannedReg = matchedReg;

  if (clearancePill) {
    if (matchedReg) {
      clearancePill.textContent = "✅ ACCESS GRANTED";
      clearancePill.style.background = "#ECFDF5";
      clearancePill.style.color = "#047857";
    } else {
      clearancePill.textContent = "⚠️ UNREGISTERED PASS";
      clearancePill.style.background = "#FEF2F2";
      clearancePill.style.color = "#DC2626";
    }
  }

  if (matchedReg) {
    const isTeam = matchedReg.regType === "Team";
    const teamDisplayName = isTeam ? (matchedReg.teamName || "Squad") : matchedReg.fullName;
    const isInt = (matchedReg.category === "internal" || !matchedReg.category);
    const catLabel = matchedReg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
    const arenas = [matchedReg.event1Name || matchedReg.eventName, matchedReg.event2Name, matchedReg.event3Name].filter(b => b && b !== '-').join(" • ");
    const isCheckedIn = (matchedReg.status === "Checked In" || matchedReg.status === "Gate Cleared");

    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: ${isCheckedIn ? '#EFF6FF' : '#ECFDF5'}; border: 1.5px solid ${isCheckedIn ? '#93C5FD' : '#6EE7B7'}; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
            <span style="font-size: 0.72rem; color: ${isCheckedIn ? '#1D4ED8' : '#047857'}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              ${isCheckedIn ? 'ℹ️ ALREADY CHECKED IN' : '✅ GATE ENTRY CLEARED • OFFICIAL PASS'}
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #0284C7;">${matchedReg.id}</span>
          </div>
          <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: #0F172A; margin-bottom: 0.2rem;">
            ${isTeam ? 'Squad: ' + teamDisplayName : matchedReg.fullName}
          </div>
          <div style="font-size: 0.85rem; color: #475569;">
            Delegate Lead: <strong>${matchedReg.fullName}</strong> (${matchedReg.usn || 'N/A'}) • ${matchedReg.college || 'Presidency University'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.84rem; margin-bottom: 1.2rem;">
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Participation:</strong> <strong>${isTeam ? 'Team Entry' : 'Solo Entry'}</strong></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Fee Paid:</strong> <strong style="color: #047857;">${matchedReg.feePaid || '₹200'} (Verified)</strong></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">UTR ID:</strong> <code style="color: #475569;">${matchedReg.utrId || 'N/A'}</code></div>
          <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Registered Arenas:</strong> <strong style="color: #0F172A;">${arenas || 'General Fest Entry'}</strong></div>
        </div>

        ${matchedReg.teamMembers ? `
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem; font-size: 0.78rem; color: #334155;">
            <strong style="color: #0369A1; display: block; margin-bottom: 0.2rem;">👥 Squad Roster:</strong>
            ${matchedReg.teamMembers}
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="markGatePassCheckedIn('${matchedReg.id}')" style="background: #059669; border-color: #047857; padding: 0.6rem 1.4rem; font-size: 0.82rem; font-weight: 700;">
            ${isCheckedIn ? '✓ Refresh Check-In' : '✅ MARK AS CHECKED IN'}
          </button>
          <button type="button" class="btn btn-ghost" onclick="viewAdminPassModal('${matchedReg.id}')" style="padding: 0.6rem 1.1rem; font-size: 0.82rem; color: #0284C7; border-color: #0284C7;">
            🎫 Full Pass Preview
          </button>
        </div>
      </div>
    `;
  } else {
    // If not found in local db, display scanned raw text
    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: #FEF2F2; border: 1.5px solid #FCA5A5; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
          <div style="color: #DC2626; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.3rem;">⚠️ Pass ID Not Found in Local Database</div>
          <div style="font-size: 0.78rem; color: #7F1D1D; line-height: 1.45;">
            The scanned QR code was decoded, but its ID does not match any existing local records. Click <strong>"Sync / Refresh Database"</strong> above to pull newly registered students from Google Sheets!
          </div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.8rem; font-size: 0.78rem; font-family: var(--font-mono); color: #334155; white-space: pre-wrap; word-break: break-all;">
          ${rawText}
        </div>
        <button type="button" class="btn btn-primary" onclick="syncRegistrationsFromGoogleSheet()" style="margin-top: 1rem; padding: 0.5rem 1.2rem; font-size: 0.82rem;">
          🔄 Sync from Google Sheet Now
        </button>
      </div>
    `;
  }
};

window.markGatePassCheckedIn = function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg) return;

  reg.status = "Checked In";
  reg.checkInTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  FestDB.saveData(db);

  renderAdminRegistrations(db);
  renderAdminOverview(db);
  handleGateQrScanned(regId);

  alert(`✓ DELEGATE CLEARED & CHECKED IN!\n\nPass ID: ${reg.id}\nDelegate: ${reg.fullName}\nTime: ${reg.checkInTime}`);
};
"""

    if "18.3 GATE QR SCANNER" not in content:
        content += scanner_controller_code
        print("Appended Gate QR Scanner controller to js/main.js")

    with open("js/main.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("js/main.js updated successfully")

update_admin_html()
update_main_js()

import re

def update_admin():
    with open("admin.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Include qrcode.min.js before main.js
    if 'src="js/qrcode.min.js"' not in content:
        content = content.replace(
            '<script src="js/main.js',
            '<script src="js/qrcode.min.js"></script>\n  <script src="js/main.js',
            1
        )
        print("Injected qrcode.min.js into admin.html")

    # 2. Add admin-pass-modal right after admin-proof-modal
    pass_modal_markup = """
  <!-- ========================================================================
       ADMIN DELEGATE PASS & QR PREVIEW MODAL
       ======================================================================== -->
  <div id="admin-pass-modal" class="admin-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 100000; align-items: center; justify-content: center; padding: 1.5rem;">
    <div class="admin-modal-content" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 20px; width: 100%; max-width: 680px; max-height: 92vh; overflow-y: auto; padding: 1.8rem; box-shadow: 0 25px 60px rgba(0,0,0,0.22); position: relative; color: #0F172A;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 0.8rem; margin-bottom: 1rem;">
        <div>
          <span class="section-tag" style="margin: 0; color: #0369A1; background: #E0F2FE; border-color: #BAE6FD;">[DELEGATE CREDENTIALS &amp; QR]</span>
          <h3 style="color: #0F172A; font-family: var(--font-display); font-size: 1.25rem; margin: 0.2rem 0 0;" id="admin-pass-modal-title">
            Official Delegate Pass &amp; Terminal QR
          </h3>
        </div>
        <button type="button" class="btn btn-ghost" onclick="closeAdminPassModal()" style="padding: 0.3rem 0.7rem; font-size: 0.9rem;" title="Close pass">
          ✕
        </button>
      </div>

      <div id="admin-pass-modal-body">
        <!-- Rendered dynamically -->
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; flex-wrap: wrap; gap: 0.8rem; border-top: 1.5px solid #E2E8F0; padding-top: 1rem;">
        <button type="button" class="btn btn-primary" onclick="printAdminPassModal()" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
          🖨️ Print Pass
        </button>
        <button type="button" class="btn btn-ghost" onclick="closeAdminPassModal()" style="padding: 0.5rem 1.2rem; font-size: 0.82rem;">
          Close
        </button>
      </div>
    </div>
  </div>
"""

    if 'id="admin-pass-modal"' not in content:
        proof_end_pattern = '</div>\n  </div>\n</body>'
        if proof_end_pattern in content:
            content = content.replace(proof_end_pattern, '</div>\n  </div>\n' + pass_modal_markup + '\n</body>', 1)
            print("Injected admin-pass-modal markup into admin.html")

    with open("admin.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("admin.html saved successfully")


def update_main_js():
    with open("js/main.js", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add "Pass & QR" button in table row
    target_btn = """<button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#34D399; border-color:#34D399;" onclick="setAdminRegStatus('${r.id}', 'Confirmed')">"""
    replacement_btn = """<button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#0284C7; border-color:#0284C7; margin-right:4px;" onclick="viewAdminPassModal('${r.id}')" title="View Pass & Terminal QR">🎫 Pass &amp; QR</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#34D399; border-color:#34D399;" onclick="setAdminRegStatus('${r.id}', 'Confirmed')">"""
    
    if target_btn in content and 'viewAdminPassModal' not in content:
        content = content.replace(target_btn, replacement_btn, 1)
        print("Added Pass & QR button to table row in js/main.js")

    # 2. Add window.viewAdminPassModal, window.closeAdminPassModal, window.printAdminPassModal
    admin_pass_js = r"""
// ==========================================================================
// 18.2 ADMIN DELEGATE PASS & QR MODAL CONTROLLER
// ==========================================================================
window.closeAdminPassModal = function() {
  const modal = document.getElementById("admin-pass-modal");
  if (modal) modal.style.display = "none";
};

window.printAdminPassModal = function() {
  window.print();
};

window.viewAdminPassModal = function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg) {
    alert("Registration record not found (" + regId + ").");
    return;
  }

  const modal = document.getElementById("admin-pass-modal");
  const modalBody = document.getElementById("admin-pass-modal-body");
  if (!modal || !modalBody) return;

  const isInt = (reg.category === "internal" || !reg.category);
  const catLabel = reg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
  const isTeam = reg.regType === "Team";
  const teamDisplayName = isTeam ? (reg.teamName || "Squad") : reg.fullName;
  
  let memberCount = 1;
  if (isTeam && reg.teamMembers) {
    // Estimate count from teamMembers string or list
    if (reg.teamMembersList && reg.teamMembersList.length) {
      memberCount = reg.teamMembersList.length + 1;
    } else {
      const parts = reg.teamMembers.split("|").filter(Boolean);
      memberCount = Math.max(parts.length, 2);
    }
  }
  const participantsLabel = isTeam ? `${memberCount} Confirmed Members` : "1 Participant (Solo)";

  const arenas = [reg.event1Name || reg.eventName, reg.event2Name, reg.event3Name].filter(Boolean).join(", ");

  const qrDataPayload = [
    "=== ARENIUM'27 OFFICIAL GATE PASS ===",
    `REG ID: ${reg.id}`,
    `TYPE: ${isTeam ? 'Team Entry' : 'Solo Entry'}`,
    `TEAM / DELEGATE: ${teamDisplayName}`,
    `PARTICIPANTS: ${participantsLabel}`,
    `CATEGORY: ${catLabel}`,
    `LEAD / USN: ${reg.fullName} (${reg.usn || 'N/A'})`,
    `PHONE: ${reg.phone || 'N/A'}`,
    `COLLEGE: ${reg.college || 'Presidency University'}`,
    `ARENAS: ${arenas}`,
    `FEE PAID: ${reg.feePaid || '₹200'} (Verified)`,
    `UTR REF: ${reg.utrId || 'N/A'}`,
    `ENTRY STATUS: ${reg.status || 'Confirmed'}`,
    "Presidency University, Bengaluru • 4-5 Feb 2027"
  ].join("\n");

  modalBody.innerHTML = `
    <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 1.2rem; margin-bottom: 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; border-bottom: 1px dashed #CBD5E1; padding-bottom: 0.6rem;">
        <div>
          <div style="font-size: 0.72rem; color: #0284C7; font-weight: 700; letter-spacing: 1px;">PRESIDENCY UNIVERSITY • SOIS</div>
          <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #0F172A;">ARENIUM'27 DELEGATE PASS</div>
        </div>
        <div style="text-align: right;">
          <span style="background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">✓ ${reg.status || 'Confirmed'}</span>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #0284C7; font-weight: 700; margin-top: 3px;">${reg.id}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; font-size: 0.85rem; margin-bottom: 1rem;">
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Delegate / Lead:</strong> <strong>${reg.fullName}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">College:</strong> ${reg.college}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">USN / ID:</strong> ${reg.usn}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Participation:</strong> <strong>${isTeam ? 'Team: ' + teamDisplayName : 'Solo'}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Fee Paid:</strong> <strong style="color: #047857;">${reg.feePaid || '₹200'}</strong></div>
        <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Registered Arenas:</strong> <div style="color: #0F172A; font-weight: 600;">${arenas}</div></div>
      </div>

      <!-- QR Code Section -->
      <div style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1.2rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <div id="admin-pass-qr-target" style="padding: 6px; background: #FFF; border-radius: 8px; border: 1px solid #E2E8F0; min-width: 120px; min-height: 120px; display: flex; align-items: center; justify-content: center;"></div>
          <div>
            <div style="font-size: 0.72rem; color: #0284C7; font-weight: 800; letter-spacing: 0.5px;">OFFICIAL GATE TERMINAL QR</div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #0F172A; margin: 2px 0;">${isTeam ? 'Squad: ' + teamDisplayName : 'Delegate: ' + teamDisplayName}</div>
            <div style="font-size: 0.8rem; color: #475569;"><strong>Participants:</strong> <span style="color: #047857; font-weight: 700;">${participantsLabel}</span></div>
            <div style="font-size: 0.8rem; color: #475569;"><strong>Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
          </div>
        </div>
        <div style="font-size: 0.72rem; color: #64748B; max-width: 220px; line-height: 1.4; border-left: 1.5px solid #E2E8F0; padding-left: 0.8rem;">
          Scan with phone camera or terminal barcode scanner at gate to verify registration validity and event roster.
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";

  const qrTarget = document.getElementById("admin-pass-qr-target");
  if (qrTarget) {
    qrTarget.innerHTML = "";
    let qrDone = false;
    if (typeof QRCode !== "undefined") {
      try {
        new QRCode(qrTarget, {
          text: qrDataPayload,
          width: 110,
          height: 110,
          colorDark: "#0F172A",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.M
        });
        qrDone = true;
      } catch(e){}
    }
    if (!qrDone) {
      const img = document.createElement("img");
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&format=png&data=${encodeURIComponent(qrDataPayload)}`;
      img.style.width = "110px";
      img.style.height = "110px";
      qrTarget.appendChild(img);
    }
  }
};
"""

    if "window.viewAdminPassModal" not in content:
        content += admin_pass_js
        print("Appended window.viewAdminPassModal to js/main.js")

    with open("js/main.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("js/main.js saved successfully")

update_admin()
update_main_js()

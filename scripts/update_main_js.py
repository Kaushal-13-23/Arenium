import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('js/main.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update FestDB.getDefaults() default certificates to include teamName
old_certs_def = """      certificates: [
        {
          id: "AR27-HCK-001",
          recipient: "Team NeuralForge",
          event: "TECHNOVA '27",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-HCK-002",
          recipient: "CyberSentinels",
          event: "TECHNOVA '27",
          award: "RUNNER UP · SECOND PLACE",
          college: "BMS College of Engineering",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-COD-001",
          recipient: "Kiran R",
          event: "SHADOWCODE",
          award: "CHAMPION · FIRST PLACE",
          college: "PES University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-TRL-001",
          recipient: "CipherKnights",
          event: "TECH ODYSSEY",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-LAN-001",
          recipient: "Phantom Apex",
          event: "QUAD DAMAGE",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-DSN-001",
          recipient: "PixelCraft Duo",
          event: "DESIGNNOVA",
          award: "CHAMPION · FIRST PLACE",
          college: "National Institute of Design / PU",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-PRT-042",
          recipient: "Kaushal Kumar Singh",
          event: "TECHNOVA '27",
          award: "CERTIFICATE OF MERIT & PARTICIPATION",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        }
      ]"""

new_certs_def = """      certificates: [
        {
          id: "AR27-HCK-001",
          teamName: "Team NeuralForge",
          recipient: "Team NeuralForge",
          event: "TECHNOVA '27",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-HCK-002",
          teamName: "CyberSentinels",
          recipient: "CyberSentinels",
          event: "TECHNOVA '27",
          award: "RUNNER UP · SECOND PLACE",
          college: "BMS College of Engineering",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-COD-001",
          teamName: "Shadow Devs",
          recipient: "Kiran R",
          event: "SHADOWCODE",
          award: "CHAMPION · FIRST PLACE",
          college: "PES University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-TRL-001",
          teamName: "CipherKnights",
          recipient: "CipherKnights",
          event: "TECH ODYSSEY",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-LAN-001",
          teamName: "Phantom Apex",
          recipient: "Phantom Apex",
          event: "QUAD DAMAGE",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-DSN-001",
          teamName: "PixelCraft Duo",
          recipient: "PixelCraft Duo",
          event: "DESIGNNOVA",
          award: "CHAMPION · FIRST PLACE",
          college: "National Institute of Design / PU",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-PRT-042",
          teamName: "NeuralSentinels",
          recipient: "Kaushal Kumar Singh",
          event: "TECHNOVA '27",
          award: "CERTIFICATE OF MERIT & PARTICIPATION",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        }
      ]"""

if old_certs_def in code:
    code = code.replace(old_certs_def, new_certs_def, 1)
    print("1. Updated default certificates with teamName.")
else:
    print("Warning: old_certs_def exact match not found, checking fallback...")

# 2. Update FestDB.getData() to persist certificates
old_get_data_line = "registrations: (parsed.registrations && Array.isArray(parsed.registrations)) ? parsed.registrations : defaults.registrations"
new_get_data_line = """registrations: (parsed.registrations && Array.isArray(parsed.registrations)) ? parsed.registrations : defaults.registrations,
          certificates: (parsed.certificates && Array.isArray(parsed.certificates) && parsed.certificates.length) ? parsed.certificates : defaults.certificates"""

if old_get_data_line in code and "certificates: (parsed.certificates" not in code:
    code = code.replace(old_get_data_line, new_get_data_line, 1)
    print("2. Added certificates persistence to FestDB.getData().")

# 3. Replace lines 1970 to 2345 (Section 14: Certificate Studio & Search)
sec14_start = code.find("// 14. CERTIFICATE FRAMING STUDIO & HIGH-RES DOWNLOAD")
sec15_start = code.find("// ==========================================================================\n// 15. GALLERY PAGE")
if sec15_start == -1:
    sec15_start = code.find("// 15. GALLERY PAGE")

if sec14_start != -1 and sec15_start != -1:
    print(f"3. Found section 14 from {sec14_start} to {sec15_start}.")
    new_sec14 = """// 14. OFFICIAL CERTIFICATE RETRIEVAL PORTAL & HIGH-RES VERIFICATION
// ==========================================================================
function initCertificateStudio(db) {
  // Backwards-compatible router: initializes official certificate search portal
  initCertificateSearch(db);
}

// Generate official 300 DPI high-definition canvas certificate Data URL
function generateCertificateCanvasDataUrl(recipientName, eventName, award, college, certId, teamName) {
  const name = (recipientName || teamName || "PARTICIPANT NAME").toUpperCase();
  const event = (eventName || "ARENIUM 27 ARENA").toUpperCase();
  const awd = (award || "CERTIFICATE OF MERIT & PARTICIPATION").toUpperCase();
  const clg = (college || "PRESIDENCY UNIVERSITY, BENGALURU").toUpperCase();
  const hashId = certId || ("AR27-CRT-" + Math.floor(1000 + Math.random() * 9000));
  const team = teamName ? teamName.toUpperCase() : "";

  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1414;
  const ctx = canvas.getContext("2d");

  // 1. Dark Cyber Background
  ctx.fillStyle = "#07060f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Outer Sovereign Gold / Crimson Frame
  const frameColor = awd.includes("FIRST") || awd.includes("CHAMPION") ? "#ffd700" : (awd.includes("SECOND") ? "#38bdf8" : "#f43f5e");
  ctx.lineWidth = 18;
  ctx.strokeStyle = frameColor;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Inner subtle neon matrix grid
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
  ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

  // Corner Cyber Brackets
  const cornerLen = 60;
  ctx.lineWidth = 6;
  ctx.strokeStyle = frameColor;
  // TL
  ctx.beginPath(); ctx.moveTo(85, 85 + cornerLen); ctx.lineTo(85, 85); ctx.lineTo(85 + cornerLen, 85); ctx.stroke();
  // TR
  ctx.beginPath(); ctx.moveTo(canvas.width - 85 - cornerLen, 85); ctx.lineTo(canvas.width - 85, 85); ctx.lineTo(canvas.width - 85, 85 + cornerLen); ctx.stroke();
  // BL
  ctx.beginPath(); ctx.moveTo(85, canvas.height - 85 - cornerLen); ctx.lineTo(85, canvas.height - 85); ctx.lineTo(85 + cornerLen, canvas.height - 85); ctx.stroke();
  // BR
  ctx.beginPath(); ctx.moveTo(canvas.width - 85 - cornerLen, canvas.height - 85); ctx.lineTo(canvas.width - 85, canvas.height - 85); ctx.lineTo(canvas.width - 85, canvas.height - 85 - cornerLen); ctx.stroke();

  // Watermark Crest
  ctx.fillStyle = "rgba(56, 189, 248, 0.03)";
  ctx.font = "bold 440px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("A'27", canvas.width / 2, canvas.height / 2 + 150);

  // Institution Header
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 38px 'Orbitron', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PRESIDENCY UNIVERSITY, BENGALURU", canvas.width / 2, 170);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("SCHOOL OF INFORMATION SCIENCE (SOIS) · ARENIUM '27", canvas.width / 2, 215);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px 'Orbitron', sans-serif";
  ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2, 320);

  ctx.fillStyle = frameColor;
  ctx.font = "bold 30px 'Orbitron', sans-serif";
  ctx.fillText(`⚡ ${awd} ⚡`, canvas.width / 2, 380);

  // Presentation Text
  ctx.fillStyle = "#94a3b8";
  ctx.font = "26px 'JetBrains Mono', monospace";
  ctx.fillText("THIS IS OFFICIALLY PRESENTED TO", canvas.width / 2, 470);

  // Recipient / Team Name
  ctx.fillStyle = "#ffe600";
  ctx.font = "bold 76px 'Rajdhani', sans-serif";
  ctx.fillText(name, canvas.width / 2, 570);

  // Optional Team Badge if individual name differs from team name
  if (team && team !== name) {
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 30px 'JetBrains Mono', monospace";
    ctx.fillText(`[ SQUAD / TEAM: ${team} ]`, canvas.width / 2, 630);
  }

  // Dash line
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 230, 0, 0.4)";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 400, 660);
  ctx.lineTo(canvas.width / 2 + 400, 660);
  ctx.stroke();

  // College & Event Citation
  ctx.fillStyle = "#ffffff";
  ctx.font = "30px 'JetBrains Mono', monospace";
  ctx.fillText(`of ${clg}`, canvas.width / 2, 725);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "26px 'JetBrains Mono', monospace";
  ctx.fillText("for exemplary performance, teamwork, and triumph in", canvas.width / 2, 785);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 46px 'Orbitron', sans-serif";
  ctx.fillText(event, canvas.width / 2, 860);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("at ARENIUM'27 National Tech Fest · 4–5 February 2027 · Presidency University", canvas.width / 2, 930);

  // Signatures Section
  const sigY = 1170;
  // Signatory 1
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. C. Kalaiarasan", canvas.width / 4, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("DEAN, SOIS (PATRON)", canvas.width / 4, sigY + 35);

  // Signatory 2
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. K. G. Mohan", canvas.width / 2, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("HEAD OF DEPARTMENT, SOIS", canvas.width / 2, sigY + 35);

  // Signatory 3
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Ms. Keren Lois Daniel", (canvas.width / 4) * 3, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("OVERALL FEST COORDINATOR", (canvas.width / 4) * 3, sigY + 35);

  // Verification Hash
  ctx.fillStyle = "#38bdf8";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`VERIFICATION HASH: ${hashId} · SOIS-PRESIDENCY-VALIDATED`, 90, 1335);

  return canvas.toDataURL("image/png");
}

function initCertificateSearch(db) {
  const searchInput = document.getElementById("cert-search-input");
  const searchBtn = document.getElementById("cert-search-btn");
  const resultsDiv = document.getElementById("cert-search-results");
  const statusBadge = document.getElementById("cert-published-badge");

  if (!searchInput || !searchBtn || !resultsDiv) return;

  if (statusBadge) {
    if (db.settings.certificatesPublished !== false) {
      statusBadge.textContent = "⚡ CERTIFICATES REPOSITORY LIVE";
      statusBadge.style.color = "#38BDF8";
      statusBadge.style.borderColor = "#38BDF8";
    } else {
      statusBadge.textContent = "🔒 CERTIFICATE UPLOADS IN PROGRESS";
      statusBadge.style.color = "#F59E0B";
      statusBadge.style.borderColor = "#F59E0B";
    }
  }

  window.searchTeamCert = function(teamName) {
    if (searchInput) {
      searchInput.value = teamName;
      performSearch();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  function performSearch() {
    const q = searchInput.value.trim().toLowerCase();
    resultsDiv.style.display = "block";

    if (db.settings.certificatesPublished === false) {
      resultsDiv.innerHTML = `
        <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid #F59E0B; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h4 style="color: #FBBF24; margin-bottom: 0.5rem; font-family: var(--font-display); font-size: 1.2rem; font-weight: 700;">⚡ CERTIFICATES UNDER VERIFICATION</h4>
          <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0; line-height: 1.6;">
            Event coordinators and the SOIS fest committee are currently reviewing and digitally endorsing participant accreditations. Official team downloads will be unlocked momentarily!
          </p>
        </div>
      `;
      return;
    }

    if (!q) {
      resultsDiv.innerHTML = `
        <div style="padding: 1.5rem; color: #94A3B8; font-size: 0.9rem; text-align: center; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px dashed rgba(255, 255, 255, 0.1);">
          Please enter your registered <strong>Team Name</strong> (e.g. <code>Team NeuralForge</code>, <code>CyberSentinels</code>) to retrieve certificates.
        </div>
      `;
      return;
    }

    // Refresh DB
    const freshDb = FestDB.getData();
    const certs = (freshDb.certificates || []).map(c => ({
      ...c,
      teamName: c.teamName || c.recipient || "Team"
    }));

    const matches = certs.filter(c => {
      const t = (c.teamName || "").toLowerCase();
      const r = (c.recipient || "").toLowerCase();
      const id = (c.id || "").toLowerCase();
      const ev = (c.event || "").toLowerCase();
      return t.includes(q) || r.includes(q) || id.includes(q) || ev.includes(q);
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = `
        <div style="padding: 2.2rem; background: rgba(15, 23, 42, 0.85); border: 1.5px dashed rgba(239, 68, 68, 0.45); border-radius: 10px; text-align: center;">
          <div style="color: #F87171; font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 0.6rem; font-weight: 800;">
            NO CERTIFICATES FOUND FOR "${searchInput.value.trim()}"
          </div>
          <p style="color: #CBD5E1; font-size: 0.88rem; max-width: 600px; margin: 0 auto 1.4rem; line-height: 1.6;">
            We could not locate any certificates uploaded for <strong>"${searchInput.value.trim()}"</strong>.<br>
            • Please verify the team name spelling matches your fest registration credentials.<br>
            • Certificates are uploaded by administrators after each competitive arena concludes.<br>
            • For assistance or urgent accreditation requests, visit the SOIS Fest Desk.
          </p>
          <div style="display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap;">
            <button class="btn btn-ghost" onclick="document.getElementById('cert-search-input').value=''; document.getElementById('cert-search-input').focus();" style="font-size: 0.85rem; padding: 0.6rem 1.2rem;">
              🔄 Clear Search
            </button>
            <a href="contact.html" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.6rem 1.2rem;">
              📍 Contact SOIS Fest Desk
            </a>
          </div>
        </div>
      `;
      return;
    }

    let cardsHtml = matches.map(m => {
      const displayTeam = m.teamName || m.recipient || "Team";
      const displayRecipient = m.recipient && m.recipient !== displayTeam ? m.recipient : "";
      const previewSrc = m.fileUrl ? m.fileUrl : generateCertificateCanvasDataUrl(m.recipient, m.event, m.award, m.college, m.id, m.teamName);

      return `
        <div class="cyber-card cert-result-card" style="padding: 1.6rem; margin-bottom: 1.2rem; background: rgba(15, 23, 42, 0.95); border: 1.5px solid rgba(56, 189, 248, 0.45); border-radius: 10px; display: grid; grid-template-columns: minmax(180px, 240px) 1fr; gap: 1.5rem; align-items: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          
          <!-- Certificate Thumbnail with Click to Preview -->
          <div style="position: relative; cursor: pointer; border-radius: 6px; overflow: hidden; border: 1.5px solid rgba(56, 189, 248, 0.5); aspect-ratio: 16/11; background: #07060f;" onclick="openCertPreviewModal('${m.id}')" title="Click to view fullscreen">
            <img src="${previewSrc}" alt="Certificate for ${displayTeam}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #38BDF8; font-size: 0.7rem; font-family: var(--font-mono); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.4);">
              👁️ FULLSCREEN
            </span>
          </div>

          <!-- Certificate Details -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.4rem;">
              <span style="font-family: var(--font-mono); color: #38BDF8; font-weight: 800; font-size: 0.9rem;">
                [${m.id}]
              </span>
              <span style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38BDF8; color: #38BDF8; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                OFFICIALLY VERIFIED ✓
              </span>
            </div>

            <h3 style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-family: var(--font-display); font-size: 1.4rem; margin: 0 0 0.3rem; font-weight: 800; letter-spacing: 0.02em;">
              ${displayTeam}
            </h3>

            ${displayRecipient ? `<div style="color: #CBD5E1; font-size: 0.88rem; margin-bottom: 0.4rem;">Recipient / Member: <strong style="color: #FFFFFF;">${displayRecipient}</strong></div>` : ''}

            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin: 0.5rem 0 0.8rem;">
              <span style="background: rgba(253, 224, 71, 0.15); border: 1px solid #FDE047; color: #FDE047; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                ${m.award}
              </span>
              <span style="background: rgba(56, 189, 248, 0.12); color: #38BDF8; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                ARENA: ${m.event}
              </span>
            </div>

            <div style="color: #94A3B8; font-size: 0.82rem; margin-bottom: 1.2rem;">
              Institution: <strong style="color: #CBD5E1;">${m.college || 'Presidency University, Bengaluru'}</strong> · Issued: ${m.issueDate || 'February 2027'}
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" onclick="downloadTeamCertificate('${m.id}')" style="font-size: 0.88rem; padding: 0.65rem 1.4rem; font-weight: 700;">
                ⚡ DOWNLOAD CERTIFICATE
              </button>
              <button type="button" class="btn btn-ghost" onclick="openCertPreviewModal('${m.id}')" style="font-size: 0.88rem; padding: 0.65rem 1.1rem;">
                👁️ PREVIEW FULLSCREEN
              </button>
            </div>
          </div>

        </div>
      `;
    }).join("");

    resultsDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.6rem;">
        <div style="font-family: var(--font-mono); font-size: 0.88rem; color: #38BDF8; font-weight: 700;">
          FOUND ${matches.length} OFFICIAL CERTIFICATE(S) FOR "${searchInput.value.trim().toUpperCase()}":
        </div>
        <button type="button" class="btn btn-ghost" onclick="document.getElementById('cert-search-input').value=''; document.getElementById('cert-search-input').focus();" style="font-size: 0.75rem; padding: 0.3rem 0.8rem;">
          ✕ Clear Search
        </button>
      </div>
      ${cardsHtml}
    `;
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });

  // Auto-search via URL parameter (e.g. certificate.html?team=NeuralForge or ?winner=Team)
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get("team") || urlParams.get("winner") || urlParams.get("recipient") || urlParams.get("q");
  if (qParam && searchInput) {
    searchInput.value = qParam;
    setTimeout(performSearch, 150);
  }
}

// Fullscreen Modal Helpers
window.openCertPreviewModal = function(certId) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === certId);
  if (!c) return;

  const modal = document.getElementById("cert-preview-modal");
  const modalId = document.getElementById("cert-modal-id");
  const modalTitle = document.getElementById("cert-modal-title");
  const modalBody = document.getElementById("cert-modal-body");
  const downloadBtn = document.getElementById("cert-modal-download-btn");

  if (!modal) return;

  if (modalId) modalId.textContent = `[${c.id}]`;
  if (modalTitle) modalTitle.textContent = `${(c.teamName || c.recipient).toUpperCase()} · ${c.event}`;

  const certDataUrl = c.fileUrl ? c.fileUrl : generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);

  if (modalBody) {
    modalBody.innerHTML = `
      <div style="text-align: center; background: #07060f; padding: 0.8rem; border-radius: 8px; border: 1.5px solid rgba(56, 189, 248, 0.4); max-height: 72vh; overflow: auto; display: flex; justify-content: center; align-items: center;">
        <img src="${certDataUrl}" alt="Certificate ${c.id}" style="max-width: 100%; max-height: 68vh; object-fit: contain; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
      </div>
    `;
  }

  if (downloadBtn) {
    downloadBtn.onclick = function() {
      downloadTeamCertificate(c.id);
    };
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeCertModal = function(e) {
  const modal = document.getElementById("cert-preview-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

window.downloadTeamCertificate = function(certId) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === certId);
  if (!c) return;

  const teamSlug = (c.teamName || c.recipient || "Team").replace(/\s+/g, "_");
  const filename = `ARENIUM27_Certificate_${teamSlug}_${c.id}.png`;

  if (c.fileUrl && c.fileUrl.startsWith("data:")) {
    const a = document.createElement("a");
    a.href = c.fileUrl;
    a.download = filename;
    a.click();
  } else if (c.fileUrl && (c.fileUrl.startsWith("http://") || c.fileUrl.startsWith("https://"))) {
    window.open(c.fileUrl, "_blank");
  } else {
    const dataUrl = generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }
};

window.downloadSpecificCertificate = function(name, eventName, award, college, certId) {
  downloadTeamCertificate(certId);
};
"""
    code = code[:sec14_start] + new_sec14 + "\n\n" + code[sec15_start:]
    print("3. Replaced section 14 successfully.")
else:
    print("Error: Could not locate Section 14 boundaries.")
    sys.exit(1)

# 4. Replace Section: Admin Certificates Management (renderAdminCertificates, addNewAdminCertificate, etc.)
admin_cert_start = code.find("function renderAdminCertificates(db) {")
admin_win_start = code.find("window.editAdminWinner = function(idx) {")

if admin_cert_start != -1 and admin_win_start != -1:
    print(f"4. Found Admin Certificates from {admin_cert_start} to {admin_win_start}.")
    new_admin_certs = """function renderAdminCertificates(db) {
  const publishToggle = document.getElementById("admin-publish-certs-toggle");
  if (publishToggle) {
    publishToggle.checked = db.settings.certificatesPublished !== false;
    // Remove old listeners by replacing element or assigning onchange
    publishToggle.onchange = () => {
      db.settings.certificatesPublished = publishToggle.checked;
      FestDB.saveData(db);
      alert(publishToggle.checked ? "✅ Public Certificate Downloads are now ENABLED on certificate.html!" : "🔒 Public Certificate Downloads are now DISABLED.");
    };
  }

  // Populate Event dropdown in upload form
  const eventSelect = document.getElementById("admin-cert-event");
  if (eventSelect && db.events) {
    const currentVal = eventSelect.value;
    eventSelect.innerHTML = "";
    db.events.forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.name;
      opt.textContent = ev.name;
      eventSelect.appendChild(opt);
    });
    if (currentVal) eventSelect.value = currentVal;
  }

  // Render Table
  const container = document.getElementById("admin-certs-table-body");
  const countSpan = document.getElementById("admin-certs-count");
  if (!container) return;

  const certs = db.certificates || [];
  if (countSpan) countSpan.textContent = certs.length;

  if (certs.length === 0) {
    container.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No certificates uploaded yet. Use the upload form above to publish certificates by Team Name.</td></tr>`;
    return;
  }

  container.innerHTML = certs.map(c => {
    const team = c.teamName || c.recipient || "Team";
    const recipient = c.recipient && c.recipient !== team ? c.recipient : "-";
    const fileBadge = c.fileUrl ? 
      `<a href="${c.fileUrl}" target="_blank" style="color:#38BDF8; font-size:0.75rem; text-decoration:underline;">📎 Uploaded File</a>` :
      `<span style="color:#94A3B8; font-size:0.75rem;">⚡ Auto-Generated High-Res</span>`;

    return `
      <tr>
        <td><strong style="color:#38BDF8; font-family:var(--font-mono);">${c.id}</strong></td>
        <td><strong style="color:#FFFFFF; font-size:0.95rem;">${team}</strong></td>
        <td>${recipient}</td>
        <td><span style="color:#38BDF8; font-weight:600;">${c.event}</span></td>
        <td><span class="event-category-badge" style="font-size:0.7rem;">${c.award}</span></td>
        <td>${fileBadge}</td>
        <td>
          <button type="button" class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="adminPreviewCert('${c.id}')">👁️ View</button>
          <button type="button" class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:#F87171; border-color:rgba(248, 113, 113, 0.4);" onclick="deleteAdminCertificate('${c.id}')">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join("");
}

// Admin Upload Form State
let adminSelectedCertFileBase64 = "";
let adminSelectedCertFileName = "";

window.handleAdminCertFileSelect = function(e) {
  const file = e.target.files[0];
  const previewBox = document.getElementById("admin-cert-file-preview");
  const filenameSpan = document.getElementById("admin-cert-preview-filename");
  const filesizeSpan = document.getElementById("admin-cert-preview-filesize");
  const previewImg = document.getElementById("admin-cert-preview-img");

  if (!file) {
    adminSelectedCertFileBase64 = "";
    adminSelectedCertFileName = "";
    if (previewBox) previewBox.style.display = "none";
    return;
  }

  adminSelectedCertFileName = file.name;
  if (filenameSpan) filenameSpan.textContent = file.name;
  if (filesizeSpan) filesizeSpan.textContent = (file.size / 1024).toFixed(1) + " KB";
  if (previewBox) previewBox.style.display = "flex";

  const reader = new FileReader();
  reader.onload = function(evt) {
    adminSelectedCertFileBase64 = evt.target.result;
    if (previewImg) {
      if (file.type.startsWith("image/")) {
        previewImg.src = adminSelectedCertFileBase64;
        previewImg.style.display = "block";
      } else {
        previewImg.style.display = "none";
      }
    }
  };
  reader.readAsDataURL(file);
};

window.resetAdminCertUpload = function() {
  adminSelectedCertFileBase64 = "";
  adminSelectedCertFileName = "";
  const previewBox = document.getElementById("admin-cert-file-preview");
  if (previewBox) previewBox.style.display = "none";
  const fileInput = document.getElementById("admin-cert-file");
  if (fileInput) fileInput.value = "";
};

window.handleAdminUploadCert = function(e) {
  e.preventDefault();
  const db = FestDB.getData();

  const teamNameInput = document.getElementById("admin-cert-team");
  const recipientInput = document.getElementById("admin-cert-recipient");
  const eventSelect = document.getElementById("admin-cert-event");
  const awardSelect = document.getElementById("admin-cert-award");
  const collegeInput = document.getElementById("admin-cert-college");
  const idInput = document.getElementById("admin-cert-id");
  const urlInput = document.getElementById("admin-cert-url");

  const teamName = teamNameInput ? teamNameInput.value.trim() : "";
  if (!teamName) {
    alert("Please enter a Team Name!");
    return;
  }

  const recipient = recipientInput ? recipientInput.value.trim() : "";
  const eventName = eventSelect ? eventSelect.value : (db.events[0]?.name || "ARENIUM 27");
  const award = awardSelect ? awardSelect.value : "CERTIFICATE OF MERIT & PARTICIPATION";
  const college = collegeInput ? collegeInput.value.trim() || "Presidency University, Bengaluru" : "Presidency University, Bengaluru";
  const certId = idInput && idInput.value.trim() ? idInput.value.trim().toUpperCase() : ("AR27-CRT-" + Math.floor(1000 + Math.random() * 9000));
  const externalUrl = urlInput ? urlInput.value.trim() : "";

  const finalFileUrl = adminSelectedCertFileBase64 || externalUrl || "";

  if (!db.certificates) db.certificates = [];

  // Check if certificate ID already exists
  const existingIdx = db.certificates.findIndex(x => x.id === certId);
  const certRecord = {
    id: certId,
    teamName: teamName,
    recipient: recipient || teamName,
    event: eventName,
    award: award,
    college: college,
    fileUrl: finalFileUrl,
    fileName: adminSelectedCertFileName,
    issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    verified: true
  };

  if (existingIdx >= 0) {
    db.certificates[existingIdx] = certRecord;
  } else {
    db.certificates.unshift(certRecord);
  }

  FestDB.saveData(db);

  // Update table
  renderAdminCertificates(db);

  // Reset form
  const form = document.getElementById("admin-upload-cert-form");
  if (form) form.reset();
  resetAdminCertUpload();

  alert(`✅ Certificate [${certId}] for Team "${teamName}" successfully uploaded and published!\n\nParticipants can now visit certificate.html, enter "${teamName}", and download their official certificate.`);
};

window.addNewAdminCertificate = function() {
  const teamInput = document.getElementById("admin-cert-team");
  if (teamInput) {
    teamInput.scrollIntoView({ behavior: "smooth", block: "center" });
    teamInput.focus();
  }
};

window.adminPreviewCert = function(id) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === id);
  if (!c) return;

  const proofModal = document.getElementById("admin-proof-modal");
  const proofImg = document.getElementById("proof-modal-img");
  const proofTitle = document.getElementById("proof-modal-title");
  const proofMeta = document.getElementById("proof-modal-meta");

  const certDataUrl = c.fileUrl ? c.fileUrl : generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);

  if (proofModal && proofImg) {
    proofImg.src = certDataUrl;
    if (proofTitle) proofTitle.textContent = `Certificate: ${c.teamName || c.recipient} [${c.id}]`;
    if (proofMeta) proofMeta.textContent = `Event: ${c.event} · Award: ${c.award} · ${c.college}`;
    proofModal.style.display = "flex";
  } else {
    window.open(certDataUrl, "_blank");
  }
};

window.deleteAdminCertificate = function(id) {
  const db = FestDB.getData();
  if (confirm(`Are you sure you want to delete certificate ${id}?`)) {
    db.certificates = (db.certificates || []).filter(x => x.id !== id);
    FestDB.saveData(db);
    renderAdminCertificates(db);
  }
};
"""
    code = code[:admin_cert_start] + new_admin_certs + "\n\n" + code[admin_win_start:]
    print("4. Replaced Admin Certificates management successfully.")
else:
    print("Error: Could not locate Admin Certificates boundaries.")
    sys.exit(1)

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("All updates to js/main.js written successfully!")

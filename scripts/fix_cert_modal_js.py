import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace openCertPreviewModal and closeCertModal
target = """window.openCertPreviewModal = function(certId) {
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
};"""

replacement = """window.openCertPreviewModal = function(certId) {
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
      <div style="text-align: center; background: #07060f; padding: 1rem; border-radius: 8px; border: 1.5px solid rgba(56, 189, 248, 0.4); max-height: 72vh; overflow: auto; display: flex; justify-content: center; align-items: center; width: 100%;">
        <img src="${certDataUrl}" alt="Certificate ${c.id}" style="max-width: 100%; max-height: 68vh; object-fit: contain; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
      </div>
    `;
  }

  if (downloadBtn) {
    downloadBtn.onclick = function() {
      downloadTeamCertificate(c.id);
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeCertModal = function(e) {
  if (e && e.target && e.target.closest && e.target.closest(".cert-modal-dialog") && !e.target.classList.contains("cert-modal-close") && e.target.id !== "cert-modal-close-btn") {
    return;
  }
  const modal = document.getElementById("cert-preview-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Global escape key listener to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeCertModal();
  }
});"""

if target in js:
    js = js.replace(target, replacement, 1)
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated openCertPreviewModal and closeCertModal in js/main.js successfully!")
else:
    print("Warning: Target not found in js/main.js, checking regex fallback...")
    import re
    p = re.compile(r'window\.openCertPreviewModal\s*=\s*function\(certId\)\s*\{.*?window\.closeCertModal\s*=\s*function\(e\)\s*\{.*?\};\s*', re.DOTALL)
    if p.search(js):
        js = p.sub(replacement + "\n", js)
        with open('js/main.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("Updated via regex fallback successfully!")
    else:
        print("Error: Could not match openCertPreviewModal block in js/main.js")
        sys.exit(1)

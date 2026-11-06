import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

cert_styles = """
/* ==========================================================================
   OFFICIAL TEAM CERTIFICATE PORTAL & PREVIEW MODAL STYLING
   ========================================================================== */
.cert-sample-chip {
  background: rgba(56, 189, 248, 0.12) !important;
  border: 1px solid rgba(56, 189, 248, 0.35) !important;
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  font-family: var(--font-mono, monospace) !important;
  font-size: 0.78rem !important;
  padding: 0.3rem 0.75rem !important;
  border-radius: 999px !important;
  cursor: pointer !important;
  transition: all 0.2s ease-in-out !important;
  display: inline-flex !important;
  align-items: center !important;
}

.cert-sample-chip:hover {
  background: rgba(56, 189, 248, 0.28) !important;
  border-color: #38BDF8 !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25) !important;
}

.cert-result-card {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.cert-result-card:hover {
  border-color: #38BDF8 !important;
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.2) !important;
  transform: translateY(-2px) !important;
}

@media (max-width: 768px) {
  .cert-result-card {
    grid-template-columns: 1fr !important;
  }
}

/* Certificate Preview Modal */
.cert-modal-backdrop {
  position: fixed !important;
  inset: 0 !important;
  background: rgba(3, 7, 18, 0.88) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  z-index: 999999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 1.5rem !important;
}

.cert-modal-dialog {
  background: #0B1120 !important;
  border: 1.5px solid rgba(56, 189, 248, 0.5) !important;
  border-radius: 14px !important;
  width: 100% !important;
  max-width: 900px !important;
  max-height: 94vh !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.2) !important;
  animation: certModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

@keyframes certModalPop {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cert-modal-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 1.2rem 1.6rem !important;
  background: rgba(15, 23, 42, 0.98) !important;
  border-bottom: 1px solid rgba(56, 189, 248, 0.25) !important;
}

.cert-modal-close {
  background: transparent !important;
  border: none !important;
  color: #94A3B8 !important;
  font-size: 1.5rem !important;
  cursor: pointer !important;
  padding: 0.2rem 0.5rem !important;
  line-height: 1 !important;
  transition: color 0.15s ease !important;
}

.cert-modal-close:hover {
  color: #FFFFFF !important;
}

.cert-modal-body {
  padding: 1.2rem !important;
  overflow-y: auto !important;
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #07060F !important;
}

.cert-modal-footer {
  display: flex !important;
  justify-content: flex-end !important;
  gap: 0.8rem !important;
  padding: 1rem 1.6rem !important;
  background: rgba(15, 23, 42, 0.98) !important;
  border-top: 1px solid rgba(56, 189, 248, 0.25) !important;
  flex-wrap: wrap !important;
}
"""

if "OFFICIAL TEAM CERTIFICATE PORTAL & PREVIEW MODAL STYLING" not in css:
    css = css + "\n" + cert_styles
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Added certificate portal styles to style.css successfully!")
else:
    print("Styles already present.")

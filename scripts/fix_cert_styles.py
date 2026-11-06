import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

target = """/* ==========================================================================
   OFFICIAL TEAM CERTIFICATE PORTAL & PREVIEW MODAL STYLING
   ========================================================================== */"""

idx = css.find(target)
if idx == -1:
    print("Could not find target in style.css")
    sys.exit(1)

new_styles = """/* ==========================================================================
   OFFICIAL TEAM CERTIFICATE PORTAL & PREVIEW MODAL STYLING (FIXED & HIGH CONTRAST)
   ========================================================================== */

/* 1. Page Title & Subtitle: Pure Solid White */
.certificate-page .page-header-banner .page-title,
.certificate-page .page-title,
body.certificate-page .page-title,
.page-title {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9) !important;
}

.certificate-page .page-header-banner .section-subtitle,
.certificate-page .section-subtitle,
body.certificate-page .section-subtitle {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.8) !important;
  font-weight: 500 !important;
}

/* 2. Repository Search Card: Crisp White Text */
.certificate-page .section-tag,
.cert-search-card .section-tag {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  background: rgba(56, 189, 248, 0.15) !important;
  border: 1px solid rgba(56, 189, 248, 0.45) !important;
  font-weight: 800 !important;
}

.certificate-page .cert-search-card,
.cert-search-card h2,
.cert-search-card h3,
.cert-search-card p,
.cert-search-card strong,
.cert-search-card span,
.cert-search-card code {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.cert-search-card p {
  color: #E2E8F0 !important;
  -webkit-text-fill-color: #E2E8F0 !important;
  line-height: 1.6 !important;
}

.cert-search-card strong {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

.cert-search-card code {
  color: #FDE047 !important;
  -webkit-text-fill-color: #FDE047 !important;
  background: rgba(253, 224, 71, 0.15) !important;
}

/* Search input white text */
#cert-search-input {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  background: #0B1120 !important;
  border: 1.5px solid rgba(56, 189, 248, 0.45) !important;
  font-weight: 600 !important;
}

#cert-search-input::placeholder {
  color: #94A3B8 !important;
  -webkit-text-fill-color: #94A3B8 !important;
}

/* Sample Team chips */
.cert-sample-chip {
  background: rgba(56, 189, 248, 0.15) !important;
  border: 1px solid rgba(56, 189, 248, 0.4) !important;
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
  font-weight: 700 !important;
}

.cert-sample-chip:hover {
  background: rgba(56, 189, 248, 0.3) !important;
  border-color: #38BDF8 !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25) !important;
}

/* Certificate Results Card: White Text */
.cert-result-card {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.cert-result-card:hover {
  border-color: #38BDF8 !important;
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.2) !important;
  transform: translateY(-2px) !important;
}

.cert-result-card h3,
.cert-result-card strong,
.cert-result-card span {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

@media (max-width: 768px) {
  .cert-result-card {
    grid-template-columns: 1fr !important;
  }
}

/* ==========================================================================
   3. CERTIFICATE FULLSCREEN MODAL - STRICTLY HIDDEN UNTIL ACTIVE
   ========================================================================== */
.cert-modal-backdrop {
  display: none !important; /* STRICTLY HIDDEN BY DEFAULT */
  position: fixed !important;
  inset: 0 !important;
  background: rgba(3, 7, 18, 0.92) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  z-index: 999999 !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 1.5rem !important;
}

.cert-modal-backdrop.active {
  display: flex !important; /* SHOWN ONLY WHEN ACTIVE CLASS APPLIED */
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
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.25) !important;
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
  border-bottom: 1px solid rgba(56, 189, 248, 0.3) !important;
}

.cert-modal-header h3,
#cert-modal-title {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
  margin: 0 !important;
}

#cert-modal-id {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  font-family: var(--font-mono) !important;
  font-weight: 800 !important;
}

.cert-modal-close {
  background: transparent !important;
  border: none !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-size: 1.6rem !important;
  cursor: pointer !important;
  padding: 0.2rem 0.6rem !important;
  line-height: 1 !important;
  opacity: 0.85 !important;
  transition: opacity 0.15s ease, transform 0.15s ease !important;
}

.cert-modal-close:hover {
  opacity: 1 !important;
  transform: scale(1.1) !important;
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

.cert-modal-body {
  padding: 1.5rem !important;
  overflow-y: auto !important;
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #07060F !important;
  min-height: 300px !important;
}

.cert-modal-footer {
  display: flex !important;
  justify-content: flex-end !important;
  gap: 0.8rem !important;
  padding: 1rem 1.6rem !important;
  background: rgba(15, 23, 42, 0.98) !important;
  border-top: 1px solid rgba(56, 189, 248, 0.3) !important;
  flex-wrap: wrap !important;
}

.cert-modal-footer .btn-ghost {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
}
"""

css = css[:idx] + new_styles
with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated style.css with fixed modal and pure white text rules successfully!")

import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Update certificate.html
with open('certificate.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add certificate-page class to body
html = html.replace('<body class="subpage-body">', '<body class="subpage-body certificate-page">')

# Update inline styles for white text on title and subtitle
html = html.replace(
    '<h1 class="page-title">OFFICIAL CERTIFICATES</h1>',
    '<h1 class="page-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; text-shadow: 0 2px 14px rgba(0,0,0,0.9) !important; font-weight: 900 !important;">OFFICIAL CERTIFICATES</h1>'
)

html = html.replace(
    '<p class="section-subtitle">',
    '<p class="section-subtitle" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; text-shadow: 0 1px 8px rgba(0,0,0,0.8) !important; font-weight: 600 !important;">'
)

# Update modal backdrop in HTML to ensure display: none !important
html = html.replace(
    '<div id="cert-preview-modal" class="cert-modal-backdrop" style="display: none;" onclick="closeCertModal(event)">',
    '<div id="cert-preview-modal" class="cert-modal-backdrop" style="display: none !important;" onclick="closeCertModal(event)">'
)

# Modal close button and headers
html = html.replace(
    '<h3 id="cert-modal-title" style="margin: 0; font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF;">',
    '<h3 id="cert-modal-title" style="margin: 0; font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 800;">'
)

html = html.replace(
    '<span style="font-family: var(--font-mono); color: #38BDF8; font-size: 0.85rem; font-weight: 700;" id="cert-modal-id">[AR27-CRT-000]</span>',
    '<span style="font-family: var(--font-mono); color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-size: 0.85rem; font-weight: 700;" id="cert-modal-id">[AR27-CRT-000]</span>'
)

html = html.replace(
    '<button type="button" class="cert-modal-close" onclick="closeCertModal()" aria-label="Close modal">✕</button>',
    '<button type="button" class="cert-modal-close" onclick="closeCertModal()" aria-label="Close modal" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 1.6rem; cursor: pointer; background: transparent; border: none;">✕</button>'
)

html = html.replace(
    '<button type="button" class="btn btn-ghost" onclick="closeCertModal()" style="padding: 0.7rem 1.2rem; font-size: 0.88rem;">',
    '<button type="button" class="btn btn-ghost" onclick="closeCertModal()" style="padding: 0.7rem 1.2rem; font-size: 0.88rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; border: 1px solid rgba(255, 255, 255, 0.4);">'
)

with open('certificate.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated certificate.html successfully!")

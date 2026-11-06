import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('certificate.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make section tag inline cyan/white
html = html.replace(
    '<span class="section-tag">[ACCREDITATION REPOSITORY]</span>',
    '<span class="section-tag" style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; background: rgba(56, 189, 248, 0.15) !important; border: 1px solid rgba(56, 189, 248, 0.45) !important; font-weight: 800 !important;">[ACCREDITATION REPOSITORY]</span>'
)

# Make paragraph text crisp solid white
html = html.replace(
    '<p style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-size: 0.9rem; max-width: 680px; line-height: 1.6;">',
    '<p style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 0.92rem; max-width: 680px; line-height: 1.6; font-weight: 500;">'
)

# Make sample teams label white
html = html.replace(
    '<span style="font-family: var(--font-mono); font-size: 0.76rem; color: #94A3B8; text-transform: uppercase;">',
    '<span style="font-family: var(--font-mono); font-size: 0.78rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 700; text-transform: uppercase;">'
)

# Ensure cert-modal-body has min-height and styling
html = html.replace(
    '<div class="cert-modal-body" id="cert-modal-body">',
    '<div class="cert-modal-body" id="cert-modal-body" style="min-height: 280px; background: #07060F; display: flex; align-items: center; justify-content: center;">'
)

with open('certificate.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated certificate.html inline typography successfully!")

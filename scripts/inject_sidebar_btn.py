import re

with open("admin.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Sidebar button
pattern_sidebar = r'(<button type="button" class="admin-nav-btn" data-tab="tab-registrations"[^>]*>[\s\S]*?Registrations &amp; Portal[\s\S]*?</button>)'
scanner_btn = r"""\1
      <button type="button" class="admin-nav-btn" data-tab="tab-scanner" onclick="switchAdminTab('tab-scanner')" style="color: #0284C7; font-weight: 800;">
        📷 Gate QR Scanner Terminal
      </button>"""

if 'data-tab="tab-scanner"' not in content:
    content = re.sub(pattern_sidebar, scanner_btn, content, count=1)
    print("Injected sidebar button")
else:
    print("Sidebar button already exists")

# 2. Overview quick shortcut button
pattern_shortcut = r'(<div style="display: flex; gap: 0\.8rem; flex-wrap: wrap;">\s*<button class="btn btn-primary" onclick="addNewAdminEvent\(\)">)'
new_shortcut = r"""<div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="switchAdminTab('tab-scanner')" style="background: rgba(2, 132, 199, 0.15); border: 1.5px solid #0284C7; color: #0284C7; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem;">
              📷 Launch Gate QR Scanner
            </button>
            <button class="btn btn-primary" onclick="addNewAdminEvent()">"""

if "Launch Gate QR Scanner" not in content:
    content = re.sub(pattern_shortcut, new_shortcut, content, count=1)
    print("Injected Overview quick shortcut button")
else:
    print("Overview shortcut already exists")

with open("admin.html", "w", encoding="utf-8") as f:
    f.write(content)
print("admin.html saved successfully")

import glob, re

VERSION = "2027_PROOF_MODAL_WHITE_V36"

for f in sorted(glob.glob("*.html")):
    with open(f, "r", encoding="utf-8") as fp:
        c = fp.read()
    
    # Replace ?v=... on css and js links
    c = re.sub(r'style\.css\?v=[A-Za-z0-9_\-\.]+', f'style.css?v={VERSION}', c)
    c = re.sub(r'main\.js\?v=[A-Za-z0-9_\-\.]+', f'main.js?v={VERSION}', c)
    c = re.sub(r'events-data\.js\?v=[A-Za-z0-9_\-\.]+', f'events-data.js?v={VERSION}', c)
    c = re.sub(r'admin-auth\.js\?v=[A-Za-z0-9_\-\.]+', f'admin-auth.js?v={VERSION}', c)
    
    with open(f, "w", encoding="utf-8") as fp:
        fp.write(c)

print(f"Bumped cache busters across all HTML files to {VERSION}")

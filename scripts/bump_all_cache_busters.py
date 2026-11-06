import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

VERSION = "2027_WHITE_TEXT_FIX_V19"

for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        c = re.sub(r'src="js/main\.js\?v=[^"]*"', f'src="js/main.js?v={VERSION}"', c)
        c = re.sub(r'href="css/style\.css\?v=[^"]*"', f'href="css/style.css?v={VERSION}"', c)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(c)
        print(f"Bumped {f} to {VERSION}")

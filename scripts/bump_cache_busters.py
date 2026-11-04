import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    c = re.sub(r'href="css/style\.css\?v=[^"]*"', 'href="css/style.css?v=2027_BLACK_TEXT_V3"', c)
    c = re.sub(r'src="js/main\.js\?v=[^"]*"', 'src="js/main.js?v=2027_BLACK_TEXT_V3"', c)
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(c)
    print(f"Bumped cache buster in {f}")

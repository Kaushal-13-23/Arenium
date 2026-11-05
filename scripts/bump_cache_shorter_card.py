import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        c = re.sub(r'href="css/style\.css\?v=[^"]*"', 'href="css/style.css?v=2027_SHORTER_CARD_V1"', c)
        c = re.sub(r'src="js/main\.js\?v=[^"]*"', 'src="js/main.js?v=2027_SHORTER_CARD_V1"', c)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(c)
        print(f"Bumped {f}")

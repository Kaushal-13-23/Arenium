import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('js/main.js', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('Frame Cert &gt;', 'Get Cert &gt;')
c = c.replace('certificate.html?winner=', 'certificate.html?team=')
with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('Updated Frame Cert in js/main.js')

with open('winners.html', 'r', encoding='utf-8') as f:
    w = f.read()
w = w.replace('Click on "Frame Cert &gt;" next to any winner to customize and download their official framed certificate of excellence.', 'Click on "Get Cert &gt;" next to any winner to search, preview, and download their official verified certificate.')
with open('winners.html', 'w', encoding='utf-8') as f:
    f.write(w)
print('Updated Frame Cert in winners.html')

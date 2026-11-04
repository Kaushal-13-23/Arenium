import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

files = [f for f in os.listdir('.') if f.endswith('.html')] + ['js/main.js']

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    orig = content
    # Replace in tickers
    content = content.replace("</span> // CASH PRIZES &amp; ACCREDITED MERIT CERTIFICATES ACROSS ALL TRACKS // REGISTRATIONS LIVE ⚡",
                              "</span> • CASH PRIZES &amp; ACCREDITED MERIT CERTIFICATES ACROSS ALL TRACKS • REGISTRATIONS LIVE ⚡")
    content = content.replace("</span> // CASH PRIZES & ACCREDITED MERIT CERTIFICATES ACROSS ALL TRACKS // REGISTRATIONS LIVE ⚡",
                              "</span> • CASH PRIZES & ACCREDITED MERIT CERTIFICATES ACROSS ALL TRACKS • REGISTRATIONS LIVE ⚡")
    content = content.replace("⚡ ARENIUM ’27: THE ARENA OF INNOVATION // ₹1.5 LAKHS CASH PRIZE POOL // 24-HOUR HACKATHON, BLIND CODING, TREASURE HUNT, ESPORTS & FASHION SHOW // 4–5 FEB 2027 ⚡",
                              "⚡ ARENIUM ’27: THE ARENA OF INNOVATION • ₹1.5 LAKHS CASH PRIZE POOL • 24-HOUR HACKATHON, BLIND CODING, TREASURE HUNT, ESPORTS & FASHION SHOW • 4–5 FEB 2027 ⚡")

    if content != orig:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print(f"Updated {f}")

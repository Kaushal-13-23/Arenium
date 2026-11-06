import sys, os, glob

sys.stdout.reconfigure(encoding='utf-8')

for fpath in glob.glob('*.html'):
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()

    orig = c
    c = c.replace('> Certificate Studio<', '> Official Certificates<')
    c = c.replace('Launch Certificate Studio', 'Open Certificate Portal')
    c = c.replace('CERTIFICATE STUDIO | ARENIUM\'27', 'OFFICIAL CERTIFICATES | ARENIUM\'27')
    c = c.replace('Official Certificate Studio for ARENIUM\'27', 'Official Certificate Portal for ARENIUM\'27')
    c = c.replace('Launch our interactive Cyberpunk Certificate Studio to preview, frame, and download high-resolution accredited merit and participation certificates with digital signatures.', 'Access the official ARENIUM \'27 Certificate Portal to search by Team Name, preview verified credentials, and download high-resolution accredited certificates with digital signatures.')
    c = c.replace('⚡ LAUNCH CERTIFICATE STUDIO', '⚡ GET TEAM CERTIFICATES')
    c = c.replace('⚡ Launch Certificate Studio', '⚡ Get Team Certificates')

    if c != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Updated references in {fpath}")

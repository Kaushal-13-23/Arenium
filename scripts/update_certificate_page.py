import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('certificate.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's check if .cert-studio-layout exists
if 'cert-studio-layout' not in content:
    print("Warning: cert-studio-layout not found!")
    sys.exit(1)

# We want to replace the page header title, subtitle, cert-search-section, and completely remove the cert-studio-layout section.
# Let's inspect the exact lines between <main id="main-content"> and </main>

main_pattern = re.compile(r'(<main id="main-content">)(.*?)(</main>)', re.DOTALL)
match = main_pattern.search(content)
if not match:
    print("Error: Could not find <main id=\"main-content\">...</main>")
    sys.exit(1)

main_inner = match.group(2)
print("Found main block. Length:", len(main_inner))

# New replacement for main_inner
new_main_content = """

    <!-- Page Header Banner -->
    <section class="page-header-banner">
      <div class="container">
        <h1 class="page-title">OFFICIAL CERTIFICATES</h1>
        <p class="section-subtitle">
          Official Accreditation &amp; Certificate Portal. Enter your registered Team Name below to search, view, and download verified event certificates uploaded by the fest committee.
        </p>
      </div>
    </section>

    <!-- ====================================================================
         VERIFIED TEAM CERTIFICATE SEARCH & DOWNLOAD SECTION
         ==================================================================== -->
    <section id="cert-search-section" style="padding: 0 0 4rem;">
      <div class="container">
        <div class="cyber-card cert-search-card" style="padding: 2.2rem; background: rgba(13, 21, 38, 0.96) !important; border: 1.5px solid rgba(56, 189, 248, 0.4) !important; box-shadow: 0 0 35px rgba(56, 189, 248, 0.18); border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.4rem;">
            <div>
              <span class="section-tag">[ACCREDITATION REPOSITORY]</span>
              <h2 style="font-family: var(--font-display); font-size: 1.5rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; margin: 0.3rem 0; font-weight: 800; letter-spacing: 0.04em;">
                SEARCH &amp; GET TEAM CERTIFICATES
              </h2>
              <p style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-size: 0.9rem; max-width: 680px; line-height: 1.6;">
                Event certificates uploaded by the organizing committee are published here. Enter your registered <strong style="color: #38BDF8 !important;">Team Name</strong> (e.g. <code style="color: #FDE047 !important; background: rgba(253, 224, 71, 0.12); padding: 0.1rem 0.4rem; border-radius: 3px;">NeuralForge</code> or <code style="color: #FDE047 !important; background: rgba(253, 224, 71, 0.12); padding: 0.1rem 0.4rem; border-radius: 3px;">CyberSentinels</code>) to retrieve, preview, and download your official verified certificates.
              </p>
            </div>
            <div id="cert-published-badge" style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38BDF8; color: #38BDF8 !important; padding: 0.45rem 0.9rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
              ⚡ CERTIFICATES REPOSITORY LIVE
            </div>
          </div>

          <!-- Team Search Bar Wrap -->
          <div class="cert-search-bar-wrap" style="display: flex; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <div style="flex: 3; min-width: 280px; position: relative;">
              <input type="text" id="cert-search-input" class="admin-input" placeholder="Enter your registered Team Name (e.g. NeuralForge, CyberSentinels, CipherKnights)..." style="width: 100%; padding: 0.9rem 1.2rem; font-size: 1rem; border-radius: 6px; color: #FFFFFF !important; background: rgba(15, 23, 42, 0.9) !important; border: 1.5px solid rgba(56, 189, 248, 0.4) !important;">
            </div>
            <button type="button" id="cert-search-btn" class="btn btn-primary" style="flex: 1; min-width: 200px; justify-content: center; font-size: 0.95rem; font-weight: 700; padding: 0.9rem 1.4rem;">
              🔍 GET CERTIFICATES
            </button>
          </div>

          <!-- Suggested / Quick-Fill Team Chips -->
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.6rem;">
            <span style="font-family: var(--font-mono); font-size: 0.76rem; color: #94A3B8; text-transform: uppercase;">
              SAMPLE TEAMS:
            </span>
            <button type="button" class="cert-sample-chip" onclick="searchTeamCert('Team NeuralForge')">Team NeuralForge</button>
            <button type="button" class="cert-sample-chip" onclick="searchTeamCert('CyberSentinels')">CyberSentinels</button>
            <button type="button" class="cert-sample-chip" onclick="searchTeamCert('CipherKnights')">CipherKnights</button>
            <button type="button" class="cert-sample-chip" onclick="searchTeamCert('Phantom Apex')">Phantom Apex</button>
            <button type="button" class="cert-sample-chip" onclick="searchTeamCert('PixelCraft Duo')">PixelCraft Duo</button>
          </div>

          <!-- Results Container -->
          <div id="cert-search-results" style="display: none; margin-top: 1.8rem; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1.5rem;">
            <!-- Populated dynamically via search -->
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         FULLSCREEN CERTIFICATE PREVIEW MODAL
         ==================================================================== -->
    <div id="cert-preview-modal" class="cert-modal-backdrop" style="display: none;" onclick="closeCertModal(event)">
      <div class="cert-modal-dialog" onclick="event.stopPropagation()">
        <div class="cert-modal-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-family: var(--font-mono); color: #38BDF8; font-size: 0.85rem; font-weight: 700;" id="cert-modal-id">[AR27-CRT-000]</span>
            <h3 id="cert-modal-title" style="margin: 0; font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF;">
              CERTIFICATE PREVIEW
            </h3>
          </div>
          <button type="button" class="cert-modal-close" onclick="closeCertModal()" aria-label="Close modal">✕</button>
        </div>
        <div class="cert-modal-body" id="cert-modal-body">
          <!-- Dynamically populated with high-res certificate image or canvas -->
        </div>
        <div class="cert-modal-footer">
          <button type="button" id="cert-modal-download-btn" class="btn btn-primary" style="padding: 0.7rem 1.4rem; font-size: 0.88rem;">
            ⚡ DOWNLOAD OFFICIAL CERTIFICATE
          </button>
          <button type="button" class="btn btn-ghost" onclick="closeCertModal()" style="padding: 0.7rem 1.2rem; font-size: 0.88rem;">
            CLOSE
          </button>
        </div>
      </div>
    </div>
"""

updated_content = content[:match.start(2)] + new_main_content + content[match.end(2):]

with open('certificate.html', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Updated certificate.html successfully! Removed generator studio and installed team search portal.")

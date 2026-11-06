import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Launch Certificate Studio button in Overview tab if present
content = content.replace('🚀 Launch Certificate Studio', '📜 View Public Certificate Portal')
content = content.replace('> Launch Certificate Studio<', '> View Public Certificate Portal<')

tab_cert_pattern = re.compile(r'(<div id="tab-certificates" class="admin-tab-pane"[^>]*>)(.*?)(</div>\s*<!-- -*\s*TAB (?:6|announcements))', re.DOTALL | re.IGNORECASE)

match = tab_cert_pattern.search(content)
if not match:
    print("Error: Could not locate #tab-certificates in admin.html")
    sys.exit(1)

print("Found #tab-certificates in admin.html")

new_tab_certificates = """<div id="tab-certificates" class="admin-tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-tag">[ACCREDITATION REPOSITORY]</span>
            <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff;">MANAGE PARTICIPANT CERTIFICATES</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">
              Upload certificates linked with Team Names. Once uploaded, delegates can search their Team Name on certificate.html to download their official certificate.
            </p>
          </div>
          <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap;">
            <a href="certificate.html" target="_blank" class="btn btn-ghost" style="font-size: 0.82rem; padding: 0.5rem 1rem;">
              🌐 Open Public Certificate Portal
            </a>
          </div>
        </div>

        <!-- Publish Certificates Toggle Box -->
        <div class="cyber-card" style="padding: 1.2rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; border-color: #38BDF8;">
          <div>
            <strong style="color: #fff; font-size: 1rem; display: block;">ENABLE CERTIFICATE DOWNLOADS ON PUBLIC PORTAL</strong>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">
              When active, participants can search their Team Name and download verified certificates on certificate.html.
            </span>
          </div>
          <label style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); color: #38BDF8; cursor: pointer; font-weight: 700;">
            <input type="checkbox" id="admin-publish-certs-toggle" style="width: 20px; height: 20px; cursor: pointer;">
            <span>ACTIVE</span>
          </label>
        </div>

        <!-- UPLOAD CERTIFICATE BY TEAM NAME CARD -->
        <div class="cyber-card" style="padding: 1.6rem; margin-bottom: 2rem; border: 1.5px solid rgba(56, 189, 248, 0.45); background: rgba(13, 21, 38, 0.95); border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
            <div>
              <span class="section-tag">[UPLOAD FORM]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFFFFF; margin: 0.3rem 0; font-weight: 800;">
                UPLOAD CERTIFICATE WITH TEAM NAME
              </h3>
              <p style="color: #CBD5E1; font-size: 0.84rem; margin: 0;">
                Assign an official certificate to a registered team. Delegates will search by this exact Team Name on certificate.html.
              </p>
            </div>
            <span style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38BDF8; color: #38BDF8; padding: 0.35rem 0.75rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700;">
              TEAM-LINKED VERIFICATION
            </span>
          </div>

          <form id="admin-upload-cert-form" onsubmit="handleAdminUploadCert(event)">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; margin-bottom: 1.2rem;">
              
              <!-- Team Name -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-team">TEAM NAME <span style="color: var(--neon-pink);">*</span></label>
                <input type="text" id="admin-cert-team" class="admin-input" placeholder="e.g. NeuralForge, CyberSentinels, MatrixBreakers" required>
              </div>

              <!-- Participant / Member Names (Optional) -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-recipient">MEMBER / RECIPIENT NAME(S) (OPTIONAL)</label>
                <input type="text" id="admin-cert-recipient" class="admin-input" placeholder="e.g. Kaushal Kumar (or All Team Members)">
              </div>

              <!-- Event Name -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-event">EVENT / ARENA TRACK <span style="color: var(--neon-pink);">*</span></label>
                <select id="admin-cert-event" class="admin-select" required>
                  <!-- Populated dynamically from db.events -->
                </select>
              </div>

              <!-- Award / Tier -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-award">CERTIFICATE TYPE / TIER <span style="color: var(--neon-pink);">*</span></label>
                <select id="admin-cert-award" class="admin-select" required>
                  <option value="CHAMPION · FIRST PLACE">🏆 CHAMPION · FIRST PLACE</option>
                  <option value="RUNNER UP · SECOND PLACE">🥈 RUNNER UP · SECOND PLACE</option>
                  <option value="2ND RUNNER UP · THIRD PLACE">🥉 2ND RUNNER UP · THIRD PLACE</option>
                  <option value="SPECIAL MERIT & INNOVATION">⭐ SPECIAL MERIT & INNOVATION</option>
                  <option value="CERTIFICATE OF MERIT & PARTICIPATION" selected>🎖️ CERTIFICATE OF MERIT & PARTICIPATION</option>
                </select>
              </div>

              <!-- College -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-college">COLLEGE / INSTITUTION</label>
                <input type="text" id="admin-cert-college" class="admin-input" placeholder="e.g. Presidency University, Bengaluru" value="Presidency University, Bengaluru">
              </div>

              <!-- Certificate ID -->
              <div class="admin-form-group" style="margin-bottom: 0;">
                <label class="admin-label" for="admin-cert-id">CERTIFICATE ID (AUTO-GENERATED IF EMPTY)</label>
                <input type="text" id="admin-cert-id" class="admin-input" placeholder="e.g. AR27-CRT-1042">
              </div>
            </div>

            <!-- Upload Certificate File or External URL -->
            <div style="background: rgba(15, 23, 42, 0.7); border: 1.5px dashed rgba(56, 189, 248, 0.35); border-radius: 8px; padding: 1.2rem; margin-bottom: 1.2rem;">
              <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start;">
                <div style="flex: 1; min-width: 250px;">
                  <label class="admin-label" for="admin-cert-file">UPLOAD CERTIFICATE FILE (IMAGE / PDF)</label>
                  <input type="file" id="admin-cert-file" class="admin-input" accept="image/png, image/jpeg, image/webp, application/pdf" style="padding: 0.5rem; background: rgba(0,0,0,0.4);" onchange="handleAdminCertFileSelect(event)">
                  <span style="font-size: 0.75rem; color: #94A3B8; display: block; margin-top: 0.4rem;">
                    Upload the certificate sheet (PNG, JPG, PDF). If left empty, a verified 300 DPI high-resolution digital certificate will be generated automatically for the team.
                  </span>
                </div>
                <div style="flex: 1; min-width: 250px;">
                  <label class="admin-label" for="admin-cert-url">OR EXTERNAL CERTIFICATE / CLOUD DRIVE URL</label>
                  <input type="url" id="admin-cert-url" class="admin-input" placeholder="https://drive.google.com/... or hosted image link">
                </div>
              </div>

              <!-- File Preview Container -->
              <div id="admin-cert-file-preview" style="display: none; margin-top: 1rem; padding: 0.8rem; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; align-items: center; gap: 1rem;">
                <img id="admin-cert-preview-img" src="" alt="Certificate Preview" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid #38BDF8; display: none;">
                <div style="font-size: 0.82rem; color: #38BDF8;">
                  <strong id="admin-cert-preview-filename">File chosen</strong>
                  <div id="admin-cert-preview-filesize" style="color: #94A3B8; font-size: 0.75rem;">Size</div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <button type="submit" class="btn btn-primary" style="padding: 0.8rem 1.6rem; font-weight: 700; font-size: 0.9rem;">
                🚀 UPLOAD &amp; PUBLISH CERTIFICATE
              </button>
              <button type="reset" class="btn btn-ghost" style="padding: 0.8rem 1.2rem; font-size: 0.9rem;" onclick="resetAdminCertUpload()">
                🔄 RESET FORM
              </button>
            </div>
          </form>
        </div>

        <!-- CERTIFICATES LIST TABLE -->
        <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
          <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: #FFFFFF; margin: 0; font-weight: 700;">
            PUBLISHED CERTIFICATES REPOSITORY (<span id="admin-certs-count">0</span>)
          </h3>
          <div style="font-size: 0.8rem; color: #94A3B8;">
            Searchable on public portal by Team Name
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Team Name</th>
                <th>Recipient / Members</th>
                <th>Event Track</th>
                <th>Award / Tier</th>
                <th>Certificate File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-certs-table-body">
              <!-- Rendered via renderAdminCertificates() -->
            </tbody>
          </table>
        </div>
      </div>
"""

updated_content = content[:match.start(1)] + new_tab_certificates + content[match.end(2):]

with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("admin.html updated successfully with Team Certificate Upload Form & Manager!")

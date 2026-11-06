import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("Starting register.html card color transformation to pure white...")

with open('register.html', 'r', encoding='utf-8') as f:
    content = f.read()

content_norm = content.replace('\r\n', '\n')

# 1. Update .register-glass-card tag
old_card_open = '<div class="register-glass-card reveal-on-scroll is-visible">'
new_card_open = '<div class="register-glass-card reveal-on-scroll is-visible" style="background: #FFFFFF !important; background-color: #FFFFFF !important; border: 1.5px solid #E2E8F0 !important; border-radius: 28px !important; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04) !important; color: #0F172A !important;">'
if old_card_open in content_norm:
    content_norm = content_norm.replace(old_card_open, new_card_open, 1)
    print("✓ Added explicit white style to .register-glass-card")
else:
    print("⚠ old_card_open not found, checking with style attribute...")
    content_norm = re.sub(
        r'<div class="register-glass-card[^"]*"[^>]*>',
        new_card_open,
        content_norm,
        count=1
    )
    print("✓ Replaced register-glass-card via regex")

# 2. Update .register-title and .register-subtitle
old_title_sub = """            <h1 class="register-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 900; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);">DELEGATE REGISTRATION</h1>
            <p class="register-subtitle" style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-weight: 600;">
              School of Information Science (SOIS) · Presidency University, Bengaluru<br>
              Secure your slot in India's premier inter-college tech fest.
            </p>"""

new_title_sub = """            <h1 class="register-title" style="color: #0F172A !important; -webkit-text-fill-color: #0F172A !important; font-weight: 900; letter-spacing: 0.04em; text-shadow: none !important;">DELEGATE REGISTRATION</h1>
            <p class="register-subtitle" style="color: #475569 !important; -webkit-text-fill-color: #475569 !important; font-weight: 600;">
              School of Information Science (SOIS) · Presidency University, Bengaluru<br>
              Secure your slot in India's premier inter-college tech fest.
            </p>"""

if old_title_sub in content_norm:
    content_norm = content_norm.replace(old_title_sub, new_title_sub, 1)
    print("✓ Updated register-title and subtitle to crisp dark slate")
else:
    print("⚠ old_title_sub not found by exact string, checking regex...")
    content_norm = re.sub(
        r'<h1 class="register-title"[^>]*>DELEGATE REGISTRATION</h1>\s*<p class="register-subtitle"[^>]*>[\s\S]*?</p>',
        new_title_sub,
        content_norm,
        count=1
    )
    print("✓ Replaced title and subtitle via regex")

# 3. Update instructions box
old_instr_box = """          <div class="register-instructions-box" id="reg-instructions-box">
            <strong style="color: #93C5FD; display: block; margin-bottom: 0.3rem;">📋 Official Registration Notice:</strong>
            <span id="reg-instructions-text">
              Welcome to the official registration portal for ARENIUM '27. Please review the updated fee structure below and select your delegate category before choosing your competitive arenas.
            </span>
          </div>"""

new_instr_box = """          <div class="register-instructions-box" id="reg-instructions-box" style="background: #F0F9FF !important; border: 1.5px solid #BAE6FD !important; border-left: 4px solid #0284C7 !important; border-radius: 12px; padding: 1.1rem 1.4rem; margin-bottom: 2rem;">
            <strong style="color: #0284C7 !important; display: block; margin-bottom: 0.3rem; font-weight: 800;">📋 Official Registration Notice:</strong>
            <span id="reg-instructions-text" style="color: #334155 !important; line-height: 1.6;">
              Welcome to the official registration portal for ARENIUM '27. Please review the updated fee structure below and select your delegate category before choosing your competitive arenas.
            </span>
          </div>"""

if old_instr_box in content_norm:
    content_norm = content_norm.replace(old_instr_box, new_instr_box, 1)
    print("✓ Updated register-instructions-box to light blue")
else:
    print("⚠ old_instr_box not found by exact string")

# 4. Update fee-structure-announcement-card
old_fee_card = """          <div class="fee-structure-announcement-card" style="background: #000000; border: 1.5px solid #1E293B; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 0.8rem;">
              <div>
                <span class="section-tag" style="margin-bottom: 0.2rem; display: inline-block; background: rgba(2, 132, 199, 0.2); color: #38BDF8; border-color: rgba(56, 189, 248, 0.4);">[OFFICIAL NOTICE · REVISED STRUCTURE]</span>
                <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #FFFFFF; font-weight: 900; margin: 0; letter-spacing: 0.5px;">
                  📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
                </h2>
              </div>
              <span style="background: rgba(2, 132, 199, 0.25); color: #38BDF8; border: 1.5px solid rgba(56, 189, 248, 0.5); font-size: 0.75rem; padding: 0.35rem 0.8rem; border-radius: 20px; font-weight: 800; letter-spacing: 0.5px;">
                ACTIVE REGISTRATION POLICY
              </span>
            </div>

            <!-- Two Tier Fee Grid -->
            <div class="fee-tier-grid">
              
              <!-- Tier 1: Internal Participants -->
              <div class="fee-tier-card fee-tier-internal" style="background: #0A0F1D; border: 1.5px solid #1E293B; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem); color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 INTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: rgba(56, 189, 248, 0.2); color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; border: 1px solid rgba(56, 189, 248, 0.4); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Presidency University
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; margin: 0.4rem 0;">
                  ₹200 <span style="font-size: 0.85rem; font-weight: 700; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">/ Person (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 500; line-height: 1.6;">
                  <li><strong style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">₹200 Per Person:</strong> Solo: ₹200 · Squad: ₹200 per member added (+₹200/person).</li>
                  <li><strong style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important;">2nd Event Optional &amp; FREE:</strong> Included for all registered members at no extra charge.</li>
                  <li><strong style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">Additional ₹200:</strong> If participating in an optional <strong style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important;">3rd arena</strong>.</li>
                </ul>
              </div>

              <!-- Tier 2: External Participants -->
              <div class="fee-tier-card fee-tier-external" style="background: #0A0F1D; border: 1.5px solid #1E293B; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #F472B6; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 EXTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: rgba(244, 114, 182, 0.2); color: #F472B6; border: 1px solid rgba(244, 114, 182, 0.4); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Other Colleges &amp; Universities
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF; margin: 0.4rem 0;">
                  ₹300 <span style="font-size: 0.85rem; font-weight: 700; color: #94A3B8;">/ Person (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #E2E8F0; font-weight: 500; line-height: 1.6;">
                  <li><strong style="color: #FFFFFF;">₹300 Per Person:</strong> Solo: ₹300 · Squad: ₹300 per member added (+₹300/person).</li>
                  <li><strong style="color: #F472B6;">2nd Event Optional &amp; FREE:</strong> Included for all registered members at no extra charge.</li>
                  <li><strong style="color: #FFFFFF;">Additional ₹300:</strong> If participating in an optional <strong style="color: #F472B6;">3rd arena</strong>.</li>
                </ul>
              </div>

            </div>

            <!-- Important Instructions Card -->
            <div style="background: #0A0F1D; border: 1.5px solid #1E293B; border-left: 5px solid #CA8A04; border-radius: 10px; padding: 1rem 1.2rem; font-size: 0.85rem; color: #E2E8F0; line-height: 1.6; margin-top: 1.2rem;">
              <strong style="color: #FDE047; font-weight: 800; font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">📌 Important Participant Instructions:</strong>
              • <strong style="color: #FFFFFF;">2nd Event Benefit:</strong> Participation in the 2nd event is optional and does <em>not</em> require any additional payment.<br>
              • <strong style="color: #FFFFFF;">3rd Event Registration:</strong> Participants wishing to register for a 3rd event must pay the applicable additional fee (₹200 Internal / ₹300 External).<br>
              • <strong style="color: #FFFFFF;">Schedule Verification:</strong> Participants must select their events by referring to the official <a href="schedule.html" target="_blank" style="color: #38BDF8; text-decoration: underline; font-weight: 800;">Event Schedule ↗</a>.<br>
              • <strong style="color: #FFFFFF;">No Overlapping Timings:</strong> Ensure that the selected events do not have conflicting slots or overlapping stages.
            </div>
          </div>"""

new_fee_card = """          <div class="fee-structure-announcement-card" style="background: #F8FAFC !important; border: 1.5px solid #E2E8F0 !important; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.8rem;">
              <div>
                <span class="section-tag" style="margin-bottom: 0.2rem; display: inline-block; background: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD; font-weight: 800;">[OFFICIAL NOTICE · REVISED STRUCTURE]</span>
                <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #0F172A !important; -webkit-text-fill-color: #0F172A !important; font-weight: 900; margin: 0; letter-spacing: 0.5px;">
                  📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
                </h2>
              </div>
              <span style="background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; font-size: 0.75rem; padding: 0.35rem 0.8rem; border-radius: 20px; font-weight: 800; letter-spacing: 0.5px;">
                ACTIVE REGISTRATION POLICY
              </span>
            </div>

            <!-- Two Tier Fee Grid -->
            <div class="fee-tier-grid">
              
              <!-- Tier 1: Internal Participants -->
              <div class="fee-tier-card fee-tier-internal" style="background: #FFFFFF !important; border: 1.5px solid #BAE6FD !important; border-top: 4px solid #0284C7 !important; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem); color: #0F172A !important; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #0369A1 !important; -webkit-text-fill-color: #0369A1 !important; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 INTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: #E0F2FE; color: #0369A1 !important; -webkit-text-fill-color: #0369A1 !important; border: 1px solid #7DD3FC; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Presidency University
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #0284C7 !important; -webkit-text-fill-color: #0284C7 !important; margin: 0.4rem 0;">
                  ₹200 <span style="font-size: 0.85rem; font-weight: 700; color: #64748B !important; -webkit-text-fill-color: #64748B !important;">/ Person (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #334155 !important; -webkit-text-fill-color: #334155 !important; font-weight: 500; line-height: 1.6;">
                  <li><strong style="color: #0F172A !important;">₹200 Per Person:</strong> Solo: ₹200 · Squad: ₹200 per member added (+₹200/person).</li>
                  <li><strong style="color: #0284C7 !important;">2nd Event Optional &amp; FREE:</strong> Included for all registered members at no extra charge.</li>
                  <li><strong style="color: #0F172A !important;">Additional ₹200:</strong> If participating in an optional <strong style="color: #0284C7 !important;">3rd arena</strong>.</li>
                </ul>
              </div>

              <!-- Tier 2: External Participants -->
              <div class="fee-tier-card fee-tier-external" style="background: #FFFFFF !important; border: 1.5px solid #FBCFE8 !important; border-top: 4px solid #DB2777 !important; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem); color: #0F172A !important; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #BE185D !important; -webkit-text-fill-color: #BE185D !important; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 EXTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: #FCE7F3; color: #BE185D !important; -webkit-text-fill-color: #BE185D !important; border: 1px solid #F472B6; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Other Colleges &amp; Universities
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #DB2777 !important; -webkit-text-fill-color: #DB2777 !important; margin: 0.4rem 0;">
                  ₹300 <span style="font-size: 0.85rem; font-weight: 700; color: #64748B !important; -webkit-text-fill-color: #64748B !important;">/ Person (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #334155 !important; -webkit-text-fill-color: #334155 !important; font-weight: 500; line-height: 1.6;">
                  <li><strong style="color: #0F172A !important;">₹300 Per Person:</strong> Solo: ₹300 · Squad: ₹300 per member added (+₹300/person).</li>
                  <li><strong style="color: #DB2777 !important;">2nd Event Optional &amp; FREE:</strong> Included for all registered members at no extra charge.</li>
                  <li><strong style="color: #0F172A !important;">Additional ₹300:</strong> If participating in an optional <strong style="color: #DB2777 !important;">3rd arena</strong>.</li>
                </ul>
              </div>

            </div>

            <!-- Important Instructions Card -->
            <div style="background: #FEF9C3 !important; border: 1px solid #FDE047 !important; border-left: 5px solid #CA8A04 !important; border-radius: 10px; padding: 1rem 1.2rem; font-size: 0.85rem; color: #854D0E !important; line-height: 1.6; margin-top: 1.2rem;">
              <strong style="color: #713F12 !important; font-weight: 800; font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">📌 Important Participant Instructions:</strong>
              • <strong style="color: #713F12 !important;">2nd Event Benefit:</strong> Participation in the 2nd event is optional and does <em>not</em> require any additional payment.<br>
              • <strong style="color: #713F12 !important;">3rd Event Registration:</strong> Participants wishing to register for a 3rd event must pay the applicable additional fee (₹200 Internal / ₹300 External).<br>
              • <strong style="color: #713F12 !important;">Schedule Verification:</strong> Participants must select their events by referring to the official <a href="schedule.html" target="_blank" style="color: #0284C7; text-decoration: underline; font-weight: 800;">Event Schedule ↗</a>.<br>
              • <strong style="color: #713F12 !important;">No Overlapping Timings:</strong> Ensure that the selected events do not have conflicting slots or overlapping stages.
            </div>
          </div>"""

if old_fee_card in content_norm:
    content_norm = content_norm.replace(old_fee_card, new_fee_card, 1)
    print("✓ Updated fee-structure-announcement-card to clean white / pastel theme")
else:
    print("⚠ old_fee_card not found by exact string, checking slice...")
    idx = content_norm.find('fee-structure-announcement-card')
    if idx != -1:
        start = content_norm.rfind('<div class="fee-structure-announcement-card"', 0, idx + 40)
        end = content_norm.find('<!-- External Portal Notice', start)
        if start != -1 and end != -1:
            content_norm = content_norm[:start] + new_fee_card + "\n\n          " + content_norm[end:]
            print("✓ Replaced fee_card via slice")

# 5. Update team-squad-outer-card
old_squad_card = """                <div class="team-squad-outer-card" style="background: rgba(15, 23, 42, 0.78); border: 1.5px solid rgba(56, 189, 248, 0.4); border-radius: 14px; padding: 1.25rem; width: 100%; box-sizing: border-box; color: #FFFFFF !important;">
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.15); padding-bottom: 0.65rem;">
                    <div>
                      <strong style="color: #38BDF8 !important; font-size: 0.95rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.4rem;">
                        <span>👥</span> TEAM SQUAD MEMBERS (INDIVIDUAL REGISTRATION FIELDS)
                      </strong>
                      <span style="font-size: 0.74rem; color: #E2E8F0 !important; display: block; margin-top: 0.2rem;">
                        Fill in distinct credentials for each participating team member.
                      </span>
                    </div>
                    <span style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10B981; color: #10B981 !important; font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 20px;">
                      👑 Member 1 = Team Leader (Auto-Assigned)
                    </span>
                  </div>

                  <!-- Team Leader Notification -->
                  <div style="background: rgba(56, 189, 248, 0.12); border-left: 3px solid #38BDF8; border-radius: 6px; padding: 0.7rem 0.9rem; margin-bottom: 1rem; font-size: 0.8rem; color: #FFFFFF !important; line-height: 1.45;">
                    👑 <strong style="color: #38BDF8 !important;">Team Leader (Member 1):</strong> Primary registrant credentials above are automatically linked as the Team Leader (<span id="team-lead-name-preview" style="color: #38BDF8 !important; font-weight: 700;">Full Name</span> · <span id="team-lead-usn-preview" style="color: #38BDF8 !important; font-weight: 700;">USN</span>).
                  </div>

                  <!-- Dynamic Member Entry Cards -->
                  <div id="team-members-container" style="display: flex; flex-direction: column; gap: 0.9rem;">
                    <!-- Injected via JavaScript with distinct Name, USN, Phone/Email fields -->
                  </div>

                  <!-- Add Member Action -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; flex-wrap: wrap; gap: 0.8rem; border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 0.85rem;">
                    <button type="button" id="btn-add-team-member" class="btn btn-secondary" style="padding: 0.55rem 1.1rem; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 8px; background: rgba(56, 189, 248, 0.15); border: 1.5px solid #38BDF8; color: #FFFFFF !important; font-weight: 700;">
                      <span>➕</span> Add Another Team Member
                    </button>
                    <span style="font-size: 0.74rem; color: #E2E8F0 !important;">
                      💡 Pricing: ₹200/member (Internal) · ₹300/member (External) · Up to 8 participants total
                    </span>
                  </div>

                </div>"""

new_squad_card = """                <div class="team-squad-outer-card" style="background: #F8FAFC !important; border: 1.5px solid #CBD5E1 !important; border-radius: 14px; padding: 1.25rem; width: 100%; box-sizing: border-box; color: #0F172A !important;">
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.65rem;">
                    <div>
                      <strong style="color: #0369A1 !important; font-size: 0.95rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.4rem;">
                        <span>👥</span> TEAM SQUAD MEMBERS (INDIVIDUAL REGISTRATION FIELDS)
                      </strong>
                      <span style="font-size: 0.74rem; color: #475569 !important; display: block; margin-top: 0.2rem;">
                        Fill in distinct credentials for each participating team member.
                      </span>
                    </div>
                    <span style="background: #DCFCE7; border: 1px solid #86EFAC; color: #166534 !important; font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 20px;">
                      👑 Member 1 = Team Leader (Auto-Assigned)
                    </span>
                  </div>

                  <!-- Team Leader Notification -->
                  <div style="background: #E0F2FE; border-left: 3px solid #0284C7; border-radius: 6px; padding: 0.7rem 0.9rem; margin-bottom: 1rem; font-size: 0.8rem; color: #0369A1 !important; line-height: 1.45;">
                    👑 <strong style="color: #0369A1 !important;">Team Leader (Member 1):</strong> Primary registrant credentials above are automatically linked as the Team Leader (<span id="team-lead-name-preview" style="color: #0284C7 !important; font-weight: 700;">Full Name</span> · <span id="team-lead-usn-preview" style="color: #0284C7 !important; font-weight: 700;">USN</span>).
                  </div>

                  <!-- Dynamic Member Entry Cards -->
                  <div id="team-members-container" style="display: flex; flex-direction: column; gap: 0.9rem;">
                    <!-- Injected via JavaScript with distinct Name, USN, Phone/Email fields -->
                  </div>

                  <!-- Add Member Action -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; flex-wrap: wrap; gap: 0.8rem; border-top: 1px solid #E2E8F0; padding-top: 0.85rem;">
                    <button type="button" id="btn-add-team-member" class="btn btn-secondary" style="padding: 0.55rem 1.1rem; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 8px; background: #F0F9FF; border: 1.5px solid #0284C7; color: #0284C7 !important; font-weight: 700;">
                      <span>➕</span> Add Another Team Member
                    </button>
                    <span style="font-size: 0.74rem; color: #475569 !important;">
                      💡 Pricing: ₹200/member (Internal) · ₹300/member (External) · Up to 8 participants total
                    </span>
                  </div>

                </div>"""

if old_squad_card in content_norm:
    content_norm = content_norm.replace(old_squad_card, new_squad_card, 1)
    print("✓ Updated team-squad-outer-card to light styling")
else:
    print("⚠ old_squad_card not found by exact string, checking slice...")
    idx = content_norm.find('team-squad-outer-card')
    if idx != -1:
        start = content_norm.rfind('<div class="team-squad-outer-card"', 0, idx + 30)
        end = content_norm.find('<!-- SECTION 3: ONLINE PAYMENT', start)
        sub_end = content_norm.rfind('</div>', start, end)
        sub_end = content_norm.rfind('</div>', start, sub_end) + len('</div>')
        content_norm = content_norm[:start] + new_squad_card + content_norm[sub_end:]
        print("✓ Replaced team_squad_card via slice")

# 6. Update payment fee display and payment instructions box
old_payment_box = """              <div class="payment-fee-summary" id="reg-fee-display" style="background: rgba(30, 41, 59, 0.95); border: 1.5px solid #38BDF8; border-radius: 14px; padding: 1.15rem 1.4rem; width: 100%; box-sizing: border-box; text-align: left; color: #FFFFFF !important;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                  <div>
                    <div style="font-size: 0.75rem; color: #E2E8F0 !important; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 800;">TOTAL REGISTRATION FEE PAYABLE</div>
                    <div style="font-size: 2.2rem; font-weight: 900; color: #38BDF8 !important; line-height: 1.2; margin: 0.2rem 0;" id="reg-fee-amount">₹200</div>
                    <div id="reg-fee-breakdown" style="font-size: 0.84rem; color: #FFFFFF !important; font-weight: 600;">
                      Internal Category Base: 1st Event included + 2nd Event FREE (₹200 total)
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span class="payment-badge" style="background: rgba(56, 189, 248, 0.2); border: 1.5px solid #38BDF8; color: #38BDF8 !important; font-size: 0.72rem; font-family: var(--font-mono); font-weight: 800; padding: 0.3rem 0.65rem; border-radius: 20px; display: inline-block;">
                      SECURE GATEWAY
                    </span>
                  </div>
                </div>
              </div>"""

new_payment_box = """              <div class="payment-fee-summary" id="reg-fee-display" style="background: #F0F9FF !important; border: 1.5px solid #38BDF8 !important; border-radius: 14px; padding: 1.15rem 1.4rem; width: 100%; box-sizing: border-box; text-align: left; color: #0F172A !important;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                  <div>
                    <div style="font-size: 0.75rem; color: #0369A1 !important; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 800;">TOTAL REGISTRATION FEE PAYABLE</div>
                    <div style="font-size: 2.2rem; font-weight: 900; color: #0284C7 !important; line-height: 1.2; margin: 0.2rem 0;" id="reg-fee-amount">₹200</div>
                    <div id="reg-fee-breakdown" style="font-size: 0.84rem; color: #334155 !important; font-weight: 600;">
                      Internal Category Base: 1st Event included + 2nd Event FREE (₹200 total)
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span class="payment-badge" style="background: #E0F2FE; border: 1.5px solid #0284C7; color: #0284C7 !important; font-size: 0.72rem; font-family: var(--font-mono); font-weight: 800; padding: 0.3rem 0.65rem; border-radius: 20px; display: inline-block;">
                      SECURE GATEWAY
                    </span>
                  </div>
                </div>
              </div>"""

if old_payment_box in content_norm:
    content_norm = content_norm.replace(old_payment_box, new_payment_box, 1)
    print("✓ Updated payment-fee-summary to light blue box")
else:
    print("⚠ old_payment_box not found by exact string, checking slice...")
    idx = content_norm.find('payment-fee-summary')
    if idx != -1:
        start = content_norm.rfind('<div class="payment-fee-summary"', 0, idx + 30)
        end = content_norm.find('<!-- Pay Now Action Button', start)
        sub_end = content_norm.rfind('</div>', start, end)
        sub_end = content_norm.rfind('</div>', start, sub_end) + len('</div>')
        content_norm = content_norm[:start] + new_payment_box + content_norm[sub_end:]
        print("✓ Replaced payment_fee_summary via slice")

old_instr_payment = """              <div class="payment-instructions-box" style="background: rgba(15, 23, 42, 0.88); border-left: 3.5px solid #38BDF8; padding: 0.95rem 1.2rem; border-radius: 8px; width: 100%; box-sizing: border-box; text-align: left;">
                <p style="font-size: 0.84rem; color: #FFFFFF !important; margin: 0; line-height: 1.6;">
                  <strong style="color: #38BDF8 !important;">After Payment:</strong> <span style="color: #FFFFFF !important;">Once your payment is successfully completed via the gateway, enter your 12-digit UTR / Transaction Reference Number below and attach the payment screenshot as proof.</span>
                </p>
              </div>"""

new_instr_payment = """              <div class="payment-instructions-box" style="background: #F8FAFC !important; border: 1px solid #E2E8F0 !important; border-left: 4px solid #0284C7 !important; padding: 0.95rem 1.2rem; border-radius: 8px; width: 100%; box-sizing: border-box; text-align: left;">
                <p style="font-size: 0.84rem; color: #334155 !important; margin: 0; line-height: 1.6;">
                  <strong style="color: #0284C7 !important;">After Payment:</strong> <span style="color: #334155 !important;">Once your payment is successfully completed via the gateway, enter your 12-digit UTR / Transaction Reference Number below and attach the payment screenshot as proof.</span>
                </p>
              </div>"""

if old_instr_payment in content_norm:
    content_norm = content_norm.replace(old_instr_payment, new_instr_payment, 1)
    print("✓ Updated payment-instructions-box to light styling")
else:
    print("⚠ old_instr_payment not found by exact string, checking slice...")
    idx = content_norm.find('payment-instructions-box')
    if idx != -1:
        start = content_norm.rfind('<div class="payment-instructions-box"', 0, idx + 30)
        end = content_norm.find('</div>', content_norm.find('</p>', start)) + len('</div>')
        content_norm = content_norm[:start] + new_instr_payment + content_norm[end:]
        print("✓ Replaced payment instructions box via slice")

with open('register.html', 'w', encoding='utf-8') as f:
    f.write(content_norm)

print("✓ Saved updated register.html")

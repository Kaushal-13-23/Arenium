import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update contact.html
with open('contact.html', 'r', encoding='utf-8') as f:
    contact = f.read()

contact = contact.replace(
    'style="font-size: 1.6rem; color: #ffffff; margin: 0.5rem 0 1rem;"',
    'style="font-size: 1.6rem; color: #000000; font-weight: 900; margin: 0.5rem 0 1rem;"'
)
contact = contact.replace(
    '<p class="contact-query-line">',
    '<p class="contact-query-line" style="color: #000000; font-weight: 700;">'
)
contact = contact.replace(
    '<strong style="color: #ffffff; display: block; margin-bottom: 0.3rem;">School of Information Science (SOIS)</strong>',
    '<strong style="color: #000000; font-weight: 800; font-size: 1.05rem; display: block; margin-bottom: 0.3rem;">School of Information Science (SOIS)</strong>'
)
contact = contact.replace(
    '<p style="color: var(--text-secondary); margin-bottom: 0.5rem;">',
    '<p style="color: #000000; font-weight: 600; margin-bottom: 0.5rem;">'
)
contact = contact.replace(
    '<p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-cyan);">',
    '<p style="font-family: var(--font-mono); font-size: 0.85rem; color: #000000; font-weight: 700;">'
)
contact = contact.replace(
    '<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">OFFICIAL INQUIRY TRANSMISSION</span>',
    '<span style="font-family: var(--font-mono); font-size: 0.8rem; color: #000000; font-weight: 800; display: block; margin-bottom: 0.3rem;">OFFICIAL INQUIRY TRANSMISSION</span>'
)
contact = contact.replace(
    '<a href="mailto:arenium@presidencyuniversity.in" class="terminal-link" style="font-size: 1rem;">',
    '<a href="mailto:arenium@presidencyuniversity.in" class="terminal-link" style="font-size: 1rem; color: #0284C7; font-weight: 800;">'
)

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(contact)
print("Updated contact.html")

# 2. Update register.html
with open('register.html', 'r', encoding='utf-8') as f:
    reg = f.read()

# Replace fee structure card styles
old_reg_card = '''<div class="fee-structure-announcement-card" style="background: rgba(15, 23, 42, 0.88); border: 1.5px solid #38BDF8; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.12); padding-bottom: 0.8rem;">
              <div>
                <span class="section-tag" style="margin-bottom: 0.2rem; display: inline-block;">[OFFICIAL NOTICE · REVISED STRUCTURE]</span>
                <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #FFFFFF; margin: 0; letter-spacing: 0.5px;">
                  📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
                </h2>
              </div>
              <span style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid #38BDF8; font-size: 0.75rem; padding: 0.35rem 0.8rem; border-radius: 20px; font-weight: 700; letter-spacing: 0.5px;">
                ACTIVE REGISTRATION POLICY
              </span>
            </div>

            <!-- Two Tier Fee Grid -->
            <div class="fee-tier-grid">
              
              <!-- Tier 1: Internal Participants -->
              <div class="fee-tier-card fee-tier-internal" style="background: rgba(30, 41, 59, 0.7); border: 1.5px solid rgba(56, 189, 248, 0.45); border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; color: #38BDF8; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 INTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: rgba(56, 189, 248, 0.2); color: #38BDF8; padding: 0.15rem 0.5rem; border-radius: 10px;">
                    Presidency University
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF; margin: 0.4rem 0;">
                  ₹200 <span style="font-size: 0.85rem; font-weight: 500; color: #94A3B8;">/ Registration (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #CBD5E1; line-height: 1.6;">
                  <li><strong>₹200 Base Fee:</strong> Registration for up to <strong>2 events</strong>.</li>
                  <li><strong>2nd Event Optional &amp; FREE:</strong> Does not require any additional payment.</li>
                  <li><strong>Additional ₹200:</strong> If participating in a <strong>3rd event</strong> (Total ₹400 for 3 events).</li>
                </ul>
              </div>

              <!-- Tier 2: External Participants -->
              <div class="fee-tier-card fee-tier-external" style="background: rgba(30, 41, 59, 0.7); border: 1.5px solid rgba(244, 114, 182, 0.45); border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; color: #F472B6; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 EXTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: rgba(244, 114, 182, 0.2); color: #F472B6; padding: 0.15rem 0.5rem; border-radius: 10px;">
                    Other Colleges &amp; Universities
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #FFFFFF; margin: 0.4rem 0;">
                  ₹300 <span style="font-size: 0.85rem; font-weight: 500; color: #94A3B8;">/ Registration (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #CBD5E1; line-height: 1.6;">
                  <li><strong>₹300 Base Fee:</strong> Registration for up to <strong>2 events</strong>.</li>
                  <li><strong>2nd Event Optional &amp; FREE:</strong> Does not require any additional payment.</li>
                  <li><strong>Additional ₹300:</strong> If participating in a <strong>3rd event</strong> (Total ₹600 for 3 events).</li>
                </ul>
              </div>

            </div>

            <!-- Important Instructions Card -->
            <div style="background: rgba(234, 179, 8, 0.08); border-left: 4px solid #EAB308; border-radius: 8px; padding: 1rem 1.2rem; font-size: 0.85rem; color: #FEF08A; line-height: 1.6;">
              <strong style="color: #FDE047; font-size: 0.9rem; display: block; margin-bottom: 0.3rem;">📌 Important Participant Instructions:</strong>
              • <strong>2nd Event Benefit:</strong> Participation in the 2nd event is optional and does <em>not</em> require any additional payment.<br>
              • <strong>3rd Event Registration:</strong> Participants wishing to register for a 3rd event must pay the applicable additional fee (₹200 Internal / ₹300 External).<br>
              • <strong>Schedule Verification:</strong> Participants must select their events by referring to the official <a href="schedule.html" target="_blank" style="color: #60A5FA; text-decoration: underline; font-weight: 700;">Event Schedule ↗</a>.<br>
              • <strong>No Overlapping Timings:</strong> Ensure that the selected events do not have conflicting slots or overlapping stages.
            </div>'''

new_reg_card = '''<div class="fee-structure-announcement-card" style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.8rem;">
              <div>
                <span class="section-tag" style="margin-bottom: 0.2rem; display: inline-block;">[OFFICIAL NOTICE · REVISED STRUCTURE]</span>
                <h2 style="font-family: var(--font-display); font-size: 1.35rem; color: #000000; font-weight: 900; margin: 0; letter-spacing: 0.5px;">
                  📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
                </h2>
              </div>
              <span style="background: #E0F2FE; color: #0369A1; border: 1.5px solid #BAE6FD; font-size: 0.75rem; padding: 0.35rem 0.8rem; border-radius: 20px; font-weight: 800; letter-spacing: 0.5px;">
                ACTIVE REGISTRATION POLICY
              </span>
            </div>

            <!-- Two Tier Fee Grid -->
            <div class="fee-tier-grid">
              
              <!-- Tier 1: Internal Participants -->
              <div class="fee-tier-card fee-tier-internal" style="background: #F0F9FF; border: 1.5px solid #BAE6FD; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #0369A1; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 INTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: #BAE6FD; color: #0369A1; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Presidency University
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #000000; margin: 0.4rem 0;">
                  ₹200 <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">/ Registration (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #000000; font-weight: 500; line-height: 1.6;">
                  <li><strong>₹200 Base Fee:</strong> Registration for up to <strong>2 events</strong>.</li>
                  <li><strong>2nd Event Optional &amp; FREE:</strong> Does not require any additional payment.</li>
                  <li><strong>Additional ₹200:</strong> If participating in a <strong>3rd event</strong> (Total ₹400 for 3 events).</li>
                </ul>
              </div>

              <!-- Tier 2: External Participants -->
              <div class="fee-tier-card fee-tier-external" style="background: #FDF2F8; border: 1.5px solid #FBCFE8; border-radius: 14px; padding: clamp(1rem, 2.5vw, 1.35rem);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.78rem; color: #9D174D; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🔹 EXTERNAL PARTICIPANTS
                  </span>
                  <span style="font-size: 0.7rem; background: #FBCFE8; color: #9D174D; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">
                    Other Colleges &amp; Universities
                  </span>
                </div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #000000; margin: 0.4rem 0;">
                  ₹300 <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">/ Registration (Up to 2 Events)</span>
                </div>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #000000; font-weight: 500; line-height: 1.6;">
                  <li><strong>₹300 Base Fee:</strong> Registration for up to <strong>2 events</strong>.</li>
                  <li><strong>2nd Event Optional &amp; FREE:</strong> Does not require any additional payment.</li>
                  <li><strong>Additional ₹300:</strong> If participating in a <strong>3rd event</strong> (Total ₹600 for 3 events).</li>
                </ul>
              </div>

            </div>

            <!-- Important Instructions Card -->
            <div style="background: #FEF9C3; border: 1.5px solid #FDE047; border-left: 5px solid #CA8A04; border-radius: 10px; padding: 1rem 1.2rem; font-size: 0.85rem; color: #000000; line-height: 1.6; margin-top: 1.2rem;">
              <strong style="color: #000000; font-weight: 800; font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">📌 Important Participant Instructions:</strong>
              • <strong>2nd Event Benefit:</strong> Participation in the 2nd event is optional and does <em>not</em> require any additional payment.<br>
              • <strong>3rd Event Registration:</strong> Participants wishing to register for a 3rd event must pay the applicable additional fee (₹200 Internal / ₹300 External).<br>
              • <strong>Schedule Verification:</strong> Participants must select their events by referring to the official <a href="schedule.html" target="_blank" style="color: #0284C7; text-decoration: underline; font-weight: 800;">Event Schedule ↗</a>.<br>
              • <strong>No Overlapping Timings:</strong> Ensure that the selected events do not have conflicting slots or overlapping stages.
            </div>'''

if old_reg_card in reg:
    reg = reg.replace(old_reg_card, new_reg_card)
    with open('register.html', 'w', encoding='utf-8') as f:
        f.write(reg)
    print("Updated register.html notice card")
else:
    print("Warning: old_reg_card pattern not found in register.html")

# 3. Update events.html
with open('events.html', 'r', encoding='utf-8') as f:
    events = f.read()

old_events_card = '''<div class="cyber-card" style="margin-bottom: 2.5rem; padding: 1.5rem 1.8rem; border-left: 4px solid #38BDF8; background: rgba(15, 23, 42, 0.85);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.6rem;">
            <div>
              <span class="section-tag">[REGISTRATION ANNOUNCEMENT]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: #FFFFFF; margin: 0.2rem 0 0;">
                📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
              </h3>
            </div>
            <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
              ⚡ REGISTER FOR EVENTS NOW ↗
            </a>
          </div>

          <div class="fee-tier-grid">
            <!-- Internal Card -->
            <div class="fee-tier-card fee-tier-internal" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 12px; padding: clamp(1rem, 2.5vw, 1.2rem);">
              <div style="color: #38BDF8; font-weight: 700; font-size: 0.82rem; letter-spacing: 1px;">🔹 INTERNAL (PRESIDENCY UNIVERSITY)</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin: 0.2rem 0;">₹200 <span style="font-size: 0.75rem; color: #94A3B8; font-weight: normal;">(Up to 2 Events)</span></div>
              <p style="font-size: 0.82rem; color: #CBD5E1; margin: 0; line-height: 1.5;">
                • Base fee covers <strong>up to 2 events</strong>.<br>
                • <strong>2nd event is optional &amp; FREE</strong>.<br>
                • Additional <strong>₹200</strong> if participating in a <strong>3rd event</strong>.
              </p>
            </div>

            <!-- External Card -->
            <div class="fee-tier-card fee-tier-external" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(244, 114, 182, 0.35); border-radius: 12px; padding: clamp(1rem, 2.5vw, 1.2rem);">
              <div style="color: #F472B6; font-weight: 700; font-size: 0.82rem; letter-spacing: 1px;">🔹 EXTERNAL (OTHER COLLEGES)</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin: 0.2rem 0;">₹300 <span style="font-size: 0.75rem; color: #94A3B8; font-weight: normal;">(Up to 2 Events)</span></div>
              <p style="font-size: 0.82rem; color: #CBD5E1; margin: 0; line-height: 1.5;">
                • Base fee covers <strong>up to 2 events</strong>.<br>
                • <strong>2nd event is optional &amp; FREE</strong>.<br>
                • Additional <strong>₹300</strong> if participating in a <strong>3rd event</strong>.
              </p>
            </div>
          </div>

          <div style="font-size: 0.82rem; color: #94A3B8; line-height: 1.5;">
            ⚠️ <em>Important:</em> Participants must select their events by referring to the official <a href="schedule.html" style="color: #38BDF8; text-decoration: underline;">Event Schedule</a> to ensure selected events do not have overlapping timings.
          </div>
        </div>'''

new_events_card = '''<div class="cyber-card" style="margin-bottom: 2.5rem; padding: 1.5rem 1.8rem; border: 1.5px solid #CBD5E1; border-left: 5px solid #0284C7; background: #FFFFFF; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.6rem;">
            <div>
              <span class="section-tag">[REGISTRATION ANNOUNCEMENT]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: #000000; font-weight: 900; margin: 0.2rem 0 0;">
                📢 ARENIUM ’27 – UPDATED REGISTRATION FEE STRUCTURE
              </h3>
            </div>
            <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
              ⚡ REGISTER FOR EVENTS NOW ↗
            </a>
          </div>

          <div class="fee-tier-grid">
            <!-- Internal Card -->
            <div class="fee-tier-card fee-tier-internal" style="background: #F0F9FF; border: 1.5px solid #BAE6FD; border-radius: 12px; padding: clamp(1rem, 2.5vw, 1.2rem);">
              <div style="color: #0369A1; font-weight: 800; font-size: 0.82rem; letter-spacing: 1px;">🔹 INTERNAL (PRESIDENCY UNIVERSITY)</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: #000000; margin: 0.2rem 0;">₹200 <span style="font-size: 0.75rem; color: #475569; font-weight: 700;">(Up to 2 Events)</span></div>
              <p style="font-size: 0.85rem; color: #000000; font-weight: 500; margin: 0; line-height: 1.5;">
                • Base fee covers <strong>up to 2 events</strong>.<br>
                • <strong>2nd event is optional &amp; FREE</strong>.<br>
                • Additional <strong>₹200</strong> if participating in a <strong>3rd event</strong>.
              </p>
            </div>

            <!-- External Card -->
            <div class="fee-tier-card fee-tier-external" style="background: #FDF2F8; border: 1.5px solid #FBCFE8; border-radius: 12px; padding: clamp(1rem, 2.5vw, 1.2rem);">
              <div style="color: #9D174D; font-weight: 800; font-size: 0.82rem; letter-spacing: 1px;">🔹 EXTERNAL (OTHER COLLEGES)</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: #000000; margin: 0.2rem 0;">₹300 <span style="font-size: 0.75rem; color: #475569; font-weight: 700;">(Up to 2 Events)</span></div>
              <p style="font-size: 0.85rem; color: #000000; font-weight: 500; margin: 0; line-height: 1.5;">
                • Base fee covers <strong>up to 2 events</strong>.<br>
                • <strong>2nd event is optional &amp; FREE</strong>.<br>
                • Additional <strong>₹300</strong> if participating in a <strong>3rd event</strong>.
              </p>
            </div>
          </div>

          <div style="font-size: 0.85rem; color: #000000; font-weight: 600; line-height: 1.5; margin-top: 1rem;">
            ⚠️ <em>Important:</em> Participants must select their events by referring to the official <a href="schedule.html" style="color: #0284C7; text-decoration: underline; font-weight: 800;">Event Schedule</a> to ensure selected events do not have overlapping timings.
          </div>
        </div>'''

if old_events_card in events:
    events = events.replace(old_events_card, new_events_card)
    with open('events.html', 'w', encoding='utf-8') as f:
        f.write(events)
    print("Updated events.html notice card")
else:
    print("Warning: old_events_card pattern not found in events.html")

# 4. Update schedule.html
with open('schedule.html', 'r', encoding='utf-8') as f:
    sched = f.read()

old_sched_card = '''<div class="cyber-card" style="margin-bottom: 2rem; padding: 1.2rem 1.5rem; border-left: 4px solid #EAB308; background: rgba(15, 23, 42, 0.85);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
            <div>
              <span class="section-tag" style="color: #FDE047;">[TIMING ADVISORY · MULTI-EVENT REGISTRANTS]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF; margin: 0.2rem 0;">
                📢 Cross-Reference Event Timings Before Registering
              </h3>
              <p style="font-size: 0.84rem; color: #CBD5E1; margin: 0; line-height: 1.5;">
                Participants can register for up to 3 events (Internal: ₹200 for up to 2 events, +₹200 for 3rd · External: ₹300 for up to 2 events, +₹300 for 3rd · 2nd event FREE).<br>
                <strong>Please check the schedule milestones below to ensure your chosen events do not have overlapping slots!</strong>
              </p>
            </div>
            <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
              ⚡ REGISTER FOR EVENTS ↗
            </a>
          </div>
        </div>'''

new_sched_card = '''<div class="cyber-card" style="margin-bottom: 2rem; padding: 1.2rem 1.5rem; border: 1.5px solid #FDE047; border-left: 5px solid #CA8A04; background: #FEF9C3; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
            <div>
              <span class="section-tag" style="color: #000000; background: #FEF08A; border: 1px solid #CA8A04; font-weight: 800;">[TIMING ADVISORY · MULTI-EVENT REGISTRANTS]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #000000; font-weight: 900; margin: 0.2rem 0;">
                📢 Cross-Reference Event Timings Before Registering
              </h3>
              <p style="font-size: 0.85rem; color: #000000; font-weight: 500; margin: 0; line-height: 1.5;">
                Participants can register for up to 3 events (Internal: ₹200 for up to 2 events, +₹200 for 3rd · External: ₹300 for up to 2 events, +₹300 for 3rd · 2nd event FREE).<br>
                <strong style="color: #000000; font-weight: 800;">Please check the schedule milestones below to ensure your chosen events do not have overlapping slots!</strong>
              </p>
            </div>
            <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
              ⚡ REGISTER FOR EVENTS ↗
            </a>
          </div>
        </div>'''

if old_sched_card in sched:
    sched = sched.replace(old_sched_card, new_sched_card)
    with open('schedule.html', 'w', encoding='utf-8') as f:
        f.write(sched)
    print("Updated schedule.html advisory card")
else:
    print("Warning: old_sched_card pattern not found in schedule.html")

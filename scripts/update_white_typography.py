import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("Starting white typography enforcement...")

# 1. Update winners.html
with open('winners.html', 'r', encoding='utf-8') as f:
    winners_html = f.read()

winners_target = """        <div class="section-header reveal-on-scroll">
          <span class="section-tag">[VICTORY ARCHIVE]</span>
          <h2 class="section-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">PODIUM LEADERBOARD</h2>
          <p class="section-subtitle" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;">
            Click on "Frame Cert &gt;" next to any winner to customize and download their official framed certificate of excellence.
          </p>
        </div>"""

winners_replacement = """        <div class="section-header reveal-on-scroll" style="background: rgba(15, 23, 42, 0.94) !important; border: 1.5px solid rgba(56, 189, 248, 0.3) !important; color: #FFFFFF !important;">
          <span class="section-tag" style="background: rgba(2, 132, 199, 0.2) !important; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; border: 1px solid rgba(56, 189, 248, 0.4) !important; font-weight: 800 !important;">[VICTORY ARCHIVE]</span>
          <h2 class="section-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 900; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);">PODIUM LEADERBOARD</h2>
          <p class="section-subtitle" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 600; opacity: 0.95;">
            Click on "Frame Cert &gt;" next to any winner to customize and download their official framed certificate of excellence.
          </p>
        </div>"""

winners_html_norm = winners_html.replace('\r\n', '\n')
if winners_target in winners_html_norm:
    winners_html_norm = winners_html_norm.replace(winners_target, winners_replacement, 1)
    with open('winners.html', 'w', encoding='utf-8') as f:
        f.write(winners_html_norm)
    print("✓ Updated winners.html section-header")
else:
    print("⚠ winners_target not found by exact string, checking partial...")
    idx = winners_html_norm.find('PODIUM LEADERBOARD')
    if idx != -1:
        start = winners_html_norm.rfind('<div class="section-header', 0, idx)
        end = winners_html_norm.find('</div>', idx) + len('</div>')
        winners_html_norm = winners_html_norm[:start] + winners_replacement + winners_html_norm[end:]
        with open('winners.html', 'w', encoding='utf-8') as f:
            f.write(winners_html_norm)
        print("✓ Replaced section-header via slice in winners.html")

# 2. Update js/main.js - initWinnersPage
with open('js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

main_js_norm = main_js.replace('\r\n', '\n')

old_init_winners = """function initWinnersPage(db) {
  try {
    const container = document.getElementById("winners-grid-container");
    if (!container) return;

    container.innerHTML = "";

    if (!db.settings.resultsPublished) {
      container.innerHTML = `
        <div class="cyber-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
          <h3 style="font-family: var(--font-display); color: var(--neon-yellow); margin-bottom: 0.8rem;">
            ⚡ OFFICIAL RESULTS LOCK ENGAGED ⚡
          </h3>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
            The festival competitions are currently underway. Verified podium positions will be unlocked here after the Grand Valedictory Ceremony!
          </p>
        </div>
      `;
      return;
    }

    db.winners.forEach(w => {
      const card = document.createElement("div");
      card.className = "winner-card reveal-on-scroll is-visible";
      
      let tiersHtml = "";
      (w.tiers || []).forEach(tier => {
        let medalClass = "medal-gold";
        let medalIcon = "🥇";
        if (tier.rank === 2) {
          medalClass = "medal-silver";
          medalIcon = "🥈";
        } else if (tier.rank === 3) {
          medalClass = "medal-bronze";
          medalIcon = "🥉";
        }

        tiersHtml += `
          <div class="winner-tier-row">
            <div class="winner-medal ${medalClass}">${medalIcon}</div>
            <div style="flex: 1;">
              <div class="winner-team-name">${tier.team}</div>
              <div class="winner-college">${tier.college}</div>
            </div>
            <div style="text-align: right;">
              <div class="winner-cash-badge">${tier.prize}</div>
              <a href="certificate.html?winner=${encodeURIComponent(tier.team)}&event=${encodeURIComponent(w.eventName)}&rank=${tier.rank}&cert=${tier.certId || ''}" 
                 style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); text-decoration: none; display: block; margin-top: 0.3rem;">
                📜 Frame Cert &gt;
              </a>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="winner-card-header">
          <div>
            <span class="event-category-badge" style="font-size: 0.65rem;">${w.category}</span>
            <div class="winner-event-title">${w.eventName}</div>
          </div>
          <span style="color: var(--neon-yellow); font-size: 1.4rem;">🏆</span>
        </div>
        <div class="winner-tier-list">
          ${tiersHtml}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error initializing winners page:", err);
  }
}"""

new_init_winners = """function initWinnersPage(db) {
  try {
    const container = document.getElementById("winners-grid-container");
    if (!container) return;

    container.innerHTML = "";

    if (!db.settings.resultsPublished) {
      container.innerHTML = `
        <div class="cyber-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: #0A0F1D !important; border: 1.5px solid rgba(56, 189, 248, 0.3) !important;">
          <h3 style="font-family: var(--font-display); color: #FDE047 !important; -webkit-text-fill-color: #FDE047 !important; margin-bottom: 0.8rem; font-weight: 800;">
            ⚡ OFFICIAL RESULTS LOCK ENGAGED ⚡
          </h3>
          <p style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; max-width: 500px; margin: 0 auto; font-size: 0.95rem; line-height: 1.6;">
            The festival competitions are currently underway. Verified podium positions will be unlocked here after the Grand Valedictory Ceremony!
          </p>
        </div>
      `;
      return;
    }

    db.winners.forEach(w => {
      const card = document.createElement("div");
      card.className = "winner-card reveal-on-scroll is-visible";
      card.setAttribute("style", "background: #0A0F1D !important; border: 1.5px solid #1E293B !important; color: #FFFFFF !important;");
      
      let tiersHtml = "";
      (w.tiers || []).forEach(tier => {
        let medalClass = "medal-gold";
        let medalIcon = "🥇";
        if (tier.rank === 2) {
          medalClass = "medal-silver";
          medalIcon = "🥈";
        } else if (tier.rank === 3) {
          medalClass = "medal-bronze";
          medalIcon = "🥉";
        }

        tiersHtml += `
          <div class="winner-tier-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <div class="winner-medal ${medalClass}">${medalIcon}</div>
            <div style="flex: 1;">
              <div class="winner-team-name" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 800;">${tier.team}</div>
              <div class="winner-college" style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-size: 0.82rem;">${tier.college}</div>
            </div>
            <div style="text-align: right;">
              <div class="winner-cash-badge" style="color: #FDE047 !important; -webkit-text-fill-color: #FDE047 !important; background: rgba(253, 224, 71, 0.12) !important; border: 1px solid rgba(253, 224, 71, 0.4) !important; font-weight: 800;">${tier.prize}</div>
              <a href="certificate.html?winner=${encodeURIComponent(tier.team)}&event=${encodeURIComponent(w.eventName)}&rank=${tier.rank}&cert=${tier.certId || ''}" 
                 style="font-family: var(--font-mono); font-size: 0.72rem; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-decoration: none; display: block; margin-top: 0.3rem; font-weight: 700;">
                📜 Frame Cert &gt;
              </a>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="winner-card-header" style="background: rgba(15, 23, 42, 0.95) !important; border-bottom: 1px solid rgba(56, 189, 248, 0.25) !important; padding: 1.2rem;">
          <div>
            <span class="event-category-badge" style="font-size: 0.65rem; background: rgba(2, 132, 199, 0.2) !important; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; border: 1px solid rgba(56, 189, 248, 0.4) !important; font-weight: 800;">${w.category}</span>
            <div class="winner-event-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 1.15rem; font-weight: 900; margin-top: 0.4rem;">${w.eventName}</div>
          </div>
          <span style="color: #FDE047; font-size: 1.4rem;">🏆</span>
        </div>
        <div class="winner-tier-list">
          ${tiersHtml}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error initializing winners page:", err);
  }
}"""

if old_init_winners in main_js_norm:
    main_js_norm = main_js_norm.replace(old_init_winners, new_init_winners, 1)
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(main_js_norm)
    print("✓ Updated initWinnersPage in js/main.js")
else:
    print("⚠ old_init_winners not found by exact string, checking start...")
    start_idx = main_js_norm.find('function initWinnersPage')
    end_idx = main_js_norm.find('function initCertificateStudio', start_idx)
    if start_idx != -1 and end_idx != -1:
        main_js_norm = main_js_norm[:start_idx] + new_init_winners + "\n\n// " + main_js_norm[end_idx-3:]
        with open('js/main.js', 'w', encoding='utf-8') as f:
            f.write(main_js_norm)
        print("✓ Replaced initWinnersPage via slice in js/main.js")

# 3. Update contact.html SOIS FEST DESK
with open('contact.html', 'r', encoding='utf-8') as f:
    contact_html = f.read()

contact_html_norm = contact_html.replace('\r\n', '\n')

old_contact_block = """          <!-- Left Column: Venue & Map Embed -->
          <div class="cyber-card contact-info-card reveal-on-scroll">
            <span class="section-tag">[CAMPUS HEADQUARTERS]</span>
            <h2 style="font-size: 1.6rem; color: #000000; font-weight: 900; margin: 0.5rem 0 1rem;">SOIS FEST DESK</h2>

            <p class="contact-query-line" style="color: #000000; font-weight: 700;">
              "In case of any query or problem feel free to visit our office or contact the following numbers."
            </p>

            <div class="contact-address-box">
              <strong style="color: #000000; font-weight: 800; font-size: 1.05rem; display: block; margin-bottom: 0.3rem;">School of Information Science (SOIS)</strong>
              <p style="color: #000000; font-weight: 600; margin-bottom: 0.5rem;">
                Presidency University Campus,<br>
                Itgalpura, Rajanukunte,<br>
                Bengaluru, Karnataka 560064
              </p>
              <p style="font-family: var(--font-mono); font-size: 0.85rem; color: #000000; font-weight: 700;">
                Office Hours: 08:30 AM – 05:00 PM IST
              </p>
            </div>

            <!-- Email Placeholder -->
            <div style="margin-bottom: var(--space-lg);">
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #000000; font-weight: 800; display: block; margin-bottom: 0.3rem;">OFFICIAL INQUIRY TRANSMISSION</span>
              <a href="mailto:arenium@presidencyuniversity.in" class="terminal-link" style="font-size: 1rem; color: #0284C7; font-weight: 800;">
                📧 arenium@presidencyuniversity.in
              </a>
            </div>"""

new_contact_block = """          <!-- Left Column: Venue & Map Embed -->
          <div class="cyber-card contact-info-card reveal-on-scroll" style="background: #0A0F1D !important; border: 1.5px solid #1E293B !important; color: #FFFFFF !important;">
            <span class="section-tag" style="background: rgba(2, 132, 199, 0.2) !important; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; border: 1px solid rgba(56, 189, 248, 0.4) !important; font-weight: 800 !important;">[CAMPUS HEADQUARTERS]</span>
            <h2 style="font-size: 1.6rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 900; margin: 0.5rem 0 1rem; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);">SOIS FEST DESK</h2>

            <p class="contact-query-line" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 600;">
              "In case of any query or problem feel free to visit our office or contact the following numbers."
            </p>

            <div class="contact-address-box" style="background: rgba(30, 41, 59, 0.7) !important; border: 1.5px solid rgba(56, 189, 248, 0.3) !important; border-left: 4px solid #38BDF8 !important; border-radius: 12px; padding: 1.2rem;">
              <strong style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-weight: 800; font-size: 1.05rem; display: block; margin-bottom: 0.3rem;">School of Information Science (SOIS)</strong>
              <p style="color: #E2E8F0 !important; -webkit-text-fill-color: #E2E8F0 !important; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.5;">
                Presidency University Campus,<br>
                Itgalpura, Rajanukunte,<br>
                Bengaluru, Karnataka 560064
              </p>
              <p style="font-family: var(--font-mono); font-size: 0.85rem; color: #94A3B8 !important; -webkit-text-fill-color: #94A3B8 !important; font-weight: 700;">
                Office Hours: 08:30 AM – 05:00 PM IST
              </p>
            </div>

            <!-- Email Placeholder -->
            <div style="margin-bottom: var(--space-lg);">
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-weight: 800; display: block; margin-bottom: 0.3rem;">OFFICIAL INQUIRY TRANSMISSION</span>
              <a href="mailto:arenium@presidencyuniversity.in" class="terminal-link" style="font-size: 1rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 800;">
                📧 arenium@presidencyuniversity.in
              </a>
            </div>"""

if old_contact_block in contact_html_norm:
    contact_html_norm = contact_html_norm.replace(old_contact_block, new_contact_block, 1)
    with open('contact.html', 'w', encoding='utf-8') as f:
        f.write(contact_html_norm)
    print("✓ Updated contact.html SOIS FEST DESK")
else:
    print("⚠ old_contact_block not found by exact string, checking slice...")
    idx = contact_html_norm.find('SOIS FEST DESK')
    if idx != -1:
        start = contact_html_norm.rfind('<!-- Left Column: Venue', 0, idx)
        end = contact_html_norm.find('<!-- Embedded Google Map', idx)
        contact_html_norm = contact_html_norm[:start] + new_contact_block + "\n\n            " + contact_html_norm[end:]
        with open('contact.html', 'w', encoding='utf-8') as f:
            f.write(contact_html_norm)
        print("✓ Replaced contact block via slice in contact.html")

# 4. Update schedule.html multi-event timing advisory
with open('schedule.html', 'r', encoding='utf-8') as f:
    sched_html = f.read()

sched_html_norm = sched_html.replace('\r\n', '\n')

old_sched_advisory = """        <div class="cyber-card" style="margin-bottom: 2rem; padding: 1.2rem 1.5rem; border: 1.5px solid #FDE047; border-left: 5px solid #CA8A04; background: #FEF9C3; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
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
        </div>"""

new_sched_advisory = """        <div class="cyber-card" style="margin-bottom: 2rem; padding: 1.2rem 1.5rem; border: 1.5px solid #FDE047; border-left: 5px solid #FDE047; background: #0A0F1D !important; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); color: #FFFFFF !important;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
            <div>
              <span class="section-tag" style="background: rgba(253, 224, 71, 0.15); color: #FDE047 !important; -webkit-text-fill-color: #FDE047 !important; border: 1px solid rgba(253, 224, 71, 0.4); font-weight: 800;">[TIMING ADVISORY · MULTI-EVENT REGISTRANTS]</span>
              <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 900; margin: 0.3rem 0;">
                📢 Cross-Reference Event Timings Before Registering
              </h3>
              <p style="font-size: 0.85rem; color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-weight: 500; margin: 0; line-height: 1.5;">
                Participants can register for up to 3 events (Internal: ₹200 for up to 2 events, +₹200 for 3rd · External: ₹300 for up to 2 events, +₹300 for 3rd · 2nd event FREE).<br>
                <strong style="color: #FDE047 !important; -webkit-text-fill-color: #FDE047 !important; font-weight: 800;">Please check the schedule milestones below to ensure your chosen events do not have overlapping slots!</strong>
              </p>
            </div>
            <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1.4rem; font-size: 0.82rem;">
              ⚡ REGISTER FOR EVENTS ↗
            </a>
          </div>
        </div>"""

if old_sched_advisory in sched_html_norm:
    sched_html_norm = sched_html_norm.replace(old_sched_advisory, new_sched_advisory, 1)
    with open('schedule.html', 'w', encoding='utf-8') as f:
        f.write(sched_html_norm)
    print("✓ Updated schedule.html advisory card")
else:
    print("⚠ old_sched_advisory not found by exact string, checking slice...")
    idx = sched_html_norm.find('TIMING ADVISORY')
    if idx != -1:
        start = sched_html_norm.rfind('<div class="cyber-card"', 0, idx)
        end = sched_html_norm.find('</div>', sched_html_norm.find('REGISTER FOR EVENTS', idx)) + len('</div>')
        sched_html_norm = sched_html_norm[:start] + new_sched_advisory + sched_html_norm[end:]
        with open('schedule.html', 'w', encoding='utf-8') as f:
            f.write(sched_html_norm)
        print("✓ Replaced schedule advisory via slice in schedule.html")

# 5. Update register.html DELEGATE REGISTRATION title and subtitle
with open('register.html', 'r', encoding='utf-8') as f:
    reg_html = f.read()

reg_html_norm = reg_html.replace('\r\n', '\n')

old_reg_header = """            <h1 class="register-title">DELEGATE REGISTRATION</h1>
            <p class="register-subtitle">
              School of Information Science (SOIS) · Presidency University, Bengaluru<br>
              Secure your slot in India's premier inter-college tech fest.
            </p>"""

new_reg_header = """            <h1 class="register-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 900; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);">DELEGATE REGISTRATION</h1>
            <p class="register-subtitle" style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-weight: 600;">
              School of Information Science (SOIS) · Presidency University, Bengaluru<br>
              Secure your slot in India's premier inter-college tech fest.
            </p>"""

if old_reg_header in reg_html_norm:
    reg_html_norm = reg_html_norm.replace(old_reg_header, new_reg_header, 1)
    with open('register.html', 'w', encoding='utf-8') as f:
        f.write(reg_html_norm)
    print("✓ Updated register.html title & subtitle")
else:
    idx = reg_html_norm.find('DELEGATE REGISTRATION')
    if idx != -1:
        start = reg_html_norm.rfind('<h1 class="register-title"', 0, idx)
        end = reg_html_norm.find('</p>', idx) + len('</p>')
        reg_html_norm = reg_html_norm[:start] + new_reg_header + reg_html_norm[end:]
        with open('register.html', 'w', encoding='utf-8') as f:
            f.write(reg_html_norm)
        print("✓ Replaced register header via slice in register.html")

print("All HTML/JS files updated successfully!")

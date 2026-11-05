import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update .header-pu-logo in css/style.css
# Replace existing default .header-pu-logo height & max-width
css = re.sub(
    r'\.header-pu-logo\s*\{[^}]*\}',
    '''.header-pu-logo {
  height: clamp(32px, 3.2vw, 42px) !important;
  width: auto !important;
  max-width: 195px !important;
  object-fit: contain !important;
  transition: opacity 0.3s ease;
}''',
    css,
    count=1
)

# 2. Update .header-fest-logo-img in css/style.css
css = re.sub(
    r'\.header-fest-logo-img\s*\{[^}]*\}',
    '''.header-fest-logo-img {
  width: auto !important;
  height: clamp(34px, 3.4vw, 42px) !important;
  max-width: 175px !important;
  object-fit: contain !important;
  display: block !important;
}''',
    css,
    count=1
)

# 3. In the global black text block at the bottom of css/style.css,
# remove countdown and footer classes so they aren't forced to black:
# Remove .stat-number, .stat-label, .count-num, .count-label, .countdown-box, .countdown-box *, .footer-desc
css = css.replace('.footer-desc,', '')
css = css.replace('.stat-label,', '')
css = css.replace('.stat-number,', '')

# 4. Append the authoritative new rules for:
# - Logos sizing
# - Hero presenter tag ("PRESIDENCY SCHOOL OF INFORMATION SCIENCE PRESENTS") a little big
# - Arenium '27 2px smaller
# - Times countdown light / white
# - Site footer fully visible high contrast text
footer_hero_fix = """

/* ========================================================================
   USER REFINEMENTS: HERO LOGOS, PRESENTER TAG, TITLE & COUNTDOWN (IMAGE 1)
   ======================================================================== */

/* 1. Header Logos (Made a little bigger) */
.header-pu-logo {
  height: clamp(32px, 3.2vw, 42px) !important;
  width: auto !important;
  max-width: 195px !important;
  object-fit: contain !important;
}

.header-fest-logo-img {
  height: clamp(34px, 3.4vw, 42px) !important;
  width: auto !important;
  max-width: 175px !important;
  object-fit: contain !important;
}

.mobile-header-fest-logo img {
  height: 32px !important;
  width: auto !important;
}

/* 2. Presenter Banner: 'PRESIDENCY SCHOOL OF INFORMATION SCIENCE PRESENTS' (Made a little bigger) */
.hero-presenter-banner {
  margin-bottom: 1.6rem !important;
}

.hero-main-glass-card .hero-presenter-tag,
.hero-presenter-tag {
  font-size: clamp(0.88rem, 1.35vw, 1.08rem) !important;
  font-weight: 800 !important;
  letter-spacing: 2.5px !important;
  padding: 0.65rem 1.8rem !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  background: rgba(14, 20, 32, 0.65) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.45) !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.5) !important;
  border-radius: 50px !important;
  text-shadow: none !important;
}

.hero-presenter-tag .pulse-dot {
  width: 9px !important;
  height: 9px !important;
  background: #38BDF8 !important;
}

/* 3. Hero Fest Title: 'ARENIUM '27' (Made exactly 2px smaller) */
.glitch-title,
.hero-fest-title,
.hero-main-glass-card .glitch-title {
  font-size: calc(clamp(2.8rem, 8.5vw, 6.2rem) - 2px) !important;
  color: #FFFFFF !important;
  background: linear-gradient(180deg, #FFFFFF 0%, #E0F2FE 70%, #BAE6FD 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important;
  filter: none !important;
}

@media (max-width: 640px) {
  .hero-main-glass-card .glitch-title {
    font-size: calc(clamp(2.2rem, 11vw, 3.2rem) - 2px) !important;
  }
}

/* 4. Live Countdown Timer: Times color light / white */
.countdown-container .countdown-box,
.countdown-box,
.countdown-box *,
.countdown-box .count-num,
.countdown-box .count-label,
#count-days,
#count-hours,
#count-mins,
#count-secs {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  text-shadow: none !important;
}

.countdown-box .count-num {
  font-size: clamp(1.8rem, 3.8vw, 2.5rem) !important;
  font-weight: 900 !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  line-height: 1.1 !important;
}

.countdown-box .count-label {
  font-size: clamp(0.68rem, 1vw, 0.78rem) !important;
  font-weight: 700 !important;
  letter-spacing: 0.14em !important;
  color: #CBD5E1 !important;
  -webkit-text-fill-color: #CBD5E1 !important;
  margin-top: 0.2rem !important;
}


/* ========================================================================
   SITE FOOTER: HIGH-CONTRAST VISIBLE TYPOGRAPHY (IMAGE 2 FIX)
   Ensures all text, headings, links, addresses, and contacts are
   completely visible and readable against the dark footer background.
   ======================================================================== */
.site-footer {
  background: #0B0F19 !important;
  border-top: 1.5px solid rgba(255, 255, 255, 0.12) !important;
  color: #E2E8F0 !important;
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(1.5rem, 3vw, 2.5rem) !important;
}

/* Footer Brand */
.site-footer .brand-name,
.site-footer .brand-link span {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-family: var(--font-display) !important;
  font-size: 1.55rem !important;
  font-weight: 900 !important;
  letter-spacing: 0.05em !important;
}

.site-footer .brand-name .accent-quote,
.site-footer .brand-name .accent-num {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

/* Footer Description */
.site-footer .footer-desc {
  color: #E2E8F0 !important;
  -webkit-text-fill-color: #E2E8F0 !important;
  font-size: 0.94rem !important;
  line-height: 1.7 !important;
  font-weight: 500 !important;
  margin-bottom: 1.2rem !important;
}

/* Host Tag */
.site-footer .footer-host-tag {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  font-weight: 700 !important;
  font-size: 0.88rem !important;
  letter-spacing: 0.03em !important;
  margin-bottom: 1.2rem !important;
}

/* PU Logo in Footer */
.site-footer .footer-pu-logo {
  filter: none !important;
  -webkit-filter: none !important;
  max-width: 220px !important;
  height: auto !important;
  margin-bottom: 1.2rem !important;
}

/* Social Icons */
.site-footer .footer-social-row {
  display: flex !important;
  gap: 0.8rem !important;
}

.site-footer .social-pill {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  border-radius: 50% !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  transition: all 0.25s ease !important;
}

.site-footer .social-pill:hover {
  background: #38BDF8 !important;
  color: #0B0F19 !important;
  -webkit-text-fill-color: #0B0F19 !important;
  transform: translateY(-3px) !important;
}

/* Column Titles (QUICK LINKS, CAMPUS VENUE, LOCATION MAP) */
.site-footer .footer-col-title,
.site-footer h4 {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-family: var(--font-display) !important;
  font-size: 1.05rem !important;
  font-weight: 900 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  border-bottom: 2px solid #38BDF8 !important;
  display: inline-block !important;
  padding-bottom: 0.35rem !important;
  margin-bottom: 1.2rem !important;
}

/* Quick Links List */
.site-footer .footer-links-list li,
.site-footer .footer-links-list li a {
  color: #CBD5E1 !important;
  -webkit-text-fill-color: #CBD5E1 !important;
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
  display: inline-block !important;
  padding: 0.15rem 0 !important;
}

.site-footer .footer-links-list li a:hover {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  transform: translateX(4px) !important;
}

/* Campus Venue Address */
.site-footer .footer-address {
  color: #CBD5E1 !important;
  -webkit-text-fill-color: #CBD5E1 !important;
  font-size: 0.92rem !important;
  line-height: 1.65 !important;
  font-style: normal !important;
  margin-bottom: 1.2rem !important;
}

.site-footer .footer-address strong {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-weight: 800 !important;
  font-size: 0.98rem !important;
  display: block !important;
  margin-bottom: 0.35rem !important;
}

/* Phone Contacts List */
.site-footer .footer-contacts-list li,
.site-footer .footer-contacts-list li a {
  color: #F472B6 !important;
  -webkit-text-fill-color: #F472B6 !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  padding: 0.2rem 0 !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
}

.site-footer .footer-contacts-list li a:hover {
  color: #FBCFE8 !important;
  -webkit-text-fill-color: #FBCFE8 !important;
  transform: translateX(3px) !important;
}

/* Location Map Card */
.site-footer .footer-map-card {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 14px !important;
  padding: 0.85rem !important;
}

.site-footer .map-pin-indicator {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  font-weight: 800 !important;
}

/* Footer Bottom Bar */
.site-footer .footer-bottom-bar,
.site-footer .footer-bottom-bar div,
.site-footer .footer-bottom-bar span {
  color: #94A3B8 !important;
  -webkit-text-fill-color: #94A3B8 !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
}

.site-footer .footer-bottom-bar a {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  font-weight: 700 !important;
  text-decoration: none !important;
}

.site-footer .footer-bottom-bar a:hover {
  text-decoration: underline !important;
}
"""

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css + footer_hero_fix)

print("Updated css/style.css successfully.")

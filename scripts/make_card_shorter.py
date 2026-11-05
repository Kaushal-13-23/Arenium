import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

compact_card_css = """

/* ========================================================================
   HERO MAIN GLASS CARD - COMPACT HEIGHT REFINEMENT ("MAKE IT SHORTER")
   Tightens vertical padding & element margins so the card fits elegantly
   ======================================================================== */
.hero-section {
  min-height: auto !important;
  padding: clamp(1rem, 2.2vw, 1.8rem) 1rem !important;
}

.hero-main-glass-card {
  padding: clamp(1.2rem, 2.2vw, 1.8rem) clamp(1rem, 3vw, 2.4rem) !important;
  max-width: 920px !important;
}

.hero-presenter-banner {
  margin-bottom: 0.75rem !important;
}

.hero-main-glass-card .glitch-title {
  margin: 0.25rem 0 0.15rem !important;
}

.hero-main-glass-card .hero-tagline,
.hero-main-glass-card .hero-tagline .tag-part,
.hero-main-glass-card .tag-part {
  margin-bottom: 0.15rem !important;
  font-size: clamp(0.9rem, 1.6vw, 1.15rem) !important;
  letter-spacing: 3px !important;
}

.hero-main-glass-card .hero-subtagline {
  margin-bottom: 0.75rem !important;
  font-size: clamp(0.72rem, 1vw, 0.85rem) !important;
  letter-spacing: 2px !important;
}

.hero-main-glass-card .countdown-container {
  margin: 0.2rem 0 0.75rem !important;
  max-width: 520px !important;
}

.hero-main-glass-card .countdown-box,
.countdown-box {
  padding: 0.55rem 0.5rem !important;
  border-radius: 14px !important;
}

.countdown-box .count-num {
  font-size: clamp(1.6rem, 3vw, 2.1rem) !important;
  line-height: 1 !important;
}

.countdown-box .count-label {
  font-size: clamp(0.6rem, 0.85vw, 0.72rem) !important;
  letter-spacing: 0.12em !important;
  margin-top: 0.15rem !important;
}

.hero-main-glass-card .hero-date-badge {
  padding: 0.35rem 1.3rem !important;
  margin-bottom: 0.95rem !important;
  font-size: clamp(0.72rem, 1vw, 0.84rem) !important;
  letter-spacing: 1.2px !important;
}

.hero-main-glass-card .hero-cta-group {
  gap: 0.75rem !important;
}

.hero-main-glass-card .hero-cta-group .btn {
  padding: 0.55rem 1.3rem !important;
  font-size: 0.82rem !important;
}
"""

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css + compact_card_css)

print("Appended compact hero card CSS.")

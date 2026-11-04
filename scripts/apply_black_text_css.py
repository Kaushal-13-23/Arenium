import re, sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update css/style.css
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace palette slate and heading in :root
css = re.sub(r'--palette-slate:\s*#[0-9a-fA-F]+;', '--palette-slate: #000000;', css)
css = re.sub(r'--palette-heading:\s*#[0-9a-fA-F]+;', '--palette-heading: #000000;', css)
css = re.sub(r'--text-primary:\s*#[0-9a-fA-F]+;', '--text-primary: #000000;', css)
css = re.sub(r'--text-secondary:\s*#[0-9a-fA-F]+;', '--text-secondary: #000000;', css)
css = re.sub(r'--text-muted:\s*#[0-9a-fA-F]+;', '--text-muted: #1E293B;', css)
css = re.sub(r'--text-highlight:\s*#[0-9a-fA-F]+;', '--text-highlight: #000000;', css)

# Append authoritative high-contrast black typography rules at the end of css/style.css
black_text_block = """

/* ========================================================================
   HIGH-CONTRAST SOLID BLACK TYPOGRAPHY & CLEAN LIGHT CARDS
   All user-facing body texts, subtitles, card descriptions, labels,
   tags, and leadership badges strictly set to solid black (#000000).
   ======================================================================== */

/* 1. Global Black Text Enforcement */
body,
p,
li,
label,
.about-text,
.about-text p,
.about-text strong,
.section-subtitle,
.footer-desc,
.team-name,
.team-role,
.team-card-desc,
.team-tier-desc,
.team-group-title,
.committee-member-name,
.committee-member-role,
.timeline-desc,
.timeline-title,
.timeline-time,
.timeline-venue,
.event-title,
.event-desc,
.event-meta,
.event-rule,
.meta-label,
.meta-val,
.winners-item-title,
.winners-item-team,
.winners-item-college,
.winners-podium-name,
.winners-podium-team,
.winners-podium-college,
.gallery-item-title,
.gallery-item-sub,
.sponsor-name,
.sponsor-tier,
.schedule-item-title,
.schedule-item-desc,
.schedule-item-venue,
.schedule-item-time,
.rulebook-section p,
.rulebook-section li,
.rulebook-section h3,
.rulebook-section h4,
.cyber-card,
.cyber-card p,
.cyber-card strong,
.about-card,
.about-card p,
.about-card strong,
.event-matrix-card,
.event-matrix-card p,
.event-card-header h3,
.scanner-card,
.scanner-card p,
.scanner-info p,
.stat-label,
.stat-number,
.host-institution-brand-card,
.host-institution-brand-card p,
.host-institution-brand-card strong,
.host-desc,
.contact-query-line,
.contact-address-box,
.contact-address-box p,
.contact-address-box strong,
.contact-address-box span,
.form-group label,
.fee-breakdown-box,
.fee-breakdown-box * {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  text-shadow: none !important;
}

/* 2. Headings & Titles in Bold Black */
h1, h2, h3, h4, h5, h6,
.section-title,
.page-title,
.brand-title,
.arena-card-title,
.team-name,
.about-title {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  text-shadow: none !important;
  font-weight: 800 !important;
}

/* 3. High-Contrast Section Tags & Badges */
.section-tag,
.poster-info-glass-card .section-tag {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 800 !important;
  background: #E2E8F0 !important;
  border: 1.5px solid #94A3B8 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px #FFFFFF !important;
  letter-spacing: 0.12em !important;
}

/* 4. Leadership & Coordinator Badges */
.team-card-tag {
  font-family: 'Roboto Slab', serif !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.12em !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  background: #E2E8F0 !important;
  border: 1.5px solid #94A3B8 !important;
  padding: 0.25rem 0.75rem !important;
  border-radius: 9999px !important;
  display: inline-block !important;
  text-transform: uppercase !important;
  margin-bottom: 0.5rem !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
}

.team-tier-badge {
  display: inline-block !important;
  font-family: 'Roboto Slab', serif !important;
  font-size: 0.78rem !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  background: #E2E8F0 !important;
  border: 1.5px solid #000000 !important;
  padding: 0.35rem 1rem !important;
  border-radius: 20px !important;
  text-transform: uppercase !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06) !important;
}

.team-group-title {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 900 !important;
}

.team-group-title::after {
  background: #CBD5E1 !important;
}

.team-tier-desc {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 700 !important;
}

/* 5. SOIS Fest Desk & Address Box (High-Contrast White Card) */
.contact-info-card h2 {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 900 !important;
}

.contact-query-line {
  font-family: 'Roboto Slab', serif !important;
  font-size: 1rem !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 700 !important;
  margin-bottom: var(--space-lg) !important;
  line-height: 1.7 !important;
}

.contact-address-box {
  margin-bottom: var(--space-xl) !important;
  padding: 1.4rem !important;
  background: #FFFFFF !important;
  border: 1.5px solid #CBD5E1 !important;
  border-left: 5px solid #000000 !important;
  border-radius: 14px !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06) !important;
}

.contact-address-box strong {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-size: 1.1rem !important;
  font-weight: 900 !important;
  display: block !important;
  margin-bottom: 0.5rem !important;
}

.contact-address-box p {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
  margin-bottom: 0.6rem !important;
}

/* 6. Desktop Site Header Navigation High-Contrast */
@media (min-width: 993px) {
  .site-header:not(.header-scrolled) .nav-link {
    color: #F8FAFC !important;
    -webkit-text-fill-color: #F8FAFC !important;
  }
  .site-header:not(.header-scrolled) .nav-link:hover,
  .site-header:not(.header-scrolled) .nav-link.active {
    color: #60A5FA !important;
    -webkit-text-fill-color: #60A5FA !important;
  }
  .site-header.header-scrolled .nav-link {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
    font-weight: 800 !important;
  }
  .site-header.header-scrolled .nav-link:hover,
  .site-header.header-scrolled .nav-link.active {
    color: #0284C7 !important;
    -webkit-text-fill-color: #0284C7 !important;
  }
}
"""

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css + black_text_block)

print("Updated css/style.css successfully.")

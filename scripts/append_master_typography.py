import sys

sys.stdout.reconfigure(encoding='utf-8')

css_addition = """

/* ========================================================================
   MASTER CRISP WHITE TYPOGRAPHY ENFORCEMENT ACROSS ALL CARDS & PORTALS
   Guarantee pure crisp white text, sky blue accents, and yellow badges.
   Strictly overrides any stray black text inside dark cards.
   ======================================================================== */

/* 1. Winner Cards & Victory Archive */
.winner-card,
.winner-card *,
.winner-card div,
.winner-card span,
.winner-card p,
.winner-card h3,
.winner-card h4,
.winner-event-title,
.winner-team-name,
.winner-tier-row {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.winner-college {
  color: #CBD5E1 !important;
  -webkit-text-fill-color: #CBD5E1 !important;
}

.winner-cash-badge {
  color: #FDE047 !important;
  -webkit-text-fill-color: #FDE047 !important;
}

.winner-card .event-category-badge {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

/* 2. Section Headers & Tags */
.section-header,
.section-header h2,
.section-header h3,
.section-header .section-title,
.section-header .section-subtitle,
.section-header p {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.section-tag,
.section-header .section-tag {
  background: rgba(2, 132, 199, 0.2) !important;
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  border: 1px solid rgba(56, 189, 248, 0.45) !important;
  font-weight: 800 !important;
}

/* 3. Register Page Cards & Form Labels */
.register-glass-card,
.register-glass-card h1,
.register-glass-card h2,
.register-glass-card h3,
.register-glass-card p,
.register-glass-card label,
.register-glass-card .form-label,
.register-title,
.register-subtitle,
.form-label,
.form-group label,
label {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.register-instructions-box,
.register-instructions-box span,
.register-instructions-box p {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.form-label span.req {
  color: #EF4444 !important;
  -webkit-text-fill-color: #EF4444 !important;
}

.form-field-group span {
  color: #94A3B8 !important;
  -webkit-text-fill-color: #94A3B8 !important;
}

/* 4. Contact Desk & Address Box */
.contact-info-card,
.contact-info-card h2,
.contact-query-line,
.contact-address-box p,
.contact-address-box span {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.contact-address-box strong {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

/* 5. Schedule & Timeline */
.timeline-card,
.timeline-card *,
.timeline-content,
.timeline-content *,
.timeline-title,
.timeline-desc,
.timeline-venue,
.timeline-time {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.timeline-time,
.timeline-venue {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

/* 6. Universal Dark Cyber Cards Protection */
.cyber-card,
.cyber-card h2,
.cyber-card h3,
.cyber-card h4,
.cyber-card p,
.cyber-card span,
.cyber-card strong {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}
"""

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css += css_addition

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("✓ Appended master crisp white typography rules to css/style.css")

import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Remove .register-glass-card from line 9713 block
old_card_list = """.title-sponsor-card,
.sponsor-card,
.fee-tier-card,
.fee-structure-announcement-card,
.register-glass-card {
  background: #0A0F1D !important;"""

new_card_list = """.title-sponsor-card,
.sponsor-card,
.fee-tier-card,
.fee-structure-announcement-card {
  background: #0A0F1D !important;"""

if old_card_list in css:
    css = css.replace(old_card_list, new_card_list, 1)
    print("✓ Removed .register-glass-card from dark cards list (line 9713)")
else:
    print("⚠ old_card_list not found by exact string, checking alternate...")
    css = css.replace(",\n.register-glass-card {\n  background: #0A0F1D !important;", " {\n  background: #0A0F1D !important;")

# 2. Remove .register-glass-card:hover from line 9759 block
old_hover_list = """.title-sponsor-card:hover,
.sponsor-card:hover,
.fee-tier-card:hover,
.fee-structure-announcement-card:hover,
.register-glass-card:hover {
  background: #0A0F1D !important;"""

new_hover_list = """.title-sponsor-card:hover,
.sponsor-card:hover,
.fee-tier-card:hover,
.fee-structure-announcement-card:hover {
  background: #0A0F1D !important;"""

if old_hover_list in css:
    css = css.replace(old_hover_list, new_hover_list, 1)
    print("✓ Removed .register-glass-card:hover from dark hover list (line 9759)")
else:
    print("⚠ old_hover_list not found by exact string, checking alternate...")
    css = css.replace(",\n.register-glass-card:hover {\n  background: #0A0F1D !important;", " {\n  background: #0A0F1D !important;")

# 3. Update section 3 in master typography block
old_master_reg = """/* 3. Register Page Cards & Form Labels */
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
}"""

new_master_reg = """/* 3. Register Page Clean White Card & High-Contrast Typography */
.register-glass-card {
  background: #FFFFFF !important;
  background-color: #FFFFFF !important;
  border: 1.5px solid #E2E8F0 !important;
  border-radius: 28px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04) !important;
  color: #0F172A !important;
}

.register-glass-card:hover {
  background: #FFFFFF !important;
  background-color: #FFFFFF !important;
  border-color: #CBD5E1 !important;
  transform: none !important;
  filter: none !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08) !important;
}

.register-glass-card .register-title,
.register-title {
  color: #0F172A !important;
  -webkit-text-fill-color: #0F172A !important;
  font-weight: 900 !important;
  letter-spacing: 0.04em !important;
  text-shadow: none !important;
}

.register-glass-card .register-subtitle,
.register-subtitle {
  color: #475569 !important;
  -webkit-text-fill-color: #475569 !important;
  font-weight: 600 !important;
}

.register-glass-card .section-tag {
  background: #F1F5F9 !important;
  border: 1.5px solid #CBD5E1 !important;
  color: #0369A1 !important;
  -webkit-text-fill-color: #0369A1 !important;
  font-weight: 800 !important;
}

.register-glass-card .form-label,
.register-glass-card label {
  color: #0F172A !important;
  -webkit-text-fill-color: #0F172A !important;
  font-weight: 800 !important;
  font-size: 0.86rem !important;
  letter-spacing: 0.03em !important;
}

.register-glass-card .form-label span.req {
  color: #DC2626 !important;
  -webkit-text-fill-color: #DC2626 !important;
}

.register-glass-card .form-field-group span:not(.req),
.register-glass-card #hint-team-name {
  color: #64748B !important;
  -webkit-text-fill-color: #64748B !important;
}

.register-glass-card .form-input,
.register-glass-card .form-select,
.register-glass-card .form-textarea {
  background: #FFFFFF !important;
  border: 1.5px solid #CBD5E1 !important;
  color: #0F172A !important;
  -webkit-text-fill-color: #0F172A !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
}

.register-glass-card .form-input:focus,
.register-glass-card .form-select:focus,
.register-glass-card .form-textarea:focus {
  border-color: #0284C7 !important;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15) !important;
  outline: none !important;
}

.register-glass-card .form-input::placeholder {
  color: #94A3B8 !important;
  -webkit-text-fill-color: #94A3B8 !important;
}

.register-glass-card .register-instructions-box {
  background: #F0F9FF !important;
  border: 1.5px solid #BAE6FD !important;
  border-left: 4px solid #0284C7 !important;
  color: #0C4A6E !important;
  -webkit-text-fill-color: #0C4A6E !important;
  border-radius: 12px !important;
}

.register-glass-card .register-instructions-box strong {
  color: #0284C7 !important;
  -webkit-text-fill-color: #0284C7 !important;
}

.register-glass-card .register-instructions-box span {
  color: #334155 !important;
  -webkit-text-fill-color: #334155 !important;
}"""

if old_master_reg in css:
    css = css.replace(old_master_reg, new_master_reg, 1)
    print("✓ Updated section 3 in master typography block")
else:
    print("⚠ old_master_reg not found by exact string, checking start...")
    idx = css.find('/* 3. Register Page Cards & Form Labels */')
    if idx != -1:
        end = css.find('/* 4. Contact Desk & Address Box */', idx)
        css = css[:idx] + new_master_reg + "\n\n" + css[end:]
        print("✓ Replaced master register section via slice")

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("✓ Saved updated css/style.css")

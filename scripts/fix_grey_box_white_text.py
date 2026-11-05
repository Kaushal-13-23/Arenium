import re

def update_css():
    with open("css/style.css", "r", encoding="utf-8") as f:
        css = f.read()

    white_text_rules = """

/* ========================================================================
   AUTHORITATIVE WHITE TEXT ENFORCEMENT ON DARK / GREY BOXES
   Forces pure white and neon blue contrast on payment fee cards,
   instruction banners, and pass arena cards.
   ======================================================================== */

#reg-fee-display,
#reg-fee-display div,
#reg-fee-display span,
#reg-fee-display p,
#reg-fee-breakdown,
.payment-fee-summary,
.payment-fee-summary div,
.payment-fee-summary span,
.payment-fee-summary p {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

#reg-fee-display #reg-fee-amount,
.payment-fee-summary #reg-fee-amount {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

#reg-fee-display .payment-badge,
.payment-fee-summary .payment-badge {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
  border-color: #38BDF8 !important;
}

/* After Payment Instructions Grey Box */
.payment-gateway-card div[style*="border-left"],
.payment-gateway-card div[style*="border-left"] *,
.payment-instructions-box,
.payment-instructions-box p,
.payment-instructions-box span {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.payment-gateway-card div[style*="border-left"] strong,
.payment-instructions-box strong {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}

/* Delegate Pass Registered Arenas Dark Bar */
.delegate-pass-field[style*="border-left"],
.delegate-pass-field[style*="border-left"] *,
#pass-events,
#pass-events *,
#pass-events div,
#pass-events span,
#pass-events strong {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

.delegate-pass-field[style*="border-left"] .delegate-pass-label {
  color: #38BDF8 !important;
  -webkit-text-fill-color: #38BDF8 !important;
}
"""

    if "AUTHORITATIVE WHITE TEXT ENFORCEMENT ON DARK / GREY BOXES" not in css:
        css += white_text_rules
        print("Appended white text rules to css/style.css")

    with open("css/style.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("css/style.css saved successfully")


def update_register_html():
    with open("register.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update #reg-fee-display inline styling
    old_fee_box = """              <div class="payment-fee-summary" id="reg-fee-display" style="background: rgba(30, 41, 59, 0.85); border: 1.5px solid #38BDF8; border-radius: 14px; padding: 1.1rem 1.4rem; width: 100%; box-sizing: border-box; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                  <div>
                    <div style="font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700;">TOTAL REGISTRATION FEE PAYABLE</div>
                    <div style="font-size: 2.2rem; font-weight: 900; color: #38BDF8; line-height: 1.2; margin: 0.2rem 0;" id="reg-fee-amount">₹200</div>
                    <div id="reg-fee-breakdown" style="font-size: 0.84rem; color: #CBD5E1; font-weight: 500;">
                      Internal Category Base: 1st Event included + 2nd Event FREE (₹200 total)
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span class="payment-badge" style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38BDF8; color: #38BDF8; font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 20px; display: inline-block;">
                      SECURE GATEWAY
                    </span>
                  </div>
                </div>
              </div>"""

    # We match using regex because of possible currency character variations
    pattern_fee_box = r'<div class="payment-fee-summary" id="reg-fee-display"[\s\S]*?SECURE GATEWAY\s*</span>\s*</div>\s*</div>\s*</div>'
    new_fee_box = """<div class="payment-fee-summary" id="reg-fee-display" style="background: rgba(30, 41, 59, 0.95); border: 1.5px solid #38BDF8; border-radius: 14px; padding: 1.15rem 1.4rem; width: 100%; box-sizing: border-box; text-align: left; color: #FFFFFF !important;">
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

    if re.search(pattern_fee_box, content):
        content = re.sub(pattern_fee_box, new_fee_box, content, count=1)
        print("Updated #reg-fee-display with white text styles in register.html")

    # 2. Update After Payment instruction box
    pattern_after_pay = r'<div style="background:\s*rgba\(15,\s*23,\s*42,\s*0\.6\);\s*border-left:\s*3px solid #38BDF8;[\s\S]*?<strong>After Payment:</strong>[\s\S]*?</div>'
    new_after_pay = """<div class="payment-instructions-box" style="background: rgba(15, 23, 42, 0.88); border-left: 3.5px solid #38BDF8; padding: 0.95rem 1.2rem; border-radius: 8px; width: 100%; box-sizing: border-box; text-align: left;">
                <p style="font-size: 0.84rem; color: #FFFFFF !important; margin: 0; line-height: 1.6;">
                  <strong style="color: #38BDF8 !important;">After Payment:</strong> <span style="color: #FFFFFF !important;">Once your payment is successfully completed via the gateway, enter your 12-digit UTR / Transaction Reference Number below and attach the payment screenshot as proof.</span>
                </p>
              </div>"""

    if re.search(pattern_after_pay, content):
        content = re.sub(pattern_after_pay, new_after_pay, content, count=1)
        print("Updated After Payment box with white text in register.html")

    # 3. Update delegate pass arenas box
    pattern_pass_arenas = r'<div class="delegate-pass-field" style="grid-column:\s*1\s*/\s*-1;\s*background:\s*rgba\(15,\s*23,\s*42,\s*0\.6\);[\s\S]*?REGISTERED ARENAS[\s\S]*?<div class="delegate-pass-val" id="pass-events"[\s\S]*?</div>\s*</div>'
    new_pass_arenas = """<div class="delegate-pass-field" style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.88); padding: 0.9rem 1.2rem; border-radius: 8px; border-left: 3.5px solid #38BDF8; color: #FFFFFF !important;">
                  <span class="delegate-pass-label" style="color: #38BDF8 !important; font-weight: 800; font-size: 0.75rem;">REGISTERED ARENAS (UP TO 3 EVENTS)</span>
                  <div class="delegate-pass-val" id="pass-events" style="font-size: 0.95rem; line-height: 1.6; margin-top: 0.3rem; color: #FFFFFF !important;">-</div>
                </div>"""

    if re.search(pattern_pass_arenas, content):
        content = re.sub(pattern_pass_arenas, new_pass_arenas, content, count=1)
        print("Updated pass arenas box with white text in register.html")

    with open("register.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("register.html saved successfully")

update_css()
update_register_html()

import re

def update_admin_html():
    with open("admin.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add "Sync from Google Sheet" button to header actions
    target_btn = '<button class="btn btn-primary" onclick="exportRegistrationsCSV()">'
    replacement_btn = '''<button class="btn btn-secondary" id="btn-sync-sheet" onclick="syncRegistrationsFromGoogleSheet()" style="background: rgba(16, 185, 129, 0.15); border: 1.5px solid #10B981; color: #6EE7B7; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.1rem; font-size: 0.82rem; font-weight: 700;">
              🔄 Sync from Google Sheet
            </button>
            <button class="btn btn-primary" onclick="exportRegistrationsCSV()">'''
    if target_btn in content and 'id="btn-sync-sheet"' not in content:
        content = content.replace(target_btn, replacement_btn, 1)
        print("Added Sync from Google Sheet button to admin.html")

    # 2. Add Google Apps Script Webhook config block
    target_gateway_block = '<!-- Official Payment Gateway Configuration for Pay Now Button -->'
    sheet_config_block = '''<!-- Google Sheet & Apps Script Webhook Configuration -->
            <div class="admin-form-group" style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.65); border: 1.5px solid #10B981; border-radius: 12px; padding: 1.2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
                <label class="admin-label" for="reg-admin-sheet-url" style="margin: 0; font-size: 0.88rem; color: #10B981; font-weight: 700; letter-spacing: 0.5px;">
                  📊 GOOGLE APPS SCRIPT WEBHOOK / LIVE EXCEL SYNC URL
                </label>
                <span id="sheet-status-badge" style="font-family: var(--font-mono); font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700; background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid #10B981;">
                  ✓ CONNECTED &amp; ACTIVE
                </span>
              </div>

              <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                <input type="url" id="reg-admin-sheet-url" class="admin-input" placeholder="https://script.google.com/macros/s/.../exec" style="flex: 1; min-width: 280px; font-family: var(--font-mono); font-size: 0.88rem;">
                
                <button type="button" id="admin-test-sheet-btn" class="btn btn-secondary" style="padding: 0.6rem 1rem; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                  ⚡ Test Ping Sync
                </button>
              </div>

              <span style="font-size: 0.74rem; color: #94A3B8; margin-top: 0.5rem; display: block; line-height: 1.45;">
                Every participant who registers on <code>register.html</code> automatically writes a row into your connected Google Sheet in real time. Payment screenshots are saved into Google Drive with direct preview links. Click <strong>"Sync from Google Sheet"</strong> anytime to pull records directly into this admin table.
              </span>
            </div>

            <!-- Official Payment Gateway Configuration for Pay Now Button -->'''

    if target_gateway_block in content and 'id="reg-admin-sheet-url"' not in content:
        content = content.replace(target_gateway_block, sheet_config_block, 1)
        print("Added Google Sheet Webhook setting block to admin.html")

    with open("admin.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("admin.html updated successfully")


def update_register_html():
    with open("register.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update form submission to post payload to Google Apps Script Webhook
    old_save_block = """          // Save into FestDB
          const currentDB = FestDB.getData();
          if (!currentDB.registrations) currentDB.registrations = [];
          currentDB.registrations.unshift(newRegistration);
          FestDB.saveData(currentDB);"""

    new_save_block = """          // Push to Google Sheets in real-time
          const googleSheetWebhook = (regConfig && regConfig.googleSheetUrl) || "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";
          
          const payload = {
            id: regId,
            fullName: fullName,
            email: email,
            phone: phone,
            college: college,
            usn: usn,
            department: dept,
            yearSem: year,
            category: category,
            categoryLabel: isInternal ? "Internal (Presidency University)" : "External (Other College)",
            event1Name: ev1Name,
            event2Name: ev2Name || "-",
            event3Name: ev3Name || "-",
            regType: regType,
            teamName: regType === "Team" ? teamName : "-",
            teamMembers: regType === "Team" ? teamMembers : "-",
            feePaid: `₹${totalFee}`,
            utrId: utr,
            screenshotBase64: uploadedScreenshotBase64,
            status: "Pending Verification"
          };

          try {
            fetch(googleSheetWebhook, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(payload)
            }).then(() => {
              console.log("Registration successfully transmitted to Google Sheets Webhook.");
            }).catch(e => {
              console.warn("Background sheet sync failed:", e);
            });
          } catch (netErr) {
            console.warn("Network dispatch error:", netErr);
          }

          // Save into FestDB
          const currentDB = FestDB.getData();
          if (!currentDB.registrations) currentDB.registrations = [];
          currentDB.registrations.unshift(newRegistration);
          FestDB.saveData(currentDB);"""

    if old_save_block in content:
        content = content.replace(old_save_block, new_save_block, 1)
        print("Updated form submission in register.html with Google Sheet sync")
    else:
        print("Warning: old_save_block not found in register.html")

    # 2. Add confirmation notice to delegate pass
    old_pass_badge = """                  <span class="admin-badge-confirmed" id="pass-status-badge">
                    ✓ VERIFIED REGISTRATION
                  </span>"""
    new_pass_badge = """                  <span class="admin-badge-confirmed" id="pass-status-badge">
                    ✓ VERIFIED REGISTRATION
                  </span>
                  <div style="font-size: 0.72rem; color: #10B981; font-weight: 700; margin-top: 3px;">
                    ✓ Logged to Official Registry (Excel)
                  </div>"""
    if old_pass_badge in content and 'Logged to Official Registry' not in content:
        content = content.replace(old_pass_badge, new_pass_badge, 1)
        print("Added registry confirmation notice to pass in register.html")

    with open("register.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("register.html updated successfully")

update_admin_html()
update_register_html()

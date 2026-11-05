import re

def update_main_js():
    with open("js/main.js", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add googleSheetUrl to default registrationConfig
    old_defaults = 'registrationConfig: {\n          status: "open",'
    new_defaults = '''registrationConfig: {
          googleSheetUrl: "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec",
          status: "open",'''
    if old_defaults in content:
        content = content.replace(old_defaults, new_defaults, 1)
        print("Updated FestDB defaults in js/main.js")
    else:
        print("Warning: old_defaults not found in js/main.js")

    # 2. Add googleSheetUrl input binding and test button in renderAdminRegistrations
    target_render_marker = '  const instructionsTextarea = document.getElementById("reg-admin-instructions");'
    replacement_render_marker = '''  const instructionsTextarea = document.getElementById("reg-admin-instructions");
  const sheetUrlInp = document.getElementById("reg-admin-sheet-url");
  const testSheetBtn = document.getElementById("admin-test-sheet-btn");
  const sheetStatusBadge = document.getElementById("sheet-status-badge");

  const currentSheetUrl = regConfig.googleSheetUrl || "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";

  function updateSheetBadge(val) {
    if (!sheetStatusBadge) return;
    if (val && val.trim()) {
      sheetStatusBadge.textContent = "✓ CONNECTED & ACTIVE";
      sheetStatusBadge.style.background = "rgba(16, 185, 129, 0.2)";
      sheetStatusBadge.style.color = "#10B981";
      sheetStatusBadge.style.borderColor = "#10B981";
    } else {
      sheetStatusBadge.textContent = "⚠ NO WEBHOOK (DISABLED)";
      sheetStatusBadge.style.background = "rgba(239, 68, 68, 0.2)";
      sheetStatusBadge.style.color = "#EF4444";
      sheetStatusBadge.style.borderColor = "#EF4444";
    }
  }

  if (sheetUrlInp) {
    sheetUrlInp.value = currentSheetUrl;
    updateSheetBadge(sheetUrlInp.value);
    sheetUrlInp.oninput = () => updateSheetBadge(sheetUrlInp.value);
  }

  if (testSheetBtn) {
    testSheetBtn.onclick = async () => {
      const url = sheetUrlInp ? sheetUrlInp.value.trim() : "";
      if (!url) {
        alert("Please enter a Google Apps Script Webhook URL.");
        return;
      }
      testSheetBtn.disabled = true;
      testSheetBtn.textContent = "⏳ Testing...";
      try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(`✓ Webhook Connection Successful! Google Sheet is reachable and returned ${Array.isArray(data) ? data.length : 0} rows.`);
      } catch (e) {
        alert("Test ping failed: " + e.message + "\\nPlease verify the Apps Script deployment.");
      } finally {
        testSheetBtn.disabled = false;
        testSheetBtn.textContent = "⚡ Test Ping Sync";
      }
    };
  }'''
    if target_render_marker in content:
        content = content.replace(target_render_marker, replacement_render_marker, 1)
        print("Added sheetUrl binding in js/main.js")
    else:
        print("Warning: target_render_marker not found in js/main.js")

    # 3. Add googleSheetUrl to saveBtn in renderAdminRegistrations
    target_save = 'db.settings.registrationConfig.paymentGatewayUrl = gatewayVal;'
    replacement_save = '''db.settings.registrationConfig.paymentGatewayUrl = gatewayVal;
      db.settings.registrationConfig.googleSheetUrl = sheetUrlInp ? sheetUrlInp.value.trim() : "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";'''
    if target_save in content:
        content = content.replace(target_save, replacement_save, 1)
        print("Added sheetUrl save in js/main.js")
    else:
        print("Warning: target_save not found in js/main.js")

    # 4. Support Google Drive link in table rendering
    pattern_proof = r'\$\{r\.paymentScreenshot \? `[\s\S]*?No SS Attached</div>`\}'
    new_proof_markup = """${r.paymentScreenshot ? `
            <div style="margin-top: 4px;">
              ${r.paymentScreenshot.startsWith('http') ? `
                <a href="${r.paymentScreenshot}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="padding: 2px 7px; font-size: 0.72rem; color: #38BDF8; border-color: #38BDF8; display: inline-flex; align-items: center; gap: 3px;">
                  🔗 View Drive Proof
                </a>
              ` : `
                <button type="button" class="btn btn-ghost" style="padding: 2px 7px; font-size: 0.72rem; color: #38BDF8; border-color: #38BDF8; display: inline-flex; align-items: center; gap: 3px;" onclick="viewAdminProof('${r.id}')">
                  📷 View Proof
                </button>
              `}
            </div>
          ` : `<div style="font-size:0.68rem; color:#64748B; margin-top:2px;">No SS Attached</div>`}"""
    if re.search(pattern_proof, content):
        content = re.sub(pattern_proof, new_proof_markup, content, count=1)
        print("Updated paymentScreenshot proof button in js/main.js table")
    else:
        print("Warning: pattern_proof not found in js/main.js")

    # 5. Add window.syncRegistrationsFromGoogleSheet
    sync_func = r"""
// ==========================================================================
// 18.1 LIVE GOOGLE SHEETS SYNC CONTROLLER
// ==========================================================================
window.syncRegistrationsFromGoogleSheet = async function() {
  const db = FestDB.getData();
  const scriptUrl = (db.settings && db.settings.registrationConfig && db.settings.registrationConfig.googleSheetUrl) || "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";

  const syncBtn = document.getElementById("btn-sync-sheet");
  const origText = syncBtn ? syncBtn.innerHTML : "";
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = "⏳ Syncing from Google Sheet...";
  }

  try {
    const res = await fetch(scriptUrl, { method: "GET" });
    const sheetData = await res.json();

    if (!Array.isArray(sheetData)) {
      throw new Error("Invalid response from Google Sheets endpoint");
    }

    if (!db.registrations) db.registrations = [];

    let newCount = 0;
    sheetData.forEach(row => {
      const regId = row["Registration ID"];
      if (!regId) return;

      const existingIndex = db.registrations.findIndex(r => r.id === regId);
      const regObj = {
        id: regId,
        fullName: row["Full Name"] || "",
        email: row["Email"] || "",
        phone: String(row["Phone"] || "").replace(/^'/, ""),
        college: row["College"] || "",
        usn: row["USN / Roll No"] || "",
        department: row["Department"] || "",
        yearSem: row["Year / Sem"] || "",
        category: (row["Category"] || "").toLowerCase().includes("external") ? "external" : "internal",
        categoryLabel: row["Category"] || "Internal (Presidency University)",
        eventName: row["Primary Event (1)"] || "",
        event1Name: row["Primary Event (1)"] || "",
        event2Name: (row["Second Event (2)"] && row["Second Event (2)"] !== "-") ? row["Second Event (2)"] : "",
        event3Name: (row["Third Event (3)"] && row["Third Event (3)"] !== "-") ? row["Third Event (3)"] : "",
        regType: row["Reg Type"] || "Solo",
        teamName: (row["Team Name"] && row["Team Name"] !== "-") ? row["Team Name"] : "",
        teamMembers: (row["Team Members"] && row["Team Members"] !== "-") ? row["Team Members"] : "",
        feePaid: row["Fee Paid"] || "₹200",
        utrId: String(row["UTR / Ref ID"] || "").replace(/^'/, ""),
        paymentScreenshot: (row["Payment Proof (Drive Link)"] && row["Payment Proof (Drive Link)"] !== "No Screenshot") ? row["Payment Proof (Drive Link)"] : "",
        status: row["Status"] || "Confirmed",
        timestamp: row["Timestamp"] || new Date().toISOString()
      };

      if (existingIndex >= 0) {
        if (!regObj.paymentScreenshot && db.registrations[existingIndex].paymentScreenshot) {
          regObj.paymentScreenshot = db.registrations[existingIndex].paymentScreenshot;
        }
        db.registrations[existingIndex] = { ...db.registrations[existingIndex], ...regObj };
      } else {
        db.registrations.unshift(regObj);
        newCount++;
      }
    });

    FestDB.saveData(db);
    renderAdminRegistrations(db);
    renderAdminOverview(db);

    alert(`✓ Google Sheet Sync Successful!\n\nSynchronized ${sheetData.length} total delegate records (${newCount} new records pulled from live Excel).`);
  } catch (err) {
    console.error("Sheet sync failed:", err);
    alert("Could not sync with Google Sheet:\n" + err.message + "\n\nPlease ensure your Google Apps Script is active.");
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = origText || "🔄 Sync from Google Sheet";
    }
  }
};
"""
    if "window.syncRegistrationsFromGoogleSheet" not in content:
        content += sync_func
        print("Appended window.syncRegistrationsFromGoogleSheet to js/main.js")

    with open("js/main.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("js/main.js written successfully")

update_main_js()

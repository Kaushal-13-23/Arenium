import re

def enhance_register():
    with open("register.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add active registration banner right after register-header
    banner_markup = """          <!-- Active Delegate Pass Quick-Access Alert Banner -->
          <div id="recent-reg-banner" style="display: none; background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 14px; padding: 1rem 1.4rem; margin-bottom: 1.8rem; box-shadow: 0 4px 15px rgba(16,185,129,0.12);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.4rem;">🎫</span>
                <div>
                  <div style="font-size: 0.72rem; color: #047857; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">ACTIVE REGISTRATION FOUND ON THIS BROWSER</div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: #065F46;">
                    <span id="recent-reg-banner-name">Delegate Name</span> &bull; <code id="recent-reg-banner-id" style="color: #047857; font-family: var(--font-mono); font-weight: 700;">ARENIUM27-REG-XXXX</code>
                  </div>
                </div>
              </div>
              <button type="button" id="btn-view-recent-pass" class="btn btn-primary" style="background: #059669; border-color: #047857; padding: 0.55rem 1.25rem; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
                🎫 VIEW YOUR DELEGATE PASS &amp; QR CODE &gt;
              </button>
            </div>
          </div>
"""

    if 'id="recent-reg-banner"' not in content:
        header_end = '</p>\n          </div>'
        if header_end in content:
            content = content.replace(header_end, '</p>\n          </div>\n\n' + banner_markup, 1)
            print("Added recent-reg-banner markup")
        else:
            print("Warning: header_end not found")

    # 2. Add renderDelegatePass function and update form submission and initial load
    # Let's inspect where FestDB.saveData(currentDB); is in register.html
    old_populate_block_start = "          // Populate Pass"
    old_populate_block_end = "passContainer.scrollIntoView({ behavior: \"smooth\" });\n        });"

    # We will replace from `// Populate Pass` up to `passContainer.scrollIntoView(...)` with `renderDelegatePass(newRegistration);`
    pattern_pass_pop = r'// Populate Pass[\s\S]*?passContainer\.scrollIntoView\(\{\s*behavior:\s*"smooth"\s*\}\);'

    replacement_call = "renderDelegatePass(newRegistration);"

    if re.search(pattern_pass_pop, content):
        content = re.sub(pattern_pass_pop, replacement_call, content, count=1)
        print("Replaced inline pass population with renderDelegatePass(newRegistration)")
    else:
        print("Warning: pattern_pass_pop not found")

    # 3. Add definition of renderDelegatePass and initial banner check
    render_delegate_pass_def = r"""
      // 5.1 Centralized Delegate Pass & Terminal QR Renderer
      function renderDelegatePass(reg) {
        if (!reg) return;

        document.getElementById("pass-id-display").textContent = reg.id || "ARENIUM27-REG";
        document.getElementById("pass-name").textContent = reg.fullName || "Delegate";
        const isInternal = (reg.category === "internal" || !reg.category);
        document.getElementById("pass-category").textContent = reg.categoryLabel || (isInternal ? "Internal (Presidency University)" : "External (Other Institution)");
        
        const ev1Name = reg.event1Name || reg.eventName || "";
        const ev2Name = reg.event2Name || "";
        const ev3Name = reg.event3Name || "";

        let arenasHtml = `<div><strong>1. Primary:</strong> ${ev1Name}</div>`;
        if (ev2Name && ev2Name !== "-") arenasHtml += `<div><strong>2. Second:</strong> ${ev2Name} <span style="color:#10B981; font-size:0.75rem;">(FREE)</span></div>`;
        if (ev3Name && ev3Name !== "-") arenasHtml += `<div><strong>3. Third:</strong> ${ev3Name} <span style="color:#F59E0B; font-size:0.75rem;">(+Fee)</span></div>`;
        document.getElementById("pass-events").innerHTML = arenasHtml;

        document.getElementById("pass-fee").textContent = `${reg.feePaid || '₹200'} (Verified)`;
        document.getElementById("pass-college").textContent = reg.college || "Presidency University";
        document.getElementById("pass-usn").textContent = reg.usn || "N/A";
        document.getElementById("pass-contact").textContent = `${reg.email || ''} • ${reg.phone || ''}`;
        const isTeam = reg.regType === "Team";
        document.getElementById("pass-type").textContent = isTeam ? `Team: ${reg.teamName || 'Squad'}` : "Solo";
        document.getElementById("pass-utr").textContent = reg.utrId || "N/A";

        if (reg.paymentScreenshot) {
          uploadedScreenshotBase64 = reg.paymentScreenshot;
        }

        const teamSec = document.getElementById("pass-team-section");
        if (isTeam && (reg.teamName || reg.teamMembers)) {
          teamSec.style.display = "block";
          const teamMembersList = reg.teamMembersList || [];
          let squadHtml = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.4rem; border-bottom:1px solid #E2E8F0; padding-bottom:0.4rem;">` +
            `<strong style="color: #0369A1; font-size:0.92rem;">👥 Squad: <span style="color:#0284C7;">${reg.teamName || 'Squad'}</span></strong>` +
            `<span style="font-size:0.75rem; color:#10B981; font-weight:700;">${teamMembersList.length ? (teamMembersList.length + 1) + ' Confirmed Members' : 'Confirmed Squad'}</span>` +
            `</div>`;
          squadHtml += `<div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.83rem; line-height:1.5;">`;
          squadHtml += `<div style="background:rgba(0,0,0,0.04); padding:0.45rem 0.75rem; border-radius:6px;">👑 <strong>Lead (Member 1):</strong> ${reg.fullName} <span style="color:#64748B;">(${reg.usn} • ${reg.phone})</span></div>`;
          if (teamMembersList.length) {
            teamMembersList.forEach(m => {
              squadHtml += `<div style="background:rgba(0,0,0,0.02); padding:0.45rem 0.75rem; border-radius:6px;">👤 <strong>Member ${m.memberIndex}:</strong> ${m.name} <span style="color:#64748B;">(${m.usn}${m.contact ? ' • ' + m.contact : ''})</span></div>`;
            });
          } else if (reg.teamMembers) {
            squadHtml += `<div style="background:rgba(0,0,0,0.02); padding:0.45rem 0.75rem; border-radius:6px;">${reg.teamMembers}</div>`;
          }
          squadHtml += `</div>`;
          document.getElementById("pass-team-members-val").innerHTML = squadHtml;
        } else {
          teamSec.style.display = "none";
        }

        // Generate Dynamic Team & Entry Gate QR Code
        const qrTarget = document.getElementById("pass-qrcode-target");
        if (qrTarget) {
          qrTarget.innerHTML = "";

          let memberCount = 1;
          if (isTeam) {
            if (reg.teamMembersList && reg.teamMembersList.length) {
              memberCount = reg.teamMembersList.length + 1;
            } else if (reg.teamMembers) {
              memberCount = Math.max(reg.teamMembers.split("|").length, 2);
            }
          }
          const participantsLabel = isTeam ? `${memberCount} Confirmed Members` : "1 Participant (Solo)";
          const teamDisplayName = isTeam ? (reg.teamName || "Squad") : reg.fullName;
          const categoryLabel = reg.categoryLabel || (isInternal ? "Internal (Presidency University)" : "External (Other Institution)");

          const qrTeamNameEl = document.getElementById("pass-qr-team-name");
          const qrTagEl = document.getElementById("pass-qr-tag");
          const qrCountEl = document.getElementById("pass-qr-participants-count");
          const qrCatEl = document.getElementById("pass-qr-category-val");
          const qrIdEl = document.getElementById("pass-qr-reg-id");

          if (qrTeamNameEl) qrTeamNameEl.textContent = isTeam ? `Squad: ${teamDisplayName}` : `Delegate: ${teamDisplayName}`;
          if (qrTagEl) qrTagEl.textContent = isTeam ? `TEAM ENTRY (${memberCount} P)` : "SOLO ENTRY";
          if (qrCountEl) qrCountEl.textContent = participantsLabel;
          if (qrCatEl) qrCatEl.textContent = categoryLabel;
          if (qrIdEl) qrIdEl.textContent = reg.id;

          const qrDataPayload = [
            "=== ARENIUM'27 OFFICIAL GATE PASS ===",
            `REG ID: ${reg.id}`,
            `TYPE: ${isTeam ? 'Team Entry' : 'Solo Entry'}`,
            `TEAM / DELEGATE: ${teamDisplayName}`,
            `PARTICIPANTS: ${participantsLabel}`,
            `CATEGORY: ${categoryLabel}`,
            `LEAD / USN: ${reg.fullName} (${reg.usn || 'N/A'})`,
            `PHONE: ${reg.phone || 'N/A'}`,
            `COLLEGE: ${reg.college || 'Presidency University'}`,
            `PRIMARY ARENA: ${ev1Name}`,
            (ev2Name && ev2Name !== "-") ? `SECOND ARENA: ${ev2Name}` : "",
            (ev3Name && ev3Name !== "-") ? `THIRD ARENA: ${ev3Name}` : "",
            `FEE PAID: ${reg.feePaid || '₹200'} (Verified)`,
            `UTR REF: ${reg.utrId || 'N/A'}`,
            `ENTRY STATUS: VERIFIED & CONFIRMED`,
            "Presidency University, Bengaluru • 4-5 Feb 2027"
          ].filter(Boolean).join("\n");

          let qrGenerated = false;
          if (typeof QRCode !== "undefined") {
            try {
              new QRCode(qrTarget, {
                text: qrDataPayload,
                width: 130,
                height: 130,
                colorDark: "#0F172A",
                colorLight: "#FFFFFF",
                correctLevel: QRCode.CorrectLevel.M
              });
              qrGenerated = true;
            } catch (qrErr) {
              console.warn("Client QRCode library error:", qrErr);
            }
          }

          if (!qrGenerated) {
            const encoded = encodeURIComponent(qrDataPayload);
            const img = document.createElement("img");
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&format=png&data=${encoded}`;
            img.alt = "ARENIUM 27 Terminal Gate QR Code";
            img.style.width = "130px";
            img.style.height = "130px";
            img.style.borderRadius = "8px";
            img.onerror = () => {
              img.src = `https://quickchart.io/qr?text=${encoded}&size=140`;
            };
            qrTarget.appendChild(img);
          }
        }

        // Swap form for Pass display
        if (form) form.style.display = "none";
        const passContainer = document.getElementById("delegate-pass-container");
        if (passContainer) {
          passContainer.style.display = "block";
          passContainer.scrollIntoView({ behavior: "smooth" });
        }
      }
"""

    if "function renderDelegatePass(reg)" not in content:
        # Insert before form submit listener
        insert_marker = "// 6. Handle Form Submission"
        if insert_marker in content:
            content = content.replace(insert_marker, render_delegate_pass_def + "\n      " + insert_marker, 1)
            print("Injected function renderDelegatePass(reg)")
        else:
            print("Warning: insert_marker not found")

    # 4. Check on page load for existing registrations to show banner
    page_load_check = """      // Check for active registration on this browser to show quick-access banner
      const existingDB = FestDB.getData();
      if (existingDB.registrations && existingDB.registrations.length > 0) {
        const latestReg = existingDB.registrations[0];
        const recentBanner = document.getElementById("recent-reg-banner");
        const bannerName = document.getElementById("recent-reg-banner-name");
        const bannerId = document.getElementById("recent-reg-banner-id");
        const bannerBtn = document.getElementById("btn-view-recent-pass");

        if (recentBanner && bannerName && bannerId && bannerBtn) {
          recentBanner.style.display = "block";
          bannerName.textContent = latestReg.fullName + (latestReg.teamName ? ` (Squad: ${latestReg.teamName})` : "");
          bannerId.textContent = latestReg.id;
          bannerBtn.onclick = () => renderDelegatePass(latestReg);
        }
      }
"""
    if "recent-reg-banner" in content and "Check for active registration on this browser" not in content:
        # Place before end of DOMContentLoaded
        target_end_marker = "const regAnotherBtn = document.getElementById(\"btn-register-another\");"
        if target_end_marker in content:
            content = content.replace(target_end_marker, page_load_check + "\n      " + target_end_marker, 1)
            print("Injected page-load check for recent-reg-banner")

    with open("register.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("register.html updated successfully")

enhance_register()

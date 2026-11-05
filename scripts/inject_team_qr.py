import re

def update_register():
    with open("register.html", "r", encoding="utf-8") as f:
        content = f.read()

    js_injection = """} else {
            teamSec.style.display = "none";
          }

          // Generate Dynamic Team & Entry Gate QR Code
          const qrTarget = document.getElementById("pass-qrcode-target");
          if (qrTarget) {
            qrTarget.innerHTML = ""; // Clear any previous QR

            const memberCount = regType === "Team" ? (teamMembersList.length + 1) : 1;
            const participantsLabel = regType === "Team" ? `${memberCount} Confirmed Members` : "1 Participant (Solo)";
            const teamDisplayName = regType === "Team" ? (teamName || "Squad") : fullName;
            const categoryLabel = isInternal ? "Internal (Presidency University)" : "External (Other Institution)";

            // Update QR Meta UI text
            const qrTeamNameEl = document.getElementById("pass-qr-team-name");
            const qrTagEl = document.getElementById("pass-qr-tag");
            const qrCountEl = document.getElementById("pass-qr-participants-count");
            const qrCatEl = document.getElementById("pass-qr-category-val");
            const qrIdEl = document.getElementById("pass-qr-reg-id");

            if (qrTeamNameEl) qrTeamNameEl.textContent = regType === "Team" ? `Squad: ${teamDisplayName}` : `Delegate: ${teamDisplayName}`;
            if (qrTagEl) qrTagEl.textContent = regType === "Team" ? `TEAM ENTRY (${memberCount} P)` : "SOLO ENTRY";
            if (qrCountEl) qrCountEl.textContent = participantsLabel;
            if (qrCatEl) qrCatEl.textContent = categoryLabel;
            if (qrIdEl) qrIdEl.textContent = regId;

            // Formatted QR Data holding Team Name, Participants Number, Internal/External Category, etc.
            const qrDataPayload = [
              "=== ARENIUM'27 OFFICIAL GATE PASS ===",
              `REG ID: ${regId}`,
              `TYPE: ${regType === 'Team' ? 'Team Entry' : 'Solo Entry'}`,
              `TEAM / DELEGATE: ${teamDisplayName}`,
              `PARTICIPANTS: ${participantsLabel}`,
              `CATEGORY: ${categoryLabel}`,
              `LEAD / USN: ${fullName} (${usn})`,
              `PHONE: ${phone}`,
              `COLLEGE: ${college}`,
              `PRIMARY ARENA: ${ev1Name}`,
              ev2Name ? `SECOND ARENA: ${ev2Name}` : "",
              ev3Name ? `THIRD ARENA: ${ev3Name}` : "",
              `FEE PAID: ₹${totalFee} (Verified)`,
              `UTR REF: ${utr}`,
              `ENTRY STATUS: VERIFIED & CONFIRMED`,
              "Presidency University, Bengaluru • 4-5 Feb 2027"
            ].filter(Boolean).join("\\n");

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

          // Swap form for Pass display"""

    if "// Generate Dynamic Team & Entry Gate QR Code" not in content:
        pattern = r'\}\s*else\s*\{\s*teamSec\.style\.display\s*=\s*"none";\s*\}\s*// Swap form for Pass display'
        match = re.search(pattern, content)
        if match:
            content = content[:match.start()] + js_injection + content[match.end():]
            print("Successfully injected QR code generation script!")
        else:
            print("Warning: regex pattern for js_marker did not match")
    else:
        print("QR JS already present")

    with open("register.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("register.html successfully saved")

update_register()

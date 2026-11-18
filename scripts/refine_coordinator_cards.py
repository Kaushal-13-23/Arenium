import re, glob, os

css_addition = """
/* ========================================================================
   STUDENT COORDINATOR CARDS (CLEAN MINIMALIST REFINEMENT)
   - Role: Bold, centered in the middle, out of any circle / pill outline
   - Contact Phone: On the side (left-aligned) with icon, out of circle
   - Mail: On the side (left-aligned) with icon, opens in Gmail, out of circle
   ======================================================================== */
body:not(#admin-app) [data-student-coords-grid] .coord-card-role,
.coord-card-role {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 0.8rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: #0F172A !important;
  -webkit-text-fill-color: #0F172A !important;
  text-align: center !important;
  width: 100% !important;
  display: block !important;
  margin: 0.15rem auto 0.45rem auto !important;
  border: none !important;
  background: transparent !important;
  background-color: transparent !important;
  padding: 0 !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

body:not(#admin-app) [data-student-coords-grid] .team-name {
  text-align: center !important;
  margin: 0 0 1rem 0 !important;
}

body:not(#admin-app) [data-student-coords-grid] .coord-contacts-block,
.coord-contacts-block {
  margin-top: auto !important;
  padding-top: 0.85rem !important;
  border-top: 1.5px solid rgba(15, 23, 42, 0.08) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0.45rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

body:not(#admin-app) [data-student-coords-grid] .coord-contact-link,
.coord-contact-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.55rem !important;
  color: #1E293B !important;
  -webkit-text-fill-color: #1E293B !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  border: none !important;
  background: transparent !important;
  background-color: transparent !important;
  padding: 0.2rem 0 !important;
  width: 100% !important;
  justify-content: flex-start !important;
  text-align: left !important;
  word-break: break-all !important;
  transition: color 0.15s ease !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

body:not(#admin-app) [data-student-coords-grid] .coord-contact-link:hover,
.coord-contact-link:hover {
  color: #0284C7 !important;
  -webkit-text-fill-color: #0284C7 !important;
  text-decoration: underline !important;
}

body:not(#admin-app) [data-student-coords-grid] .coord-contact-icon,
.coord-contact-icon {
  flex-shrink: 0 !important;
  color: #475569 !important;
  transition: color 0.15s ease !important;
}

body:not(#admin-app) [data-student-coords-grid] .coord-contact-link:hover .coord-contact-icon,
.coord-contact-link:hover .coord-contact-icon {
  color: #0284C7 !important;
}
"""

# 1. Update css/style.css
with open("css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

if "coord-card-role" not in css:
    css += "\n" + css_addition
    with open("css/style.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("Appended coordinator cards CSS to css/style.css")
else:
    print("coord-card-role already in css/style.css")

# 2. Update js/main.js
with open("js/main.js", "r", encoding="utf-8") as f:
    js = f.read()

old_js_block = """    // 1. Student Coordinators Grid (Homepage & Contact page) - Classy & Professional: Name + Contact Number Only
    const studentGrids = document.querySelectorAll("[data-student-coords-grid]");
    studentGrids.forEach(grid => {
      grid.innerHTML = "";
      (db.coordinators || []).filter(c => c.id !== "coord-lead").forEach(c => {
        const card = document.createElement("div");
        card.className = "editorial-card team-card reveal-on-scroll is-visible";
        card.innerHTML = `
          <div class="team-photo-wrap">
            <img src="${c.photo || 'images/coord-generic.svg'}" alt="${c.name}" class="team-avatar-img" loading="lazy">
          </div>
          <div class="team-card-content">
            <span class="team-card-tag">${c.role.toUpperCase()}</span>
            <h3 class="team-name" style="margin: 0.3rem 0 1rem;">${c.name}</h3>
            <div class="team-action-footer" style="margin-top: auto; padding-top: 0.5rem; display: flex; flex-direction: column; gap: 0.45rem;">
              <a href="tel:${c.phone.replace(/[^0-9+]/g, '')}" class="btn-pill-outline" aria-label="Call ${c.name}" style="width: 100%; text-align: center; justify-content: center; font-size: 0.82rem; font-weight: 700;">
                ${c.phone}
              </a>
              ${c.email ? `
              <a href="mailto:${c.email}" class="btn-pill-outline" aria-label="Email ${c.name}" style="width: 100%; text-align: center; justify-content: center; font-size: 0.76rem; font-weight: 700; text-transform: none; word-break: break-all; padding: 0.38rem 0.5rem;">
                ${c.email}
              </a>` : ''}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    });"""

new_js_block = """    // 1. Student Coordinators Grid (Homepage & Contact page) - Refined: Role bold & in middle; contact & mail on the side; mail opens in Gmail
    const studentGrids = document.querySelectorAll("[data-student-coords-grid]");
    studentGrids.forEach(grid => {
      grid.innerHTML = "";
      (db.coordinators || []).filter(c => c.id !== "coord-lead").forEach(c => {
        const card = document.createElement("div");
        card.className = "editorial-card team-card reveal-on-scroll is-visible";
        const email = c.email || 'Arenium.official@gmail.com';
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
        card.innerHTML = `
          <div class="team-photo-wrap">
            <img src="${c.photo || 'images/coord-generic.svg'}" alt="${c.name}" class="team-avatar-img" loading="lazy"${c.name === 'Abhyas Kathuria' ? ' style="object-position: center top;"' : ''}>
          </div>
          <div class="team-card-content">
            <div class="coord-card-role">${c.role.toUpperCase()}</div>
            <h3 class="team-name" style="text-align: center; margin: 0 0 1rem;">${c.name}</h3>
            <div class="coord-contacts-block">
              <a href="tel:${(c.phone || '').replace(/[^0-9+]/g, '')}" class="coord-contact-link" aria-label="Call ${c.name}">
                <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>${c.phone}</span>
              </a>
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="coord-contact-link coord-gmail-link" aria-label="Email ${c.name} via Gmail">
                <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>${email}</span>
              </a>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    });"""

if old_js_block in js:
    js = js.replace(old_js_block, new_js_block)
    with open("js/main.js", "w", encoding="utf-8") as f:
        f.write(js)
    print("Updated js/main.js")
else:
    print("WARNING: old_js_block not found in js/main.js directly. Check regex.")

# 3. Define the new HTML card markup
new_student_cards_html = """          <!-- Student Coordinators Grid (Name + Designation only, initials circle / real photo) -->
          <div class="team-grid" data-student-coords-grid>
            <!-- 1. Kaushal -->
            <div class="editorial-card team-card">
              <div class="team-photo-wrap">
                <img src="images/Kaushal.jpeg" alt="Kaushal Kumar Singh" class="team-avatar-img" loading="lazy">
              </div>
              <div class="team-card-content">
                <div class="coord-card-role">FINANCE &amp; REGISTRATION MANAGER</div>
                <h3 class="team-name" style="text-align: center; margin: 0 0 1rem;">Kaushal Kumar Singh</h3>
                <div class="coord-contacts-block">
                  <a href="tel:+918797786686" class="coord-contact-link" aria-label="Call Kaushal Kumar Singh">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 87977 86686</span>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Arenium.official@gmail.com" target="_blank" rel="noopener noreferrer" class="coord-contact-link coord-gmail-link" aria-label="Email Kaushal Kumar Singh via Gmail">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Arenium.official@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- 2. Vimal -->
            <div class="editorial-card team-card">
              <div class="team-photo-wrap">
                <img src="images/Vimal.png" alt="Vimal Raj" class="team-avatar-img" loading="lazy">
              </div>
              <div class="team-card-content">
                <div class="coord-card-role">EVENT MANAGER</div>
                <h3 class="team-name" style="text-align: center; margin: 0 0 1rem;">Vimal Raj</h3>
                <div class="coord-contacts-block">
                  <a href="tel:+919620192249" class="coord-contact-link" aria-label="Call Vimal Raj">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 96201 92249</span>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Arenium.official@gmail.com" target="_blank" rel="noopener noreferrer" class="coord-contact-link coord-gmail-link" aria-label="Email Vimal Raj via Gmail">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Arenium.official@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- 3. Ashlin -->
            <div class="editorial-card team-card">
              <div class="team-photo-wrap">
                <img src="images/Ashlin Siddharth.png" alt="Ashlin Siddharth" class="team-avatar-img" loading="lazy">
              </div>
              <div class="team-card-content">
                <div class="coord-card-role">MARKETING &amp; REGISTRATION MANAGER</div>
                <h3 class="team-name" style="text-align: center; margin: 0 0 1rem;">Ashlin Siddharth</h3>
                <div class="coord-contacts-block">
                  <a href="tel:+919108740761" class="coord-contact-link" aria-label="Call Ashlin Siddharth">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 91087 40761</span>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Arenium.official@gmail.com" target="_blank" rel="noopener noreferrer" class="coord-contact-link coord-gmail-link" aria-label="Email Ashlin Siddharth via Gmail">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Arenium.official@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- 4. Abhyas -->
            <div class="editorial-card team-card">
              <div class="team-photo-wrap">
                <img src="images/ABHYAS.png" alt="Abhyas Kathuria" class="team-avatar-img" loading="lazy" style="object-position: center top;">
              </div>
              <div class="team-card-content">
                <div class="coord-card-role">TECHNICAL MANAGER</div>
                <h3 class="team-name" style="text-align: center; margin: 0 0 1rem;">Abhyas Kathuria</h3>
                <div class="coord-contacts-block">
                  <a href="tel:+918595848421" class="coord-contact-link" aria-label="Call Abhyas Kathuria">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 85958 48421</span>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Arenium.official@gmail.com" target="_blank" rel="noopener noreferrer" class="coord-contact-link coord-gmail-link" aria-label="Email Abhyas Kathuria via Gmail">
                    <svg class="coord-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Arenium.official@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>"""

# 4. Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

idx_pattern = re.compile(
    r'(<!-- Student Coordinators Grid[^\n]*-->\s*<div class="team-grid" data-student-coords-grid>).*?(</div>\s*</div>\s*</div>\s*</section>)',
    re.DOTALL
)

m = idx_pattern.search(idx)
if m:
    idx = idx[:m.start()] + new_student_cards_html + "\n        </div>\n      </div>\n    </section>" + idx[m.end():]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx)
    print("Updated index.html coordinator cards")
else:
    print("WARNING: index.html pattern did not match")

# 5. Update contact.html
with open("contact.html", "r", encoding="utf-8") as f:
    cnt = f.read()

cnt_pattern = re.compile(
    r'(<!-- Student Coordinators Grid -->\s*<div class="team-grid student-coords-grid" data-student-coords-grid>).*?(</div>\s*</div>\s*</div>\s*</section>)',
    re.DOTALL
)

new_student_cards_html_cnt = new_student_cards_html.replace(
    '<!-- Student Coordinators Grid (Name + Designation only, initials circle / real photo) -->\n          <div class="team-grid" data-student-coords-grid>',
    '<!-- Student Coordinators Grid -->\n          <div class="team-grid student-coords-grid" data-student-coords-grid>'
)

m_cnt = cnt_pattern.search(cnt)
if m_cnt:
    cnt = cnt[:m_cnt.start()] + new_student_cards_html_cnt + "\n        </div>\n      </div>\n    </section>" + cnt[m_cnt.end():]
    with open("contact.html", "w", encoding="utf-8") as f:
        f.write(cnt)
    print("Updated contact.html coordinator cards")
else:
    print("WARNING: contact.html pattern did not match")

# 6. Bump cache busters to V44 across all HTML files
VERSION = "2027_COORDS_CARD_REFINEMENT_V44"
for f_path in sorted(glob.glob("*.html")):
    with open(f_path, "r", encoding="utf-8") as fp:
        c = fp.read()
    c = re.sub(r'style\.css\?v=[A-Za-z0-9_\-\.]+', f'style.css?v={VERSION}', c)
    c = re.sub(r'main\.js\?v=[A-Za-z0-9_\-\.]+', f'main.js?v={VERSION}', c)
    with open(f_path, "w", encoding="utf-8") as fp:
        fp.write(c)

print(f"Bumped cache buster to {VERSION} across all HTML files")

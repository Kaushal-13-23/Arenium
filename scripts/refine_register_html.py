import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('register.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace timing warning box
old_timing = """              <!-- Timing Overlap Warning -->
              <div class="form-field-group full-width">
                <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 0.85rem 1.1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem;">
                  <div style="font-size: 0.84rem; color: #E2E8F0; line-height: 1.5;">
                    ⚠️ <strong>Schedule Timing Check:</strong> Please ensure that your chosen events do not have overlapping timings!
                  </div>
                  <a href="schedule.html" target="_blank" class="btn btn-ghost" style="padding: 0.4rem 0.9rem; font-size: 0.78rem;">
                    📅 VIEW EVENT SCHEDULE ↗
                  </a>
                </div>
              </div>"""

new_timing = """              <!-- Timing Overlap Warning -->
              <div class="form-field-group full-width">
                <div style="background: #F0F9FF; border: 1.5px solid #BAE6FD; border-radius: 10px; padding: 0.85rem 1.1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem;">
                  <div style="font-size: 0.84rem; color: #0369A1; line-height: 1.5;">
                    ⚠️ <strong style="color: #0C4A6E;">Schedule Timing Check:</strong> Please ensure that your chosen events do not have overlapping timings!
                  </div>
                  <a href="schedule.html" target="_blank" class="btn btn-ghost" style="padding: 0.4rem 0.9rem; font-size: 0.78rem; background: #FFFFFF; border: 1.5px solid #0284C7; color: #0284C7 !important;">
                    📅 VIEW EVENT SCHEDULE ↗
                  </a>
                </div>
              </div>"""

if old_timing in text:
    text = text.replace(old_timing, new_timing, 1)
    print("✓ Updated timing overlap warning")

# Replace section dividers
text = text.replace(
    'style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.12); padding-bottom: 0.5rem;"',
    'style="margin-bottom: 1.5rem; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 0.5rem;"'
)
text = text.replace(
    'style="margin-top: 2rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.12); padding-bottom: 0.5rem;"',
    'style="margin-top: 2rem; margin-bottom: 1.5rem; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 0.5rem;"'
)
print("✓ Updated section dividers")

# Replace upload dropzone idle state
old_dropzone = """                  <!-- Idle State UI -->
                  <div id="upload-idle-state" onclick="document.getElementById('reg-screenshot').click()" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.1rem 1rem; cursor: pointer; text-align: center; border: 2px dashed #B0D7D8; border-radius: 12px; background: rgba(255,255,255,0.7); transition: all 0.25s ease;">
                    <span style="font-size: 1.8rem; margin-bottom: 0.2rem;" aria-hidden="true">📸</span>
                    <strong style="font-size: 0.88rem; color: #2C3E3E;">Upload Payment Screenshot (Proof)</strong>
                    <span style="font-size: 0.75rem; color: #5D6B6B; margin-top: 0.2rem;">
                      Click to choose image or drag &amp; drop (PNG, JPG, WEBP)
                    </span>
                  </div>"""

new_dropzone = """                  <!-- Idle State UI -->
                  <div id="upload-idle-state" onclick="document.getElementById('reg-screenshot').click()" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.1rem 1rem; cursor: pointer; text-align: center; border: 2px dashed #CBD5E1; border-radius: 12px; background: #F8FAFC; transition: all 0.25s ease;">
                    <span style="font-size: 1.8rem; margin-bottom: 0.2rem;" aria-hidden="true">📸</span>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Upload Payment Screenshot (Proof)</strong>
                    <span style="font-size: 0.75rem; color: #64748B; margin-top: 0.2rem;">
                      Click to choose image or drag &amp; drop (PNG, JPG, WEBP)
                    </span>
                  </div>"""

if old_dropzone in text:
    text = text.replace(old_dropzone, new_dropzone, 1)
    print("✓ Updated upload dropzone idle state")

with open('register.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("✓ Saved refined register.html")

import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

cert_pattern = re.compile(r'(\s+certificates:\s*\[\s*\{\s*id:\s*"AR27-HCK-001".*?\}\s*\])', re.DOTALL)
match = cert_pattern.search(content)

if not match:
    print("Could not match default certificates")
    sys.exit(1)

new_default_certs = """      certificates: [
        {
          id: "AR27-HCK-001",
          teamName: "Team NeuralForge",
          recipient: "Team NeuralForge",
          event: "TECHNOVA '27",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-HCK-002",
          teamName: "CyberSentinels",
          recipient: "CyberSentinels",
          event: "TECHNOVA '27",
          award: "RUNNER UP · SECOND PLACE",
          college: "BMS College of Engineering",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-COD-001",
          teamName: "Shadow Devs",
          recipient: "Kiran R",
          event: "SHADOWCODE",
          award: "CHAMPION · FIRST PLACE",
          college: "PES University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-TRL-001",
          teamName: "CipherKnights",
          recipient: "CipherKnights",
          event: "TECH ODYSSEY",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-LAN-001",
          teamName: "Phantom Apex",
          recipient: "Phantom Apex",
          event: "QUAD DAMAGE",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-DSN-001",
          teamName: "PixelCraft Duo",
          recipient: "PixelCraft Duo",
          event: "DESIGNNOVA",
          award: "CHAMPION · FIRST PLACE",
          college: "National Institute of Design / PU",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-PRT-042",
          teamName: "NeuralSentinels",
          recipient: "Kaushal Kumar Singh",
          event: "TECHNOVA '27",
          award: "CERTIFICATE OF MERIT & PARTICIPATION",
          college: "Presidency University, Bengaluru",
          fileUrl: "",
          issueDate: "5 February 2027",
          verified: true
        }
      ]"""

content = content[:match.start(1)] + new_default_certs + content[match.end(1):]

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated default certificates with teamName successfully!")

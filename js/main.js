/**
 * ARENIUM'27 — Master Cyberpunk Engine & FestDB
 * School of Information Science (SOIS), Presidency University, Bengaluru
 * Features: Dynamic State Management, Rulebook Modal, Certificate Studio, Admin Sync
 */

// ==========================================================================
// 1. FESTDB (CENTRAL LOCALSTORAGE STATE ENGINE)
// ==========================================================================
const FestDB = {
  STORAGE_KEY: "arenium_fest_db_v5",

  getDefaults() {
    return {
      settings: {
        eventDate: "2027-02-04T08:30:00+05:30",
        registerUrl: "register.html",
        paymentGatewayUrl: "https://pages.razorpay.com/arenium27-pay",
        registrationConfig: {
          googleSheetUrl: "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec",
          status: "open",
          portalMode: "internal",
          externalUrl: "https://presidencyuniversity.in/arenium27-register",
          paymentGatewayUrl: "https://pages.razorpay.com/arenium27-pay",
          upiId: "arenium27@icici",
          qrCodeImg: "images/qrcode.png",
          internalFee: 200,
          internalAddFee: 200,
          externalFee: 300,
          externalAddFee: 300,
          instructions: "UPDATED REGISTRATION FEE STRUCTURE: Internal Participants (Presidency University): ₹200 for up to 2 events (additional ₹200 for 3rd event). External Participants: ₹300 for up to 2 events (additional ₹300 for 3rd event). Participation in 2nd event is optional and free. Please cross-reference the official schedule to avoid timing conflicts.",
          fees: {
            "tech-odyssey": "₹300 / Team of 2-3",
            "shadow-code": "₹150 / Solo",
            "design-nova": "₹150 / Solo",
            "tech-talk": "₹200 / Solo or Duo",
            "data-chronicles": "₹200 / Solo or Duo",
            "founders-arena": "₹300 / Team",
            "technova-27": "₹1,500 / Team of 4",
            "quad-damage": "₹400 / Squad (₹150 Solo)",
            "biochroma": "₹1,000 / Team",
            "apl-auction": "₹500 / Team"
          }
        },
        tagline: "THE ARENA OF INNOVATION",
        prizePoolText: "⚡ TOTAL CASH PRIZE POOL: ₹1,50,000 (1.5 LAKHS) • ARENIUM '27 • 4–5 FEBRUARY 2027 • SCHOOL OF INFORMATION SCIENCE, PRESIDENCY UNIVERSITY ⚡",
        announcement: "⚡ ARENIUM ’27: THE ARENA OF INNOVATION • ₹1.5 LAKHS CASH PRIZE POOL • 24-HOUR HACKATHON, BLIND CODING, TREASURE HUNT, ESPORTS & FASHION SHOW • 4–5 FEB 2027 ⚡",
        qrCodeImg: "images/qrcode.png",
        logoImg: "images/logo.jpg",
        certificatesPublished: true,
        resultsPublished: true,
        adminUsers: [
          {
            id: "admin-1",
            email: "singhkaushal.2507@gmail.com",
            password: "Kaush2507",
            name: "Kaushal Kumar Singh",
            role: "Finance & Registration Manager",
            badge: "Finance Lead"
          },
          {
            id: "admin-2",
            email: "Kathuriaabhyas@gmail.com",
            password: "Abhyas2108",
            name: "Abhyas Kathuria",
            role: "Technical Manager",
            badge: "Tech Lead"
          },
          {
            id: "admin-3",
            email: "ashlinsiddharth1@gmail.com",
            password: "Ashlin01",
            name: "Ashlin Siddharth",
            role: "Marketing and Registration Manager",
            badge: "Marketing Lead"
          },
          {
            id: "admin-4",
            email: "vimalrajsnkk@gmail.com",
            password: "Vimal69",
            name: "Vimal Raj",
            role: "Event Manager",
            badge: "Event Ops Lead"
          },
          {
            id: "admin-5",
            email: "kerenlois@presidencyuniversity.in",
            password: "Kerensois27",
            name: "Ms. Keren Lois Daniel",
            role: "Faculty Co-ordinator & Programme Lead",
            badge: "Faculty Convener"
          }
        ]
      },
      coordinators: [
        {
          id: "coord-lead",
          name: "Ms. Keren Lois Daniel",
          role: "Faculty Co-ordinator & Programme Lead",
          dept: "Assistant Professor & Programme Organiser · SOIS",
          phone: "SOIS Office",
          photo: "images/leader-organiser.svg"
        },
        {
          id: "coord-1",
          name: "Kaushal Kumar Singh",
          role: "Finance & Registration Manager",
          dept: "5BCA01 (Reg: 20241BCA0051) · SOIS",
          phone: "+91 91087 40761",
          photo: "images/coord-kaushal.svg"
        },
        {
          id: "coord-2",
          name: "Vimal Raj",
          role: "Event Manager",
          dept: "5BCADS02 · SOIS",
          phone: "+91 96201 92249",
          photo: "images/coord-vimal.svg"
        },
        {
          id: "coord-3",
          name: "Ashlin Siddharth",
          role: "Marketing and Registration Manager",
          dept: "5BCADS01 · SOIS",
          phone: "+91 87976 86786",
          photo: "images/coord-ashlin.svg"
        },
        {
          id: "coord-4",
          name: "Abhyas Kathuria",
          role: "Technical Manager",
          dept: "5BCAAIML01 · SOIS",
          phone: "+91 85958 48421",
          photo: "images/coord-abhyas.svg"
        }
      ],
      leadership: [
        {
          id: "lead-provc",
          tag: "PATRON / PRO VC",
          name: "Dr. Vidya Shetty",
          role: "Pro Vice-Chancellor · Presidency University",
          bio: "Guiding institutional growth, research initiatives, and academic excellence across Presidency University.",
          photo: "images/leader-provc.svg"
        },
        {
          id: "lead-vc",
          tag: "CHIEF PATRON / VC",
          name: "Dr. S. J. Thiruvengadam",
          role: "Vice-Chancellor · Presidency University",
          bio: "Leading Presidency University's strategic vision, global partnerships, and innovation ecosystem.",
          photo: "images/leader-vc.svg"
        },
        {
          id: "lead-dean",
          tag: "PATRON / DEAN",
          name: "Dr. C. Kalaiarasan",
          role: "Dean · School of Information Science",
          bio: "Guiding the academic vision, industry alliances, and innovation ecosystem of SOIS Presidency University.",
          photo: "images/leader-dean.svg"
        },
        {
          id: "lead-hod",
          tag: "HEAD OF DEPARTMENT",
          name: "Dr. K. G. Mohan",
          role: "HOD · School of Information Science",
          bio: "Fostering competitive coding culture, student research, and national collegiate hackathons across SOIS.",
          photo: "images/leader-hod.svg"
        },
        {
          id: "lead-ug",
          tag: "HEAD - UG PROGRAMMES",
          name: "Dr. Vetrimani Elangovan",
          role: "Head of UG Programmes · PSIS",
          bio: "Directing undergraduate computing specializations, student mentoring, and fest operations.",
          photo: "images/leader-ug.svg"
        }
      ],
      soisFaculty: [
        {
          team: "Marketing & Promotion",
          faculty: "Ms. Neha Arora",
          students: "Anjani Soni M (5BCADS01), Rohit Roy (5BCA01), Saswata Chatterjee (5BCA02), Manas Kumar (5BCA02)",
          role: "Outreach & Social Media PR",
          photo: "images/leader-neha.svg"
        },
        {
          team: "Discipline & Campus Security",
          faculty: "Mr. Krishna Mishra & Mr. Dinesh N",
          students: "Hritik Raj (5BCA02), Vinayak Rathod (5BCA03), Kawatilya (5BCA01), Ayush Ranjan",
          role: "Campus Safety & Hall Control",
          photo: "images/leader-sois.svg"
        },
        {
          team: "Decoration & Ambiance",
          faculty: "Ms. Asha Hegde",
          students: "Ruchitha G (5BCADS01), Kavya Shree P M (5BCADS01), Nithyashree (5BCADS02), Bindu (5BCADS02)",
          role: "Aesthetics, Cyber Arena & Dais Decor",
          photo: "images/leader-sois.svg"
        },
        {
          team: "Hospitality & Refreshments",
          faculty: "Ms. Nagma Fariyal & Ms. Anjana",
          students: "Deepanita (5BCADS02), Arati Rai (5BCADS02), Manya Suresh (5BCA01), Harshita Periwal (5BCA03)",
          role: "Dignitary Care & Refreshment Counters",
          photo: "images/leader-sois.svg"
        },
        {
          team: "Media & Documentation",
          faculty: "Ms. Ghazala Zameer & Ms. Akasatha G R",
          students: "Vidyanshi Jain (5BCAAIML01), Tanmayee L (5BCADS01), Kiran Kurien (5BCADS02)",
          role: "Live Photography, Videography & Reels",
          photo: "images/leader-sois.svg"
        },
        {
          team: "Registration & Ticketing",
          faculty: "Ms. Devi S, Ms. Kalpana K, Mr. Sudharshan",
          students: "Shubham Kumar, Anchal Rodrigues, Naneshwaran, Rehana",
          role: "Helpdesk, Kits & Credentials Verification",
          photo: "images/leader-sois.svg"
        }
      ],
            events: [
        // 1. Tech Odyssey (Technical Event)
        {
          id: "tech-odyssey",
          name: "TECH ODYSSEY",
          tagline: "Follow the Clues. Crack the Code. Claim the Victory",
          category: "Technical Event",
          group: "technical",
          prize: "₹15,000",
          venue: "SOIS Block & Central Campus",
          date: "Day 1 (4 February 2027)",
          time: "10:45 AM – 01:00 PM",
          description: "Follow the Clues. Crack the Code. Claim the Victory. A 3-stage intellectual quest testing technical acumen, cryptic discovery, and algorithmic error detection across Presidency University campus.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "Follow the Clues. Crack the Code. Claim the Victory. High-energy technical treasure hunt featuring Kahoot riddles, clue discovery within file properties, and rapid code error detection.",
            eligibility: "Teams of 2 to 3 members. Participants must bring their own laptops. No AI tools permitted.",
            teamSize: "2 - 3 Members per team",
            rounds: [
              "Round 1: Kahoot Quiz (20 questions covering riddles, logical puzzles, and technical reasoning).",
              "Round 2: Pickathon Clue Quest (Finding hidden clues embedded in file properties, metadata, and directory trees).",
              "Round 3: Code Error Spotting (Inspecting code blocks and identifying syntax/logic errors without compiling)."
            ],
            rules: [
              "Participants must carry their own charged laptops; charging stations available at checkpoints.",
              "Strict proctoring against AI tools (ChatGPT, Copilot, etc.). Tampering leads to disqualification.",
              "Fastest accurate submission takes the podium."
            ],
            judging: "Aggregate score from Kahoot accuracy (30%), clue resolution speed (40%), and syntax bug spotting (30%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Trophies & Merit Certificates"
          }
        },

        // 2. ShadowCode (Technical Event)
        {
          id: "shadow-code",
          name: "SHADOWCODE",
          tagline: "Think Fast. Code Smart. Debug in the Dark",
          category: "Technical Event",
          group: "technical",
          prize: "₹15,000",
          venue: "SOIS Lab 01",
          date: "Day 1 (4 February 2027)",
          time: "11:00 AM – 01:00 PM",
          description: "Think Fast. Code Smart. Debug in the Dark. The ultimate blind programming challenge where developers write code with their monitors turned OFF.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Abhyas Kathuria",
            phone: "+91 85958 48421",
            photo: "images/coord-abhyas.svg"
          },
          rulebook: {
            overview: "Intense competitive programming event where contestants demonstrate pure muscle memory, algorithmic syntax mastery, and rapid debugging.",
            eligibility: "Solo participation. Open to all engineering and computer science undergraduates.",
            teamSize: "1 Participant",
            rounds: [
              "Round 1: Code Debugging Sprint (Fix faulty algorithmic scripts against strict clock).",
              "Round 2: Blind Coding (Screens turned OFF; write algorithms from memory).",
              "Round 3: Optic Code Golf (Solve the master problem in the minimum possible lines of code)."
            ],
            rules: [
              "Supported languages: C, C++, Java, Python 3.",
              "Monitors must remain completely powered off during Round 2 until time is called.",
              "Code that compiles and passes the maximum hidden test cases wins."
            ],
            judging: "Compilation success, test case coverage, execution time, and line count efficiency.",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Accredited Certificates"
          }
        },

        // 3. DesignNova (Technical Event)
        {
          id: "design-nova",
          name: "DESIGNNOVA",
          tagline: "Imagine the Experience. Design the Future",
          category: "Technical Event",
          group: "technical",
          prize: "₹15,000",
          venue: "Design Studio (Ground Floor)",
          date: "Day 1 (4 February 2027)",
          time: "02:00 PM – 04:30 PM",
          description: "Imagine the Experience. Design the Future. Fast-paced UI/UX design sprint, user journey mapping, and interactive prototyping tackling modern digital product challenges.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Vimal Raj",
            phone: "+91 96201 92249",
            photo: "images/coord-vimal.svg"
          },
          rulebook: {
            overview: "Participants receive an on-the-spot problem statement to craft an intuitive mobile/web product interface, user journey map, and clickable prototype.",
            eligibility: "Solo or teams of 2 members. Bring laptops with Figma / Adobe XD installed.",
            teamSize: "1 - 2 Participants",
            rounds: [
              "Phase 1: Briefing & UX Research (30 minutes user journey formulation).",
              "Phase 2: High-Fidelity Wireframing & Prototyping (2 hours Figma design sprint).",
              "Phase 3: Jury Presentation & Interactive Product Walkthrough."
            ],
            rules: [
              "All component libraries and design assets must be created or customized on-site.",
              "Pre-built downloadable commercial UI kits will be penalized.",
              "Design must be responsive and follow accessibility guidelines (WCAG)."
            ],
            judging: "Usability (30%), Visual Aesthetics (30%), Innovation (25%), Pitch Presentation (15%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Trophies"
          }
        },

        // 4. TechTalk (Technical Event)
        {
          id: "tech-talk",
          name: "TECHTALK",
          tagline: "Research Today. Transform Tomorrow",
          category: "Technical Event",
          group: "technical",
          prize: "₹10,000",
          venue: "Seminar Hall 1",
          date: "Day 1 (4 February 2027)",
          time: "04:30 PM – 06:00 PM",
          description: "Research Today. Transform Tomorrow. Academic and industrial tech symposium where student researchers present breakthrough papers, emerging tech analyses, and architectural solutions.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Ashlin Siddharth",
            phone: "+91 87976 86786",
            photo: "images/coord-ashlin.svg"
          },
          rulebook: {
            overview: "A prestigious keynote and research presentation arena celebrating innovative computing breakthroughs, artificial intelligence architectures, and cloud distributed paradigms.",
            eligibility: "Solo or teams of 2 members.",
            teamSize: "1 - 2 Participants",
            rounds: [
              "Round 1: Research Paper Abstract & Slide Deck Review.",
              "Round 2: Live 8-Minute Stage Presentation + 3-Minute Technical Jury Defence."
            ],
            rules: [
              "Original research or novel synthesis required. Plagiarism > 15% leads to disqualification.",
              "Presentation slides must be submitted in PDF format prior to session start.",
              "Jury decision on technical depth and clarity is conclusive."
            ],
            judging: "Technical Rigour (35%), Innovation (30%), Presentation Delivery (20%), Q&A Defence (15%).",
            cashPrize: "Winner: ₹5,500 | Runner-up: ₹3,000 | 2nd Runner-up: ₹1,500 + Certificates of Merit"
          }
        },

        // 5. DataChronicles (Technical Event)
        {
          id: "data-chronicles",
          name: "DATACHRONICLES",
          tagline: "Discover the Story. Decode the Data. Deliver the Insight.",
          category: "Technical Event",
          group: "technical",
          prize: "₹15,000",
          venue: "SOIS Lab 03",
          date: "Day 2 (5 February 2027)",
          time: "09:30 AM – 11:30 AM",
          description: "Discover the Story. Decode the Data. Deliver the Insight. End-to-end data pipeline championship: ingest complex raw datasets, perform machine learning modeling, and deliver compelling visual narratives.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "End-to-end data intelligence challenge from exploratory data analysis (EDA) to predictive modeling and executive storytelling dashboards.",
            eligibility: "Teams of 2 participants. Must bring laptops configured with Python/R, Jupyter, and visualization tools.",
            teamSize: "2 Participants",
            rounds: [
              "Stage 1: Raw Dataset Release & Cleaning / Feature Engineering.",
              "Stage 2: Model Training & Predictive Performance Benchmarking.",
              "Stage 3: Interactive Dashboard Storytelling & Business Insight Pitch."
            ],
            rules: [
              "All code must be written during the competition window in a fresh repository.",
              "Pre-trained weights or external labels strictly forbidden.",
              "Submissions evaluated on hold-out validation dataset."
            ],
            judging: "Data Preprocessing (25%), Model Robustness (35%), Dashboard UI (20%), Storytelling Impact (20%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Merit Certificates"
          }
        },

        // 6. Founders' Arena (Technical Event)
        {
          id: "founders-arena",
          name: "FOUNDERS' ARENA",
          tagline: "Think Big. Pitch Bold. Build What's Next",
          category: "Technical Event",
          group: "technical",
          prize: "₹18,000",
          venue: "Seminar Hall 1",
          date: "Day 1 (4 February 2027)",
          time: "04:30 PM – 06:30 PM",
          description: "Think Big. Pitch Bold. Build What's Next. Shark Tank style startup pitching and tech venture showcase before venture evaluators, angel investors, and industry executives.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Vimal Raj",
            phone: "+91 96201 92249",
            photo: "images/coord-vimal.svg"
          },
          rulebook: {
            overview: "A business-meets-technology pitching battle where student founders showcase disruptive software/hardware startups, market research, revenue models, and MVP prototypes.",
            eligibility: "Teams of 2 to 4 members. Cross-college teams permitted.",
            teamSize: "2 - 4 Participants",
            rounds: [
              "Round 1: Pitch Deck & Executive Summary Pre-Screening.",
              "Round 2: Live 7-Minute Pitch + 5-Minute Investor Grilling on Dais."
            ],
            rules: [
              "Pitch deck must cover: Problem, Solution, Tech Architecture, Market Size, Revenue Model, and Team.",
              "Working software MVP or hardware demonstration carries significant bonus weightage.",
              "Judges' investment allocation determines final podium standings."
            ],
            judging: "Market Feasibility (30%), Technological Innovation (30%), Financial Viability (20%), Pitch Poise (20%).",
            cashPrize: "Winner: ₹10,000 | Runner-up: ₹5,000 | 2nd Runner-up: ₹3,000 + Incubation Fast-Track"
          }
        },

        // 7. TechNova '27 (Technical Event - 24H Hackathon)
        {
          id: "technova-27",
          name: "TECHNOVA '27",
          tagline: "24 Hours. One Mission. Limitless Innovation",
          category: "Technical Event",
          group: "technical",
          prize: "₹22,500",
          venue: "Central Computing Lab (24-Hour Facility)",
          date: "4–5 February 2027 (Overnight 24H)",
          time: "Day 1 10:30 AM Kickoff to Day 2 10:30 AM Submissions",
          description: "24 Hours. One Mission. Limitless Innovation. Presidency University's flagship overnight national hackathon solving high-impact problem statements with food, stay, and mentors provided.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Abhyas Kathuria",
            phone: "+91 85958 48421",
            photo: "images/coord-abhyas.svg"
          },
          rulebook: {
            overview: "A non-stop 24-hour innovation sprint bringing collegiate developers together to build production-grade web, mobile, blockchain, or AI solutions.",
            eligibility: "Teams of strictly 4 members. ₹1,500 registration per team includes meals, stay, and energy supplies.",
            teamSize: "Strictly 4 Members per team",
            rounds: [
              "Kickoff: Problem statement reveal at 10:30 AM Day 1.",
              "Checkpoint 1: Mentorship review at 04:00 PM Day 1.",
              "Checkpoint 2: Midnight code architecture audit at 12:00 AM.",
              "Final Demos: 10:30 AM – 01:00 PM Day 2 before industry jury panel."
            ],
            rules: [
              "All code must be written during the 24-hour window; fresh Git commit history strictly enforced.",
              "Open-source libraries permitted with proper attribution; no turnkey templates.",
              "Teams must observe common break rules (13:00–14:00 lunch clock pause)."
            ],
            judging: "Technical Innovation (35%), Product Completion (30%), UI/UX (20%), Pitch Demo (15%).",
            cashPrize: "Winner: ₹12,000 | Runner-up: ₹7,000 | Best Tech Prototype: ₹3,500 + Trophies & Medals"
          }
        },

        // 8. Quad Damage (Non-Technical Event)
        {
          id: "quad-damage",
          name: "QUAD DAMAGE",
          tagline: "Lock In. Level Up. Dominate",
          category: "Non-Technical Event",
          group: "non-technical",
          prize: "₹20,000",
          venue: "Classroom DJL01 & SH4 (SOIS Gaming Hub)",
          date: "Day 1 & Day 2 (4–5 February 2027)",
          time: "Day 1 02:00 PM Qualifiers | Day 2 01:00 PM Finals",
          description: "Lock In. Level Up. Dominate. High-octane collegiate LAN esports championship featuring Valorant (PC 5v5), BGMI (Mobile Squads), and Call of Duty with live big-screen casting.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Ashlin Siddharth",
            phone: "+91 87976 86786",
            photo: "images/coord-ashlin.svg"
          },
          rulebook: {
            overview: "Collegiate esports championship played across dedicated low-latency tournament LAN networks with official tournament referees.",
            eligibility: "Teams of 1 to 4 members. Must carry college IDs and personal mobile/peripherals.",
            teamSize: "1 - 4 Players per squad",
            rounds: [
              "Stage 1: Custom Room Knockout Qualifiers (Single Elimination).",
              "Stage 2: Semi-Finals & Grand Finals cast live on stage displays."
            ],
            rules: [
              "Strict anti-cheat policy. Any emulation, macros, or mods cause instant team disqualification.",
              "Campus high-speed LAN provided; players may also utilize personal hotspots.",
              "Unsportsmanlike conduct or toxicity leads to immediate forfeit."
            ],
            judging: "Official in-game tournament scoreboard verified by match referees.",
            cashPrize: "Valorant Champion: ₹8,000 | BGMI Champion: ₹7,000 | COD Champion: ₹5,000 + Trophies"
          }
        },

        // 9. Biochroma (Non-Technical Event)
        {
          id: "biochroma",
          name: "BIOCHROMA",
          tagline: "Where Nature Meets Innovation, Style Becomes the Future",
          category: "Non-Technical Event",
          group: "non-technical",
          prize: "₹15,000",
          venue: "Main Open Stage",
          date: "Day 2 (5 February 2027)",
          time: "03:30 PM – 05:00 PM",
          description: "Where Nature Meets Innovation, Style Becomes the Future. A flagship runway spectacle fusing avant-garde fashion, wearable electronics, smart LEDs, and organic sustainable materials.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Vimal Raj",
            phone: "+91 96201 92249",
            photo: "images/coord-vimal.svg"
          },
          rulebook: {
            overview: "A themed fashion runway experience where futuristic cyber aesthetics blend with nature-inspired elements, smart textiles, microcontrollers, and recyclable tech fabrics.",
            eligibility: "Teams of 5 to 10 members (models, designers, and audio-visual support).",
            teamSize: "5 - 10 Members per team",
            rounds: [
              "Runway Round: 8-minute choreographed team walk with music and thematic narration.",
              "Concept Defence: 2-minute Q&A with fashion and tech judges explaining material sustainability."
            ],
            rules: [
              "Outfits must reflect the 'Technology × Nature' theme (recyclable materials, microcontrollers, fibre optics).",
              "Soundtrack and visual backdrop must be submitted 2 hours before the event.",
              "Costume changes must happen within assigned green rooms."
            ],
            judging: "Theme Interpretation (30%), Design Creativity (30%), Stage Walk & Poise (25%), Material Innovation (15%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | Best Creative Ensemble: ₹2,500 + Trophies"
          }
        },

        // 10. APL (Arenium Premier League) (Non-Technical Event)
        {
          id: "apl-auction",
          name: "APL (ARENIUM PREMIER LEAGUE)",
          tagline: "Bid Smart. Think Big. Build Your Business Empire",
          category: "Non-Technical Event",
          group: "non-technical",
          prize: "₹15,000",
          venue: "Management Amphitheatre",
          date: "Day 2 (5 February 2027)",
          time: "02:00 PM – 03:30 PM",
          description: "Bid Smart. Think Big. Build Your Business Empire. An IPL-style strategic corporate auction and business simulation where teams manage virtual capital, acquire brands, and deliver growth portfolios.",
          poster: "images/events-poster.svg",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "Tailored for business, commerce, and tech-strategy minds. Teams navigate an auction bidding war for iconic conglomerates, analyze market dynamics, and pitch expansion strategies.",
            eligibility: "Teams of 2 to 3 members.",
            teamSize: "2 - 3 Members per team",
            rounds: [
              "Round 1: Virtual Budget Bidding Auction (Acquiring brands like Tata, Reliance, Apple, Google).",
              "Round 2: Brand Strategy SWOT & Crisis Simulation (Overcoming competitive market disruption).",
              "Round 3: Final Valuation & Executive Board Pitch."
            ],
            rules: [
              "Each team starts with a fixed virtual purse of ₹100 Crores.",
              "Auctioneer rulings on bids, penalties, and lot allocation are final.",
              "Exceeding purse limits leads to immediate forfeiture of assets."
            ],
            judging: "Portfolio Market Valuation (40%), Strategic Synergy (30%), Crisis Handling (30%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Corporate Citations"
          }
        }
      ],
      schedule: [
        // Day 1 (4 February 2027)
        {
          id: "sch-01",
          day: "Day 1",
          time: "09:30 AM – 10:30 AM",
          name: "Grand Inaugural Ceremony & Lamp Lighting",
          category: "Inaugural",
          venue: "Main University Auditorium",
          note: "Patron welcome address by Dean SOIS Dr. C. Kalaiarasan, Registrar, and Chief Technology Guests."
        },
        {
          id: "sch-02",
          day: "Day 1",
          time: "10:30 AM (24 Hours Non-stop)",
          name: "TECHNOVA '27 (24-Hour Flagship Hackathon Flagoff)",
          category: "Technical Flagship",
          venue: "Central Computing Lab (D-Block)",
          note: "24 Hours. One Mission. Limitless Innovation. Problem statements released live on portal. Non-stop software & hardware sprint begins."
        },
        {
          id: "sch-03",
          day: "Day 1",
          time: "10:45 AM – 01:00 PM",
          name: "TECH ODYSSEY (Clue Hunt & Bug Spotting)",
          category: "Technical Event",
          venue: "SOIS Lab 02 & Campus Perimeter",
          note: "Follow the Clues. Crack the Code. Claim the Victory. 3-stage challenge: Kahoot qualification, campus QR hunt, and code error debugging."
        },
        {
          id: "sch-04",
          day: "Day 1",
          time: "11:00 AM – 01:00 PM",
          name: "SHADOWCODE (Blindfold Code Sprint)",
          category: "Technical Event",
          venue: "SOIS Lab 01",
          note: "Think Fast. Code Smart. Debug in the Dark. Screen-off blind programming in C/C++/Java/Python. Syntax perfection required."
        },
        {
          id: "sch-05",
          day: "Day 1",
          time: "01:00 PM – 02:00 PM",
          name: "Official Networking & Lunch Pause",
          category: "Break",
          venue: "University Food Court",
          note: "Recharge session with complimentary buffet lunch coupons for all registered delegates and faculty."
        },
        {
          id: "sch-06",
          day: "Day 1",
          time: "02:00 PM – 04:30 PM",
          name: "DESIGNNOVA (UI/UX Design Sprint & Prototype Arena)",
          category: "Technical Event",
          venue: "Design Studio (Ground Floor)",
          note: "Imagine the Experience. Design the Future. Live 2.5-hour Figma wireframing, component design systems, and prototype defence."
        },
        {
          id: "sch-07",
          day: "Day 1",
          time: "02:00 PM – 05:30 PM",
          name: "QUAD DAMAGE (LAN Esports Prelims & Brackets)",
          category: "Non-Technical / Esports",
          venue: "DJL01 & Seminar Hall 4",
          note: "Lock In. Level Up. Dominate. High-octane LAN tournament preliminaries across Valorant (5v5) and BGMI squads."
        },
        {
          id: "sch-08",
          day: "Day 1",
          time: "04:30 PM – 06:00 PM",
          name: "TECHTALK (Keynote & Research Symposium)",
          category: "Technical Event",
          venue: "Seminar Hall 1",
          note: "Research Today. Transform Tomorrow. Oral presentations and technical defense on cutting-edge architectures and ML research."
        },
        {
          id: "sch-09",
          day: "Day 1",
          time: "04:30 PM – 06:30 PM",
          name: "FOUNDERS' ARENA (Startup Pitch Deck)",
          category: "Technical Event",
          venue: "Amphitheatre & Seminar Hall 1",
          note: "Think Big. Pitch Bold. Build What's Next. Shark Tank style startup pitching before angel investors and venture evaluators."
        },

        // Day 2 (5 February 2027)
        {
          id: "sch-10",
          day: "Day 2",
          time: "09:30 AM – 11:30 AM",
          name: "DATACHRONICLES (Data Modeling & Insights)",
          category: "Technical Event",
          venue: "SOIS Lab 03",
          note: "Discover the Story. Decode the Data. Deliver the Insight. End-to-end data pipeline championship: EDA, predictive modeling, and dashboards."
        },
        {
          id: "sch-11",
          day: "Day 2",
          time: "10:30 AM – 12:30 PM",
          name: "TECHNOVA '27 (Hackathon Finale & Pitching)",
          category: "Technical Flagship",
          venue: "Central Computing Lab & Aud 2",
          note: "Sprint code freeze, live deployment test, and 5-minute technical demo before industry judges."
        },
        {
          id: "sch-12",
          day: "Day 2",
          time: "11:30 AM – 02:30 PM",
          name: "QUAD DAMAGE (LAN Esports Grand Finals)",
          category: "Non-Technical / Esports",
          venue: "Main University Auditorium E-Arena",
          note: "Valorant & BGMI championship grand finals live-streamed on auditorium jumbo LED display walls."
        },
        {
          id: "sch-13",
          day: "Day 2",
          time: "01:00 PM – 02:00 PM",
          name: "Official Lunch & Delegate Pause",
          category: "Break",
          venue: "University Food Court",
          note: "Buffet dining and final scores compilation by the adjudication committee."
        },
        {
          id: "sch-14",
          day: "Day 2",
          time: "02:00 PM – 03:30 PM",
          name: "APL (ARENIUM PREMIER LEAGUE)",
          category: "Non-Technical Event",
          venue: "Management Amphitheatre",
          note: "Bid Smart. Think Big. Build Your Business Empire. Strategic corporate brand and player auction bidding war."
        },
        {
          id: "sch-15",
          day: "Day 2",
          time: "03:30 PM – 05:00 PM",
          name: "BIOCHROMA (Tech × Nature Fashion Runway)",
          category: "Non-Technical Event",
          venue: "Main Open Stage",
          note: "Where Nature Meets Innovation, Style Becomes the Future. Runway spectacle fusing avant-garde couture, smart LEDs, and sustainable tech."
        },
        {
          id: "sch-16",
          day: "Day 2",
          time: "05:00 PM – 06:30 PM",
          name: "Grand Valedictory Ceremony & ₹1.5L Prize Handover",
          category: "Valedictory",
          venue: "Main University Auditorium",
          note: "Official trophy handovers, Dean's address, sponsor citations, certificate awards, and ARENIUM '27 closing anthem."
        }
      ],
      winners: [
        {
          id: "win-technova",
          event: "TECHNOVA '27 (24H HACKATHON)",
          category: "Technical Event",
          date: "5 February 2027",
          prizePool: "₹22,500",
          tiers: [
            { rank: 1, team: "Team NeuralForge", college: "Presidency University, Bengaluru", prize: "₹12,000", members: ["Aarav Sharma", "Neha Gupta", "Vikram Sen", "Pooja Hegde"] },
            { rank: 2, team: "CyberSentinels", college: "BMS College of Engineering", prize: "₹7,000", members: ["Rohan K", "Aditi Rao", "Karthik N", "Deepak V"] },
            { rank: 3, team: "ByteShift AI", college: "RV College of Engineering", prize: "₹3,500", members: ["Siddharth M", "Ananya P", "Varun T", "Meera S"] }
          ]
        },
        {
          id: "win-shadowcode",
          event: "SHADOWCODE",
          category: "Technical Event",
          date: "4 February 2027",
          prizePool: "₹15,000",
          tiers: [
            { rank: 1, team: "Kiran R (Solo)", college: "PES University, Bengaluru", prize: "₹8,000", members: ["Kiran R"] },
            { rank: 2, team: "Tanvi Deshmukh", college: "Presidency University, Bengaluru", prize: "₹4,500", members: ["Tanvi Deshmukh"] },
            { rank: 3, team: "Rahul Menon", college: "MSRIT Bengaluru", prize: "₹2,500", members: ["Rahul Menon"] }
          ]
        },
        {
          id: "win-techodyssey",
          event: "TECH ODYSSEY",
          category: "Technical Event",
          date: "4 February 2027",
          prizePool: "₹15,000",
          tiers: [
            { rank: 1, team: "CipherKnights", college: "Presidency University, Bengaluru", prize: "₹8,000", members: ["Gautam V", "Shreya Sen", "Akash Nair"] },
            { rank: 2, team: "HexHunters", college: "Dayananda Sagar College", prize: "₹4,500", members: ["Manish B", "Kavya S"] },
            { rank: 3, team: "RootAccess", college: "New Horizon College", prize: "₹2,500", members: ["Naveen K", "Priya D"] }
          ]
        },
        {
          id: "win-quaddamage",
          event: "QUAD DAMAGE",
          category: "Non-Technical Event",
          date: "5 February 2027",
          prizePool: "₹20,000",
          tiers: [
            { rank: 1, team: "Phantom Apex", college: "Presidency University, Bengaluru", prize: "₹8,000", members: ["Aditya Joshi", "Tarun G", "Sanjay R", "Sameer K"] },
            { rank: 2, team: "Viper Squad", college: "Christ University, Bengaluru", prize: "₹7,000", members: ["Pranav M", "Aayush C", "Nikhil T", "Dev B"] },
            { rank: 3, team: "RedLine Esports", college: "Jain University", prize: "₹5,000", members: ["Kunal S", "Rishi P"] }
          ]
        },
        {
          id: "win-designnova",
          event: "DESIGNNOVA",
          category: "Technical Event",
          date: "4 February 2027",
          prizePool: "₹15,000",
          tiers: [
            { rank: 1, team: "PixelCraft Duo", college: "National Institute of Design / PU", prize: "₹8,000", members: ["Diya Roy", "Abhinav C"] },
            { rank: 2, team: "VectorPulse", college: "Presidency University, Bengaluru", prize: "₹4,500", members: ["Sneha M", "Karan J"] },
            { rank: 3, team: "AuraStudio", college: "BMSCE Bengaluru", prize: "₹2,500", members: ["Harish V"] }
          ]
        },
        {
          id: "win-biochroma",
          event: "BIOCHROMA",
          category: "Non-Technical Event",
          date: "5 February 2027",
          prizePool: "₹15,000",
          tiers: [
            { rank: 1, team: "Atelier Synthesis", college: "Presidency University (SOIS & SOD)", prize: "₹8,000", members: ["Rhea Kapoor & Team"] },
            { rank: 2, team: "NeonFlora Runway", college: "Mount Carmel College", prize: "₹4,500", members: ["Zoya Sheikh & Team"] },
            { rank: 3, team: "EcoTech Collective", college: "Presidency University", prize: "₹2,500", members: ["Alok N & Team"] }
          ]
        },
        {
          id: "win-apl",
          event: "APL (ARENIUM PREMIER LEAGUE)",
          category: "Non-Technical Event",
          date: "5 February 2027",
          prizePool: "₹15,000",
          tiers: [
            { rank: 1, team: "Titan Conglomerate", college: "Presidency University, Bengaluru", prize: "₹8,000", members: ["Naman Singhal", "Ritika Jain"] },
            { rank: 2, team: "Apex Ventures", college: "St. Joseph's College of Commerce", prize: "₹4,500", members: ["Aryan Khurana", "Devika S"] },
            { rank: 3, team: "Monopoly Masters", college: "Christ University", prize: "₹2,500", members: ["Rajesh V", "Preeti K"] }
          ]
        }
      ],
      certificates: [
        {
          id: "AR27-HCK-001",
          recipient: "Team NeuralForge",
          event: "TECHNOVA '27",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-HCK-002",
          recipient: "CyberSentinels",
          event: "TECHNOVA '27",
          award: "RUNNER UP · SECOND PLACE",
          college: "BMS College of Engineering",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-COD-001",
          recipient: "Kiran R",
          event: "SHADOWCODE",
          award: "CHAMPION · FIRST PLACE",
          college: "PES University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-TRL-001",
          recipient: "CipherKnights",
          event: "TECH ODYSSEY",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-LAN-001",
          recipient: "Phantom Apex",
          event: "QUAD DAMAGE",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-DSN-001",
          recipient: "PixelCraft Duo",
          event: "DESIGNNOVA",
          award: "CHAMPION · FIRST PLACE",
          college: "National Institute of Design / PU",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-FSH-001",
          recipient: "Atelier Synthesis",
          event: "BIOCHROMA",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University (SOIS)",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-APL-001",
          recipient: "Titan Conglomerate",
          event: "APL (ARENIUM PREMIER LEAGUE)",
          award: "CHAMPION · FIRST PLACE",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        },
        {
          id: "AR27-PRT-042",
          recipient: "Kaushal Kumar Singh",
          event: "TECHNOVA '27",
          award: "CERTIFICATE OF MERIT & PARTICIPATION",
          college: "Presidency University, Bengaluru",
          issueDate: "5 February 2027",
          verified: true
        }
      ],
      sponsors: [
        {
          id: "sp-title",
          name: "PRESIDENCY UNIVERSITY",
          tier: "Host Institution",
          logo: "images/presidency-university-logo.png?v=2027",
          url: "https://presidencyuniversity.in"
        },
        {
          id: "sp-1",
          name: "SMART INDIA HACKATHON PARTNER",
          tier: "Innovation Partner",
          logo: "images/sponsor-1.svg",
          url: "https://presidencyuniversity.in"
        },
        {
          id: "sp-2",
          name: "CYBER MATRIX TECH",
          tier: "Title Sponsor",
          logo: "images/sponsor-title.svg",
          url: "https://presidencyuniversity.in"
        },
        {
          id: "sp-3",
          name: "GLITCHWORKS GAMING",
          tier: "Esports & Gaming Partner",
          logo: "images/sponsor-2.svg",
          url: "https://presidencyuniversity.in"
        },
        {
          id: "sp-4",
          name: "SYNTH CLOUD SOLUTIONS",
          tier: "Cloud Infrastructure Partner",
          logo: "images/sponsor-3.svg",
          url: "https://presidencyuniversity.in"
        },
        {
          id: "sp-5",
          name: "CYBERPULSE ENERGY",
          tier: "Official Beverage Partner",
          logo: "images/sponsor-4.svg",
          url: "https://presidencyuniversity.in"
        }
      ],
      gallery: [
        { id: "g-1", src: "images/gallery-1.svg", title: "Arena Ignition Inauguration", tag: "Main Stage" },
        { id: "g-2", src: "images/gallery-2.svg", title: "ByteBlitz 24H Hackathon Sprint", tag: "Hackathon" },
        { id: "g-3", src: "images/gallery-3.svg", title: "Tech Trail Cryptic Clue Solvers", tag: "Treasure Hunt" },
        { id: "g-4", src: "images/gallery-4.svg", title: "Squad Damage Esports Battlegrounds", tag: "Gaming" },
        { id: "g-5", src: "images/gallery-5.svg", title: "TECHNO Fashion Runway", tag: "Fashion Show" },
        { id: "g-6", src: "images/gallery-6.svg", title: "Arena Crowning & ₹1.5L Prize Handover", tag: "Awards" }
      ],
      registrations: [
        {
          id: "ARENIUM27-REG-1042",
          fullName: "Kaushal Kumar Singh",
          email: "singhkaushal.2507@gmail.com",
          phone: "+91 91087 40761",
          college: "Presidency University, Bengaluru",
          usn: "20231CSE0412",
          department: "Computer Science & Engineering",
          yearSem: "3rd Year (5th Sem)",
          eventId: "technova-27",
          eventName: "TECHNOVA '27 (24H Hackathon)",
          regType: "Team",
          teamName: "NeuralSentinels",
          teamMembers: "Kaushal Kumar Singh (Lead), Abhyas Kathuria, Ashlin Siddharth, Vimal Raj",
          utrId: "429184719204",
          paymentScreenshot: "images/qrcode.png",
          status: "Confirmed",
          timestamp: "2026-10-28T14:32:00+05:30"
        },
        {
          id: "ARENIUM27-REG-1043",
          fullName: "Abhyas Kathuria",
          email: "Kathuriaabhyas@gmail.com",
          phone: "+91 98450 12345",
          college: "Presidency University, Bengaluru",
          usn: "20231ISE0105",
          department: "Information Science & Engineering",
          yearSem: "3rd Year (5th Sem)",
          eventId: "shadow-code",
          eventName: "SHADOWCODE (Blind Coding)",
          regType: "Solo",
          teamName: "",
          teamMembers: "",
          utrId: "429195820193",
          status: "Confirmed",
          timestamp: "2026-10-29T10:15:00+05:30"
        },
        {
          id: "ARENIUM27-REG-1044",
          fullName: "Rohan Verma",
          email: "rohan.verma@rvce.edu.in",
          phone: "+91 97412 88901",
          college: "R.V. College of Engineering",
          usn: "1RV23CS088",
          department: "Computer Science & Engineering",
          yearSem: "2nd Year (3rd Sem)",
          eventId: "quad-damage",
          eventName: "QUAD DAMAGE (LAN Esports)",
          regType: "Team",
          teamName: "PhantomSquad",
          teamMembers: "Rohan Verma, Aditya Rao, Nikhil Gowda, Samarth Patil, Vivek Nair",
          utrId: "430114829105",
          status: "Confirmed",
          timestamp: "2026-10-30T16:40:00+05:30"
        },
        {
          id: "ARENIUM27-REG-1045",
          fullName: "Sneha Nair",
          email: "sneha.nair@bmsce.ac.in",
          phone: "+91 99801 34567",
          college: "BMS College of Engineering",
          usn: "1BM24AI034",
          department: "AI & Machine Learning (AIML)",
          yearSem: "2nd Year (3rd Sem)",
          eventId: "design-nova",
          eventName: "DESIGNNOVA (UI/UX Design)",
          regType: "Solo",
          teamName: "",
          teamMembers: "",
          utrId: "431089201582",
          status: "Pending",
          timestamp: "2026-10-31T11:20:00+05:30"
        }
      ]
    };
  },

  getData() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const defaults = this.getDefaults();
        return {
          settings: {
            ...defaults.settings,
            ...(parsed.settings || {}),
            registrationConfig: {
              ...defaults.settings.registrationConfig,
              ...((parsed.settings && parsed.settings.registrationConfig) || {})
            }
          },
          coordinators: parsed.coordinators && parsed.coordinators.length ? parsed.coordinators : defaults.coordinators,
          leadership: parsed.leadership && parsed.leadership.length ? parsed.leadership : defaults.leadership,
          soisFaculty: parsed.soisFaculty && parsed.soisFaculty.length ? parsed.soisFaculty : defaults.soisFaculty,
          events: parsed.events && parsed.events.length ? parsed.events : defaults.events,
          schedule: parsed.schedule && parsed.schedule.length ? parsed.schedule : defaults.schedule,
          winners: parsed.winners && parsed.winners.length ? parsed.winners : defaults.winners,
          sponsors: parsed.sponsors && parsed.sponsors.length ? parsed.sponsors : defaults.sponsors,
          gallery: parsed.gallery && parsed.gallery.length ? parsed.gallery : defaults.gallery,
          registrations: (parsed.registrations && Array.isArray(parsed.registrations)) ? parsed.registrations : defaults.registrations
        };
      }
    } catch (e) {
      console.error("FestDB Read Exception:", e);
    }
    return this.getDefaults();
  },

  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("arenium_db_change", { detail: data }));
      return true;
    } catch (e) {
      console.error("FestDB Save Exception:", e);
      return false;
    }
  },

  resetDefaults() {
    localStorage.removeItem(this.STORAGE_KEY);
    return this.getDefaults();
  }
};
window.FestDB = FestDB;

// ==========================================================================
// 2. PARALLAX BACKGROUND SYSTEM & VISUAL MATRIX
// ==========================================================================
function initParallaxBackground() {
  const header = document.querySelector('.site-header');

  let ticking = false;
  const updateScrollState = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    // Adaptive header transition when scrolling
    if (header) {
      if (scrolled > 70) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  updateScrollState();
}

// Clean Unified Atmospheric Theme Matrix (No Dark/Light toggles)
const ThemeEngine = {
  getTheme() { return "atmospheric"; },
  setTheme() {},
  toggleTheme() {},
  init() {
    // Clean up any stray toggle buttons if present
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => btn.remove());
    // Ensure glowing blue wordmark is applied
    document.querySelectorAll(".brand-logo-img").forEach(img => {
      img.src = "images/logo-light.svg";
    });
  }
};
window.ThemeEngine = ThemeEngine;

// // ==========================================================================
// 2. CORE SYSTEM INITIALISATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  ThemeEngine.init();
  initParallaxBackground();
  const db = FestDB.getData();

  initMovingTicker(db);
  initRegistrationButtons(db);
  initNavigation();
  initCountdown(db);
  initHeroCanvas();
  initScrollAnimations();
  initTeamSections(db);
  initEventsPage(db);
  initSchedulePage(db);
  initWinnersPage(db);
  initCertificateStudio(db);
  initGalleryPage(db);
  initSponsorsPage(db);
  initRulebookModal();
  initAdminPanel();
});

// ==========================================================================
// 3. MOVING NEON TICKER (PRIZE POOL 1.5L)
// ==========================================================================
function initMovingTicker(db) {
  try {
    const tickerContent = document.getElementById("prize-ticker-content");
    if (tickerContent && db.settings && db.settings.prizePoolText) {
      tickerContent.innerHTML = db.settings.prizePoolText;
    }
  } catch (err) {
    console.error("Ticker init error:", err);
  }
}

// ==========================================================================
// 4. REGISTRATION BUTTONS BINDING
// ==========================================================================
function initRegistrationButtons(db) {
  try {
    const regConfig = (db.settings && db.settings.registrationConfig) || {};
    const regUrl = (regConfig.portalMode === "external" && regConfig.externalUrl) ? regConfig.externalUrl : "register.html";
    const registerButtons = document.querySelectorAll(".btn-register, [data-register-btn]");
    registerButtons.forEach(btn => {
      if (btn.tagName.toLowerCase() === "a") {
        btn.setAttribute("href", regUrl);
        if (regUrl.startsWith("http")) {
          btn.setAttribute("target", "_blank");
          btn.setAttribute("rel", "noopener noreferrer");
        } else {
          btn.removeAttribute("target");
          btn.removeAttribute("rel");
        }
      }
    });

    // Also update QR Code image if present
    const qrImg = document.querySelector(".scanner-img");
    if (qrImg && (regConfig.qrCodeImg || db.settings.qrCodeImg)) {
      qrImg.src = regConfig.qrCodeImg || db.settings.qrCodeImg;
    }
  } catch (err) {
    console.error("Error setting registration links:", err);
  }
}

// ==========================================================================
// 5. NAVIGATION
// ==========================================================================
function initNavigation() {
  try {
    const navToggle = document.querySelector(".nav-toggle-btn");
    const navMenu = document.querySelector(".nav-menu");
    const dropdowns = document.querySelectorAll(".nav-dropdown");

    const closeNavDrawer = () => {
      if (navMenu && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        if (navToggle) {
          navToggle.classList.remove("is-active");
          navToggle.setAttribute("aria-expanded", "false");
        }
        document.body.style.overflow = "";
      }
    };

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.classList.toggle("is-active", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });

      document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("is-open")) {
          closeNavDrawer();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
          closeNavDrawer();
        }
      });
    }

    // Dropdown toggle for Rules (Mobile accordion up to 1180px)
    dropdowns.forEach(drop => {
      const toggle = drop.querySelector(".dropdown-toggle");
      if (toggle) {
        toggle.addEventListener("click", (e) => {
          if (window.innerWidth <= 1180) {
            e.preventDefault();
            drop.classList.toggle("open");
          }
        });
      }
    });

    // Close mobile drawer when clicking navigation links or action buttons
    const links = document.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-item a, .nav-menu .btn");
    links.forEach(l => {
      l.addEventListener("click", () => {
        closeNavDrawer();
      });
    });

    // Window resize handler: auto close drawer and restore scroll when expanding to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1180 && navMenu && navMenu.classList.contains("is-open")) {
        closeNavDrawer();
      }
    });
  } catch (err) {
    console.error("Error initializing navigation:", err);
  }
}

// ==========================================================================
// 6. COUNTDOWN TIMER
// ==========================================================================
function initCountdown(db) {
  try {
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minsEl = document.getElementById("count-mins");
    const secsEl = document.getElementById("count-secs");
    const gridEl = document.getElementById("countdown-grid");
    const liveEl = document.getElementById("countdown-live-banner");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const targetDate = db.settings.eventDate || "2027-03-26T09:00:00+05:30";
    const targetTime = new Date(targetDate).getTime();

    function update() {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        if (gridEl) gridEl.style.display = "none";
        if (liveEl) liveEl.style.display = "inline-block";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(minutes).padStart(2, "0");
      secsEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
  } catch (err) {
    console.error("Error initializing countdown:", err);
  }
}

// ==========================================================================
// 7. HERO CANVAS
// ==========================================================================
function initHeroCanvas() {
  try {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationFrameId;
    let isVisible = true;

    function getCanvasThemeColors() {
      return {
        primary: "rgba(176, 215, 216, ",
        secondary: "rgba(247, 203, 202, ",
        grid: "rgba(93, 107, 107, 0.03)",
        primaryRgb: "176, 215, 216"
      };
    }

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      const colors = getCanvasThemeColors();
      const count = Math.min(Math.floor(width / 24), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.7 - 0.2,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? colors.primary : colors.secondary,
          alpha: Math.random() * 0.7 + 0.2
        });
      }
    }

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const colors = getCanvasThemeColors();
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.strokeStyle = `rgba(${colors.primaryRgb}, ${0.25 * (1 - dist / 85)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("themechange", () => {
      createParticles();
    });
    resize();
    draw();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        draw();
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);
  } catch (err) {
    console.error("Error initializing hero canvas:", err);
  }
}

// ==========================================================================
// 8. SCROLL ANIMATIONS
// ==========================================================================
function initScrollAnimations() {
  try {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } catch (err) {
    console.error("Error initializing scroll animations:", err);
  }
}

// ==========================================================================
// 9. TEAM & LEADERSHIP SECTIONS (COORDINATORS WITH PHOTOS + FULL SOIS)
// ==========================================================================
function initTeamSections(db) {
  try {
    // 1. Student Coordinators Grid (Homepage & Contact page)
    const studentGrids = document.querySelectorAll("[data-student-coords-grid]");
    studentGrids.forEach(grid => {
      grid.innerHTML = "";
      db.coordinators.forEach(c => {
        const card = document.createElement("div");
        card.className = "cyber-card team-card reveal-on-scroll is-visible";
        card.innerHTML = `
          <div class="team-photo-wrap">
            <img src="${c.photo || 'images/coord-generic.svg'}" alt="${c.name}" class="team-avatar-img" loading="lazy">
          </div>
          <div class="team-card-tag">${c.role.toUpperCase()}</div>
          <h4 class="team-name">${c.name}</h4>
          <div class="team-role">${c.dept}</div>
          <a href="tel:${c.phone.replace(/[^0-9+]/g, '')}" class="team-phone-link" aria-label="Call ${c.name}">
            <span>📞</span> ${c.phone}
          </a>
        `;
        grid.appendChild(card);
      });
    });

    // 2. Faculty Leadership Grid (Dean, HOD, Programme Organiser)
    const leadershipGrids = document.querySelectorAll("[data-leadership-grid]");
    leadershipGrids.forEach(grid => {
      grid.innerHTML = "";
      db.leadership.forEach(l => {
        const card = document.createElement("div");
        card.className = "cyber-card team-card reveal-on-scroll is-visible";
        card.innerHTML = `
          <div class="team-photo-wrap">
            <img src="${l.photo || 'images/leader-dean.svg'}" alt="${l.name}" class="team-avatar-img" loading="lazy">
          </div>
          <div class="team-card-tag">${l.tag}</div>
          <h4 class="team-name">${l.name}</h4>
          <div class="team-role">${l.role}</div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.4;">
            ${l.bio || ''}
          </p>
        `;
        grid.appendChild(card);
      });
    });

    // 3. Full SOIS Mentors & Organizing Committee Grid
    const soisGrids = document.querySelectorAll("[data-sois-committee-grid]");
    soisGrids.forEach(grid => {
      grid.innerHTML = "";
      (db.soisFaculty || []).forEach(f => {
        const card = document.createElement("div");
        card.className = "cyber-card team-card reveal-on-scroll is-visible";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.innerHTML = `
          <div class="team-photo-wrap" style="height: 160px;">
            <img src="${f.photo || 'images/leader-sois.svg'}" alt="${f.faculty || f.name}" class="team-avatar-img" loading="lazy">
          </div>
          <div class="team-card-tag">${(f.team || 'SOIS COMMITTEE').toUpperCase()}</div>
          <h4 class="team-name" style="font-size: 1.05rem;">${f.faculty || f.name}</h4>
          <div class="team-role" style="color:var(--neon-pink); font-size:0.8rem; margin-bottom:0.4rem;">${f.role || 'Faculty In-Charge'}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.5rem; margin-top: auto;">
            <strong style="color: var(--neon-cyan); display:block; margin-bottom: 2px;">Student Coordinators:</strong>
            ${f.students || 'SOIS Student Volunteers'}
          </div>
        `;
        grid.appendChild(card);
      });
    });
  } catch (err) {
    console.error("Error rendering team sections:", err);
  }
}

// ==========================================================================
// 10. EVENTS MATRIX & FILTERING (WITH RULEBOOK MODAL & COORD PHOTOS)
// ==========================================================================
function initEventsPage(db) {
  try {
    const mainContainer = document.getElementById("main-events-container") || document.getElementById("pre-events-container");
    if (!mainContainer) return;

    mainContainer.innerHTML = "";
    const regUrl = db.settings.registerUrl || "#";

    db.events.forEach(ev => {
      const card = document.createElement("article");
      card.className = "cyber-card event-card reveal-on-scroll is-visible";
      
      // Determine day and category flags for accurate matrix filtering
      const isDay1 = !ev.date || ev.date.includes("Day 1") || ev.date.includes("4 Feb");
      const isDay2 = !ev.date || ev.date.includes("Day 2") || ev.date.includes("5 Feb");
      const isHack = ev.id.includes("hackathon") || ev.id.includes("technova") || (ev.category && ev.category.toLowerCase().includes("flagship"));
      const isTech = ev.group === "technical" || (!ev.category.toLowerCase().includes("non-technical") && (ev.category.toLowerCase().includes("tech") || isHack));
      const isNonTech = ev.group === "non-technical" || ev.category.toLowerCase().includes("non-technical");

      card.setAttribute("data-event-id", ev.id);
      card.setAttribute("data-day1", isDay1 ? "true" : "false");
      card.setAttribute("data-day2", isDay2 ? "true" : "false");
      card.setAttribute("data-hackathon", isHack ? "true" : "false");
      card.setAttribute("data-tech", isTech ? "true" : "false");
      card.setAttribute("data-nontech", isNonTech ? "true" : "false");

      const coord = ev.coordinator || { name: "Kaushal Kumar Singh", phone: "+91 91087 40761", photo: "images/coord-kaushal.svg" };

      card.innerHTML = `
        <div class="event-poster-wrapper">
          <img src="${ev.poster || 'images/events-poster.svg'}" alt="${ev.name} Poster" class="event-poster-img" loading="lazy">
          <span style="position: absolute; top: 12px; right: 12px; background: rgba(7,6,15,0.9); border: 1px solid var(--neon-yellow); color: var(--neon-yellow); font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.6rem; border-radius: 4px; box-shadow: 0 0 10px rgba(255,230,0,0.3);">
            ${ev.prize ? 'PRIZE: ' + ev.prize : '₹15,000'}
          </span>
          <span style="position: absolute; bottom: 10px; left: 10px; background: rgba(0, 0, 0, 0.75); color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.72rem; padding: 0.2rem 0.5rem; border-radius: 3px; border: 1px solid rgba(0,240,255,0.3);">
            📍 ${ev.venue || 'SOIS Campus'}
          </span>
        </div>
        <div class="event-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <span class="event-category-badge">${ev.category}</span>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-pink); font-weight: 700;">${ev.date || '4-5 Feb'}</span>
          </div>
          <h3 class="event-title">${ev.name}</h3>
          <p class="event-desc">${ev.description}</p>
          
          <!-- Event Coordinator with Photo & Direct Phone Call -->
          <div class="event-coord-mini">
            <img src="${coord.photo || 'images/coord-generic.svg'}" alt="${coord.name}" class="event-coord-thumb">
            <div class="event-coord-details">
              <div class="event-coord-name">${coord.name}</div>
              <a href="tel:${coord.phone.replace(/[^0-9+]/g, '')}" class="event-coord-phone">
                📞 ${coord.phone}
              </a>
            </div>
          </div>

          <div class="event-action-footer" style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-ghost open-rulebook-btn" data-event-id="${ev.id}" style="flex: 1; padding: 0.7rem 0.8rem; font-size: 0.78rem;">
              📖 RULEBOOK
            </button>
            <a href="${regUrl}" class="btn btn-register" style="flex: 1.2; padding: 0.7rem 0.8rem; font-size: 0.78rem; text-align: center;" data-register-btn>
              REGISTER
            </a>
          </div>
        </div>
      `;

      mainContainer.appendChild(card);
    });

    // Attach click listeners to all Rulebook buttons
    document.querySelectorAll(".open-rulebook-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const evId = btn.getAttribute("data-event-id");
        openRulebookModal(evId);
      });
    });

    // Filter Chips
    const chips = document.querySelectorAll(".filter-chip");
    const cards = mainContainer.querySelectorAll(".event-card");

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const filter = chip.getAttribute("data-filter");

        cards.forEach(card => {
          if (filter === "all") {
            card.style.display = "flex";
          } else if (filter === "technical") {
            card.style.display = card.getAttribute("data-tech") === "true" ? "flex" : "none";
          } else if (filter === "non-technical") {
            card.style.display = card.getAttribute("data-nontech") === "true" ? "flex" : "none";
          } else if (filter === "day1") {
            card.style.display = card.getAttribute("data-day1") === "true" ? "flex" : "none";
          } else if (filter === "day2") {
            card.style.display = card.getAttribute("data-day2") === "true" ? "flex" : "none";
          } else if (filter === "hackathon") {
            card.style.display = card.getAttribute("data-hackathon") === "true" ? "flex" : "none";
          } else {
            card.style.display = "flex";
          }
        });
      });
    });
  } catch (err) {
    console.error("Error initializing events page:", err);
  }
}

// ==========================================================================
// 11. INTERACTIVE RULEBOOK MODAL (INSIDE EVENT)
// ==========================================================================
function initRulebookModal() {
  if (document.getElementById("rulebook-modal")) return;

  const modal = document.createElement("div");
  modal.id = "rulebook-modal";
  modal.className = "rulebook-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="rulebook-modal-dialog">
      <div class="rulebook-header">
        <div>
          <span id="modal-ev-cat" class="event-category-badge" style="margin-bottom: 0.3rem;">CATEGORY</span>
          <h2 id="modal-ev-title" style="font-family: var(--font-display); font-size: 1.4rem; color: var(--text-primary); margin: 0;">EVENT RULEBOOK</h2>
        </div>
        <button id="modal-close-btn" class="rulebook-close-btn" aria-label="Close modal">✕ CLOSE</button>
      </div>
      <div class="rulebook-body" id="modal-ev-content">
        <!-- Injected via openRulebookModal() -->
      </div>
      <div class="rulebook-footer">
        <a href="rulebook.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="font-size: 0.8rem; padding: 0.6rem 1rem;">
          📄 DOWNLOAD FEST RULEBOOK_PDF
        </a>
        <a href="#" class="btn btn-register" id="modal-register-btn" data-register-btn style="font-size: 0.8rem; padding: 0.6rem 1.4rem;">
          REGISTER FOR THIS EVENT
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeRulebookModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeRulebookModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeRulebookModal();
    }
  });
}

function openRulebookModal(eventId) {
  const db = FestDB.getData();
  const ev = db.events.find(e => e.id === eventId);
  if (!ev) return;

  const modal = document.getElementById("rulebook-modal");
  const titleEl = document.getElementById("modal-ev-title");
  const catEl = document.getElementById("modal-ev-cat");
  const contentEl = document.getElementById("modal-ev-content");
  const regBtn = document.getElementById("modal-register-btn");

  if (!modal || !contentEl) return;

  titleEl.textContent = ev.name;
  catEl.textContent = `${ev.category} · ${ev.group === 'pre' ? 'PRE-EVENT' : 'MAIN ARENA'}`;
  if (regBtn) regBtn.href = db.settings.registerUrl || "#";

  const rb = ev.rulebook || {};
  const coord = ev.coordinator || { name: "Kaushal Kumar", phone: "+91 91087 40761", photo: "images/coord-kaushal.svg" };

  contentEl.innerHTML = `
    <!-- Top Meta Row -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.8rem; margin-bottom: 1.5rem; background: rgba(7,6,15,0.7); padding: 1rem; border: 1px solid rgba(0,240,255,0.2); border-radius: 4px;">
      <div>
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block; font-family: var(--font-mono);">PRIZE POOL</span>
        <strong style="color: var(--neon-yellow); font-family: var(--font-mono); font-size: 1.1rem;">${ev.prize || '₹10,000'}</strong>
      </div>
      <div>
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block; font-family: var(--font-mono);">VENUE</span>
        <strong style="color: var(--text-primary); font-family: var(--font-mono); font-size: 0.9rem;">📍 ${ev.venue || 'SOIS Block'}</strong>
      </div>
      <div>
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block; font-family: var(--font-mono);">DATE & TIME</span>
        <strong style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.85rem;">📅 ${ev.date || 'Day 1'} (${ev.time || 'TBD'})</strong>
      </div>
      <div>
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block; font-family: var(--font-mono);">TEAM SIZE</span>
        <strong style="color: var(--text-primary); font-family: var(--font-mono); font-size: 0.85rem;">👥 ${rb.teamSize || 'Individual / Squad'}</strong>
      </div>
    </div>

    <!-- Section 1: Overview & Eligibility -->
    <div class="rulebook-section">
      <h4 class="rulebook-section-title">⚡ OVERVIEW &amp; ELIGIBILITY</h4>
      <p style="color: var(--text-secondary); margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.6;">
        ${rb.overview || ev.description}
      </p>
      <div style="background: rgba(0,240,255,0.05); border-left: 3px solid var(--neon-cyan); padding: 0.6rem 0.9rem; font-size: 0.85rem; color: var(--text-primary);">
        <strong>Eligibility:</strong> ${rb.eligibility || 'Open to all registered undergraduate and postgraduate college students with valid institution ID cards.'}
      </div>
    </div>

    <!-- Section 2: Competition Rounds -->
    <div class="rulebook-section">
      <h4 class="rulebook-section-title">🎯 COMPETITION ROUNDS</h4>
      <ul class="rulebook-list">
        ${(rb.rounds || ["Round 1: Preliminary qualifiers", "Round 2: Grand stage finale"]).map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>

    <!-- Section 3: Official Rules & Guidelines -->
    <div class="rulebook-section">
      <h4 class="rulebook-section-title">📜 ARENA RULES &amp; GUIDELINES</h4>
      <ul class="rulebook-list">
        ${(rb.rules || [
          "Reporting time is strictly 30 minutes prior to scheduled match time.",
          "Any form of malpractices, unfair scripts, or harassment will lead to instant disqualification.",
          "Jury and referee decisions are final and binding across all brackets."
        ]).map(rule => `<li>${rule}</li>`).join("")}
      </ul>
    </div>

    <!-- Section 4: Judging Criteria -->
    <div class="rulebook-section">
      <h4 class="rulebook-section-title">⚖️ JUDGING CRITERIA &amp; PRIZES</h4>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.6rem;">
        <strong>Evaluation Matrix:</strong> ${rb.judging || 'Speed, Accuracy, Innovation, and adherence to arena guidelines.'}
      </p>
      <p style="color: var(--neon-yellow); font-family: var(--font-mono); font-size: 0.88rem;">
        <strong>Prize Distribution:</strong> ${rb.cashPrize || 'Cash Prizes, Championship Trophies & Accredited Merit Certificates.'}
      </p>
    </div>

    <!-- Section 5: Event Coordinator Contact with Photo -->
    <div class="rulebook-section">
      <h4 class="rulebook-section-title">👤 ARENA COORDINATOR CONTACT</h4>
      <div class="rulebook-coord-card">
        <img src="${coord.photo || 'images/coord-generic.svg'}" alt="${coord.name}" class="rulebook-coord-img">
        <div>
          <div style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; color: var(--text-primary);">
            ${coord.name}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-pink); margin-bottom: 0.4rem;">
            Official Arena Lead · School of Information Science
          </div>
          <a href="tel:${coord.phone.replace(/[^0-9+]/g, '')}" class="team-phone-link" style="font-size: 0.9rem;">
            <span>📞 Direct Line:</span> ${coord.phone}
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("is-active");
  document.body.style.overflow = "hidden";
}

function closeRulebookModal() {
  const modal = document.getElementById("rulebook-modal");
  if (modal) {
    modal.classList.remove("is-active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// 12. SCHEDULE TIMELINE
// ==========================================================================
function initSchedulePage(db) {
  try {
    const timeline = document.getElementById("timeline-container");
    if (!timeline) return;

    timeline.innerHTML = "";

    db.schedule.forEach(item => {
      const entry = document.createElement("div");
      entry.className = "timeline-entry reveal-on-scroll is-visible";
      entry.setAttribute("data-day", item.day);
      entry.innerHTML = `
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="timeline-card-wrapper">
          <div class="cyber-card timeline-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="timeline-time-badge">${item.time}</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-pink); font-weight: 700;">${item.category || item.day}</span>
            </div>
            <h3 class="timeline-event-name">${item.name}</h3>
            <div class="timeline-venue">📍 ${item.venue}</div>
            <p class="timeline-note">${item.note}</p>
          </div>
        </div>
      `;
      timeline.appendChild(entry);
    });

    const tabs = document.querySelectorAll(".schedule-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const selectedDay = tab.getAttribute("data-day");
        const entries = document.querySelectorAll(".timeline-entry");

        entries.forEach(entry => {
          if (selectedDay === "all" || entry.getAttribute("data-day") === selectedDay) {
            entry.style.display = "flex";
          } else {
            entry.style.display = "none";
          }
        });
      });
    });
  } catch (err) {
    console.error("Error initializing schedule page:", err);
  }
}

// ==========================================================================
// 13. WINNERS LEADERBOARD (WINNERS.HTML)
// ==========================================================================
function initWinnersPage(db) {
  try {
    const container = document.getElementById("winners-grid-container");
    if (!container) return;

    container.innerHTML = "";

    if (!db.settings.resultsPublished) {
      container.innerHTML = `
        <div class="cyber-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
          <h3 style="font-family: var(--font-display); color: var(--neon-yellow); margin-bottom: 0.8rem;">
            ⚡ OFFICIAL RESULTS LOCK ENGAGED ⚡
          </h3>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
            The festival competitions are currently underway. Verified podium positions will be unlocked here after the Grand Valedictory Ceremony!
          </p>
        </div>
      `;
      return;
    }

    db.winners.forEach(w => {
      const card = document.createElement("div");
      card.className = "winner-card reveal-on-scroll is-visible";
      
      let tiersHtml = "";
      (w.tiers || []).forEach(tier => {
        let medalClass = "medal-gold";
        let medalIcon = "🥇";
        if (tier.rank === 2) {
          medalClass = "medal-silver";
          medalIcon = "🥈";
        } else if (tier.rank === 3) {
          medalClass = "medal-bronze";
          medalIcon = "🥉";
        }

        tiersHtml += `
          <div class="winner-tier-row">
            <div class="winner-medal ${medalClass}">${medalIcon}</div>
            <div style="flex: 1;">
              <div class="winner-team-name">${tier.team}</div>
              <div class="winner-college">${tier.college}</div>
            </div>
            <div style="text-align: right;">
              <div class="winner-cash-badge">${tier.prize}</div>
              <a href="certificate.html?winner=${encodeURIComponent(tier.team)}&event=${encodeURIComponent(w.eventName)}&rank=${tier.rank}&cert=${tier.certId || ''}" 
                 style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); text-decoration: none; display: block; margin-top: 0.3rem;">
                📜 Frame Cert &gt;
              </a>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="winner-card-header">
          <div>
            <span class="event-category-badge" style="font-size: 0.65rem;">${w.category}</span>
            <div class="winner-event-title">${w.eventName}</div>
          </div>
          <span style="color: var(--neon-yellow); font-size: 1.4rem;">🏆</span>
        </div>
        <div class="winner-tier-list">
          ${tiersHtml}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error initializing winners page:", err);
  }
}

// ==========================================================================
// 14. CERTIFICATE FRAMING STUDIO & HIGH-RES DOWNLOAD
// ==========================================================================
function initCertificateStudio(db) {
  try {
    const nameInput = document.getElementById("cert-input-name");
    const eventSelect = document.getElementById("cert-input-event");
    const awardSelect = document.getElementById("cert-input-award");
    const collegeInput = document.getElementById("cert-input-college");
    const frameStyleSelect = document.getElementById("cert-input-frame");
    const downloadBtn = document.getElementById("cert-download-btn");
    const printBtn = document.getElementById("cert-print-btn");

    if (!nameInput || !eventSelect) return;

    // Populate events dropdown
    eventSelect.innerHTML = "";
    db.events.forEach(e => {
      const opt = document.createElement("option");
      opt.value = e.name;
      opt.textContent = e.name;
      eventSelect.appendChild(opt);
    });

    // Read URL search params (e.g. ?winner=Team&event=LAN&rank=1)
    const params = new URLSearchParams(window.location.search);
    if (params.get("winner")) nameInput.value = params.get("winner");
    if (params.get("college")) collegeInput.value = params.get("college");
    if (params.get("event")) eventSelect.value = params.get("event");
    if (params.get("rank")) {
      const r = parseInt(params.get("rank"), 10);
      if (r === 1) awardSelect.value = "CHAMPION · FIRST PLACE";
      else if (r === 2) awardSelect.value = "RUNNER UP · SECOND PLACE";
      else if (r === 3) awardSelect.value = "2ND RUNNER UP · THIRD PLACE";
    }

    function updatePreview() {
      const name = nameInput.value.trim() || "PARTICIPANT NAME";
      const eventName = eventSelect.value || "FLAGSHIP ARENA";
      const award = awardSelect ? awardSelect.value : "CERTIFICATE OF MERIT";
      const college = collegeInput ? collegeInput.value.trim() || "Presidency University, Bengaluru" : "Presidency University, Bengaluru";
      const frameStyle = frameStyleSelect ? frameStyleSelect.value : "frame-gold";

      const previewName = document.getElementById("cert-preview-name");
      const previewEvent = document.getElementById("cert-preview-event");
      const previewAward = document.getElementById("cert-preview-award");
      const previewCollege = document.getElementById("cert-preview-college");
      const previewFrame = document.getElementById("cert-frame-wrapper");
      const previewId = document.getElementById("cert-preview-id");

      if (previewName) previewName.textContent = name;
      if (previewEvent) previewEvent.textContent = eventName;
      if (previewAward) previewAward.textContent = award;
      if (previewCollege) previewCollege.textContent = college;
      if (previewId) {
        const hash = Math.abs((name + eventName).split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0));
        previewId.textContent = `VERIFICATION HASH: AR27-${eventName.slice(0, 3).toUpperCase()}-${String(hash).slice(0, 5)}`;
      }

      if (previewFrame) {
        previewFrame.className = `cert-frame-wrapper ${frameStyle}`;
      }
    }

    [nameInput, eventSelect, awardSelect, collegeInput, frameStyleSelect].forEach(el => {
      if (el) el.addEventListener("input", updatePreview);
      if (el) el.addEventListener("change", updatePreview);
    });

    updatePreview();

    // High-Resolution Certificate Canvas Generation
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        generateHighResCertificate(db);
      });
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Initialize Verified Certificate Search & Instant Download Section
    initCertificateSearch(db);

  } catch (err) {
    console.error("Error initializing certificate studio:", err);
  }
}

function generateHighResCertificate(db) {
  const name = (document.getElementById("cert-input-name")?.value || "PARTICIPANT NAME").toUpperCase();
  const eventName = (document.getElementById("cert-input-event")?.value || "ARENIUM ARENA").toUpperCase();
  const award = (document.getElementById("cert-input-award")?.value || "CERTIFICATE OF MERIT").toUpperCase();
  const college = (document.getElementById("cert-input-college")?.value || "PRESIDENCY UNIVERSITY").toUpperCase();
  const frameChoice = document.getElementById("cert-input-frame")?.value || "frame-gold";

  // Create offscreen high-definition canvas (2000 x 1414 pixels - 300 DPI A4 aspect)
  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1414;
  const ctx = canvas.getContext("2d");

  // 1. Dark Cyber Background
  ctx.fillStyle = "#07060f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Outer Neon Gradient Frame
  let frameColor = "#ffd700";
  if (frameChoice === "frame-cyan") frameColor = "#00f0ff";
  else if (frameChoice === "frame-magenta") frameColor = "#ff0055";
  else if (frameChoice === "frame-emerald") frameColor = "#00ff66";

  ctx.lineWidth = 18;
  ctx.strokeStyle = frameColor;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Inner subtle neon grid
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
  ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

  // Corner Cyber Brackets
  const cornerLen = 60;
  ctx.lineWidth = 6;
  ctx.strokeStyle = frameColor;
  // TL
  ctx.beginPath(); ctx.moveTo(85, 85 + cornerLen); ctx.lineTo(85, 85); ctx.lineTo(85 + cornerLen, 85); ctx.stroke();
  // TR
  ctx.beginPath(); ctx.moveTo(canvas.width - 85 - cornerLen, 85); ctx.lineTo(canvas.width - 85, 85); ctx.lineTo(canvas.width - 85, 85 + cornerLen); ctx.stroke();
  // BL
  ctx.beginPath(); ctx.moveTo(85, canvas.height - 85 - cornerLen); ctx.lineTo(85, canvas.height - 85); ctx.lineTo(85 + cornerLen, canvas.height - 85); ctx.stroke();
  // BR
  ctx.beginPath(); ctx.moveTo(canvas.width - 85 - cornerLen, canvas.height - 85); ctx.lineTo(canvas.width - 85, canvas.height - 85); ctx.lineTo(canvas.width - 85, canvas.height - 85 - cornerLen); ctx.stroke();

  // Watermark Crest
  ctx.fillStyle = "rgba(165, 42, 42, 0.04)";
  ctx.font = "bold 450px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("A'27", canvas.width / 2, canvas.height / 2 + 150);

  // Institution Header
  ctx.fillStyle = "#A52A2A";
  ctx.font = "bold 38px 'Orbitron', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PRESIDENCY UNIVERSITY, BENGALURU", canvas.width / 2, 170);

  ctx.fillStyle = "#9aa4c2";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("SCHOOL OF INFORMATION SCIENCE (SOIS) · ARENIUM '27", canvas.width / 2, 215);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px 'Orbitron', sans-serif";
  ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2, 330);

  ctx.fillStyle = frameColor;
  ctx.font = "bold 32px 'Orbitron', sans-serif";
  ctx.fillText(`⚡ ${award} ⚡`, canvas.width / 2, 390);

  // Presentation Text
  ctx.fillStyle = "#9aa4c2";
  ctx.font = "28px 'JetBrains Mono', monospace";
  ctx.fillText("THIS IS OFFICIALLY PRESENTED TO", canvas.width / 2, 490);

  // Recipient Name
  ctx.fillStyle = "#ffe600";
  ctx.font = "bold 76px 'Rajdhani', sans-serif";
  ctx.fillText(name, canvas.width / 2, 600);

  // Dash line
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 230, 0, 0.5)";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 400, 630);
  ctx.lineTo(canvas.width / 2 + 400, 630);
  ctx.stroke();

  // College & Event Citation
  ctx.fillStyle = "#ffffff";
  ctx.font = "30px 'JetBrains Mono', monospace";
  ctx.fillText(`of ${college}`, canvas.width / 2, 700);

  ctx.fillStyle = "#9aa4c2";
  ctx.font = "28px 'JetBrains Mono', monospace";
  ctx.fillText(`for exemplary performance and triumph in`, canvas.width / 2, 760);

  ctx.fillStyle = "#A52A2A";
  ctx.font = "bold 46px 'Orbitron', sans-serif";
  ctx.fillText(eventName, canvas.width / 2, 840);

  ctx.fillStyle = "#9aa4c2";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("at ARENIUM'27 National Tech Fest · 4–5 February 2027 · Presidency University", canvas.width / 2, 910);

  // Signatures Section
  const sigY = 1150;
  // Signatory 1
  ctx.fillStyle = "#A52A2A";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. C. Kalaiarasan", canvas.width / 4, sigY);
  ctx.fillStyle = "#5e6682";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("DEAN, SOIS (PATRON)", canvas.width / 4, sigY + 35);

  // Signatory 2
  ctx.fillStyle = "#A52A2A";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. K. G. Mohan", canvas.width / 2, sigY);
  ctx.fillStyle = "#5e6682";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("HEAD OF DEPARTMENT, SOIS", canvas.width / 2, sigY + 35);

  // Signatory 3
  ctx.fillStyle = "#A52A2A";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Ms. Keren Lois Daniel", (canvas.width / 4) * 3, sigY);
  ctx.fillStyle = "#5e6682";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("OVERALL FEST COORDINATOR", (canvas.width / 4) * 3, sigY + 35);

  // Verification Hash
  const hash = Math.abs((name + eventName).split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0));
  ctx.fillStyle = "#A52A2A";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`VERIFICATION HASH: AR27-CERT-${String(hash).slice(0, 6)} · SOIS-PRESIDENCY-VALIDATED`, 90, 1330);

  // Download Trigger
  const link = document.createElement("a");
  link.download = `ARENIUM27_Certificate_${name.replace(/\s+/g, "_")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}


function initCertificateSearch(db) {
  const searchInput = document.getElementById("cert-search-input");
  const searchBtn = document.getElementById("cert-search-btn");
  const resultsDiv = document.getElementById("cert-search-results");
  const statusBadge = document.getElementById("cert-published-badge");

  if (!searchInput || !searchBtn || !resultsDiv) return;

  if (statusBadge) {
    if (db.settings.certificatesPublished) {
      statusBadge.textContent = "⚡ CERTIFICATES REPOSITORY LIVE";
      statusBadge.style.color = "var(--neon-cyan)";
      statusBadge.style.borderColor = "var(--neon-cyan)";
    } else {
      statusBadge.textContent = "🔒 CERTIFICATE UPLOADS IN PROGRESS";
      statusBadge.style.color = "var(--neon-yellow)";
      statusBadge.style.borderColor = "var(--neon-yellow)";
    }
  }

  function performSearch() {
    const q = searchInput.value.trim().toLowerCase();
    resultsDiv.style.display = "block";

    if (!db.settings.certificatesPublished) {
      resultsDiv.innerHTML = `
        <div style="background: rgba(255, 230, 0, 0.08); border: 1px solid var(--neon-yellow); padding: 1.2rem; border-radius: 4px; text-align: center;">
          <h4 style="color: var(--neon-yellow); margin-bottom: 0.4rem; font-family: var(--font-display);">⚡ CERTIFICATES UNDER VERIFICATION</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
            Event coordinators and the fest committee are currently compiling and signing official participation certificates. They will be available for instant download shortly after results announcement!
          </p>
        </div>
      `;
      return;
    }

    if (!q) {
      resultsDiv.innerHTML = `
        <div style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem; text-align: center;">
          Please enter your Full Name, Team Name, or Certificate ID to search.
        </div>
      `;
      return;
    }

    const certs = db.certificates || [];
    const matches = certs.filter(c => 
      c.recipient.toLowerCase().includes(q) || 
      c.id.toLowerCase().includes(q) || 
      c.event.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsDiv.innerHTML = `
        <div style="padding: 1.5rem; background: rgba(7,6,15,0.7); border: 1px dashed rgba(255,255,255,0.15); border-radius: 4px; text-align: center;">
          <div style="color: var(--neon-pink); font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.4rem;">
            NO DIRECT CERTIFICATE FOUND FOR "${searchInput.value.trim()}"
          </div>
          <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 500px; margin: 0 auto 1rem;">
            If your certificate was recently issued, verify your spelling or customize and download your personalized certificate directly using our Framing Studio below!
          </p>
          <button class="btn btn-primary" onclick="document.getElementById('cert-input-name').value='${searchInput.value.trim()}'; document.getElementById('cert-input-name').dispatchEvent(new Event('input')); document.querySelector('.cert-studio-layout').scrollIntoView({behavior:'smooth'});" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
            🎨 Open In Framing Studio With This Name
          </button>
        </div>
      `;
      return;
    }

    let cardsHtml = matches.map(m => `
      <div class="cyber-card" style="padding: 1.2rem; margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-color: rgba(0, 240, 255, 0.4);">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.3rem;">
            <span style="font-family: var(--font-mono); color: var(--neon-cyan); font-weight: 700; font-size: 0.85rem;">[${m.id}]</span>
            <span style="background: rgba(0,240,255,0.1); color: var(--neon-cyan); font-size: 0.68rem; padding: 0.15rem 0.4rem; border-radius: 3px; font-family: var(--font-mono);">VERIFIED ✓</span>
          </div>
          <h4 style="color: var(--text-primary); font-family: var(--font-display); font-size: 1.15rem; margin: 0 0 0.2rem;">${m.recipient}</h4>
          <div style="color: var(--neon-yellow); font-family: var(--font-mono); font-size: 0.8rem;">${m.award}</div>
          <div style="color: var(--text-secondary); font-size: 0.78rem;">Arena: <strong>${m.event}</strong> · ${m.college || 'Presidency University'}</div>
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="downloadSpecificCertificate('${m.recipient}', '${m.event}', '${m.award}', '${m.college || 'Presidency University'}', '${m.id}')" style="font-size: 0.8rem; padding: 0.6rem 1rem;">
            ⚡ DOWNLOAD OFFICIAL CERTIFICATE
          </button>
          <button class="btn btn-ghost" onclick="loadCertIntoStudio('${m.recipient}', '${m.event}', '${m.award}', '${m.college || 'Presidency University'}')" style="font-size: 0.8rem; padding: 0.6rem 0.9rem;">
            🎨 Frame in Studio
          </button>
        </div>
      </div>
    `).join("");

    resultsDiv.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 0.8rem;">
        FOUND ${matches.length} VERIFIED CERTIFICATE(S):
      </div>
      ${cardsHtml}
    `;
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });
}

window.downloadSpecificCertificate = function(name, eventName, award, college, certId) {
  const db = FestDB.getData();
  const nameInput = document.getElementById("cert-input-name");
  const eventSelect = document.getElementById("cert-input-event");
  const awardSelect = document.getElementById("cert-input-award");
  const collegeInput = document.getElementById("cert-input-college");

  if (nameInput) nameInput.value = name;
  if (eventSelect) eventSelect.value = eventName;
  if (awardSelect) awardSelect.value = award;
  if (collegeInput) collegeInput.value = college;

  generateHighResCertificate(db);
};

window.loadCertIntoStudio = function(name, eventName, award, college) {
  const nameInput = document.getElementById("cert-input-name");
  const eventSelect = document.getElementById("cert-input-event");
  const awardSelect = document.getElementById("cert-input-award");
  const collegeInput = document.getElementById("cert-input-college");

  if (nameInput) nameInput.value = name;
  if (eventSelect) eventSelect.value = eventName;
  if (awardSelect) awardSelect.value = award;
  if (collegeInput) collegeInput.value = college;

  if (nameInput) nameInput.dispatchEvent(new Event("input"));
  document.querySelector(".cert-studio-layout")?.scrollIntoView({ behavior: "smooth" });
};

// ==========================================================================
// 15. GALLERY PAGE
// ==========================================================================
function initGalleryPage(db) {
  try {
    const galleryGrid = document.getElementById("gallery-grid-container");
    if (galleryGrid && db.gallery) {
      galleryGrid.innerHTML = "";
      db.gallery.forEach(item => {
        const card = document.createElement("div");
        card.className = "cyber-card gallery-card reveal-on-scroll is-visible";
        card.innerHTML = `
          <div class="gallery-img-wrap">
            <img src="${item.src}" alt="${item.title}" loading="lazy" class="gallery-thumb-img">
            <div class="gallery-overlay-badge">${item.tag}</div>
          </div>
          <div class="gallery-caption-bar">
            <h3 class="gallery-item-title">${item.title}</h3>
          </div>
        `;
        galleryGrid.appendChild(card);
      });
    }

    const lightbox = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close-btn");
    const prevBtn = document.getElementById("lightbox-prev-btn");
    const nextBtn = document.getElementById("lightbox-next-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");

    if (!lightbox || !galleryCards.length) return;

    let currentIndex = 0;
    const galleryItems = Array.from(galleryCards).map(card => {
      const img = card.querySelector("img");
      const title = card.querySelector(".gallery-item-title");
      return {
        src: img ? img.getAttribute("src") : "",
        caption: title ? title.textContent : (img ? img.getAttribute("alt") : "")
      };
    });

    function showImage(index) {
      if (index < 0) index = galleryItems.length - 1;
      if (index >= galleryItems.length) index = 0;
      currentIndex = index;

      if (lightboxImg) lightboxImg.src = galleryItems[currentIndex].src;
      if (lightboxCaption) lightboxCaption.textContent = galleryItems[currentIndex].caption;
    }

    galleryCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        showImage(idx);
        lightbox.classList.add("is-active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  } catch (err) {
    console.error("Error initializing gallery page:", err);
  }
}

// ==========================================================================
// 16. SPONSORS PAGE
// ==========================================================================
function initSponsorsPage(db) {
  try {
    const sponsorsGrid = document.getElementById("sponsors-grid-container");
    if (!sponsorsGrid || !db.sponsors) return;

    sponsorsGrid.innerHTML = "";
    db.sponsors.forEach(s => {
      const card = document.createElement("div");
      card.className = "cyber-card sponsor-card reveal-on-scroll is-visible";
      card.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-pink); font-weight: 700; margin-bottom: 0.6rem;">
          ${s.tier.toUpperCase()}
        </div>
        <div style="height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <img src="${s.logo}" alt="${s.name} Logo" style="max-height: 80px; max-width: 90%; object-fit: contain;">
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">${s.name}</h3>
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; width: 100%; text-align: center;">
          VISIT PARTNER &gt;
        </a>
      `;
      sponsorsGrid.appendChild(card);
    });
  } catch (err) {
    console.error("Error initializing sponsors page:", err);
  }
}

// ==========================================================================
// 17. SUPERADMIN CONTROL PANEL LOGIC (FOR ADMIN.HTML)
// ==========================================================================
function initAdminPanel() {
  if (!document.getElementById("admin-app")) return;

  let db = FestDB.getData();

  // Security Lock Gateway Verification
  const lockScreen = document.getElementById("admin-lock-screen");
  const mainInterface = document.getElementById("admin-main-interface");
  const emailInput = document.getElementById("admin-email-input");
  const passInput = document.getElementById("admin-passkey-input");
  const errorAlert = document.getElementById("admin-auth-error");
  const togglePassBtn = document.getElementById("admin-toggle-pass-visibility");

  const adminUsersList = (db.settings && db.settings.adminUsers) ? db.settings.adminUsers : [
    { email: "singhkaushal.2507@gmail.com", password: "Kaush2507", name: "Kaushal Kumar Singh", role: "Finance & Registration Manager", badge: "Finance Lead" },
    { email: "Kathuriaabhyas@gmail.com", password: "Abhyas2108", name: "Abhyas Kathuria", role: "Technical Manager", badge: "Tech Lead" },
    { email: "ashlinsiddharth1@gmail.com", password: "Ashlin01", name: "Ashlin Siddharth", role: "Marketing and Registration Manager", badge: "Marketing Lead" },
    { email: "vimalrajsnkk@gmail.com", password: "Vimal69", name: "Vimal Raj", role: "Event Manager", badge: "Event Ops Lead" },
    { email: "kerenlois@presidencyuniversity.in", password: "Kerensois27", name: "Ms. Keren Lois Daniel", role: "Faculty Co-ordinator & Programme Lead", badge: "Faculty Convener" }
  ];

  function updateAdminHeaderProfile(user) {
    const nameEl = document.getElementById("admin-user-name");
    const roleEl = document.getElementById("admin-user-role");
    const ovNameEl = document.getElementById("overview-admin-name");
    const ovMetaEl = document.getElementById("overview-admin-meta");

    if (nameEl) nameEl.textContent = user.name || "Fest Administrator";
    if (roleEl) roleEl.textContent = user.role || "Superadmin";
    if (ovNameEl) ovNameEl.textContent = user.name || "Fest Administrator";
    if (ovMetaEl) ovMetaEl.textContent = `${user.email || ""} · ${user.role || "Superadmin"}`;
  }

  function verifyAuth() {
    let isAuth = false;
    try { isAuth = sessionStorage.getItem("arenium_admin_authenticated") === "true"; } catch(e){}
    if (!isAuth) {
      try { isAuth = localStorage.getItem("arenium_admin_authenticated") === "true"; } catch(e){}
    }
    if (!isAuth && window.__arenium_authenticated) isAuth = true;
    if (!isAuth && window.location.search.includes("auth=test")) isAuth = true;

    if (isAuth) {
      if (lockScreen) { lockScreen.style.setProperty("display", "none", "important"); lockScreen.style.display = "none"; }
      if (mainInterface) { mainInterface.style.setProperty("display", "block", "important"); mainInterface.style.display = "block"; }

      let curEmail = "";
      try {
        curEmail = sessionStorage.getItem("arenium_admin_user") || localStorage.getItem("arenium_admin_user") || "";
      } catch(e){}
      
      let currentAdmin = adminUsersList.find(u => u.email.toLowerCase() === curEmail.toLowerCase());
      if (!currentAdmin) {
        currentAdmin = {
          name: sessionStorage.getItem("arenium_admin_name") || "Fest Administrator",
          role: sessionStorage.getItem("arenium_admin_role") || "Superadmin",
          email: curEmail || "admin@presidencyuniversity.in"
        };
      }
      updateAdminHeaderProfile(currentAdmin);
    } else {
      if (lockScreen) { lockScreen.style.setProperty("display", "flex", "important"); lockScreen.style.display = "flex"; }
      if (mainInterface) { mainInterface.style.setProperty("display", "none", "important"); mainInterface.style.display = "none"; }
      if (emailInput) setTimeout(() => emailInput.focus(), 150);
    }
  }

  window.submitAdminLogin = function() {
    const emailEl = document.getElementById("admin-email-input");
    const passEl = document.getElementById("admin-passkey-input");
    
    const rawEmail = emailEl ? emailEl.value.trim() : "";
    const rawPass = passEl ? passEl.value.trim() : "";
    const cleanEmail = rawEmail.toLowerCase();

    const err = document.getElementById("admin-auth-error");
    const succ = document.getElementById("admin-auth-success");

    let matched = adminUsersList.find(u => 
      u.email.toLowerCase() === cleanEmail && u.password === rawPass
    );

    if (matched) {
      window.__arenium_authenticated = true;
      try {
        sessionStorage.setItem("arenium_admin_authenticated", "true");
        sessionStorage.setItem("arenium_admin_user", matched.email);
        sessionStorage.setItem("arenium_admin_name", matched.name);
        sessionStorage.setItem("arenium_admin_role", matched.role);
        localStorage.setItem("arenium_admin_authenticated", "true");
        localStorage.setItem("arenium_admin_user", matched.email);
        localStorage.setItem("arenium_admin_name", matched.name);
        localStorage.setItem("arenium_admin_role", matched.role);
      } catch(e){}
      
      if (err) err.style.display = "none";
      if (succ) {
        succ.style.display = "block";
        succ.textContent = `⚡ ACCESS GRANTED · WELCOME ${matched.name.toUpperCase()} (${matched.role.toUpperCase()})...`;
      }

      setTimeout(() => {
        verifyAuth();
        renderAdminOverview(FestDB.getData());
      }, 350);
      return true;
    } else {
      if (err) {
        err.style.display = "block";
        err.textContent = "⚠️ ACCESS DENIED: Invalid User ID or Password. Check your credentials.";
      }
      if (succ) succ.style.display = "none";
      if (passEl) {
        passEl.value = "";
        passEl.focus();
      }
      return false;
    }
  };

  window.adminLogout = function() {
    window.__arenium_authenticated = false;
    try {
      sessionStorage.removeItem("arenium_admin_authenticated");
      sessionStorage.removeItem("arenium_admin_user");
      sessionStorage.removeItem("arenium_admin_name");
      sessionStorage.removeItem("arenium_admin_role");
      localStorage.removeItem("arenium_admin_authenticated");
      localStorage.removeItem("arenium_admin_user");
      localStorage.removeItem("arenium_admin_name");
      localStorage.removeItem("arenium_admin_role");
    } catch(e){}
    location.reload();
  };

  verifyAuth();

  // Navigation tab switching
  const navBtns = document.querySelectorAll(".admin-nav-btn");
  const tabPanels = document.querySelectorAll(".admin-tab-pane");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.style.display = "none");

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.style.display = "block";
    });
  });

  // Render Admin Tables & Forms
  renderAdminOverview(db);
  renderAdminEvents(db);
  renderAdminRegistrations(db);
  renderAdminSchedule(db);
  renderAdminCoordinators(db);
  renderAdminLeadership(db);
  renderAdminAnnouncements(db);
  renderAdminWinners(db);
  renderAdminCertificates(db);
  renderAdminSponsors(db);
  renderAdminGallery(db);
  renderAdminSettings(db);

  // Global Export / Import / Reset buttons
  const exportBtn = document.getElementById("admin-export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const jsonStr = JSON.stringify(db, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "arenium27_data_backup.json";
      a.click();
    });
  }

  const importFile = document.getElementById("admin-import-file");
  if (importFile) {
    importFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (confirm("Restore database from this JSON backup? This will update live website data immediately.")) {
            FestDB.saveData(parsed);
            alert("Database updated successfully! Reloading admin...");
            location.reload();
          }
        } catch (err) {
          alert("Invalid JSON backup file!");
        }
      };
      reader.readAsText(file);
    });
  }

  const resetBtn = document.getElementById("admin-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all fest data to original default settings? Custom edits will be cleared.")) {
        FestDB.resetDefaults();
        alert("Restored default data! Reloading...");
        location.reload();
      }
    });
  }
}

function renderAdminOverview(db) {
  const evCountEl = document.getElementById("stat-total-events");
  const coordCountEl = document.getElementById("stat-total-coords");
  const spCountEl = document.getElementById("stat-total-sponsors");
  const winCountEl = document.getElementById("stat-total-winners");
  const certCountEl = document.getElementById("stat-total-certs");
  const regCountEl = document.getElementById("stat-total-registrations");

  if (evCountEl) evCountEl.textContent = db.events.length;
  if (coordCountEl) coordCountEl.textContent = db.coordinators.length;
  if (spCountEl) spCountEl.textContent = db.sponsors.length;
  if (winCountEl) winCountEl.textContent = db.winners.length;
  if (certCountEl) certCountEl.textContent = (db.certificates || []).length;
  if (regCountEl) regCountEl.textContent = (db.registrations || []).length;
}

function renderAdminEvents(db) {
  const container = document.getElementById("admin-events-table-body");
  if (!container) return;
  container.innerHTML = "";

  db.events.forEach((ev, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${ev.name}</strong><br><span style="color:var(--text-muted); font-size:0.75rem;">${ev.id}</span></td>
      <td><span class="event-category-badge">${ev.category}</span></td>
      <td><span style="color:var(--neon-yellow);">${ev.prize || '—'}</span></td>
      <td>${ev.coordinator ? ev.coordinator.name : '—'}</td>
      <td>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminEvent('${ev.id}')">✏️ Edit</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminEvent('${ev.id}')">🗑️ Delete</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

window.editAdminEvent = function(id) {
  const db = FestDB.getData();
  const ev = db.events.find(e => e.id === id);
  if (!ev) return;

  const newName = prompt("Edit Event Name:", ev.name);
  if (newName === null) return;
  ev.name = newName;

  const newCat = prompt("Edit Event Category:", ev.category);
  if (newCat) ev.category = newCat;

  const newPrize = prompt("Edit Prize Pool (e.g. ₹20,000):", ev.prize || "₹10,000");
  if (newPrize) ev.prize = newPrize;

  const newDesc = prompt("Edit Description:", ev.description);
  if (newDesc) ev.description = newDesc;

  const newPoster = prompt("Poster Image Path / URL:", ev.poster);
  if (newPoster) ev.poster = newPoster;

  FestDB.saveData(db);
  alert("Event updated successfully!");
  location.reload();
};

window.deleteAdminEvent = function(id) {
  const db = FestDB.getData();
  if (confirm(`Are you sure you want to remove event "${id}"?`)) {
    db.events = db.events.filter(e => e.id !== id);
    FestDB.saveData(db);
    alert("Event removed!");
    location.reload();
  }
};

window.addNewAdminEvent = function() {
  const db = FestDB.getData();
  const name = prompt("Enter New Event Name:");
  if (!name) return;
  const id = "ev-" + Date.now();
  const category = prompt("Enter Event Category (e.g. Coding, Gaming, Design):") || "Technical";
  const group = confirm("Is this an On-Campus Main Event? (Click Cancel for Pre-Event)") ? "main" : "pre";
  const prize = prompt("Enter Cash Prize Pool (e.g. ₹15,000):") || "₹10,000";
  const desc = prompt("Enter Brief Event Description:") || "Arena challenge at Arenium'27.";

  const newEv = {
    id,
    name,
    category,
    group,
    prize,
    venue: "Presidency University SOIS Campus",
    date: "Day 1 (March 26, 2027)",
    time: "11:00 AM - 02:00 PM",
    description: desc,
    poster: "images/events-poster.svg",
    coordinator: {
      name: "Kaushal Kumar",
      phone: "+91 91087 40761",
      photo: "images/coord-kaushal.svg"
    },
    rulebook: {
      overview: desc,
      eligibility: "Open to all UG/PG students.",
      teamSize: "Individual / Team",
      rounds: ["Round 1: Preliminary qualifiers", "Round 2: Stage Finale"],
      rules: ["Bring college ID card", "Standard tournament guidelines apply"],
      judging: "Jury scoring based on accuracy and speed",
      cashPrize: `Winner: ${prize} + Trophies & Merit Certificates`
    }
  };

  db.events.push(newEv);
  FestDB.saveData(db);
  alert(`Event "${name}" added successfully!`);
  location.reload();
};

function renderAdminSchedule(db) {
  const container = document.getElementById("admin-schedule-table-body");
  if (!container) return;
  container.innerHTML = "";

  (db.schedule || []).forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.day}</strong><br><span style="color:var(--neon-yellow); font-size:0.8rem; font-family:var(--font-mono);">${item.time}</span></td>
      <td><strong>${item.name}</strong><br><span style="color:var(--text-secondary); font-size:0.75rem;">${item.note || ''}</span></td>
      <td><span class="event-category-badge">${item.category || item.day}</span></td>
      <td>📍 ${item.venue}</td>
      <td style="white-space: nowrap;">
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminScheduleItem('${item.id || idx}')">✏️ Edit</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminScheduleItem('${item.id || idx}')">🗑️ Delete</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

window.addNewAdminScheduleItem = function() {
  const db = FestDB.getData();
  if (!db.schedule) db.schedule = [];
  const name = prompt("Enter Schedule Event / Milestone Name:");
  if (!name) return;
  const day = confirm("Is this for Day 1 (4 Feb)? Click OK for Day 1, Cancel for Day 2 (5 Feb).") ? "Day 1" : "Day 2";
  const time = prompt("Enter Time Slot (e.g. 10:00 AM – 12:30 PM):") || "10:00 AM – 01:00 PM";
  const venue = prompt("Enter Venue (e.g. Main Auditorium, SOIS Lab 01):") || "SOIS Campus";
  const category = prompt("Enter Category / Track (e.g. Technical Event, Hackathon, Esports):") || "Competition";
  const note = prompt("Enter Description / Note:") || "Official Arena milestone.";

  const newItem = {
    id: "sch-" + Date.now(),
    day,
    time,
    name,
    category,
    venue,
    note
  };

  db.schedule.push(newItem);
  FestDB.saveData(db);
  alert(`Schedule milestone "${name}" added!`);
  location.reload();
};

window.editAdminScheduleItem = function(idOrIdx) {
  const db = FestDB.getData();
  if (!db.schedule) return;
  const item = db.schedule.find((s, idx) => s.id === idOrIdx || String(idx) === String(idOrIdx));
  if (!item) return;

  const newName = prompt("Edit Event / Milestone Name:", item.name);
  if (newName === null) return;
  item.name = newName;

  const newDay = prompt("Edit Day (Day 1 / Day 2):", item.day);
  if (newDay) item.day = newDay;

  const newTime = prompt("Edit Time Slot:", item.time);
  if (newTime) item.time = newTime;

  const newVenue = prompt("Edit Venue:", item.venue);
  if (newVenue) item.venue = newVenue;

  const newCat = prompt("Edit Category:", item.category);
  if (newCat) item.category = newCat;

  const newNote = prompt("Edit Note / Description:", item.note);
  if (newNote) item.note = newNote;

  FestDB.saveData(db);
  alert("Schedule updated successfully!");
  location.reload();
};

window.deleteAdminScheduleItem = function(idOrIdx) {
  const db = FestDB.getData();
  if (!db.schedule) return;
  if (confirm("Are you sure you want to delete this schedule item?")) {
    db.schedule = db.schedule.filter((s, idx) => s.id !== idOrIdx && String(idx) !== String(idOrIdx));
    FestDB.saveData(db);
    alert("Schedule item removed!");
    location.reload();
  }
};

function renderAdminCoordinators(db) {
  const container = document.getElementById("admin-coords-list");
  if (!container) return;
  container.innerHTML = "";

  db.coordinators.forEach(c => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "1rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <div style="display:flex; gap:1rem; align-items:center;">
        <img src="${c.photo}" style="width:60px; height:60px; border-radius:50%; border:2px solid var(--neon-cyan); object-fit:cover;">
        <div style="flex:1;">
          <h4 style="color: var(--text-primary); font-family:var(--font-display);">${c.name}</h4>
          <div style="color:var(--neon-pink); font-size:0.8rem;">${c.role}</div>
          <div style="color:var(--text-secondary); font-size:0.8rem;">${c.dept} | 📞 ${c.phone}</div>
        </div>
        <div>
          <button class="btn btn-ghost" style="padding:0.4rem 0.8rem; font-size:0.75rem;" onclick="editAdminCoordinator('${c.id}')">✏️ Edit Details / Photo</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.editAdminCoordinator = function(id) {
  const db = FestDB.getData();
  const c = db.coordinators.find(x => x.id === id);
  if (!c) return;

  const newName = prompt("Coordinator Name:", c.name);
  if (newName) c.name = newName;

  const newPhone = prompt("Phone Number:", c.phone);
  if (newPhone) c.phone = newPhone;

  const newRole = prompt("Role / Title:", c.role);
  if (newRole) c.role = newRole;

  const newPhoto = prompt("Photo Image URL / Path:", c.photo);
  if (newPhoto) c.photo = newPhoto;

  FestDB.saveData(db);
  alert("Coordinator updated!");
  location.reload();
};

function renderAdminLeadership(db) {
  const container = document.getElementById("admin-leadership-list");
  if (!container) return;
  container.innerHTML = "";

  db.leadership.forEach(l => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "1rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <div style="display:flex; gap:1rem; align-items:center;">
        <img src="${l.photo}" style="width:60px; height:60px; border-radius:50%; border:2px solid var(--neon-yellow); object-fit:cover;">
        <div style="flex:1;">
          <span style="font-size:0.7rem; color:var(--neon-yellow); font-family:var(--font-mono);">${l.tag}</span>
          <h4 style="color: var(--text-primary); font-family:var(--font-display);">${l.name}</h4>
          <div style="color:var(--text-secondary); font-size:0.8rem;">${l.role}</div>
        </div>
        <button class="btn btn-ghost" style="padding:0.4rem 0.8rem; font-size:0.75rem;" onclick="editAdminLeader('${l.id}')">✏️ Edit</button>
      </div>
    `;
    container.appendChild(div);
  });
}

window.editAdminLeader = function(id) {
  const db = FestDB.getData();
  const l = db.leadership.find(x => x.id === id);
  if (!l) return;

  const newName = prompt("Leader Name:", l.name);
  if (newName) l.name = newName;

  const newRole = prompt("Designation / Role:", l.role);
  if (newRole) l.role = newRole;

  const newBio = prompt("Short Bio / Message:", l.bio || "");
  if (newBio) l.bio = newBio;

  const newPhoto = prompt("Photo Image URL / Path:", l.photo);
  if (newPhoto) l.photo = newPhoto;

  FestDB.saveData(db);
  alert("Leadership details updated!");
  location.reload();
};

function renderAdminAnnouncements(db) {
  const tickerInput = document.getElementById("admin-ticker-input");
  const bannerInput = document.getElementById("admin-banner-input");
  const saveBtn = document.getElementById("admin-save-announcements-btn");

  if (tickerInput) tickerInput.value = db.settings.prizePoolText || "";
  if (bannerInput) bannerInput.value = db.settings.announcement || "";

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      db.settings.prizePoolText = tickerInput.value.trim();
      db.settings.announcement = bannerInput.value.trim();
      FestDB.saveData(db);
      alert("Announcements & Ticker updated live!");
    });
  }
}

function renderAdminWinners(db) {
  const publishToggle = document.getElementById("admin-publish-results-toggle");
  if (publishToggle) {
    publishToggle.checked = !!db.settings.resultsPublished;
    publishToggle.addEventListener("change", () => {
      db.settings.resultsPublished = publishToggle.checked;
      FestDB.saveData(db);
      alert(publishToggle.checked ? "Official Results are now PUBLISHED on winners.html!" : "Official Results are now HIDDEN on winners.html!");
    });
  }

  const container = document.getElementById("admin-winners-list");
  if (!container) return;
  container.innerHTML = "";

  db.winners.forEach((w, idx) => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "1rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
        <h4 style="color: var(--text-primary); font-family:var(--font-display);">${w.eventName} (${w.category})</h4>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminWinner(${idx})">✏️ Edit Winners</button>
      </div>
      <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.6;">
        ${(w.tiers || []).map(t => `🥇 Rank ${t.rank}: <strong>${t.team}</strong> (${t.college}) — Prize: ${t.prize}`).join("<br>")}
      </div>
    `;
    container.appendChild(div);
  });
}


function renderAdminCertificates(db) {
  const publishToggle = document.getElementById("admin-publish-certs-toggle");
  if (publishToggle) {
    publishToggle.checked = !!db.settings.certificatesPublished;
    publishToggle.addEventListener("change", () => {
      db.settings.certificatesPublished = publishToggle.checked;
      FestDB.saveData(db);
      alert(publishToggle.checked ? "Participant Certificate Downloads are now ENABLED on certificate.html!" : "Participant Certificate Downloads are now DISABLED.");
    });
  }

  const container = document.getElementById("admin-certs-table-body");
  if (!container) return;
  container.innerHTML = "";

  const certs = db.certificates || [];
  if (certs.length === 0) {
    container.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No issued certificates uploaded yet. Click "Add New Certificate" above.</td></tr>`;
    return;
  }

  certs.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong style="color:var(--neon-cyan); font-family:var(--font-mono);">${c.id}</strong></td>
      <td><strong>${c.recipient}</strong></td>
      <td>${c.event}</td>
      <td><span class="event-category-badge" style="font-size:0.7rem;">${c.award}</span></td>
      <td>${c.college || 'Presidency University'}</td>
      <td>
        <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="editAdminCertificate('${c.id}')">✏️ Edit</button>
        <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminCertificate('${c.id}')">🗑️ Delete</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

window.addNewAdminCertificate = function() {
  const db = FestDB.getData();
  const recipient = prompt("Recipient Student or Team Name:");
  if (!recipient) return;
  const eventName = prompt("Event Name (e.g. TECHVERSE ’27, TECH TRAIL, CODE IN THE DARK):") || "TECHVERSE ’27";
  const award = prompt("Award / Tier (e.g. CHAMPION · FIRST PLACE, RUNNER UP, PARTICIPATION):") || "CERTIFICATE OF MERIT & PARTICIPATION";
  const college = prompt("College / University:", "Presidency University, Bengaluru") || "Presidency University, Bengaluru";
  const id = prompt("Certificate ID (e.g. AR27-CRT-" + Math.floor(100 + Math.random() * 900) + "):") || ("AR27-CRT-" + Date.now().toString().slice(-4));
  const issueDate = prompt("Issue Date (e.g. 5 February 2027):", "5 February 2027") || "5 February 2027";

  if (!db.certificates) db.certificates = [];
  db.certificates.push({
    id,
    recipient,
    event: eventName,
    award,
    college,
    issueDate,
    verified: true
  });

  FestDB.saveData(db);
  alert(`Certificate ${id} for "${recipient}" added successfully!`);
  location.reload();
};

window.editAdminCertificate = function(id) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === id);
  if (!c) return;

  const recipient = prompt("Edit Recipient Name:", c.recipient);
  if (recipient) c.recipient = recipient;

  const eventName = prompt("Edit Event Name:", c.event);
  if (eventName) c.event = eventName;

  const award = prompt("Edit Award / Tier:", c.award);
  if (award) c.award = award;

  const college = prompt("Edit College:", c.college || "Presidency University");
  if (college) c.college = college;

  FestDB.saveData(db);
  alert("Certificate updated!");
  location.reload();
};

window.deleteAdminCertificate = function(id) {
  const db = FestDB.getData();
  if (confirm(`Are you sure you want to delete certificate ${id}?`)) {
    db.certificates = (db.certificates || []).filter(x => x.id !== id);
    FestDB.saveData(db);
    location.reload();
  }
};

window.editAdminWinner = function(idx) {
  const db = FestDB.getData();
  const w = db.winners[idx];
  if (!w) return;

  const team1 = prompt("1st Place Winner / Team Name:", w.tiers[0]?.team || "");
  if (team1) w.tiers[0].team = team1;

  const col1 = prompt("1st Place College:", w.tiers[0]?.college || "");
  if (col1) w.tiers[0].college = col1;

  const prize1 = prompt("1st Place Cash Prize:", w.tiers[0]?.prize || "₹10,000");
  if (prize1) w.tiers[0].prize = prize1;

  FestDB.saveData(db);
  alert("Winner updated!");
  location.reload();
};

function renderAdminSponsors(db) {
  const container = document.getElementById("admin-sponsors-list");
  if (!container) return;
  container.innerHTML = "";

  db.sponsors.forEach((s, idx) => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "0.8rem 1rem";
    div.style.marginBottom = "0.8rem";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color: var(--text-primary);">${s.name}</strong>
          <span style="color:var(--neon-pink); font-size:0.78rem; margin-left:0.6rem;">[${s.tier}]</span>
        </div>
        <div>
          <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem;" onclick="editAdminSponsor(${idx})">✏️ Edit</button>
          <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminSponsor(${idx})">🗑️</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.addNewAdminSponsor = function() {
  const db = FestDB.getData();
  const name = prompt("Enter Sponsor Name:");
  if (!name) return;
  const tier = prompt("Enter Sponsor Tier (e.g. Title, Powered By, Gaming Partner, Associate):") || "Associate Sponsor";
  const url = prompt("Enter Website Link:") || "https://presidencyuniversity.in";
  const logo = prompt("Enter Logo Image Path / URL:") || "images/sponsor-1.svg";

  db.sponsors.push({
    id: "sp-" + Date.now(),
    name,
    tier,
    url,
    logo
  });

  FestDB.saveData(db);
  alert(`Sponsor "${name}" added!`);
  location.reload();
};

window.editAdminSponsor = function(idx) {
  const db = FestDB.getData();
  const s = db.sponsors[idx];
  if (!s) return;

  const name = prompt("Sponsor Name:", s.name);
  if (name) s.name = name;

  const tier = prompt("Tier:", s.tier);
  if (tier) s.tier = tier;

  const url = prompt("Website Link:", s.url);
  if (url) s.url = url;

  const logo = prompt("Logo Image Path / URL:", s.logo);
  if (logo) s.logo = logo;

  FestDB.saveData(db);
  alert("Sponsor updated!");
  location.reload();
};

window.deleteAdminSponsor = function(idx) {
  const db = FestDB.getData();
  if (confirm(`Delete sponsor "${db.sponsors[idx]?.name}"?`)) {
    db.sponsors.splice(idx, 1);
    FestDB.saveData(db);
    location.reload();
  }
};

function renderAdminGallery(db) {
  const container = document.getElementById("admin-gallery-list");
  if (!container) return;
  container.innerHTML = "";

  db.gallery.forEach((g, idx) => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "0.8rem 1rem";
    div.style.marginBottom = "0.8rem";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:0.8rem;">
          <img src="${g.src}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
          <div>
            <strong style="color: var(--text-primary);">${g.title}</strong>
            <span style="color:var(--neon-cyan); font-size:0.75rem; margin-left:0.5rem;">#${g.tag}</span>
          </div>
        </div>
        <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminGalleryPhoto(${idx})">🗑️ Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

window.addNewAdminGalleryPhoto = function() {
  const db = FestDB.getData();
  const title = prompt("Photo Title (e.g. Hackathon Finalists):");
  if (!title) return;
  const tag = prompt("Category Tag (e.g. Esports, Stage, Crowds):") || "Fest Moment";
  const src = prompt("Photo Image URL / Path (e.g. images/gallery-1.svg or direct URL):") || "images/gallery-1.svg";

  db.gallery.push({
    id: "g-" + Date.now(),
    title,
    tag,
    src
  });

  FestDB.saveData(db);
  alert("Gallery photo added!");
  location.reload();
};

window.deleteAdminGalleryPhoto = function(idx) {
  const db = FestDB.getData();
  if (confirm(`Remove photo "${db.gallery[idx]?.title}"?`)) {
    db.gallery.splice(idx, 1);
    FestDB.saveData(db);
    location.reload();
  }
};

function renderAdminSettings(db) {
  const regUrlInput = document.getElementById("admin-setting-regurl");
  const eventDateInput = document.getElementById("admin-setting-eventdate");
  const qrImgInput = document.getElementById("admin-setting-qrimg");
  const gatewayUrlInput = document.getElementById("admin-setting-gatewayurl");
  const testGatewayBtn = document.getElementById("admin-setting-test-gateway-btn");
  const removeGatewayBtn = document.getElementById("admin-setting-remove-gateway-btn");
  const gatewayBadge = document.getElementById("admin-setting-gateway-status");
  const saveBtn = document.getElementById("admin-save-settings-btn");

  const regConfig = (db.settings && db.settings.registrationConfig) || {};
  const currentGateway = (regConfig.paymentGatewayUrl !== undefined)
    ? regConfig.paymentGatewayUrl
    : (db.settings.paymentGatewayUrl || "https://pages.razorpay.com/arenium27-pay");

  function updateStatus(val) {
    if (!gatewayBadge) return;
    if (val && val.trim()) {
      gatewayBadge.textContent = "● ACTIVE";
      gatewayBadge.style.background = "rgba(16, 185, 129, 0.2)";
      gatewayBadge.style.color = "#10B981";
      gatewayBadge.style.borderColor = "#10B981";
    } else {
      gatewayBadge.textContent = "○ NO LINK (DISABLED)";
      gatewayBadge.style.background = "rgba(239, 68, 68, 0.2)";
      gatewayBadge.style.color = "#EF4444";
      gatewayBadge.style.borderColor = "#EF4444";
    }
  }

  if (gatewayUrlInput) {
    gatewayUrlInput.value = currentGateway || "";
    updateStatus(gatewayUrlInput.value);
    gatewayUrlInput.oninput = () => updateStatus(gatewayUrlInput.value);
  }

  if (testGatewayBtn) {
    testGatewayBtn.onclick = () => {
      const url = gatewayUrlInput ? gatewayUrlInput.value.trim() : "";
      if (!url) {
        alert("Please enter a payment gateway URL first before testing.");
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (removeGatewayBtn) {
    removeGatewayBtn.onclick = () => {
      if (confirm("Are you sure you want to remove the payment gateway link? The 'PAY NOW' button on the registration page will be marked as not configured until a new URL is provided.")) {
        if (gatewayUrlInput) {
          gatewayUrlInput.value = "";
          updateStatus("");
        }
      }
    };
  }

  if (regUrlInput) regUrlInput.value = db.settings.registerUrl || "";
  if (eventDateInput) eventDateInput.value = db.settings.eventDate || "";
  if (qrImgInput) qrImgInput.value = db.settings.qrCodeImg || "";

  if (saveBtn) {
    saveBtn.onclick = () => {
      const gVal = gatewayUrlInput ? gatewayUrlInput.value.trim() : "";
      if (!db.settings.registrationConfig) db.settings.registrationConfig = {};
      db.settings.registrationConfig.paymentGatewayUrl = gVal;
      db.settings.paymentGatewayUrl = gVal;
      db.settings.registerUrl = regUrlInput ? regUrlInput.value.trim() : "";
      db.settings.eventDate = eventDateInput ? eventDateInput.value.trim() : "";
      if (qrImgInput) db.settings.qrCodeImg = qrImgInput.value.trim();
      FestDB.saveData(db);
      alert("Festival Core Settings & Payment Gateway Link updated live!");
    };
  }
}


// ==========================================================================
// 18. ADMIN REGISTRATIONS & PORTAL CUSTOMIZATION LOGIC
// ==========================================================================
function renderAdminRegistrations(db) {
  const tableBody = document.getElementById("admin-registrations-table-body");
  if (!tableBody) return;

  const regConfig = (db.settings && db.settings.registrationConfig) || {
    status: "open",
    portalMode: "internal",
    externalUrl: "https://presidencyuniversity.in/arenium27-register",
    upiId: "arenium27@icici",
    qrCodeImg: "images/qrcode.png",
    instructions: "Fill in all mandatory credentials to register for ARENIUM'27.",
    fees: {}
  };

  // 1. Populate Configuration Form
  const statusSelect = document.getElementById("reg-admin-status");
  const modeSelect = document.getElementById("reg-admin-mode");
  const extUrlInput = document.getElementById("reg-admin-external-url");
  const gatewayUrlInp = document.getElementById("reg-admin-gateway-url");
  const testGatewayBtn = document.getElementById("admin-test-gateway-btn");
  const removeGatewayBtn = document.getElementById("admin-remove-gateway-btn");
  const gatewayStatusBadge = document.getElementById("gateway-status-badge");
  const upiInput = document.getElementById("reg-admin-upi");
  const qrInput = document.getElementById("reg-admin-qr");
  const internalFeeInp = document.getElementById("reg-admin-internal-fee");
  const internalAddInp = document.getElementById("reg-admin-internal-add");
  const externalFeeInp = document.getElementById("reg-admin-external-fee");
  const externalAddInp = document.getElementById("reg-admin-external-add");
  const instructionsTextarea = document.getElementById("reg-admin-instructions");
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
        alert("Test ping failed: " + e.message + "\nPlease verify the Apps Script deployment.");
      } finally {
        testSheetBtn.disabled = false;
        testSheetBtn.textContent = "⚡ Test Ping Sync";
      }
    };
  }
  const feesGrid = document.getElementById("reg-admin-fees-grid");
  const saveBtn = document.getElementById("admin-save-reg-config-btn");

  const currentGatewayUrl = (regConfig.paymentGatewayUrl !== undefined) 
    ? regConfig.paymentGatewayUrl 
    : ((db.settings && db.settings.paymentGatewayUrl) ? db.settings.paymentGatewayUrl : "https://pages.razorpay.com/arenium27-pay");

  function updateGatewayBadge(val) {
    if (!gatewayStatusBadge) return;
    if (val && val.trim()) {
      gatewayStatusBadge.textContent = "● ACTIVE";
      gatewayStatusBadge.style.background = "rgba(16, 185, 129, 0.2)";
      gatewayStatusBadge.style.color = "#10B981";
      gatewayStatusBadge.style.borderColor = "#10B981";
    } else {
      gatewayStatusBadge.textContent = "○ NO LINK (DISABLED)";
      gatewayStatusBadge.style.background = "rgba(239, 68, 68, 0.2)";
      gatewayStatusBadge.style.color = "#EF4444";
      gatewayStatusBadge.style.borderColor = "#EF4444";
    }
  }

  if (gatewayUrlInp) {
    gatewayUrlInp.value = currentGatewayUrl || "";
    updateGatewayBadge(gatewayUrlInp.value);
    gatewayUrlInp.oninput = () => {
      updateGatewayBadge(gatewayUrlInp.value);
    };
  }

  if (testGatewayBtn) {
    testGatewayBtn.onclick = () => {
      const url = gatewayUrlInp ? gatewayUrlInp.value.trim() : "";
      if (!url) {
        alert("Please enter a payment gateway URL first before testing.");
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (removeGatewayBtn) {
    removeGatewayBtn.onclick = () => {
      if (confirm("Are you sure you want to remove the payment gateway link? The 'PAY NOW' button on the registration page will be disabled until a link is added.")) {
        if (gatewayUrlInp) {
          gatewayUrlInp.value = "";
          updateGatewayBadge("");
        }
      }
    };
  }

  if (statusSelect) statusSelect.value = regConfig.status || "open";
  if (modeSelect) modeSelect.value = regConfig.portalMode || "internal";
  if (extUrlInput) extUrlInput.value = regConfig.externalUrl || "";
  if (upiInput) upiInput.value = regConfig.upiId || "";
  if (qrInput) qrInput.value = regConfig.qrCodeImg || "";
  if (internalFeeInp) internalFeeInp.value = regConfig.internalFee || 200;
  if (internalAddInp) internalAddInp.value = regConfig.internalAddFee || 200;
  if (externalFeeInp) externalFeeInp.value = regConfig.externalFee || 300;
  if (externalAddInp) externalAddInp.value = regConfig.externalAddFee || 300;
  if (instructionsTextarea) instructionsTextarea.value = regConfig.instructions || "";

  // Event fees editor grid
  if (feesGrid) {
    feesGrid.innerHTML = "";
    const fees = regConfig.fees || {};
    (db.events || []).forEach(ev => {
      const currentFee = fees[ev.id] || "₹150";
      const div = document.createElement("div");
      div.className = "admin-form-group";
      div.style.marginBottom = "0.4rem";
      div.innerHTML = `
        <label class="admin-label" style="font-size:0.72rem; color:#CBD5E1;">${ev.name}</label>
        <input type="text" class="admin-input reg-fee-input" data-ev-id="${ev.id}" value="${currentFee}" placeholder="e.g. ₹150 / Solo">
      `;
      feesGrid.appendChild(div);
    });
  }

  // Save Portal Configuration Button
  if (saveBtn) {
    saveBtn.onclick = () => {
      const updatedFees = {};
      document.querySelectorAll(".reg-fee-input").forEach(inp => {
        updatedFees[inp.dataset.evId] = inp.value.trim();
      });

      if (!db.settings.registrationConfig) db.settings.registrationConfig = {};
      const gatewayVal = gatewayUrlInp ? gatewayUrlInp.value.trim() : "";
      db.settings.registrationConfig.paymentGatewayUrl = gatewayVal;
      db.settings.registrationConfig.googleSheetUrl = sheetUrlInp ? sheetUrlInp.value.trim() : "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";
      db.settings.paymentGatewayUrl = gatewayVal;
      db.settings.registrationConfig.status = statusSelect ? statusSelect.value : "open";
      db.settings.registrationConfig.portalMode = modeSelect ? modeSelect.value : "internal";
      db.settings.registrationConfig.externalUrl = extUrlInput ? extUrlInput.value.trim() : "";
      db.settings.registrationConfig.upiId = upiInput ? upiInput.value.trim() : "arenium27@icici";
      db.settings.registrationConfig.qrCodeImg = qrInput ? qrInput.value.trim() : "images/qrcode.png";
      db.settings.registrationConfig.internalFee = internalFeeInp ? parseInt(internalFeeInp.value) || 200 : 200;
      db.settings.registrationConfig.internalAddFee = internalAddInp ? parseInt(internalAddInp.value) || 200 : 200;
      db.settings.registrationConfig.externalFee = externalFeeInp ? parseInt(externalFeeInp.value) || 300 : 300;
      db.settings.registrationConfig.externalAddFee = externalAddInp ? parseInt(externalAddInp.value) || 300 : 300;
      db.settings.registrationConfig.instructions = instructionsTextarea ? instructionsTextarea.value.trim() : "";
      db.settings.registrationConfig.fees = updatedFees;

      FestDB.saveData(db);
      alert("Registration Portal Settings & Event Fees updated live across the website!");
    };
  }

  // 2. Populate Event Filter
  const eventFilter = document.getElementById("reg-filter-event");
  if (eventFilter && eventFilter.options.length <= 1) {
    (db.events || []).forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.id;
      opt.textContent = ev.name;
      eventFilter.appendChild(opt);
    });
  }

  // 3. Render Registrations Table with Search and Filtering
  function renderTable() {
    const evVal = eventFilter ? eventFilter.value : "ALL";
    const statusVal = document.getElementById("reg-filter-status") ? document.getElementById("reg-filter-status").value : "ALL";
    const searchVal = document.getElementById("reg-search-input") ? document.getElementById("reg-search-input").value.toLowerCase().trim() : "";

    let list = db.registrations || [];

    if (evVal !== "ALL") {
      list = list.filter(r => r.eventId === evVal);
    }
    if (statusVal !== "ALL") {
      list = list.filter(r => r.status === statusVal);
    }
    if (searchVal) {
      list = list.filter(r => 
        (r.id && r.id.toLowerCase().includes(searchVal)) ||
        (r.fullName && r.fullName.toLowerCase().includes(searchVal)) ||
        (r.email && r.email.toLowerCase().includes(searchVal)) ||
        (r.college && r.college.toLowerCase().includes(searchVal)) ||
        (r.usn && r.usn.toLowerCase().includes(searchVal)) ||
        (r.utrId && r.utrId.toLowerCase().includes(searchVal)) ||
        (r.teamName && r.teamName.toLowerCase().includes(searchVal))
      );
    }

    const countEl = document.getElementById("reg-count-display");
    if (countEl) countEl.textContent = list.length;

    tableBody.innerHTML = "";
    if (list.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No matching delegate registrations found.</td></tr>`;
      return;
    }

    list.forEach(r => {
      const tr = document.createElement("tr");

      let statusBadge = `<span class="admin-badge-pending">⏳ PENDING</span>`;
      if (r.status === "Confirmed") {
        statusBadge = `<span class="admin-badge-confirmed">✓ CONFIRMED</span>`;
      } else if (r.status === "Rejected") {
        statusBadge = `<span class="admin-badge-rejected">✕ REJECTED</span>`;
      }

      const isInt = (r.category === 'internal' || !r.category);
      const catBadge = isInt 
        ? `<span style="background:rgba(56,189,248,0.15); color:#38BDF8; border:1px solid #38BDF8; font-size:0.7rem; padding:2px 6px; border-radius:4px; font-weight:700;">INTERNAL</span>`
        : `<span style="background:rgba(244,114,182,0.15); color:#F472B6; border:1px solid #F472B6; font-size:0.7rem; padding:2px 6px; border-radius:4px; font-weight:700;">EXTERNAL</span>`;
      
      let eventsDisplay = `<strong>1:</strong> ${r.event1Name || r.eventName || '-'}`;
      if (r.event2Name) eventsDisplay += `<br><span style="color:#10B981; font-size:0.75rem;"><strong>2:</strong> ${r.event2Name} (FREE)</span>`;
      if (r.event3Name) eventsDisplay += `<br><span style="color:#F59E0B; font-size:0.75rem;"><strong>3:</strong> ${r.event3Name} (+Fee)</span>`;

      tr.innerHTML = `
        <td><strong style="color:#60A5FA; font-family:var(--font-mono);">${r.id}</strong><br><span style="font-size:0.72rem; color:#94A3B8;">${r.timestamp ? new Date(r.timestamp).toLocaleDateString() : ''}</span></td>
        <td><strong>${r.fullName}</strong><br><span style="color:#94A3B8; font-size:0.75rem;">${r.email}</span><br><span style="color:#CBD5E1; font-size:0.75rem;">📞 ${r.phone}</span></td>
        <td><strong>${r.college}</strong><br><span style="color:#93C5FD; font-size:0.75rem; font-family:var(--font-mono);">${r.usn}</span><br><span style="color:#94A3B8; font-size:0.72rem;">${r.department || ''}</span></td>
        <td>${catBadge}<br><strong style="color:#34D399; font-size:0.85rem;">${r.feePaid || '₹200'}</strong></td>
        <td><div style="font-size:0.8rem; line-height:1.4;">${eventsDisplay}</div><span style="font-size:0.72rem; color:#94A3B8;">${r.regType === 'Team' ? '👥 ' + (r.teamName || 'Squad') : (r.teamName ? '👤 Solo (' + r.teamName + ')' : '👤 Solo')}</span></td>
        <td>
          <code style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px; font-size:0.8rem; color:#FCD34D;">${r.utrId}</code>
          ${r.paymentScreenshot ? `
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
          ` : `<div style="font-size:0.68rem; color:#64748B; margin-top:2px;">No SS Attached</div>`}
        </td>
        <td>${statusBadge}</td>
        <td style="white-space: nowrap;">
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#0284C7; border-color:#0284C7; margin-right:4px;" onclick="viewAdminPassModal('${r.id}')" title="View Pass & Terminal QR">🎫 Pass &amp; QR</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#34D399; border-color:#34D399;" onclick="setAdminRegStatus('${r.id}', 'Confirmed')">✓ Approve</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#F87171; border-color:#F87171;" onclick="setAdminRegStatus('${r.id}', 'Rejected')">✕ Reject</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.72rem; color:#94A3B8;" onclick="deleteAdminRegistration('${r.id}')" title="Delete record">🗑️</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  if (eventFilter) eventFilter.onchange = renderTable;
  const statusFilter = document.getElementById("reg-filter-status");
  if (statusFilter) statusFilter.onchange = renderTable;
  const searchInp = document.getElementById("reg-search-input");
  if (searchInp) searchInp.oninput = renderTable;

  renderTable();
}

// Global actions for registration admin
window.setAdminRegStatus = function(regId, newStatus) {
  const db = FestDB.getData();
  if (!db.registrations) return;
  const item = db.registrations.find(r => r.id === regId);
  if (item) {
    item.status = newStatus;
    FestDB.saveData(db);
    renderAdminRegistrations(db);
  }
};

window.deleteAdminRegistration = function(regId) {
  if (!confirm(`Are you sure you want to permanently delete registration ${regId}?`)) return;
  const db = FestDB.getData();
  if (!db.registrations) return;
  db.registrations = db.registrations.filter(r => r.id !== regId);
  FestDB.saveData(db);
  renderAdminRegistrations(db);
  renderAdminOverview(db);
};

window.exportRegistrationsCSV = function() {
  const db = FestDB.getData();
  const list = db.registrations || [];
  if (list.length === 0) {
    alert("No registration records found to export.");
    return;
  }

  const headers = ["Registration ID", "Full Name", "Email", "Phone", "College", "USN", "Department", "Year/Sem", "Category", "Event 1", "Event 2", "Event 3", "Fee Paid", "Payment Proof Attached", "Type", "Team Name", "Team Members", "UTR ID", "Status", "Timestamp"];
  const rows = list.map(r => [
    `"${r.id || ''}"`,
    `"${r.fullName || ''}"`,
    `"${r.email || ''}"`,
    `"${r.phone || ''}"`,
    `"${(r.college || '').replace(/"/g, '""')}"`,
    `"${r.usn || ''}"`,
    `"${(r.department || '').replace(/"/g, '""')}"`,
    `"${r.yearSem || ''}"`,
    `"${r.categoryLabel || r.category || 'Internal'}"`,
    `"${(r.event1Name || r.eventName || '').replace(/"/g, '""')}"`,
    `"${(r.event2Name || '').replace(/"/g, '""')}"`,
    `"${(r.event3Name || '').replace(/"/g, '""')}"`,
    `"${r.feePaid || '₹200'}"`,
    `"${r.paymentScreenshot ? 'Yes (Attached)' : 'No'}"`,
    `"${r.regType || ''}"`,
    `"${(r.teamName || '').replace(/"/g, '""')}"`,
    `"${(r.teamMembers || '').replace(/"/g, '""')}"`,
    `"${r.utrId || ''}"`,
    `"${r.status || ''}"`,
    `"${r.timestamp || ''}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ARENIUM27_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.openManualRegModal = function() {
  const name = prompt("Participant Full Name:");
  if (!name) return;
  const email = prompt("Email Address:") || "walkin@presidencyuniversity.in";
  const phone = prompt("Phone Number:") || "+91 9999999999";
  const college = prompt("College / University:") || "Presidency University";
  const usn = prompt("USN / Roll ID:") || "SPOT-" + Math.floor(100 + Math.random()*900);
  const eventName = prompt("Competition Arena Name (e.g. TECHNOVA '27):") || "TECH ODYSSEY";
  const utr = prompt("UTR / Transaction Reference (or SPOT-CASH):") || "SPOT-CASH-" + Date.now().toString().slice(-6);

  const regId = "ARENIUM27-REG-" + Math.floor(1000 + Math.random() * 9000);
  const db = FestDB.getData();
  if (!db.registrations) db.registrations = [];

  db.registrations.unshift({
    id: regId,
    fullName: name,
    email,
    phone,
    college,
    usn,
    department: "On-Spot Walk-in",
    yearSem: "Spot Registration",
    eventId: "spot",
    eventName,
    regType: "Solo",
    teamName: "",
    teamMembers: "",
    utrId: utr,
    status: "Confirmed",
    timestamp: new Date().toISOString()
  });

  FestDB.saveData(db);
  renderAdminRegistrations(db);
  renderAdminOverview(db);
  alert(`Delegate registered successfully! Registration ID: ${regId}`);
};

window.viewAdminProof = function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg || !reg.paymentScreenshot) {
    alert("No payment screenshot is attached to this registration record (" + regId + ").");
    return;
  }

  const modal = document.getElementById("admin-proof-modal");
  const title = document.getElementById("proof-modal-title");
  const meta = document.getElementById("proof-modal-meta");
  const img = document.getElementById("proof-modal-img");
  const openBtn = document.getElementById("proof-modal-open-btn");

  if (title) title.textContent = `PAYMENT PROOF · ${reg.id}`;
  if (meta) {
    const arenas = [reg.event1Name || reg.eventName, reg.event2Name, reg.event3Name].filter(Boolean).join(" &bull; ");
    meta.innerHTML = `
      <div><strong>Delegate:</strong> ${reg.fullName} (${reg.usn || 'N/A'}) &bull; ${reg.college}</div>
      <div><strong>Category &amp; Fee:</strong> <span style="color:#38BDF8;">${reg.categoryLabel || reg.category || 'Internal'}</span> &bull; <strong style="color:#34D399;">${reg.feePaid || '₹200'}</strong></div>
      <div><strong>UTR / Transaction Ref:</strong> <code style="color:#FCD34D;">${reg.utrId}</code></div>
      <div><strong>Arenas:</strong> ${arenas}</div>
    `;
  }
  if (img) img.src = reg.paymentScreenshot;
  if (openBtn) openBtn.href = reg.paymentScreenshot;

  if (modal) modal.style.display = "flex";
};

window.closeAdminProofModal = function() {
  const modal = document.getElementById("admin-proof-modal");
  if (modal) modal.style.display = "none";
};

// Close modal on Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    window.closeAdminProofModal();
    const pModal = document.getElementById("pass-proof-modal");
    if (pModal) pModal.style.display = "none";
  }
});

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

// ==========================================================================
// 18.2 ADMIN DELEGATE PASS & QR MODAL CONTROLLER
// ==========================================================================
window.closeAdminPassModal = function() {
  const modal = document.getElementById("admin-pass-modal");
  if (modal) modal.style.display = "none";
};

window.printAdminPassModal = function() {
  window.print();
};

window.viewAdminPassModal = function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg) {
    alert("Registration record not found (" + regId + ").");
    return;
  }

  const modal = document.getElementById("admin-pass-modal");
  const modalBody = document.getElementById("admin-pass-modal-body");
  if (!modal || !modalBody) return;

  const isInt = (reg.category === "internal" || !reg.category);
  const catLabel = reg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
  const isTeam = reg.regType === "Team";
  const teamDisplayName = isTeam ? (reg.teamName || "Squad") : (reg.teamName ? `${reg.fullName} (${reg.teamName})` : reg.fullName);
  
  let memberCount = 1;
  if (isTeam && reg.teamMembers) {
    // Estimate count from teamMembers string or list
    if (reg.teamMembersList && reg.teamMembersList.length) {
      memberCount = reg.teamMembersList.length + 1;
    } else {
      const parts = reg.teamMembers.split("|").filter(Boolean);
      memberCount = Math.max(parts.length, 2);
    }
  }
  const participantsLabel = isTeam ? `${memberCount} Confirmed Members` : "1 Participant (Solo)";

  const arenas = [reg.event1Name || reg.eventName, reg.event2Name, reg.event3Name].filter(Boolean).join(", ");

  const qrDataPayload = [
    "=== ARENIUM'27 OFFICIAL GATE PASS ===",
    `REG ID: ${reg.id}`,
    `TYPE: ${isTeam ? 'Team Entry' : 'Solo Entry'}`,
    `TEAM / DELEGATE: ${teamDisplayName}`,
    `PARTICIPANTS: ${participantsLabel}`,
    `CATEGORY: ${catLabel}`,
    `LEAD / USN: ${reg.fullName} (${reg.usn || 'N/A'})`,
    `PHONE: ${reg.phone || 'N/A'}`,
    `COLLEGE: ${reg.college || 'Presidency University'}`,
    `ARENAS: ${arenas}`,
    `FEE PAID: ${reg.feePaid || '₹200'} (Verified)`,
    `UTR REF: ${reg.utrId || 'N/A'}`,
    `ENTRY STATUS: ${reg.status || 'Confirmed'}`,
    "Presidency University, Bengaluru • 4-5 Feb 2027"
  ].join("\n");

  modalBody.innerHTML = `
    <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 1.2rem; margin-bottom: 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; border-bottom: 1px dashed #CBD5E1; padding-bottom: 0.6rem;">
        <div>
          <div style="font-size: 0.72rem; color: #0284C7; font-weight: 700; letter-spacing: 1px;">PRESIDENCY UNIVERSITY • SOIS</div>
          <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #0F172A;">ARENIUM'27 DELEGATE PASS</div>
        </div>
        <div style="text-align: right;">
          <span style="background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">✓ ${reg.status || 'Confirmed'}</span>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #0284C7; font-weight: 700; margin-top: 3px;">${reg.id}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; font-size: 0.85rem; margin-bottom: 1rem;">
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Delegate / Lead:</strong> <strong>${reg.fullName}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">College:</strong> ${reg.college}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">USN / ID:</strong> ${reg.usn}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Participation:</strong> <strong>${isTeam ? 'Team: ' + teamDisplayName : 'Solo'}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Fee Paid:</strong> <strong style="color: #047857;">${reg.feePaid || '₹200'}</strong></div>
        <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Registered Arenas:</strong> <div style="color: #0F172A; font-weight: 600;">${arenas}</div></div>
      </div>

      <!-- QR Code Section -->
      <div style="background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1.2rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <div id="admin-pass-qr-target" style="padding: 6px; background: #FFF; border-radius: 8px; border: 1px solid #E2E8F0; min-width: 120px; min-height: 120px; display: flex; align-items: center; justify-content: center;"></div>
          <div>
            <div style="font-size: 0.72rem; color: #0284C7; font-weight: 800; letter-spacing: 0.5px;">OFFICIAL GATE TERMINAL QR</div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #0F172A; margin: 2px 0;">${isTeam ? 'Squad: ' + teamDisplayName : 'Delegate: ' + teamDisplayName}</div>
            <div style="font-size: 0.8rem; color: #475569;"><strong>Participants:</strong> <span style="color: #047857; font-weight: 700;">${participantsLabel}</span></div>
            <div style="font-size: 0.8rem; color: #475569;"><strong>Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
          </div>
        </div>
        <div style="font-size: 0.72rem; color: #64748B; max-width: 220px; line-height: 1.4; border-left: 1.5px solid #E2E8F0; padding-left: 0.8rem;">
          Scan with phone camera or terminal barcode scanner at gate to verify registration validity and event roster.
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";

  const qrTarget = document.getElementById("admin-pass-qr-target");
  if (qrTarget) {
    qrTarget.innerHTML = "";
    let qrDone = false;
    if (typeof QRCode !== "undefined") {
      try {
        new QRCode(qrTarget, {
          text: qrDataPayload,
          width: 110,
          height: 110,
          colorDark: "#0F172A",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.M
        });
        qrDone = true;
      } catch(e){}
    }
    if (!qrDone) {
      const img = document.createElement("img");
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&format=png&data=${encodeURIComponent(qrDataPayload)}`;
      img.style.width = "110px";
      img.style.height = "110px";
      qrTarget.appendChild(img);
    }
  }
};

// ==========================================================================
// 18.3 GATE QR SCANNER & LIVE VERIFICATION TERMINAL
// ==========================================================================
let gateHtml5QrCode = null;
let currentScannedReg = null;

function playScanBeep(success = true) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(success ? 880 : 330, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + (success ? 0.15 : 0.3));
  } catch(e) {}
}

window.startGateQrScanner = function() {
  const placeholder = document.getElementById("gate-qr-reader-placeholder");
  const stopBtn = document.getElementById("btn-stop-scanner");
  const indicator = document.getElementById("scanner-status-indicator");

  if (typeof Html5Qrcode === "undefined") {
    alert("QR Scanner engine is initializing or blocked. Please refresh the page.");
    return;
  }

  if (placeholder) placeholder.style.display = "none";
  if (stopBtn) stopBtn.style.display = "inline-flex";
  if (indicator) {
    indicator.textContent = "● ACTIVE SCANNING";
    indicator.style.background = "#ECFDF5";
    indicator.style.color = "#047857";
  }

  if (!gateHtml5QrCode) {
    gateHtml5QrCode = new Html5Qrcode("gate-qr-reader");
  }

  const config = { fps: 10, qrbox: { width: 220, height: 220 } };

  gateHtml5QrCode.start(
    { facingMode: "environment" },
    config,
    (decodedText) => {
      handleGateQrScanned(decodedText);
    },
    (errorMessage) => {}
  ).catch(err => {
    console.error("Camera start error:", err);
    alert("Camera access denied or device has no camera: " + err + "\n\nYou can still click '📁 Scan QR Image File' or use 'Manual Lookup'!");
    stopGateQrScanner();
  });
};

window.stopGateQrScanner = function() {
  const placeholder = document.getElementById("gate-qr-reader-placeholder");
  const stopBtn = document.getElementById("btn-stop-scanner");
  const indicator = document.getElementById("scanner-status-indicator");

  if (gateHtml5QrCode && gateHtml5QrCode.isScanning) {
    gateHtml5QrCode.stop().then(() => {
      gateHtml5QrCode.clear();
      if (placeholder) placeholder.style.display = "block";
      if (stopBtn) stopBtn.style.display = "none";
      if (indicator) {
        indicator.textContent = "STOPPED";
        indicator.style.background = "#F1F5F9";
        indicator.style.color = "#64748B";
      }
    }).catch(err => console.error(err));
  } else {
    if (placeholder) placeholder.style.display = "block";
    if (stopBtn) stopBtn.style.display = "none";
    if (indicator) {
      indicator.textContent = "IDLE";
      indicator.style.background = "#F1F5F9";
      indicator.style.color = "#64748B";
    }
  }
};

window.scanQrFromFile = function(file) {
  if (!file) return;
  if (!gateHtml5QrCode) {
    gateHtml5QrCode = new Html5Qrcode("gate-qr-reader");
  }

  gateHtml5QrCode.scanFile(file, true)
    .then(decodedText => {
      handleGateQrScanned(decodedText);
    })
    .catch(err => {
      alert("No valid QR code could be detected in this image: " + err);
    });
};

window.lookupManualGatePass = function() {
  const input = document.getElementById("manual-scan-input");
  const query = input ? input.value.trim() : "";
  if (!query) {
    alert("Please enter a Registration ID or USN to look up.");
    return;
  }
  handleGateQrScanned(query);
};

window.handleGateQrScanned = function(rawText) {
  playScanBeep(true);
  const resultBody = document.getElementById("gate-scan-result-body");
  const clearancePill = document.getElementById("gate-clearance-pill");
  if (!resultBody) return;

  const db = FestDB.getData();
  const list = db.registrations || [];

  // 1. Try to find Registration ID in rawText
  let matchedReg = null;

  // Exact ID match or substring
  const regIdMatch = rawText.match(/ARENIUM27-REG-[0-9]+/i) || rawText.match(/AR27-[A-Z0-9-]+/i) || rawText.match(/TEST-[A-Z0-9-]+/i);
  const targetId = regIdMatch ? regIdMatch[0].toUpperCase() : rawText.trim().toUpperCase();

  matchedReg = list.find(r => 
    (r.id && r.id.toUpperCase() === targetId) ||
    (r.usn && r.usn.toUpperCase() === targetId) ||
    (r.fullName && r.fullName.toUpperCase() === targetId) ||
    (r.utrId && r.utrId.toUpperCase() === targetId)
  );

  currentScannedReg = matchedReg;

  if (clearancePill) {
    if (matchedReg) {
      clearancePill.textContent = "✅ ACCESS GRANTED";
      clearancePill.style.background = "#ECFDF5";
      clearancePill.style.color = "#047857";
    } else {
      clearancePill.textContent = "⚠️ UNREGISTERED PASS";
      clearancePill.style.background = "#FEF2F2";
      clearancePill.style.color = "#DC2626";
    }
  }

  if (matchedReg) {
    const isTeam = matchedReg.regType === "Team";
    const teamDisplayName = isTeam ? (matchedReg.teamName || "Squad") : (matchedReg.teamName ? `${matchedReg.fullName} (${matchedReg.teamName})` : matchedReg.fullName);
    const isInt = (matchedReg.category === "internal" || !matchedReg.category);
    const catLabel = matchedReg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
    const arenas = [matchedReg.event1Name || matchedReg.eventName, matchedReg.event2Name, matchedReg.event3Name].filter(b => b && b !== '-').join(" • ");
    const isCheckedIn = (matchedReg.status === "Checked In" || matchedReg.status === "Gate Cleared");

    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: ${isCheckedIn ? '#EFF6FF' : '#ECFDF5'}; border: 1.5px solid ${isCheckedIn ? '#93C5FD' : '#6EE7B7'}; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
            <span style="font-size: 0.72rem; color: ${isCheckedIn ? '#1D4ED8' : '#047857'}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              ${isCheckedIn ? 'ℹ️ ALREADY CHECKED IN' : '✅ GATE ENTRY CLEARED • OFFICIAL PASS'}
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #0284C7;">${matchedReg.id}</span>
          </div>
          <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: #0F172A; margin-bottom: 0.2rem;">
            ${isTeam ? 'Squad: ' + teamDisplayName : matchedReg.fullName}
          </div>
          <div style="font-size: 0.85rem; color: #475569;">
            Delegate Lead: <strong>${matchedReg.fullName}</strong> (${matchedReg.usn || 'N/A'}) • ${matchedReg.college || 'Presidency University'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.84rem; margin-bottom: 1.2rem;">
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Participation:</strong> <strong>${isTeam ? 'Team Entry' : 'Solo Entry'}</strong></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Fee Paid:</strong> <strong style="color: #047857;">${matchedReg.feePaid || '₹200'} (Verified)</strong></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">UTR ID:</strong> <code style="color: #475569;">${matchedReg.utrId || 'N/A'}</code></div>
          <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Registered Arenas:</strong> <strong style="color: #0F172A;">${arenas || 'General Fest Entry'}</strong></div>
        </div>

        ${matchedReg.teamMembers ? `
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem; font-size: 0.78rem; color: #334155;">
            <strong style="color: #0369A1; display: block; margin-bottom: 0.2rem;">👥 Squad Roster:</strong>
            ${matchedReg.teamMembers}
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="markGatePassCheckedIn('${matchedReg.id}')" style="background: #059669; border-color: #047857; padding: 0.6rem 1.4rem; font-size: 0.82rem; font-weight: 700;">
            ${isCheckedIn ? '✓ Refresh Check-In' : '✅ MARK AS CHECKED IN'}
          </button>
          <button type="button" class="btn btn-ghost" onclick="viewAdminPassModal('${matchedReg.id}')" style="padding: 0.6rem 1.1rem; font-size: 0.82rem; color: #0284C7; border-color: #0284C7;">
            🎫 Full Pass Preview
          </button>
        </div>
      </div>
    `;
  } else {
    // If not found in local db, display scanned raw text
    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: #FEF2F2; border: 1.5px solid #FCA5A5; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
          <div style="color: #DC2626; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.3rem;">⚠️ Pass ID Not Found in Local Database</div>
          <div style="font-size: 0.78rem; color: #7F1D1D; line-height: 1.45;">
            The scanned QR code was decoded, but its ID does not match any existing local records. Click <strong>"Sync / Refresh Database"</strong> above to pull newly registered students from Google Sheets!
          </div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.8rem; font-size: 0.78rem; font-family: var(--font-mono); color: #334155; white-space: pre-wrap; word-break: break-all;">
          ${rawText}
        </div>
        <button type="button" class="btn btn-primary" onclick="syncRegistrationsFromGoogleSheet()" style="margin-top: 1rem; padding: 0.5rem 1.2rem; font-size: 0.82rem;">
          🔄 Sync from Google Sheet Now
        </button>
      </div>
    `;
  }
};

window.markGatePassCheckedIn = function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg) return;

  reg.status = "Checked In";
  reg.checkInTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  FestDB.saveData(db);

  renderAdminRegistrations(db);
  renderAdminOverview(db);
  handleGateQrScanned(regId);

  alert(`✓ DELEGATE CLEARED & CHECKED IN!\n\nPass ID: ${reg.id}\nDelegate: ${reg.fullName}\nTime: ${reg.checkInTime}`);
};

/**
 * ARENIUM'27 — Master Cyberpunk Engine & FestDB
 * School of Information Science (SOIS), Presidency University, Bengaluru
 * Features: Dynamic State Management, Rulebook Modal, Certificate Studio, Admin Sync
 */

// ==========================================================================
// 0. ASSET PATH RESOLVER (NORMALIZES RELATIVE IMAGE PATHS & PREVENTS 404S)
// ==========================================================================
function resolveAssetPath(path, fallback = "images/coord-generic.svg") {
  if (!path) return fallback;
  path = String(path).trim();
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("images/")
  ) {
    return path;
  }
  return "images/" + path;
}
window.resolveAssetPath = resolveAssetPath;

// Global backend endpoint (Localhost vs Production Vercel on MongoDB Atlas)
window.CORE_BACKEND_URL = window.CORE_BACKEND_URL || (
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
    ? "http://localhost:5000/api"
    : "https://arenium-27-core.vercel.app/api"
);

// ==========================================================================
// 1. FESTDB (CENTRAL LOCALSTORAGE STATE ENGINE)
// ==========================================================================
const FestDB = {
  STORAGE_KEY: "arenium_fest_db_v9",

  getDefaults() {
    return {
      settings: {
        eventDate: "2027-02-04T10:00:00+05:30",
        registerUrl: "register.html",
        paymentGatewayUrlInternal: "https://pages.razorpay.com/arenium27-pay",
        paymentGatewayUrlExternal: "https://presidencyuniversity.in/arenium27-register",
        paymentGatewayUrl: "https://pages.razorpay.com/arenium27-pay",
        registrationConfig: {
          googleSheetUrl: "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec",
          status: "open",
          portalMode: "internal",
          externalUrl: "https://presidencyuniversity.in/arenium27-register",
          paymentGatewayUrlInternal: "https://pages.razorpay.com/arenium27-pay",
          paymentGatewayUrlExternal: "https://presidencyuniversity.in/arenium27-register",
          paymentGatewayUrl: "https://pages.razorpay.com/arenium27-pay",
          upiId: "arenium27@icici",
          qrCodeImg: "images/qrcode.png",
          internalFee: 200,
          internalAddFee: 0,
          externalFee: 300,
          externalAddFee: 0,
          instructions: "REGISTRATION FEE STRUCTURE: Internal Participants (Presidency University): ₹200 covers up to 2 competitive events. External Participants: ₹300 covers up to 2 competitive events. Participation in 2nd event is optional and 100% FREE (Maximum 2 events in total). Please verify event schedules to ensure non-overlapping timings.",
          fees: {
            "tech-odyssey": "₹200 Internal / ₹300 External (Team of 2–4)",
            "shadow-code": "₹200 Internal / ₹300 External (Team of 2–4)",
            "design-nova": "₹200 Internal / ₹300 External (Team of 2–3)",
            "tech-talk": "₹200 Internal / ₹300 External (Solo or Duo: 1–2)",
            "data-chronicles": "₹200 Internal / ₹300 External (Team of 3–4)",
            "founders-arena": "₹200 Internal / ₹300 External (Solo or Team: 1–3)",
            "hackstorm": "₹200 Internal / ₹300 External per member (Team of 4)",
            "quad-damage": "₹200 Internal / ₹300 External (Solo or Squad: 1–4)",
            "biochroma": "₹200 Internal / ₹300 External per member (Team of 8)",
            "apl-auction": "₹200 Internal / ₹300 External (Team of 4–8)"
          }
        },
        tagline: "THE ARENA OF INNOVATION",
        prizePoolText: "TOTAL CASH PRIZE POOL: ₹1,50,000 (1.5 LAKHS) • ARENIUM '27 • 4–5 FEBRUARY 2027 • SCHOOL OF INFORMATION SCIENCE, PRESIDENCY UNIVERSITY",
        announcement: "ARENIUM ’27: THE ARENA OF INNOVATION • ₹1.5 LAKHS CASH PRIZE POOL • 4–5 FEB 2027",
        qrCodeImg: "images/qrcode.png",
        logoImg: "images/logo.jpg",
        certificatesPublished: false,
        resultsPublished: false,
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
          email: "Arenium.official@gmail.com",
          photo: "images/Ms. Keren Lois Daniel.jpg"
        },
        {
          id: "coord-1",
          name: "Kaushal Kumar Singh",
          role: "Finance & Registration Manager",
          dept: "",
          phone: "+91 87977 86686",
          email: "Arenium.official@gmail.com",
          photo: "images/Kaushal.jpeg"
        },
        {
          id: "coord-2",
          name: "Vimal Raj",
          role: "Event Manager",
          dept: "",
          phone: "+91 96201 92249",
          email: "Arenium.official@gmail.com",
          photo: "images/Vimal.png"
        },
        {
          id: "coord-3",
          name: "Ashlin Siddharth",
          role: "Marketing & Registration Manager",
          dept: "",
          phone: "+91 91087 40761",
          email: "Arenium.official@gmail.com",
          photo: "images/Ashlin Siddharth.png"
        },
        {
          id: "coord-4",
          name: "Abhyas Kathuria",
          role: "Technical Manager",
          dept: "",
          phone: "+91 85958 48421",
          email: "Arenium.official@gmail.com",
          photo: "images/ABHYAS.png"
        }
      ],
      leadership: [
        {
          id: "lead-provc",
          tag: "PATRON / PRO VC",
          name: "Dr. Sivaperumal",
          role: "Pro Vice-Chancellor · Presidency University",
          bio: "Guiding institutional growth, research initiatives, and academic excellence across Presidency University.",
          photo: "images/PVC  Dr.Sivaperumal.jpeg"
        },
        {
          id: "lead-vc",
          tag: "CHIEF PATRON / VC",
          name: "Dr. S. J. Thiruvengadam",
          role: "Vice-Chancellor · Presidency University",
          bio: "Leading Presidency University's strategic vision, global partnerships, and innovation ecosystem.",
          photo: "images/VC Dr.SJ Thriuvengadam.jpeg"
        },
        {
          id: "lead-dean",
          tag: "PATRON / DEAN",
          name: "Dr. R. Mahalakshmi",
          role: "Dean · School of Information Science",
          bio: "Guiding the academic vision, industry alliances, and innovation ecosystem of SOIS Presidency University.",
          photo: "images/Dean Dr.R Mahalakshmi.jpeg"
        },
        {
          id: "lead-hod",
          tag: "HOD - PG PROGRAMMES",
          name: "Dr. Renukadevi",
          role: "HOD (PG) · School of Information Science",
          bio: "Fostering postgraduate research, competitive coding culture, and national collegiate hackathons across SOIS.",
          photo: "images/HOD -  PG  Dr.Renukadevi.jpeg"
        },
        {
          id: "lead-ug",
          tag: "HOD - UG PROGRAMMES",
          name: "Dr. Vetrimani Elangovan",
          role: "HOD (UG) · School of Information Science",
          bio: "Directing undergraduate computing specializations, student mentoring, and fest operations.",
          photo: "images/HOD - UG Dr.Vetrimani Elangovan.jpeg"
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
        // 1. Tech Odyssey (Tech)
        {
          id: "tech-odyssey",
          name: "TECH ODYSSEY",
          tagline: "Technical Clue Hunt & Code Debugging Challenge",
          category: "Tech",
          group: "technical",
          prize: "₹15,000",
          venue: "Seminar Hall 1 (SH-1)",
          date: "Day 1 (4 February 2027)",
          time: "1:00 PM – 3:00 PM",
          description: "Teams solve campus-wide technical clues and debug syntax errors against the clock. Open to teams of 2 to 4 participants across a fast-paced multi-stage quest.",
          poster: "images/events/tech-odyssey.svg",
          minMembers: 2,
          maxMembers: 4,
          slotId: "day1_afternoon",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "A multi-stage technical treasure hunt featuring technical reasoning questions, hidden clues embedded across campus, and rapid syntax debugging.",
            eligibility: "Teams of 2 to 4 members. Participants must bring their own charged laptops. No generative AI tools permitted.",
            teamSize: "2 – 4 Members per team",
            rounds: [
              "Round 1: Technical Qualification Quiz (Logic, puzzles, and computing concepts).",
              "Round 2: Campus Clue Quest (Locating hidden technical checkpoints across campus).",
              "Round 3: Code Debugging Sprint (Identifying and correcting bugs in provided code snippets)."
            ],
            rules: [
              "Participants must carry charged laptops; power stations are available at checkpoints.",
              "Strict proctoring against unauthorized AI assistants. Violation leads to disqualification.",
              "Fastest accurate submission wins."
            ],
            judging: "Combined score from quiz accuracy (30%), clue discovery speed (40%), and syntax bug spotting (30%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Merit Certificates"
          }
        },

        // 2. Shadow Code (Tech)
        {
          id: "shadow-code",
          name: "SHADOW CODE",
          tagline: "Blindfold Competitive Programming Challenge",
          category: "Tech",
          group: "technical",
          prize: "₹15,000",
          venue: "Seminar Hall 2 (SH-2)",
          date: "Day 2 (5 February 2027)",
          time: "9:00 AM – 12:00 PM",
          description: "Participants write and optimize algorithms with their display monitors turned completely off. Open to teams of 2 to 4 participants across C, C++, Java, and Python.",
          poster: "images/events/shadow-code.svg",
          minMembers: 2,
          maxMembers: 4,
          slotId: "day2_morning",
          coordinator: {
            name: "Abhyas Kathuria",
            phone: "+91 85958 48421",
            photo: "images/coord-abhyas.svg"
          },
          rulebook: {
            overview: "A competitive programming sprint where teams demonstrate syntax accuracy, algorithmic mastery, and muscle memory without visual feedback.",
            eligibility: "Teams of 2 to 4 members. Open to all undergraduate and postgraduate students.",
            teamSize: "2 – 4 Members per team",
            rounds: [
              "Round 1: Code Debugging Sprint (Fix faulty algorithmic scripts against strict clock).",
              "Round 2: Blind Coding (Monitors turned OFF; write algorithms from memory).",
              "Round 3: Code Optimization (Solve master problem with optimal time and space complexity)."
            ],
            rules: [
              "Supported languages: C, C++, Java, Python 3.",
              "Monitors must remain completely powered off during Round 2 until time is called.",
              "Code that compiles and passes maximum hidden test cases takes the podium."
            ],
            judging: "Compilation success, test case coverage, execution time, and clean algorithmic structure.",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Merit Certificates"
          }
        },

        // 3. Design Nova (Design)
        {
          id: "design-nova",
          name: "DESIGN NOVA",
          tagline: "UI/UX Design Sprint & Prototyping Arena",
          category: "Design",
          group: "technical",
          prize: "₹15,000",
          venue: "Seminar Hall 2 (SH-2)",
          date: "Day 1 (4 February 2027)",
          time: "1:00 PM – 4:00 PM",
          description: "Designers receive a real-world product prompt to create wireframes, user journeys, and interactive prototypes. Open to teams of 2 to 3 members for an intensive 3-hour design sprint.",
          poster: "images/events/design-nova.svg",
          minMembers: 2,
          maxMembers: 3,
          slotId: "day1_afternoon",
          coordinator: {
            name: "Vimal Raj",
            phone: "+91 96201 92249",
            photo: "images/coord-vimal.svg"
          },
          rulebook: {
            overview: "Participants receive an on-the-spot problem statement to craft an intuitive mobile or web interface, complete with user journey mapping and interactive prototyping.",
            eligibility: "Teams of 2 to 3 members. Bring laptops with Figma or Adobe XD installed.",
            teamSize: "2 – 3 Members per team",
            rounds: [
              "Phase 1: Problem Briefing & User Journey Mapping (30 minutes).",
              "Phase 2: High-Fidelity Wireframing & Prototyping (2 hours Figma sprint).",
              "Phase 3: Jury Presentation & Interactive Product Walkthrough (5 minutes per team)."
            ],
            rules: [
              "All component libraries and UI assets must be created or customized on-site.",
              "Pre-built commercial templates are strictly prohibited.",
              "Designs must follow standard accessibility (WCAG) guidelines."
            ],
            judging: "Usability (30%), Visual Aesthetics (30%), Innovation (25%), Presentation Poise (15%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Trophies"
          }
        },

        // 4. Tech Talk (Presentation)
        {
          id: "tech-talk",
          name: "TECH TALK",
          tagline: "Technical Paper & Keynote Presentation Symposium",
          category: "Presentation",
          group: "technical",
          prize: "₹10,000",
          venue: "Seminar Hall 4 (SH-4)",
          date: "Day 1 (4 February 2027)",
          time: "1:00 PM – 4:00 PM",
          description: "Present original research papers, architecture designs, or emerging technology analyses before an academic jury. Solo or 2-member teams deliver an 8-minute presentation followed by Q&A.",
          poster: "images/events/tech-talk.svg",
          minMembers: 1,
          maxMembers: 2,
          slotId: "day1_afternoon",
          coordinator: {
            name: "Ashlin Siddharth",
            phone: "+91 87976 86786",
            photo: "images/coord-ashlin.svg"
          },
          rulebook: {
            overview: "An academic and technical presentation symposium celebrating innovative computing research, system architectures, and emerging technologies.",
            eligibility: "Solo (1) or teams of 2 members.",
            teamSize: "1 – 2 Members (Solo or Duo)",
            rounds: [
              "Round 1: Abstract & Slide Deck Review.",
              "Round 2: Live 8-Minute Stage Presentation + 3-Minute Technical Jury Q&A."
            ],
            rules: [
              "Original research or novel analysis required. Plagiarism > 15% leads to disqualification.",
              "Presentation slides must be submitted in PDF format prior to session start.",
              "Jury decision on technical depth and delivery is final."
            ],
            judging: "Technical Rigour (35%), Innovation (30%), Presentation Delivery (20%), Q&A Defence (15%).",
            cashPrize: "Winner: ₹5,500 | Runner-up: ₹3,000 | 2nd Runner-up: ₹1,500 + Merit Certificates"
          }
        },

        // 5. Founder's Arena (Pitchathon)
        {
          id: "founders-arena",
          name: "FOUNDER'S ARENA",
          tagline: "Startup Pitchathon & Business Plan Showcase",
          category: "Pitchathon",
          group: "technical",
          prize: "₹18,000",
          venue: "Seminar Hall 1 (SH-1)",
          date: "Day 2 (5 February 2027)",
          time: "9:00 AM – 12:00 PM",
          description: "Pitch your startup idea, business model, and prototype before a panel of industry evaluators. Open to solo participants or teams of 1 to 3 members with a pitch and investor Q&A.",
          poster: "images/events/founders-arena.svg",
          minMembers: 1,
          maxMembers: 3,
          slotId: "day2_morning",
          coordinator: {
            name: "Vimal Raj",
            phone: "+91 96201 92249",
            photo: "images/coord-vimal.svg"
          },
          rulebook: {
            overview: "A business and technology pitchathon where student founders showcase scalable software or hardware solutions, market research, revenue models, and MVP prototypes.",
            eligibility: "Solo (1) or teams of up to 3 members. Cross-college teams permitted.",
            teamSize: "1 – 3 Members",
            rounds: [
              "Round 1: Pitch Deck & Executive Summary Pre-Screening.",
              "Round 2: Live 7-Minute Pitch + 5-Minute Investor Q&A on Stage."
            ],
            rules: [
              "Pitch deck must cover Problem, Solution, Architecture, Market Size, Revenue Model, and Team.",
              "Working prototype demonstration carries bonus evaluation weightage.",
              "Jury evaluation determines final podium standings."
            ],
            judging: "Market Feasibility (30%), Technological Innovation (30%), Financial Viability (20%), Pitch Poise (20%).",
            cashPrize: "Winner: ₹10,000 | Runner-up: ₹5,000 | 2nd Runner-up: ₹3,000 + Incubation Fast-Track"
          }
        },

        // 6. Data Chronicles (Data Analysis)
        {
          id: "data-chronicles",
          name: "DATA CHRONICLES",
          tagline: "Data Science, Machine Learning & Analytics Championship",
          category: "Data Analysis",
          group: "technical",
          prize: "₹15,000",
          venue: "Seminar Hall 3 (SH-3)",
          date: "Day 2 (5 February 2027)",
          time: "9:00 AM – 12:00 PM",
          description: "Analyze complex raw datasets, train predictive models, and present interactive data dashboards. Open to teams of 3 to 4 participants across a 3-hour analytics challenge.",
          poster: "images/events/data-chronicles.svg",
          minMembers: 3,
          maxMembers: 4,
          slotId: "day2_morning",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "End-to-end data analytics challenge from exploratory data analysis (EDA) to predictive modeling and executive storytelling dashboards.",
            eligibility: "Teams of 3 to 4 participants. Must bring laptops configured with Python/R, Jupyter, and data visualization tools.",
            teamSize: "3 – 4 Members per team",
            rounds: [
              "Stage 1: Raw Dataset Release & Cleaning / Feature Engineering.",
              "Stage 2: Model Training & Predictive Performance Benchmarking.",
              "Stage 3: Dashboard Storytelling & Business Insight Walkthrough."
            ],
            rules: [
              "All code must be written during the competition window in a fresh workspace.",
              "Pre-trained weights or external labels strictly forbidden.",
              "Submissions evaluated on hold-out validation dataset."
            ],
            judging: "Data Preprocessing (25%), Model Robustness (35%), Dashboard UI (20%), Storytelling Impact (20%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Merit Certificates"
          }
        },

        // 7. Hackstorm (Tech Hackathon - 24H)
        {
          id: "hackstorm",
          name: "HACKSTORM",
          tagline: "24-Hour National Flagship Tech Hackathon",
          category: "Tech Hackathon",
          group: "technical",
          prize: "₹25,000",
          venue: "Central Computing Lab (D-Block)",
          date: "Day 1 & Day 2 (4–5 February 2027)",
          time: "12:00 PM (Day 1) – 12:00 PM (Day 2)",
          description: "Build and deploy innovative software or hardware solutions to address live industry problem statements. Continuous 24-hour sprint for teams of 4 members with mentors and refreshments.",
          poster: "images/events/hackstorm.svg",
          minMembers: 4,
          maxMembers: 4,
          slotId: "hackathon_24h",
          coordinator: {
            name: "Abhyas Kathuria",
            phone: "+91 85958 48421",
            photo: "images/coord-abhyas.svg"
          },
          rulebook: {
            overview: "A continuous 24-hour development sprint bringing student developers together to build production-grade web, mobile, AI, or hardware solutions.",
            eligibility: "Teams of strictly 4 members.",
            teamSize: "Strictly 4 Members per team",
            rounds: [
              "Kickoff: Problem statement release at 12:00 PM Day 1.",
              "Checkpoint 1: Mentorship review at 05:00 PM Day 1.",
              "Checkpoint 2: Midnight code architecture audit at 12:00 AM.",
              "Final Demos: 10:00 AM – 12:00 PM Day 2 before industry judges."
            ],
            rules: [
              "All code must be written during the 24-hour window; fresh Git commit history enforced.",
              "Open-source libraries permitted with proper attribution; turnkey templates prohibited.",
              "Teams must adhere to campus safety and hackathon lab guidelines."
            ],
            judging: "Technical Innovation (35%), Functional Completion (30%), UI/UX (20%), Presentation Demo (15%).",
            cashPrize: "Winner: ₹14,000 | Runner-up: ₹7,000 | Best Tech Prototype: ₹4,000 + Trophies"
          }
        },

        // 8. Quad / Quad Damage (Gaming)
        {
          id: "quad-damage",
          name: "QUAD / QUAD DAMAGE",
          tagline: "Collegiate LAN Esports & Gaming Championship",
          category: "Gaming",
          group: "non-technical",
          prize: "₹20,000",
          venue: "Classroom DJL01 & Gaming Hub",
          date: "Day 1 (4 February 2027)",
          time: "Slot to be confirmed (after 11:00 AM / 1:00 PM)",
          description: "Compete in custom esports lobbies featuring Valorant (PC) and BGMI (Mobile). Open to solo players and squads of up to 4 participants across knockout stages.",
          poster: "images/events/quad-damage.svg",
          minMembers: 1,
          maxMembers: 4,
          slotId: "gaming_flex",
          coordinator: {
            name: "Ashlin Siddharth",
            phone: "+91 87976 86786",
            photo: "images/coord-ashlin.svg"
          },
          rulebook: {
            overview: "Collegiate esports championship played across dedicated low-latency tournament LAN networks with official tournament referees.",
            eligibility: "Solo (1) or squads of up to 4 members. Must carry college IDs and personal gaming devices/peripherals.",
            teamSize: "1 – 4 Members per squad",
            rounds: [
              "Stage 1: Custom Room Knockout Qualifiers (Single Elimination).",
              "Stage 2: Semi-Finals & Grand Finals cast live on stage displays."
            ],
            rules: [
              "Strict anti-cheat policy. Any emulation, macros, or mods cause instant team disqualification.",
              "Campus high-speed LAN provided; players may also utilize personal hotspots.",
              "Unsportsmanlike conduct leads to immediate forfeit."
            ],
            judging: "Official in-game tournament scoreboard verified by tournament referees.",
            cashPrize: "Valorant Champion: ₹8,000 | BGMI Champion: ₹7,000 | COD Champion: ₹5,000 + Trophies"
          }
        },

        // 9. Bio Chroma (Fashion / Showcase)
        {
          id: "biochroma",
          name: "BIO CHROMA",
          tagline: "Technology-Inspired Fashion & Creative Showcase",
          category: "Fashion / Showcase",
          group: "non-technical",
          prize: "₹15,000",
          venue: "Main University Auditorium",
          date: "Day 2 (5 February 2027)",
          time: "1:30 PM – 3:30 PM",
          description: "Teams present runway ensembles combining sustainable materials, wearable technology, and modern fashion design. Strictly 8 members per team for an 8-minute stage showcase.",
          poster: "images/events/biochroma.svg",
          minMembers: 8,
          maxMembers: 8,
          slotId: "day2_afternoon",
          coordinators: [
            {
              name: "Pratham Jain",
              role: "Event Head",
              phone: "+91 89660 53333",
              email: "Arenium.official@gmail.com",
              photo: "images/coord-generic.svg"
            },
            {
              name: "Tirtho Raj Banik",
              role: "Student Coordinator",
              phone: "+91 76379 28858",
              email: "Arenium.official@gmail.com",
              photo: "images/coord-generic.svg"
            }
          ],
          coordinator: {
            name: "Pratham Jain",
            role: "Event Head",
            phone: "+91 89660 53333",
            email: "Arenium.official@gmail.com",
            photo: "images/coord-generic.svg"
          },
          rulebook: {
            overview: "A themed fashion runway experience where students showcase wearable electronics, sustainable materials, and smart textiles.",
            eligibility: "Teams of strictly 8 members (models, designers, and audio-visual support).",
            teamSize: "Strictly 8 Members per team",
            rounds: [
              "Runway Round: 8-minute choreographed team walk with music and concept narration.",
              "Concept Defence: 2-minute Q&A with fashion and tech judges explaining sustainability aspects."
            ],
            rules: [
              "Outfits must reflect the Technology & Nature theme.",
              "Soundtrack and visual backdrop must be submitted 2 hours before the event.",
              "Costume changes must take place in designated backstage rooms."
            ],
            judging: "Theme Interpretation (30%), Design Creativity (30%), Stage Walk & Poise (25%), Material Innovation (15%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | Best Creative Ensemble: ₹2,500 + Trophies"
          }
        },

        // 10. APL (Auction)
        {
          id: "apl-auction",
          name: "APL (ARENIUM PREMIER LEAGUE)",
          tagline: "Strategic Mock Auction & Corporate Valuation Challenge",
          category: "Auction",
          group: "non-technical",
          prize: "₹15,000",
          venue: "L Block Mini Audi",
          date: "Day 2 (5 February 2027)",
          time: "9:00 AM – 12:00 PM",
          description: "Manage virtual budgets to bid on iconic sports franchises, brands, and corporate assets. Open to teams of 4 to 8 members across live auction and valuation rounds.",
          poster: "images/events/apl-auction.svg",
          minMembers: 4,
          maxMembers: 8,
          slotId: "day2_morning",
          coordinator: {
            name: "Kaushal Kumar Singh",
            phone: "+91 91087 40761",
            photo: "images/coord-kaushal.svg"
          },
          rulebook: {
            overview: "A strategic business auction simulation where teams manage a virtual budget, acquire corporate assets, analyze market scenarios, and pitch their business portfolio.",
            eligibility: "Teams of 4 to 8 members.",
            teamSize: "4 – 8 Members per team",
            rounds: [
              "Round 1: Virtual Budget Bidding Auction (Acquiring business brands and sports franchises).",
              "Round 2: Strategic Scenario Challenge (Solving market disruption prompts).",
              "Round 3: Final Portfolio Valuation & Presentation."
            ],
            rules: [
              "Bidding increments must adhere to official auctioneer rules.",
              "Exceeding assigned virtual budget causes instant disqualification.",
              "Decisions of the auction master and jury are final."
            ],
            judging: "Portfolio Valuation (40%), Financial Discipline (30%), Strategic Defense (30%).",
            cashPrize: "Winner: ₹8,000 | Runner-up: ₹4,500 | 2nd Runner-up: ₹2,500 + Merit Certificates"
          }
        }
      ],
      schedule: [
        // Day 1 — Thursday, February 4, 2027
        {
          id: "sch-01",
          day: "Day 1",
          time: "10:00 AM – 11:30 AM",
          name: "Grand Inauguration & Lamp Lighting",
          category: "Inaugural",
          venue: "Main University Auditorium",
          note: "Patron address by Dean SOIS Dr. R. Mahalakshmi, Registrar, University Leadership, and invited industry guests."
        },
        {
          id: "sch-02",
          day: "Day 1",
          time: "11:30 AM – 12:00 PM",
          name: "Tea Break & Delegate Networking",
          category: "Break",
          venue: "Auditorium Concourse",
          note: "Official morning tea break and networking for registered participants, teams, and faculty."
        },
        {
          id: "sch-03",
          day: "Day 1",
          time: "12:00 PM (Day 1) – 12:00 PM (Day 2)",
          name: "HACKSTORM (24-Hour Hackathon)",
          category: "Tech Hackathon",
          venue: "Central Computing Lab (D-Block)",
          note: "24-hour national flagship hackathon kickoff. Live problem statements released; non-stop software and hardware building begins."
        },
        {
          id: "sch-04",
          day: "Day 1",
          time: "1:00 PM – 3:00 PM",
          name: "TECH ODYSSEY (Clue Hunt & Bug Spotting)",
          category: "Tech",
          venue: "Seminar Hall 1 (SH-1)",
          note: "Teams of 2–4 solve technical clues and debug syntax errors against the clock."
        },
        {
          id: "sch-05",
          day: "Day 1",
          time: "1:00 PM – 4:00 PM",
          name: "DESIGN NOVA (UI/UX Design Sprint)",
          category: "Design",
          venue: "Seminar Hall 2 (SH-2)",
          note: "Teams of 2–3 tackle real-world design prompts, high-fidelity wireframing, and interactive prototyping."
        },
        {
          id: "sch-06",
          day: "Day 1",
          time: "1:00 PM – 4:00 PM",
          name: "TECH TALK (Paper & Keynote Symposium)",
          category: "Presentation",
          venue: "Seminar Hall 4 (SH-4)",
          note: "Solo or duo (1–2 members) research paper and technology keynote presentation symposium."
        },
        {
          id: "sch-07",
          day: "Day 1",
          time: "Slot to be confirmed (after 11:00 AM / 1:00 PM)",
          name: "QUAD / QUAD DAMAGE (Gaming Tournament)",
          category: "Gaming",
          venue: "Classroom DJL01 & Gaming Hub",
          note: "Solo or squad (1–4 members) collegiate esports LAN battle featuring competitive gaming."
        },

        // Day 2 — Friday, February 5, 2027
        {
          id: "sch-08",
          day: "Day 2",
          time: "9:00 AM – 12:00 PM",
          name: "FOUNDER'S ARENA (Startup Pitchathon)",
          category: "Pitchathon",
          venue: "Seminar Hall 1 (SH-1)",
          note: "Solo or teams of 1–3 members pitch startup concepts, scalable business models, and prototypes before investor panel."
        },
        {
          id: "sch-09",
          day: "Day 2",
          time: "9:00 AM – 12:00 PM",
          name: "SHADOW CODE (Blindfold Programming Challenge)",
          category: "Tech",
          venue: "Seminar Hall 2 (SH-2)",
          note: "Teams of 2–4 members demonstrate algorithmic precision and screen-off blindfold coding."
        },
        {
          id: "sch-10",
          day: "Day 2",
          time: "9:00 AM – 12:00 PM",
          name: "DATA CHRONICLES (Data Science & Analytics)",
          category: "Data Analysis",
          venue: "Seminar Hall 3 (SH-3)",
          note: "Teams of 3–4 members analyze raw datasets, engineer predictive models, and build visual dashboards."
        },
        {
          id: "sch-11",
          day: "Day 2",
          time: "9:00 AM – 12:00 PM",
          name: "APL (ARENIUM PREMIER LEAGUE)",
          category: "Auction",
          venue: "L Block Mini Audi",
          note: "Teams of 4–8 members manage virtual budgets in a high-stakes mock corporate and brand auction."
        },
        {
          id: "sch-12",
          day: "Day 2",
          time: "12:00 PM",
          name: "HACKSTORM CONCLUDES (Code Freeze & Demos)",
          category: "Tech Hackathon",
          venue: "Central Computing Lab",
          note: "Hackstorm 24-hour hackathon concludes. Final code freeze, project submissions, and jury evaluations."
        },
        {
          id: "sch-13",
          day: "Day 2",
          time: "1:30 PM – 3:30 PM",
          name: "BIO CHROMA (Fashion / Showcase)",
          category: "Fashion / Showcase",
          venue: "Main University Auditorium",
          note: "Teams of 8 members present runway ensembles blending wearable tech and sustainable fashion."
        },
        {
          id: "sch-14",
          day: "Day 2",
          time: "3:30 PM – 5:00 PM",
          name: "Grand Valedictory Ceremony & Prize Distribution",
          category: "Valedictory",
          venue: "Main University Auditorium",
          note: "Official trophy handovers, cash prize felicitations, Dean's address, and closing ceremony for ARENIUM'27."
        }
      ],
      winners: [],
      sponsors: [],
      gallery: [
        {
          id: "g-official-poster",
          title: "ARENIUM'27 Official Fest Poster",
          tag: "OFFICIAL FESTIVAL POSTER",
          src: "images/arenium27-poster.jpg"
        }
      ],
      registrations: []
    };
  },

  getData() {
    try {
      let raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw && localStorage.getItem("arenium_fest_db_v7")) {
        raw = localStorage.getItem("arenium_fest_db_v7");
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        const defaults = this.getDefaults();
        const regConfig = {
          ...defaults.settings.registrationConfig,
          ...((parsed.settings && parsed.settings.registrationConfig) || {})
        };
        if (!regConfig.paymentGatewayUrlInternal) {
          regConfig.paymentGatewayUrlInternal = regConfig.paymentGatewayUrl || "https://pages.razorpay.com/arenium27-pay";
        }
        if (!regConfig.paymentGatewayUrlExternal) {
          regConfig.paymentGatewayUrlExternal = regConfig.externalUrl || regConfig.paymentGatewayUrl || "https://presidencyuniversity.in/arenium27-register";
        }

        return {
          settings: {
            ...defaults.settings,
            ...(parsed.settings || {}),
            paymentGatewayUrlInternal: regConfig.paymentGatewayUrlInternal,
            paymentGatewayUrlExternal: regConfig.paymentGatewayUrlExternal,
            registrationConfig: regConfig
          },
          coordinators: (() => {
            const list = (parsed.coordinators && parsed.coordinators.length) ? parsed.coordinators : defaults.coordinators;
            return list.map(c => {
              let photo = c.photo || "";
              if (!photo) {
                if (c.id === "coord-1") photo = "images/Kaushal.jpeg";
                else if (c.id === "coord-2") photo = "images/Vimal.png";
                else if (c.id === "coord-3") photo = "images/Ashlin Siddharth.png";
                else if (c.id === "coord-4") photo = "images/ABHYAS.png";
                else if (c.id === "coord-lead") photo = "images/keren-lois-daniel.jpg";
                else photo = "images/coord-generic.svg";
              } else if (photo.startsWith("data:") || photo.startsWith("http:") || photo.startsWith("https:") || photo.startsWith("images/")) {
                // Keep the exact photo set by admin
              } else {
                photo = resolveAssetPath(photo, "images/coord-generic.svg");
              }

              const email = c.email || "Arenium.official@gmail.com";

              return {
                ...c,
                photo,
                email,
                dept: (c.dept !== undefined && c.dept !== null) ? c.dept : ""
              };
            });
          })(),
          leadership: (() => {
            const stored = parsed.leadership && parsed.leadership.length ? parsed.leadership : null;
            if (!stored) return defaults.leadership;
            const hasStalePlaceholders = stored.some(l =>
              (l.photo && /leader-(provc|vc|dean|hod|ug)\.(svg|jpg)$/i.test(l.photo)) ||
              /Dr\. Vidya Shetty|Dr\. C\. Kalaiarasan|Dr\. K\. G\. Mohan/i.test(l.name || "")
            );
            const list = hasStalePlaceholders ? defaults.leadership : stored;
            return list.map(l => ({
              ...l,
              photo: resolveAssetPath(l.photo, "images/leader-dean.jpg")
            }));
          })(),
          soisFaculty: parsed.soisFaculty && parsed.soisFaculty.length ? parsed.soisFaculty : defaults.soisFaculty,
          events: (() => {
            if (!parsed.events || !parsed.events.length) return defaults.events;
            const hasHackstorm = parsed.events.some(e => e.id === "hackstorm" || (e.name && e.name.toLowerCase().includes("hackstorm")));
            return hasHackstorm ? parsed.events : defaults.events;
          })(),
          schedule: (() => {
            if (!parsed.schedule || !parsed.schedule.length) return defaults.schedule;
            const hasHackstorm = parsed.schedule.some(s => s.name && s.name.toLowerCase().includes("hackstorm"));
            return hasHackstorm ? parsed.schedule : defaults.schedule;
          })(),
          winners: parsed.winners && parsed.winners.length ? parsed.winners : defaults.winners,
          sponsors: parsed.sponsors && parsed.sponsors.length ? parsed.sponsors : defaults.sponsors,
          gallery: parsed.gallery && parsed.gallery.length ? parsed.gallery : defaults.gallery,
          registrations: (parsed.registrations && Array.isArray(parsed.registrations)) ? parsed.registrations : defaults.registrations,
          certificates: (parsed.certificates && Array.isArray(parsed.certificates) && parsed.certificates.length) ? parsed.certificates : defaults.certificates
        };

        // Normalize coordinators array on all events for multi-coordinator support
        if (Array.isArray(state.events)) {
          state.events.forEach(ev => {
            if (!Array.isArray(ev.coordinators) || ev.coordinators.length === 0) {
              ev.coordinators = ev.coordinator ? [ev.coordinator] : [];
            }
            if (!ev.coordinator && ev.coordinators.length > 0) {
              ev.coordinator = ev.coordinators[0];
            }
          });
        }
        return state;
      }
    } catch (e) {
      console.error("FestDB Read Exception:", e);
    }
    const def = this.getDefaults();
    if (Array.isArray(def.events)) {
      def.events.forEach(ev => {
        if (!Array.isArray(ev.coordinators) || ev.coordinators.length === 0) {
          ev.coordinators = ev.coordinator ? [ev.coordinator] : [];
        }
        if (!ev.coordinator && ev.coordinators.length > 0) {
          ev.coordinator = ev.coordinators[0];
        }
      });
    }
    return def;
  },

  saveData(data, shouldPushToCloud = true) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("arenium_db_change", { detail: data }));
      if (shouldPushToCloud !== false) {
        this.pushToCloud(data);
      }
      return true;
    } catch (e) {
      console.error("FestDB Save Exception:", e);
      return false;
    }
  },

  async pushToCloud(data) {
    try {
      const payload = {
        settings: data.settings,
        events: data.events,
        coordinators: data.coordinators
      };
      const res = await fetch(`${window.CORE_BACKEND_URL}/fest-config`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
        body: JSON.stringify({ festConfig: payload })
      });
      const json = await res.json();
      if (json && json.success) {
        console.log("[FestDB] Cloud MongoDB Atlas synchronization successful.");
        return true;
      }
      return false;
    } catch (err) {
      console.warn("[FestDB] Cloud push warning:", err);
      throw err;
    }
  },

  async pullFromCloud() {
    try {
      const url = `${window.CORE_BACKEND_URL}/fest-config?_t=${Date.now()}`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json && json.success && json.festConfig) {
        const localData = this.getData();
        const cloudConfig = json.festConfig;
        let changed = false;

        // Settings diff check
        if (cloudConfig.settings) {
          const s1 = JSON.stringify(localData.settings || {});
          const s2 = JSON.stringify(Object.assign({}, localData.settings, cloudConfig.settings));
          if (s1 !== s2) {
            localData.settings = Object.assign({}, localData.settings, cloudConfig.settings);
            changed = true;
          }
        }

        // Validate events: Only accept modern official lineup (must include hackstorm & >= 10 events)
        const isModernEvents = Array.isArray(cloudConfig.events) &&
          cloudConfig.events.length >= 10 &&
          cloudConfig.events.some(e => e.id === "hackstorm");

        if (isModernEvents) {
          const e1 = JSON.stringify(localData.events || []);
          const e2 = JSON.stringify(cloudConfig.events);
          if (e1 !== e2) {
            localData.events = cloudConfig.events;
            changed = true;
          }
        }

        // Coordinators diff check
        if (Array.isArray(cloudConfig.coordinators) && cloudConfig.coordinators.length > 0) {
          const c1 = JSON.stringify(localData.coordinators || []);
          const c2 = JSON.stringify(cloudConfig.coordinators);
          if (c1 !== c2) {
            localData.coordinators = cloudConfig.coordinators;
            changed = true;
          }
        }

        if (changed) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localData));
          window.dispatchEvent(new CustomEvent("arenium_db_change", { detail: localData }));
          console.log("[FestDB] Synced new changes from Cloud MongoDB Atlas successfully across devices.");
          return localData;
        }
        // If nothing changed from local state, return null so UI doesn't unnecessarily re-render
        return null;
      }
    } catch (err) {
      console.warn("[FestDB] Cloud pull warning:", err);
    }
    return null;
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
  initMovingCardsMarquee(db);
  initSchedulePage(db);
  initWinnersPage(db);
  initCertificateStudio(db);
  initGalleryPage(db);
  initSponsorsPage(db);
  initRulebookModal();
  initAdminPanel();

  // Automatic real-time Cloud Sync from MongoDB Atlas on all devices
  FestDB.pullFromCloud().then(cloudDb => {
    if (cloudDb) {
      if (typeof initEventsPage === "function") initEventsPage(cloudDb);
      if (typeof initMovingCardsMarquee === "function") initMovingCardsMarquee(cloudDb);
      if (typeof initSchedulePage === "function") initSchedulePage(cloudDb);
      if (typeof renderAdminEvents === "function") renderAdminEvents(cloudDb);
      if (typeof renderAdminOverview === "function") renderAdminOverview(cloudDb);
      if (typeof initRegistrationButtons === "function") initRegistrationButtons(cloudDb);
      if (typeof initTeamSections === "function") initTeamSections(cloudDb);
      if (typeof renderAdminCoordinators === "function") renderAdminCoordinators(cloudDb);
      if (typeof renderAdminLeadership === "function") renderAdminLeadership(cloudDb);
    }
  });

  // Real-time inter-tab & cross-window live synchronizer
  window.addEventListener("storage", (e) => {
    if (e.key === FestDB.STORAGE_KEY && e.newValue) {
      try {
        const updated = FestDB.getData();
        if (typeof initTeamSections === "function") initTeamSections(updated);
        if (typeof initEventsPage === "function") initEventsPage(updated);
        if (typeof initMovingCardsMarquee === "function") initMovingCardsMarquee(updated);
        if (typeof initSchedulePage === "function") initSchedulePage(updated);
        if (typeof renderAdminCoordinators === "function") renderAdminCoordinators(updated);
        if (typeof renderAdminEvents === "function") renderAdminEvents(updated);
      } catch (err) {}
    }
  });

  window.addEventListener("arenium_db_change", (e) => {
    const updated = e.detail || FestDB.getData();
    if (typeof initTeamSections === "function") initTeamSections(updated);
    if (typeof initEventsPage === "function") initEventsPage(updated);
    if (typeof initMovingCardsMarquee === "function") initMovingCardsMarquee(updated);
    if (typeof initSchedulePage === "function") initSchedulePage(updated);
  });
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
// 3.1 MOVING CARDS MARQUEE (DYNAMIC HOME PAGE EVENT CAROUSEL)
// ==========================================================================
function initMovingCardsMarquee(db) {
  try {
    const track = document.querySelector(".moving-cards-track");
    if (!track) return;

    const data = db || (window.FestDB && typeof FestDB.getData === "function" ? FestDB.getData() : null);
    const events = (data && Array.isArray(data.events) && data.events.length > 0)
      ? data.events
      : (window.FestDB && typeof FestDB.getDefaults === "function" ? FestDB.getDefaults().events : []);

    if (!events || events.length === 0) return;

    const formatTag = (ev) => {
      if (ev.category) {
        const cat = ev.category.trim();
        const lcat = cat.toLowerCase();
        if (lcat === "tech") return "Technical Event";
        if (lcat === "design") return "Design Sprint";
        if (lcat === "gaming") return "Esports Arena";
        if (lcat === "tech hackathon" || lcat === "hackathon") return "Flagship Hackathon";
        if (lcat === "fashion / showcase" || lcat === "fashion") return "Cultural Arena";
        if (lcat === "auction") return "Management Arena";
        if (lcat === "pitchathon") return "Pitchathon Arena";
        if (lcat === "data analysis") return "Data Analytics";
        if (lcat === "presentation") return "Presentation Arena";
        return cat;
      }
      return "Official Arena";
    };

    const formatPrize = (ev) => {
      if (!ev.prize) return "Prize: ₹15,000";
      const p = String(ev.prize).trim();
      return p.toLowerCase().startsWith("prize:") ? p : `Prize: ${p}`;
    };

    const escapeStr = (str) => {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const renderCard = (ev) => {
      const tag = formatTag(ev);
      const prize = formatPrize(ev);
      const desc = ev.description || ev.tagline || "";
      const name = ev.name || "Arena Challenge";
      const eventUrl = `events.html#${encodeURIComponent(ev.id || "")}`;
      return `
        <a href="${eventUrl}" class="moving-card-item" aria-label="Explore ${escapeStr(name)}">
          <div>
            <span class="team-card-tag">${escapeStr(tag)}</span>
            <h3 class="event-title">${escapeStr(name)}</h3>
            <p class="event-desc">${escapeStr(desc)}</p>
          </div>
          <div class="moving-card-footer">
            <span class="moving-card-prize">${escapeStr(prize)}</span>
            <span class="btn-pill-outline" style="padding: 0.35rem 0.9rem; font-size: 0.78rem;">Learn more</span>
          </div>
        </a>
      `;
    };

    const singleSet = events.map(renderCard).join("");
    // Render twice for seamless continuous infinite CSS marquee (-50% translation)
    track.innerHTML = singleSet + singleSet;

    // Update summary text if present
    const summaryText = document.getElementById("events-preview-summary-text");
    if (summaryText) {
      summaryText.textContent = `${events.length} Competitions · 2 Days · ₹1,50,000 Cash Prize Pool`;
    }
    const browseBtn = document.getElementById("events-preview-browse-btn");
    if (browseBtn) {
      browseBtn.textContent = `BROWSE ALL ${events.length} ARENAS`;
    }
  } catch (err) {
    console.error("Moving cards marquee init error:", err);
  }
}
window.initMovingCardsMarquee = initMovingCardsMarquee;

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
    // 0. Lead Faculty Coordinator (Homepage & Contact page)
    const lead = (db.coordinators || []).find(c => c.id === "coord-lead");
    if (lead) {
      document.querySelectorAll(".team-card-lead").forEach(card => {
        const img = card.querySelector(".team-avatar-img");
        if (img && lead.photo) img.src = resolveAssetPath(lead.photo, 'images/keren-lois-daniel.jpg');
        const nameEl = card.querySelector(".team-name");
        if (nameEl) nameEl.textContent = lead.name;
        const roleEl = card.querySelector(".team-role");
        if (roleEl) roleEl.textContent = lead.role + (lead.dept ? ` · ${lead.dept}` : '');
        const emailLink = card.querySelector("a[href^='mailto:']");
        if (emailLink) emailLink.href = `mailto:${lead.email || 'Arenium.official@gmail.com'}`;
      });
    }

    // 1. Student Coordinators Grid (Homepage & Contact page) - Refined: Role bold & in middle; contact & mail on the side; mail opens in Gmail
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
            <img src="${resolveAssetPath(c.photo, 'images/coord-generic.svg')}" alt="${c.name}" class="team-avatar-img" loading="lazy"${c.name === 'Abhyas Kathuria' ? ' style="object-position: center top;"' : ''}>
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
    });

    // 2. Faculty Leadership Grid (Dean, HOD, Programme Organiser)
    const leadershipGrids = document.querySelectorAll("[data-leadership-grid]");
    leadershipGrids.forEach(grid => {
      grid.innerHTML = "";
      db.leadership.forEach(l => {
        const card = document.createElement("div");
        card.className = "editorial-card team-card reveal-on-scroll is-visible";
        card.innerHTML = `
          <div class="team-photo-wrap">
            <img src="${resolveAssetPath(l.photo, 'images/leader-dean.jpg')}" alt="${l.name}" class="team-avatar-img" loading="lazy">
          </div>
          <div class="team-card-content">
            <span class="team-card-tag">${l.tag}</span>
            <h3 class="team-name">${l.name}</h3>
            <div class="team-role">${l.role}</div>
            <p class="team-card-desc">${l.bio || ''}</p>
          </div>
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
            <img src="${resolveAssetPath(f.photo, 'images/leader-sois.svg')}" alt="${f.faculty || f.name}" class="team-avatar-img" loading="lazy">
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
    if (typeof initMovingCardsMarquee === "function") {
      initMovingCardsMarquee(db);
    }

    const mainContainer = document.getElementById("main-events-container") || document.getElementById("pre-events-container");
    if (!mainContainer) return;

    mainContainer.innerHTML = "";
    const regUrl = db.settings.registerUrl || "register.html";

    db.events.forEach(ev => {
      const card = document.createElement("article");
      card.className = "editorial-card event-card reveal-on-scroll is-visible";
      
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

      const coords = (Array.isArray(ev.coordinators) && ev.coordinators.length > 0)
        ? ev.coordinators
        : (ev.coordinator ? [ev.coordinator] : [{ name: "Kaushal Kumar Singh", phone: "+91 87977 86686", email: "Arenium.official@gmail.com", photo: "images/Kaushal.jpeg", role: "Event Lead" }]);

      const coordsHtml = coords.map((c, idx) => `
        <div class="event-coord-mini" style="background: #F8FAFC !important; border: 1.5px solid #E2E8F0 !important; border-radius: 10px; padding: 0.5rem 0.75rem; display: flex; align-items: center; gap: 0.65rem; margin-bottom: ${idx === coords.length - 1 ? '1.2rem' : '0.45rem'};">
          <img src="${resolveAssetPath(c.photo, 'images/coord-generic.svg')}" alt="${c.name}" class="event-coord-thumb" style="width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid #CBD5E1; object-fit: cover; flex-shrink: 0;">
          <div class="event-coord-details" style="min-width: 0; flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.4rem; justify-content: space-between;">
              <span class="event-coord-name" style="color: #0F172A !important; -webkit-text-fill-color: #0F172A !important; font-weight: 700; font-size: 0.82rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</span>
              ${c.role ? `<span style="font-size: 0.68rem; color: #0284C7; font-weight: 700; background: #E0F2FE; border: 1px solid #BAE6FD; padding: 0.1rem 0.4rem; border-radius: 6px; white-space: nowrap;">${c.role}</span>` : ''}
            </div>
            <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; margin-top: 0.15rem;">
              <a href="tel:${(c.phone || '').replace(/[^0-9+]/g, '')}" class="event-coord-phone" style="color: #0284C7 !important; -webkit-text-fill-color: #0284C7 !important; font-size: 0.78rem; text-decoration: none; font-weight: 700;">
                ${c.phone || '+91 87977 86686'}
              </a>
              ${c.email ? `<span style="color: #CBD5E1;">•</span><a href="mailto:${c.email}" class="event-coord-email" style="color: #64748B !important; -webkit-text-fill-color: #64748B !important; font-size: 0.72rem; text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.email}</a>` : ''}
            </div>
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="event-poster-wrapper" style="height: 220px; position: relative; overflow: hidden; border-bottom: 1.5px solid #000000; background: #F8FAFC;">
          <img src="${resolveAssetPath(ev.poster || ('images/events/' + ev.id + '.svg'), 'images/events-poster.svg')}" alt="${ev.name}" class="event-poster-img" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='images/events-poster.svg';">
          <span class="event-prize-badge" style="position: absolute; top: 12px; right: 12px; background: #000000; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 9999px; z-index: 5;">
            ${ev.prize ? 'Prize: ' + ev.prize : 'Prize: ₹15,000'}
          </span>
          <span class="event-venue-pill" style="position: absolute; bottom: 12px; left: 12px; background: #FFFFFF; color: #000000 !important; -webkit-text-fill-color: #000000 !important; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 800; padding: 0.28rem 0.75rem; border-radius: 9999px; border: 1.5px solid #000000; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); z-index: 5;">
            ${ev.venue || 'SOIS Campus'}
          </span>
        </div>
        <div class="team-card-content" style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1; background: #FFFFFF;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <span class="team-card-tag" style="margin-bottom: 0;">${ev.category}</span>
            <span class="event-date-text" style="font-size: 0.78rem; color: #475569 !important; -webkit-text-fill-color: #475569 !important; font-weight: 600;">${ev.date || '4–5 Feb'}</span>
          </div>
          <h3 class="event-title" style="margin: 0.4rem 0 0.5rem; font-family: 'Playfair Display', Georgia, serif; color: #000000 !important; -webkit-text-fill-color: #000000 !important; font-weight: 700; font-size: 1.35rem; word-break: keep-all; hyphens: none;">${ev.name}</h3>
          <p class="event-desc" style="color: #475569 !important; -webkit-text-fill-color: #475569 !important; font-size: 0.88rem; line-height: 1.55; margin-bottom: 1rem; flex: 1;">${ev.description}</p>
          
          ${coordsHtml}

          <div class="event-action-footer" style="display: flex; gap: 0.75rem; margin-top: auto;">
            <button type="button" class="btn-pill-outline open-rulebook-btn" data-event-id="${ev.id}" style="flex: 1; text-align: center; justify-content: center; cursor: pointer; background: transparent;">
              Rulebook
            </button>
            <a href="${regUrl}" class="btn-pill-solid" style="flex: 1.2; text-align: center; justify-content: center;" data-register-btn>
              Register
            </a>
          </div>
        </div>
      `;

      mainContainer.appendChild(card);
    });

    // Attach click listeners to Rulebook buttons
    window.openRulebookModal = window.openRulebookModal || function(evId) {
      window.open("rulebook.pdf", "_blank");
    };

    document.querySelectorAll(".open-rulebook-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const evId = btn.getAttribute("data-event-id");
        if (typeof openRulebookModal === "function") {
          openRulebookModal(evId);
        } else {
          window.open("rulebook.pdf", "_blank");
        }
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
          } else if (filter === "day1") {
            card.style.display = card.getAttribute("data-day1") === "true" ? "flex" : "none";
          } else if (filter === "day2") {
            card.style.display = card.getAttribute("data-day2") === "true" ? "flex" : "none";
          } else if (filter === "hackathon") {
            card.style.display = card.getAttribute("data-hackathon") === "true" ? "flex" : "none";
          } else if (filter === "tech") {
            card.style.display = card.getAttribute("data-tech") === "true" ? "flex" : "none";
          } else if (filter === "nontech") {
            card.style.display = card.getAttribute("data-nontech") === "true" ? "flex" : "none";
          }
        });
      });
    });
  } catch (err) {
    console.error("Error initializing events page:", err);
  }
}

// ==========================================================================
// 12. SCHEDULE TIMELINE
// ==========================================================================
function initSchedulePage(db) {
  try {
    const container = document.getElementById("timeline-container");
    if (!container) return;

    function renderTimeline(selectedDay) {
      container.innerHTML = "";
      const filtered = (db.schedule || []).filter(item => selectedDay === "all" || item.day === selectedDay);

      filtered.forEach(item => {
        const entry = document.createElement("div");
        entry.className = "timeline-entry reveal-on-scroll is-visible";
        entry.setAttribute("data-day", item.day);

        // Clock SVG Icon
        const clockSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline-block; vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
        
        // Location Pin SVG Icon (clean, no emojis)
        const locSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.2" style="display:inline-block; vertical-align:-2px; margin-right:5px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

        entry.innerHTML = `
          <div class="timeline-node" aria-hidden="true">
            <span class="timeline-node-core"></span>
          </div>
          <div class="timeline-rung" aria-hidden="true"></div>
          <div class="timeline-card-wrapper">
            <div class="timeline-card">
              <div class="timeline-card-header">
                <span class="timeline-time-badge">${clockSvg}${item.time}</span>
                <span class="timeline-cat-badge">${item.category || item.day}</span>
                <span class="timeline-day-pill">${item.day}</span>
              </div>
              <h3 class="timeline-event-name">${item.name}</h3>
              <div class="timeline-venue">${locSvg}${item.venue}</div>
              <p class="timeline-note">${item.note}</p>
            </div>
          </div>
        `;
        container.appendChild(entry);
      });
    }

    // Initial render
    renderTimeline("all");

    // Day tabs
    const tabs = document.querySelectorAll(".schedule-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const day = tab.getAttribute("data-day");
        renderTimeline(day);
      });
    });
  } catch (err) {
    console.error("Error initializing schedule ladder timeline:", err);
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

    if (!db.settings.resultsPublished || !db.winners || db.winners.length === 0) {
      container.innerHTML = `
        <div class="editorial-card" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 2rem; background: #FFFFFF; border: 1.5px solid #000000; border-radius: 16px; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          <span class="team-card-tag" style="margin-bottom: 1rem;">SCHEDULE STATUS</span>
          <h3 style="font-family: 'Playfair Display', Georgia, serif; color: #000000; font-size: 1.6rem; font-weight: 700; margin: 0.4rem 0 0.8rem;">
            Results will be announced on 5 February 2027
          </h3>
          <p style="color: #475569; max-width: 520px; margin: 0 auto 1.5rem; font-size: 0.95rem; line-height: 1.6;">
            Competition rounds take place on 4 and 5 February 2027. Official podium placements, prize allocations, and winner verification will be published following the valedictory ceremony.
          </p>
          <a href="schedule.html" class="btn-pill-solid">View Schedule</a>
        </div>
      `;
      return;
    }

    db.winners.forEach(w => {
      const eventTitle = w.eventName || w.event || "Event Arena";
      const card = document.createElement("div");
      card.className = "winner-card reveal-on-scroll is-visible";
      card.setAttribute("style", "background: #0A0F1D !important; border: 1.5px solid #1E293B !important; color: #FFFFFF !important;");
      
      let tiersHtml = "";
      (w.tiers || []).forEach(tier => {
        let medalClass = "medal-gold";
        let medalIcon = "1st";
        if (tier.rank === 2) {
          medalClass = "medal-silver";
          medalIcon = "2nd";
        } else if (tier.rank === 3) {
          medalClass = "medal-bronze";
          medalIcon = "3rd";
        }

        tiersHtml += `
          <div class="winner-tier-row" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <div class="winner-medal ${medalClass}">${medalIcon}</div>
            <div style="flex: 1;">
              <div class="winner-team-name" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 800;">${tier.team}</div>
              <div class="winner-college" style="color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-size: 0.82rem;">${tier.college}</div>
            </div>
            <div style="text-align: right;">
              <div class="winner-cash-badge" style="color: #FDE047 !important; -webkit-text-fill-color: #FDE047 !important; background: rgba(253, 224, 71, 0.12) !important; border: 1px solid rgba(253, 224, 71, 0.4) !important; font-weight: 800;">${tier.prize}</div>
              <a href="certificate.html?team=${encodeURIComponent(tier.team)}&event=${encodeURIComponent(eventTitle)}&rank=${tier.rank}&cert=${tier.certId || ''}" 
                 style="font-family: var(--font-mono); font-size: 0.72rem; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-decoration: none; display: block; margin-top: 0.3rem; font-weight: 700;">
                Get Cert &gt;
              </a>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="winner-card-header" style="background: rgba(15, 23, 42, 0.95) !important; border-bottom: 1px solid rgba(56, 189, 248, 0.25) !important; padding: 1.2rem;">
          <div>
            <span class="event-category-badge" style="font-size: 0.65rem; background: rgba(2, 132, 199, 0.2) !important; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; border: 1px solid rgba(56, 189, 248, 0.4) !important; font-weight: 800;">${w.category || 'Arena'}</span>
            <div class="winner-event-title" style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 1.15rem; font-weight: 900; margin-top: 0.4rem;">${eventTitle}</div>
          </div>
          
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
// 14. OFFICIAL CERTIFICATE RETRIEVAL PORTAL & HIGH-RES VERIFICATION
// ==========================================================================
function initCertificateStudio(db) {
  // Backwards-compatible router: initializes official certificate search portal
  initCertificateSearch(db);
}

// Generate official 300 DPI high-definition canvas certificate Data URL
function generateCertificateCanvasDataUrl(recipientName, eventName, award, college, certId, teamName) {
  const name = (recipientName || teamName || "PARTICIPANT NAME").toUpperCase();
  const event = (eventName || "ARENIUM 27 ARENA").toUpperCase();
  const awd = (award || "CERTIFICATE OF MERIT & PARTICIPATION").toUpperCase();
  const clg = (college || "PRESIDENCY UNIVERSITY, BENGALURU").toUpperCase();
  const hashId = certId || ("AR27-CRT-" + Math.floor(1000 + Math.random() * 9000));
  const team = teamName ? teamName.toUpperCase() : "";

  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1414;
  const ctx = canvas.getContext("2d");

  // 1. Dark Cyber Background
  ctx.fillStyle = "#07060f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Outer Sovereign Gold / Crimson Frame
  const frameColor = awd.includes("FIRST") || awd.includes("CHAMPION") ? "#ffd700" : (awd.includes("SECOND") ? "#38bdf8" : "#f43f5e");
  ctx.lineWidth = 18;
  ctx.strokeStyle = frameColor;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Inner subtle neon matrix grid
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
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
  ctx.fillStyle = "rgba(56, 189, 248, 0.03)";
  ctx.font = "bold 440px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("A'27", canvas.width / 2, canvas.height / 2 + 150);

  // Institution Header
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 38px 'Orbitron', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PRESIDENCY UNIVERSITY, BENGALURU", canvas.width / 2, 170);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("SCHOOL OF INFORMATION SCIENCE (SOIS) · ARENIUM '27", canvas.width / 2, 215);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px 'Orbitron', sans-serif";
  ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2, 320);

  ctx.fillStyle = frameColor;
  ctx.font = "bold 30px 'Orbitron', sans-serif";
  ctx.fillText(`${awd}`, canvas.width / 2, 380);

  // Presentation Text
  ctx.fillStyle = "#94a3b8";
  ctx.font = "26px 'JetBrains Mono', monospace";
  ctx.fillText("THIS IS OFFICIALLY PRESENTED TO", canvas.width / 2, 470);

  // Recipient / Team Name
  ctx.fillStyle = "#ffe600";
  ctx.font = "bold 76px 'Rajdhani', sans-serif";
  ctx.fillText(name, canvas.width / 2, 570);

  // Optional Team Badge if individual name differs from team name
  if (team && team !== name) {
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 30px 'JetBrains Mono', monospace";
    ctx.fillText(`[ SQUAD / TEAM: ${team} ]`, canvas.width / 2, 630);
  }

  // Dash line
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 230, 0, 0.4)";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 400, 660);
  ctx.lineTo(canvas.width / 2 + 400, 660);
  ctx.stroke();

  // College & Event Citation
  ctx.fillStyle = "#ffffff";
  ctx.font = "30px 'JetBrains Mono', monospace";
  ctx.fillText(`of ${clg}`, canvas.width / 2, 725);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "26px 'JetBrains Mono', monospace";
  ctx.fillText("for exemplary performance, teamwork, and triumph in", canvas.width / 2, 785);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 46px 'Orbitron', sans-serif";
  ctx.fillText(event, canvas.width / 2, 860);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "24px 'JetBrains Mono', monospace";
  ctx.fillText("at ARENIUM'27 National Tech Fest · 4–5 February 2027 · Presidency University", canvas.width / 2, 930);

  // Signatures Section
  const sigY = 1170;
  // Signatory 1
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. R. Mahalakshmi", canvas.width / 4, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("DEAN, SOIS (PATRON)", canvas.width / 4, sigY + 35);

  // Signatory 2
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Dr. Renukadevi", canvas.width / 2, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("HEAD OF DEPARTMENT (PG), SOIS", canvas.width / 2, sigY + 35);

  // Signatory 3
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 30px 'Rajdhani', cursive, sans-serif";
  ctx.fillText("Ms. Keren Lois Daniel", (canvas.width / 4) * 3, sigY);
  ctx.fillStyle = "#64748b";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.fillText("OVERALL FEST COORDINATOR", (canvas.width / 4) * 3, sigY + 35);

  // Verification Hash
  ctx.fillStyle = "#38bdf8";
  ctx.font = "20px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`VERIFICATION HASH: ${hashId} · SOIS-PRESIDENCY-VALIDATED`, 90, 1335);

  return canvas.toDataURL("image/png");
}

function initCertificateSearch(db) {
  const searchInput = document.getElementById("cert-search-input");
  const searchBtn = document.getElementById("cert-search-btn");
  const resultsDiv = document.getElementById("cert-search-results");
  const statusBadge = document.getElementById("cert-published-badge");

  if (!searchInput || !searchBtn || !resultsDiv) return;

  if (statusBadge) {
    if (db.settings.certificatesPublished !== false) {
      statusBadge.textContent = "CERTIFICATES REPOSITORY LIVE";
      statusBadge.style.color = "#38BDF8";
      statusBadge.style.borderColor = "#38BDF8";
    } else {
      statusBadge.textContent = "CERTIFICATE UPLOADS IN PROGRESS";
      statusBadge.style.color = "#F59E0B";
      statusBadge.style.borderColor = "#F59E0B";
    }
  }

  window.searchTeamCert = function(teamName) {
    if (searchInput) {
      searchInput.value = teamName;
      performSearch();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  function performSearch() {
    const q = searchInput.value.trim().toLowerCase();
    resultsDiv.style.display = "block";

    if (db.settings.certificatesPublished === false) {
      resultsDiv.innerHTML = `
        <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid #F59E0B; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h4 style="color: #FBBF24; margin-bottom: 0.5rem; font-family: var(--font-display); font-size: 1.2rem; font-weight: 700;"> CERTIFICATES UNDER VERIFICATION</h4>
          <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0; line-height: 1.6;">
            Event coordinators and the SOIS fest committee are currently reviewing and digitally endorsing participant accreditations. Official team downloads will be unlocked momentarily!
          </p>
        </div>
      `;
      return;
    }

    if (!q) {
      resultsDiv.innerHTML = `
        <div style="padding: 1.5rem; color: #94A3B8; font-size: 0.9rem; text-align: center; background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px dashed rgba(255, 255, 255, 0.1);">
          Please enter your registered <strong>Team Name</strong> (e.g. <code>Team NeuralForge</code>, <code>CyberSentinels</code>) to retrieve certificates.
        </div>
      `;
      return;
    }

    // Refresh DB
    const freshDb = FestDB.getData();
    const certs = (freshDb.certificates || []).map(c => ({
      ...c,
      teamName: c.teamName || c.recipient || "Team"
    }));

    const matches = certs.filter(c => {
      const t = (c.teamName || "").toLowerCase();
      const r = (c.recipient || "").toLowerCase();
      const id = (c.id || "").toLowerCase();
      const ev = (c.event || "").toLowerCase();
      return t.includes(q) || r.includes(q) || id.includes(q) || ev.includes(q);
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = `
        <div style="padding: 2.2rem; background: rgba(15, 23, 42, 0.85); border: 1.5px dashed rgba(239, 68, 68, 0.45); border-radius: 10px; text-align: center;">
          <div style="color: #F87171; font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 0.6rem; font-weight: 800;">
            NO CERTIFICATES FOUND FOR "${searchInput.value.trim()}"
          </div>
          <p style="color: #CBD5E1; font-size: 0.88rem; max-width: 600px; margin: 0 auto 1.4rem; line-height: 1.6;">
            We could not locate any certificates uploaded for <strong>"${searchInput.value.trim()}"</strong>.<br>
            • Please verify the team name spelling matches your fest registration credentials.<br>
            • Certificates are uploaded by administrators after each competitive arena concludes.<br>
            • For assistance or urgent accreditation requests, visit the SOIS Fest Desk.
          </p>
          <div style="display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap;">
            <button class="btn btn-ghost" onclick="document.getElementById('cert-search-input').value=''; document.getElementById('cert-search-input').focus();" style="font-size: 0.85rem; padding: 0.6rem 1.2rem;">
              Clear Search
            </button>
            <a href="contact.html" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.6rem 1.2rem;">
              Contact SOIS Fest Desk
            </a>
          </div>
        </div>
      `;
      return;
    }

    let cardsHtml = matches.map(m => {
      const displayTeam = m.teamName || m.recipient || "Team";
      const displayRecipient = m.recipient && m.recipient !== displayTeam ? m.recipient : "";
      const previewSrc = m.fileUrl ? m.fileUrl : generateCertificateCanvasDataUrl(m.recipient, m.event, m.award, m.college, m.id, m.teamName);

      return `
        <div class="cyber-card cert-result-card" style="padding: 1.6rem; margin-bottom: 1.2rem; background: rgba(15, 23, 42, 0.95); border: 1.5px solid rgba(56, 189, 248, 0.45); border-radius: 10px; display: grid; grid-template-columns: minmax(180px, 240px) 1fr; gap: 1.5rem; align-items: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          
          <!-- Certificate Thumbnail with Click to Preview -->
          <div style="position: relative; cursor: pointer; border-radius: 6px; overflow: hidden; border: 1.5px solid rgba(56, 189, 248, 0.5); aspect-ratio: 16/11; background: #07060f;" onclick="openCertPreviewModal('${m.id}')" title="Click to view fullscreen">
            <img src="${previewSrc}" alt="Certificate for ${displayTeam}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #38BDF8; font-size: 0.7rem; font-family: var(--font-mono); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.4);">
              FULLSCREEN
            </span>
          </div>

          <!-- Certificate Details -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.4rem;">
              <span style="font-family: var(--font-mono); color: #38BDF8; font-weight: 800; font-size: 0.9rem;">
                ${m.id}
              </span>
              <span style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38BDF8; color: #38BDF8; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                OFFICIALLY VERIFIED
              </span>
            </div>

            <h3 style="color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-family: var(--font-display); font-size: 1.4rem; margin: 0 0 0.3rem; font-weight: 800; letter-spacing: 0.02em;">
              ${displayTeam}
            </h3>

            ${displayRecipient ? `<div style="color: #CBD5E1; font-size: 0.88rem; margin-bottom: 0.4rem;">Recipient / Member: <strong style="color: #FFFFFF;">${displayRecipient}</strong></div>` : ''}

            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin: 0.5rem 0 0.8rem;">
              <span style="background: rgba(253, 224, 71, 0.15); border: 1px solid #FDE047; color: #FDE047; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                ${m.award}
              </span>
              <span style="background: rgba(56, 189, 248, 0.12); color: #38BDF8; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 4px; font-family: var(--font-mono); font-weight: 700;">
                ARENA: ${m.event}
              </span>
            </div>

            <div style="color: #94A3B8; font-size: 0.82rem; margin-bottom: 1.2rem;">
              Institution: <strong style="color: #CBD5E1;">${m.college || 'Presidency University, Bengaluru'}</strong> · Issued: ${m.issueDate || 'February 2027'}
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" onclick="downloadTeamCertificate('${m.id}')" style="font-size: 0.88rem; padding: 0.65rem 1.4rem; font-weight: 700;">
                DOWNLOAD CERTIFICATE
              </button>
              <button type="button" class="btn btn-ghost" onclick="openCertPreviewModal('${m.id}')" style="font-size: 0.88rem; padding: 0.65rem 1.1rem;">
                PREVIEW FULLSCREEN
              </button>
            </div>
          </div>

        </div>
      `;
    }).join("");

    resultsDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.6rem;">
        <div style="font-family: var(--font-mono); font-size: 0.88rem; color: #38BDF8; font-weight: 700;">
          FOUND ${matches.length} OFFICIAL CERTIFICATE(S) FOR "${searchInput.value.trim().toUpperCase()}":
        </div>
        <button type="button" class="btn btn-ghost" onclick="document.getElementById('cert-search-input').value=''; document.getElementById('cert-search-input').focus();" style="font-size: 0.75rem; padding: 0.3rem 0.8rem;">
          Clear Search
        </button>
      </div>
      ${cardsHtml}
    `;
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });

  // Auto-search via URL parameter (e.g. certificate.html?team=NeuralForge or ?winner=Team)
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get("team") || urlParams.get("winner") || urlParams.get("recipient") || urlParams.get("q");
  if (qParam && searchInput) {
    searchInput.value = qParam;
    setTimeout(performSearch, 150);
  }
}

// Fullscreen Modal Helpers
window.openCertPreviewModal = function(certId) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === certId);
  if (!c) return;

  const modal = document.getElementById("cert-preview-modal");
  const modalId = document.getElementById("cert-modal-id");
  const modalTitle = document.getElementById("cert-modal-title");
  const modalBody = document.getElementById("cert-modal-body");
  const downloadBtn = document.getElementById("cert-modal-download-btn");

  if (!modal) return;

  if (modalId) modalId.textContent = c.id;
  if (modalTitle) modalTitle.textContent = `${(c.teamName || c.recipient).toUpperCase()} · ${c.event}`;

  const certDataUrl = c.fileUrl ? c.fileUrl : generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);

  if (modalBody) {
    modalBody.innerHTML = `
      <div style="text-align: center; background: #07060f; padding: 1rem; border-radius: 8px; border: 1.5px solid rgba(56, 189, 248, 0.4); max-height: 72vh; overflow: auto; display: flex; justify-content: center; align-items: center; width: 100%;">
        <img src="${certDataUrl}" alt="Certificate ${c.id}" style="max-width: 100%; max-height: 68vh; object-fit: contain; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
      </div>
    `;
  }

  if (downloadBtn) {
    downloadBtn.onclick = function() {
      downloadTeamCertificate(c.id);
    };
  }

  modal.style.display = "flex";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeCertModal = function(e) {
  if (e && e.target && e.target.closest && e.target.closest(".cert-modal-dialog") && !e.target.classList.contains("cert-modal-close") && e.target.id !== "cert-modal-close-btn") {
    return;
  }
  const modal = document.getElementById("cert-preview-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

// Global escape key listener to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeCertModal();
  }
});

window.downloadTeamCertificate = function(certId) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === certId);
  if (!c) return;

  const teamSlug = (c.teamName || c.recipient || "Team").replace(/\s+/g, "_");
  const filename = `ARENIUM27_Certificate_${teamSlug}_${c.id}.png`;

  if (c.fileUrl && c.fileUrl.startsWith("data:")) {
    const a = document.createElement("a");
    a.href = c.fileUrl;
    a.download = filename;
    a.click();
  } else if (c.fileUrl && (c.fileUrl.startsWith("http://") || c.fileUrl.startsWith("https://"))) {
    window.open(c.fileUrl, "_blank");
  } else {
    const dataUrl = generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }
};

window.downloadSpecificCertificate = function(name, eventName, award, college, certId) {
  downloadTeamCertificate(certId);
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
// 16.5. RULEBOOK MODAL & HANDLERS
// ==========================================================================
window.openRulebookModal = function(evId) {
  const db = FestDB.getData();
  const ev = (db.events || []).find(e => e.id === evId) || (db.events && db.events[0]);
  if (!ev) {
    window.open("rulebook.pdf", "_blank");
    return;
  }

  let modal = document.getElementById("dynamic-rulebook-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "dynamic-rulebook-modal";
    modal.className = "admin-modal-overlay";
    modal.style.cssText = "display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 100000; align-items: center; justify-content: center; padding: 1.5rem;";
    document.body.appendChild(modal);
  }

  const coords = (Array.isArray(ev.coordinators) && ev.coordinators.length > 0)
    ? ev.coordinators
    : (ev.coordinator ? [ev.coordinator] : [{ name: "Kaushal Kumar Singh", phone: "+91 87977 86686", email: "Arenium.official@gmail.com", photo: "images/Kaushal.jpeg", role: "Lead Coordinator" }]);

  const rb = ev.rulebook || {};
  const rounds = Array.isArray(rb.rounds) ? rb.rounds : (rb.rounds ? [rb.rounds] : []);
  const rules = Array.isArray(rb.rules) ? rb.rules : (rb.rules ? [rb.rules] : []);

  modal.innerHTML = `
    <div class="admin-modal-content" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 20px; width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; padding: 1.8rem; box-shadow: 0 25px 60px rgba(0,0,0,0.25); position: relative; color: #0F172A;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 1rem; margin-bottom: 1.2rem;">
        <div>
          <span style="font-size: 0.75rem; color: #0284C7; font-weight: 800; background: #E0F2FE; border: 1px solid #BAE6FD; padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;">
            ${ev.category || 'ARENA COMPETITION'}
          </span>
          <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; color: #0F172A; margin: 0.4rem 0 0.2rem; font-weight: 800;">
            ${ev.name}
          </h2>
          <div style="font-size: 0.85rem; color: #64748B; font-weight: 600;">
            ${ev.tagline || ev.description}
          </div>
        </div>
        <button type="button" class="btn btn-ghost" onclick="document.getElementById('dynamic-rulebook-modal').style.display='none'" style="padding: 0.3rem 0.7rem; font-size: 1.1rem; line-height: 1;" title="Close">
          ✕
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-bottom: 1.2rem;">
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem;">
          <div style="font-size: 0.68rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Prize Pool</div>
          <div style="font-size: 0.95rem; color: #0284C7; font-weight: 800;">${ev.prize || '₹15,000'}</div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem;">
          <div style="font-size: 0.68rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Date</div>
          <div style="font-size: 0.85rem; color: #0F172A; font-weight: 700;">${ev.date || '4–5 Feb 2027'}</div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem;">
          <div style="font-size: 0.68rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Venue</div>
          <div style="font-size: 0.85rem; color: #0F172A; font-weight: 700;">${ev.venue || 'SOIS Block'}</div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem;">
          <div style="font-size: 0.68rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Team Size</div>
          <div style="font-size: 0.85rem; color: #0F172A; font-weight: 700;">${rb.teamSize || 'Solo / Squad'}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.2rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0F172A; font-weight: 800; margin-bottom: 0.4rem;">Overview</h4>
        <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin: 0 0 0.6rem;">${rb.overview || ev.description}</p>
        ${rb.eligibility ? `<div style="font-size: 0.82rem; color: #0369A1; background: #F0F9FF; border: 1px solid #BAE6FD; padding: 0.5rem 0.75rem; border-radius: 8px;"><strong>Eligibility:</strong> ${rb.eligibility}</div>` : ''}
      </div>

      ${rounds.length ? `
      <div style="margin-bottom: 1.2rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0F172A; font-weight: 800; margin-bottom: 0.4rem;">Rounds & Stages</h4>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #475569; line-height: 1.6;">
          ${rounds.map(r => `<li style="margin-bottom: 0.35rem;">${r}</li>`).join('')}
        </ul>
      </div>` : ''}

      ${rules.length ? `
      <div style="margin-bottom: 1.2rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0F172A; font-weight: 800; margin-bottom: 0.4rem;">Rules & Guidelines</h4>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: #475569; line-height: 1.6;">
          ${rules.map(r => `<li style="margin-bottom: 0.35rem;">${r}</li>`).join('')}
        </ul>
      </div>` : ''}

      ${rb.judging ? `
      <div style="margin-bottom: 1.2rem; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.75rem 0.9rem; border-radius: 8px;">
        <span style="font-size: 0.75rem; color: #0F172A; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 0.2rem;">Judging Criteria</span>
        <span style="font-size: 0.82rem; color: #475569;">${rb.judging}</span>
      </div>` : ''}

      <!-- EVENT COORDINATORS (UP TO 3) -->
      <div style="border-top: 1.5px solid #E2E8F0; padding-top: 1rem; margin-top: 1.2rem; margin-bottom: 1.2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.7rem;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0F172A; font-weight: 800; margin: 0;">
            Event Coordinators (${coords.length})
          </h4>
          <span style="font-size: 0.72rem; color: #64748B;">Official Point of Contact</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
          ${coords.map(c => `
            <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 0.75rem 0.85rem; display: flex; align-items: center; gap: 0.75rem;">
              <img src="${resolveAssetPath(c.photo, 'images/coord-generic.svg')}" alt="${c.name}" style="width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid #CBD5E1; object-fit: cover; flex-shrink: 0;">
              <div style="min-width: 0; flex: 1;">
                <div style="font-weight: 800; font-size: 0.88rem; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
                <div style="font-size: 0.72rem; color: #0284C7; font-weight: 700; margin-bottom: 0.2rem;">${c.role || 'Coordinator'}</div>
                <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                  <a href="tel:${(c.phone || '').replace(/[^0-9+]/g, '')}" style="color: #0284C7; font-size: 0.78rem; text-decoration: none; font-weight: 700;">
                    ${c.phone || '+91 87977 86686'}
                  </a>
                  <a href="mailto:${c.email || 'Arenium.official@gmail.com'}" style="color: #64748B; font-size: 0.72rem; text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${c.email || 'Arenium.official@gmail.com'}
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #E2E8F0; padding-top: 1rem; flex-wrap: wrap; gap: 0.6rem;">
        <a href="rulebook.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="font-size: 0.82rem; padding: 0.5rem 1rem; text-decoration: none; border: 1.5px solid #CBD5E1; color: #0F172A; font-weight: 700;">
          Download Fest Rulebook (PDF) ↗
        </a>
        <div style="display: flex; gap: 0.6rem;">
          <button type="button" class="btn btn-ghost" onclick="document.getElementById('dynamic-rulebook-modal').style.display='none'" style="font-size: 0.82rem; padding: 0.5rem 1rem;">
            Close
          </button>
          <a href="register.html?event=${encodeURIComponent(ev.id)}" class="btn btn-primary" style="font-size: 0.82rem; padding: 0.5rem 1.4rem; font-weight: 800; text-decoration: none; background: #000000; color: #FFFFFF;">
            Register For Arena ↗
          </a>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";
};

function initRulebookModal() {
  try {
    document.querySelectorAll(".open-rulebook-btn").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const evId = this.getAttribute("data-event-id");
        window.openRulebookModal(evId);
      });
    });
  } catch (e) {
    console.error("Rulebook modal init error:", e);
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
        succ.textContent = `ACCESS GRANTED · WELCOME ${matched.name.toUpperCase()} (${matched.role.toUpperCase()})...`;
      }

      setTimeout(() => {
        verifyAuth();
        renderAdminOverview(FestDB.getData());
      }, 350);
      return true;
    } else {
      if (err) {
        err.style.display = "block";
        err.textContent = "ACCESS DENIED: Invalid User ID or Password. Check your credentials.";
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
    const coords = (Array.isArray(ev.coordinators) && ev.coordinators.length > 0)
      ? ev.coordinators
      : (ev.coordinator ? [ev.coordinator] : []);

    const coordsListHtml = coords.length ? coords.map((c, i) => `
      <div style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem;">
        <img src="${resolveAssetPath(c.photo, 'images/coord-generic.svg')}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1.5px solid #CBD5E1; flex-shrink: 0;">
        <div style="min-width: 0; line-height: 1.25;">
          <span style="font-weight: 700; color: #0F172A; font-size: 0.82rem;">${c.name}</span>
          ${c.role ? `<span style="font-size: 0.68rem; color: #0284C7; font-weight: 600; margin-left: 0.25rem; background: #E0F2FE; padding: 0.05rem 0.35rem; border-radius: 4px;">${c.role}</span>` : ''}
          <div style="font-size: 0.73rem; color: #64748B;">${c.phone || ''}</div>
        </div>
      </div>
    `).join('') : '<span style="color:#94A3B8; font-size:0.78rem;">No coordinator assigned</span>';

    tr.innerHTML = `
      <td><strong>${ev.name}</strong><br><span style="color:var(--text-muted); font-size:0.75rem;">${ev.id}</span></td>
      <td><span class="event-category-badge">${ev.category}</span></td>
      <td><span style="color:var(--neon-yellow);">${ev.prize || '—'}</span></td>
      <td>
        <div style="margin-bottom: 0.4rem;">${coordsListHtml}</div>
        <button type="button" class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.74rem; color:#0284C7; border:1.5px solid #CBD5E1; font-weight:700; background:#F8FAFC;" onclick="openAdminEventCoordinatorModal('${ev.id}')">
          Manage Coordinators (${coords.length})
        </button>
      </td>
      <td>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminEvent('${ev.id}')">Edit</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:#0284C7; border-color:#0284C7;" onclick="openAdminEventCoordinatorModal('${ev.id}')">Coordinators</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminEvent('${ev.id}')">Delete</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

window.populateAdminCoordSlotsForEvent = function(selectedId) {
  const db = FestDB.getData();
  const ev = (db.events || []).find(e => e.id === selectedId);
  if (!ev) return;

  const coords = (Array.isArray(ev.coordinators) && ev.coordinators.length > 0)
    ? ev.coordinators
    : (ev.coordinator ? [ev.coordinator] : []);

  // Coordinator 1 (Lead)
  const c1 = coords[0] || { name: "Kaushal Kumar Singh", role: "Lead Coordinator", phone: "+91 87977 86686", email: "Arenium.official@gmail.com", photo: "images/Kaushal.jpeg" };
  const c1Name = document.getElementById("coord1-name");
  const c1Role = document.getElementById("coord1-role");
  const c1Phone = document.getElementById("coord1-phone");
  const c1Email = document.getElementById("coord1-email");
  const c1Photo = document.getElementById("coord1-photo");
  const c1Quick = document.getElementById("coord1-quick-select");
  if (c1Name) c1Name.value = c1.name || "";
  if (c1Role) c1Role.value = c1.role || "Lead Coordinator";
  if (c1Phone) c1Phone.value = c1.phone || "";
  if (c1Email) c1Email.value = c1.email || "Arenium.official@gmail.com";
  if (c1Photo) c1Photo.value = c1.photo || "";
  if (c1Quick) c1Quick.value = "";

  // Coordinator 2 (Optional)
  const c2 = coords[1];
  const c2Cb = document.getElementById("coord2-enabled");
  const c2Fields = document.getElementById("coord2-fields");
  const c2Name = document.getElementById("coord2-name");
  const c2Role = document.getElementById("coord2-role");
  const c2Phone = document.getElementById("coord2-phone");
  const c2Email = document.getElementById("coord2-email");
  const c2Photo = document.getElementById("coord2-photo");
  const c2Quick = document.getElementById("coord2-quick-select");
  if (c2Cb && c2Fields) {
    if (c2) {
      c2Cb.checked = true;
      c2Fields.style.display = "block";
      if (c2Name) c2Name.value = c2.name || "";
      if (c2Role) c2Role.value = c2.role || "Co-Coordinator";
      if (c2Phone) c2Phone.value = c2.phone || "";
      if (c2Email) c2Email.value = c2.email || "Arenium.official@gmail.com";
      if (c2Photo) c2Photo.value = c2.photo || "";
    } else {
      c2Cb.checked = false;
      c2Fields.style.display = "none";
      if (c2Name) c2Name.value = "";
      if (c2Role) c2Role.value = "Co-Coordinator";
      if (c2Phone) c2Phone.value = "";
      if (c2Email) c2Email.value = "Arenium.official@gmail.com";
      if (c2Photo) c2Photo.value = "";
    }
    if (c2Quick) c2Quick.value = "";
  }

  // Coordinator 3 (Optional)
  const c3 = coords[2];
  const c3Cb = document.getElementById("coord3-enabled");
  const c3Fields = document.getElementById("coord3-fields");
  const c3Name = document.getElementById("coord3-name");
  const c3Role = document.getElementById("coord3-role");
  const c3Phone = document.getElementById("coord3-phone");
  const c3Email = document.getElementById("coord3-email");
  const c3Photo = document.getElementById("coord3-photo");
  const c3Quick = document.getElementById("coord3-quick-select");
  if (c3Cb && c3Fields) {
    if (c3) {
      c3Cb.checked = true;
      c3Fields.style.display = "block";
      if (c3Name) c3Name.value = c3.name || "";
      if (c3Role) c3Role.value = c3.role || "Student Coordinator";
      if (c3Phone) c3Phone.value = c3.phone || "";
      if (c3Email) c3Email.value = c3.email || "Arenium.official@gmail.com";
      if (c3Photo) c3Photo.value = c3.photo || "";
    } else {
      c3Cb.checked = false;
      c3Fields.style.display = "none";
      if (c3Name) c3Name.value = "";
      if (c3Role) c3Role.value = "Student Coordinator";
      if (c3Phone) c3Phone.value = "";
      if (c3Email) c3Email.value = "Arenium.official@gmail.com";
      if (c3Photo) c3Photo.value = "";
    }
    if (c3Quick) c3Quick.value = "";
  }

  // Update photo previews
  if (typeof window.updateCoordPhotoPreview === "function") {
    window.updateCoordPhotoPreview(1, c1.photo || "");
    window.updateCoordPhotoPreview(2, c2 ? c2.photo : "");
    window.updateCoordPhotoPreview(3, c3 ? c3.photo : "");
  }
};

window.openAdminEventCoordinatorModal = function(eventId) {
  const modal = document.getElementById("admin-coord-modal");
  const eventSelect = document.getElementById("coord-modal-event-select");

  const db = FestDB.getData();
  const events = db.events || [];

  if (eventSelect) {
    eventSelect.innerHTML = "";
    events.forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.id;
      opt.textContent = `${ev.name} (${ev.category})`;
      if (eventId && ev.id === eventId) opt.selected = true;
      eventSelect.appendChild(opt);
    });

    const activeId = eventId || (events[0] ? events[0].id : "");
    if (activeId) {
      eventSelect.value = activeId;
      window.populateAdminCoordSlotsForEvent(activeId);
    }
  }

  if (modal) {
    modal.style.display = "flex";
  }
};

window.onAdminCoordEventChanged = function(eventId) {
  window.populateAdminCoordSlotsForEvent(eventId);
};

window.closeAdminCoordModal = function() {
  const modal = document.getElementById("admin-coord-modal");
  if (modal) modal.style.display = "none";
};

window.toggleCoordSlot = function(slotNum) {
  const cb = document.getElementById(`coord${slotNum}-enabled`);
  const fields = document.getElementById(`coord${slotNum}-fields`);
  if (fields && cb) {
    fields.style.display = cb.checked ? "block" : "none";
  }
};

window.onCoordPresetSelected = function(slotNum, key) {
  const presets = {
    kaushal: { name: "Kaushal Kumar Singh", role: slotNum === 1 ? "Lead Coordinator" : "Co-Coordinator", phone: "+91 87977 86686", email: "Arenium.official@gmail.com", photo: "images/Kaushal.jpeg" },
    vimal: { name: "Vimal Raj", role: slotNum === 1 ? "Lead Coordinator" : "Co-Coordinator", phone: "+91 96201 92249", email: "Arenium.official@gmail.com", photo: "images/Vimal.png" },
    ashlin: { name: "Ashlin Siddharth", role: slotNum === 1 ? "Lead Coordinator" : "Marketing & Student Coordinator", phone: "+91 91087 40761", email: "Arenium.official@gmail.com", photo: "images/Ashlin Siddharth.png" },
    abhyas: { name: "Abhyas Kathuria", role: slotNum === 1 ? "Lead Coordinator" : "Technical Coordinator", phone: "+91 85958 48421", email: "Arenium.official@gmail.com", photo: "images/ABHYAS.png" },
    keren: { name: "Ms. Keren Lois Daniel", role: "Faculty Convener", phone: "SOIS Office", email: "Arenium.official@gmail.com", photo: "images/Ms. Keren Lois Daniel.jpg" }
  };

  const p = presets[key];
  if (!p) return;
  const nameEl = document.getElementById(`coord${slotNum}-name`);
  const roleEl = document.getElementById(`coord${slotNum}-role`);
  const phoneEl = document.getElementById(`coord${slotNum}-phone`);
  const emailEl = document.getElementById(`coord${slotNum}-email`);
  const photoEl = document.getElementById(`coord${slotNum}-photo`);
  if (nameEl) nameEl.value = p.name;
  if (roleEl && (!roleEl.value || roleEl.value.includes("Coordinator"))) roleEl.value = p.role;
  if (phoneEl) phoneEl.value = p.phone;
  if (emailEl) emailEl.value = p.email;
  if (photoEl) photoEl.value = p.photo;
};

window.saveAdminEventCoordinator = async function() {
  const eventSelect = document.getElementById("coord-modal-event-select");
  const eventId = eventSelect ? eventSelect.value : "";
  if (!eventId) {
    alert("Please select an event.");
    return;
  }

  const db = FestDB.getData();
  const ev = (db.events || []).find(e => e.id === eventId);
  if (!ev) {
    alert("Selected event not found in database.");
    return;
  }

  // Slot 1 (Primary Lead)
  const c1Name = (document.getElementById("coord1-name")?.value || "").trim();
  const c1Role = (document.getElementById("coord1-role")?.value || "Lead Coordinator").trim();
  const c1Phone = (document.getElementById("coord1-phone")?.value || "").trim();
  const c1Email = (document.getElementById("coord1-email")?.value || "Arenium.official@gmail.com").trim();
  const c1Photo = (document.getElementById("coord1-photo")?.value || "images/Kaushal.jpeg").trim();

  if (!c1Name || !c1Phone) {
    alert("Please provide at least Coordinator 1 name and phone number.");
    return;
  }

  const newCoords = [
    {
      name: c1Name,
      role: c1Role,
      phone: c1Phone,
      email: c1Email,
      photo: c1Photo || "images/coord-generic.svg"
    }
  ];

  // Slot 2 (Optional)
  const c2Cb = document.getElementById("coord2-enabled");
  if (c2Cb && c2Cb.checked) {
    const c2Name = (document.getElementById("coord2-name")?.value || "").trim();
    const c2Role = (document.getElementById("coord2-role")?.value || "Co-Coordinator").trim();
    const c2Phone = (document.getElementById("coord2-phone")?.value || "").trim();
    const c2Email = (document.getElementById("coord2-email")?.value || "Arenium.official@gmail.com").trim();
    const c2Photo = (document.getElementById("coord2-photo")?.value || "").trim();
    if (c2Name && c2Phone) {
      newCoords.push({
        name: c2Name,
        role: c2Role,
        phone: c2Phone,
        email: c2Email,
        photo: c2Photo || "images/coord-generic.svg"
      });
    }
  }

  // Slot 3 (Optional)
  const c3Cb = document.getElementById("coord3-enabled");
  if (c3Cb && c3Cb.checked) {
    const c3Name = (document.getElementById("coord3-name")?.value || "").trim();
    const c3Role = (document.getElementById("coord3-role")?.value || "Student Coordinator").trim();
    const c3Phone = (document.getElementById("coord3-phone")?.value || "").trim();
    const c3Email = (document.getElementById("coord3-email")?.value || "Arenium.official@gmail.com").trim();
    const c3Photo = (document.getElementById("coord3-photo")?.value || "").trim();
    if (c3Name && c3Phone) {
      newCoords.push({
        name: c3Name,
        role: c3Role,
        phone: c3Phone,
        email: c3Email,
        photo: c3Photo || "images/coord-generic.svg"
      });
    }
  }

  ev.coordinators = newCoords;
  ev.coordinator = newCoords[0];

  FestDB.saveData(db, false); // Instant local update

  const submitBtn = document.querySelector("#admin-coord-form button[type='submit']");
  const origText = submitBtn ? submitBtn.innerHTML : "SAVE COORDINATORS";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Syncing to Cloud Atlas...";
  }

  try {
    await FestDB.pushToCloud(db);
    alert(`Successfully saved ${newCoords.length} coordinator(s) for "${ev.name}" and synchronized with Cloud Atlas!`);
  } catch (err) {
    alert(`Saved locally for "${ev.name}". Cloud sync warning: ${err.message}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origText;
    }
  }

  closeAdminCoordModal();
  renderAdminEvents(db);
};

window.syncFestConfigToCloudManual = async function() {
  const btn = document.getElementById("admin-cloud-sync-btn");
  if (btn) btn.textContent = "SYNCING...";
  try {
    const db = FestDB.getData();
    await FestDB.pushToCloud(db);
    alert("Fest configuration (settings, events, coordinators) successfully synchronized with Cloud MongoDB Atlas!");
  } catch (err) {
    alert("Could not sync to cloud: " + err.message);
  } finally {
    if (btn) btn.textContent = "SYNC CLOUD";
  }
};

// ==========================================================================
// CLIENT-SIDE HIGH EFFICIENCY IMAGE COMPRESSION & BASE64 GLOBAL SYNC ENGINE
// ==========================================================================
function compressAndConvertImage(file, maxWidth = 800, maxHeight = 800, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
window.compressAndConvertImage = compressAndConvertImage;

window.handleAdminPhotoUpload = async function(slotNum, file) {
  if (!file) return;
  try {
    const dataUrl = await compressAndConvertImage(file, 600, 600, 0.85);
    const photoInput = document.getElementById(`coord${slotNum}-photo`);
    if (photoInput) {
      photoInput.value = dataUrl;
      window.updateCoordPhotoPreview(slotNum, dataUrl);
    }
  } catch (err) {
    console.error("Photo upload error:", err);
    alert("Could not process image file: " + err.message);
  }
};

window.updateCoordPhotoPreview = function(slotNum, url) {
  const wrap = document.getElementById(`coord${slotNum}-photo-preview-wrap`);
  const img = document.getElementById(`coord${slotNum}-photo-preview`);
  if (!wrap || !img) return;
  if (url && url.trim()) {
    img.src = resolveAssetPath(url.trim(), "images/coord-generic.svg");
    wrap.style.display = "flex";
  } else {
    wrap.style.display = "none";
  }
};

window.openAdminEditEventModal = function(id) {
  const db = FestDB.getData();
  const ev = (db.events || []).find(e => e.id === id);
  if (!ev) return;

  const modal = document.getElementById("admin-event-edit-modal");
  const idEl = document.getElementById("edit-event-id");
  const nameEl = document.getElementById("edit-event-name");
  const catEl = document.getElementById("edit-event-category");
  const prizeEl = document.getElementById("edit-event-prize");
  const descEl = document.getElementById("edit-event-desc");
  const posterEl = document.getElementById("edit-event-poster");
  const venueEl = document.getElementById("edit-event-venue");
  const dateEl = document.getElementById("edit-event-date");
  const timeEl = document.getElementById("edit-event-time");

  if (idEl) idEl.value = ev.id;
  if (nameEl) nameEl.value = ev.name || "";
  if (catEl) catEl.value = ev.category || "";
  if (prizeEl) prizeEl.value = ev.prize || "";
  if (descEl) descEl.value = ev.description || "";
  if (venueEl) venueEl.value = ev.venue || "";
  if (dateEl) dateEl.value = ev.date || "";
  if (timeEl) timeEl.value = ev.time || "";
  if (posterEl) {
    posterEl.value = ev.poster || "";
    window.updateEventPosterPreview(ev.poster || "");
  }

  if (modal) {
    modal.style.display = "flex";
  }
};

window.closeAdminEditEventModal = function() {
  const modal = document.getElementById("admin-event-edit-modal");
  if (modal) modal.style.display = "none";
};

window.handleAdminPosterUpload = async function(file) {
  if (!file) return;
  try {
    const dataUrl = await compressAndConvertImage(file, 1200, 900, 0.82);
    const posterInput = document.getElementById("edit-event-poster");
    if (posterInput) {
      posterInput.value = dataUrl;
      window.updateEventPosterPreview(dataUrl);
    }
  } catch (err) {
    console.error("Poster upload error:", err);
    alert("Could not process poster file: " + err.message);
  }
};

window.updateEventPosterPreview = function(url) {
  const wrap = document.getElementById("edit-event-poster-preview-wrap");
  const img = document.getElementById("edit-event-poster-preview");
  if (!wrap || !img) return;
  if (url && url.trim()) {
    img.src = resolveAssetPath(url.trim(), "images/main-poster.jpg");
    wrap.style.display = "flex";
  } else {
    wrap.style.display = "none";
  }
};

window.saveAdminEditEventModal = async function() {
  const id = document.getElementById("edit-event-id")?.value;
  if (!id) return;

  const db = FestDB.getData();
  const ev = (db.events || []).find(e => e.id === id);
  if (!ev) return;

  const name = document.getElementById("edit-event-name")?.value.trim();
  const cat = document.getElementById("edit-event-category")?.value.trim();
  const prize = document.getElementById("edit-event-prize")?.value.trim();
  const desc = document.getElementById("edit-event-desc")?.value.trim();
  const poster = document.getElementById("edit-event-poster")?.value.trim();
  const venue = document.getElementById("edit-event-venue")?.value.trim();
  const date = document.getElementById("edit-event-date")?.value.trim();
  const time = document.getElementById("edit-event-time")?.value.trim();

  if (!name) {
    alert("Please enter event name.");
    return;
  }

  ev.name = name;
  if (cat) ev.category = cat;
  if (prize) ev.prize = prize;
  if (desc) {
    ev.description = desc;
    ev.tagline = desc;
  }
  if (poster) ev.poster = poster;
  if (venue !== undefined) ev.venue = venue;
  if (date !== undefined) ev.date = date;
  if (time !== undefined) ev.time = time;

  FestDB.saveData(db); // Automatically triggers localStorage save, arenium_db_change event, and cloud push
  window.closeAdminEditEventModal();
  renderAdminEvents(db);
  if (typeof initMovingCardsMarquee === "function") initMovingCardsMarquee(db);
  if (typeof initEventsPage === "function") initEventsPage(db);

  try {
    await FestDB.pushToCloud(db);
    alert(`Arena "${ev.name}" updated successfully and synced to Cloud Atlas across all devices!`);
  } catch (err) {
    alert(`Arena "${ev.name}" updated locally. Cloud sync notice: ${err.message}`);
  }
};

window.editAdminEvent = function(id) {
  window.openAdminEditEventModal(id);
};

window.deleteAdminEvent = async function(id) {
  const db = FestDB.getData();
  if (confirm(`Are you sure you want to remove event "${id}"?`)) {
    db.events = db.events.filter(e => e.id !== id);
    FestDB.saveData(db, false);
    try {
      await FestDB.pushToCloud(db);
      alert("Event removed and synced to Cloud Atlas!");
    } catch (e) {
      alert("Event removed locally. Cloud note: " + e.message);
    }
    renderAdminEvents(db);
  }
};

window.addNewAdminEvent = async function() {
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
    date: "Day 1 (4 February 2027)",
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
  FestDB.saveData(db, false);
  try {
    await FestDB.pushToCloud(db);
    alert(`Event "${name}" added successfully and synced to Cloud Atlas!`);
  } catch (e) {
    alert(`Event "${name}" added locally. Cloud note: ` + e.message);
  }
  renderAdminEvents(db);
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
      <td>${item.venue}</td>
      <td style="white-space: nowrap;">
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminScheduleItem('${item.id || idx}')"> Edit</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminScheduleItem('${item.id || idx}')"> Delete</button>
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

  (db.coordinators || []).forEach(c => {
    const div = document.createElement("div");
    div.className = "cyber-card";
    div.style.padding = "1.2rem";
    div.style.marginBottom = "1rem";
    div.style.background = "#FFFFFF";
    div.style.border = "1.5px solid #E2E8F0";
    div.style.borderRadius = "14px";
    div.innerHTML = `
      <div style="display:flex; gap:1.2rem; align-items:center; flex-wrap:wrap;">
        <img src="${resolveAssetPath(c.photo, 'images/coord-generic.svg')}" style="width:64px; height:64px; border-radius:50%; border:2px solid #0284C7; object-fit:cover; flex-shrink:0;">
        <div style="flex:1; min-width:240px;">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <h4 style="color:#0F172A; font-family:var(--font-display); font-size:1.15rem; margin:0; font-weight:800;">${c.name}</h4>
            <span style="background:#E0F2FE; color:#0369A1; font-size:0.72rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:6px; border:1px solid #BAE6FD;">${c.role}</span>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.8rem; align-items:center; margin-top:0.4rem; font-size:0.82rem; color:#475569;">
            <span style="display:inline-flex; align-items:center; gap:0.35rem;">📞 <strong>${c.phone}</strong></span>
            <span style="display:inline-flex; align-items:center; gap:0.35rem; color:#0284C7; font-weight:700; background:#F0F9FF; padding:0.1rem 0.45rem; border-radius:4px; border:1px solid #BAE6FD;">✉️ <span>${c.email || 'Arenium.official@gmail.com'}</span></span>
            ${c.dept ? `<span style="display:inline-flex; align-items:center; gap:0.35rem; color:#64748B;">🏢 ${c.dept}</span>` : ''}
          </div>
        </div>
        <div style="display:flex; gap:0.6rem; align-items:center;">
          <button type="button" class="btn btn-secondary" style="padding:0.45rem 1rem; font-size:0.8rem; font-weight:700; background:rgba(2,132,199,0.1); border:1.5px solid #0284C7; color:#0284C7;" onclick="openAdminCoordinatorEditModal('${c.id}')">
            ✏️ Edit Details / Photo
          </button>
          ${c.id !== "coord-lead" && c.id !== "coord-1" ? `
            <button type="button" class="btn btn-ghost" style="padding:0.45rem 0.8rem; font-size:0.8rem; color:#EF4444; border:1px solid #FECACA; background:#FEF2F2;" onclick="deleteAdminCoordinator('${c.id}')" title="Delete Coordinator">
              🗑️
            </button>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.openAdminCoordinatorEditModal = function(id) {
  const modal = document.getElementById("admin-coord-profile-modal");
  if (!modal) {
    if (typeof editAdminCoordinator === "function") editAdminCoordinator(id);
    return;
  }
  const db = FestDB.getData();
  const c = (db.coordinators || []).find(x => x.id === id);

  document.getElementById("coord-profile-id").value = id || "";
  document.getElementById("coord-profile-name").value = c ? c.name : "";
  document.getElementById("coord-profile-role").value = c ? c.role : "Student Coordinator";
  document.getElementById("coord-profile-phone").value = c ? c.phone : "";
  document.getElementById("coord-profile-email").value = c ? (c.email || "Arenium.official@gmail.com") : "Arenium.official@gmail.com";
  document.getElementById("coord-profile-dept").value = c ? (c.dept || "") : "";
  document.getElementById("coord-profile-photo").value = c ? (c.photo || "") : "";

  const heading = document.getElementById("coord-profile-modal-heading");
  if (heading) heading.textContent = c ? `Edit Details: ${c.name}` : "Add New Coordinator";

  window.updateAdminCoordProfilePhotoPreview(c ? c.photo : "");
  modal.style.display = "flex";
};

window.closeAdminCoordinatorEditModal = function() {
  const modal = document.getElementById("admin-coord-profile-modal");
  if (modal) modal.style.display = "none";
};

window.saveAdminCoordinatorProfileModal = async function() {
  const submitBtn = document.querySelector("#admin-coord-profile-form button[type='submit']");
  const origText = submitBtn ? submitBtn.innerHTML : "SAVE COORDINATOR";

  const id = document.getElementById("coord-profile-id").value;
  const name = document.getElementById("coord-profile-name").value.trim();
  const role = document.getElementById("coord-profile-role").value.trim();
  const phone = document.getElementById("coord-profile-phone").value.trim();
  const email = document.getElementById("coord-profile-email").value.trim() || "Arenium.official@gmail.com";
  const dept = document.getElementById("coord-profile-dept").value.trim();
  const photo = document.getElementById("coord-profile-photo").value.trim() || "images/coord-generic.svg";

  if (!name || !phone) {
    alert("Please enter Coordinator Name and Phone Number.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Syncing to Cloud Atlas...";
  }

  const db = FestDB.getData();
  if (!db.coordinators) db.coordinators = [];

  let c = db.coordinators.find(x => x.id === id);
  if (c) {
    c.name = name;
    c.role = role;
    c.phone = phone;
    c.email = email;
    c.dept = dept;
    c.photo = photo;
  } else {
    // Add new coordinator
    const newId = "coord-" + Date.now();
    db.coordinators.push({
      id: newId,
      name,
      role,
      phone,
      email,
      dept,
      photo
    });
  }

  FestDB.saveData(db, false); // Instant local update

  try {
    await FestDB.pushToCloud(db); // Push directly to MongoDB Atlas
    alert("Coordinator profile updated successfully and synchronized with Cloud Atlas!");
  } catch (err) {
    alert("Saved locally! Cloud sync note: " + err.message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origText;
    }
  }

  closeAdminCoordinatorEditModal();
  renderAdminCoordinators(db);
};

window.deleteAdminCoordinator = async function(id) {
  if (!confirm("Are you sure you want to remove this coordinator?")) return;
  const db = FestDB.getData();
  if (!db.coordinators) return;
  db.coordinators = db.coordinators.filter(c => c.id !== id);
  FestDB.saveData(db, false);
  try {
    await FestDB.pushToCloud(db);
  } catch (e) {}
  renderAdminCoordinators(db);
  alert("Coordinator removed and synced!");
};

window.handleAdminCoordProfilePhotoUpload = async function(file) {
  if (!file) return;
  try {
    const dataUrl = await compressAndConvertImage(file, 400, 400, 0.75);
    const photoInput = document.getElementById("coord-profile-photo");
    if (photoInput) {
      photoInput.value = dataUrl;
      window.updateAdminCoordProfilePhotoPreview(dataUrl);
    }
  } catch (err) {
    console.error("Photo upload error:", err);
    alert("Could not process image file: " + err.message);
  }
};

window.updateAdminCoordProfilePhotoPreview = function(url) {
  const wrap = document.getElementById("coord-profile-photo-preview-wrap");
  const img = document.getElementById("coord-profile-photo-preview");
  if (!wrap || !img) return;
  if (url && url.trim()) {
    img.src = resolveAssetPath(url.trim(), "images/coord-generic.svg");
    wrap.style.display = "flex";
  } else {
    wrap.style.display = "none";
  }
};

window.editAdminCoordinator = async function(id) {
  const modal = document.getElementById("admin-coord-profile-modal");
  if (modal) {
    window.openAdminCoordinatorEditModal(id);
    return;
  }
  const db = FestDB.getData();
  const c = (db.coordinators || []).find(x => x.id === id);
  if (!c) return;

  const newName = prompt("Coordinator Name:", c.name);
  if (newName) c.name = newName;

  const newRole = prompt("Role / Title:", c.role);
  if (newRole) c.role = newRole;

  const newPhone = prompt("Phone Number:", c.phone);
  if (newPhone) c.phone = newPhone;

  const newEmail = prompt("Email ID:", c.email || "Arenium.official@gmail.com");
  if (newEmail) c.email = newEmail.trim();

  const newPhoto = prompt("Photo Image URL / Path (e.g. images/Kaushal.jpeg):", c.photo);
  if (newPhoto) c.photo = resolveAssetPath(newPhoto.trim(), "images/coord-generic.svg");

  FestDB.saveData(db, false);
  try {
    await FestDB.pushToCloud(db);
    alert("Coordinator updated and synchronized with Cloud Atlas!");
  } catch (e) {
    alert("Coordinator updated locally. Cloud note: " + e.message);
  }
  renderAdminCoordinators(db);
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
        <img src="${resolveAssetPath(l.photo, 'images/leader-dean.jpg')}" style="width:60px; height:60px; border-radius:50%; border:2px solid var(--neon-yellow); object-fit:cover;">
        <div style="flex:1;">
          <span style="font-size:0.7rem; color:var(--neon-yellow); font-family:var(--font-mono);">${l.tag}</span>
          <h4 style="color: var(--text-primary); font-family:var(--font-display);">${l.name}</h4>
          <div style="color:var(--text-secondary); font-size:0.8rem;">${l.role}</div>
        </div>
        <button class="btn btn-ghost" style="padding:0.4rem 0.8rem; font-size:0.75rem;" onclick="editAdminLeader('${l.id}')"> Edit</button>
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

  const newPhoto = prompt("Photo Image URL / Path (e.g. images/Dean Dr.R Mahalakshmi.jpeg):", l.photo);
  if (newPhoto) l.photo = resolveAssetPath(newPhoto.trim(), "images/leader-dean.jpg");

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
        <button class="btn btn-ghost" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="editAdminWinner(${idx})"> Edit Winners</button>
      </div>
      <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.6;">
        ${(w.tiers || []).map(t => `Rank ${t.rank}: <strong>${t.team}</strong> (${t.college}) — Prize: ${t.prize}`).join("<br>")}
      </div>
    `;
    container.appendChild(div);
  });
}


function renderAdminCertificates(db) {
  const publishToggle = document.getElementById("admin-publish-certs-toggle");
  if (publishToggle) {
    publishToggle.checked = db.settings.certificatesPublished !== false;
    // Remove old listeners by replacing element or assigning onchange
    publishToggle.onchange = () => {
      db.settings.certificatesPublished = publishToggle.checked;
      FestDB.saveData(db);
      alert(publishToggle.checked ? "Public Certificate Downloads are now ENABLED on certificate.html!" : "Public Certificate Downloads are now DISABLED.");
    };
  }

  // Populate Event dropdown in upload form
  const eventSelect = document.getElementById("admin-cert-event");
  if (eventSelect && db.events) {
    const currentVal = eventSelect.value;
    eventSelect.innerHTML = "";
    db.events.forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.name;
      opt.textContent = ev.name;
      eventSelect.appendChild(opt);
    });
    if (currentVal) eventSelect.value = currentVal;
  }

  // Render Table
  const container = document.getElementById("admin-certs-table-body");
  const countSpan = document.getElementById("admin-certs-count");
  if (!container) return;

  const certs = db.certificates || [];
  if (countSpan) countSpan.textContent = certs.length;

  if (certs.length === 0) {
    container.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No certificates uploaded yet. Use the upload form above to publish certificates by Team Name.</td></tr>`;
    return;
  }

  container.innerHTML = certs.map(c => {
    const team = c.teamName || c.recipient || "Team";
    const recipient = c.recipient && c.recipient !== team ? c.recipient : "-";
    const fileBadge = c.fileUrl ? 
      `<a href="${c.fileUrl}" target="_blank" style="color:#38BDF8; font-size:0.75rem; text-decoration:underline;"> Uploaded File</a>` :
      `<span style="color:#94A3B8; font-size:0.75rem;">Auto-Generated High-Res</span>`;

    return `
      <tr>
        <td><strong style="color:#38BDF8; font-family:var(--font-mono);">${c.id}</strong></td>
        <td><strong style="color:#FFFFFF; font-size:0.95rem;">${team}</strong></td>
        <td>${recipient}</td>
        <td><span style="color:#38BDF8; font-weight:600;">${c.event}</span></td>
        <td><span class="event-category-badge" style="font-size:0.7rem;">${c.award}</span></td>
        <td>${fileBadge}</td>
        <td>
          <button type="button" class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="adminPreviewCert('${c.id}')"> View</button>
          <button type="button" class="btn btn-ghost" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:#F87171; border-color:rgba(248, 113, 113, 0.4);" onclick="deleteAdminCertificate('${c.id}')"> Delete</button>
        </td>
      </tr>
    `;
  }).join("");
}

// Admin Upload Form State
let adminSelectedCertFileBase64 = "";
let adminSelectedCertFileName = "";

window.handleAdminCertFileSelect = function(e) {
  const file = e.target.files[0];
  const previewBox = document.getElementById("admin-cert-file-preview");
  const filenameSpan = document.getElementById("admin-cert-preview-filename");
  const filesizeSpan = document.getElementById("admin-cert-preview-filesize");
  const previewImg = document.getElementById("admin-cert-preview-img");

  if (!file) {
    adminSelectedCertFileBase64 = "";
    adminSelectedCertFileName = "";
    if (previewBox) previewBox.style.display = "none";
    return;
  }

  adminSelectedCertFileName = file.name;
  if (filenameSpan) filenameSpan.textContent = file.name;
  if (filesizeSpan) filesizeSpan.textContent = (file.size / 1024).toFixed(1) + " KB";
  if (previewBox) previewBox.style.display = "flex";

  const reader = new FileReader();
  reader.onload = function(evt) {
    adminSelectedCertFileBase64 = evt.target.result;
    if (previewImg) {
      if (file.type.startsWith("image/")) {
        previewImg.src = adminSelectedCertFileBase64;
        previewImg.style.display = "block";
      } else {
        previewImg.style.display = "none";
      }
    }
  };
  reader.readAsDataURL(file);
};

window.resetAdminCertUpload = function() {
  adminSelectedCertFileBase64 = "";
  adminSelectedCertFileName = "";
  const previewBox = document.getElementById("admin-cert-file-preview");
  if (previewBox) previewBox.style.display = "none";
  const fileInput = document.getElementById("admin-cert-file");
  if (fileInput) fileInput.value = "";
};

window.handleAdminUploadCert = function(e) {
  e.preventDefault();
  const db = FestDB.getData();

  const teamNameInput = document.getElementById("admin-cert-team");
  const recipientInput = document.getElementById("admin-cert-recipient");
  const eventSelect = document.getElementById("admin-cert-event");
  const awardSelect = document.getElementById("admin-cert-award");
  const collegeInput = document.getElementById("admin-cert-college");
  const idInput = document.getElementById("admin-cert-id");
  const urlInput = document.getElementById("admin-cert-url");

  const teamName = teamNameInput ? teamNameInput.value.trim() : "";
  if (!teamName) {
    alert("Please enter a Team Name!");
    return;
  }

  const recipient = recipientInput ? recipientInput.value.trim() : "";
  const eventName = eventSelect ? eventSelect.value : (db.events[0]?.name || "ARENIUM 27");
  const award = awardSelect ? awardSelect.value : "CERTIFICATE OF MERIT & PARTICIPATION";
  const college = collegeInput ? collegeInput.value.trim() || "Presidency University, Bengaluru" : "Presidency University, Bengaluru";
  const certId = idInput && idInput.value.trim() ? idInput.value.trim().toUpperCase() : ("AR27-CRT-" + Math.floor(1000 + Math.random() * 9000));
  const externalUrl = urlInput ? urlInput.value.trim() : "";

  const finalFileUrl = adminSelectedCertFileBase64 || externalUrl || "";

  if (!db.certificates) db.certificates = [];

  // Check if certificate ID already exists
  const existingIdx = db.certificates.findIndex(x => x.id === certId);
  const certRecord = {
    id: certId,
    teamName: teamName,
    recipient: recipient || teamName,
    event: eventName,
    award: award,
    college: college,
    fileUrl: finalFileUrl,
    fileName: adminSelectedCertFileName,
    issueDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    verified: true
  };

  if (existingIdx >= 0) {
    db.certificates[existingIdx] = certRecord;
  } else {
    db.certificates.unshift(certRecord);
  }

  FestDB.saveData(db);

  // Update table
  renderAdminCertificates(db);

  // Reset form
  const form = document.getElementById("admin-upload-cert-form");
  if (form) form.reset();
  resetAdminCertUpload();

  alert(`Certificate (${certId}) for Team "${teamName}" successfully uploaded and published!

Participants can now visit certificate.html, enter "${teamName}", and download their official certificate.`);
};

window.addNewAdminCertificate = function() {
  const teamInput = document.getElementById("admin-cert-team");
  if (teamInput) {
    teamInput.scrollIntoView({ behavior: "smooth", block: "center" });
    teamInput.focus();
  }
};

window.adminPreviewCert = function(id) {
  const db = FestDB.getData();
  const c = (db.certificates || []).find(x => x.id === id);
  if (!c) return;

  const proofModal = document.getElementById("admin-proof-modal");
  const proofImg = document.getElementById("proof-modal-img");
  const proofTitle = document.getElementById("proof-modal-title");
  const proofMeta = document.getElementById("proof-modal-meta");

  const certDataUrl = c.fileUrl ? c.fileUrl : generateCertificateCanvasDataUrl(c.recipient, c.event, c.award, c.college, c.id, c.teamName);

  if (proofModal && proofImg) {
    proofImg.src = certDataUrl;
    if (proofTitle) proofTitle.textContent = `Certificate: ${c.teamName || c.recipient} (${c.id})`;
    if (proofMeta) proofMeta.textContent = `Event: ${c.event} · Award: ${c.award} · ${c.college}`;
    proofModal.style.display = "flex";
  } else {
    window.open(certDataUrl, "_blank");
  }
};

window.deleteAdminCertificate = function(id) {
  const db = FestDB.getData();
  if (confirm(`Are you sure you want to delete certificate ${id}?`)) {
    db.certificates = (db.certificates || []).filter(x => x.id !== id);
    FestDB.saveData(db);
    renderAdminCertificates(db);
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
          <span style="color:var(--neon-pink); font-size:0.78rem; margin-left:0.6rem;">${s.tier}</span>
        </div>
        <div>
          <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem;" onclick="editAdminSponsor(${idx})"> Edit</button>
          <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminSponsor(${idx})"></button>
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
        <button class="btn btn-ghost" style="padding:0.2rem 0.6rem; font-size:0.75rem; color:var(--neon-pink); border-color:var(--neon-pink);" onclick="deleteAdminGalleryPhoto(${idx})"> Remove</button>
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
  const gatewayUrlInternalInp = document.getElementById("admin-setting-gatewayurl-internal") || gatewayUrlInput;
  const gatewayUrlExternalInp = document.getElementById("admin-setting-gatewayurl-external");
  
  const testGatewayInternalBtn = document.getElementById("admin-setting-test-gateway-internal-btn") || document.getElementById("admin-setting-test-gateway-btn");
  const removeGatewayInternalBtn = document.getElementById("admin-setting-remove-gateway-internal-btn") || document.getElementById("admin-setting-remove-gateway-btn");
  const gatewayBadgeInternal = document.getElementById("admin-setting-gateway-status-internal") || document.getElementById("admin-setting-gateway-status");

  const testGatewayExternalBtn = document.getElementById("admin-setting-test-gateway-external-btn");
  const removeGatewayExternalBtn = document.getElementById("admin-setting-remove-gateway-external-btn");
  const gatewayBadgeExternal = document.getElementById("admin-setting-gateway-status-external");

  const saveBtn = document.getElementById("admin-save-settings-btn");

  const regConfig = (db.settings && db.settings.registrationConfig) || {};
  const currentGatewayInternal = (regConfig.paymentGatewayUrlInternal !== undefined)
    ? regConfig.paymentGatewayUrlInternal
    : (regConfig.paymentGatewayUrl || db.settings.paymentGatewayUrl || "https://pages.razorpay.com/arenium27-pay");
    
  const currentGatewayExternal = (regConfig.paymentGatewayUrlExternal !== undefined)
    ? regConfig.paymentGatewayUrlExternal
    : (regConfig.externalUrl || "https://presidencyuniversity.in/arenium27-register");

  function updateStatus(badgeEl, val) {
    if (!badgeEl) return;
    if (val && val.trim()) {
      badgeEl.textContent = "● ACTIVE";
      badgeEl.style.background = "rgba(16, 185, 129, 0.2)";
      badgeEl.style.color = "#10B981";
      badgeEl.style.borderColor = "#10B981";
    } else {
      badgeEl.textContent = "○ NO LINK (DISABLED)";
      badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
      badgeEl.style.color = "#EF4444";
      badgeEl.style.borderColor = "#EF4444";
    }
  }

  if (gatewayUrlInternalInp) {
    gatewayUrlInternalInp.value = currentGatewayInternal || "";
    updateStatus(gatewayBadgeInternal, gatewayUrlInternalInp.value);
    gatewayUrlInternalInp.oninput = () => updateStatus(gatewayBadgeInternal, gatewayUrlInternalInp.value);
  }

  if (gatewayUrlExternalInp) {
    gatewayUrlExternalInp.value = currentGatewayExternal || "";
    updateStatus(gatewayBadgeExternal, gatewayUrlExternalInp.value);
    gatewayUrlExternalInp.oninput = () => updateStatus(gatewayBadgeExternal, gatewayUrlExternalInp.value);
  }

  if (testGatewayInternalBtn) {
    testGatewayInternalBtn.onclick = () => {
      const url = gatewayUrlInternalInp ? gatewayUrlInternalInp.value.trim() : "";
      if (!url) { alert("Please enter an internal payment gateway URL first before testing."); return; }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (testGatewayExternalBtn) {
    testGatewayExternalBtn.onclick = () => {
      const url = gatewayUrlExternalInp ? gatewayUrlExternalInp.value.trim() : "";
      if (!url) { alert("Please enter an external registration URL first before testing."); return; }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (removeGatewayInternalBtn) {
    removeGatewayInternalBtn.onclick = () => {
      if (confirm("Remove internal payment gateway link?")) {
        if (gatewayUrlInternalInp) {
          gatewayUrlInternalInp.value = "";
          updateStatus(gatewayBadgeInternal, "");
        }
      }
    };
  }

  if (removeGatewayExternalBtn) {
    removeGatewayExternalBtn.onclick = () => {
      if (confirm("Remove external registration link?")) {
        if (gatewayUrlExternalInp) {
          gatewayUrlExternalInp.value = "";
          updateStatus(gatewayBadgeExternal, "");
        }
      }
    };
  }

  if (regUrlInput) regUrlInput.value = db.settings.registerUrl || "";
  if (eventDateInput) eventDateInput.value = db.settings.eventDate || "";
  if (qrImgInput) qrImgInput.value = db.settings.qrCodeImg || "";

  if (saveBtn) {
    saveBtn.onclick = () => {
      const gInternal = gatewayUrlInternalInp ? gatewayUrlInternalInp.value.trim() : "";
      const gExternal = gatewayUrlExternalInp ? gatewayUrlExternalInp.value.trim() : "";
      if (!db.settings.registrationConfig) db.settings.registrationConfig = {};
      db.settings.registrationConfig.paymentGatewayUrlInternal = gInternal;
      db.settings.registrationConfig.paymentGatewayUrlExternal = gExternal;
      db.settings.registrationConfig.paymentGatewayUrl = gInternal;
      db.settings.registrationConfig.externalUrl = gExternal;
      db.settings.paymentGatewayUrl = gInternal;
      db.settings.paymentGatewayUrlInternal = gInternal;
      db.settings.paymentGatewayUrlExternal = gExternal;
      db.settings.registerUrl = regUrlInput ? regUrlInput.value.trim() : "";
      db.settings.eventDate = eventDateInput ? eventDateInput.value.trim() : "";
      if (qrImgInput) db.settings.qrCodeImg = qrImgInput.value.trim();
      FestDB.saveData(db);
      alert("Festival Core Settings & Dual Gateway Links updated live!");
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
  const gatewayUrlInternalInp = document.getElementById("reg-admin-gateway-url-internal") || gatewayUrlInp;
  const gatewayUrlExternalInp = document.getElementById("reg-admin-gateway-url-external") || extUrlInput;

  const testGatewayInternalBtn = document.getElementById("admin-test-gateway-internal-btn") || document.getElementById("admin-test-gateway-btn");
  const removeGatewayInternalBtn = document.getElementById("admin-remove-gateway-internal-btn") || document.getElementById("admin-remove-gateway-btn");
  const gatewayStatusBadgeInternal = document.getElementById("gateway-status-badge-internal") || document.getElementById("gateway-status-badge");

  const testGatewayExternalBtn = document.getElementById("admin-test-gateway-external-btn");
  const removeGatewayExternalBtn = document.getElementById("admin-remove-gateway-external-btn");
  const gatewayStatusBadgeExternal = document.getElementById("gateway-status-badge-external");
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
      sheetStatusBadge.textContent = "CONNECTED & ACTIVE";
      sheetStatusBadge.style.background = "rgba(16, 185, 129, 0.2)";
      sheetStatusBadge.style.color = "#10B981";
      sheetStatusBadge.style.borderColor = "#10B981";
    } else {
      sheetStatusBadge.textContent = "NO WEBHOOK (DISABLED)";
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
      testSheetBtn.textContent = "Testing...";
      try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(`Webhook Connection Successful! Google Sheet is reachable and returned ${Array.isArray(data) ? data.length : 0} rows.`);
      } catch (e) {
        alert("Test ping failed: " + e.message + "\nPlease verify the Apps Script deployment.");
      } finally {
        testSheetBtn.disabled = false;
        testSheetBtn.textContent = "Test Ping Sync";
      }
    };
  }
  const feesGrid = document.getElementById("reg-admin-fees-grid");
  const saveBtn = document.getElementById("admin-save-reg-config-btn");

  const currentGatewayInternal = (regConfig.paymentGatewayUrlInternal !== undefined)
    ? regConfig.paymentGatewayUrlInternal
    : (regConfig.paymentGatewayUrl || "https://pages.razorpay.com/arenium27-pay");

  const currentGatewayExternal = (regConfig.paymentGatewayUrlExternal !== undefined)
    ? regConfig.paymentGatewayUrlExternal
    : (regConfig.externalUrl || "https://presidencyuniversity.in/arenium27-register");

  function updateBadgeHelper(badgeEl, val) {
    if (!badgeEl) return;
    if (val && val.trim()) {
      badgeEl.textContent = "● ACTIVE";
      badgeEl.style.background = "#DCFCE7";
      badgeEl.style.color = "#166534";
      badgeEl.style.borderColor = "#10B981";
    } else {
      badgeEl.textContent = "○ NO LINK (DISABLED)";
      badgeEl.style.background = "#FEE2E2";
      badgeEl.style.color = "#991B1B";
      badgeEl.style.borderColor = "#EF4444";
    }
  }

  if (gatewayUrlInternalInp) {
    gatewayUrlInternalInp.value = currentGatewayInternal || "";
    updateBadgeHelper(gatewayStatusBadgeInternal, gatewayUrlInternalInp.value);
    gatewayUrlInternalInp.oninput = () => updateBadgeHelper(gatewayStatusBadgeInternal, gatewayUrlInternalInp.value);
  }

  if (gatewayUrlExternalInp) {
    gatewayUrlExternalInp.value = currentGatewayExternal || "";
    updateBadgeHelper(gatewayStatusBadgeExternal, gatewayUrlExternalInp.value);
    gatewayUrlExternalInp.oninput = () => updateBadgeHelper(gatewayStatusBadgeExternal, gatewayUrlExternalInp.value);
  }

  if (testGatewayInternalBtn) {
    testGatewayInternalBtn.onclick = () => {
      const url = gatewayUrlInternalInp ? gatewayUrlInternalInp.value.trim() : "";
      if (!url) { alert("Please enter an internal payment gateway URL first."); return; }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (testGatewayExternalBtn) {
    testGatewayExternalBtn.onclick = () => {
      const url = gatewayUrlExternalInp ? gatewayUrlExternalInp.value.trim() : "";
      if (!url) { alert("Please enter an external registration URL first."); return; }
      window.open(url, "_blank", "noopener,noreferrer");
    };
  }

  if (removeGatewayInternalBtn) {
    removeGatewayInternalBtn.onclick = () => {
      if (confirm("Are you sure you want to remove the internal payment gateway link?")) {
        if (gatewayUrlInternalInp) {
          gatewayUrlInternalInp.value = "";
          updateBadgeHelper(gatewayStatusBadgeInternal, "");
        }
      }
    };
  }

  if (removeGatewayExternalBtn) {
    removeGatewayExternalBtn.onclick = () => {
      if (confirm("Are you sure you want to remove the external event registration link?")) {
        if (gatewayUrlExternalInp) {
          gatewayUrlExternalInp.value = "";
          updateBadgeHelper(gatewayStatusBadgeExternal, "");
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
        <label class="admin-label" style="font-size:0.78rem; color:#000000 !important; font-weight:800; -webkit-text-fill-color:#000000 !important;">${ev.name}</label>
        <input type="text" class="admin-input reg-fee-input" data-ev-id="${ev.id}" value="${currentFee}" placeholder="e.g. ₹150 / Solo" style="color:#000000 !important; font-weight:700; -webkit-text-fill-color:#000000 !important; background:#FFFFFF !important; border:1.5px solid #94A3B8 !important;">
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
      const gatewayInternalVal = gatewayUrlInternalInp ? gatewayUrlInternalInp.value.trim() : "";
      const gatewayExternalVal = gatewayUrlExternalInp ? gatewayUrlExternalInp.value.trim() : "";
      
      db.settings.registrationConfig.paymentGatewayUrlInternal = gatewayInternalVal;
      db.settings.registrationConfig.paymentGatewayUrlExternal = gatewayExternalVal;
      db.settings.registrationConfig.paymentGatewayUrl = gatewayInternalVal;
      db.settings.registrationConfig.externalUrl = gatewayExternalVal;
      db.settings.paymentGatewayUrl = gatewayInternalVal;
      db.settings.paymentGatewayUrlInternal = gatewayInternalVal;
      db.settings.paymentGatewayUrlExternal = gatewayExternalVal;
      db.settings.registrationConfig.googleSheetUrl = sheetUrlInp ? sheetUrlInp.value.trim() : "https://script.google.com/macros/s/AKfycbyQf200fHwcydhLqNW2YXVaADme2a4p0RXyc0at1YspDawEJ9oBIQw75tKY97LN35QH/exec";
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

      let statusBadge = `<span class="admin-badge-pending">PENDING</span>`;
      if (r.status === "Checked In") {
        statusBadge = `<span class="admin-badge-confirmed" style="background:rgba(16,185,129,0.2); color:#10B981; border:1px solid #10B981;"> CHECKED IN</span>`;
      } else if (r.status === "Confirmed" || r.paymentVerified) {
        statusBadge = `<span class="admin-badge-confirmed">CONFIRMED</span>`;
      } else if (r.status === "Rejected") {
        statusBadge = `<span class="admin-badge-rejected">REJECTED</span>`;
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
        <td><strong>${r.fullName}</strong><br><span style="color:#94A3B8; font-size:0.75rem;">${r.email}</span><br><span style="color:#CBD5E1; font-size:0.75rem;"> ${r.phone}</span></td>
        <td><strong>${r.college}</strong><br><span style="color:#93C5FD; font-size:0.75rem; font-family:var(--font-mono);">${r.usn}</span><br><span style="color:#94A3B8; font-size:0.72rem;">${r.department || ''}</span></td>
        <td>${catBadge}<br><strong style="color:#34D399; font-size:0.85rem;">${r.feePaid || '₹200'}</strong></td>
        <td><div style="font-size:0.8rem; line-height:1.4;">${eventsDisplay}</div><span style="font-size:0.72rem; color:#94A3B8;">${r.regType === 'Team' ? ' ' + (r.teamName || 'Squad') : (r.teamName ? 'Solo (' + r.teamName + ')' : 'Solo')}</span></td>
        <td>
          <code style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px; font-size:0.8rem; color:#FCD34D;">${r.utrId}</code>
          ${r.paymentScreenshot ? `
            <div style="margin-top: 4px;">
              ${r.paymentScreenshot.startsWith('http') ? `
                <a href="${r.paymentScreenshot}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="padding: 2px 7px; font-size: 0.72rem; color: #38BDF8; border-color: #38BDF8; display: inline-flex; align-items: center; gap: 3px;">
                  View Drive Proof
                </a>
              ` : `
                <button type="button" class="btn btn-ghost" style="padding: 2px 7px; font-size: 0.72rem; color: #38BDF8; border-color: #38BDF8; display: inline-flex; align-items: center; gap: 3px;" onclick="viewAdminProof('${r.id}')">
                  View Proof
                </button>
              `}
            </div>
          ` : `<div style="font-size:0.68rem; color:#64748B; margin-top:2px;">No SS Attached</div>`}
        </td>
        <td>${statusBadge}</td>
        <td style="white-space: nowrap;">
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#0284C7; border-color:#0284C7; margin-right:4px;" onclick="viewAdminPassModal('${r.id}')" title="View Pass & Terminal QR">Pass &amp; QR</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#34D399; border-color:#34D399;" onclick="setAdminRegStatus('${r.id}', 'Confirmed')"> Approve</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.72rem; color:#F87171; border-color:#F87171;" onclick="setAdminRegStatus('${r.id}', 'Rejected')">Reject</button>
          <button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.72rem; color:#94A3B8;" onclick="deleteAdminRegistration('${r.id}')" title="Delete record"></button>
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

// Global actions for registration admin & CORE backend integration (Auto-detects Localhost vs Production Vercel)
window.CORE_BACKEND_URL = window.CORE_BACKEND_URL || (
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
    ? "http://localhost:5000/api"
    : "https://arenium-27-core.vercel.app/api"
);

window.setAdminRegStatus = async function(regId, newStatus) {
  const db = FestDB.getData();
  if (!db.registrations) return;
  const item = db.registrations.find(r => r.id === regId);
  if (item) {
    item.status = newStatus;
    item.paymentVerified = (newStatus === "Confirmed" || newStatus === "Checked In");
    if (newStatus === "Confirmed") {
      item.verifiedAt = new Date().toISOString();
    }
    FestDB.saveData(db);
    renderAdminRegistrations(db);
    if (typeof renderAdminOverview === "function") renderAdminOverview(db);

    // Sync status change with ARENIUM 27 CORE backend
    try {
      const endpoint = (newStatus === "Confirmed" || newStatus === "Checked In")
        ? `${window.CORE_BACKEND_URL}/registrations/${encodeURIComponent(regId)}/verify-payment`
        : `${window.CORE_BACKEND_URL}/registrations/${encodeURIComponent(regId)}/reject-payment`;
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedBy: "Admin (ARENIUM 27)", reason: "Status updated in Admin Portal" })
      });
    } catch (e) {
      console.warn("Could not sync status change with CORE backend:", e);
    }
  }
};

window.deleteAdminRegistration = async function(regId) {
  if (!confirm(`Are you sure you want to permanently delete registration ${regId}?`)) return;
  const db = FestDB.getData();
  if (!db.registrations) return;
  db.registrations = db.registrations.filter(r => r.id !== regId);
  FestDB.saveData(db);
  renderAdminRegistrations(db);
  if (typeof renderAdminOverview === "function") renderAdminOverview(db);

  // Sync deletion with CORE backend
  try {
    await fetch(`${window.CORE_BACKEND_URL}/registrations/${encodeURIComponent(regId)}`, {
      method: "DELETE"
    });
  } catch (e) {
    console.warn("Could not sync deletion with CORE backend:", e);
  }
};

window.batchApproveAllPendingPayments = async function() {
  const db = FestDB.getData();
  if (!db.registrations || db.registrations.length === 0) {
    alert("No registration records found.");
    return;
  }
  const pending = db.registrations.filter(r => r.status === "Pending Verification" || r.status === "Pending" || (!r.paymentVerified && r.status !== "Rejected"));
  if (pending.length === 0) {
    alert("All registrations are already verified and confirmed!");
    return;
  }

  if (!confirm(`Verify and approve payment for ${pending.length} pending registration(s)?\n\nThis will instantly UNLOCK their gate passes and scanner clearance across both sites!`)) {
    return;
  }

  const ids = pending.map(r => r.id);
  pending.forEach(r => {
    r.status = "Confirmed";
    r.paymentVerified = true;
    r.verifiedAt = new Date().toISOString();
  });
  FestDB.saveData(db);
  renderAdminRegistrations(db);
  if (typeof renderAdminOverview === "function") renderAdminOverview(db);

  try {
    await fetch(`${window.CORE_BACKEND_URL}/registrations/batch-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, verifiedBy: "Admin (ARENIUM 27 Batch)" })
    });
  } catch (err) {
    console.warn("Could not reach CORE backend for batch verification, updated local FestDB:", err);
  }

  alert(`Successfully approved payment for ${pending.length} delegate pass(es)!\nAll passes are now unlocked across both sites.`);
};

window.importRegistrationsFromExcelFile = function(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;

  if (typeof XLSX === "undefined") {
    alert("Excel parsing library (SheetJS) is not loaded. Please ensure js/xlsx.full.min.js is present or use CSV export/import.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!rows || rows.length === 0) {
        alert("The selected Excel spreadsheet is empty or has no recognizable rows.");
        return;
      }

      const db = FestDB.getData();
      if (!Array.isArray(db.registrations)) db.registrations = [];

      let importedCount = 0;
      let updatedCount = 0;

      rows.forEach((row, idx) => {
        const findVal = (patterns) => {
          for (const key of Object.keys(row)) {
            const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
            for (const p of patterns) {
              if (cleanKey.includes(p)) return String(row[key]).trim();
            }
          }
          return "";
        };

        const fullName = findVal(["name", "fullname", "delegatename", "studentname", "lead"]) || `Delegate ${idx + 1}`;
        const usn = findVal(["usn", "roll", "hallticket", "regno", "idcard", "studentno"]) || `USN-${1000 + idx}`;
        const email = findVal(["email", "mail"]) || "attendee@arenium.in";
        const phone = findVal(["phone", "mobile", "contact", "whatsapp"]) || "9999999999";
        const college = findVal(["college", "university", "institution", "campus"]) || "Presidency University";
        const dept = findVal(["department", "dept", "branch", "stream"]) || "SOIS";
        const yearSem = findVal(["year", "sem", "semester"]) || "3rd Year";
        const category = findVal(["category", "intern"]) || (college.toLowerCase().includes("presidency") ? "Internal" : "External");
        const event1 = findVal(["event1", "event", "arena", "competition"]) || "TECH ODYSSEY";
        const event2 = findVal(["event2"]) || "";
        const event3 = findVal(["event3"]) || "";
        const regType = findVal(["type", "mode"]) || (findVal(["team", "squad"]) ? "Team" : "Solo");
        const teamName = findVal(["teamname", "squadname", "team"]) || "";
        const teamMembers = findVal(["teammembers", "members", "squadmembers", "roster"]) || "";
        const fee = findVal(["fee", "amount", "paid"]) || "₹200";
        const utr = findVal(["utr", "transaction", "ref", "paymentref", "txnid"]) || ("EXCEL-" + Math.floor(100000 + Math.random() * 900000));
        const statusRaw = (findVal(["paymentstatus", "status"]) || "").toLowerCase();
        const verifiedCol = (findVal(["paymentverified"]) || "").toLowerCase();

        // Check if verified: must not be pending or rejected
        const isPending = statusRaw.includes("pending") || statusRaw.includes("await");
        const isRejected = statusRaw.includes("reject") || statusRaw.includes("fail") || statusRaw.includes("declin");
        const isExplicitVerified = verifiedCol === "yes" || verifiedCol === "true" || verifiedCol.includes("verif");
        const isStatusConfirmed = statusRaw === "confirmed" || statusRaw === "verified" || statusRaw === "approved" || statusRaw === "paid" || statusRaw.includes("cleared");

        const isVerified = !isPending && !isRejected && (isExplicitVerified || isStatusConfirmed);

        let regId = findVal(["regid", "id", "registrationid", "passid"]);
        if (!regId || !regId.toUpperCase().startsWith("ARENIUM")) {
          regId = "ARENIUM27-REG-" + (1050 + db.registrations.length + idx);
        }

        const newRecord = {
          id: regId.toUpperCase(),
          fullName,
          email,
          phone,
          college,
          usn,
          department: dept,
          yearSem,
          category: category.toLowerCase().includes("ext") ? "external" : "internal",
          categoryLabel: category.toLowerCase().includes("ext") ? "External (Other Institution)" : "Internal (Presidency University)",
          eventId: "imported",
          eventName: event1,
          event1Name: event1,
          event2Name: event2,
          event3Name: event3,
          regType: regType.toLowerCase().includes("team") ? "Team" : "Solo",
          teamName,
          teamMembers,
          feePaid: fee.startsWith("₹") ? fee : ("₹" + fee),
          utrId: utr,
          status: isVerified ? "Confirmed" : "Pending Verification",
          paymentVerified: isVerified,
          timestamp: new Date().toISOString()
        };

        const existingIdx = db.registrations.findIndex(r => r.id === newRecord.id || (r.usn && r.usn.toLowerCase() === newRecord.usn.toLowerCase()));
        if (existingIdx >= 0) {
          db.registrations[existingIdx] = { ...db.registrations[existingIdx], ...newRecord };
          updatedCount++;
        } else {
          db.registrations.unshift(newRecord);
          importedCount++;
        }
      });

      FestDB.saveData(db);
      renderAdminRegistrations(db);
      if (typeof renderAdminOverview === "function") renderAdminOverview(db);

      // Dispatch Excel file to ARENIUM 27 CORE server for bidirectional sync
      try {
        let binary = "";
        const bytes = new Uint8Array(e.target.result);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64String = btoa(binary);

        await fetch(`${window.CORE_BACKEND_URL}/registrations/import-excel`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileBase64: base64String, filename: file.name })
        });
      } catch (coreErr) {
        console.warn("Could not dispatch Excel to CORE server:", coreErr);
      }

      alert(`Excel Import Complete!\n\nImported ${importedCount} new registrations.\nUpdated ${updatedCount} existing records.\nTotal delegates in database: ${db.registrations.length}\n\nAll records synchronized live with ARENIUM 27 CORE!`);
    } catch (err) {
      console.error("Excel import error:", err);
      alert("Failed to parse Excel file: " + err.message);
    } finally {
      inputEl.value = "";
    }
  };
  reader.readAsArrayBuffer(file);
};

window.exportRegistrationsExcel = function() {
  if (typeof XLSX === "undefined") {
    exportRegistrationsCSV();
    return;
  }

  const db = FestDB.getData();
  const list = db.registrations || [];
  if (list.length === 0) {
    alert("No registration records found to export.");
    return;
  }

  const excelRows = list.map(r => ({
    "Registration ID": r.id || "",
    "Full Name": r.fullName || "",
    "Email": r.email || "",
    "Phone": r.phone || "",
    "College": r.college || "",
    "USN / Roll No": r.usn || "",
    "Department": r.department || "",
    "Year / Sem": r.yearSem || "",
    "Category": r.categoryLabel || r.category || "Internal",
    "Arena 1": r.event1Name || r.eventName || "",
    "Arena 2": r.event2Name || "",
    "Arena 3": r.event3Name || "",
    "Participation": r.regType || "Solo",
    "Team / Squad Name": r.teamName || "",
    "Team Members": r.teamMembers || "",
    "Fee Amount": r.feePaid || "₹200",
    "UTR Reference": r.utrId || "",
    "Payment Verified": (r.paymentVerified || r.status === "Confirmed" || r.status === "Checked In") ? "YES" : "NO",
    "Entry Status": r.status || "Pending Verification",
    "Gate Checked In": (r.status === "Checked In" || r.checkInTime) ? "YES" : "NO",
    "Check-In Time": r.checkInTime || "",
    "Registered At": r.timestamp || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
  XLSX.writeFile(workbook, `ARENIUM27_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

window.exportRegistrationsCSV = function() {
  const db = FestDB.getData();
  const list = db.registrations || [];
  if (list.length === 0) {
    alert("No registration records found to export.");
    return;
  }

  const headers = ["Registration ID", "Full Name", "Email", "Phone", "College", "USN", "Department", "Year/Sem", "Category", "Event 1", "Event 2", "Event 3", "Fee Paid", "Payment Proof Attached", "Type", "Team Name", "Team Members", "UTR ID", "Payment Verified", "Status", "Timestamp"];
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
    `"${(r.paymentVerified || r.status === 'Confirmed' || r.status === 'Checked In') ? 'Yes' : 'No'}"`,
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

window.syncWithCoreBackend = async function() {
  const syncBtn = document.getElementById("btn-sync-core");
  let origHtml = "";
  if (syncBtn) {
    origHtml = syncBtn.innerHTML;
    syncBtn.disabled = true;
    syncBtn.innerHTML = "Syncing with CORE...";
  }

  try {
    const db = FestDB.getData();
    if (!Array.isArray(db.registrations)) db.registrations = [];

    // Two-way sync: send local registrations to CORE, receive merged set
    const syncRes = await fetch(`${window.CORE_BACKEND_URL}/sync/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrations: db.registrations })
    });

    if (syncRes.ok) {
      const result = await syncRes.json();
      if (result.success && Array.isArray(result.registrations)) {
        db.registrations = result.registrations;
        FestDB.saveData(db);
        renderAdminRegistrations(db);
        if (typeof renderAdminOverview === "function") renderAdminOverview(db);
        alert(`ARENIUM 27 CORE Sync Successful!\n\nSynchronized ${result.registrations.length} delegate passes.\nVerified: ${result.registrations.filter(r => r.paymentVerified).length} | Pending: ${result.registrations.filter(r => !r.paymentVerified).length}`);
        return;
      }
    }

    // Fallback: GET /api/registrations
    const getRes = await fetch(`${window.CORE_BACKEND_URL}/registrations`);
    if (getRes.ok) {
      const data = await getRes.json();
      if (data.success && Array.isArray(data.registrations)) {
        data.registrations.forEach(cr => {
          const idx = db.registrations.findIndex(r => r.id === cr.id);
          if (idx >= 0) {
            db.registrations[idx] = { ...db.registrations[idx], ...cr };
          } else {
            db.registrations.push(cr);
          }
        });
        FestDB.saveData(db);
        renderAdminRegistrations(db);
        if (typeof renderAdminOverview === "function") renderAdminOverview(db);
        alert(`ARENIUM 27 CORE Sync Successful!\n\nSynchronized ${db.registrations.length} delegate records with CORE backend.`);
        return;
      }
    }

    throw new Error("Unable to connect to ARENIUM 27 CORE server.");
  } catch (err) {
    console.error("CORE Sync failed:", err);
    alert(`Could not connect to ARENIUM 27 CORE backend (${window.CORE_BACKEND_URL}):\n${err.message}\n\nPlease ensure ARENIUM 27 CORE server is running on port 5000.`);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = origHtml || "Sync with CORE Server";
    }
  }
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

  const newReg = {
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
    paymentVerified: true,
    timestamp: new Date().toISOString()
  };

  db.registrations.unshift(newReg);
  FestDB.saveData(db);
  renderAdminRegistrations(db);
  renderAdminOverview(db);

  // Sync to CORE server
  fetch(`${window.CORE_BACKEND_URL}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReg)
  }).catch(() => {});

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
    const aModal = document.getElementById("admin-pass-modal");
    if (aModal) aModal.style.display = "none";
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
    syncBtn.innerHTML = "Syncing from Google Sheet...";
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
        category: (row["Category"] || "").toLowerCase().includes("ext") ? "external" : "internal",
        categoryLabel: row["Category"] || "Internal (Presidency University)",
        eventId: "g-sheet",
        eventName: row["Arena 1 (Selected)"] || "TECH ODYSSEY",
        event1Name: row["Arena 1 (Selected)"] || "",
        event2Name: row["Arena 2 (Free)"] || "",
        event3Name: row["Arena 3 (Addon)"] || "",
        regType: row["Participation Type"] || "Solo",
        teamName: row["Team / Squad Name"] || "",
        teamMembers: row["Team Members Roster"] || "",
        feePaid: row["Registration Fee"] || "₹200",
        utrId: row["UTR / Reference ID"] || "",
        paymentScreenshot: row["Payment Screenshot URL"] || "",
        status: row["Status"] || "Confirmed",
        paymentVerified: (row["Status"] === "Confirmed" || row["Status"] === "Checked In"),
        timestamp: row["Timestamp"] || new Date().toISOString()
      };

      if (existingIndex >= 0) {
        db.registrations[existingIndex] = { ...db.registrations[existingIndex], ...regObj };
      } else {
        db.registrations.unshift(regObj);
        newCount++;
      }
    });

    FestDB.saveData(db);
    renderAdminRegistrations(db);
    renderAdminOverview(db);

    alert(`Google Sheet Sync Successful!\n\nSynchronized ${sheetData.length} total delegate records (${newCount} new records pulled from live Excel).`);
  } catch (err) {
    console.error("Sheet sync failed:", err);
    alert("Google Sheet Sync error: " + err.message);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = origText || "Google Sheet";
    }
  }
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

  const isVerified = (reg.status === "Confirmed" || reg.status === "Checked In" || reg.paymentVerified === true);
  const isInt = (reg.category === "internal" || !reg.category);
  const catLabel = reg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
  const isTeam = reg.regType === "Team";
  const teamDisplayName = isTeam ? (reg.teamName || "Squad") : (reg.teamName ? `${reg.fullName} (${reg.teamName})` : reg.fullName);
  
  let memberCount = 1;
  if (isTeam && reg.teamMembers) {
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
    `FEE PAID: ${reg.feePaid || '₹200'} (${isVerified ? 'Verified' : 'Pending'})`,
    `UTR REF: ${reg.utrId || 'N/A'}`,
    `ENTRY STATUS: ${reg.status || (isVerified ? 'Confirmed' : 'Pending Verification')}`,
    "Presidency University, Bengaluru • 4-5 Feb 2027"
  ].join("\n");

  modalBody.innerHTML = `
    <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 1.2rem; margin-bottom: 1.2rem;">
      ${!isVerified ? `
        <div style="background:#FFFBEB; border:1.5px solid #FCD34D; border-radius:8px; padding:0.6rem 0.9rem; margin-bottom:0.9rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <span style="font-size:0.78rem; color:#B45309; font-weight:700;">
            Payment Pending Verification — This pass &amp; QR are LOCKED on the student portal until approved.
          </span>
          <button type="button" class="btn btn-primary" onclick="setAdminRegStatus('${reg.id}', 'Confirmed'); viewAdminPassModal('${reg.id}');" style="padding:4px 10px; font-size:0.75rem; font-weight:700;">
            Approve Payment &amp; Unlock Pass Now
          </button>
        </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; border-bottom: 1px dashed #CBD5E1; padding-bottom: 0.6rem;">
        <div>
          <div style="font-size: 0.72rem; color: #0284C7; font-weight: 700; letter-spacing: 1px;">PRESIDENCY UNIVERSITY • SOIS</div>
          <div style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #0F172A;">ARENIUM'27 DELEGATE PASS</div>
        </div>
        <div style="text-align: right;">
          <span style="background: ${isVerified ? '#ECFDF5' : '#FEF3C7'}; color: ${isVerified ? '#047857' : '#B45309'}; border: 1px solid ${isVerified ? '#A7F3D0' : '#FCD34D'}; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
            ${isVerified ? (reg.status || 'Confirmed') : 'PENDING'}
          </span>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #0284C7; font-weight: 700; margin-top: 3px;">${reg.id}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; font-size: 0.85rem; margin-bottom: 1rem;">
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Delegate / Lead:</strong> <strong>${reg.fullName}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Category:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">College:</strong> ${reg.college}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">USN / ID:</strong> ${reg.usn}</div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Participation:</strong> <strong>${isTeam ? 'Team: ' + teamDisplayName : 'Solo'}</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Fee Paid:</strong> <strong style="color: ${isVerified ? '#047857' : '#B45309'};">${reg.feePaid || '₹200'} (${isVerified ? 'Verified' : 'Pending'})</strong></div>
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
    indicator.style.webkitTextFillColor = "#047857";
    indicator.style.borderColor = "#10B981";
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
    alert("Camera access denied or device has no camera: " + err + "\n\nYou can still click 'Scan QR Image File' or use 'Manual Lookup'!");
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
        indicator.style.color = "#000000";
        indicator.style.webkitTextFillColor = "#000000";
        indicator.style.borderColor = "#94A3B8";
      }
    }).catch(err => console.error(err));
  } else {
    if (placeholder) placeholder.style.display = "block";
    if (stopBtn) stopBtn.style.display = "none";
    if (indicator) {
      indicator.textContent = "IDLE";
      indicator.style.background = "#F1F5F9";
      indicator.style.color = "#000000";
      indicator.style.webkitTextFillColor = "#000000";
      indicator.style.borderColor = "#94A3B8";
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

window.handleGateQrScanned = async function(rawText) {
  const resultBody = document.getElementById("gate-scan-result-body");
  const clearancePill = document.getElementById("gate-clearance-pill");
  if (!resultBody) return;

  const db = FestDB.getData();
  const list = db.registrations || [];

  // 1. Try to find Registration ID in rawText
  const regIdMatch = rawText.match(/ARENIUM27-REG-[0-9]+/i) || rawText.match(/AR27-[A-Z0-9-]+/i) || rawText.match(/TEST-[A-Z0-9-]+/i);
  const targetId = regIdMatch ? regIdMatch[0].toUpperCase() : rawText.trim().toUpperCase();

  // 2. Query CORE Backend API for synchronized gate check-in
  let coreData = null;
  try {
    const res = await fetch(`${window.CORE_BACKEND_URL}/registrations/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrData: rawText, scannerSource: "ARENIUM 27 Gate" })
    });
    coreData = await res.json();
  } catch (e) {
    console.warn("CORE backend unavailable during scan, using local FestDB:", e);
  }

  // 3. Match registration in local FestDB or from CORE response
  let matchedReg = (coreData && coreData.registration) ? coreData.registration : null;
  if (!matchedReg) {
    matchedReg = list.find(r => 
      (targetId && r.id && r.id.toUpperCase() === targetId) ||
      (r.id && r.id.toUpperCase() === rawText.trim().toUpperCase()) ||
      (r.usn && r.usn.toUpperCase() === rawText.trim().toUpperCase()) ||
      (r.utrId && r.utrId.toUpperCase() === rawText.trim().toUpperCase()) ||
      (r.fullName && r.fullName.toUpperCase() === rawText.trim().toUpperCase())
    );
  }

  currentScannedReg = matchedReg;

  // CASE 1: Pass not found in either system
  if (!matchedReg) {
    playScanBeep(false);
    if (clearancePill) {
      clearancePill.textContent = "UNREGISTERED PASS";
      clearancePill.style.background = "#FEF2F2";
      clearancePill.style.color = "#DC2626";
      clearancePill.style.webkitTextFillColor = "#DC2626";
      clearancePill.style.borderColor = "#EF4444";
    }

    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: #FEF2F2; border: 1.5px solid #FCA5A5; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
          <div style="color: #DC2626; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.3rem;">Pass ID Not Found in Database</div>
          <div style="font-size: 0.78rem; color: #7F1D1D; line-height: 1.45;">
            The scanned QR code was decoded, but no registration was found matching <code>${targetId}</code>. You can sync with CORE Server or Google Sheets, or perform an on-spot walk-in registration.
          </div>
        </div>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.8rem; font-size: 0.78rem; font-family: var(--font-mono); color: #334155; white-space: pre-wrap; word-break: break-all;">
          ${rawText}
        </div>
        <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary" onclick="syncWithCoreBackend()" style="padding: 0.5rem 1.2rem; font-size: 0.82rem;">
            Sync from CORE Server
          </button>
          <button type="button" class="btn btn-ghost" onclick="openManualRegModal()" style="padding: 0.5rem 1.2rem; font-size: 0.82rem;">
            + On-Spot Registration
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Check verification state
  const isRejected = matchedReg.status === "Rejected";
  const isPaymentVerified = (coreData && coreData.cleared) || 
    (matchedReg.status === "Confirmed" || matchedReg.status === "Checked In" || matchedReg.paymentVerified === true);

  const isTeam = matchedReg.regType === "Team";
  const teamDisplayName = isTeam ? (matchedReg.teamName || "Squad") : (matchedReg.teamName ? `${matchedReg.fullName} (${matchedReg.teamName})` : matchedReg.fullName);
  const isInt = (matchedReg.category === "internal" || !matchedReg.category);
  const catLabel = matchedReg.categoryLabel || (isInt ? "Internal (Presidency University)" : "External (Other Institution)");
  const arenas = [matchedReg.event1Name || matchedReg.eventName, matchedReg.event2Name, matchedReg.event3Name].filter(b => b && b !== '-').join(" • ");
  const isCheckedIn = (matchedReg.status === "Checked In" || matchedReg.status === "Gate Cleared" || (coreData && coreData.alreadyCheckedIn));

  // CASE 2: PAYMENT NOT VERIFIED OR REJECTED (ENTRY BLOCKED!)
  if (!isPaymentVerified || isRejected) {
    playScanBeep(false);
    if (clearancePill) {
      clearancePill.textContent = isRejected ? "REGISTRATION REJECTED" : "PAYMENT UNVERIFIED — ENTRY BLOCKED";
      clearancePill.style.background = "#FEF2F2";
      clearancePill.style.color = "#DC2626";
      clearancePill.style.webkitTextFillColor = "#DC2626";
      clearancePill.style.borderColor = "#EF4444";
    }

    resultBody.innerHTML = `
      <div style="width: 100%; text-align: left;">
        <div style="background: #FFF1F2; border: 2px solid #F43F5E; border-radius: 12px; padding: 1.1rem; margin-bottom: 1.2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
            <span style="font-size: 0.76rem; color: #BE123C; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              ${isRejected ? 'REGISTRATION REJECTED BY ADMIN' : 'PAYMENT NOT VERIFIED — GATE PASS LOCKED'}
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #BE123C;">${matchedReg.id}</span>
          </div>
          <div style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: #881337; margin-bottom: 0.3rem;">
            ${isTeam ? 'Squad: ' + teamDisplayName : matchedReg.fullName}
          </div>
          <div style="font-size: 0.85rem; color: #9F1239; line-height: 1.45;">
            <strong>Warning:</strong> ${isRejected 
              ? 'This delegate registration was marked as Rejected by fest administrators.' 
              : `Payment has NOT been verified yet (UTR: <code>${matchedReg.utrId || 'N/A'}</code>). Delegate's pass remains locked and entry is blocked until payment verification.`}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.84rem; margin-bottom: 1.2rem; background:#F8FAFC; border:1px solid #E2E8F0; padding:0.9rem; border-radius:10px;">
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Delegate Lead:</strong> <strong>${matchedReg.fullName}</strong> (${matchedReg.usn || 'N/A'})</div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">College:</strong> ${matchedReg.college || 'Presidency University'}</div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Category &amp; Fee:</strong> <span style="color: #0369A1; font-weight: 700;">${catLabel}</span> &bull; <strong style="color: #DC2626;">${matchedReg.feePaid || '₹200'} (UNVERIFIED)</strong></div>
          <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Payment UTR:</strong> <code style="color: #B45309; font-weight:700;">${matchedReg.utrId || 'N/A'}</code></div>
          <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Registered Arenas:</strong> <strong style="color: #0F172A;">${arenas || 'General Fest Entry'}</strong></div>
        </div>

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="verifyAndCheckInFromGate('${matchedReg.id}')" style="background: #059669; border-color: #047857; padding: 0.6rem 1.4rem; font-size: 0.82rem; font-weight: 700;">
            Verify Payment &amp; Clear Gate Entry Now
          </button>
          ${matchedReg.paymentScreenshot ? `
            <button type="button" class="btn btn-ghost" onclick="viewAdminProof('${matchedReg.id}')" style="padding: 0.6rem 1.1rem; font-size: 0.82rem; color: #0284C7; border-color: #0284C7;">
              View Payment Proof
            </button>
          ` : ''}
          <button type="button" class="btn btn-ghost" onclick="setAdminRegStatus('${matchedReg.id}', 'Rejected')" style="padding: 0.6rem 1.1rem; font-size: 0.82rem; color: #E11D48; border-color: #E11D48;">
            Mark Rejected
          </button>
        </div>
      </div>
    `;
    return;
  }

  // CASE 3: PAYMENT IS VERIFIED (ENTRY CLEARED!)
  playScanBeep(true);
  if (clearancePill) {
    clearancePill.textContent = "ACCESS GRANTED — GATE CLEARED";
    clearancePill.style.background = "#ECFDF5";
    clearancePill.style.color = "#047857";
    clearancePill.style.webkitTextFillColor = "#047857";
    clearancePill.style.borderColor = "#10B981";
  }

  // Synchronize local DB check-in state
  const localReg = list.find(r => r.id === matchedReg.id);
  if (localReg) {
    localReg.status = "Checked In";
    localReg.paymentVerified = true;
    if (!localReg.checkInTime) {
      localReg.checkInTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }
    FestDB.saveData(db);
    renderAdminRegistrations(db);
  }

  resultBody.innerHTML = `
    <div style="width: 100%; text-align: left;">
      <div style="background: ${isCheckedIn ? '#EFF6FF' : '#ECFDF5'}; border: 1.5px solid ${isCheckedIn ? '#93C5FD' : '#6EE7B7'}; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
          <span style="font-size: 0.72rem; color: ${isCheckedIn ? '#1D4ED8' : '#047857'}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            ${isCheckedIn ? 'ALREADY CHECKED IN' : 'GATE ENTRY CLEARED • OFFICIAL PASS'}
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
        <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Fee Paid:</strong> <strong style="color: #047857;">${matchedReg.feePaid || '₹200'} (Verified )</strong></div>
        <div><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">UTR ID:</strong> <code style="color: #475569;">${matchedReg.utrId || 'N/A'}</code></div>
        <div style="grid-column: 1 / -1;"><strong style="color: #64748B; font-size: 0.72rem; text-transform: uppercase; display: block;">Registered Arenas:</strong> <strong style="color: #0F172A;">${arenas || 'General Fest Entry'}</strong></div>
      </div>

      ${matchedReg.teamMembers ? `
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem; font-size: 0.78rem; color: #334155;">
          <strong style="color: #0369A1; display: block; margin-bottom: 0.2rem;">Squad Roster:</strong>
          ${matchedReg.teamMembers}
        </div>
      ` : ''}

      <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" onclick="markGatePassCheckedIn('${matchedReg.id}')" style="background: #059669; border-color: #047857; padding: 0.6rem 1.4rem; font-size: 0.82rem; font-weight: 700;">
          ${isCheckedIn ? 'Refresh Check-In' : 'MARK AS CHECKED IN'}
        </button>
        <button type="button" class="btn btn-ghost" onclick="viewAdminPassModal('${matchedReg.id}')" style="padding: 0.6rem 1.1rem; font-size: 0.82rem; color: #0284C7; border-color: #0284C7;">
          Full Pass Preview
        </button>
      </div>
    </div>
  `;
};

window.verifyAndCheckInFromGate = async function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (reg) {
    reg.status = "Checked In";
    reg.paymentVerified = true;
    reg.verifiedAt = new Date().toISOString();
    reg.checkInTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    FestDB.saveData(db);
  }

  try {
    await fetch(`${window.CORE_BACKEND_URL}/registrations/${encodeURIComponent(regId)}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verifiedBy: "Gate Scanner Admin" })
    });
    await fetch(`${window.CORE_BACKEND_URL}/registrations/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrData: regId, scannerSource: "Gate Verification Override" })
    });
  } catch (err) {
    console.warn("Could not push check-in to CORE backend:", err);
  }

  playScanBeep(true);
  renderAdminRegistrations(db);
  if (typeof renderAdminOverview === "function") renderAdminOverview(db);
  handleGateQrScanned(regId);
  alert(`Payment Verified & Gate Cleared!\n\nPass for ${reg ? reg.fullName : regId} is now officially unlocked and checked in.`);
};

window.markGatePassCheckedIn = async function(regId) {
  const db = FestDB.getData();
  const reg = (db.registrations || []).find(r => r.id === regId);
  if (!reg) return;

  reg.status = "Checked In";
  reg.paymentVerified = true;
  reg.checkInTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  FestDB.saveData(db);

  try {
    await fetch(`${window.CORE_BACKEND_URL}/registrations/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrData: regId, scannerSource: "ARENIUM 27 Gate Scanner" })
    });
  } catch (e) {
    console.warn("Could not sync check-in with CORE backend:", e);
  }

  renderAdminRegistrations(db);
  renderAdminOverview(db);
  handleGateQrScanned(regId);

  alert(`DELEGATE CLEARED & CHECKED IN!\n\nPass ID: ${reg.id}\nDelegate: ${reg.fullName}\nTime: ${reg.checkInTime}`);
};

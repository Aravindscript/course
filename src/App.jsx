import React, { useEffect, useMemo, useState } from "react";
import Panda from "./Panda.jsx";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  ShoppingCart,
  Menu,
  X,
  Code2,
  Clock3,
  Play,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Globe2,
  BookOpen,
  ShieldCheck,
  Zap,
  Heart,
  MonitorPlay,
  Award,
  BriefcaseBusiness,
  Filter,
  Plus,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff
} from "lucide-react";
import "./style.css";

const VIDEO_BASE = `${import.meta.env.BASE_URL}videos/`;

// SOCIAL ICONS
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3zm6 0h4v1.7c.6-1.1 1.8-2 3.8-2 4 0 4.2 2.7 4.2 6V21h-4v-5.6c0-1.4 0-3.1-2-3.1s-2.1 1.5-2.1 3V21H9z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.5 15.5v-7l6 3.5z" />
    </svg>
  );
}

// COURSE DATA
const COURSES = [
  {
    id: 1,
    title: "Python Programming: Zero to Advanced",
    instructor: "Jose Portilla",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    reviews: "32,481",
    students: "145K",
    price: 32499,
    oldPrice: 42999,
    duration: "22h 15m",
    lessons: 145,
    badge: "Bestseller",
    image: "photo-1526379095098-d400fd0bf935",
    color: "#e9e5ff",
    description: "Build a strong foundation in Python, then move into object-oriented programming, automation and practical application development.",
    topics: ["Python fundamentals", "Functions and OOP", "Files, modules and packages", "Automation projects"],
    requirements: ["No previous programming experience required", "A computer and an internet connection"],
    includes: ["22 hours of on-demand video", "145 lessons", "Downloadable resources", "Certificate of completion"]
  },
  {
    id: 2,
    title: "The Complete Full-Stack Web Developer",
    instructor: "Dr. Angela Yu",
    category: "Development",
    level: "Beginner",
    rating: 4.9,
    reviews: "28,120",
    students: "112K",
    price: 43599,
    oldPrice: 53499,
    duration: "40h 30m",
    lessons: 220,
    badge: "Bestseller",
    image: "photo-1498050108023-c5249f4df085",
    color: "#dcecff",
    description: "Design, build and deploy modern web applications with front-end and back-end technologies through guided projects.",
    topics: ["HTML5 and modern CSS", "JavaScript and React", "Node.js and APIs", "Database and deployment"],
    requirements: ["Basic computer skills", "Curiosity and willingness to build"],
    includes: ["40 hours of video", "220 lessons", "Source code and project files", "Certificate of completion"]
  },
  {
    id: 3,
    title: "React - Build Real World Applications",
    instructor: "Maximilian Schwarzmüller",
    category: "Development",
    level: "Intermediate",
    rating: 4.8,
    reviews: "19,350",
    students: "89K",
    price: 25549,
    oldPrice: 33199,
    duration: "30h 10m",
    lessons: 180,
    badge: "Popular",
    image: "photo-1633356122544-f134324a6cee",
    color: "#d9f6fb",
    description: "Master components, hooks, routing, state management and modern React patterns by creating complete applications.",
    topics: ["Components, props and JSX", "Hooks and state management", "React Router", "Production-ready projects"],
    requirements: ["HTML, CSS and JavaScript basics", "Node.js installed"],
    includes: ["30 hours of video", "180 lessons", "Practice challenges", "Certificate of completion"]
  },
  {
    id: 4,
    title: "Machine Learning & Artificial Intelligence",
    instructor: "Kirill Eremenko",
    category: "AI & Data",
    level: "Intermediate",
    rating: 4.7,
    reviews: "15,920",
    students: "76K",
    price: 20699,
    oldPrice: 33999,
    duration: "25h 40m",
    lessons: 132,
    badge: "Trending",
    image: "photo-1677442136019-21780ecad995",
    color: "#eee5ff",
    description: "Understand machine learning workflows, model training, evaluation and the foundations of modern AI.",
    topics: ["AI and ML foundations", "Supervised learning", "Model evaluation", "Applied AI exercises"],
    requirements: ["Basic mathematics", "Python fundamentals recommended"],
    includes: ["25 hours of video", "132 lessons", "Datasets and notebooks", "Certificate of completion"]
  },
  {
    id: 5,
    title: "UI/UX Design Masterclass with Figma",
    instructor: "Daniel Walter Scott",
    category: "Design",
    level: "Beginner",
    rating: 4.8,
    reviews: "9,840",
    students: "48K",
    price: 23449,
    oldPrice: 34499,
    duration: "16h 20m",
    lessons: 95,
    badge: "Top rated",
    image: "photo-1561070791-2526d30994b5",
    color: "#ffe8f1",
    description: "Learn user-centred design, wireframing, prototyping and design systems to create polished digital products.",
    topics: ["Design principles", "User flows and wireframes", "Figma components", "Interactive prototypes"],
    requirements: ["No design experience needed", "Free Figma account"],
    includes: ["16 hours of video", "95 lessons", "Design resources", "Certificate of completion"]
  },
  {
    id: 6,
    title: "SQL & Database Development Bootcamp",
    instructor: "Colt Steele",
    category: "IT & Software",
    level: "Beginner",
    rating: 4.7,
    reviews: "7,510",
    students: "39K",
    price: 33399,
    oldPrice: 41999,
    duration: "12h 45m",
    lessons: 80,
    badge: "",
    image: "photo-1544383835-bda2bc66a55d",
    color: "#dff8eb",
    description: "Query, design and manage relational databases while learning practical SQL techniques.",
    topics: ["SQL queries", "Joins and subqueries", "Database design", "Real-world data exercises"],
    requirements: ["Basic computer knowledge"],
    includes: ["12 hours of video", "80 lessons", "Practice database", "Certificate of completion"]
  },
  {
    id: 7,
    title: "Data Science with Python & Statistics",
    instructor: "365 Careers",
    category: "AI & Data",
    level: "Intermediate",
    rating: 4.8,
    reviews: "12,230",
    students: "67K",
    price: 12599,
    oldPrice: 23299,
    duration: "28h 05m",
    lessons: 160,
    badge: "Bestseller",
    image: "photo-1551288049-bebda4e38f71",
    color: "#fff3d8",
    description: "Turn raw data into useful insights with Python, statistics and clear visual storytelling.",
    topics: ["Pandas and NumPy", "Statistics essentials", "Data visualisation", "Business case studies"],
    requirements: ["Basic Python recommended"],
    includes: ["28 hours of video", "160 lessons", "Datasets", "Certificate of completion"]
  },
  {
    id: 8,
    title: "Cybersecurity & Ethical Hacking Essentials",
    instructor: "Nathan House",
    category: "IT & Software",
    level: "Intermediate",
    rating: 4.7,
    reviews: "8,740",
    students: "43K",
    price: 23649,
    oldPrice: 33599,
    duration: "20h 30m",
    lessons: 115,
    badge: "Popular",
    image: "photo-1550751827-4bd374c3f58b",
    color: "#ffe5e7",
    description: "Explore security fundamentals, threat awareness, defensive techniques and ethical testing principles.",
    topics: ["Security fundamentals", "Networking basics", "Threat analysis", "Defensive security"],
    requirements: ["Basic computer and networking knowledge"],
    includes: ["20 hours of video", "115 lessons", "Lab exercises", "Certificate of completion"]
  },
  {
    id: 9,
    title: "Digital Marketing: SEO, Social & Ads",
    instructor: "Robin & Jesper",
    category: "Marketing",
    level: "Beginner",
    rating: 4.6,
    reviews: "6,920",
    students: "35K",
    price: 33399,
    oldPrice: 42299,
    duration: "14h 10m",
    lessons: 90,
    badge: "",
    image: "photo-1460925895917-afdab827c52f",
    color: "#ffeddc",
    description: "Plan digital campaigns, improve search visibility and understand performance analytics.",
    topics: ["SEO fundamentals", "Social media strategy", "Campaign planning", "Marketing analytics"],
    requirements: ["No prior marketing experience"],
    includes: ["14 hours of video", "90 lessons", "Campaign templates", "Certificate of completion"]
  },
  {
    id: 10,
    title: "Cloud Computing & AWS Practitioner",
    instructor: "Stephane Maarek",
    category: "IT & Software",
    level: "Beginner",
    rating: 4.8,
    reviews: "10,460",
    students: "52K",
    price: 34549,
    oldPrice: 42999,
    duration: "18h 35m",
    lessons: 105,
    badge: "Popular",
    image: "photo-1451187580459-43490279c0fa",
    color: "#e1f3ff",
    description: "Learn cloud concepts, core AWS services, deployment models and cloud architecture.",
    topics: ["Cloud fundamentals", "Core AWS services", "Deployment concepts", "Cloud architecture"],
    requirements: ["Basic IT knowledge is helpful"],
    includes: ["18 hours of video", "105 lessons", "Revision notes", "Certificate of completion"]
  },
  {
    id: 11,
    title: "Complete Product Management Course",
    instructor: "Maven Learning",
    category: "Business",
    level: "Beginner",
    rating: 4.7,
    reviews: "5,210",
    students: "26K",
    price: 33499,
    oldPrice: 42799,
    duration: "11h 50m",
    lessons: 72,
    badge: "New",
    image: "photo-1454165804606-c3d57bc86b40",
    color: "#e5f4ef",
    description: "Learn product discovery, roadmaps, prioritisation and cross-functional product delivery.",
    topics: ["Product strategy", "Customer discovery", "Roadmaps and prioritisation", "Launch and measurement"],
    requirements: ["No previous product experience"],
    includes: ["11 hours of video", "72 lessons", "Templates", "Certificate of completion"]
  },
  {
    id: 12,
    title: "Photography: Shoot Like a Professional",
    instructor: "Chris Bray",
    category: "Creative",
    level: "Beginner",
    rating: 4.8,
    reviews: "4,890",
    students: "21K",
    price: 12449,
    oldPrice: 22499,
    duration: "9h 25m",
    lessons: 64,
    badge: "",
    image: "photo-1452587925148-ce544e77e70d",
    color: "#fcebd9",
    description: "Understand exposure, composition, lighting and editing to create stronger photographs.",
    topics: ["Camera settings", "Composition", "Natural and studio light", "Editing workflow"],
    requirements: ["A camera or smartphone"],
    includes: ["9 hours of video", "64 lessons", "Practice assignments", "Certificate of completion"]
  }
];

const CATEGORIES = [
  ["Development", "Code and build digital products", Code2],
  ["IT & Software", "Systems, cloud and security", MonitorPlay],
  ["AI & Data", "Make data work for you", Sparkles],
  ["Design", "Create meaningful experiences", Heart],
  ["Business", "Lead ideas into action", BriefcaseBusiness],
  ["Marketing", "Grow brands and audiences", Globe2],
  ["Creative", "Make something original", Award]
];

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

function CourseCard({ course, index, onOpen, onAdd, inCart }) {
  return (
    <article
      className="course-card"
      style={{ "--delay": `${index * 65}ms` }}
    >
      <button
        className="course-visual"
        onClick={() => onOpen(course)}
        aria-label={`View ${course.title}`}
      >
        <img src={imageUrl(course.image)} alt="" loading="lazy" />

        <span className="visual-overlay">
          <span>
            Explore course <ArrowUpRight size={17} />
          </span>
        </span>

        {course.badge && (
          <span className="course-badge">{course.badge}</span>
        )}

        <span className="visual-play">
          <Play size={17} fill="currentColor" />
        </span>
      </button>

      <div className="course-card-body">
        <div className="course-category">
          {course.category} <span>•</span> {course.level}
        </div>

        <button
          className="course-title-button"
          onClick={() => onOpen(course)}
        >
          <h3>{course.title}</h3>
        </button>

        <p className="instructor">{course.instructor}</p>

        <div className="rating-line">
          <b>{course.rating}</b>
          <span className="stars">★★★★★</span>
          <small>({course.reviews})</small>
        </div>

        <div className="card-bottom">
          <div>
            <strong>₹{course.price}</strong>
            <del>₹{course.oldPrice}</del>
          </div>

          <button
            className={`quick-add ${inCart ? "is-added" : ""}`}
            onClick={() => onAdd(course)}
            aria-label="Add to cart"
          >
            {inCart ? <CheckCircle2 size={17} /> : <Plus size={17} />}
          </button>
        </div>
      </div>
    </article>
  );
}

// MAIN APP
function App() {
  const [screen, setScreen] = useState("intro");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
const [passwordFocused, setPasswordFocused] = useState(false);
  const [authError, setAuthError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All courses");
  const [sort, setSort] = useState("Most popular");

  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const [activeTab, setActiveTab] = useState("Overview");
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScreen("login"), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 2800);
    return () => clearTimeout(timer);
  }, [notice]);

  const filteredCourses = useMemo(() => {
    let list = COURSES.filter((course) => {
      const text =
        `${course.title} ${course.category} ${course.instructor} ${course.description}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory =
        category === "All courses" || course.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "Price: low to high") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "Highest rated") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "Newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    }

    return list;
  }, [search, category, sort]);

  const cartCourses = COURSES.filter((course) =>
    cart.includes(course.id)
  );

  const cartTotal = cartCourses.reduce(
    (sum, course) => sum + course.price,
    0
  );

  function login(event) {
    event.preventDefault();

    if (
      username.trim().toLowerCase() === "aravind" &&
      password === "12345"
    ) {
      setAuthError("");
      setScreen("site");
      setNotice("Welcome back, Aravind. Let's keep learning!");
    } else {
      setAuthError(
        "Incorrect login. Use username Aravind and password 12345."
      );
    }
  }

  function addToCart(course) {
    setCart((current) =>
      current.includes(course.id)
        ? current
        : [...current, course.id]
    );

    setNotice(
      cart.includes(course.id)
        ? "This course is already in your cart."
        : `${course.title} added to your cart.`
    );
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item !== id)
    );
  }

  function openCourse(course) {
    setSelected(course);
    setActiveTab("Overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // INTRO SCREEN
  if (screen === "intro") {
    return (
      <div className="intro-screen">
        <video
          className="intro-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${VIDEO_BASE}intro.mp4`} type="video/mp4" />
        </video>

        <div className="intro-video-overlay" />

        <div className="intro-orbit orbit-a" />
        <div className="intro-orbit orbit-b" />

        <div className="intro-content">
          <div className="brand-mark intro-mark">
            <Code2 size={30} />
          </div>

          <div className="intro-brand">
            Spider<span>Py</span>
          </div>

          <p>LEARN WITHOUT LIMITS</p>

          <div className="intro-loader">
            <span />
          </div>

          <small>Preparing your learning space</small>
        </div>

        <span className="intro-corner">SP / 2026</span>
      </div>
    );
  }

  // LOGIN SCREEN
  if (screen === "login") {
    return (
      <div className="auth-screen">
        <div className="auth-left">
          <video
            className="auth-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={`${VIDEO_BASE}hero.mp4`} type="video/mp4" />
          </video>

          <div className="auth-hero-overlay" />

          <a className="brand auth-brand" href="#login">
            <span className="brand-mark">
              <Code2 size={23} />
            </span>
            Spider<span>Py</span>
          </a>

          <div className="auth-message">
            <span className="eyebrow light-eyebrow">
              <i /> YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Learn today.
              <br />
              <em>Lead tomorrow.</em>
            </h1>

            <p>
              Learn from experts. Build real projects. Move your future
              forward — one lesson at a time.
            </p>

            <div className="auth-stats">
              <div>
                <strong>12K+</strong>
                <small>Active learners</small>
              </div>

              <div>
                <strong>250+</strong>
                <small>Expert courses</small>
              </div>

              <div>
                <strong>4.8/5</strong>
                <small>Learner rating</small>
              </div>
            </div>
          </div>

          <div className="auth-left-footer">
            © 2026 SpiderPy Learning Inc.
          </div>
        </div>

        <div className="auth-right">

  <Panda
    usernameFocused={usernameFocused}
    passwordFocused={passwordFocused}
    showPassword={showPassword}
  />

  <div className="auth-card">
            <div className="auth-mobile-brand">
              <span className="brand-mark">
                <Code2 size={22} />
              </span>
              Spider<span>Py</span>
            </div>

            <span className="section-kicker">
              WELCOME TO SPIDERPY
            </span>

            <h2>Sign in to continue</h2>

            <p className="auth-subtitle">
              Your learning journey is waiting for you.
            </p>

            <form onSubmit={login}>
              <label className="field-label">Username</label>

              <div className="auth-input">
                <UserRound size={18} />

               <input
  value={username}
  onChange={e => setUsername(e.target.value)}
  onFocus={() => setUsernameFocused(true)}
  onBlur={() => setUsernameFocused(false)}
  placeholder="Enter your username"
  autoComplete="username"
/>
              </div>

              <label className="field-label">Password</label>

              <div className="auth-input">
                <LockKeyhole size={18} />

               <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={e => setPassword(e.target.value)}
  onFocus={() => setPasswordFocused(true)}
  onBlur={() => setPasswordFocused(false)}
  placeholder="Enter your password"
  autoComplete="current-password"
/>

               <button
  type="button"
  onMouseDown={e => e.preventDefault()}
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
</button>
              </div>

              {authError && (
                <p className="auth-error">{authError}</p>
              )}

              <div className="auth-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setNotice("Demo account: Aravind / 12345")
                  }
                >
                  Need help?
                </button>
              </div>

              <button
                className="primary-button auth-submit"
                type="submit"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-divider">
              <span />
              OR
              <span />
            </div>

        

            <p className="demo-hint">
              Demo access: <b>Aravind</b> / <b>12345</b>
            </p>

            <small className="auth-terms">
              By continuing, you agree to our Terms of Service and
              Privacy Policy.
            </small>
          </div>
        </div>

        {notice && (
          <div className="toast">
            <CheckCircle2 size={18} />
            {notice}
            <button onClick={() => setNotice("")}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // MAIN WEBSITE
  return (
    <div className="site-shell">
      <div className="topline">
        <Sparkles size={14} />
        Build a better version of yourself.
        <a href="#courses">
          Explore learning paths <ArrowRight size={13} />
        </a>
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Code2 size={23} />
          </span>
          Spider<span>Py</span>
        </a>

        <button
          className="explore-trigger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Explore <ChevronDown size={15} />
        </button>

        <div className="nav-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected(null);
            }}
            placeholder="Search courses, skills and topics..."
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={15} />
            </button>
          )}
        </div>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#courses" onClick={() => setMenuOpen(false)}>
            Courses
          </a>

          <a href="#categories" onClick={() => setMenuOpen(false)}>
            Categories
          </a>

          <a href="#business" onClick={() => setMenuOpen(false)}>
            For teams
          </a>

          <a href="#teach" onClick={() => setMenuOpen(false)}>
            Teach
          </a>
        </nav>

        <button
          className="nav-icon cart-trigger"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <ShoppingCart size={20} />

          {cart.length > 0 && <i>{cart.length}</i>}
        </button>

        <button
          className="nav-login"
          onClick={() => {
            setScreen("login");
            setSelected(null);
          }}
        >
          Account
        </button>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {selected ? (
        // COURSE DETAILS
        <main className="detail-page">
          <div className="detail-breadcrumb">
            <button onClick={() => setSelected(null)}>
              Courses
            </button>

            <span>/</span>
            <span>{selected.category}</span>
            <span>/</span>
            <b>{selected.title}</b>
          </div>

          <section className="detail-hero">
            <div className="detail-hero-copy">
              <span className="eyebrow light-eyebrow">
                <i />
                {selected.category.toUpperCase()} •{" "}
                {selected.level.toUpperCase()}
              </span>

              <h1>{selected.title}</h1>

              <p>{selected.description}</p>

              <div className="detail-rating">
                <b>{selected.rating}</b>
                <span className="stars">★★★★★</span>
                <u>{selected.reviews} ratings</u>
                <span>• {selected.students} students</span>
              </div>

              <p className="detail-instructor">
                Created by <u>{selected.instructor}</u>
              </p>

              <div className="detail-meta">
                <span>
                  <Clock3 size={16} /> {selected.duration}
                </span>

                <span>
                  <BookOpen size={16} /> {selected.lessons} lessons
                </span>

                <span>
                  <Globe2 size={16} /> English
                </span>

                <span>
                  <Award size={16} /> Certificate
                </span>
              </div>
            </div>

            <aside className="purchase-card">
              <div className="purchase-image">
                <img
                  src={imageUrl(selected.image)}
                  alt={selected.title}
                />

                <span>
                  <Play size={20} fill="currentColor" />
                  Preview this course
                </span>
              </div>

              <div className="purchase-body">
                <div className="purchase-price">
                  <strong>₹{selected.price}</strong>
                  <del>₹{selected.oldPrice}</del>

                  <span>
                    {Math.round(
                      (1 - selected.price / selected.oldPrice) * 100
                    )}
                    % off
                  </span>
                </div>

                <p className="offer-note">
                  Limited-time learning offer
                </p>

                <button
                  className="primary-button full-button"
                  onClick={() => addToCart(selected)}
                >
                  {cart.includes(selected.id)
                    ? "Added to cart"
                    : "Add to cart"}
                  <ShoppingCart size={17} />
                </button>

                <button
                  className="secondary-button full-button"
                  onClick={() =>
                    setNotice(
                      "Checkout demo: connect a payment gateway to accept payments."
                    )
                  }
                >
                  Enroll now <ArrowRight size={17} />
                </button>

                <small className="guarantee">
                  <ShieldCheck size={15} />
                  30-day learning guarantee
                </small>

                <div className="includes">
                  <b>This course includes:</b>

                  {selected.includes.map((item) => (
                    <span key={item}>
                      <CheckCircle2 size={15} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </section>

          <section className="detail-content">
            <div className="detail-main">
              <div className="detail-tabs">
                {["Overview", "Curriculum", "Instructor", "Reviews"].map(
                  (tab) => (
                    <button
                      className={activeTab === tab ? "active" : ""}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {activeTab === "Overview" && (
                <>
                  <h2>What you'll learn</h2>

                  <div className="learning-grid">
                    {selected.topics.map((topic) => (
                      <span key={topic}>
                        <CheckCircle2 size={17} />
                        {topic}
                      </span>
                    ))}
                  </div>

                  <h2>Course description</h2>

                  <p className="body-copy">
                    {selected.description} Each module combines clear
                    explanations with practical exercises so you can
                    apply your knowledge beyond the classroom.
                  </p>

                  <h2>Requirements</h2>

                  <ul>
                    {selected.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeTab === "Curriculum" && (
                <>
                  <h2>Course curriculum</h2>

                  <p className="body-copy">
                    {selected.lessons} lessons • {selected.duration} total
                    length
                  </p>

                  {[
                    "Getting started",
                    "Core concepts",
                    "Build your skills",
                    "Practical project",
                    "Next steps"
                  ].map((item, i) => (
                    <div className="curriculum-row" key={item}>
                      <span>
                        <Play size={15} />
                        {i + 1}. {item}
                      </span>

                      <small>
                        {Math.round(selected.lessons / 5)} lessons
                      </small>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "Instructor" && (
                <>
                  <h2>Meet your instructor</h2>

                  <div className="instructor-card">
                    <div className="instructor-avatar">
                      {selected.instructor
                        .split(" ")
                        .map((x) => x[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <h3>{selected.instructor}</h3>

                      <p>
                        Industry educator • Practical learning advocate
                      </p>

                      <div className="rating-line">
                        <b>4.8</b>
                        <span className="stars">★★★★★</span>
                        <small>Instructor rating</small>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Reviews" && (
                <>
                  <h2>Learner feedback</h2>

                  <div className="review-card">
                    <span className="stars">★★★★★</span>
                    <p>
                      “Clear explanations and practical lessons. I could
                      apply what I learned immediately.”
                    </p>
                    <b>Verified learner</b>
                  </div>

                  <div className="review-card">
                    <span className="stars">★★★★★</span>
                    <p>
                      “A structured course that makes complex topics
                      easier to understand.”
                    </p>
                    <b>Verified learner</b>
                  </div>
                </>
              )}
            </div>

            <aside className="detail-side-note">
              <Sparkles size={20} />
              <h3>Learn at your pace</h3>
              <p>
                Get lifetime access to the course content and revisit
                lessons whenever you need.
              </p>
            </aside>
          </section>
        </main>
      ) : (
        // HOME PAGE
        <main>
          <section className="hero-section" id="home">

  {/* MAIN BACKGROUND VIDEO */}
  <video
    className="main-hero-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src={`${VIDEO_BASE}main.mp4`} type="video/mp4" />
  </video>

  <div className="main-video-overlay"></div>

  <div className="hero-copy">
              <span className="eyebrow">
                <i /> THE FUTURE IS YOURS TO BUILD
              </span>

              <h1>
                Learn today.
                <br />
                <em>Lead tomorrow.</em>
              </h1>

              <p>
                Discover expert-led courses, build in-demand skills and
                turn your curiosity into real-world confidence.
              </p>

              <div className="hero-actions">
                <a className="primary-button" href="#courses">
                  Explore courses <ArrowUpRight size={18} />
                </a>

                <a className="text-link" href="#categories">
                  Browse learning paths <ArrowRight size={17} />
                </a>
              </div>

              <div className="hero-proof">
                <div className="avatar-stack">
                  <i>A</i>
                  <i>M</i>
                  <i>R</i>
                  <i>+</i>
                </div>

                <div>
                  <span className="stars">★★★★★</span>
                  <small>
                    <b>12,000+</b> learners growing with us
                  </small>
                </div>
              </div>
            </div>

           
          </section>

          <section className="stats-strip">
            <div>
              <strong>250+</strong>
              <span>Expert-led lessons</span>
            </div>

            <div>
              <strong>12K+</strong>
              <span>Active learners</span>
            </div>

            <div>
              <strong>40+</strong>
              <span>Learning paths</span>
            </div>

            <div>
              <strong>4.8/5</strong>
              <span>Average learner rating</span>
            </div>
          </section>

          <section
            className="category-section section-wrap"
            id="categories"
          >
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  FIND YOUR DIRECTION
                </span>

                <h2>
                  Explore by <em>category.</em>
                </h2>

                <p>
                  Whatever your ambition, there's a path to help you get
                  there.
                </p>
              </div>

              <a className="text-link" href="#courses">
                View all courses <ArrowRight size={16} />
              </a>
            </div>

            <div className="category-grid">
              {CATEGORIES.map(([name, desc, Icon], i) => (
                <button
                  className="category-tile"
                  key={name}
                  onClick={() => {
                    setCategory(name);
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ "--delay": `${i * 55}ms` }}
                >
                  <span className="category-symbol">
                    <Icon size={22} />
                  </span>

                  <span className="category-tile-text">
                    <b>{name}</b>
                    <small>{desc}</small>
                  </span>

                  <ArrowUpRight
                    className="category-arrow"
                    size={18}
                  />
                </button>
              ))}
            </div>
          </section>

          <section className="featured-section">
            <div className="section-wrap">
              
              <div className="section-heading">
                
                <div>
                  <span className="section-kicker">
                    HANDPICKED FOR YOUR GROWTH
                  </span>

                  <h2>
                    Skills worth <em>investing in.</em>
                  </h2>

                  <p>
                    Popular courses learners are loving right now.
                  </p>
                </div>

                <a href="#courses" className="text-link">
                  Explore the library <ArrowRight size={16} />
                </a>
              </div>

              

              <div className="featured-grid">
                <div className="featured-large">
                  <img
                    src={imageUrl("photo-1516321318423-f06f85e504b3")}
                    alt="Online learning"
                  />
                  

                  <div>
                    <span>LEARNING SPOTLIGHT</span>

                    <h3>
                      Small steps.
                      <br />
                      Big possibilities.
                    </h3>

                    <p>
                      Build a skill stack that moves your career forward.
                    </p>

                    <a href="#courses">
                      Find your next course <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="featured-mini mini-one">
                  <span className="mini-icon">
                    <Code2 />
                  </span>

                  <small>CAREER SKILL</small>

                  <b>
                    Development
                    <br />
                    starts here.
                  </b>

                  <span className="mini-arrow">
                    <ArrowUpRight />
                  </span>
                </div>

                <div className="featured-mini mini-two">
                  <span className="mini-icon">
                    <Sparkles />
                  </span>

                  <small>WHAT'S NEXT</small>

                  <b>
                    Explore the
                    <br />
                    world of AI.
                  </b>

                  <span className="mini-arrow">
                    <ArrowUpRight />

                    
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            className="courses-section section-wrap"
            id="courses"
          >
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  THE SPIDERPY LIBRARY
                </span>

                <h2>
                  Find your next <em>big thing.</em>
                </h2>

                <p>
                  Practical courses. Expert instructors. Skills you can
                  use.
                </p>
              </div>

              <span className="course-count">
                {filteredCourses.length} COURSES
              </span>
            </div>

            <div className="course-controls">
              <div className="filter-label">
                <Filter size={16} /> Filter by
              </div>

              <div className="filter-pills">
                <button
                  className={
                    category === "All courses" ? "selected" : ""
                  }
                  onClick={() => setCategory("All courses")}
                >
                  All courses
                </button>

                {[
                  "Development",
                  "IT & Software",
                  "AI & Data",
                  "Design",
                  "Business",
                  "Marketing",
                  "Creative"
                ].map((c) => (
                  <button
                    key={c}
                    className={category === c ? "selected" : ""}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort courses"
              >
                <option>Most popular</option>
                <option>Highest rated</option>
                <option>Price: low to high</option>
                <option>Newest</option>
              </select>
            </div>

            <div className="course-grid">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  onOpen={openCourse}
                  onAdd={addToCart}
                  inCart={cart.includes(course.id)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="empty-state">
                <Search size={28} />
                <h3>No courses found</h3>
                <p>Try another keyword or category.</p>

                <button
                  className="secondary-button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All courses");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <section
            className="career-banner section-wrap"
            id="business"
          >

             <div className="hero-art">
              <div className="hero-glow" />

              <div className="hero-image-main">
                <img
                  src={imageUrl("photo-1516321318423-f06f85e504b3")}
                  alt="Learners collaborating online"
                />
              </div>

              <div className="floating-card float-top">
                <span className="float-icon">
                  <GraduationCap size={19} />
                </span>

                <div>
                  <b>Keep growing</b>
                  <small>One lesson at a time</small>
                </div>
              </div>

              <div className="floating-card float-bottom">
                <span className="float-icon orange">
                  <Zap size={19} />
                </span>

                <div>
                  <b>Skills that matter</b>
                  <small>Built for the real world</small>
                </div>
              </div>

              <div className="hero-sticker">
                LEARN
                <br />
                • BUILD
                <br />
                • GROW
              </div>
            </div>
            

            <div className="career-copy">
              <span className="section-kicker">
                FOR TEAMS & ORGANISATIONS
              </span>

              <h2>
                Better skills.
                <br />
                <em>Stronger teams.</em>
              </h2>

              <p>
                Help your team stay curious, capable and ready for
                what's next with flexible learning experiences.
              </p>

              <button
                className="dark-button"
                onClick={() =>
                  setNotice(
                    "Business enquiry demo. Connect your contact form to receive enquiries."
                  )
                }
              >
                Explore team learning <ArrowRight size={17} />
              </button>
            </div>
          </section>

          <section className="testimonial-section">
            <div className="section-wrap">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">
                    REAL PEOPLE. REAL PROGRESS.
                  </span>

                  <h2>
                    Learning that <em>moves you.</em>
                  </h2>

                  <p>
                    Every new skill is a new possibility.
                  </p>
                </div>
              </div>

              <div className="testimonial-grid">
                <article className="testimonial-card">
                  <span className="quote-mark">“</span>

                  <p>
                    SpiderPy helped me turn a confusing topic into
                    something I could actually build with. The
                    project-based approach made the difference.
                  </p>

                  <div className="testimonial-person">
                    <span>AK</span>

                    <div>
                      <b>Alex K.</b>
                      <small>Frontend learner</small>
                    </div>

                    <span className="stars">★★★★★</span>
                  </div>
                </article>

                <article className="testimonial-card featured-quote">
                  <span className="quote-mark">“</span>

                  <p>
                    I finally found a learning routine that fits my
                    schedule. Clear lessons, practical exercises and a
                    great way to keep progressing.
                  </p>

                  <div className="testimonial-person">
                    <span>SM</span>

                    <div>
                      <b>Sarah M.</b>
                      <small>Career switcher</small>
                    </div>

                    <span className="stars">★★★★★</span>
                  </div>
                </article>

                <article className="testimonial-card">
                  <span className="quote-mark">“</span>

                  <p>
                    The course structure gave me the confidence to start
                    a project from scratch. I can see how much I've
                    improved.
                  </p>

                  <div className="testimonial-person">
                    <span>JR</span>

                    <div>
                      <b>Jordan R.</b>
                      <small>Data learner</small>
                    </div>

                    <span className="stars">★★★★★</span>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="teach-banner section-wrap" id="teach">
            <div>
              <span className="section-kicker">
                SHARE WHAT YOU KNOW
              </span>

              <h2>
                Your experience can
                <br />
                <em>inspire someone.</em>
              </h2>

              <p>
                Teach on SpiderPy and help learners everywhere discover
                what they're capable of.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setNotice(
                    "Instructor application demo. Connect this action to your backend."
                  )
                }
              >
                Become an instructor <ArrowUpRight size={17} />
              </button>
            </div>

           <div className="career-art">
              <div className="career-orbit" />

              <div className="career-icon">
                <BriefcaseBusiness size={45} />
              </div>

              <span className="career-chip chip-a">
                TEAM LEARNING
              </span>

              <span className="career-chip chip-b">
                GROW TOGETHER
              </span>
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      {!selected && (
        <footer className="footer">
          <div className="footer-main section-wrap">
            <div className="footer-brand-col">
              <a className="brand footer-brand" href="#home">
                <span className="brand-mark">
                  <Code2 size={23} />
                </span>
                Spider<span>Py</span>
              </a>

              <p>
                Learn something new.
                <br />
                Build something meaningful.
              </p>

              <div className="social-links">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <b>Explore</b>
              <a href="#courses">All courses</a>
              <a href="#categories">Categories</a>
              <a href="#courses">Popular skills</a>
              <a href="#business">For teams</a>
            </div>

            <div className="footer-col">
              <b>SpiderPy</b>
              <a href="#teach">Teach with us</a>
              <a href="#home">About us</a>
              <a href="#home">Careers</a>
              <a href="#home">Contact</a>
            </div>

            <div className="footer-col">
              <b>Support</b>
              <a href="#home">Help centre</a>
              <a href="#home">FAQs</a>
              <a href="#home">Terms of service</a>
              <a href="#home">Privacy policy</a>
            </div>

            <div className="newsletter-col">
              <b>Stay in the loop.</b>

              <p>
                Get learning ideas and new course updates in your inbox.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (newsletter.includes("@")) {
                    setSubscribed(true);
                    setNotice("Thanks for subscribing!");
                  } else {
                    setNotice("Please enter a valid email address.");
                  }
                }}
              >
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Your email address"
                  required
                />

                <button aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>

              {subscribed && (
                <small className="subscribed">
                  You're on the list!
                </small>
              )}
            </div>
          </div>

          <div className="footer-bottom section-wrap">
            <span>
              © 2026 SpiderPy Learning Inc. All rights reserved.
            </span>

            <span>
              Made for curious minds{" "}
              <Heart size={13} fill="currentColor" />
            </span>

            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-head">
              <div>
                <span className="section-kicker">
                  YOUR LEARNING PICKS
                </span>

                <h2>
                  Shopping cart <span>({cart.length})</span>
                </h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>

            {cartCourses.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={40} />

                <h3>Your cart is waiting</h3>

                <p>
                  Add a course and take the next step in your learning
                  journey.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Explore courses <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartCourses.map((course) => (
                    <div className="cart-item" key={course.id}>
                      <img
                        src={imageUrl(course.image)}
                        alt=""
                      />

                      <div>
                        <b>{course.title}</b>
                        <small>{course.instructor}</small>
                        <strong>₹{course.price}</strong>
                      </div>

                      <button
                        onClick={() => removeFromCart(course.id)}
                        aria-label="Remove course"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <span>Total</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <button
                  className="primary-button full-button"
                  onClick={() =>
                    setNotice(
                      "Checkout demo: connect a payment gateway to complete enrolment."
                    )
                  }
                >
                  Continue to checkout <ArrowRight size={17} />
                </button>

                <p className="cart-secure">
                  <ShieldCheck size={14} />
                  Secure checkout experience
                </p>
              </>
            )}
          </aside>
        </div>
      )}

      {notice && (
        <div className="toast">
          <CheckCircle2 size={18} />
          <span>{notice}</span>

          <button onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
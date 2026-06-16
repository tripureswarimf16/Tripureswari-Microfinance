import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Heart,
  Users,
  Building,
  Phone
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   Hook: Intersection Observer for scroll-triggered animations
   ───────────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
}

/* ─────────────────────────────────────────────────────────
   Component: Animated Section Wrapper
   ───────────────────────────────────────────────────────── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Navbar
   ───────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-40 bg-[#000a1e]/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-xl shadow-black/20 py-4' : 'py-6'
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-16 max-w-[1280px] mx-auto h-12">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <img
            src="/tmf_logo.jpeg"
            alt="TMF Logo"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#fe9832]/50"
          />
          <div className="flex flex-col justify-center">
            <a href="#" className="font-serif text-[18px] md:text-[20px] font-bold text-white tracking-wide leading-none">
              Tripureswari <span className="text-[#fe9832]">Microfinance</span>
            </a>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider mt-1 block md:hidden">
              Section 8 · Non-Profit
            </span>
          </div>
        </div>

        {/* Section 8 Badge */}
        <div className="hidden md:block">
          <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded border border-white/10">
            Section 8 · Non-Profit
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Hero Section
   ───────────────────────────────────────────────────────── */
function Hero() {
  const credentials = [
    'Companies Act 2013',
    '12A & 80G Registered',
    'RBI Compliant',
    'NBFC-MFI Transition Pathway',
    'Household income cap ₹3L — RBI guidelines compliant',
    'Strategic alliance with BMSCCSL (Reg. No. MSCS/CR/589/2012)',
    'Channel partner: BIPA Multi Services Pvt Ltd',
    'Multi-disciplinary board · Independent Audit & Risk Committees'
  ];

  return (
    <section id="hero" className="bg-[#000a1e] text-white pt-40 pb-24 md:pb-32 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#fe9832] blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-900 blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Headline and Mission Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#fe9832]/10 text-[#fe9832] text-[11px] font-bold tracking-widest border border-[#fe9832]/25 mb-8 uppercase animate-fade-in">
              Agartala, Tripura · Est. 2013
            </span>

            <h1 className="font-serif text-[36px] md:text-[54px] lg:text-[62px] font-bold leading-tight mb-8 tracking-tight">
              Financial Access <br />
              <span className="text-[#fe9832] italic">for Every Household</span>
            </h1>

            <p className="text-[16px] md:text-[18px] text-gray-300 mb-6 leading-relaxed font-sans font-light max-w-2xl">
              Tripureswari Microfinance (TMF) is a registered Section 8 non-profit microfinance institution dedicated to bridging Tripura's credit gap — placing responsible, affordable finance directly in the hands of underserved communities.
            </p>
          </div>

          {/* Core Credentials List */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-[11px] font-bold text-[#fe9832] uppercase tracking-widest mb-6">
              Institutional Framework & Compliance
            </h2>
            <ul className="space-y-4">
              {credentials.map((cred, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[13px] text-gray-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe9832] mt-2 shrink-0 animate-pulse" />
                  <span className="leading-relaxed font-light">{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Who We Are & Mission Pillars
   ───────────────────────────────────────────────────────── */
function AboutSection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: 'Community-First Lending',
      body: 'Loans disbursed through SHG and JLG group structures, embedding accountability and social capital into every credit cycle.',
      icon: Users,
      emoji: '🤝',
      graphic: (
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#fe9832] stroke-[1.5] fill-none">
          <circle cx="100" cy="100" r="80" strokeDasharray="5,5" className="opacity-30" />
          <circle cx="100" cy="30" r="12" fill="#fe9832" />
          <circle cx="160" cy="80" r="10" fill="#000a1e" className="stroke-[#fe9832]" />
          <circle cx="140" cy="150" r="10" fill="#000a1e" className="stroke-[#fe9832]" />
          <circle cx="60" cy="150" r="10" fill="#000a1e" className="stroke-[#fe9832]" />
          <circle cx="40" cy="80" r="10" fill="#000a1e" className="stroke-[#fe9832]" />
          <line x1="100" y1="30" x2="160" y2="80" />
          <line x1="160" y1="80" x2="140" y2="150" />
          <line x1="140" y1="150" x2="60" y2="150" />
          <line x1="60" y1="150" x2="40" y2="80" />
          <line x1="40" y1="80" x2="100" y2="30" />
          <path d="M100,75 C100,75 115,60 125,70 C135,80 110,110 100,125 C90,110 65,80 75,70 C85,60 100,75 100,75 Z" fill="#fe9832" opacity="0.15" />
        </svg>
      )
    },
    {
      title: 'Regulatory Integrity',
      body: 'Full compliance with RBI household income and individual loan caps. CIC reporting maintained. Structured for frictionless NBFC-MFI transition.',
      icon: ShieldCheck,
      emoji: '⚖️',
      graphic: (
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#fe9832] stroke-[1.5] fill-none">
          <path d="M100,30 L160,50 L160,110 C160,150 100,175 100,175 C100,175 40,150 40,110 L40,50 Z" />
          <path d="M75,100 L93,118 L130,80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="60" y1="65" x2="140" y2="65" strokeDasharray="3,3" opacity="0.4" />
          <line x1="65" y1="145" x2="135" y2="145" strokeDasharray="3,3" opacity="0.4" />
        </svg>
      )
    },
    {
      title: 'Social Impact',
      body: '3,200+ women borrowers served monthly. Emergency medical assistance disbursed within 3 hours via the EMA product window.',
      icon: Heart,
      emoji: '🌱',
      graphic: (
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#fe9832] stroke-[1.5] fill-none">
          <path d="M75,150 L125,150 L120,175 L80,175 Z" fill="#000a1e" />
          <path d="M100,150 Q95,90 110,40" strokeWidth="2.5" />
          <path d="M100,120 Q125,110 130,90 Q110,105 100,120 Z" fill="#fe9832" opacity="0.2" />
          <path d="M98,90 Q70,80 65,60 Q85,75 98,90 Z" fill="#fe9832" opacity="0.2" />
          <path d="M108,60 Q135,50 140,30 Q120,45 108,60 Z" fill="#fe9832" />
          <circle cx="100" cy="100" r="70" strokeDasharray="4,8" opacity="0.2" />
        </svg>
      )
    },
    {
      title: 'Institutional Governance',
      body: 'Multi-disciplinary board with independent Audit and Risk Committees. Transparent reporting aligned with impact finance standards.',
      icon: Building,
      emoji: '🏛️',
      graphic: (
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#fe9832] stroke-[1.5] fill-none">
          <path d="M40,55 L160,55 L100,25 Z" fill="#000a1e" />
          <rect x="45" y="55" width="110" height="8" />
          <line x1="60" y1="63" x2="60" y2="155" strokeWidth="3.5" />
          <line x1="86" y1="63" x2="86" y2="155" strokeWidth="3.5" />
          <line x1="114" y1="63" x2="114" y2="155" strokeWidth="3.5" />
          <line x1="140" y1="63" x2="140" y2="155" strokeWidth="3.5" />
          <rect x="35" y="155" width="130" height="15" rx="2" fill="#fe9832" opacity="0.2" />
          <line x1="30" y1="170" x2="170" y2="170" strokeWidth="2" />
        </svg>
      )
    }
  ];

  // Auto cycle pillars
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((curr) => (curr + 1) % pillars.length);
    }, 15000); // 15 seconds

    return () => clearInterval(timer);
  }, [activePillar, pillars.length]);

  const handleTabClick = (idx) => {
    setActivePillar(idx);
  };

  const activeP = pillars[activePillar];

  return (
    <section id="about" className="bg-[#fcf9f4] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold tracking-widest text-[#fe9832] uppercase block mb-3">
              About Us
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] font-bold text-[#000a1e] leading-tight">
              Who We Are
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[15px] md:text-[16px] text-gray-600 leading-relaxed font-light">
            <p>
              Tripureswari Microfinance (TMF) is a Section 8 non-profit company incorporated under the Companies Act 2013, holding 12A and 80G registrations. We operate a responsible micro-lending programme in Tripura, structured in strategic alliance with Bandhan Multi State Co-operative Credit Society Ltd (BMSCCSL) through BIPA Multi Services Pvt Ltd as the designated channel partner.
            </p>
            <p>
              Our mission is to replace predatory informal credit — which typically charges 22–25% per annum — with structured, affordable, and dignity-preserving financial products. We serve skilled artisans, smallholder farmers, self-help group members, and new-generation entrepreneurs across high-potential unorganised sectors in Tripura. Every field officer functions as a community mentor, not merely a loan agent, reflecting our belief that financial access and financial literacy must travel together.
            </p>
          </div>
        </div>

        {/* Interactive Pillars Dashboard */}
        <div 
          className="bg-[#000a1e] text-white rounded-3xl overflow-hidden border border-white/5 shadow-2xl p-6 md:p-10 lg:p-12 relative"
        >
          {/* Decorative ambient background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-radial-gradient from-[#fe9832] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            {/* Left Column: Pillar Tabs */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#fe9832]/80 mb-6 block">
                Click a pillar to pause and explore
              </div>
              <div className="space-y-3">
                {pillars.map((p, idx) => {
                  const isActive = activePillar === idx;
                  return (
                    <button
                      key={p.title}
                      onClick={() => handleTabClick(idx)}
                      className={`w-full flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? 'bg-white/5 border-[#fe9832]/35 shadow-lg shadow-black/20 translate-x-2'
                          : 'bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.01]'
                      }`}
                    >
                      <div className="flex items-center gap-4.5 w-full">
                        <span className={`text-[20px] shrink-0 transition-transform ${
                          isActive ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                          {p.emoji}
                        </span>
                        <div className="flex-grow">
                          <h4 className={`text-[15px] md:text-[16px] font-serif font-bold transition-colors ${
                            isActive ? 'text-[#fe9832]' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {p.title}
                          </h4>
                        </div>
                      </div>

                      {/* Active Progress Bar indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 h-[2px] bg-[#fe9832]/80 animate-progress-bar" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual Stage / Active Content Detail */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 min-h-[350px]">
              <div className="w-40 h-40 flex items-center justify-center mb-8 bg-[#000a1e] rounded-full border border-[#fe9832]/25 shadow-inner">
                {activeP.graphic}
              </div>
              
              <div className="text-center max-w-md animate-fade-in">
                <span className="text-3xl block mb-2">{activeP.emoji}</span>
                <h3 className="font-serif text-[24px] font-bold text-[#fe9832] mb-4">
                  {activeP.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed font-light">
                  {activeP.body}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Products Section
   ───────────────────────────────────────────────────────── */
function ProductCard({ tag, name, desc, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group bg-[#000a1e] rounded-2xl overflow-hidden flex flex-col justify-between h-full text-white border border-white/5 hover:border-[#fe9832]/30 transition-all duration-300 p-8">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fe9832]/10 text-[#fe9832] text-[10px] font-bold tracking-wider mb-6 uppercase border border-[#fe9832]/15">
            {tag}
          </span>
          <h3 className="font-serif text-[22px] font-bold text-white mb-2 leading-snug">
            {name}
          </h3>
          <p className="text-gray-300 text-[14px] leading-relaxed font-light mt-4">
            {desc}
          </p>
        </div>
        <div className="h-1 w-full bg-white/5 group-hover:bg-[#fe9832] transition-colors duration-300 mt-8" />
      </div>
    </AnimatedSection>
  );
}

function ProductsSection() {
  const products = [
    {
      tag: 'Individual Loan',
      name: 'Insta Finance',
      desc: 'Fast-turnaround individual credit for immediate working capital needs — retail traders, micro-vendors, and household consumption emergencies.',
    },
    {
      tag: 'Group Lending',
      name: 'SHG Loans',
      desc: "Self Help Group credit channelled through established women's collectives, deepening financial inclusion and group-based accountability across rural Tripura.",
    },
    {
      tag: 'Group Lending',
      name: 'JLG Loans',
      desc: 'Joint Liability Group financing — our highest-volume engine — supporting smallholder farmers, artisans, and New-Gen Entrepreneurs with structured credit.',
    },
    {
      tag: 'Emergency Credit',
      name: 'EMA',
      desc: "Emergency Medical Assistance — a dedicated window disbursing funds within 3 hours for healthcare emergencies, tackling Tripura's 47% out-of-pocket health expenditure burden.",
    },
  ];

  return (
    <section id="products" className="bg-[#f0ede9] py-20 md:py-28 border-t border-gray-200/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-300 pb-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#fe9832] uppercase block mb-2">
                Our Products
              </span>
              <h2 className="font-serif text-[32px] md:text-[42px] font-bold text-[#000a1e]">
                What We Offer
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed mb-12 font-light max-w-4xl">
            TMF's product suite is designed around the real cash-flow rhythms of Tripura's households and micro-enterprises. All products carry a 12-month flat tenure and a 1.5% borrower protection insurance premium, keeping borrowers covered through the full loan cycle.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} {...p} delay={100 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Leadership Section
   ───────────────────────────────────────────────────────── */
function LeadershipSection() {
  return (
    <section id="leadership" className="bg-[#fcf9f4] py-20 md:py-28 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Photo using actual ceo.jpeg */}
          <AnimatedSection className="lg:col-span-5" delay={0}>
            <div className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-gray-200 shadow-2xl border-[6px] border-white ring-1 ring-gray-300">
              <img
                src="/ceo.jpeg"
                alt="Sanghamitra Mukherjee, Chairperson & CEO of Tripureswari Microfinance"
                className="w-full h-full object-cover object-top grayscale-[10%] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#000a1e] to-transparent text-white">
                <h3 className="font-serif text-[20px] font-bold">Sanghamitra Mukherjee</h3>
                <p className="text-[11px] text-[#fe9832] uppercase font-bold tracking-widest mt-1">Chairperson & CEO</p>
              </div>
            </div>
          </AnimatedSection>

          {/*Spacer */}
          <div className="lg:col-span-1 hidden lg:block" />

          {/* Info */}
          <AnimatedSection className="lg:col-span-6" delay={150}>
            <span className="text-[11px] font-bold tracking-widest text-[#fe9832] uppercase block mb-3">
              Leadership
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-bold text-[#000a1e] mb-2 leading-tight">
              Sanghamitra Mukherjee
            </h2>
            <p className="text-[13px] font-bold tracking-wider text-gray-400 uppercase mb-6">
              Chairperson & Chief Executive Officer
            </p>

            <div className="w-full h-px bg-gray-200 mb-6" />

            <div className="space-y-6 text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light mb-8">
              <p>
                Sanghamitra Mukherjee leads Tripureswari Microfinance as its founding Chairperson and Chief Executive Officer. Under her stewardship, TMF has grown from a community credit initiative into a structured, institutionally governed microfinance operation covering Tripura's most underserved districts.
              </p>
              <p>
                Her leadership philosophy centres on combining rigorous financial discipline with deep community engagement — a model that has kept TMF's historical NPA below 2% while consistently expanding its reach to women-led self-help groups and micro-entrepreneurs in the state's unorganised economy.
              </p>
              <p>
                Sanghamitra is an advocate for the daily EMI model and supply chain-integrated lending as tools for structurally eliminating end-of-cycle default risk — innovations that position TMF at the frontier of responsible microfinance in Northeast India.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-6 border-t border-gray-200">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Contact Info:</span>
              <a
                href="tel:+919205063955"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#000a1e] text-white hover:bg-[#fe9832] hover:text-[#000a1e] transition-all duration-300 text-[14px] font-bold tracking-wide shadow-md hover:shadow-lg border border-[#000a1e] hover:border-[#fe9832]"
              >
                <Phone className="w-4 h-4 text-[#fe9832] transition-colors" />
                <span>+91 92050 63955</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Component: Footer
   ───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="footer" className="bg-[#000a1e] text-[#708ab5] border-t border-white/5 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-6">
        <div className="text-white text-[13px] md:text-[14px] font-medium leading-relaxed max-w-4xl mx-auto">
          Tripureswari Microfinance &nbsp;|&nbsp; Section 8 Non-Profit · Companies Act 2013 · 12A & 80G Registered &nbsp;|&nbsp; Agartala, Tripura, India
        </div>
        <div className="flex justify-center items-center gap-2 text-[14px] font-bold text-white/90">
          <a
            href="tel:+919205063955"
            className="flex items-center gap-2 hover:text-[#fe9832] transition-colors duration-200 bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <Phone className="w-4 h-4 text-[#fe9832]" />
            <span>+91 92050 63955</span>
          </a>
        </div>
        <div className="text-gray-400 text-[12px] leading-relaxed max-w-3xl mx-auto font-light">
          In strategic alliance with Bandhan Multi State Co-operative Credit Society Ltd (MSCS/CR/589/2012) through BIPA Multi Services Pvt Ltd
        </div>
        <div className="border-t border-white/5 pt-6 text-[11px] text-gray-500 font-medium">
          © 2026 Tripureswari Microfinance (TMF). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   Main App Component
   ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#fcf9f4] font-sans text-gray-800 antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProductsSection />
        <LeadershipSection />
      </main>
      <Footer />
    </div>
  );
}

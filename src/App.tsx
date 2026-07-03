import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { 
  ChevronDown, 
  Code2, 
  Mail, 
  Link,
  Activity,
  Mountain,
  GraduationCap,
  MapPin,
  UtensilsCrossed,
  PenTool
} from 'lucide-react';

export default function App() {
  const [bootPhase, setBootPhase] = useState<'init' | 'compiling' | 'ready'>('init');
  const [activeSection, setActiveSection] = useState('chapter-00');
  
  // Custom Cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const bootTimer = setTimeout(() => setBootPhase('compiling'), 400);
    const readyTimer = setTimeout(() => setBootPhase('ready'), 2000);
    return () => { clearTimeout(bootTimer); clearTimeout(readyTimer); };
  }, []);

  // Global Scroll for Footer Inversion and Pipeline
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const footerBgColor = useTransform(scrollYProgress, [0.9, 0.95], ['#0a0a0a', '#ffffff']);
  const footerTextColor = useTransform(scrollYProgress, [0.9, 0.95], ['#ffffff', '#0a0a0a']);
  const footerBorderColor = useTransform(scrollYProgress, [0.9, 0.95], ['#333333', '#000000']);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <motion.div 
        ref={containerRef}
        style={{ backgroundColor: footerBgColor, color: footerTextColor }}
        className="min-h-screen font-sans overflow-x-hidden selection:bg-[#00ffcc] selection:text-black relative"
      >
        {/* CUSTOM CURSOR WITH EXCLUSION BLENDING */}
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-exclusion hidden md:flex items-center justify-center"
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
          variants={{ default: { scale: 1 }, hover: { scale: 3 }, click: { scale: 0.5 } }}
          animate={cursorVariant}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        />

        <AnimatePresence mode="wait">
          {bootPhase !== 'ready' ? (
            <BootSequence key="boot" />
          ) : (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full flex flex-col"
            >
              {/* SYSTEM NAV RENDERED AT Z-30 */}
              <NavigationPipeline 
                scrollYProgress={scrollYProgress} 
                activeSection={activeSection} 
                setCursorVariant={setCursorVariant} 
              />

              <div className="relative z-10">
                <HeroSection mouseX={mouseX} mouseY={mouseY} setCursorVariant={setCursorVariant} setActiveSection={setActiveSection} />
                <VentureAscent setCursorVariant={setCursorVariant} setActiveSection={setActiveSection} />
                <PlaybookSection setCursorVariant={setCursorVariant} setActiveSection={setActiveSection} />
                <EnduranceSection setActiveSection={setActiveSection} />
                <CapabilityArsenal setActiveSection={setActiveSection} />
                <FooterSection setCursorVariant={setCursorVariant} footerBorderColor={footerBorderColor} setActiveSection={setActiveSection} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ReactLenis>
  );
}

// ---------------------------------------------------------------------------------
// SYSTEM PIPELINE NAVIGATION
// ---------------------------------------------------------------------------------
function NavigationPipeline({ scrollYProgress, activeSection, setCursorVariant }: any) {
  const lenis = useLenis();
  const pipelineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navNodes = [
    { id: 'chapter-00', label: '00_INIT', y: '10%' },
    { id: 'chapter-01', label: '01_ASCENT', y: '26%' },
    { id: 'chapter-02', label: '02_FRAMEWORK', y: '42%' },
    { id: 'chapter-03', label: '03_ENDURANCE', y: '58%' },
    { id: 'chapter-04', label: '04_ARSENAL', y: '74%' },
    { id: 'chapter-05', label: '05_CONTACT', y: '90%' }
  ];

  const handleNavClick = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <div className="fixed top-0 left-2 md:left-8 w-16 h-full z-30 pointer-events-none group mix-blend-difference">
      {/* Continuous Glowing Line */}
      <svg className="absolute left-4 top-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
        <motion.path d="M10,0 L10,1000" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        <motion.path d="M10,0 L10,1000" stroke="#00ffcc" strokeWidth="2" fill="none" style={{ pathLength: pipelineProgress }} />
      </svg>

      {/* Nodes & Labels */}
      {navNodes.map((node) => {
        const isActive = activeSection === node.id;
        return (
          <div key={node.id} className="absolute left-3 md:left-4 flex items-center pointer-events-auto" style={{ top: node.y }}>
            <button
              onClick={() => handleNavClick(node.id)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="relative flex items-center group/node"
            >
              <motion.div 
                className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${isActive ? 'bg-[#00ffcc] border-[#00ffcc] shadow-[0_0_15px_#00ffcc]' : 'bg-[#0a0a0a] border-gray-600 group-hover/node:border-[#00ffcc]'}`}
                animate={{ scale: isActive ? 1.5 : 1 }}
              />
              <span className={`absolute left-8 font-mono text-[10px] tracking-widest whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-[#00ffcc]' : 'opacity-0 -translate-x-4 text-gray-500 group-hover/node:opacity-100 group-hover/node:translate-x-0'}`}>
                {node.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 00 // SYSTEM INITIALIZATION
// ---------------------------------------------------------------------------------
function BootSequence() {
  const logs = [
    "[INIT] Core Runtime: Iddi Rugero",
    "[INIT] Environmental Context: Loaded (5/5) [Kinyarwanda, Kiswahili, English, French, German]",
    "[INIT] Structural Logic Stacks: Active [Python, SQL, C#, Figma]",
    "[INIT] Kinetic Constraints: Registered [5 Volcanic Peaks // 2026 Endurance Telemetry]",
    "[INIT] Polymath Sub-Runtimes: Initializing [Off-Grid Torque // Flavor Balancing // Narrative Plotting]"
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center p-8 md:p-24"
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-[#00ffcc] text-xs md:text-sm space-y-3">
        {logs.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2, duration: 0.3 }}>
            {line}
          </motion.div>
        ))}
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ delay: logs.length * 0.2, duration: 0.8, repeat: Infinity }} className="w-3 h-4 bg-[#00ffcc] inline-block mt-4" />
      </div>
    </motion.div>
  );
}

function HeroSection({ mouseX, setCursorVariant, setActiveSection }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yScroll = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle 3D Depth Parallax based on mouse
  const bgX = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], ["-2%", "2%"]), { stiffness: 50, damping: 20 });

  return (
    <section 
      id="chapter-00" 
      ref={ref} 
      onMouseEnter={() => setActiveSection('chapter-00')}
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center py-24 md:py-32 pl-16 pr-4 md:pl-48"
    >
      {/* FLUID CANVAS MATRIX BACKGROUND */}
      <motion.div 
        style={{ y: yScroll, opacity, x: bgX, scale: 1.05 }} 
        className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none"
      >
        <img src="/hero_terrain.png" alt="Topographic Mountain Pipeline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-[#0a0a0a]/70 to-[#0a0a0a]" />
      </motion.div>
      
      <motion.div style={{ y: yScroll, opacity }} className="relative z-10 max-w-6xl mt-20 md:mt-0">
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white uppercase drop-shadow-2xl"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            IDDI RUGERO <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-blue-500">
              Systems & Operations
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
          className="mt-12 max-w-3xl border-l-4 border-[#00ffcc] pl-6 backdrop-blur-sm bg-black/40 py-6 pr-6 rounded-r-lg shadow-2xl"
        >
          <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed">
            From summiting all 5 of Rwanda’s volcanic peaks to engineering automated financial pipelines for nine-figure institutional portfolios. I build systems that scale, and I don't stop until the summit is reached.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 01 // THE ASCENT (Venture Accordion)
// ---------------------------------------------------------------------------------
function VentureAscent({ setCursorVariant, setActiveSection }: any) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const toggleAccordion = (index: number) => setActiveAccordion(activeAccordion === index ? null : index);

  const ventures = [
    {
      title: "PM ALPHA // Operations Analyst",
      meta: "Remote, London - UK | 2024 - Present",
      content: "Managing automated reporting frameworks for a nine-figure portfolio, processing daily NAV calculations, cross-border ETN settlements, and writing custom Python scripts to eliminate operational errors."
    },
    {
      title: "Wekraft Ltd // Co-founder & CFO",
      meta: "Kigali, Rwanda | 2023 - 2024",
      content: "Designing financial architecture from scratch, ensuring tax and regulatory compliance, corporate budgeting, and successfully raising $27,000 in seed capital."
    },
    {
      title: "Jasiri Talent Investor // Jasiri Fellow",
      meta: "Kigali, Rwanda | 2023 - 2024",
      content: "Rigorous entrepreneurial leadership, deep systems thinking, and conducting market due diligence to validate high-growth African venture models."
    },
    {
      title: "Arbour LTD // Systems & Automation",
      meta: "2018 - 2023",
      content: "Initializing pre-seed ventures, coding application modules in C# and Python, wireframing interfaces in Figma, and automating enterprise records via advanced macros."
    }
  ];

  return (
    <section 
      id="chapter-01" 
      onMouseEnter={() => setActiveSection('chapter-01')}
      className="relative w-full py-24 md:py-32 bg-[#0a0a0a] pl-16 pr-4 md:pl-48 overflow-hidden"
    >
      <div className="absolute right-0 top-1/4 w-1/2 h-[800px] opacity-20 mix-blend-screen pointer-events-none">
        <img src="/venture_blueprint.png" alt="Financial Blueprint" className="w-full h-full object-cover object-left" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <h2 className="text-sm font-bold mb-16 tracking-[0.3em] uppercase text-[#00ffcc]">
          Chapter 01 // The Ascent: Institutional Capital
        </h2>
        
        <div className="flex relative">
          {/* Timeline Axis with Pulsing Micro-Nodes */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800 ml-[11px]" />

          <motion.div layout className="flex flex-col w-full">
            <AnimatePresence>
              {ventures.map((exp, idx) => (
                <motion.div layout key={idx} className="relative group pl-10 border-b border-gray-800/50 last:border-0 py-8">
                  {/* Neon Teal Timeline Node */}
                  <motion.div 
                    layout
                    className={`absolute left-[7px] top-12 w-[9px] h-[9px] rounded-full transition-all duration-500 z-10
                      ${activeAccordion === idx 
                        ? 'bg-[#00ffcc] shadow-[0_0_15px_#00ffcc] scale-150' 
                        : 'bg-gray-700 group-hover:bg-[#00ffcc]/50 scale-100'}`} 
                  />

                  <motion.button
                    layout
                    onClick={() => toggleAccordion(idx)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="w-full flex items-center justify-between text-left transition-colors"
                  >
                    <div className="w-4/5">
                      <h4 className={`text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase transition-colors ${activeAccordion === idx ? 'text-[#00ffcc]' : 'text-white group-hover:text-gray-300'}`}>
                        {exp.title}
                      </h4>
                      <span className="text-xs md:text-sm mt-3 block font-mono text-gray-500 uppercase tracking-widest">{exp.meta}</span>
                    </div>
                    <motion.div animate={{ rotate: activeAccordion === idx ? 180 : 0 }} className={activeAccordion === idx ? "text-[#00ffcc]" : "text-gray-600"}>
                      <ChevronDown size={32} />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeAccordion === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }} className="overflow-hidden"
                      >
                        <div className="pt-6 pb-2 pr-8 md:w-3/4 text-lg md:text-xl text-gray-300 font-light leading-relaxed border-l-2 border-[#00ffcc]/30 pl-6 ml-2">
                          {exp.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 02 // THE PLAYBOOK (The Book Case)
// ---------------------------------------------------------------------------------
function PlaybookSection({ setCursorVariant, setActiveSection }: any) {
  const bookRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "center center"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <section 
      id="chapter-02" 
      ref={containerRef} 
      onMouseEnter={() => setActiveSection('chapter-02')}
      className="w-full py-24 md:py-32 bg-[#0a0a0a] pl-16 pr-4 md:pl-48"
    >
      <div className="w-full max-w-6xl relative z-10">
        <h2 className="text-sm font-bold mb-16 tracking-[0.3em] uppercase text-[#00ffcc]">
          Chapter 02 // The Framework: Distilling Strategy
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="p-8 border border-gray-800 bg-[#111] rounded-xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10"><PenTool size={100} /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 relative z-10">The Writing Parallel</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed relative z-10">
                Whether mapping a market gap in an African regulatory landscape or plotting narrative architecture for movie scripts, the core objective is identical: <strong className="text-white">establishing structural progression, eliminating fluff, and driving flawless execution.</strong>
              </p>
            </div>
          </div>

          <motion.div 
            ref={bookRef} onMouseMove={handleMouseMove} onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => { handleMouseLeave(); setCursorVariant('default'); }}
            style={{ perspective: 1000 }} className="w-full h-[500px] relative flex justify-center items-center"
          >
            <motion.div 
              style={{ rotateX, rotateY }}
              className="w-3/4 max-w-[350px] h-full relative border border-gray-700 rounded-lg overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-black group transition-shadow hover:shadow-[0_40px_80px_-20px_rgba(0,255,204,0.15)]"
            >
              <motion.div style={{ clipPath }} className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity">
                <img src="/book.jpg" alt="97 Business Ideas" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </motion.div>
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00ffcc] z-20 shadow-[2px_0_10px_rgba(0,255,204,0.3)]" />
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <p className="text-xs font-mono tracking-widest mb-1 text-[#00ffcc] uppercase">Second Edition</p>
                <h3 className="text-2xl font-black tracking-tighter text-white drop-shadow-lg leading-none mb-3">97 BUSINESS<br/>IDEAS</h3>
                <p className="text-xs text-gray-300 font-light">Operational playbook for African markets—built from the ground up.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 03 // STRESS-TESTING THE HARDWARE (Endurance)
// ---------------------------------------------------------------------------------
function EnduranceSection({ setActiveSection }: any) {
  const volcanoes = [
    { name: "Karisimbi", height: "4,507m", path: "M0,100 L50,10 L100,100" },
    { name: "Bisoke", height: "3,711m", path: "M0,100 L50,30 L100,100" },
    { name: "Muhabura", height: "4,127m", path: "M0,100 L50,20 L100,100" },
    { name: "Gahinga", height: "3,474m", path: "M0,100 L50,40 L100,100" },
    { name: "Sabyinyo", height: "3,669m", path: "M0,100 L50,35 L100,100" },
  ];

  return (
    <section 
      id="chapter-03" 
      onMouseEnter={() => setActiveSection('chapter-03')}
      className="w-full py-24 md:py-32 bg-[#0a0a0a] pl-16 pr-4 md:pl-48"
    >
      <div className="w-full max-w-6xl relative z-10 space-y-16">
        <div>
          <h2 className="text-sm font-bold mb-6 tracking-[0.3em] uppercase text-[#00ffcc]">
            Chapter 03 // Physical Control Environments
          </h2>
          <div className="border-l-4 border-gray-800 pl-6 mb-16 max-w-4xl bg-[#111]/50 p-6 rounded-r-xl">
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed">
              In high-end financial operations, you manipulate abstract digital parameters. Out on the terrain, there are no anomalies—there is only gravity, friction, and stamina. <strong className="text-white">Pushing boundaries in the wild is my physical control environment.</strong>
            </p>
          </div>
        </div>

        {/* 5 VOLCANOES ARRAY */}
        <div>
          <h3 className="text-xs font-bold mb-8 tracking-[0.2em] uppercase text-gray-500 flex items-center gap-3">
            <Mountain size={16} /> The Volcanic Vector Array
          </h3>
          <div className="flex flex-wrap justify-between gap-4 border border-gray-800 p-8 rounded-xl bg-[#0d0d0d] relative z-40 overflow-hidden shadow-2xl">
            {volcanoes.map((volcano, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 min-w-[90px] md:min-w-[120px] relative z-20 mb-8">
                <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-28 md:h-28 mb-4 overflow-visible">
                  <motion.path 
                    d={volcano.path} fill="none" stroke="#ffffff" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                  />
                  <motion.circle cx="50" cy="100" r="3" fill="#00ffcc" />
                </svg>
                <div className="bg-black/60 px-2 py-1 rounded backdrop-blur-sm shadow-xl text-center border border-gray-800">
                  <h4 className="text-sm md:text-lg font-black uppercase text-white tracking-widest">{volcano.name}</h4>
                  <p className="text-[#00ffcc] font-mono text-xs">{volcano.height}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MARATHON TELEMETRY FIX: SCALED PATHS TO PREVENT CLIPPING */}
          <div className="p-8 border border-gray-800 bg-[#0d0d0d] rounded-xl flex flex-col justify-between">
            <div className="mb-8">
              <h3 className="text-xs font-bold mb-4 tracking-[0.2em] uppercase text-gray-500 flex items-center gap-3"><Activity size={16} /> 2026 Marathon Telemetry</h3>
              <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Nyungwe & Kigali</h4>
              <p className="text-sm text-gray-400 font-mono">Volatile elevation vs. street-grid pacing.</p>
            </div>
            <div className="relative w-full h-48 mt-auto overflow-hidden rounded">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* TIGHTER Y-BOUNDS: between 40 and 160 safely */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#222" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#222" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#222" strokeDasharray="4 4" />
                
                <motion.path 
                  d="M0,90 Q50,70 100,100 T200,60 T300,140 T400,70 T500,40" fill="none" stroke="#00ffcc" strokeWidth="2.5"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
                />
                <motion.path 
                  d="M0,140 Q100,110 150,130 T300,120 T400,100 T500,110" fill="none" stroke="#3b82f6" strokeWidth="2.5"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
            </div>
          </div>

          {/* THE ENDURO MATRIX */}
          <div className="p-8 border border-gray-800 bg-[#0d0d0d] rounded-xl flex flex-col justify-between overflow-hidden relative group shadow-xl">
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700">
              <img src="/enduro_bike.png" alt="Enduro Trail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]/30" />
            </div>
            
            <div className="mb-8 relative z-10">
              <h3 className="text-xs font-bold mb-4 tracking-[0.2em] uppercase text-[#00ffcc] flex items-center gap-3"><MapPin size={16} /> The Enduro Matrix</h3>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2 drop-shadow-md">Off-Grid Navigation</h4>
              <p className="text-sm text-gray-200 leading-relaxed max-w-sm mt-4 bg-black/60 backdrop-blur-md p-4 rounded-md border border-gray-700 shadow-2xl">
                Long-range tours across rugged East African trails on a 200cc dual-sport enduro bike. Tracked via torque application, micro-route optimization, and pure kinetic endurance.
              </p>
            </div>

            <div className="flex gap-4 mt-8 relative z-10">
              <div className="bg-black/80 backdrop-blur-md border border-[#00ffcc]/50 px-4 py-2 rounded shadow-lg">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Engine</p>
                <p className="text-[#00ffcc] font-mono font-bold">200cc Dual-Sport</p>
              </div>
              <div className="bg-black/80 backdrop-blur-md border border-gray-600 px-4 py-2 rounded shadow-lg">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Terrain</p>
                <p className="text-white font-mono font-bold">East African Trails</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 04 // THE ARSENAL (Capability Bento)
// ---------------------------------------------------------------------------------
function CapabilityArsenal({ setActiveSection }: any) {
  return (
    <section 
      id="chapter-04" 
      onMouseEnter={() => setActiveSection('chapter-04')}
      className="w-full py-24 md:py-32 bg-[#0a0a0a] pl-16 pr-4 md:pl-48"
    >
      <div className="w-full max-w-6xl relative z-10">
        <h2 className="text-sm font-bold mb-16 tracking-[0.3em] uppercase text-[#00ffcc]">
          Chapter 04 // The Arsenal: Toolsets for Global Reach
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {/* Block A */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 p-8 border border-gray-800 bg-[#111] rounded-xl flex flex-col justify-center shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-lg"><GraduationCap size={24} className="text-blue-500" /></div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">Block A // Academic Logic</h3>
            </div>
            <div className="mb-8">
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-2">Master of Business Administration in Finance</h4>
              <p className="text-xs font-mono text-[#00ffcc] uppercase mb-3">University of Nairobi | GPA: 3.7/4.0</p>
              <p className="text-sm text-gray-400">Thesis: The Effect of Big Data Analytics on Credit Risk Assessment in Commercial Banks of Kenya.</p>
            </div>
            <div className="pt-8 border-t border-gray-800">
              <h4 className="text-xl md:text-2xl font-black tracking-tighter text-white mb-2">Bachelor of Business Information Systems</h4>
              <p className="text-xs font-mono text-[#00ffcc] uppercase mb-1">University of Nairobi | GPA: 3.9/4.0</p>
              <p className="text-sm text-gray-400">First Class Honours</p>
            </div>
          </motion.div>

          {/* Block B */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 border border-gray-800 bg-[#111] rounded-xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-4 mb-6"><div className="p-3 bg-purple-500/10 rounded-lg"><Code2 size={24} className="text-purple-500" /></div><h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">Block B // Matrix</h3></div>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Python", "SQL", "C#", "HTML", "Figma", "Adobe XD", "Illustrator", "Photoshop"].map(tech => (
                  <span key={tech} className="px-2 py-1 bg-[#1a1a1a] border border-gray-700 rounded font-mono text-[10px] text-gray-300 uppercase">{tech}</span>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-4">5-Language Network</h4>
              <ul className="space-y-2 font-mono text-xs text-gray-300">
                <li className="flex justify-between"><span>Kinyarwanda</span> <span className="text-[#00ffcc]">Native</span></li>
                <li className="flex justify-between"><span>Kiswahili</span> <span className="text-[#00ffcc]">Fluent</span></li>
                <li className="flex justify-between"><span>English</span> <span className="text-[#00ffcc]">Fluent</span></li>
                <li className="flex justify-between"><span>French</span> <span className="text-[#00ffcc]">Fluent</span></li>
                <li className="flex justify-between text-gray-500"><span>German</span> <span>Basic</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Block C */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} 
            className="md:col-span-3 p-8 border border-gray-800 bg-black rounded-xl flex flex-col md:flex-row gap-8 items-center overflow-hidden relative group min-h-[300px] shadow-2xl"
          >
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen group-hover:opacity-60 transition-opacity duration-700">
              <img src="/kitchen_chemistry.png" alt="Flavor Chemistry Optimization" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-[#0a0a0a]/50" />
            </div>

            <div className="flex-shrink-0 p-6 bg-black/60 backdrop-blur-md rounded-full border border-[#00ffcc]/30 relative z-10 shadow-[0_0_30px_rgba(0,255,204,0.1)]">
              <UtensilsCrossed size={40} className="text-[#00ffcc]" />
            </div>
            
            <div className="relative z-10 bg-black/60 backdrop-blur-md p-8 rounded-xl border border-gray-800 w-full shadow-2xl">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#00ffcc] mb-2">Block C // System Optimization in the Kitchen</h3>
              <h4 className="text-2xl md:text-3xl font-black uppercase text-white mb-4 tracking-tight">Flavor Chemistry Optimized</h4>
              <p className="text-gray-200 font-light leading-relaxed md:text-lg max-w-4xl">
                Applying precision to sensory architectures—mastering metric-driven spice profiles, complex umami enhancers, and temperature constraints for stews, pizza dough fermentations, and multi-layered lasagnas. Kitchen execution is flavor chemistry optimized.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// CHAPTER 05 // THE BLINDING INVERSION FOOTER
// ---------------------------------------------------------------------------------
function FooterSection({ setCursorVariant, footerBorderColor, setActiveSection }: any) {
  return (
    <motion.footer 
      id="chapter-05" 
      onMouseEnter={() => setActiveSection('chapter-05')}
      style={{ borderColor: footerBorderColor }}
      className="w-full relative z-10 py-48 border-t transition-colors duration-500 pl-16 pr-4 md:pl-48 bg-transparent"
    >
      <div className="max-w-6xl w-full flex flex-col relative z-20">
        <p className="font-mono text-sm uppercase tracking-widest mb-4">Chapter 05 // System_Status: Ready</p>
        <motion.h2 
          className="text-6xl md:text-[8rem] font-black tracking-tighter mb-16 uppercase leading-[0.8]"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          INITIATE <br/> CONTACT
        </motion.h2>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl">
          <a 
            href="mailto:iddirugero@gmail.com"
            onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
            className="flex-1 flex items-center justify-center gap-3 h-24 bg-current text-white dark:text-black hover:opacity-80 transition-opacity font-black text-xl rounded-none shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <Mail size={28} />
            iddirugero@gmail.com
          </a>
          <a 
            href="https://linkedin.com/in/iddi-r-48a420142" target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
            className="flex-1 flex items-center justify-center gap-3 h-24 border-4 border-current hover:bg-current hover:text-white dark:hover:text-black transition-colors font-black text-xl rounded-none shadow-xl"
          >
            <Link size={28} />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import { 
  ChevronDown, 
  BookOpen, 
  Code2, 
  Globe2, 
  Mail, 
  Link,
  Activity,
  Mountain
} from 'lucide-react';

export default function App() {
  const [bootPhase, setBootPhase] = useState<'init' | 'compiling' | 'ready'>('init');
  
  // Custom Cursor state
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
    const bootTimer = setTimeout(() => setBootPhase('compiling'), 300);
    const readyTimer = setTimeout(() => setBootPhase('ready'), 1500);
    return () => { clearTimeout(bootTimer); clearTimeout(readyTimer); };
  }, []);

  // Scroll Progress for Footer Inversion
  const { scrollYProgress } = useScroll();
  const footerBgColor = useTransform(scrollYProgress, [0.85, 0.95], ['#0a0a0a', '#ffffff']);
  const footerTextColor = useTransform(scrollYProgress, [0.85, 0.95], ['#ffffff', '#0a0a0a']);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <motion.div 
        style={{ backgroundColor: footerBgColor, color: footerTextColor }}
        className="min-h-screen font-sans overflow-x-hidden selection:bg-[#00ffcc] selection:text-black relative"
      >
        {/* CUSTOM CURSOR */}
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          variants={{
            default: { scale: 1 },
            hover: { scale: 3 },
          }}
          animate={cursorVariant}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        />

        <AnimatePresence>
          {bootPhase !== 'ready' ? (
            <BootSequence key="boot" />
          ) : (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <HeroParallax setCursorVariant={setCursorVariant} />
              <VentureParallax setCursorVariant={setCursorVariant} />
              <TerrainAndBook setCursorVariant={setCursorVariant} />
              <CapabilityBento setCursorVariant={setCursorVariant} />
              <FooterSection setCursorVariant={setCursorVariant} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ReactLenis>
  );
}

// ---------------------------------------------------------------------------------
// 1. BOOT SEQUENCE
// ---------------------------------------------------------------------------------
function BootSequence() {
  const lines = [
    "[INIT] Core Runtime: Iddi Rugero",
    "[INIT] Polyglot Localization Layer: Loaded (5/5) [Kinyarwanda, Kiswahili, English, French, German]",
    "[INIT] Pipeline Architect: Active [Python, SQL, C#, Automated Frameworks]",
    "[INIT] Terrain Constraints: Verified [5 Volcanic Peaks // 2026 Endurance Matrix]",
    "Executing UI Thread..."
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-start p-8 md:p-24"
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-[#00ffcc] text-xs md:text-sm space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------------
// 2. HERO PARALLAX SECTION (Cinematic Volcanoes)
// ---------------------------------------------------------------------------------
function HeroParallax({ setCursorVariant }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative w-full h-[150vh] bg-black"
    >
      {/* Sticky Container for the Image & Title */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y, scale }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
          <img 
            src="/volcano.png" 
            alt="Rwandan Volcanic Peaks" 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none mt-24"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 
              className="text-6xl md:text-8xl lg:text-[12rem] font-black tracking-tighter leading-[0.8] mb-8 text-white drop-shadow-2xl mix-blend-screen"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              IDDI <br /> RUGERO
            </h1>
            <div className="max-w-2xl text-lg md:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-md">
              <span className="font-bold text-[#00ffcc]">SYSTEMS & OPERATIONS.</span><br/>
              I engineer automated data pipelines, manage cross-border financial operations, and design scalable business frameworks.<br/><br/>
              <span className="italic flex items-center gap-2 text-white">
                <Mountain size={20} className="text-[#00ffcc]" />
                Conquered all 5 Volcanoes of Rwanda. Endurance Hiker.
              </span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#00ffcc]"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll Sequence</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#00ffcc] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 3. VENTURE PARALLAX (Data Pipeline Background)
// ---------------------------------------------------------------------------------
function VentureParallax({ setCursorVariant }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const toggleAccordion = (index: number) => setActiveAccordion(activeAccordion === index ? null : index);

  const experiences = [
    {
      title: "PM ALPHA // Operations Analyst",
      meta: "Remote, London - UK | 2024 - Present",
      content: "Managing a 9-figure portfolio automated pipeline, processing daily NAV calculations, cross-border ETN asset settlements, and debugging customized Python scripts to wipe out manual operational errors."
    },
    {
      title: "Wekraft Ltd // Co-founder & CFO",
      meta: "Kigali, Rwanda | 2023 - 2024",
      content: "Constructing corporate financial infrastructure, managing tax compliance, budgeting, and raising $27,000 in seed capital."
    },
    {
      title: "Jasiri Talent Investor Program // Jasiri Fellow",
      meta: "Kigali, Rwanda | 2023 - 2024",
      content: "Focus on rigorous entrepreneurial leadership, systems thinking, and structural market due diligence."
    },
    {
      title: "Arbour LTD & Green Harvest // Full-Stack & Automation",
      meta: "2018 - 2023",
      content: "Systems engineering using C# and Python, wireframing in Figma, and constructing macro-automation tools using custom VBA code."
    }
  ];

  return (
    <section ref={ref} className="relative w-full py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Background Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%] opacity-20 pointer-events-none">
        <img src="/data.png" alt="Data Pipeline" className="w-full h-full object-cover mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h3 className="text-sm font-bold mb-12 tracking-[0.2em] uppercase text-gray-400">Venture Architecture</h3>
        <motion.div layout className="flex flex-col border-t border-gray-800">
          <AnimatePresence>
            {experiences.map((exp, idx) => (
              <motion.div layout key={idx} className="border-b border-gray-800 overflow-hidden">
                <motion.button
                  layout
                  onClick={() => toggleAccordion(idx)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-full flex items-center justify-between py-10 text-left hover:text-[#00ffcc] transition-colors group"
                >
                  <div>
                    <h4 className="text-2xl md:text-5xl font-black tracking-tighter uppercase">{exp.title}</h4>
                    <span className="text-sm mt-3 block font-mono text-gray-400 group-hover:text-gray-300 transition-colors">{exp.meta}</span>
                  </div>
                  <motion.div animate={{ rotate: activeAccordion === idx ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                    <ChevronDown size={36} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-4 pr-8 md:w-3/4 text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
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
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 4. BOOK CASE & TELEMETRY (Image Masking Reveal)
// ---------------------------------------------------------------------------------
function TerrainAndBook({ setCursorVariant }: any) {
  // 3D Tilt for Book Case
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

  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  // Scroll Reveal for Book Image Mask
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "center center"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 space-y-32 relative z-10 bg-[#0a0a0a]">
      
      {/* THE BOOK CASE - HIGH END REVEAL */}
      <motion.div 
        ref={bookRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorVariant('hover')}
        style={{ perspective: 1000 }}
        className="w-full relative"
      >
        <motion.div 
          style={{ rotateX, rotateY }}
          className="w-full relative min-h-[400px] border border-gray-800 rounded-xl flex flex-col md:flex-row justify-between items-center overflow-hidden shadow-2xl bg-black"
        >
          {/* Masked Image Reveal */}
          <motion.div style={{ clipPath }} className="absolute inset-0 w-full h-full opacity-40">
            <img src="/book.png" alt="97 Business Ideas" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </motion.div>

          <div className="absolute top-0 left-0 w-2 h-full bg-[#00ffcc] z-20"></div>
          
          <div className="max-w-2xl z-20 p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4 text-[#00ffcc]">
              <BookOpen size={24} />
              <span className="text-sm font-bold tracking-widest uppercase">Publication</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-white drop-shadow-lg">97 Business Ideas</h3>
            <p className="text-sm font-medium tracking-widest mb-6 text-gray-400 uppercase">Second Edition</p>
            <p className="leading-relaxed text-gray-200 text-xl font-light drop-shadow-md">
              A structured analytical volume detailing validation methodologies and regional scale strategy for emerging market ventures. 
              Focuses on actionable systemic frameworks over theoretical business concepts.
            </p>
          </div>
          
          <div className="flex-shrink-0 z-20 hidden md:block p-16">
            <div className="w-48 h-64 border border-white/20 bg-black/50 backdrop-blur-md text-white flex items-center justify-center text-center p-6 font-black tracking-tighter text-3xl shadow-[0_0_50px_rgba(0,255,204,0.1)]">
              97<br/>BUSINESS<br/>IDEAS
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MARATHON TELEMETRY OVERHAUL */}
      <div>
        <h3 className="text-sm font-bold mb-12 tracking-[0.2em] uppercase text-gray-500 flex items-center gap-3">
          <Activity size={20} /> Terrain Telemetry Log
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* NYUNGWE MARATHON */}
          <div className="p-8 border border-gray-800 bg-[#0d0d0d] relative overflow-hidden group">
            <div className="mb-8">
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">Nyungwe Marathon 2026</h4>
              <p className="text-sm text-gray-500 font-mono mt-2 flex items-center gap-2">
                <Mountain size={14} className="text-[#00ffcc]"/> Altitude Profile: 1,600m - 2,500m
              </p>
            </div>
            <div className="relative w-full h-48 md:h-64">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Grid */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#222" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#222" strokeDasharray="4 4" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="#222" strokeDasharray="4 4" />
                
                {/* Telemetry Path */}
                <motion.path 
                  d="M0,80 Q50,70 100,90 T200,40 T300,160 T400,60 T500,20" 
                  fill="none" 
                  stroke="#00ffcc" 
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* Interactive Node */}
                <motion.circle 
                  cx="300" cy="160" r="8" fill="#00ffcc"
                  onMouseEnter={() => { setActiveHoverNode('nyungwe'); setCursorVariant('hover'); }}
                  onMouseLeave={() => { setActiveHoverNode(null); setCursorVariant('default'); }}
                  whileHover={{ scale: 2 }}
                  className="cursor-pointer"
                />
              </svg>
              <AnimatePresence>
                {activeHoverNode === 'nyungwe' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#00ffcc] p-4 font-mono text-xs text-[#00ffcc] backdrop-blur-md pointer-events-none shadow-[0_0_30px_rgba(0,255,204,0.2)]"
                  >
                    [KM 21 SPLIT // ALTITUDE: 2,150M // ENVIRONMENT: HIGH RAINFOREST CANOPY]
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* KIGALI PEACE MARATHON */}
          <div className="p-8 border border-gray-800 bg-[#0d0d0d] relative overflow-hidden group">
            <div className="mb-8">
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">Kigali Peace Marathon 2026</h4>
              <p className="text-sm text-gray-500 font-mono mt-2">Pace vs. Rolling Topography</p>
            </div>
            <div className="relative w-full h-48 md:h-64">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Grid */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#222" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#222" strokeDasharray="4 4" />
                
                {/* Elevation Path */}
                <motion.path 
                  d="M0,150 Q100,100 150,130 T300,80 T400,120 T500,60" 
                  fill="none" 
                  stroke="#4b5563" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Pace Distribution Path */}
                <motion.path 
                  d="M0,100 Q100,140 150,110 T300,150 T400,90 T500,110" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Interactive Node */}
                <motion.circle 
                  cx="300" cy="80" r="8" fill="#3b82f6"
                  onMouseEnter={() => { setActiveHoverNode('kigali'); setCursorVariant('hover'); }}
                  onMouseLeave={() => { setActiveHoverNode(null); setCursorVariant('default'); }}
                  whileHover={{ scale: 2 }}
                  className="cursor-pointer"
                />
              </svg>
              <AnimatePresence>
                {activeHoverNode === 'kigali' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#3b82f6] p-4 font-mono text-xs text-[#3b82f6] backdrop-blur-md pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                  >
                    [KM 30 // INCLINE: 6% // PACE DELTA: +0:15/KM]
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 5. CAPABILITY BENTO
// ---------------------------------------------------------------------------------
function CapabilityBento({ setCursorVariant }: any) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 bg-[#0a0a0a]">
      <h3 className="text-sm font-bold mb-12 tracking-[0.2em] uppercase text-gray-500">Capability Matrix</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
        
        {/* HUGE STAT BOX */}
        <motion.div 
          className="md:col-span-2 md:row-span-2 p-8 border border-[#00ffcc]/30 bg-[#00ffcc]/5 flex flex-col items-center justify-center relative overflow-hidden group shadow-[inset_0_0_100px_rgba(0,255,204,0.05)]"
          whileHover={{ scale: 0.98 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="absolute inset-0 bg-[#00ffcc]/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
          <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-center z-10 text-[#00ffcc] uppercase leading-[0.85]">
            9-Figure<br/>Portfolio<br/>Automated
          </h3>
        </motion.div>

        {/* MBA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <BookOpen size={40} className="text-blue-500" />
          <div>
            <h4 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter text-white">MBA in Finance & BBIS</h4>
            <p className="text-sm font-mono text-gray-500 uppercase">University of Nairobi</p>
          </div>
        </motion.div>

        {/* TECH STACK */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <Code2 size={32} className="text-gray-400 mb-4" />
          <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Stack</h4>
          <ul className="space-y-3 font-mono text-sm md:text-base text-gray-300">
            <li>React / TS</li>
            <li>Python</li>
            <li>C#</li>
            <li>SQL</li>
            <li>Figma</li>
          </ul>
        </motion.div>

        {/* LANGUAGES */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <Globe2 size={32} className="text-gray-400 mb-4" />
          <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Polyglot</h4>
          <ul className="space-y-2 font-mono text-xs md:text-sm text-gray-300">
            <li className="flex justify-between border-b border-gray-800 pb-2"><span>Kinyarwanda</span> <span className="text-[#00ffcc]">C2</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-2"><span>French</span> <span className="text-[#00ffcc]">C2</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-2"><span>Kiswahili</span> <span className="text-[#00ffcc]">B2</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-2"><span>English</span> <span className="text-[#00ffcc]">C1</span></li>
            <li className="flex justify-between"><span>German</span> <span className="text-[#00ffcc]">A2</span></li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 6. CANVAS INVERSION FOOTER
// ---------------------------------------------------------------------------------
function FooterSection({ setCursorVariant }: any) {
  return (
    <footer id="contact-footer" className="w-full relative z-10 py-64 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.h2 
          className="text-6xl md:text-[8rem] font-black tracking-tighter mb-16 uppercase leading-[0.8]"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Initiate<br/>Contact
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a 
            href="mailto:iddirugero@gmail.com"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center justify-center gap-3 px-12 h-20 bg-black text-white hover:bg-gray-800 transition-colors font-bold min-w-[250px] text-xl rounded-none border border-black shadow-xl"
          >
            <Mail size={28} />
            iddirugero@gmail.com
          </a>
          <a 
            href="https://linkedin.com/in/iddi-r-48a420142"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center justify-center gap-3 px-12 h-20 border-4 border-black text-black hover:bg-gray-100 transition-colors font-bold min-w-[250px] text-xl rounded-none shadow-xl"
          >
            <Link size={28} />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </footer>
  );
}

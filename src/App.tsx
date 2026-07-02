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
  Activity
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
    // Simulate terminal boot sequence
    const bootTimer = setTimeout(() => setBootPhase('compiling'), 300);
    const readyTimer = setTimeout(() => setBootPhase('ready'), 1500);
    return () => { clearTimeout(bootTimer); clearTimeout(readyTimer); };
  }, []);

  // Footer Inversion Scroll
  const { scrollYProgress } = useScroll();
  // We want to flip colors at the very end of the scroll (e.g., last 10%)
  const footerBgColor = useTransform(scrollYProgress, [0.85, 0.95], ['#0a0a0a', '#ffffff']);
  const footerTextColor = useTransform(scrollYProgress, [0.85, 0.95], ['#ffffff', '#0a0a0a']);

  return (
    <ReactLenis root>
      <motion.div 
        style={{ backgroundColor: footerBgColor, color: footerTextColor }}
        className="min-h-screen font-sans overflow-x-hidden selection:bg-[#00ffcc] selection:text-black relative"
      >
        {/* CUSTOM CURSOR */}
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block flex items-center justify-center"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          variants={{
            default: { scale: 1 },
            hover: { scale: 3 },
            text: { scale: 0.5 },
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
              <HeroSection setCursorVariant={setCursorVariant} />
              <VentureGrid setCursorVariant={setCursorVariant} />
              <BookAndTelemetry setCursorVariant={setCursorVariant} />
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
// 2. HERO SECTION
// ---------------------------------------------------------------------------------
function HeroSection({ setCursorVariant }: any) {
  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setCursorVariant('default')}
    >
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* 3D Focal Asset Placeholder / Abstract Particle Node */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-gray-800/50"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-[#00ffcc]/10 blur-[1px] transform rotate-45"></div>
        <div className="absolute inset-4 rounded-full border border-blue-500/10 blur-[2px] transform -rotate-12"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8 mix-blend-difference"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          IDDI <br /> RUGERO <span className="text-[#00ffcc] text-4xl md:text-6xl">//</span>
        </motion.h1>
        <motion.p 
          className="max-w-2xl text-lg md:text-xl text-gray-300 font-light leading-relaxed mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="font-semibold text-white">SYSTEMS & OPERATIONS.</span> I engineer automated data pipelines, manage cross-border financial operations, and design scalable business frameworks. Off-screen, I test my own constraints against the elements.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 3. VENTURE ACCORDION
// ---------------------------------------------------------------------------------
function VentureGrid({ setCursorVariant }: any) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <h3 className="text-sm font-bold mb-12 tracking-[0.2em] uppercase text-gray-500">Venture Architecture</h3>
      <motion.div layout className="flex flex-col border-t border-gray-800">
        <AnimatePresence>
          {experiences.map((exp, idx) => (
            <motion.div 
              layout
              key={idx} 
              className="border-b border-gray-800 overflow-hidden"
            >
              <motion.button
                layout
                onClick={() => toggleAccordion(idx)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full flex items-center justify-between py-8 text-left hover:text-[#00ffcc] transition-colors"
              >
                <div>
                  <h4 className="text-xl md:text-3xl font-medium tracking-tight">{exp.title}</h4>
                  <span className="text-sm mt-2 block font-mono text-gray-500">{exp.meta}</span>
                </div>
                <motion.div 
                  animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <ChevronDown size={28} />
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
                    <div className="pb-8 pt-2 pr-8 md:w-2/3 text-lg text-gray-300 font-light leading-relaxed">
                      {exp.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// 4. BOOK CASE & TELEMETRY
// ---------------------------------------------------------------------------------
function BookAndTelemetry({ setCursorVariant }: any) {
  // 3D Tilt for Book Case
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
      {/* THE BOOK CASE */}
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorVariant('hover')}
        style={{ perspective: 1000 }}
        className="w-full relative"
      >
        <motion.div 
          style={{ rotateX, rotateY }}
          className="w-full relative p-8 md:p-16 border border-gray-800 bg-[#0a0a0a] rounded-xl flex flex-col md:flex-row justify-between items-center gap-12 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00ffcc]"></div>
          <div className="max-w-2xl z-10">
            <div className="flex items-center gap-3 mb-4 text-[#00ffcc]">
              <BookOpen size={24} />
              <span className="text-sm font-bold tracking-widest uppercase">Publication</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">97 Business Ideas</h3>
            <p className="text-sm font-medium tracking-widest mb-6 text-gray-500 uppercase">Second Edition</p>
            <p className="leading-relaxed text-gray-300 text-lg">
              A structured analytical volume detailing validation methodologies and regional scale strategy for emerging market ventures. 
              Focuses on actionable systemic frameworks over theoretical business concepts.
            </p>
          </div>
          <div className="flex-shrink-0 z-10">
            <div className="w-48 h-64 bg-white text-black flex items-center justify-center text-center p-6 font-black tracking-tighter text-3xl shadow-2xl">
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
          <div className="p-8 border border-gray-800 bg-[#0a0a0a] relative overflow-hidden group">
            <div className="mb-8">
              <h4 className="text-xl font-medium uppercase tracking-tight">Nyungwe Marathon 2026</h4>
              <p className="text-sm text-gray-500 font-mono mt-2">Altitude Profile: 1,600m - 2,500m</p>
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
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Interactive Node */}
                <motion.circle 
                  cx="300" cy="160" r="6" fill="#00ffcc"
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
                    className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#00ffcc] p-4 font-mono text-xs text-[#00ffcc] backdrop-blur-sm pointer-events-none"
                  >
                    [KM 21 SPLIT // ALTITUDE: 2,150M // ENVIRONMENT: HIGH RAINFOREST CANOPY]
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* KIGALI PEACE MARATHON */}
          <div className="p-8 border border-gray-800 bg-[#0a0a0a] relative overflow-hidden group">
            <div className="mb-8">
              <h4 className="text-xl font-medium uppercase tracking-tight">Kigali Peace Marathon 2026</h4>
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
                  viewport={{ once: true }}
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
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Interactive Node */}
                <motion.circle 
                  cx="300" cy="80" r="6" fill="#3b82f6"
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
                    className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#3b82f6] p-4 font-mono text-xs text-[#3b82f6] backdrop-blur-sm pointer-events-none"
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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <h3 className="text-sm font-bold mb-12 tracking-[0.2em] uppercase text-gray-500">Capability Matrix</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        
        {/* HUGE STAT BOX */}
        <motion.div 
          className="md:col-span-2 md:row-span-2 p-8 border border-[#00ffcc]/30 bg-[#00ffcc]/5 flex flex-col items-center justify-center relative overflow-hidden group"
          whileHover={{ scale: 0.98 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="absolute inset-0 bg-[#00ffcc]/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-center z-10 text-[#00ffcc] uppercase leading-[0.9]">
            9-Figure<br/>Portfolio<br/>Automated
          </h3>
        </motion.div>

        {/* MBA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <BookOpen size={32} className="text-blue-500" />
          <div>
            <h4 className="text-3xl font-bold mb-2">MBA in Finance & BBIS</h4>
            <p className="text-sm font-mono text-gray-500 uppercase">University of Nairobi</p>
          </div>
        </motion.div>

        {/* TECH STACK */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <Code2 size={24} className="text-gray-400 mb-4" />
          <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Stack</h4>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li>React / TS</li>
            <li>Python</li>
            <li>C#</li>
            <li>SQL</li>
            <li>Figma</li>
          </ul>
        </motion.div>

        {/* LANGUAGES */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-8 border border-gray-800 bg-[#111] flex flex-col justify-between"
        >
          <Globe2 size={24} className="text-gray-400 mb-4" />
          <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Polyglot</h4>
          <ul className="space-y-1 font-mono text-xs text-gray-300">
            <li className="flex justify-between border-b border-gray-800 pb-1"><span>Kinyarwanda</span> <span className="text-[#00ffcc]">C2</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-1"><span>Kiswahili</span> <span className="text-[#00ffcc]">C1</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-1"><span>English</span> <span className="text-[#00ffcc]">C1</span></li>
            <li className="flex justify-between border-b border-gray-800 pb-1"><span>French</span> <span className="text-[#00ffcc]">B2</span></li>
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
    <footer id="contact-footer" className="w-full relative z-10 py-48 mt-32 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.h2 
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 uppercase"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Initiate Contact
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a 
            href="mailto:iddirugero@gmail.com"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center justify-center gap-3 px-8 h-16 bg-black text-white hover:bg-gray-800 transition-colors font-medium min-w-[200px] text-lg rounded-none border border-black"
          >
            <Mail size={24} />
            iddirugero@gmail.com
          </a>
          <a 
            href="https://linkedin.com/in/iddi-r-48a420142"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center justify-center gap-3 px-8 h-16 border-2 border-black text-black hover:bg-gray-100 transition-colors font-medium min-w-[200px] text-lg rounded-none"
          >
            <Link size={24} />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </footer>
  );
}

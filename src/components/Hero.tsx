import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-topo bg-topo-parallax"
      style={{
        backgroundPosition: isMobile ? '0px 0px' : `${mousePos.x}px ${mousePos.y}px`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none" />
      
      {/* System Status Indicator */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-flash-green shadow-[0_0_8px_#00ffcc]" />
        <span className="font-mono text-[10px] text-[#00ffcc] tracking-widest uppercase">SYS.STAT: ONLINE // KGL.RW</span>
      </div>

      {/* Karisimbi Elevation Profile */}
      <svg className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 pointer-events-none opacity-[0.03] stroke-[#00ffcc] fill-none" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path d="M0,200 L100,180 L200,100 L300,50 L400,20 L500,10 L550,0 L600,30 L700,80 L800,150 L1000,200" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center lg:items-start w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-2xl glitch-hover text-center lg:text-left"
          >
            IDDI<br/>RUGERO
          </motion.h1>
          
          <div className="h-8 mb-8 text-lg md:text-xl text-[#00ffcc] font-mono tracking-widest uppercase flex items-center max-w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "linear", delay: 0.5 }}
              className="overflow-hidden whitespace-nowrap flex items-center max-w-full"
            >
              <span>ARCHITECTURE // OPERATIONS // FINANCIAL TELEMETRY</span>
              <motion.span 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="inline-block w-3 h-5 bg-[#00ffcc] ml-2 shrink-0"
              />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-mono text-sm uppercase tracking-wide scanline-hover p-4 border-l-2 border-[#00ffcc]/30 bg-black/40 text-left"
          >
            I build the infrastructure that makes complex money move flawlessly. Specializing in cross-border trade settlement, high-stakes NAV calculations, and zero-latency reporting pipelines engineered in Python. I have also summited all five of Rwanda's volcanic peaks // because I do not terminate processes before the reconciliation is absolute.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <motion.a 
              href="mailto:iddirugero@gmail.com"
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-8 py-5 bg-black text-[#00ffcc] font-mono font-bold uppercase tracking-widest text-sm border border-[#00ffcc] transition-all hover:bg-[#00ffcc]/10 animate-pulse-green glitch-hover group"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity mr-3">&gt;</span> EMAIL
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

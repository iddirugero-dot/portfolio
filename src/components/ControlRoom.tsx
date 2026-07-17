import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ControlCard = ({ title, content, delayClass, flickerDelay }: { title: string, content: string, delayClass: string, flickerDelay: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const bgShiftX = useTransform(mouseXSpring, [-0.5, 0.5], ["10%", "-10%"]);
  const bgShiftY = useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "-10%"]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full h-[400px] rounded-xl bg-gradient-to-br from-[#111]/90 to-[#000]/90 border border-white/10 p-8 flex flex-col cursor-crosshair overflow-hidden group/card ${delayClass}`}
    >
      {/* Interactive interior grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTAgMjBMIDIwIDIwTTAgMEwyMCAwTTAgMEwwIDIwTTIwIDBMMjAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')] bg-repeat"
        style={isMobile ? {} : { x: bgShiftX, y: bgShiftY }}
      />

      {/* Screen Flicker Overlay */}
      <div className={`absolute inset-0 pointer-events-none bg-black mix-blend-overlay ${flickerDelay}`} />
      
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00ffcc]/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none group-hover/card:opacity-100" 
        style={{ transform: "translateZ(1px)" }}
      />
      
      <div style={{ transform: "translateZ(30px)" }} className="flex-1 relative z-10">
        <div className="w-12 h-1 bg-[#00ffcc] mb-8 transition-all duration-300 group-hover/card:w-full" />
        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h4>
        <p className="text-gray-400 leading-relaxed text-sm font-mono tracking-wide">{content}</p>
      </div>

      <div style={{ transform: "translateZ(20px)" }} className="mt-auto font-mono text-xs uppercase tracking-widest flex justify-between relative z-10">
        <span className="text-white/30 group-hover/card:hidden">SYS.STAT.ONLINE</span>
        <span className="text-[#00ffcc] hidden group-hover/card:inline-block">[ EXECUTE_QUERY ]</span>
        <span className="text-[#00ffcc] opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center">
          ACCESS GRANTED <span className="inline-block w-2 h-3 bg-[#00ffcc] ml-1 animate-[terminal_1s_step-end_2]" />
        </span>
      </div>

      {/* Data Stream Flow */}
      <div className="absolute bottom-2 left-6 right-6 h-[1px] bg-white/5 overflow-hidden">
        <div className="w-[20%] h-full bg-[#00ffcc] opacity-50 animate-[stream_3s_linear_infinite]" style={{ animationDelay: '0s' }} />
        <div className="w-[10%] h-full bg-[#00ffcc] opacity-30 animate-[stream_2s_linear_infinite]" style={{ animationDelay: '1s' }} />
      </div>

      <style>{`
        @keyframes stream {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        @keyframes terminal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes monitor-flicker {
          0%, 98%, 100% { opacity: 0; }
          99% { opacity: 0.2; }
        }
        .flicker-1 { animation: monitor-flicker 8s infinite; }
        .flicker-2 { animation: monitor-flicker 9s infinite 2s; }
        .flicker-3 { animation: monitor-flicker 10s infinite 5s; }
      `}</style>
    </motion.div>
  );
};

export default function ControlRoom() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-24 text-center md:text-left">
        <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest uppercase mb-4">Chapter 03 / The Control Room</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Reporting and Systems</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        <ControlCard 
          title="NAV and Settlement Reporting" 
          content="Algorithmic daily NAV calculation and trade settlement architecture. Built automated data feeds and error-checking logic to generate executive-ready telemetry for institutional stakeholders." 
          delayClass="animate-sine-float-1"
          flickerDelay="flicker-1"
        />
        <ControlCard 
          title="Operational Automation" 
          content="Custom Python and SQL pipelines engineered to automate cross-border settlement. Eradicated manual entry, driving data integrity to 100% across daily financial operations." 
          delayClass="animate-sine-float-2"
          flickerDelay="flicker-2"
        />
        <ControlCard 
          title="Financial Modeling" 
          content="Seed-stage financial matrices built from scratch. Integrated three-year projections, tax compliance logic, and investor-ready capitalization table formatting." 
          delayClass="animate-sine-float-3"
          flickerDelay="flicker-3"
        />
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const NumberCounter = ({ to, prefix = '', suffix = '' }: { to: number, prefix?: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const increment = to / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, to]);

  return <span className="font-mono text-[#00ffcc] font-bold" ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const RoleCard = ({ title, role, location, dates, progress, bullets, index, styleType, nodeLabel }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div className="sticky top-[10vh] min-h-[60vh] flex items-center justify-center w-full mb-[20vh] group/timeline" style={{ zIndex: index }}>
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 0.6 }}
        className={`p-8 md:p-12 max-w-3xl w-full relative transition-all duration-300 ${
          styleType === 'active' ? 'bg-[#111111] border border-[#00ffcc]/30 shadow-[0_0_30px_rgba(0,255,204,0.05)]' :
          styleType === 'construction' ? 'bg-[#0a0a0a] border border-dashed border-gray-600 hover:border-solid hover:border-gray-400' :
          styleType === 'technical' ? 'bg-[#111111] border border-white/10' :
          'bg-[#080808] border border-white/5'
        }`}
      >
        {/* Technical Circuit Pattern */}
        {styleType === 'technical' && (
          <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTIwLDBMMjAsNDBNMCwyMEw0MCwyME0xMCwxMEwxMCwzME0zMCwxMEwzMCwzMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] pointer-events-none" />
        )}

        {/* Node Hover Label */}
        <div className="absolute -left-[140px] top-1/2 -translate-y-1/2 opacity-0 group-hover/timeline:opacity-100 transition-opacity font-mono text-[#00ffcc] text-xs tracking-widest uppercase">
          {nodeLabel}
        </div>

        {/* Shockwave Marker */}
        <div className="absolute -left-[41px] top-1/2 w-4 h-4 rounded-full bg-[#00ffcc] shadow-[0_0_15px_#00ffcc] z-20">
          {isInView && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#00ffcc]"
            />
          )}
        </div>
        
        {/* Active Breathing Dot */}
        {styleType === 'active' && (
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#00ffcc] tracking-widest uppercase">Live System</span>
            <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-[breathe_2s_infinite]" />
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 relative z-10">
          <div>
            <h3 className={`font-bold tracking-tight mb-2 ${styleType === 'muted' ? 'text-2xl text-gray-300' : 'text-3xl text-white'}`}>
              {title}
            </h3>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest scanline-hover inline-block">{role} // {location}</p>
          </div>
          <div className="text-[#00ffcc] font-mono text-sm mt-4 md:mt-0 glitch-hover">{dates}</div>
        </div>

        {/* Tenure Progress Bar */}
        <div className="w-full h-1 bg-white/10 mb-8 relative z-10 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full ${styleType === 'active' ? 'bg-[#00ffcc]' : 'bg-gray-500'}`}
          />
        </div>
        
        <ul className="space-y-4 relative z-10">
          {bullets.map((b: any, i: number) => (
            <li key={i} className="text-gray-300 leading-relaxed flex items-start font-mono text-sm uppercase tracking-wide">
              <span className="text-[#00ffcc] mr-4 mt-1">&gt;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <style>{`
          @keyframes breathe {
            0%, 100% { opacity: 0.4; box-shadow: 0 0 0px #00ffcc; }
            50% { opacity: 1; box-shadow: 0 0 10px #00ffcc; }
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default function WorkTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const roles = [
    {
      title: "PM ALPHA [ DEPLOYMENT: ACTIVE ]",
      role: "Operations Analyst",
      location: "Remote, London",
      dates: "2024 to present",
      progress: 100,
      styleType: "active",
      nodeLabel: "03_CURRENT",
      bullets: [
        "Command cross-border trade and settlement operations for ETN products.",
        "Execute daily Net Asset Value (NAV) calculations with zero-tolerance precision.",
        "Engineer Python-based operational workflows, stripping out manual friction and automating institutional data reporting."
      ]
    },
    {
      title: "WEKRAFT LTD [ DEPLOYMENT: ARCHIVED ]",
      role: "Co-founder and CFO",
      location: "Kigali, Rwanda",
      dates: "2023 to 2024",
      progress: 60,
      styleType: "construction",
      nodeLabel: "02_FOUNDATION",
      bullets: [
        "Architected financial infrastructure from absolute zero for a Rwandan startup.",
        <>Secured <NumberCounter to={9936} prefix="$" /> in seed capital through rigorous investor relations and pitch telemetry.</>,
        "Designed the operational matrix required for fully compliant, auditable entity status."
      ]
    },
    {
      title: "ARBOUR LTD [ DEPLOYMENT: ARCHIVED ]",
      role: "Co-founder and CTO",
      location: "Kisumu, Kenya",
      dates: "2020 to 2023",
      progress: 80,
      styleType: "technical",
      nodeLabel: "01_ENGINEERING",
      bullets: [
        <>Secured <NumberCounter to={2888} prefix="€" /> pre-seed funding; selected for Siemens Foundation incubation.</>,
        "Deployed custom software modules utilizing C#, Python, and Access VBA, optimizing enterprise record-keeping."
      ]
    },
    {
      title: "GREEN HARVEST LTD [ DEPLOYMENT: ARCHIVED ]",
      role: "Marketing Assistant",
      location: "Kisumu, Kenya",
      dates: "2018 to 2023",
      progress: 100,
      styleType: "muted",
      nodeLabel: "00_INIT",
      bullets: [
        <>Pioneered social media campaigns that increased sales by <NumberCounter to={43} suffix="%" /> and expanded brand awareness in the region.</>,
        "Built Excel macros and VBA-based stock tracking systems that improved inventory accuracy."
      ]
    }
  ];

  return (
    <section className="relative py-32 px-6 max-w-5xl mx-auto" ref={containerRef}>
      <div className="mb-24 md:mb-48 text-center md:text-left">
        <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest uppercase mb-4">Chapter 02 / The Ascent Timeline</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Career Architecture</h3>
      </div>

      <div className="relative pl-8 md:pl-32">
        {/* The Route Line */}
        <div className="absolute left-[39px] md:left-[103px] top-0 bottom-0 w-[2px] bg-white/10 z-0" />
        <motion.div 
          className="absolute left-[39px] md:left-[103px] top-0 w-[2px] bg-gradient-to-b from-transparent via-[#00ffcc] to-[#00ffcc] z-10"
          style={{ height: lineHeight }}
        />
        {/* Glowing Trailing Dot */}
        <motion.div
          className="absolute left-[35px] md:left-[99px] w-[10px] h-[30px] bg-[#00ffcc] blur-[4px] rounded-full z-10"
          style={{ top: lineHeight, transform: 'translateY(-100%)' }}
        />

        {roles.map((role, idx) => (
          <RoleCard key={idx} {...role} index={idx} />
        ))}
      </div>
    </section>
  );
}

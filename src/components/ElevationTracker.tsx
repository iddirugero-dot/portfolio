import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ElevationTracker() {
  const [elevation, setElevation] = useState(0);
  const [summitReached, setSummitReached] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const currentElevation = Math.min(Math.round(scrollPercent * 4507), 4507);
      
      if (currentElevation !== elevation) {
        setElevation(currentElevation);
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 0.15 }
        });
      }

      if (currentElevation === 4507 && !summitReached) {
        setSummitReached(true);
        setTimeout(() => setSummitReached(false), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elevation, summitReached, controls]);

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none mix-blend-difference">
      <div className="flex flex-col items-end">
        {/* Topo Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="1" className="mb-2 opacity-50">
          <path d="M2 20 L8 10 L12 14 L20 4" />
          <path d="M4 22 L10 12 L14 16 L22 6" />
        </svg>
        
        <span className="text-[10px] text-[#00ffcc] font-bold uppercase tracking-widest mb-1">Elevation</span>
        <motion.div 
          animate={controls}
          className={`font-mono text-2xl font-bold tracking-tighter ${elevation === 4507 ? 'text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]' : 'text-white'}`}
        >
          {elevation.toLocaleString()}m
        </motion.div>
        
        {summitReached && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full mt-2 text-[#00ffcc] font-mono text-[10px] tracking-widest uppercase whitespace-nowrap"
          >
            Summit Reached
          </motion.div>
        )}
      </div>
    </div>
  );
}

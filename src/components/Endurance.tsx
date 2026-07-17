import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const NumberCounter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
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
  }, [to]);

  return <span>{count.toLocaleString()}</span>;
};

const VolcanoCard = ({ name, height, image, coord }: { name: string, height: number, image: string, coord: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-64 bg-[#0a0a0a] border border-white/10 flex flex-col justify-end p-6 overflow-hidden group cursor-crosshair transition-colors duration-500 hover:border-white/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover opacity-20 transition-all ease-in-out duration-1000"
        style={{ 
          filter: isHovered ? 'grayscale(0%) brightness(0.8)' : 'grayscale(100%) brightness(0.4)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 tracking-widest uppercase">
        {coord}
      </div>
      <div className="relative z-20 flex justify-between items-end">
        <div>
          <h4 className="text-xl font-bold text-white tracking-tight">{name}</h4>
        </div>
        <div className="font-mono text-xl font-bold text-[#00ffcc] tracking-tighter">
          {isHovered ? <NumberCounter to={height} /> : '---'}m
        </div>
      </div>
    </div>
  );
};

export default function Endurance() {
  const svgRef = useRef(null);
  const isSvgInView = useInView(svgRef, { once: true, margin: "-10%" });

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-24 text-center md:text-left">
        <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest uppercase mb-4">Chapter 05 / Physical Control Environments</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">Endurance Metrics</h3>
        
        <div className="border border-white/10 bg-[#0a0a0a] p-8 max-w-3xl">
          <p className="text-gray-400 leading-relaxed text-lg">
            In high-end financial operations, you manipulate abstract digital parameters. Out on the terrain, there are no anomalies. There is only gravity, friction, and stamina. <strong className="text-white font-medium">Pushing boundaries in the wild is my physical control environment.</strong>
          </p>
        </div>
      </div>

      {/* Volcanic Vector Array */}
      <div className="mb-24">
        <h4 className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest mb-6 border-b border-[#00ffcc]/30 pb-2">The Volcanic Vector Array</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <VolcanoCard name="KARISIMBI" height={4507} coord="01°30'S 29°27'E" image="/volcano-0.png" />
          <VolcanoCard name="BISOKE" height={3711} coord="01°28'S 29°29'E" image="/volcano-1.png" />
          <VolcanoCard name="MUHABURA" height={4127} coord="01°23'S 29°40'E" image="/volcano-2.png" />
          <VolcanoCard name="GAHINGA" height={3474} coord="01°23'S 29°38'E" image="/volcano-3.png" />
          <VolcanoCard name="SABYINYO" height={3669} coord="01°23'S 29°35'E" image="/volcano-4.png" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Marathon Telemetry */}
        <div className="bg-[#111111] border border-white/10 p-8 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest mb-4">2026 Marathon Telemetry</h4>
            <h3 className="text-3xl font-bold text-white mb-2">Nyungwe & Kigali</h3>
            <p className="text-gray-400 text-sm">Volatile elevation vs. street-grid pacing.</p>
          </div>
          <div className="mt-12 h-32 relative" ref={svgRef}>
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              {isSvgInView && (
                <>
                  <motion.path 
                    d="M0,45 C20,40 30,20 50,25 C70,30 80,10 100,5" 
                    fill="none" 
                    stroke="#00ffcc" 
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <motion.circle 
                    r="2" fill="white"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ offsetPath: "path('M0,45 C20,40 30,20 50,25 C70,30 80,10 100,5')" } as any}
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Off-Grid Navigation */}
        <div className="bg-[#111111] border border-white/10 p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40">
             <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop" alt="Motorcycle" className="w-full h-full object-cover filter grayscale" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
          </div>

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h4 className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest mb-4">The Enduro Matrix</h4>
              <h3 className="text-3xl font-bold text-white mb-4">Off-Grid Navigation</h3>
            </div>
            
            {/* SVG Tachometer */}
            <div className="w-16 h-16 relative mt-2 opacity-80">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="none" stroke="#00ffcc" strokeWidth="8"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 60 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#00ffcc] font-bold">
                RPM
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Executing long-range route optimization and multi-day kinetic endurance. Pushing a dual-sport motorcycle across regional East African borders, mapping complex navigational variables between Kigali and Nairobi.
            </p>
          </div>
          
          <div className="mt-8 flex gap-4 relative z-10">
            <span className="bg-black/50 border border-white/20 font-mono text-[10px] text-white px-3 py-1 uppercase tracking-widest">Engine: 200cc Dual-Sport</span>
            <span className="bg-black/50 border border-white/20 font-mono text-[10px] text-white px-3 py-1 uppercase tracking-widest">Terrain: East African Trails</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const ScrambleLink = ({ href, defaultText }: { href: string, defaultText: string }) => {
  const [text, setText] = useState(defaultText);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    if (isHovered) {
      let iterations = 0;
      const interval = setInterval(() => {
        setText(defaultText.split("").map((_, index) => {
          if (index < iterations) return defaultText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(""));
        
        if (iterations >= defaultText.length) clearInterval(interval);
        iterations += 1/3;
      }, 30);
      return () => clearInterval(interval);
    } else {
      setText(defaultText);
    }
  }, [isHovered, defaultText]);

  return (
    <motion.a 
      href={href}
      target={href.startsWith("mailto:") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-mono text-sm flex items-center gap-2 group cursor-crosshair"
    >
      <span className="text-gray-500 group-hover:text-[#00ffcc] transition-colors duration-200">[{'>'}</span>
      <span className="text-white group-hover:text-[#00ffcc] transition-colors tracking-widest">{text}</span>
      <span className="text-gray-500 group-hover:text-[#00ffcc] transition-colors duration-200">]</span>
    </motion.a>
  );
};

export default function LivingBook() {
  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const isBookInView = useInView(bookRef, { once: true, margin: "-20%" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const coverRotateY = isBookInView ? -10 : 0; // 10 degrees open when in view

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16 overflow-hidden">
      <div className="flex-1 z-10 relative">
        <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest uppercase mb-4">Chapter 04 / Knowledge Transfer</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">97 BUSINESS IDEAS</h3>
        <p className="text-gray-400 leading-relaxed text-lg max-w-xl font-mono uppercase tracking-wide scanline-hover p-4 border-l-2 border-[#00ffcc]/30 bg-black/40">
          A comprehensive blueprint to launching and scaling profitable ventures in Rwanda. From foundational business management to high-leverage optimization strategies, engineered for action without the need for massive capital.
        </p>
        <div className="flex flex-col gap-4 mt-8">
          <ScrambleLink href="https://www.tiktok.com/@97businessideas?_r=1&_t=ZS-986dSyxg5RN" defaultText="ACCESS DISTRIBUTION NODE" />
        </div>
      </div>

      <div className="flex-1 h-[600px] flex items-center justify-center relative perspective-[2000px]">
        <motion.div 
          ref={bookRef}
          style={{ rotateX, y, transformStyle: "preserve-3d" }}
          className="relative w-[300px] h-[450px] animate-[zero-g_6s_ease-in-out_infinite] group cursor-crosshair"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Back Cover / Pages inside */}
          <div className="absolute inset-0 bg-[#e8e8e8] rounded-r-xl shadow-2xl origin-left" style={{ transform: "translateZ(-20px)" }}>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gray-300 rounded-r-xl border-l border-gray-400" />
            
            {/* Interior Animated Chart / TOC */}
            <div className="absolute inset-6 flex flex-col justify-center">
              {isBookInView && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <h5 className="font-mono text-[10px] font-bold text-black border-b border-black/20 pb-2 mb-4 uppercase tracking-widest">Table of Contents</h5>
                  <ul className="font-mono text-[8px] text-gray-800 space-y-3 leading-relaxed tracking-wider">
                    <li className="font-bold border-l-2 border-[#00ffcc] pl-2">PART 1: LAYING THE FOUNDATION</li>
                    <li className="pl-2">CH 1: BUSINESS 101 - KEY CONSIDERATIONS</li>
                    <li className="pl-2">CH 2: BUSINESS MANAGEMENT & RISK</li>
                    <li className="pl-2">CH 3: BUSINESS TAXES & PERMITS</li>
                    <li className="pl-2">CH 4: FUNDING YOUR HUSTLE</li>
                    <li className="font-bold border-l-2 border-[#00ffcc] pl-2 mt-4">PART 2: LAUNCH YOUR DREAM BUSINESS</li>
                    <li className="pl-2">CH 6: BUSINESSES UNDER 100K</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div 
            animate={{ rotateY: isHovered ? -140 : coverRotateY }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-[#e8e8e8] rounded-r-xl shadow-[20px_0_50px_rgba(0,0,0,0.5)] origin-left overflow-hidden z-10"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img src="./book.jpg" alt="97 Business Ideas Cover" className="w-full h-full object-cover absolute inset-0 z-20" onError={(e) => e.currentTarget.src = "./book.png"} />
          </motion.div>

          {/* Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#111] border-r border-white/10 origin-right" style={{ transform: "rotateY(-90deg) translateZ(0)" }}>
            <div className="h-full flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>
              <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">IDDI R // 97 BUSINESS IDEAS</span>
            </div>
          </div>
        </motion.div>
        
        {/* Book Underneath Page (Static back cover to show when book opens) */}
        <div className="absolute w-[300px] h-[450px] bg-[#080808] border border-white/10 -z-10 shadow-2xl translate-x-[2px] translate-y-[2px]" />
      </div>
    </section>
  );
}

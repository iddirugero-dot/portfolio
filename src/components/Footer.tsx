import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const TypewriterText = ({ text, startTyping }: { text: string, startTyping: boolean }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (startTyping) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [startTyping, text]);

  return <span>{displayText}</span>;
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <footer ref={footerRef} className="relative min-h-[60vh] flex flex-col justify-center items-center py-32 bg-[#050505] border-t border-white/10">
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-start text-left">
        <h2 className="font-mono text-sm tracking-widest uppercase mb-12 text-[#00ffcc] border-b border-[#00ffcc]/30 pb-4 w-full">Chapter 07 / Initiate Contact</h2>
        
        <div className="font-mono text-lg md:text-2xl text-white mb-16 tracking-wide leading-relaxed">
          <span className="text-gray-500">C:\Users\Visitor&gt; </span>
          <TypewriterText text="Ping Iddi_Rugero" startTyping={isInView} />
          {showCursor && <span className="inline-block w-3 h-5 bg-[#00ffcc] ml-1 align-middle" />}
        </div>
        
        <div className="flex flex-col gap-6 font-mono text-sm uppercase tracking-widest w-full max-w-md">
          <motion.a 
            href="mailto:iddirugero@gmail.com"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-gray-400 hover:text-[#00ffcc] transition-colors group cursor-crosshair"
          >
            <span className="text-[#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
            [ EMAIL ]
          </motion.a>
          
          <motion.a 
            href="https://linkedin.com/in/iddi-r-48a420142/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-gray-400 hover:text-[#00ffcc] transition-colors group cursor-crosshair"
          >
            <span className="text-[#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
            [ LINKEDIN ]
          </motion.a>
        </div>

        {/* SVG Signature */}
        <div className="mt-24 w-full flex justify-end opacity-80 border-t border-white/5 pt-8">
          <div className="flex flex-col items-end">
            <svg width="200" height="80" viewBox="0 0 200 80" className="stroke-[#00ffcc] fill-none drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
              {isInView && (
                <motion.path 
                  d="M30,60 C40,20 50,10 60,50 C70,70 80,40 90,40 C100,40 110,60 120,40 C130,20 140,50 150,50 C160,50 170,40 180,40 M60,50 L80,50" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
                />
              )}
            </svg>
            <div className="font-mono text-[10px] text-gray-600 mt-2">SYS.SIG.IDDI // 2026</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

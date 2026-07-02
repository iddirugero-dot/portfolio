import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Code2, 
  Database, 
  LineChart, 
  Globe2, 
  Mail, 
  Link,
  Activity
} from 'lucide-react';

const App = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [tickerText, setTickerText] = useState('');
  const [isSettled, setIsSettled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const coreStatement = "I engineer automated data pipelines, manage cross-border financial operations, and design scalable business frameworks. Off-screen, I test my own constraints against the elements.";
  const languages = [
    "Ndi injeniyeri w'imiyoboro y'amakuru, nkayobora ibikorwa by'imari...",
    "Mimi huunda mifumo ya kiotomatiki ya data, kusimamia shughuli...",
    "Je conçois des pipelines de données automatisés, gère des opérations...",
    "Ich entwickle automatisierte Datenpipelines, leite grenzüberschreitende...",
    coreStatement
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < languages.length - 1) {
        setTickerText(languages[currentIndex]);
        currentIndex++;
      } else {
        setTickerText(coreStatement);
        setIsSettled(true);
        clearInterval(interval);
      }
    }, 800); // cycle every 800ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    const footerElement = document.getElementById('contact-footer');
    if (footerElement) {
      observer.observe(footerElement);
    }
    return () => observer.disconnect();
  }, []);

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
    <div className={`transition-colors duration-700 ${footerInView ? 'bg-white text-black' : 'bg-[#0a0a0a] text-white selection:bg-[#00ffcc] selection:text-black'} min-h-screen overflow-x-hidden font-sans`}>
      {/* HERO MODULE */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <h1 className="text-sm md:text-base tracking-[0.2em] text-gray-500 mb-8 font-semibold uppercase">
          Iddi Rugero // Systems & Operations
        </h1>
        <div className="min-h-[150px] md:min-h-[120px]">
          <h2 className={`text-3xl md:text-5xl font-light leading-tight tracking-tight ${!isSettled ? 'opacity-70 font-mono text-xl md:text-2xl' : 'opacity-100'} transition-all duration-500`}>
            {tickerText}
          </h2>
        </div>
      </section>

      {/* VENTURE ACCORDION GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800/50">
        <h3 className="text-xl font-medium mb-12 tracking-wide uppercase">Venture Architecture</h3>
        <div className="flex flex-col gap-4">
          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className={`border border-gray-800 ${footerInView ? 'border-gray-200' : ''} rounded-none overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className={`w-full flex items-center justify-between p-6 text-left ${footerInView ? 'hover:bg-gray-100' : 'hover:bg-[#111]'} transition-colors`}
              >
                <div>
                  <h4 className="text-lg md:text-xl font-medium">{exp.title}</h4>
                  <span className={`text-sm mt-1 block ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>{exp.meta}</span>
                </div>
                {activeAccordion === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ${activeAccordion === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`p-6 pt-0 leading-relaxed ${footerInView ? 'text-gray-700' : 'text-gray-300'}`}>
                  {exp.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE BOOK CASE */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`relative p-8 md:p-12 border ${footerInView ? 'border-gray-200 bg-gray-50' : 'border-[#222] bg-[#0f0f0f]'} rounded-xl overflow-hidden group`}>
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00ffcc]"></div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4 text-[#00ffcc]">
                <BookOpen size={24} />
                <span className="text-sm font-bold tracking-widest uppercase">Publication</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">97 Business Ideas</h3>
              <p className={`text-sm font-medium tracking-widest mb-6 ${footerInView ? 'text-gray-500' : 'text-gray-400'} uppercase`}>Second Edition</p>
              <p className={`leading-relaxed ${footerInView ? 'text-gray-700' : 'text-gray-300'} mb-6`}>
                A structured analytical volume detailing validation methodologies and regional scale strategy for emerging market ventures. 
                Focuses on actionable systemic frameworks over theoretical business concepts.
              </p>
            </div>
            <div className={`w-full md:w-auto flex-shrink-0 p-6 border ${footerInView ? 'border-gray-300' : 'border-gray-800'} flex flex-col items-center justify-center min-w-[200px] h-[260px]`}>
              <div className={`w-32 h-44 ${footerInView ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center text-center p-4 font-bold tracking-tighter text-2xl shadow-2xl transform group-hover:-rotate-3 transition-transform duration-500`}>
                97<br/>BUSINESS<br/>IDEAS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TERRAIN TELEMETRY LOG */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800/50">
        <h3 className="text-xl font-medium mb-12 tracking-wide uppercase flex items-center gap-3">
          <Activity size={24} className={footerInView ? 'text-black' : 'text-white'} />
          Terrain Telemetry Log
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Volcanic Array */}
          <div className={`p-8 border ${footerInView ? 'border-gray-200' : 'border-gray-800'}`}>
            <h4 className={`text-sm tracking-widest uppercase mb-8 ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>Volcanic Array (Elevation)</h4>
            <div className="h-48 w-full flex items-end justify-between gap-2 relative">
              {/* Karisimbi (4,507m) */}
              <div className="w-1/5 flex flex-col items-center group">
                <div className="w-full bg-[#00ffcc]/20 border-t-2 border-[#00ffcc] relative transition-all duration-300 group-hover:bg-[#00ffcc]/40" style={{ height: '100%' }}>
                  <span className="absolute -top-6 w-full text-center text-xs font-mono">4507m</span>
                </div>
                <span className="text-xs mt-3 uppercase tracking-wider">Karisimbi</span>
              </div>
              {/* Muhabura (4,127m) */}
              <div className="w-1/5 flex flex-col items-center group">
                <div className="w-full bg-blue-500/20 border-t-2 border-blue-500 relative transition-all duration-300 group-hover:bg-blue-500/40" style={{ height: '91%' }}>
                  <span className="absolute -top-6 w-full text-center text-xs font-mono">4127m</span>
                </div>
                <span className="text-xs mt-3 uppercase tracking-wider">Muhabura</span>
              </div>
              {/* Bisoke (3,711m) */}
              <div className="w-1/5 flex flex-col items-center group">
                <div className="w-full bg-indigo-500/20 border-t-2 border-indigo-500 relative transition-all duration-300 group-hover:bg-indigo-500/40" style={{ height: '82%' }}>
                  <span className="absolute -top-6 w-full text-center text-xs font-mono">3711m</span>
                </div>
                <span className="text-xs mt-3 uppercase tracking-wider">Bisoke</span>
              </div>
              {/* Sabyinyo (3,669m) */}
              <div className="w-1/5 flex flex-col items-center group">
                <div className="w-full bg-purple-500/20 border-t-2 border-purple-500 relative transition-all duration-300 group-hover:bg-purple-500/40" style={{ height: '81%' }}>
                  <span className="absolute -top-6 w-full text-center text-xs font-mono">3669m</span>
                </div>
                <span className="text-xs mt-3 uppercase tracking-wider">Sabyinyo</span>
              </div>
              {/* Gahinga (3,474m) */}
              <div className="w-1/5 flex flex-col items-center group">
                <div className="w-full bg-pink-500/20 border-t-2 border-pink-500 relative transition-all duration-300 group-hover:bg-pink-500/40" style={{ height: '77%' }}>
                  <span className="absolute -top-6 w-full text-center text-xs font-mono">3474m</span>
                </div>
                <span className="text-xs mt-3 uppercase tracking-wider">Gahinga</span>
              </div>
            </div>
          </div>

          {/* 2026 Racing Telemetry */}
          <div className={`p-8 border ${footerInView ? 'border-gray-200' : 'border-gray-800'}`}>
            <h4 className={`text-sm tracking-widest uppercase mb-8 ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>2026 Racing Telemetry</h4>
            <div className="relative h-48 w-full flex flex-col justify-center">
              {/* Nyungwe Marathon SVG */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <svg viewBox="0 0 100 20" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                  <path d="M0,10 Q10,5 20,15 T40,8 T60,18 T80,5 T100,10" fill="none" stroke="#00ffcc" strokeWidth="0.5" />
                </svg>
              </div>
              {/* Kigali Peace Marathon SVG */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <svg viewBox="0 0 100 20" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                  <path d="M0,15 L20,12 L40,16 L60,8 L80,14 L100,10" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1,1" />
                </svg>
              </div>
              
              <div className="absolute top-0 right-0 text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <div className="w-3 h-0.5 bg-[#00ffcc]"></div>
                  <span className="text-xs font-mono uppercase">Nyungwe Marathon (Trail)</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-3 h-0.5 bg-blue-500 border-b border-dashed"></div>
                  <span className="text-xs font-mono uppercase">Kigali Peace Marathon</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0">
                <span className="text-xs font-mono font-bold tracking-widest">PACE METRICS: CALIBRATING...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY BENTO BOX */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          {/* MBA Box */}
          <div className={`p-8 border ${footerInView ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#111]'} flex flex-col justify-center min-h-[200px]`}>
            <div className="mb-4 text-blue-500"><BookOpen size={32} /></div>
            <h4 className="text-2xl font-bold mb-2">MBA in Finance</h4>
            <p className={`text-sm uppercase tracking-widest ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>University of Nairobi</p>
          </div>

          {/* Huge Stat Box */}
          <div className="md:col-span-2 p-8 border border-[#00ffcc] bg-[#00ffcc]/5 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00ffcc]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-center z-10 text-[#00ffcc] [text-shadow:0_0_20px_rgba(0,255,204,0.5)]">
              9-FIGURE PORTFOLIO
              <br className="hidden md:block"/> AUTOMATED
            </h3>
          </div>

          {/* Tech Stack */}
          <div className={`md:col-span-2 p-8 border ${footerInView ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#111]'} min-h-[200px]`}>
            <h4 className={`text-sm tracking-widest uppercase mb-8 ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>Systems Engineering Stack</h4>
            <div className="flex flex-wrap gap-8 items-center justify-start">
              <div className="flex flex-col items-center gap-2"><Code2 size={32} /><span className="text-xs font-mono">React/TS</span></div>
              <div className="flex flex-col items-center gap-2"><Database size={32} /><span className="text-xs font-mono">Python</span></div>
              <div className="flex flex-col items-center gap-2"><Code2 size={32} /><span className="text-xs font-mono">C#</span></div>
              <div className="flex flex-col items-center gap-2"><Globe2 size={32} /><span className="text-xs font-mono">Figma</span></div>
              <div className="flex flex-col items-center gap-2"><LineChart size={32} /><span className="text-xs font-mono">VBA Macro</span></div>
            </div>
          </div>

          {/* Languages */}
          <div className={`p-8 border ${footerInView ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#111]'} min-h-[200px]`}>
            <h4 className={`text-sm tracking-widest uppercase mb-6 ${footerInView ? 'text-gray-500' : 'text-gray-400'}`}>Linguistics Matrix</h4>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex justify-between"><span>Kinyarwanda</span> <span className="text-[#00ffcc]">Native</span></li>
              <li className="flex justify-between"><span>English</span> <span className="text-[#00ffcc]">Fluent</span></li>
              <li className="flex justify-between"><span>Kiswahili</span> <span className="text-[#00ffcc]">Fluent</span></li>
              <li className="flex justify-between"><span>French</span> <span className="text-[#00ffcc]">Working</span></li>
              <li className="flex justify-between"><span>German</span> <span className="text-[#00ffcc]">Basic</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* CANVAS INVERSION FOOTER */}
      <footer id="contact-footer" className="w-full mt-32 border-t border-gray-200 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">INITIATE CONTACT</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="mailto:iddirugero@gmail.com"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 h-14 bg-black text-white hover:bg-gray-800 transition-colors font-medium min-w-[200px] min-h-[44px]"
            >
              <Mail size={20} />
              iddirugero@gmail.com
            </a>
            <a 
              href="https://linkedin.com/in/iddi-r-48a420142"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 h-14 border-2 border-black text-black hover:bg-gray-100 transition-colors font-medium min-w-[200px] min-h-[44px]"
            >
              <Link size={20} />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

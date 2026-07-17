

const ProgressBar = ({ percentage }: { percentage: number }) => {
  const totalBlocks = 10;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const blocks = Array.from({ length: totalBlocks }, (_, i) => i < filledBlocks ? '█' : '░').join('');
  
  return <span className="text-[#00ffcc] tracking-widest">[{blocks}]</span>;
};

const AwardStamp = ({ date, issuer, title }: any) => {
  return (
    <div className="group relative border border-white/10 p-6 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 bg-[#0a0a0a]">
      <div className="mb-4">
        <span className="font-mono text-[10px] text-[#00ffcc] tracking-widest uppercase">{date}</span>
      </div>
      <div>
        <h5 className="font-bold text-white uppercase tracking-tight text-sm mb-1">{issuer}</h5>
        {title && <p className="text-xs text-gray-500">{title}</p>}
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="font-mono text-[8px] text-green-500 font-bold uppercase tracking-widest border border-green-500 px-2 py-1 rotate-[-5deg] inline-block">VERIFIED</span>
      </div>
    </div>
  );
};

export default function Arsenal() {
  const techStack = ['Python', 'SQL', 'C#', 'HTML', 'Figma', 'Adobe XD', 'Illustrator', 'Photoshop'];
  const languages = [
    { name: 'Kinyarwanda', level: 100, label: 'Native' },
    { name: 'English', level: 100, label: 'Fluent' },
    { name: 'French', level: 100, label: 'Fluent' },
    { name: 'Kiswahili', level: 50, label: 'Advanced' },
    { name: 'German', level: 30, label: 'Basic' },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-24 text-center md:text-left">
        <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest uppercase mb-4">Chapter 06 / The Arsenal</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Toolsets for Global Reach</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Block A: Academic Logic */}
        <div className="lg:col-span-7 bg-[#050505] border border-white/10 p-8 flex flex-col justify-center">
          <h4 className="text-[#00ffcc] font-mono text-xs tracking-widest uppercase mb-8 border-b border-white/10 pb-4">Academic Logic</h4>
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-end mb-2">
                <h5 className="text-white font-bold uppercase tracking-wider text-lg">Master of Business Administration in Finance</h5>
              </div>
              <div className="text-gray-400 text-sm font-mono uppercase tracking-widest">University of Nairobi</div>
              <div className="font-mono text-[10px] text-gray-500 mt-4 uppercase tracking-widest border-l-2 border-[#00ffcc]/30 pl-4 py-1 bg-white/5">
                Thesis: The Effect of Big Data Analytics on Credit Risk Assessment in Commercial Banks of Kenya.
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <h5 className="text-white font-bold uppercase tracking-wider text-lg">Bachelor of Business Information Systems</h5>
              </div>
              <div className="text-gray-400 text-sm font-mono uppercase tracking-widest">University of Nairobi</div>
              <div className="font-mono text-[10px] text-green-500 mt-4 uppercase tracking-widest border border-green-500/30 inline-block px-3 py-1">
                First Class Honours
              </div>
            </div>
          </div>
        </div>

        {/* Block B: Matrix (Skills) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 p-8 flex flex-col">
          <h4 className="text-[#00ffcc] font-mono text-xs tracking-widest uppercase mb-8 border-b border-white/10 pb-4">The Matrix</h4>
          
          <div className="mb-10">
            <h5 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h5>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="border border-white/20 text-gray-300 px-3 py-1 text-xs font-mono uppercase bg-black/50 hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-colors cursor-crosshair">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs text-gray-500 uppercase tracking-widest mb-4">5-Language Network</h5>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-mono text-sm">{lang.name}</span>
                    <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{lang.label}</span>
                  </div>
                  <ProgressBar percentage={lang.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Block C: Institutional Validations */}
        <div className="lg:col-span-7">
          <h4 className="text-[#00ffcc] font-mono text-xs tracking-widest uppercase mb-6 border-b border-white/10 pb-4">Institutional Validations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AwardStamp date="[MAY 2023]" issuer="Vice Chancellor Award / University of Nairobi" title="Best student in academic performance." />
            <AwardStamp date="[MAY 2023]" issuer="Prof. Isaac M. Mbeche Award" title="Best student in Management Science & Project Management." />
            <AwardStamp date="[MAY 2023]" issuer="Unilever Kenya Ltd & Kenya Breweries Limited" title="Outstanding Scholar Recognition." />
            <AwardStamp date="[NOV 2023]" issuer="The Responsible Steward Award / Jasiri Talent Investor Program" title="" />
          </div>
        </div>

        {/* Block D: Flavor Chemistry */}
        <div className="lg:col-span-5 relative bg-[#050505] border border-white/10 p-8 overflow-hidden group flex flex-col">
          <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-30">
             <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=1000&auto=format&fit=crop" alt="Culinary Chemistry" className="w-full h-full object-cover filter grayscale" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col">
            <h4 className="text-[#00ffcc] font-mono text-xs tracking-widest uppercase mb-4">Extracurricular Optimization</h4>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-4">Flavor Chemistry Optimized</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Balancing complex umami profiles using exact data. Scaling protein-dense recipes in precise measurements and maintaining rigorous temperature controls to engineer optimal fermentation yields.
            </p>
            <div className="mt-auto bg-black/60 border border-white/10 p-4 font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
              <span className="text-[#00ffcc]">TEST.01: ESPRESSO EXTRACTION</span><br/>
              VAR: GRIND SIZE, PRESSURE<br/>
              YIELD: 18G IN // 36G OUT // 28S<br/>
              <br/>
              <span className="text-[#00ffcc]">TEST.02: SOURDOUGH FERMENTATION</span><br/>
              VAR: HYDRATION, AMBIENT TEMP<br/>
              YIELD: 78% HYD // 24C // 12HR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

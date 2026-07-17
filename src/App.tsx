import { ReactLenis } from '@studio-freight/react-lenis';

import ElevationTracker from './components/ElevationTracker';
import DataWind from './components/DataWind';
import Hero from './components/Hero';
import WorkTimeline from './components/WorkTimeline';
import ControlRoom from './components/ControlRoom';
import LivingBook from './components/LivingBook';
import Endurance from './components/Endurance';
import Arsenal from './components/Arsenal';
import Footer from './components/Footer';

import Cursor from './components/Cursor';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="relative w-full min-h-screen text-gray-200 selection:bg-[#00ffcc] selection:text-black">
        <Cursor />
        <DataWind />
        <ElevationTracker />
        
        <Hero />
        <WorkTimeline />
        <ControlRoom />
        <LivingBook />
        <Endurance />
        <Arsenal />
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;

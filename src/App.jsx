import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSplineCover from './components/HeroSplineCover';
import RoomsPreview from './components/RoomsPreview';
import Footer from './components/Footer';

function App() {
  const [locale, setLocale] = useState('en');
  const roomsRef = useRef(null);

  useEffect(() => {
    // Initialize theme from preference if not set
    const saved = localStorage.getItem('theme');
    if (!saved) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white font-inter text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar locale={locale} onChangeLocale={setLocale} />
      <main>
        <HeroSplineCover onExplore={handleExplore} />
        <div ref={roomsRef}>
          <RoomsPreview />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

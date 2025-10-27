import { useEffect, useState } from 'react';
import { Home, Bed, Calendar, Star, Sun, Moon, Globe } from 'lucide-react';

const languages = {
  en: {
    home: 'Home',
    rooms: 'Rooms',
    booking: 'Booking',
    reviews: 'Reviews',
    language: 'Language',
    signIn: 'Sign in',
  },
  es: {
    home: 'Inicio',
    rooms: 'Habitaciones',
    booking: 'Reservas',
    reviews: 'Reseñas',
    language: 'Idioma',
    signIn: 'Ingresar',
  },
};

export default function Navbar({ locale = 'en', onChangeLocale }) {
  const t = languages[locale] || languages.en;
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-neutral-900/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg">
            <Home size={18} />
          </div>
          <div className="leading-tight">
            <p className="font-semibold tracking-tight text-neutral-900 dark:text-white">Aurora Hotel</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Stay inspired</p>
          </div>
        </div>
        <ul className="hidden items-center gap-6 md:flex">
          <li className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
            <Bed size={16} /> {t.rooms}
          </li>
          <li className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
            <Calendar size={16} /> {t.booking}
          </li>
          <li className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
            <Star size={16} /> {t.reviews}
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="relative group">
            <button className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              <Globe size={16} /> {locale.toUpperCase()}
            </button>
            <div className="pointer-events-auto absolute right-0 mt-2 hidden w-32 rounded-md border border-neutral-200 bg-white p-1 text-sm shadow-lg group-hover:block dark:border-neutral-700 dark:bg-neutral-800">
              <button onClick={() => onChangeLocale('en')} className="block w-full rounded px-2 py-1 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">EN</button>
              <button onClick={() => onChangeLocale('es')} className="block w-full rounded px-2 py-1 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">ES</button>
            </div>
          </div>
          <button className="hidden rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 md:block">
            {t.signIn}
          </button>
        </div>
      </nav>
    </header>
  );
}

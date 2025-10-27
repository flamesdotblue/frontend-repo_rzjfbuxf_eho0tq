import Spline from '@splinetool/react-spline';
import { CreditCard, Shield, Star } from 'lucide-react';

export default function HeroSplineCover({ onExplore }) {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 pt-28 sm:px-6 md:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Star size={14} className="text-yellow-400" /> Premium stays for modern travelers
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Elevate your stay with Aurora Hotel
        </h1>
        <p className="max-w-2xl text-base text-neutral-200 sm:text-lg">
          Smart room suggestions, seamless bookings, secure payments, and elegant comfort — all in one place.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onExplore} className="pointer-events-auto rounded-md bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg hover:shadow-xl">
            Explore rooms
          </button>
          <div className="pointer-events-none hidden items-center gap-4 text-sm text-neutral-300 sm:flex">
            <span className="inline-flex items-center gap-2"><Shield size={16} className="text-emerald-400" /> Secure</span>
            <span className="inline-flex items-center gap-2"><CreditCard size={16} className="text-sky-400" /> Fast payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}

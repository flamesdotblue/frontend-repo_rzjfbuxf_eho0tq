import { useMemo, useState } from 'react';
import { Bed, Calendar, Sparkles, SlidersHorizontal, Filter } from 'lucide-react';

const ROOMS = [
  { id: 1, name: 'Deluxe Suite', type: 'suite', price: 280, rating: 4.9, features: ['city view', 'king bed', 'work desk'], image: 'https://images.unsplash.com/photo-1723584961549-1971ff95181f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEZWx1eGUlMjBTdWl0ZXxlbnwwfDB8fHwxNzYxNTQ1ODIxfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Executive King', type: 'king', price: 210, rating: 4.7, features: ['king bed', 'high floor', 'espresso'], image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, name: 'Cozy Twin', type: 'twin', price: 140, rating: 4.4, features: ['twin beds', 'quiet', 'work desk'], image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, name: 'Panorama Corner', type: 'suite', price: 340, rating: 5.0, features: ['panoramic view', 'sofa', 'bath'], image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop' },
];

export default function RoomsPreview() {
  const [dateIn, setDateIn] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [type, setType] = useState('all');
  const [budget, setBudget] = useState(350);
  const [tags, setTags] = useState([]);

  const nights = useMemo(() => {
    if (!dateIn || !dateOut) return 0;
    const a = new Date(dateIn).getTime();
    const b = new Date(dateOut).getTime();
    const diff = Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24)));
    return diff;
  }, [dateIn, dateOut]);

  const filtered = useMemo(() => {
    return ROOMS.filter((r) => (type === 'all' || r.type === type) && r.price <= budget && (tags.length === 0 || tags.every((t) => r.features.join(' ').includes(t))));
  }, [type, budget, tags]);

  const suggest = () => {
    // Simple AI-like heuristic: score by price closeness to 70% of budget, rating, and tag matches
    const target = budget * 0.7;
    const scored = ROOMS.map((r) => {
      const priceScore = 1 - Math.min(1, Math.abs(r.price - target) / target);
      const ratingScore = r.rating / 5;
      const tagScore = tags.length ? tags.filter((t) => r.features.join(' ').includes(t)).length / tags.length : 0.5;
      return { room: r, score: priceScore * 0.5 + ratingScore * 0.35 + tagScore * 0.15 };
    })
      .sort((a, b) => b.score - a.score)
      .map((s) => s.room);

    if (scored.length) {
      const top = scored[0];
      setType('all');
      setBudget(Math.max(budget, top.price));
      setTags([]);
    }
  };

  const total = useMemo(() => {
    if (!nights || filtered.length === 0) return 0;
    // Show total based on first result as a preview
    return filtered[0].price * nights;
  }, [nights, filtered]);

  const toggleTag = (t) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <section id="rooms" className="relative -mt-16 scroll-mt-24 bg-white pb-16 pt-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">Find your perfect room</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Availability, smart suggestions, and instant totals.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={suggest} className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
              <Sparkles size={16} /> Suggest for me
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-neutral-500" />
            <div className="flex w-full items-center gap-2">
              <input value={dateIn} onChange={(e) => setDateIn(e.target.value)} type="date" className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800" />
              <span className="text-neutral-400">→</span>
              <input value={dateOut} onChange={(e) => setDateOut(e.target.value)} type="date" className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-neutral-500" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800">
              <option value="all">Any type</option>
              <option value="suite">Suite</option>
              <option value="king">King</option>
              <option value="twin">Twin</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-neutral-500" />
            <input type="range" min={80} max={400} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full" />
            <span className="w-16 text-right text-sm text-neutral-700 dark:text-neutral-200">${'{'}budget{'}'}</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {['city view', 'king bed', 'work desk', 'panoramic view', 'bath'].map((t) => (
            <button key={t} onClick={() => toggleTag(t)} className={`rounded-full border px-3 py-1 text-xs ${tags.includes(t) ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room) => (
            <article key={room.id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img src={room.image} alt={room.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{room.name}</h3>
                  <div className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300">
                    <Star size={14} /> {room.rating}
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">{room.features.join(' • ')}</p>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
                    <Bed size={16} /> {room.type.toUpperCase()}
                  </div>
                  <p className="text-right text-lg font-semibold text-neutral-900 dark:text-white">${'{'}room.price{'}'}/night</p>
                </div>
                <button className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                  Book now
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Nights: {nights || '-'} {nights ? `• Est. total: $${total}` : ''}</p>
          <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400">See all rooms →</a>
        </div>
      </div>
    </section>
  );
}

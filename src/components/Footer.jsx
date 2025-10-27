import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <h4 className="mb-2 text-base font-semibold text-neutral-900 dark:text-white">Aurora Hotel</h4>
          <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">Experience the beauty of effortless stays. Boutique comfort, modern tech, and warm hospitality.</p>
        </div>
        <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="inline-flex items-center gap-2"><MapPin size={16} /> 123 Skyline Ave, Riviera City</div>
          <div className="inline-flex items-center gap-2"><Phone size={16} /> +1 (555) 010-2025</div>
          <div className="inline-flex items-center gap-2"><Mail size={16} /> hello@aurorahotel.com</div>
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          <p>© {new Date().getFullYear()} Aurora. All rights reserved.</p>
          <p className="mt-1">Design-first hospitality platform.</p>
        </div>
      </div>
    </footer>
  );
}

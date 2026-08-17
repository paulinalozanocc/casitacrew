import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream mt-20">
      <div className="container-padded py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="font-lobster text-xl italic mb-2">Casita</div>
            <div className="font-archivo font-bold tracking-wider mb-4">CREW</div>
            <p className="text-sm text-cream opacity-80">Vetted trades, no surprises.</p>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="font-archivo font-bold mb-4">For customers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="hover:text-brass transition-colors">
                  Browse trades
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-brass transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="hover:text-brass transition-colors">
                  Trust & safety
                </Link>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="font-archivo font-bold mb-4">For providers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-brass transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/provider/signup" className="hover:text-brass transition-colors">
                  Join as pro
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#providers" className="hover:text-brass transition-colors">
                  Provider guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-archivo font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-brass transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brass transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brass transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream border-opacity-20 pt-8">
          <p className="text-center text-sm text-cream opacity-80">
            &copy; 2026 CasitaCrew. All rights reserved.
          </p>
          <p className="text-center text-xs text-cream opacity-60 mt-2">
            casitacrew.ca | info@casitacrew.ca | 416-555-0134
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { mockProviders } from './lib/mockProviders';

const TRADES = [
  { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
  { id: 'handyman', name: 'Handyman', icon: '🔨' },
  { id: 'electrician', name: 'Electrician', icon: '⚡' },
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
];

const testimonials = [
  {
    name: 'John S.',
    trade: 'Plumber',
    quote: 'Fixed our kitchen sink in 30 minutes. Professional and courteous. Price was what he quoted.',
    rating: 5,
  },
  {
    name: 'Maria T.',
    trade: 'Cleaning',
    quote: 'Sarah does amazing work. Our house has never been cleaner. Highly recommend.',
    rating: 5,
  },
  {
    name: 'David K.',
    trade: 'Electrician',
    quote: 'Ahmed rewired our bathroom and kitchen. Professional, on time, and fair pricing.',
    rating: 5,
  },
];

export default function Home() {
  const topProviders = mockProviders.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-midnight text-cream py-20 md:py-32">
        <div className="container-padded space-y-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-cream">Vetted trades, no surprises</h1>
            <p className="text-xl md:text-2xl text-cream opacity-90">
              Hire cleaners, handypeople, electricians, and plumbers in Toronto. Every pro is checked before they knock on your door.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/browse" className="btn-primary">
              Browse trades
            </Link>
            <Link href="/pricing" className="btn-outline">
              Join as pro
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-teal text-cream py-12 md:py-16">
        <div className="container-padded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{mockProviders.length}+</div>
              <p className="text-lg">Vetted providers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <p className="text-lg">Average rating</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg">Happy customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Categories */}
      <section className="py-20 md:py-24">
        <div className="container-padded space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-navy">Browse by trade</h2>
            <p className="text-lg text-stone max-w-xl mx-auto">
              All our pros are verified and insured. Pick a trade to see who's available in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRADES.map(trade => (
              <Link key={trade.id} href={`/${trade.id}`}>
                <div className="card hover:shadow-lg transition-shadow text-center cursor-pointer h-full flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">{trade.icon}</div>
                  <h3 className="text-navy font-bold text-xl">{trade.name}</h3>
                  <p className="text-stone text-sm mt-2">
                    {mockProviders.filter(p => p.trade === trade.id).length} providers
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-navy text-cream py-20 md:py-24">
        <div className="container-padded space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-cream">How it works</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              Simple, straightforward. No bidding wars. No surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: 'Browse vetted pros',
                description: 'Pick your trade. See who\'s available nearby. Every pro is verified.',
              },
              {
                number: 2,
                title: 'Confirm details',
                description: 'Message the pro. Confirm the scope, pricing, and timing.',
              },
              {
                number: 3,
                title: 'Book and get it done',
                description: 'Schedule the appointment. Get it done. Leave a review.',
              },
            ].map(step => (
              <div key={step.number} className="space-y-4">
                <div className="text-6xl font-bold opacity-20">{step.number}</div>
                <h3 className="text-cream text-xl font-bold">{step.title}</h3>
                <p className="text-cream opacity-90">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/how-it-works" className="btn-primary">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="py-20 md:py-24">
        <div className="container-padded space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-navy">Popular pros</h2>
            <p className="text-lg text-stone max-w-xl mx-auto">
              Browse highly-rated providers available today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProviders.map(provider => (
              <Link key={provider.id} href={`/provider/${provider.id}`}>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="mb-4 bg-stone bg-opacity-10 rounded-lg aspect-square flex items-center justify-center">
                    <div className="text-5xl font-bold text-stone opacity-40">
                      {provider.name.charAt(0)}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-archivo font-bold text-lg text-navy">{provider.name}</div>
                      <div className="text-sm text-stone capitalize">{provider.trade}</div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass text-midnight rounded-full font-bold text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.418a3 3 0 01-.879 2.12l-6.182 6.182a3 3 0 01-4.243 0l-6.182-6.182a3 3 0 01-.879-2.12V6.517a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg>
                      Vetted
                    </div>
                    <div className="text-sm text-stone">{provider.location}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-500 font-bold">★ {provider.rating}</div>
                      <div className="text-sm text-stone">({provider.reviewCount})</div>
                    </div>
                    <div className="text-brass font-bold">{provider.priceRange}</div>
                    <button className="w-full mt-4 btn-primary text-sm">View profile</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/browse" className="btn-secondary">
              Browse all providers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream py-20 md:py-24 border-t border-stone border-opacity-20">
        <div className="container-padded space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-navy">What customers say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card space-y-4">
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-midnight italic">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <div className="font-bold text-navy">{testimonial.name}</div>
                  <div className="text-sm text-stone">{testimonial.trade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-navy text-cream py-16 md:py-20">
        <div className="container-padded text-center space-y-6">
          <h2 className="text-cream">Ready to get steady leads?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Join {mockProviders.length}+ pros on CasitaCrew. Get $9/month. Keep 100% of what you charge (for now).
          </p>
          <Link href="/pricing" className="btn-primary inline-block">
            Join as provider
          </Link>
        </div>
      </section>
    </>
  );
}

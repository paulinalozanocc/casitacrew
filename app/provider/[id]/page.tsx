import Link from 'next/link';
import { getProviderById } from '../../lib/mockProviders';
import { notFound } from 'next/navigation';

export default function ProviderProfilePage({ params }: { params: { id: string } }) {
  const provider = getProviderById(params.id);

  if (!provider) {
    notFound();
  }

  const dummyReviews = [
    {
      customer: 'John S.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Professional and courteous. Showed up on time and fixed the problem quickly.',
    },
    {
      customer: 'Maria D.',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent work. Very clean and organized. Would definitely hire again.',
    },
    {
      customer: 'Robert K.',
      rating: 5,
      date: '6 weeks ago',
      comment: 'Price was exactly what was quoted. No surprises. Highly recommend.',
    },
  ];

  return (
    <>
      {/* Hero / Profile Header */}
      <section className="bg-gradient-to-r from-navy to-teal text-cream py-12">
        <div className="container-padded">
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 bg-cream rounded-lg flex items-center justify-center text-navy text-5xl font-bold">
              {provider.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-cream mb-2">{provider.name}</h1>
              <p className="text-lg capitalize opacity-90 mb-4">{provider.trade}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">★ {provider.rating.toFixed(1)}</span>
                  <span className="opacity-80">({provider.reviewCount} reviews)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass text-midnight rounded-full font-bold text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.418a3 3 0 01-.879 2.12l-6.182 6.182a3 3 0 01-4.243 0l-6.182-6.182a3 3 0 01-.879-2.12V6.517a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Vetted
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-padded py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: About, Services, Verification */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="card">
              <h2 className="text-navy mb-4">About</h2>
              <p className="text-midnight mb-4">{provider.bio}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone">Years of experience:</span>
                  <span className="font-bold text-navy">{provider.yearsExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Service area:</span>
                  <span className="font-bold text-navy">{provider.serviceArea}</span>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="card">
              <h2 className="text-navy mb-4">Services offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {provider.services.map(service => (
                  <div key={service} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brass rounded-full"></div>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="card">
              <h2 className="text-navy mb-4">Pricing</h2>
              <div className="mb-4">
                <div className="text-brass font-bold text-xl font-archivo">{provider.priceRange}</div>
              </div>
              <p className="text-stone text-sm">Contact for exact quote based on your job details.</p>
            </section>

            {/* Verification Checklist */}
            <section className="card">
              <h2 className="text-navy mb-4">Verification</h2>
              <p className="text-sm text-stone mb-4">
                Verified on {provider.verificationDate}. All credentials confirmed by CasitaCrew.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Government ID verified</span>
                </div>
                {(provider.trade === 'electrician' || provider.trade === 'plumber') && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brass text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                      <span>{provider.trade === 'electrician' ? 'ESA' : 'Trade'} license verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brass text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                      <span>WSIB clearance confirmed</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Liability insurance current</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brass text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Background check passed</span>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="card">
              <h2 className="text-navy mb-6">Customer reviews</h2>
              <div className="space-y-6">
                {dummyReviews.map((review, i) => (
                  <div key={i} className={i > 0 ? 'pt-6 border-t border-stone border-opacity-20' : ''}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-bold text-navy">{review.customer}</div>
                        <div className="text-sm text-stone">{review.date}</div>
                      </div>
                      <div className="text-yellow-500 font-bold">★ {review.rating}</div>
                    </div>
                    <p className="text-midnight">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: Contact Card */}
          <aside className="lg:col-span-1">
            <div className="card sticky top-4 space-y-6">
              <div>
                <h3 className="font-bold text-navy mb-2 font-archivo">Get in touch</h3>
                <p className="text-sm text-stone">Message {provider.name.split(' ')[0]} to discuss your project and get a quote.</p>
              </div>

              <button className="w-full btn-primary">Message {provider.name.split(' ')[0]}</button>

              <button className="w-full btn-secondary">Request this job</button>

              <hr className="border-stone border-opacity-20" />

              <div>
                <div className="text-sm font-bold text-navy mb-2">Contact info</div>
                <div className="text-sm text-stone space-y-2">
                  <p>
                    <strong>Trade:</strong> {provider.trade}
                  </p>
                  <p>
                    <strong>Location:</strong> {provider.location}
                  </p>
                  <p>
                    <strong>Availability:</strong> Same-day or by appointment
                  </p>
                </div>
              </div>

              <hr className="border-stone border-opacity-20" />

              <div className="text-xs text-stone">
                <p className="font-bold mb-2">Why hire from CasitaCrew?</p>
                <ul className="space-y-1">
                  <li>✓ Fully vetted pros</li>
                  <li>✓ Real reviews from real jobs</li>
                  <li>✓ No surprise charges</li>
                  <li>✓ Same-day bookings available</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-navy text-cream py-16 mt-20">
        <div className="container-padded text-center space-y-6">
          <h2 className="text-cream">Ready to book?</h2>
          <p className="text-lg opacity-90">Start a conversation with {provider.name.split(' ')[0]} today.</p>
          <button className="btn-primary inline-block">Send a message</button>
        </div>
      </section>
    </>
  );
}

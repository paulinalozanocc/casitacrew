import Link from 'next/link';

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-navy to-teal text-cream py-12">
        <div className="container-padded text-center space-y-4">
          <h1 className="text-cream">Simple pricing</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            One flat rate. No hidden fees. Get started for $9/month.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20">
        <div className="container-padded">
          <div className="max-w-2xl mx-auto card space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-navy">CasitaCrew Provider Membership</h2>
              <p className="text-stone">Everything you need to get steady leads</p>
            </div>

            <div className="text-center space-y-2 py-8 border-t border-b border-stone border-opacity-20">
              <div className="text-5xl font-bold text-brass font-archivo">$9</div>
              <div className="text-stone">/month, recurring</div>
              <div className="text-sm text-stone">Cancel anytime. No contract.</div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-navy mb-4">What's included:</h3>
              <div className="space-y-3">
                {[
                  'One active profile listing',
                  'Unlimited customer inquiries & lead notifications',
                  'Messaging & booking tools',
                  'Verified provider badge',
                  'Review system & ratings',
                  'Access to customer base across GTA',
                  'Professional verification (license, insurance, background check)',
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 text-brass font-bold">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-teal bg-opacity-10 border-l-4 border-teal p-4 space-y-2">
              <div className="font-bold text-navy">How it works</div>
              <ol className="text-sm space-y-2 list-decimal list-inside text-midnight">
                <li>Sign up and verify your credentials</li>
                <li>Set up your profile with photos and rates</li>
                <li>Subscribe for $9/month via Stripe</li>
                <li>We manually approve your account (24–48 hours)</li>
                <li>Your profile goes live and you start getting leads</li>
                <li>Message customers, confirm details, get paid directly</li>
              </ol>
            </div>

            <div className="space-y-4 pt-4">
              <div className="font-bold text-navy text-center">How much can you earn?</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {[
                  {
                    name: 'Conservative',
                    jobs: '2 jobs/week',
                    earnings: '$400–800/week',
                  },
                  {
                    name: 'Active',
                    jobs: '4 jobs/week',
                    earnings: '$800–1,600/week',
                  },
                  {
                    name: 'Busy',
                    jobs: '8+ jobs/week',
                    earnings: '$1,600+/week',
                  },
                ].map(scenario => (
                  <div key={scenario.name} className="p-4 bg-cream rounded-lg border border-stone border-opacity-20">
                    <div className="font-bold text-navy mb-2">{scenario.name}</div>
                    <div className="text-sm text-stone mb-2">{scenario.jobs}</div>
                    <div className="font-bold text-brass">{scenario.earnings}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone text-center mt-4">
                *Based on typical Toronto market rates ($75–150/hour). Your actual earnings depend on your trade, rates, and job volume.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Link href="/provider/signup" className="block">
                <button className="w-full btn-primary">Start free trial</button>
              </Link>
              <p className="text-xs text-stone text-center">No credit card required for the first 7 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream border-t border-stone border-opacity-20 py-20">
        <div className="container-padded max-w-3xl">
          <h2 className="text-navy mb-12 text-center">Frequently asked questions</h2>

          <div className="space-y-8">
            {[
              {
                q: 'When do I get paid?',
                a: 'You arrange payment directly with customers (cash, e-transfer, Stripe, etc.). CasitaCrew handles provider subscriptions only — no escrow or commission on job payments.',
              },
              {
                q: 'How long does verification take?',
                a: 'Typically 24–48 hours. We manually review all documents (license, insurance, WSIB, background check). Once approved, your profile goes live immediately.',
              },
              {
                q: 'Can I pause my subscription?',
                a: 'Yes. You can cancel or pause anytime from your settings. No penalties or notice required.',
              },
              {
                q: 'What if I already work for another platform?',
                a: 'Great! You can list with CasitaCrew alongside other platforms. All the lead volume is yours.',
              },
              {
                q: 'How often do I get inquiries?',
                a: 'It depends on your trade, rates, and service area. Typically, active providers on CasitaCrew get 3–8 inquiries/week in the GTA. You decide which jobs to accept.',
              },
              {
                q: 'What if a customer doesn\'t pay?',
                a: 'CasitaCrew doesn\'t hold funds, so we recommend discussing payment upfront. In v2, we\'ll offer optional escrow for extra protection.',
              },
            ].map((faq, i) => (
              <div key={i}>
                <div className="font-bold text-navy mb-2">{faq.q}</div>
                <p className="text-midnight text-stone">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-cream py-16">
        <div className="container-padded text-center space-y-6">
          <h2 className="text-cream">Ready to get steady leads?</h2>
          <p className="text-lg opacity-90">Join other Toronto pros on CasitaCrew today.</p>
          <Link href="/provider/signup">
            <button className="btn-primary">Create your account</button>
          </Link>
        </div>
      </section>
    </>
  );
}

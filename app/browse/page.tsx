'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockProviders } from '../lib/mockProviders';

const TRADES = ['cleaning', 'handyman', 'electrician', 'plumber'];
const LOCATIONS = ['Toronto', 'Scarborough', 'Mississauga', 'Markham', 'York', 'Brampton', 'Oakville', 'East York'];

export default function BrowsePage() {
  const [selectedTrade, setSelectedTrade] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'newest'>('rating');

  // Filter providers
  let filtered = mockProviders;

  if (selectedTrade) {
    filtered = filtered.filter(p => p.trade === selectedTrade);
  }

  if (selectedLocation) {
    filtered = filtered.filter(p => p.serviceArea.includes(selectedLocation));
  }

  // Sort
  if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-navy to-teal text-cream py-12">
        <div className="container-padded">
          <h1 className="text-cream mb-2">Browse providers</h1>
          <p className="text-lg opacity-90">Find vetted professionals in your area</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-padded py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters (Sidebar) */}
          <aside className="lg:col-span-1">
            <div className="card sticky top-4 space-y-6">
              <div>
                <h3 className="font-bold text-navy mb-3">Trade</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="trade"
                      value=""
                      checked={selectedTrade === ''}
                      onChange={e => setSelectedTrade(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>All trades</span>
                  </label>
                  {TRADES.map(trade => (
                    <label key={trade} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="trade"
                        value={trade}
                        checked={selectedTrade === trade}
                        onChange={e => setSelectedTrade(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{trade}</span>
                      <span className="text-stone text-sm">
                        ({mockProviders.filter(p => p.trade === trade).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-stone border-opacity-20" />

              <div>
                <h3 className="font-bold text-navy mb-3">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-stone border-opacity-30 rounded"
                >
                  <option value="">All locations</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="border-stone border-opacity-20" />

              <div>
                <h3 className="font-bold text-navy mb-3">Sort by</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="rating"
                      checked={sortBy === 'rating'}
                      onChange={e => setSortBy(e.target.value as 'rating')}
                      className="w-4 h-4"
                    />
                    <span>Rating (high to low)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="newest"
                      checked={sortBy === 'newest'}
                      onChange={e => setSortBy(e.target.value as 'newest')}
                      className="w-4 h-4"
                    />
                    <span>Newest first</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTrade('');
                  setSelectedLocation('');
                  setSortBy('rating');
                }}
                className="w-full py-2 text-navy font-bold border border-navy rounded hover:bg-navy hover:text-cream transition-colors"
              >
                Clear filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-stone">
                {filtered.length} provider{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map(provider => (
                  <Link key={provider.id} href={`/provider/${provider.id}`}>
                    <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="mb-4 bg-stone bg-opacity-10 rounded-lg aspect-square flex items-center justify-center">
                        <div className="text-5xl font-bold text-stone opacity-40">
                          {provider.name.charAt(0)}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="font-bold text-lg text-navy font-archivo">{provider.name}</div>
                          <div className="text-sm text-stone capitalize">{provider.trade}</div>
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

                        <div className="text-sm text-stone">{provider.location}</div>

                        {provider.distance && (
                          <div className="text-sm text-stone opacity-75">{provider.distance}</div>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="text-yellow-500 font-bold">★ {provider.rating.toFixed(1)}</div>
                          <div className="text-sm text-stone">({provider.reviewCount})</div>
                        </div>

                        <div className="text-brass font-bold font-archivo">{provider.priceRange}</div>

                        <button className="w-full mt-4 btn-primary text-sm">View profile</button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-stone text-lg">No providers found matching your criteria.</p>
                <p className="text-stone mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

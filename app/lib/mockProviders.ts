export interface Provider {
  id: string;
  name: string;
  trade: 'cleaning' | 'handyman' | 'electrician' | 'plumber';
  bio: string;
  location: string;
  serviceArea: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  hourlyRate?: string;
  yearsExperience: number;
  verified: boolean;
  verificationDate: string;
  services: string[];
  photos: string[];
  distance?: string;
}

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Dave Reyes',
    trade: 'plumber',
    bio: 'Licensed plumber with 19 years experience. Specializing in residential leaks, drain cleaning, and fixture installation. Same-day service available.',
    location: 'Toronto, ON',
    serviceArea: 'Toronto, Scarborough, Mississauga',
    rating: 4.8,
    reviewCount: 47,
    priceRange: '$120 first hour, $65 after',
    yearsExperience: 19,
    verified: true,
    verificationDate: 'March 2026',
    services: ['Leak repair', 'Drain cleaning', 'Fixture installation', 'Water heater', 'Pipe replacement'],
    photos: [],
    distance: '12 min away',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    trade: 'cleaning',
    bio: 'Professional house cleaner. Deep cleans, move-in/out, weekly maintenance. Eco-friendly products. Insured.',
    location: 'Toronto, ON',
    serviceArea: 'Toronto, East York',
    rating: 4.9,
    reviewCount: 132,
    priceRange: 'Starting at $150',
    yearsExperience: 8,
    verified: true,
    verificationDate: 'February 2026',
    services: ['Deep clean', 'Weekly maintenance', 'Move-in/out cleaning', 'Post-construction', 'Eco-friendly products'],
    photos: [],
    distance: '8 min away',
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    trade: 'electrician',
    bio: 'ESA-registered electrician. Rewiring, panel upgrades, troubleshooting. 24/7 emergency service available.',
    location: 'Scarborough, ON',
    serviceArea: 'Toronto, Scarborough, Markham',
    rating: 4.7,
    reviewCount: 83,
    priceRange: '$150 first hour, $85 after',
    yearsExperience: 15,
    verified: true,
    verificationDate: 'January 2026',
    services: ['Rewiring', 'Panel upgrades', 'Outlet installation', 'Troubleshooting', 'Emergency service'],
    photos: [],
    distance: '18 min away',
  },
  {
    id: '4',
    name: 'Tom Wilson',
    trade: 'handyman',
    bio: 'General handyman for all your home fixes. Drywall patching, mounting, shelving, small repairs. Quick turnaround.',
    location: 'Mississauga, ON',
    serviceArea: 'Mississauga, Oakville, Brampton',
    rating: 4.6,
    reviewCount: 71,
    priceRange: '$80 first hour, $50 after',
    yearsExperience: 12,
    verified: true,
    verificationDate: 'March 2026',
    services: ['Drywall repair', 'Mounting', 'Shelving', 'Door installation', 'General repairs'],
    photos: [],
    distance: '22 min away',
  },
  {
    id: '5',
    name: 'Lisa Park',
    trade: 'cleaning',
    bio: 'Licensed house cleaner with 10 years experience. I take pride in my work. Available weekends.',
    location: 'Toronto, ON',
    serviceArea: 'Toronto, North York',
    rating: 4.8,
    reviewCount: 98,
    priceRange: 'Starting at $140',
    yearsExperience: 10,
    verified: true,
    verificationDate: 'February 2026',
    services: ['Deep clean', 'Regular cleaning', 'Window cleaning', 'Move-in/out'],
    photos: [],
    distance: '15 min away',
  },
  {
    id: '6',
    name: 'Ahmed Hassan',
    trade: 'electrician',
    bio: 'Licensed electrician. Specializes in kitchen and bathroom upgrades, lighting, and troubleshooting. Free estimate.',
    location: 'Toronto, ON',
    serviceArea: 'Toronto, Etobicoke, York',
    rating: 4.9,
    reviewCount: 56,
    priceRange: '$140 first hour, $80 after',
    yearsExperience: 11,
    verified: true,
    verificationDate: 'March 2026',
    services: ['Kitchen upgrades', 'Bathroom lighting', 'Outlet replacement', 'Troubleshooting', 'Free estimates'],
    photos: [],
    distance: '10 min away',
  },
  {
    id: '7',
    name: 'James Rodriguez',
    trade: 'plumber',
    bio: 'Plumber with 12 years of experience. Drain cleaning, fixtures, leak repair. Call for emergency service.',
    location: 'Toronto, ON',
    serviceArea: 'Toronto, York, East York',
    rating: 4.7,
    reviewCount: 64,
    priceRange: '$130 first hour, $70 after',
    yearsExperience: 12,
    verified: true,
    verificationDate: 'January 2026',
    services: ['Drain cleaning', 'Leak repair', 'Fixture installation', 'Water heater', 'Emergency service'],
    photos: [],
    distance: '14 min away',
  },
  {
    id: '8',
    name: 'Emily Thompson',
    trade: 'handyman',
    bio: 'Experienced handyperson. Drywall, painting, minor repairs. Fair prices, professional work.',
    location: 'Scarborough, ON',
    serviceArea: 'Scarborough, Toronto',
    rating: 4.5,
    reviewCount: 44,
    priceRange: '$75 first hour, $48 after',
    yearsExperience: 8,
    verified: true,
    verificationDate: 'February 2026',
    services: ['Drywall repair', 'Painting', 'Minor repairs', 'Shelving', 'Door repair'],
    photos: [],
    distance: '16 min away',
  },
];

export function getProviderById(id: string): Provider | undefined {
  return mockProviders.find(p => p.id === id);
}

export function getProvidersByTrade(trade: string): Provider[] {
  return mockProviders.filter(p => p.trade === trade);
}

export function searchProviders(query: string, trade?: string, location?: string): Provider[] {
  return mockProviders.filter(provider => {
    const matchesQuery = provider.name.toLowerCase().includes(query.toLowerCase()) ||
      provider.trade.toLowerCase().includes(query.toLowerCase());
    const matchesTrade = !trade || provider.trade === trade;
    const matchesLocation = !location || provider.serviceArea.toLowerCase().includes(location.toLowerCase());
    return matchesQuery && matchesTrade && matchesLocation;
  });
}

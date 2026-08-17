import Link from 'next/link';
import VerifiedBadge from './VerifiedBadge';

interface ProviderCardProps {
  id: string;
  name: string;
  trade: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl?: string;
  distance?: string;
}

export default function ProviderCard({
  id,
  name,
  trade,
  location,
  rating,
  reviewCount,
  priceRange,
  imageUrl,
  distance,
}: ProviderCardProps) {
  return (
    <Link href={`/provider/${id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* Image */}
        <div className="mb-4 bg-stone bg-opacity-10 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl text-stone opacity-50 font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Name and trade */}
          <div>
            <div className="font-archivo font-bold text-lg text-navy">{name}</div>
            <div className="text-sm text-stone capitalize">{trade}</div>
          </div>

          {/* Verified badge */}
          <VerifiedBadge />

          {/* Location & distance */}
          <div className="text-sm text-stone">
            {location}
            {distance && <span className="block">{distance}</span>}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="text-yellow-500">★ {rating.toFixed(1)}</div>
            <div className="text-sm text-stone">({reviewCount} reviews)</div>
          </div>

          {/* Price */}
          <div className="text-brass font-archivo font-bold">{priceRange}</div>

          {/* CTA */}
          <button className="w-full mt-4 btn-primary text-sm">
            View profile
          </button>
        </div>
      </div>
    </Link>
  );
}

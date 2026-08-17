import { ReactNode } from 'react';

interface VerifiedBadgeProps {
  showDetails?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function VerifiedBadge({ showDetails = false, className = '' }: VerifiedBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-brass text-midnight rounded-full font-archivo font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      title="Click to see what we verified"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.418a3 3 0 01-.879 2.12l-6.182 6.182a3 3 0 01-4.243 0l-6.182-6.182a3 3 0 01-.879-2.12V6.517a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
          clipRule="evenodd"
        />
      </svg>
      Vetted
    </div>
  );
}

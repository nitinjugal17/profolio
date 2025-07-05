import * as React from 'react';
import Image from 'next/image';

export function Logo({ src }: { src?: string | null }) {
  if (src) {
    return (
      <div className="relative h-8 w-24 flex items-center"> 
        <Image 
          src={src} 
          alt="Profolio Logo" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M11 10H17.5C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19H11V10Z"
        fill="hsl(var(--primary-foreground))"
      />
      <path d="M11 16V22H14" stroke="hsl(var(--primary-foreground))" strokeWidth="2" />
    </svg>
  );
}

'use client';

import { useMemo } from 'react';

export function Background({ backgroundUrl }: { backgroundUrl?: string }) {
  const isVideo = useMemo(() => {
    if (!backgroundUrl) return false;
    try {
      const url = new URL(backgroundUrl);
      return url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm');
    } catch (e) {
      return backgroundUrl.endsWith('.mp4') || backgroundUrl.endsWith('.webm');
    }
  }, [backgroundUrl]);

  if (!backgroundUrl) return null;

  if (isVideo) {
    return (
      <video
        key={backgroundUrl}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src={backgroundUrl} type={backgroundUrl.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
      </video>
    );
  }

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    />
  );
}

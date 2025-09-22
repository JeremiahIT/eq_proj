"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ContentCardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const handleWheel = (event: WheelEvent) => {
      if (hasNavigatedRef.current) return;
      if (event.deltaY < -20) {
        hasNavigatedRef.current = true;
        router.back();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (hasNavigatedRef.current) return;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - currentY; // positive if swiping up, negative if swiping down
      if (deltaY < -30) {
        hasNavigatedRef.current = true;
        router.back();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel as EventListener);
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
    };
  }, [router]);

  return (
    <div className={`min-h-screen flex flex-col p-4 bg-gradient-to-b from-[#000000] to-[#160300] text-white relative overflow-hidden transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <header className="absolute top-0 right-0 p-8 flex space-x-4 z-10">
        <button onClick={() => router.push('/')} className="text-white hover:text-gray-400 font-bold transition duration-300">HOME</button>
        <button onClick={() => router.push('/video')} className="text-white hover:text-gray-400 font-bold transition duration-300">WATCH VIDEO</button>
        <button onClick={() => router.push('/about')} className="text-white hover:text-gray-400 font-bold transition duration-300">ABOUT ME</button>
      </header>

      <main className="flex-1 flex items-start justify-center pt-32 pb-12">
        <div className={`w-full max-w-6xl grid grid-cols-1 gap-6 items-start justify-center`}>
          {["/1.png"].map((src, idx) => (
            <div key={src} className={`overflow-hidden transition-all duration-500 ease-out rounded-[24px] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: `${idx * 80}ms` }}>
              <div className="relative w-full aspect-[4/3]">
                <img src={src} alt={`Content ${idx + 1}`} className="absolute inset-0 w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
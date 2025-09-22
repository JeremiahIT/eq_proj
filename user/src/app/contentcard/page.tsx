'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ContentCardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const handleWheel = (event: WheelEvent) => {
      if (hasNavigatedRef.current || isModalOpen) return;
      // Scroll down to navigate
      if (event.deltaY > 20) {
        hasNavigatedRef.current = true;
        router.push('/activitycard');
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (hasNavigatedRef.current || isModalOpen) return;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - currentY; // positive if swiping up, negative if swiping down
      // Swipe up to navigate
      if (deltaY > 30) {
        hasNavigatedRef.current = true;
        router.push('/activitycard');
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
  }, [router, isModalOpen]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Overview', path: '/overview' },
    { name: 'Content Card', path: '/contentcard' },
    { name: 'Word Hunt', path: '/wordhunt' },
    { name: 'Assessment', path: '/assesment' },
    { name: 'Activity Card', path: '/activitycard' },
    { name: 'Answer Key', path: '/answerkey' },
    { name: 'Reference', path: '/reference' },
  ];

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setIsModalOpen(false); // Close modal on navigation
  };

  return (
    <div className={`min-h-screen flex flex-col p-4 bg-gradient-to-b from-[#000000] to-[#160300] text-white relative overflow-hidden transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <header className="absolute top-0 right-0 p-8 flex space-x-4 z-10">
        <button onClick={() => router.push('/')} className="text-white hover:text-gray-400 font-bold transition duration-300">HOME</button>
        <button onClick={() => router.push('/video')} className="text-white hover:text-gray-400 font-bold transition duration-300">WATCH VIDEO</button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          MENU
        </button>
      </header>

      <main className="flex-1 flex items-start justify-center pt-32 pb-12">
        <div className={`w-full max-w-6xl grid grid-cols-1 gap-6 items-start justify-center`}>
          {["/1.png"].map((src, idx) => (
            <div key={src} className={`overflow-hidden transition-all duration-500 ease-out rounded-[24px] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: `${idx * 80}ms` }}>
              <div className="relative w-full aspect-[4/3]">
                {/* Note: Added placeholder width/height, replace with actual values for best performance */}
                <Image src={src} alt={`Content ${idx + 1}`} layout="fill" objectFit="contain" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg p-8 w-11/12 max-w-md relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-extrabold text-white text-center mb-6 font-orbitron">
              MENU
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuItemClick(item.path)}
                  className="bg-gray-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg border border-gray-700 hover:border-orange-500/50"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </div>
  );
}
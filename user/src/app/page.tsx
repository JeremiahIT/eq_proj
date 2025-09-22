'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleWheel = (event: WheelEvent) => {
      if (hasNavigatedRef.current) return;
      if (event.deltaY > 20) {
        hasNavigatedRef.current = true;
        router.push('/overview');
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (hasNavigatedRef.current) return;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - currentY; // positive if swiping up (scroll down)
      if (deltaY > 30) {
        hasNavigatedRef.current = true;
        router.push('/overview');
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

  const menuItems = [
    { name: 'Overview', path: '/overview' },
    { name: 'Content Card', path: '/contentcard' },
    { name: 'Word Hunt', path: '/wordhunt' },
    { name: 'Assessment', path: '/assesment' },
    { name: 'Activity Card', path: '/activitycard' },
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
        <button
          onClick={() => router.push('/')}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          HOME
        </button>
        <button
          onClick={() => router.push('/video')}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          WATCH VIDEO
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          MENU
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-0">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl px-4">
          {/* Left Section: Teacher's Info and Image */}
          <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-8 flex-1">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-white text-shadow-lg animate-fade-in-down">
              ELECTRONIC STRATEGIC INTERVENTION
            </h1>
            <h2 className="text-base md:text-xl font-medium mb-8 text-gray-300 animate-fade-in-down delay-200">
              MATERIALS IN SCIENCE 6
            </h2>
            <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden shadow-lg animate-fade-in-left">
              {/* Added div for the gradient circle background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-900 rounded-full z-0"></div>
              <Image
                src="/boy.png"
                alt="Mark Randolph G. Sanchez"
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="relative z-10" // Make sure the image is above the background
              />
            </div>
            <div className="mt-4 text-center animate-fade-in-up delay-400">
              <p className="text-xl md:text-2xl font-semibold text-white">
                MARK RANDOLPH G. SANCHEZ
              </p>
              <p className="text-md md:text-xl text-gray-400">
                Science Teacher
              </p>
            </div>
          </div>

          {/* Right Section: Title Card with Effects */}
          <div className="flex-1 flex justify-center items-center relative w-[700px] h-[700px] md:w-[900px] md:h-[900px]">
            {/* Title with AI-like effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[150%] z-10 w-full text-center">
            </div>
            {/* Title Card Image with Shakey Bounce Effect */}
            <div className="relative w-full h-full animate-shakey-bounce">
              <Image
                src="/titlecard.png"
                alt="Earthquake and Volcano Title Card"
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
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
            <h2 className="text-3xl font-extrabold text-white text-center mb-6 font-sans">
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

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes shakey-bounce {
          0%, 100% {
            transform: translate(0, 0);
          }
          15% {
            transform: translate(5px, -5px);
          }
          30% {
            transform: translate(-5px, 5px);
          }
          45% {
            transform: translate(0, -10px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          75% {
            transform: translate(-5px, -5px);
          }
          90% {
            transform: translate(0, 5px);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-glitch {
          animation: glitch 1s infinite;
        }

        .animate-shakey-bounce {
          animation: shakey-bounce 2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .text-shadow-lg {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
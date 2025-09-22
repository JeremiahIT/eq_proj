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

  const teachers = [
    {
      id: 1,
      name: "Mark Randolph G. Sanchez",
      role: "Science Teacher",
      image: "/boy.png",
      alt: "Mark Randolph G. Sanchez",
    },
    {
      id: 2,
      name: "Gayzle G. Contreras",
      role: "School Head",
      image: "/girl.png",
      alt: "Gayzle G. Contreras",
    },
  ];

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
          onClick={() => router.push('/about')}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          MENU
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center pt-8 text-center">
        {/* Main Title - ENHANCED with AI-like glow and futuristic look */}
        <div className="flex flex-col mr-auto ml-8 text-left animate-text-glow">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-wide">
            <span className="font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 drop-shadow-lg leading-tight">
              CONVENTIONAL STRATEGIC
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl mt-2 font-rajdhani text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 drop-shadow-md leading-snug">
            INTERVENTION MATERIALS
            IN SCIENCE 6
          </h2>
        </div>

        {/* Title Card on semi-right */}
        <div className="absolute -top-25 right-5 w-[1200px] h-[1200px] animate-pulse-glow">
          <Image
            src="/titlecard.png"
            alt="Title Card"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
        </div>

        {/* Teachers Section - Now a 3D card carousel on the left */}
        <div className="absolute bottom-[45%] translate-y-1/2 left-[20%] transform -translate-x-1/2 w-full max-w-lg z-20">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher.id}>
                <div className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl p-4 flex flex-col items-center w-full h-full border border-transparent transition-all duration-500 hover:border-orange-500/50 hover:shadow-3d-orange">
                  <div className="relative w-64 h-64 mb-4 transform transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={teacher.image}
                      alt={teacher.alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="text-center mt-auto transform transition-transform duration-500 group-hover:translate-y-1">
                    <p className="text-xl font-bold">{teacher.name}</p>
                    <p className="text-lg font-light text-gray-300">{teacher.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      {/* Add custom keyframes for the animation */}
      <style jsx global>{`
        /* Import Google Fonts for futuristic look */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@500;700&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        .font-rajdhani {
          font-family: 'Rajdhani', sans-serif;
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.02);
            filter: brightness(1.2);
            opacity: 0.95;
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        /* NEW: Text glow animation for the title */
        @keyframes text-glow-animation {
          0%, 100% {
            text-shadow: 
              0 0 5px rgba(128, 0, 128, 0.7), /* Purple glow */
              0 0 10px rgba(0, 0, 255, 0.5),  /* Blue glow */
              0 0 15px rgba(255, 0, 0, 0.3);  /* Red glow */
          }
          50% {
            text-shadow: 
              0 0 8px rgba(255, 0, 255, 0.9), /* More intense pink/purple */
              0 0 15px rgba(0, 191, 255, 0.7), /* Cyan glow */
              0 0 20px rgba(255, 100, 0, 0.5); /* Orange glow */
          }
        }
        .animate-text-glow {
          animation: text-glow-animation 4s ease-in-out infinite alternate;
        }

        /* Custom glow shadow for the cards on hover */
        .hover\\:shadow-3d-orange:hover {
          box-shadow: 0 0 15px rgba(255, 120, 0, 0.5), 0 0 30px rgba(255, 120, 0, 0.3), 0 0 45px rgba(255, 120, 0, 0.1);
        }

        /* Swiper styles for the card carousel */
        .swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 350px;
          height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        /* Custom Swiper Navigation (Arrows) */
        .swiper-button-next, .swiper-button-prev {
          color: #ff7800 !important;
          top: 50% !important;
          transform: translateY(-50%) scale(0.8) !important;
          transition: all 0.3s ease-in-out;
          opacity: 0.5;
        }

        .swiper-button-next:hover, .swiper-button-prev:hover {
          transform: translateY(-50%) scale(1) !important;
          opacity: 1;
        }
        
        /* Custom Swiper Pagination (Dots) */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          width: 10px !important;
          height: 10px !important;
          margin: 0 5px !important;
          transition: all 0.3s ease-in-out;
        }

        .swiper-pagination-bullet-active {
          background: #ff7800 !important;
          width: 15px !important;
          height: 15px !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
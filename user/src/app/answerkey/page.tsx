'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AnswerKeyCard() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the modal

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
  };

  useEffect(() => {
    setMounted(true);
    const handleAutoNavigation = () => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);

      if (hasNavigatedRef.current) return;
      if (isAtBottom) {
        hasNavigatedRef.current = true;
        router.push('/reference');
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 20) {
        handleAutoNavigation();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - currentY;
      if (deltaY > 30) {
        handleAutoNavigation();
      }
    };

    window.addEventListener('wheel', handleWheel as EventListener);
    window.addEventListener('touchstart', onTouchStart as EventListener);
    window.addEventListener('touchmove', onTouchMove as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as EventListener);
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
    };
  }, [router]);

  const cardStyle = "bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 relative";
  const headerStyle = "p-4 px-12 rounded-full shadow-lg relative z-10 text-white";

  return (
    <div className={`min-h-screen p-8 flex flex-col items-center bg-gradient-to-b from-[#000000] to-[#160300] text-white transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      {/* Header for navigation */}
      <header className="absolute top-0 right-0 p-8 flex space-x-4 z-20">
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
        {/* Updated MENU button to open the modal */}
        <button
          onClick={openMenu}
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          MENU
        </button>
      </header>

      {/* Answer Key Card Header */}
      <div className="relative mb-8 mt-20">
        <div className={`${headerStyle}`}>
          <div className="w-full max-w-sm mx-auto">
            <div className="w-full h-24 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder-answer-key-card.png')" }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Activity 1 Answer Key */}
        <div className={`${cardStyle} transform rotate-1`}>
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center absolute -top-4 -left-4">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Activity 1:</h2>
          <ul className="space-y-2 text-lg font-medium text-gray-200">
            <li className="flex items-center">
              <span className="text-xl mr-2">1. ✅</span>
              <span>Studying the evacuation plan before the disaster strikes.</span>
            </li>
            <li className="flex items-center">
              <span className="text-xl mr-2">2. ❌</span>
              <span>Panic and run. Ignore the people in front of you.</span>
            </li>
            <li className="flex items-center">
              <span className="text-xl mr-2">3. ✅</span>
              <span>Make sure to have an emergency bag.</span>
            </li>
            <li className="flex items-center">
              <span className="text-xl mr-2">4. ❌</span>
              <span>Stay outside, take a selfie.</span>
            </li>
            <li className="flex items-center">
              <span className="text-xl mr-2">5. ✅</span>
              <span>Stay updated with the news.</span>
            </li>
          </ul>
        </div>

        {/* Activity 2 Answer Key */}
        <div className={`${cardStyle} transform -rotate-1`}>
          <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center absolute -top-4 -right-4">
            <span className="text-2xl">🧩</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Activity 2:</h2>
          <ul className="space-y-2 text-lg font-medium text-gray-200">
            <li>1. YES</li>
            <li>2. NO</li>
            <li>3. YES</li>
            <li>4. YES</li>
            <li>5. NO</li>
          </ul>
        </div>

        {/* Activity 3 Answer Key */}
        <div className={`${cardStyle} transform rotate-2`}>
          <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center absolute -bottom-4 -left-4">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Activity 3:</h2>
          <ul className="space-y-2 text-lg font-medium text-gray-200">
            <li>1. DURING</li>
            <li>2. ERUPTS</li>
            <li>3. SURVIVAL</li>
            <li>4. DRILLS</li>
            <li>5. CALM</li>
          </ul>
        </div>

        {/* Assessment Card Answer Key */}
        <div className={`${cardStyle} transform -rotate-2 md:col-span-2 md:w-1/2 mx-auto`}>
          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center absolute -top-4 -right-4">
            <span className="text-2xl">💯</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Assessment Card</h2>
          <div className="grid grid-cols-2 gap-4 text-lg font-medium text-gray-200">
            <div>1. C</div>
            <div>6. D</div>
            <div>2. D</div>
            <div>7. D</div>
            <div>3. A</div>
            <div>8. A</div>
            <div>4. A</div>
            <div>9. C</div>
            <div>5. D</div>
            <div>10. C</div>
          </div>
        </div>
      </div>

      {/* --- MENU MODAL --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/20 w-80 relative flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-6">Menu</h2>
            <div className="flex flex-col space-y-4 w-full">
              <button
                onClick={() => handleNavigation('/overview')}
                className="bg-purple-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-600 transition-colors duration-300"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavigation('/contentcard')}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Content Card
              </button>
              <button
                onClick={() => handleNavigation('/wordhunt')}
                className="bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition-colors duration-300"
              >
                Word Hunt
              </button>
              <button
                onClick={() => handleNavigation('/assesment')}
                className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-300"
              >
                Assessment
              </button>
              <button
                onClick={() => handleNavigation('/activitycard')}
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                Activity Card
              </button>
              <button
                onClick={() => handleNavigation('/answerkey')}
                className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-teal-600 transition-colors duration-300"
              >
                Answer Key
              </button>
              <button
                onClick={() => handleNavigation('/reference')}
                className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                Reference
              </button>
            </div>
            <button
              onClick={closeMenu}
              className="mt-6 text-gray-300 hover:text-white transition-colors duration-300 text-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
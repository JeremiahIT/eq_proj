'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function CombinedActivityCards() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        router.push('/assesment');
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

  return (
    <div className={`min-h-screen flex flex-col p-4 bg-gradient-to-b from-[#000000] to-[#160300] text-white relative overflow-hidden transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
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

      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <div className={`max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 transition-all duration-500 ease-out ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Key Takeaway Box - Moved to the top */}
          <div className="border-2 border-yellow-400 bg-yellow-400/20 p-6 rounded-2xl mb-8 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-400 opacity-10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm3 1a1 1 0 100-2h-2a1 1 0 100 2h2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">Key Takeaway</h3>
                <p className="text-lg text-white font-medium">
                  Disasters like earthquakes and volcanic eruptions may strike without warning, but **being prepared** is something we can always do. The lessons we learned today are not only for school but also for our everyday life. Remember, **preparedness saves lives**, and every precaution we practice can protect us and the people we love.
                  <br /><br />
                  Let us take every drill and every lesson seriously, because safety is not just a subject—it is a **way of life**.
                </p>
              </div>
            </div>
          </div>
          {/* End of Key Takeaway Box */}
          
          <div className="flex justify-center items-center relative mb-8">
            <div className="relative z-10">
              <Image src="/referencecard.png" alt="Reference Card" width={200} height={150} className="w-96" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">Books and Modules</h2>
          <div className="mb-8">
            <ul className="space-y-4 text-lg text-gray-200">
              <li>
                Alumaga, Marie Jesica M, Thelma, Padua, Alicia, Joaquin, Crescencia, Rabago, Lilia. 2016,
                <br />
                <span className="font-semibold">Science and You 6:</span> Vidal Group, Inc. pages 240-241-245-246.
              </li>
              <li>
                <span className="font-semibold">Earthquakes and Safety Precautions Must Be Taken at the Occurrence of Earthquakes | Science Online.</span> 28 May 2014, <span className="italic">www.online-sciences.com/earth-and-motion/earthquakes-and-safety-precautions-must-be-taken-at-the-occurrence-of-earthquakes/</span>. Accessed 10 Jan. 2022.
              </li>
              <li>
                Juanito M. Cruz, Danilo S. Gutierrez, Victoria S. Ziganay, Helen E. Caintic, Copyright 2001,
                <br />
                <span className="font-semibold">Into the Future: Science and Health 6.</span> Manila Philippines.
              </li>
              <li>
                Madrid, D. S. (Ed.). (2020). <span className="font-semibold">Precautionary Measures Before, During, and After an Earthquake and Volcanic Eruptions</span> (Science – Grade 6, Alternative Delivery Mode, Quarter 4 – Module 2). First Edition. Department of Education.
              </li>
              <li>
                Padpad,Evelyn, Apolinario, Nenita, Santos, Gil Nonato, 2017,
                <br />
                <span className="font-semibold">The New Science Links 6,</span> Rex Book Store pages 400-401,409-410.
              </li>
              <li>
                Sarte, Evelyn, Garcia, Ednaliza, Lopez, Eliza, Dela Cruz, Mary Jean and Arradaza, Harold. 2016.
                <br />
                <span className="font-semibold">Science Beyond Borders 6.</span> Quezon City. Vibal Group, Inc. pages 190-194.
              </li>
            </ul>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">Websites</h2>
          <div className="space-y-4 text-lg text-gray-200">
            <ul className="space-y-2">
              <li>
                <a href="https://www.phivolcs.dost.gov.ph/index.php/volcano-hazard/volcano-preparedness" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                  https://www.phivolcs.dost.gov.ph/index.php/volcano-hazard/volcano-preparedness
                </a>
              </li>
              <li>
                <a href="https://www.phivolcs.dost.gov.ph/index.php/earthquake/earthquake-preparedness" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                  https://www.phivolcs.dost.gov.ph/index.php/earthquake/earthquake-preparedness
                </a>
              </li>
              <li>
                <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                  https://www.canva.com/
                </a>
              </li>
              <li>
                <a href="https://www.studocu.com/ph/document/ama-university/secondary-education-in-math/science-6-q4-module-2-what-to-do-before-during-and-after-an-earthquake-and-volcanic/57427783/download/science-6-q4-module-2-what-to-do-before-during-and-after-aearthquake-and-volcanic.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                  https://www.studocu.com/ph/document/ama-university/secondary-education-in-math/science-6-q4-module-2-what-to-do-before-during-and-after-an-earthquake-and-volcanic/57427783/download/science-6-q4-module-2-what-to-do-before-during-and-after-aearthquake-and-volcanic.pdf
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

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
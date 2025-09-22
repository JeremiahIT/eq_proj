'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function CombinedActivityCards() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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

  useEffect(() => {
    setMounted(true);
    const handleWheel = (event: WheelEvent) => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);

      if (hasNavigatedRef.current) return;
      if (event.deltaY > 20 && isAtBottom) {
        hasNavigatedRef.current = true;
        router.push('/assesment');
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);

      if (hasNavigatedRef.current) return;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - currentY;
      if (deltaY > 30 && isAtBottom) {
        hasNavigatedRef.current = true;
        router.push('/assesment');
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
    <div className={`min-h-screen p-8 flex flex-col items-center bg-gradient-to-b from-[#000000] to-[#160300] text-white transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      {/* Header for navigation */}
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
          onClick={() => setIsModalOpen(true)} // Open the modal on click
          className="text-white hover:text-gray-400 font-bold transition duration-300"
        >
          MENU
        </button>
      </header>

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

      {/* Activity 1 Content */}
      <div className="w-full max-w-4xl mt-20">
        {/* Activity Card Header */}
        <div className="flex justify-center items-center relative mb-8">
          <div className="bg-[#ffcc00] p-4 px-12 rounded-full shadow-lg relative z-10">
            <h1 className="text-3xl font-bold text-gray-800">Activity Card</h1>
          </div>
          {/* Bee and pencil decoration */}
          <div className="absolute right-0 top-0 mr-12 -mt-4 z-20">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-4xl">🐝</span>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden mb-8">
          {/* Removed Decorative hexagons */}

          <h2 className="text-2xl font-semibold mb-2 text-white">Activity 1: Safety Check</h2>
          <p className="text-gray-200 mb-8">
            Instructions: Study the following illustrations. Put a check mark ✅ if the illustration shows safety precautions and ❌ if not.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative p-4 border border-white/20 rounded-lg">
              <div className="relative h-48 w-full rounded-md mb-2">
                <Image src="/video.png" alt="Students are hiding under a sturdy desk during an earthquake." layout="fill" objectFit="cover" className="rounded-md" />
              </div>
              <p className="text-center text-sm text-gray-200">1. Pls. Refer to the Video Lesson</p>
              <div className="absolute top-2 right-2 w-8 h-8 border-2 border-yellow-500 bg-yellow-100 rounded-md"></div>
            </div>
           
           
           
          </div>
        </div>
      </div>

      {/* Activity 2 Content */}
      <div className="w-full max-w-4xl mt-8">
        {/* Top Banner and Hexagons */}
        <div className="flex justify-between items-start w-full mb-8 relative">
          <div className="bg-orange-400 p-4 px-12 rounded-full shadow-lg -rotate-6 transform -skew-y-3 relative z-10">
            <h1 className="text-xl font-bold text-gray-800">Activity 2</h1>
            <h2 className="text-3xl font-bold text-white mt-1">&quot;Yes or No&quot;</h2>
          </div>
          <div className="flex flex-col space-y-2 absolute top-0 right-0 m-4">
            <div className="w-10 h-10 bg-[#ff9900] transform -rotate-45 skew-y-12"></div>
            <div className="w-10 h-10 bg-[#ffcc66] transform -rotate-45 skew-y-12"></div>
            <div className="w-10 h-10 bg-[#ffcc33] transform -rotate-45 skew-y-12"></div>
          </div>
        </div>

        {/* What's In Card */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 w-full relative z-20">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 mr-4">
              <div className="bg-white/5 w-full h-full rounded-full flex items-center justify-center">
                <span className="text-3xl text-gray-200">🧩</span>
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-white">What&apos;s In</h3>
          </div>
          <p>
            <span className="font-bold">Direction:</span> Read each situation carefully. Write{" "}
            <span className="font-bold">Yes</span> if the action shows the correct safety measure, and{" "}
            <span className="font-bold">No</span> if it does not. Write your answers on a separate sheet of paper.
          </p>
          <ul className="space-y-4 text-lg">
            <li>1. During an earthquake, Ana quickly hides under a sturdy table to protect herself. <strong>Yes</strong></li>
            <li>2. While playing outside, Pedro sees ashfall from a volcanic eruption and decides not to wear a mask. <strong>No</strong></li>
            <li>3. During an earthquake drill, students calmly walk to the evacuation area without pushing. <strong>Yes</strong></li>
            <li>4. Juan and his family stay near the river even after PHILVOCS warns of possible lahar flow from the volcano. <strong>No</strong></li>
            <li>5. After an earthquake, Maria checks if her younger siblings are safe before leaving the house. <strong>Yes</strong></li>
          </ul>
        </div>
      </div>

      {/* Activity 3 Content */}
      <div className="w-full max-w-4xl mt-8 pb-12">
        {/* Activity 3 Header */}
        <div className="flex justify-start items-center relative z-20 mb-8">
          <div className="bg-orange-400 p-4 px-12 rounded-full shadow-lg -rotate-6 transform -skew-y-3 relative z-10">
            <h3 className="text-xl font-bold text-gray-800">Activity 3</h3>
            <h4 className="text-3xl font-bold text-white mt-1">Word Fill Challenge</h4>
          </div>
        </div>

        {/* Word Fill Challenge Card */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 w-full relative z-20">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-24 h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              {/* Placeholder for the pencil with glasses logo */}
              <div className="bg-white/5 w-full h-full rounded-full flex items-center justify-center">
                <span className="text-4xl">🤓✏️</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-200">
                Fill in the blanks with the correct word to complete each sentence. Choose your answer from the box!
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center text-xl font-bold text-white">
                <span className="bg-white/10 p-2 rounded-lg">CALM</span>
                <span className="bg-white/10 p-2 rounded-lg">DRILLS</span>
                <span className="bg-white/10 p-2 rounded-lg">ERUPTS</span>
                <span className="bg-white/10 p-2 rounded-lg">STOPS</span>
                <span className="bg-white/10 p-2 rounded-lg">DURING</span>
                <span className="bg-white/10 p-2 rounded-lg">SURVIVAL</span>
              </div>
            </div>
          </div>

          <ul className="space-y-6 mt-8 text-gray-200">
            <li className="bg-white/5 p-4 rounded-lg flex items-center">
              <span className="mr-4 font-bold text-white">1.</span>
              Knowing what to do before, _________, and after earthquake and volcanic eruption can protect yourself against their harmful effects.
            </li>
            <li className="bg-white/5 p-4 rounded-lg flex items-center">
              <span className="mr-4 font-bold text-white">2.</span>
              Be ready before a volcano _________.
            </li>
            <li className="bg-white/5 p-4 rounded-lg flex items-center">
              <span className="mr-4 font-bold text-white">3.</span>
              Prepare an emergency or a _________ kit.
            </li>
            <li className="bg-white/5 p-4 rounded-lg flex items-center">
              <span className="mr-4 font-bold text-white">4.</span>
              Conduct and participate in regular earthquake _________.
            </li>
            <li className="bg-white/5 p-4 rounded-lg flex items-center">
              <span className="mr-4 font-bold text-white">5.</span>
              Stay as _________ as possible if you feel an earthquake.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
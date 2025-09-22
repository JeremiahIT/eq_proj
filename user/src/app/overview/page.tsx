 "use client";

 import { useRouter } from 'next/navigation';
 import { useEffect, useRef, useState } from 'react';

 export default function OverviewPage() {
   const router = useRouter();
   const hasNavigatedRef = useRef(false);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
     setMounted(true);
     const handleWheel = (event: WheelEvent) => {
       if (hasNavigatedRef.current) return;
      if (event.deltaY < -20) {
         hasNavigatedRef.current = true;
         router.back();
      } else if (event.deltaY > 20) {
        hasNavigatedRef.current = true;
        router.push('/wordhunt');
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
      } else if (deltaY > 30) {
        hasNavigatedRef.current = true;
        router.push('/wordhunt');
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
     <div className={`min-h-screen flex flex-col p-4 bg-gradient-to-b from-[#000000] to-[#160300] text-white relative overflow-hidden transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      {/* Header (same as home) */}
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

      <main className="flex-1 flex items-center justify-center pt-24 pb-12">
        <div className={`max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 transition-all duration-500 ease-out ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Guide Card */}
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-sm font-semibold tracking-wide">
              Guide Card
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold">LEAST LEARNED COMPETENCY</h2>
            <p className="mt-2 text-gray-200 text-base sm:text-lg">
              Enumerate what to do before, during and after earthquake and volcanic eruptions.
            </p>
            <p className="mt-1 text-gray-400 text-sm">(S6ES - IVb - 2)</p>
          </div>

          {/* SIM Aims */}
          <div className="mb-10">
            <p className="text-lg leading-relaxed mb-3 font-semibold">
              This SIM aims to...
            </p>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-gray-200">
              <li>Describe what to do before, during, and after earthquake and volcanic eruptions;</li>
              <li>Enumerate ways on what to do before, during, and after earthquake and volcanic eruptions;</li>
              <li>Show safety awareness before, during and after earthquake and volcanic eruptions.</li>
            </ul>
          </div>

          {/* Earthquake Lesson for Students */}
          <section>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Earthquake Lesson for Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-orange-400/40 hover:translate-y-[-2px]">
                <h4 className="text-lg font-semibold text-orange-300 mb-2">Before</h4>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Prepare a Go-Bag (water, food, flashlight, whistle).</li>
                  <li>Know safe spots at home and school.</li>
                  <li>Secure heavy furniture and objects.</li>
                  <li>Practice “Drop, Cover, and Hold On”.</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-orange-400/40 hover:translate-y-[-2px]">
                <h4 className="text-lg font-semibold text-orange-300 mb-2">During</h4>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Drop to your hands and knees.</li>
                  <li>Cover your head and neck under sturdy furniture.</li>
                  <li>Hold on until shaking stops.</li>
                  <li>Stay away from windows and heavy objects.</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-orange-400/40 hover:translate-y-[-2px]">
                <h4 className="text-lg font-semibold text-orange-300 mb-2">After</h4>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Move carefully to an open, safe area.</li>
                  <li>Expect aftershocks; stay alert.</li>
                  <li>Check for injuries and hazards (gas leaks, broken glass).</li>
                  <li>Listen to authorities for instructions.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
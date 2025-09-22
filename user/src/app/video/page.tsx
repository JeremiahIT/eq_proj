'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function VideoPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const menuItems = [
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

  // Your YouTube video ID from the provided link
  const youtubeVideoId = 'oeN6dB299pM';

  return (
    <>
      <style jsx>{`
        /* Custom CSS for the animated lava effect */
        .lava-effect {
          background-image: url('/lava_bg.png');
          background-size: cover;
          animation: lava-glow 15s linear infinite alternate;
        }
        @keyframes lava-glow {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1) translate(10px, -10px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.6;
          }
        }
        /* Keyframes for modal animation */
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
      `}</style>

      <div className="relative min-h-screen flex flex-col">
        {/* Animated Lava Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#000000] to-[#160300]">
          <div className="lava-effect absolute inset-0 w-full h-full opacity-60"></div>
        </div>

        {/* Main Content (placed on top of the background) */}
        <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-8 text-white">
          {/* Header with Go Back Button and Social Media Links */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={handleGoBack}
                className="text-white hover:text-gray-400 font-bold transition duration-300"
                aria-label="Go Back"
              >
                BACK
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white hover:text-gray-400 font-bold transition duration-300"
            >
              MENU
            </button>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/20 p-4">
              {isPlaying ? (
                // YouTube player using iframe
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                // "Play Video" button
                <div className="flex-grow flex items-center justify-center p-4">
                  <button
                    onClick={handlePlayVideo}
                    className="flex items-center justify-center space-x-2 bg-white/20 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-white/30 transition-colors transform hover:scale-105"
                  >
                    <span>Play Video</span>
                  </button>
                </div>
              )}
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
          
          {/* You can add a footer or other content here if needed */}
          <footer className="text-center text-gray-400 mt-8">
            <p>&copy; {new Date().getFullYear()} My Video Site. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
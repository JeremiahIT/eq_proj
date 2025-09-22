'use client';

import { useState } from "react";

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleGoBack = () => {
    window.history.back();
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
                className="bg-white/10 backdrop-blur-xl text-white p-3 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
                aria-label="Go Back"
              >
               
              </button>
            </div>
          
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

          {/* You can add a footer or other content here if needed */}
          <footer className="text-center text-gray-400 mt-8">
            <p>&copy; {new Date().getFullYear()} My Video Site. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
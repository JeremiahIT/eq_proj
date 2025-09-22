"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export default function WordHuntPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasNavigatedRef = useRef(false);
  const WORDS = [
    'EARTHQUAKE', 'ERUPTION', 'AFTERSHOCK', 'TSUNAMI', 'DROP',
    'HOLD', 'COVER', 'MAGMA', 'EMERGENCY', 'PREPAREDNESS'
  ];
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [hoverCell, setHoverCell] = useState<{ r: number; c: number } | null>(null);
  const [lockedCells, setLockedCells] = useState<Set<string>>(new Set());

  const GRID_SIZE = 14;
  // Seeded RNG (mulberry32) to make grid generation deterministic across renders
  const createRng = (seed: number) => {
    let t = seed + 0x6D2B79F5;
    return () => {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  };
  const DIRECTIONS = [
    { dr: 0, dc: 1 },    // right
    { dr: 0, dc: -1 },   // left
    { dr: 1, dc: 0 },    // down
    { dr: -1, dc: 0 },   // up
    { dr: 1, dc: 1 },    // down-right
    { dr: 1, dc: -1 },   // down-left
    { dr: -1, dc: 1 },   // up-right
    { dr: -1, dc: -1 },  // up-left
  ];

  type PlacedWord = { word: string; cells: Array<{ r: number; c: number }>; };

  const { grid }: { grid: string[][]; placed: PlacedWord[] } = useMemo(() => {
    const rng = createRng(1337); // fixed seed
    const gridArr: string[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(''));
    const placedWords: PlacedWord[] = [];

    const canPlace = (word: string, r: number, c: number, dr: number, dc: number) => {
      for (let i = 0; i < word.length; i++) {
        const rr = r + dr * i;
        const cc = c + dc * i;
        if (rr < 0 || rr >= GRID_SIZE || cc < 0 || cc >= GRID_SIZE) return false;
        const ch = gridArr[rr][cc];
        if (ch && ch !== word[i]) return false;
      }
      return true;
    };

    const placeWord = (word: string) => {
      const attempts = 200;
      for (let attempt = 0; attempt < attempts; attempt++) {
        const dir = DIRECTIONS[Math.floor(rng() * DIRECTIONS.length)];
        const maxR = dir.dr === 1 ? GRID_SIZE - word.length : dir.dr === -1 ? word.length - 1 : GRID_SIZE - 1;
        const minR = dir.dr === -1 ? word.length - 1 : 0;
        const maxC = dir.dc === 1 ? GRID_SIZE - word.length : dir.dc === -1 ? word.length - 1 : GRID_SIZE - 1;
        const minC = dir.dc === -1 ? word.length - 1 : 0;
        const r = Math.floor(rng() * (maxR - minR + 1)) + minR;
        const c = Math.floor(rng() * (maxC - minC + 1)) + minC;
        if (canPlace(word, r, c, dir.dr, dir.dc)) {
          const cells: Array<{ r: number; c: number }> = [];
          for (let i = 0; i < word.length; i++) {
            const rr = r + dir.dr * i;
            const cc = c + dir.dc * i;
            gridArr[rr][cc] = word[i];
            cells.push({ r: rr, c: cc });
          }
          placedWords.push({ word, cells });
          return true;
        }
      }
      return false;
    };

    // Place words (deterministically decide to reverse some to allow backwards)
    WORDS.forEach((w) => {
      const reverse = rng() < 0.5;
      const word = reverse ? w.split('').reverse().join('') : w;
      placeWord(word);
    });

    // Fill remaining with random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!gridArr[r][c]) gridArr[r][c] = alphabet[Math.floor(rng() * alphabet.length)];
      }
    }
    return { grid: gridArr, placed: placedWords };
  }, [DIRECTIONS, WORDS]);

  const isStraightPath = (start: { r: number; c: number }, end: { r: number; c: number }) => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    if (steps === 0) return [{ r: start.r, c: start.c }];
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;
    if (!Number.isInteger(stepR) || !Number.isInteger(stepC)) return null; // must be straight or perfect diag
    const cells: Array<{ r: number; c: number }> = [];
    for (let i = 0; i <= steps; i++) cells.push({ r: start.r + stepR * i, c: start.c + stepC * i });
    return cells;
  };

  const cellsToString = (cells: Array<{ r: number; c: number }>) => cells.map(({ r, c }) => grid[r][c]).join('');

  const onCellMouseDown = (r: number, c: number) => {
    setMouseDown(true);
    setStartCell({ r, c });
    setHoverCell({ r, c });
  };
  const onCellEnter = (r: number, c: number) => {
    if (!mouseDown) return;
    setHoverCell({ r, c });
  };
  const onMouseUpAnywhere = () => {
    if (!mouseDown || !startCell || !hoverCell) {
      setMouseDown(false);
      return;
    }
    const path = isStraightPath(startCell, hoverCell);
    if (path) {
      const picked = cellsToString(path);
      const reversed = picked.split('').reverse().join('');
      const canonicalMatch = WORDS.find((w) => w === picked || w === reversed);
      if (canonicalMatch && !foundWords.includes(canonicalMatch)) {
        setFoundWords((prev) => [...prev, canonicalMatch]);
        setLockedCells((prev) => {
          const next = new Set(prev);
          path.forEach(({ r, c }) => next.add(`${r}-${c}`));
          return next;
        });
      }
    }
    setMouseDown(false);
    setStartCell(null);
    setHoverCell(null);
  };

  useEffect(() => {
    setMounted(true);
    const handleWheel = (event: WheelEvent) => {
      if (hasNavigatedRef.current || isModalOpen) return;
      if (event.deltaY < -20) {
        hasNavigatedRef.current = true;
        router.back();
      } else if (event.deltaY > 20) {
        hasNavigatedRef.current = true;
        router.push('/contentcard');
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
      if (deltaY < -30) {
        hasNavigatedRef.current = true;
        router.back();
      } else if (deltaY > 30) {
        hasNavigatedRef.current = true;
        router.push('/contentcard');
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

  const remainingCount = WORDS.length - foundWords.length;

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
        <button onClick={() => setIsModalOpen(true)} className="text-white hover:text-gray-400 font-bold transition duration-300">MENU</button>
      </header>

      <main className="flex-1 flex items-center justify-center pt-24 pb-12" onMouseUp={onMouseUpAnywhere} onTouchEnd={onMouseUpAnywhere}>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-8 items-start px-2 sm:px-4">
          {/* Left: Enhanced Instruction Card */}
          <div className={`w-full transition-all duration-500 ease-out md:col-span-2 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="relative rounded-2xl p-6 sm:p-7 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 400px at -10% -10%, rgba(255,120,0,0.15), transparent 60%)' }} />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-wide">WORD HUNT CHALLENGE</h1>
              <p className="text-sm sm:text-base text-gray-200 mb-5 leading-relaxed">
                Before we start the discussion, let’s do this Word Hunt! Find all the 10 words related to our lesson. Words can be hidden horizontally, vertically, or diagonally — forwards or backwards.
              </p>
              <h2 className="text-sm font-semibold text-orange-300 mb-2">Word List</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {WORDS.map((word) => {
                  const found = foundWords.includes(word);
                  return (
                    <div key={word} className={`px-3 py-2 rounded-md text-center text-sm font-semibold tracking-wide transition-all ${found ? 'bg-green-700/70 text-green-50 line-through' : 'bg-white/5 text-white'}`}>
                      {word}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-xs text-gray-300">Remaining: {WORDS.length - foundWords.length} / {WORDS.length}</div>
            </div>
            {/* Team image below the card, outside the box */}
            <div className="mt-4 flex justify-center">
              <Image src="/wordhuntteam.png" alt="Word Hunt Team" width={500} height={300} className="w-full max-w-md h-auto opacity-95" />
            </div>
          </div>

          {/* Right: Interactive Word Search Grid */}
          <div className={`w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-3 sm:p-4 md:p-6 transition-all duration-500 ease-out md:col-span-3 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Word Search</h2>
            <div className="text-sm text-gray-300 mb-3">Remaining: {remainingCount} / {WORDS.length}</div>
            <div className="w-full">
              <div
                className="grid select-none"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
              >
                {grid.map((row, r) => (
                  row.map((ch, c) => {
                    const isLocked = lockedCells.has(`${r}-${c}`);
                    let isSelected = false;
                    if (mouseDown && startCell && hoverCell) {
                      const path = isStraightPath(startCell, hoverCell);
                      if (path) {
                        isSelected = path.some((p) => p.r === r && p.c === c);
                      }
                    }
                    return (
                      <div
                        key={`${r}-${c}`}
                        onMouseDown={() => onCellMouseDown(r, c)}
                        onMouseEnter={() => onCellEnter(r, c)}
                        onTouchStart={() => onCellMouseDown(r, c)}
                        onTouchMove={() => onCellEnter(r, c)}
                        className={`aspect-square m-[2px] flex items-center justify-center rounded-md font-bold cursor-pointer transition-colors text-[12px] sm:text-sm md:text-base
                          ${isLocked ? 'bg-green-700 text-white' : isSelected ? 'bg-orange-600 text-white' : 'bg-black/40 text-white'}
                        `}
                      >
                        {ch}
                      </div>
                    );
                  })
                ))}
              </div>
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

      {/* Styles for Modal Animation */}
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
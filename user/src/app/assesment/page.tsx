'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Define a type for the answers state
type Answers = {
  q1: string | null;
  q2: string | null;
  q3: string | null;
  q4: string | null;
  q5: string | null;
  q6: string | null;
  q7: string | null;
  q8: string | null;
  q9: string | null;
  q10: string | null;
};

// Define the correct answers
const correctAnswers: Answers = {
  q1: 'C',
  q2: 'D',
  q3: 'A',
  q4: 'A',
  q5: 'D',
  q6: 'D',
  q7: 'D',
  q8: 'A',
  q9: 'C',
  q10: 'C',
};

export default function AssessmentCard() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the modal

  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  });

  const [score, setScore] = useState<number | null>(null);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
  };

  const handleChange = (questionId: keyof Answers, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    for (const questionId in correctAnswers) {
      if (answers[questionId as keyof Answers] === correctAnswers[questionId as keyof Answers]) {
        newScore++;
      }
    }
    setScore(newScore);
  };

  useEffect(() => {
    setMounted(true);
    const handleAutoNavigation = () => {
      // Check if the user is at the very bottom of the page
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
          {/* Assessment Card Header */}
          <div className="flex justify-center items-center relative mb-8">
            <div className="bg-[#ffcc00] p-4 px-12 rounded-full shadow-lg relative z-10">
              <h1 className="text-3xl font-bold text-gray-800">Assessment Card</h1>
            </div>
            {/* Bee and pencil decoration */}
            <div className="absolute right-0 top-0 mr-12 -mt-4 z-20">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-4xl">🐝</span>
              </div>
            </div>
          </div>

          {/* Assessment Section */}
          <div className="relative overflow-hidden max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Direction: Circle the letter of the correct answer.</h2>
            
            {/* Questions container */}
            <div className="space-y-8">
              {/* Question 1 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  1. Considering that you and your family could be stuck in your vehicle because of an earthquake, what is the best thing to do to prepare for this situation?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q1"
                      value="A"
                      checked={answers.q1 === 'A'}
                      onChange={() => handleChange('q1', 'A')}
                      className="mr-2"
                    />
                    A. Have duplicate keys
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q1"
                      value="B"
                      checked={answers.q1 === 'B'}
                      onChange={() => handleChange('q1', 'B')}
                      className="mr-2"
                    />
                    B. check your vehicle from time to time
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q1"
                      value="C"
                      checked={answers.q1 === 'C'}
                      onChange={() => handleChange('q1', 'C')}
                      className="mr-2"
                    />
                    C. store emergency supplies in your vehicle
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q1"
                      value="D"
                      checked={answers.q1 === 'D'}
                      onChange={() => handleChange('q1', 'D')}
                      className="mr-2"
                    />
                    D. always place your vehicle in an open area
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  2. Why is it important to conduct an earthquake drill at home?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q2"
                      value="A"
                      checked={answers.q2 === 'A'}
                      onChange={() => handleChange('q2', 'A')}
                      className="mr-2"
                    />
                    A. To develop discipline
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q2"
                      value="B"
                      checked={answers.q2 === 'B'}
                      onChange={() => handleChange('q2', 'B')}
                      className="mr-2"
                    />
                    B. to teach and train the family members not to become a burden
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q2"
                      value="C"
                      checked={answers.q2 === 'C'}
                      onChange={() => handleChange('q2', 'C')}
                      className="mr-2"
                    />
                    C. to exercise the family members to become physically fit and healthy
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q2"
                      value="D"
                      checked={answers.q2 === 'D'}
                      onChange={() => handleChange('q2', 'D')}
                      className="mr-2"
                    />
                    D. to orient the family members on how to be prepared during disasters
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  3. What is the best thing to do during volcanic eruptions?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q3"
                      value="A"
                      checked={answers.q3 === 'A'}
                      onChange={() => handleChange('q3', 'A')}
                      className="mr-2"
                    />
                    A. stay calm and stay indoors
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q3"
                      value="B"
                      checked={answers.q3 === 'B'}
                      onChange={() => handleChange('q3', 'B')}
                      className="mr-2"
                    />
                    B. do not panic and stay outdoors
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q3"
                      value="C"
                      checked={answers.q3 === 'C'}
                      onChange={() => handleChange('q3', 'C')}
                      className="mr-2"
                    />
                    C. stay calm and remember the exits
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q3"
                      value="D"
                      checked={answers.q3 === 'D'}
                      onChange={() => handleChange('q3', 'D')}
                      className="mr-2"
                    />
                    D. practice some precautionary measures
                  </label>
                </div>
              </div>

              {/* Question 4 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  4. Mang Pedro is a carpenter. One afternoon, while at work, an earthquake happened. He was buried underneath a pile of woods. What should he do?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q4"
                      value="A"
                      checked={answers.q4 === 'A'}
                      onChange={() => handleChange('q4', 'A')}
                      className="mr-2"
                    />
                    A. use his whistle for anyone to hear him
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q4"
                      value="B"
                      checked={answers.q4 === 'B'}
                      onChange={() => handleChange('q4', 'B')}
                      className="mr-2"
                    />
                    B. have a rest while waiting for any rescue
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q4"
                      value="C"
                      checked={answers.q4 === 'C'}
                      onChange={() => handleChange('q4', 'C')}
                      className="mr-2"
                    />
                    C. seek help by using his hammer to create a sound
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q4"
                      value="D"
                      checked={answers.q4 === 'D'}
                      onChange={() => handleChange('q4', 'D')}
                      className="mr-2"
                    />
                    D. cry out loud so that everyone near the place will come for him
                  </label>
                </div>
              </div>

              {/* Question 5 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  5. What do building officials need to check during inspections for earthquake preparedness?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q5"
                      value="A"
                      checked={answers.q5 === 'A'}
                      onChange={() => handleChange('q5', 'A')}
                      className="mr-2"
                    />
                    A. the structural design
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q5"
                      value="B"
                      checked={answers.q5 === 'B'}
                      onChange={() => handleChange('q5', 'B')}
                      className="mr-2"
                    />
                    B. the size of the building
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q5"
                      value="C"
                      checked={answers.q5 === 'C'}
                      onChange={() => handleChange('q5', 'C')}
                      className="mr-2"
                    />
                    C. the place or area where it was built
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q5"
                      value="D"
                      checked={answers.q5 === 'D'}
                      onChange={() => handleChange('q5', 'D')}
                      className="mr-2"
                    />
                    D. the structural soundness of the buildings
                  </label>
                </div>
              </div>

              {/* Question 6 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  6. The following are examples of emergency supply kit EXCEPT ____.
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q6"
                      value="A"
                      checked={answers.q6 === 'A'}
                      onChange={() => handleChange('q6', 'A')}
                      className="mr-2"
                    />
                    A. a first aid kit
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q6"
                      value="B"
                      checked={answers.q6 === 'B'}
                      onChange={() => handleChange('q6', 'B')}
                      className="mr-2"
                    />
                    B. medicines
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q6"
                      value="C"
                      checked={answers.q6 === 'C'}
                      onChange={() => handleChange('q6', 'C')}
                      className="mr-2"
                    />
                    C. food and water
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q6"
                      value="D"
                      checked={answers.q6 === 'D'}
                      onChange={() => handleChange('q6', 'D')}
                      className="mr-2"
                    />
                    D. rice cooker
                  </label>
                </div>
              </div>
              
              {/* Question 7 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  7. Mrs. Reyes has a seven-year-old son who has an asthma. There is an ashfall continuously pouring on their area because of volcanic eruptions. What necessary precaution should be done?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q7"
                      value="A"
                      checked={answers.q7 === 'A'}
                      onChange={() => handleChange('q7', 'A')}
                      className="mr-2"
                    />
                    A. give him medicines
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q7"
                      value="B"
                      checked={answers.q7 === 'B'}
                      onChange={() => handleChange('q7', 'B')}
                      className="mr-2"
                    />
                    B. let him inhale fresh air outside the window
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q7"
                      value="C"
                      checked={answers.q7 === 'C'}
                      onChange={() => handleChange('q7', 'C')}
                      className="mr-2"
                    />
                    C. do not let him play near the windows and doors
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q7"
                      value="D"
                      checked={answers.q7 === 'D'}
                      onChange={() => handleChange('q7', 'D')}
                      className="mr-2"
                    />
                    D. cover the nose and mouth with damp, clean cloth or face mask
                  </label>
                </div>
              </div>

              {/* Question 8 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  8. Your grandmother harvested some vegetables in your backyard after a day of volcanic eruptions. What is the best thing to do before cooking the vegetables?
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q8"
                      value="A"
                      checked={answers.q8 === 'A'}
                      onChange={() => handleChange('q8', 'A')}
                      className="mr-2"
                    />
                    A. wash the vegetables thoroughly
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q8"
                      value="B"
                      checked={answers.q8 === 'B'}
                      onChange={() => handleChange('q8', 'B')}
                      className="mr-2"
                    />
                    B. boil the vegetables for 15 minutes
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q8"
                      value="C"
                      checked={answers.q8 === 'C'}
                      onChange={() => handleChange('q8', 'C')}
                      className="mr-2"
                    />
                    C. place the vegetables in the refrigerator
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q8"
                      value="D"
                      checked={answers.q8 === 'D'}
                      onChange={() => handleChange('q8', 'D')}
                      className="mr-2"
                    />
                    D. remove the outer part or the skin of the vegetables
                  </label>
                </div>
              </div>

              {/* Question 9 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  9. Long ground shaking during an earthquake can damage buildings. People are advised not to enter ____ buildings.
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q9"
                      value="A"
                      checked={answers.q9 === 'A'}
                      onChange={() => handleChange('q9', 'A')}
                      className="mr-2"
                    />
                    A. bare
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q9"
                      value="B"
                      checked={answers.q9 === 'B'}
                      onChange={() => handleChange('q9', 'B')}
                      className="mr-2"
                    />
                    B. undecorated
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q9"
                      value="C"
                      checked={answers.q9 === 'C'}
                      onChange={() => handleChange('q9', 'C')}
                      className="mr-2"
                    />
                    C. damaged
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q9"
                      value="D"
                      checked={answers.q9 === 'D'}
                      onChange={() => handleChange('q9', 'D')}
                      className="mr-2"
                    />
                    D. unfurnished
                  </label>
                </div>
              </div>

              {/* Question 10 */}
              <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                <p className="mb-4 text-lg">
                  10. Earthquake often strikes without warning. The following should be considered before an earthquake EXCEPT ____.
                </p>
                <div className="space-y-2 text-gray-200">
                  <label className="block">
                    <input
                      type="radio"
                      name="q10"
                      value="A"
                      checked={answers.q10 === 'A'}
                      onChange={() => handleChange('q10', 'A')}
                      className="mr-2"
                    />
                    A. know earthquake safety tips
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q10"
                      value="B"
                      checked={answers.q10 === 'B'}
                      onChange={() => handleChange('q10', 'B')}
                      className="mr-2"
                    />
                    B. follow precautionary measures
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q10"
                      value="C"
                      checked={answers.q10 === 'C'}
                      onChange={() => handleChange('q10', 'C')}
                      className="mr-2"
                    />
                    C. stop going to the concrete buildings and malls
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="q10"
                      value="D"
                      checked={answers.q10 === 'D'}
                      onChange={() => handleChange('q10', 'D')}
                      className="mr-2"
                    />
                    D. be aware of the preparation and readiness guidelines before, during, and after an earthquake
                  </label>
                </div>
              </div>
            </div>

            {/* Submit button and score display */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
              {score !== null && (
                <div className="text-xl font-bold text-gray-200">
                  Your Score: {score}/10
                </div>
              )}
            </div>
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
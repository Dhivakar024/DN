import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { PasswordScreen } from './components/PasswordScreen';
import { RomanticQuestionScreen } from './components/RomanticQuestionScreen';
import { VirtualHugScreen } from './components/VirtualHugScreen';
import { WillYouBeMineScreen } from './components/WillYouBeMineScreen';
import { FinalAnniversaryScreen } from './components/FinalAnniversaryScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState(1); // 1 | 2 | 3 | 4 | 5

  return (
    <main className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-x-hidden">
      {/* Dynamic Ambient Background Particles & Mesh Glow */}
      <FloatingHearts />

      {/* Complete Story Screen Flow */}
      <AnimatePresence mode="wait">
        {currentScreen === 1 && (
          <PasswordScreen
            key="screen-1"
            onSuccess={() => setCurrentScreen(2)}
          />
        )}

        {currentScreen === 2 && (
          <RomanticQuestionScreen
            key="screen-2"
            onNext={() => setCurrentScreen(3)}
          />
        )}

        {currentScreen === 3 && (
          <VirtualHugScreen
            key="screen-3"
            onNext={() => setCurrentScreen(4)}
          />
        )}

        {currentScreen === 4 && (
          <WillYouBeMineScreen
            key="screen-4"
            onNext={() => setCurrentScreen(5)}
          />
        )}

        {currentScreen === 5 && (
          <FinalAnniversaryScreen
            key="screen-5"
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;

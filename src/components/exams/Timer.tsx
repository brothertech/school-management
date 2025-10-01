'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  endTimeIso: string; // ISO string when exam should end
  intervalMs?: number; // autosave interval
  onAutosave?: () => void;
  onTimeUp?: () => void; // auto-submit trigger
  largeFonts?: boolean;
}

const Timer: React.FC<TimerProps> = ({ endTimeIso, intervalMs = 30000, onAutosave, onTimeUp, largeFonts }) => {
  const [remaining, setRemaining] = useState<number>(() => Math.max(0, new Date(endTimeIso).getTime() - Date.now()));
  const autosaveRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, new Date(endTimeIso).getTime() - Date.now());
      setRemaining(ms);
      if (ms === 0 && onTimeUp) onTimeUp();
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [endTimeIso, onTimeUp]);

  useEffect(() => {
    if (!onAutosave) return;
    autosaveRef.current = window.setInterval(() => {
      onAutosave?.();
    }, intervalMs);
    return () => {
      if (autosaveRef.current) clearInterval(autosaveRef.current);
    };
  }, [intervalMs, onAutosave]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <div aria-live="polite" className={`inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 ${largeFonts ? 'text-lg' : 'text-sm'}`}>
      <span className="font-semibold">Time Left:</span>
      <span aria-label="time-remaining">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

export default Timer;
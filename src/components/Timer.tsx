import React, { useState, useEffect } from 'react';

interface TimerProps {
  isComplete: boolean;
  shouldReset: boolean;
}

export function Timer({ isComplete, shouldReset }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  // Handle reset
  useEffect(() => {
    setSeconds(0);
  }, [shouldReset]);

  // Handle timer
  useEffect(() => {
    let intervalId: number | undefined;

    if (!isComplete) {
      intervalId = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [isComplete]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <span className="font-semibold">Time:</span> {formatTime(seconds)}
    </div>
  );
}
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const WORK_DURATION = 50 * 60; // 50 minutes in seconds
  const BREAK_DURATION = 10 * 60; // 10 minutes in seconds

  // Initialize state from localStorage or defaults
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem('pomodoroIsActive') === 'true';
  });
  const [isWorkSession, setIsWorkSession] = useState(() => {
    return localStorage.getItem('pomodoroIsWorkSession') !== 'false'; // Default to true
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('pomodoroTimeLeft');
    const savedTimestamp = localStorage.getItem('pomodoroTimestamp');
    const savedIsActive = localStorage.getItem('pomodoroIsActive') === 'true';
    const savedIsWorkSession = localStorage.getItem('pomodoroIsWorkSession') !== 'false';

    if (savedTime && savedTimestamp && savedIsActive) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
      const initialTime = parseInt(savedTime, 10);
      const remaining = initialTime - elapsed;
      if (remaining <= 0) {
        // Session has ended; determine next session
        const nextIsWorkSession = !savedIsWorkSession;
        return nextIsWorkSession ? WORK_DURATION : BREAK_DURATION;
      }
      return remaining;
    }
    return WORK_DURATION;
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoroIsActive', isActive);
    localStorage.setItem('pomodoroIsWorkSession', isWorkSession);
    localStorage.setItem('pomodoroTimeLeft', timeLeft);
    if (isActive) {
      localStorage.setItem('pomodoroTimestamp', Date.now());
    }
  }, [isActive, isWorkSession, timeLeft]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsWorkSession(!isWorkSession);
            setIsActive(false);
            return isWorkSession ? BREAK_DURATION : WORK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isWorkSession]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
    if (!isActive) {
      localStorage.setItem('pomodoroTimestamp', Date.now());
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_DURATION);
    localStorage.setItem('pomodoroTimestamp', Date.now());
  };

  const handleToggleSession = () => {
    setIsActive(false);
    setIsWorkSession(!isWorkSession);
    setTimeLeft(isWorkSession ? BREAK_DURATION : WORK_DURATION);
    localStorage.setItem('pomodoroTimestamp', Date.now());
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Pomodoro Timer
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleToggleSession}
            className={`px-4 py-2 rounded-l-full font-semibold transition-all duration-300 ${
              isWorkSession
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Work
          </button>
          <button
            onClick={handleToggleSession}
            className={`px-4 py-2 rounded-r-full font-semibold transition-all duration-300 ${
              !isWorkSession
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Break
          </button>
        </div>
        <div className="text-6xl font-mono text-center text-gray-800 mb-8">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartPause}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            Reset
          </button>
        </div>
        <div className="mt-6 text-center text-gray-600">
          {isWorkSession ? 'Focus Time' : 'Break Time'}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;

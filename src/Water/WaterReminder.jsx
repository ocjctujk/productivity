import React, { useEffect, useState, useRef } from 'react';

const WaterReminder = () => {
  const [intervalMinutes, setIntervalMinutes] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Load saved state on mount
  useEffect(() => {
    const savedInterval = localStorage.getItem('waterInterval');
    const savedIsRunning = localStorage.getItem('isRunning');

    if (savedInterval) {
      setIntervalMinutes(savedInterval);
    }

    if (savedIsRunning === 'true' && savedInterval) {
      startReminder(savedInterval);
    }
  }, []);

  // Save interval value to localStorage
  const handleInputChange = (e) => {
    const value = e.target.value;
    setIntervalMinutes(value);
    localStorage.setItem('waterInterval', value);
  };

  // Start reminder and persist state
  const handleStart = () => {
    if (!intervalMinutes || isNaN(intervalMinutes) || intervalMinutes <= 0) {
      alert('Please enter a valid number of minutes.');
      return;
    }

    startReminder(intervalMinutes);
    alert(`Reminder started! You will be reminded every ${intervalMinutes} minutes.`);
  };

  const startReminder = (minutes) => {
    const ms = parseInt(minutes) * 60 * 1000;

    intervalRef.current = setInterval(() => {
      alert('💧 Time to drink water!');
    }, ms);

    setIsRunning(true);
    localStorage.setItem('isRunning', 'true');
  };

  // Stop reminder and clear state
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    localStorage.setItem('isRunning', 'false');
    alert('Reminder stopped.');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">💧 Water Reminder</h1>

        <label className="block text-gray-700 font-medium mb-2">
          Remind me to drink water every:
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center mb-4"
          placeholder="Enter minutes"
          value={intervalMinutes}
          onChange={handleInputChange}
          disabled={isRunning}
        />

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStart}
            className={`px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 ${
              isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isRunning}
          >
            Remind Me
          </button>
          <button
            onClick={handleStop}
            className="px-6 py-2 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterReminder;

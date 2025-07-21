import { useEffect, useRef, useState } from 'react';

interface UseCountdownProps {
  autoStart?: boolean;
  initialSeconds?: number;
  onComplete?: () => void;
}

interface UseCountdownReturn {
  formattedTime: string;
  isRunning: boolean;
  pause: () => void;
  progress: number;
  reset: () => void;
  restart: () => void;
  setTime: (seconds: number) => void;
  start: () => void;
  timeLeft: number;
}

// Format time as MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export function useCountdown({
  autoStart = false,
  initialSeconds = 60,
  onComplete,
}: UseCountdownProps = {}): UseCountdownReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [initialTime, setInitialTime] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate progress (0 to 1)
  const calculateProgress = (): number => {
    return initialTime > 0 ? timeLeft / initialTime : 0;
  };

  // Start the countdown
  const start = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  // Pause the countdown
  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // Reset the countdown to initial time
  const reset = () => {
    pause();
    setTimeLeft(initialTime);
  };

  // Restart the countdown (reset + start)
  const restart = () => {
    reset();
    setIsRunning(true);
  };

  // Set a new time and update initial time
  const setTime = (seconds: number) => {
    if (seconds > 0 && !Number.isNaN(seconds)) {
      setInitialTime(seconds);
      if (!isRunning) {
        setTimeLeft(seconds);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, onComplete]);

  return {
    formattedTime: formatTime(timeLeft),
    isRunning,
    pause,
    progress: calculateProgress(),
    reset,
    restart,
    setTime,
    start,
    timeLeft,
  };
}

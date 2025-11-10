import { useState, useEffect, useCallback } from 'react';

interface UseMotivationalPopupProps {
  focusTimerMinutes?: number;
  idleTimerMinutes?: number;
}

export const useMotivationalPopup = ({
  focusTimerMinutes = 30,
  idleTimerMinutes = 5,
}: UseMotivationalPopupProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivityTime(Date.now());
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  // Focus timer - show popup after focused work
  useEffect(() => {
    const focusTimer = setInterval(() => {
      setIsOpen(true);
    }, focusTimerMinutes * 60 * 1000);

    return () => clearInterval(focusTimer);
  }, [focusTimerMinutes]);

  // Idle detection - show popup when user is idle
  useEffect(() => {
    const idleCheckInterval = setInterval(() => {
      const idleTime = Date.now() - lastActivityTime;
      const idleThreshold = idleTimerMinutes * 60 * 1000;

      if (idleTime >= idleThreshold && !isOpen) {
        setIsOpen(true);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(idleCheckInterval);
  }, [lastActivityTime, idleTimerMinutes, isOpen]);

  // Manual trigger for task completion
  const triggerPopup = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    triggerPopup,
    closePopup,
  };
};

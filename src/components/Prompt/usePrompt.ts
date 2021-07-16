import { useEffect, useState, useCallback } from 'react';
import { PromptHistory, PromptLocation, PromptCallback } from './Prompt.types';

let unblock: any;

export function usePrompt(
  onRequestToLeavePage: PromptCallback,
  onRequestToLeaveApp?: PromptCallback,
  history?: PromptHistory,
  isEnabled: boolean = false,
) {
  const [location, setLocation] = useState<PromptLocation>();
  const [currentLocation, setCurrentLocation] = useState<PromptLocation>();

  const enable = useCallback(() => {
    if (history) {
      if (unblock) {
        unblock();
      }
      unblock = history.block(loc => {
        setLocation(loc);
        setCurrentLocation(history.location);
        return onRequestToLeavePage();
      });
    }
  }, [onRequestToLeavePage, history]);

  const disable = useCallback(() => {
    if (unblock) {
      unblock();
    }
  }, []);

  useEffect(() => {
    if (isEnabled) {
      enable();
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      disable();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      disable();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEnabled, enable, disable]);

  const handleBeforeUnload = useCallback(
    (ev: BeforeUnloadEvent) => {
      if (isEnabled && onRequestToLeaveApp) {
        ev.preventDefault();
        const msg = onRequestToLeaveApp();
        ev.returnValue = msg;
        return msg;
      }
      return undefined;
    },
    [isEnabled, onRequestToLeaveApp],
  );

  const handleContinue = () => {
    disable();
    if (location && currentLocation && history) {
      history.push(formUrl(location));
      if (currentLocation.pathname === location.pathname && isEnabled) {
        enable();
      }
    }
  };

  return [handleContinue, disable];
}

const formUrl = ({ pathname, search, hash }: PromptLocation) => `${pathname}${search}${hash}`;

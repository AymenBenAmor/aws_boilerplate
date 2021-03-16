import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = (): {
  keyboardHeight: number;
  keyboardIsOpen: boolean;
} => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardIsOpen, setkeyboardIsOpen] = useState(false);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    setkeyboardIsOpen(true);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
    setkeyboardIsOpen(false);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return { keyboardHeight, keyboardIsOpen };
};

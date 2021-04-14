/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

type MessagesContextType = {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  showMessage: (message: string) => void;
};
const MessagesContext = React.createContext<MessagesContextType>({
  messages: [],
  setMessages: () => {},
  showMessage: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<string[]>([]);
  const showMessage = (message: string) => {
    setMessages((prevMessages: string[]) => {
      return prevMessages.concat([message]);
    });
    setTimeout(() => {
      setMessages((prevMessages: string[]) => prevMessages.slice(1));
    }, 2000);
  };
  return (
    <MessagesContext.Provider value={{ messages, setMessages, showMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessageContext() {
  const context = React.useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessagesProvider');
  }
  return context;
}

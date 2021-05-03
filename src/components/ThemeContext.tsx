/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

type ThemeContextType = {
  theme: { darkMode: boolean };
  setTheme: React.Dispatch<ActionType>;
};
type ActionType = {
  type: 'LIGHTMODE' | 'DARKMODE';
};
const ThemeContext = React.createContext<ThemeContextType>({
  theme: { darkMode: false },
  setTheme: () => {},
});
const initialState = { darkMode: false };

const themeReducer = (state: { darkMode: boolean }, action: ActionType) => {
  switch (action.type) {
    case 'LIGHTMODE':
      return { darkMode: false };
    case 'DARKMODE':
      return { darkMode: true };
    default:
      return state;
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useMessageContext() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessagesProvider');
  }
  return context;
}

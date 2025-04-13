// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

// Define the theme type
type ThemeType = {
  dark: boolean;
  colors: typeof Colors.light | typeof Colors.dark;
};

// Define the context type
type ThemeContextType = {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: { dark: false, colors: Colors.light },
  isDark: false,
  toggleTheme: () => {},
});

// Provider component that wraps your app
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the device color scheme
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  // Update theme if device setting changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  // Create the theme object
  const theme: ThemeType = {
    dark: isDark,
    colors: isDark ? Colors.dark : Colors.light,
  };

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
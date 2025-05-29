import { useColorScheme } from 'react-native';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  white: string;
  black: string;
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  red: {
    100: string;
    500: string;
    800: string;
  };
  green: {
    100: string;
    500: string;
    600: string;
    800: string;
  };
  blue: {
    50: string;
    500: string;
    800: string;
  };
  yellow: {
    100: string;
    500: string;
    800: string;
  };
  orange: {
    500: string;
    600: string;
  };
}

interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

interface ThemeShadow {
  sm: object;
  md: object;
  lg: object;
}

interface Theme {
  colors: ThemeColors;
  borderRadius: ThemeBorderRadius;
  shadow: ThemeShadow;
  isDark: boolean;
}

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const lightColors: ThemeColors = {
    primary: '#4f46e5', // Indigo-600
    primaryDark: '#4338ca', // Indigo-700
    secondary: '#8b5cf6', // Violet-500
    background: '#f9fafb', // Gray-50
    card: '#ffffff',
    text: '#1f2937', // Gray-800
    border: '#e5e7eb', // Gray-200
    notification: '#ef4444', // Red-500
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    red: {
      100: '#fee2e2',
      500: '#ef4444',
      800: '#991b1b',
    },
    green: {
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      800: '#166534',
    },
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      800: '#1e40af',
    },
    yellow: {
      100: '#fef9c3',
      500: '#eab308',
      800: '#854d0e',
    },
    orange: {
      500: '#f97316',
      600: '#ea580c',
    },
  };
  
  const darkColors: ThemeColors = {
    primary: '#6366f1', // Indigo-500
    primaryDark: '#4f46e5', // Indigo-600
    secondary: '#a78bfa', // Violet-400
    background: '#111827', // Gray-900
    card: '#1f2937', // Gray-800
    text: '#f9fafb', // Gray-50
    border: '#374151', // Gray-700
    notification: '#f87171', // Red-400
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    red: {
      100: '#fee2e2',
      500: '#ef4444',
      800: '#991b1b',
    },
    green: {
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      800: '#166534',
    },
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      800: '#1e40af',
    },
    yellow: {
      100: '#fef9c3',
      500: '#eab308',
      800: '#854d0e',
    },
    orange: {
      500: '#f97316',
      600: '#ea580c',
    },
  };
  
  const borderRadius: ThemeBorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  };
  
  const shadow: ThemeShadow = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  };
  
  return {
    colors: isDark ? darkColors : lightColors,
    borderRadius,
    shadow,
    isDark,
  };
};

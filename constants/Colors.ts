// const tintColorLight = '#2f95dc';
// const tintColorDark = '#fff';

// export default {
//   light: {
//     text: '#000',
//     background: '#fff',
//     tint: tintColorLight,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#fff',
//     background: '#000',
//     tint: tintColorDark,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorDark,
//   },
// };
// constants/Colors.ts
// Theme colors for spiritual app based on orange/amber palette

const tintColorLight = '#e67e22'; // Primary orange for light mode
const tintColorDark = '#f39c12'; // Lighter orange for dark mode

export default {
  light: {
    text: '#333333',
    background: '#fff5e6', // Light amber background (similar to amber-50)
    tint: tintColorLight,
    tabIconDefault: '#999999',
    tabIconSelected: tintColorLight,
    card: '#ffffff',
    border: '#ffe8cc', // Light orange border (similar to orange-100)
    accent: '#d35400', // Deeper orange accent
    subtle: '#fff0d9', // Very light orange for subtle backgrounds
    secondary: '#3498db', // Blue accent
    success: '#27ae60', // Green for success states
    warning: '#f39c12', // Orange for warnings
    danger: '#e74c3c', // Red for errors/danger
    info: '#2980b9', // Blue for information
    orange: {
      50: '#fff5e6',
      100: '#ffe8cc',
      200: '#ffd699',
      300: '#ffc266',
      400: '#ffad33',
      500: '#ff9900',
      600: '#e67e22',
      700: '#d35400',
      800: '#a04000',
      900: '#7d3200',
    },
    gray: {
      100: '#f7f7f7',
      200: '#e6e6e6',
      300: '#d5d5d5',
      400: '#b4b4b4',
      500: '#939393',
      600: '#727272',
      700: '#515151',
      800: '#303030',
      900: '#1a1a1a',
    },
  },
  dark: {
    text: '#f0f0f0',
    background: '#1a1207', // Dark amber background
    tint: tintColorDark,
    tabIconDefault: '#666666',
    tabIconSelected: tintColorDark,
    card: '#261c10', // Dark card background with orange tint
    border: '#3d2e1a', // Dark orange border
    accent: '#f39c12', // Lighter orange accent for dark mode
    subtle: '#332211', // Very dark orange for subtle backgrounds
    secondary: '#3498db', // Blue accent
    success: '#2ecc71', // Green for success states
    warning: '#f1c40f', // Yellow for warnings
    danger: '#e74c3c', // Red for errors/danger
    info: '#3498db', // Blue for information
    orange: {
      50: '#332211',
      100: '#3d2e1a',
      200: '#4d3920',
      300: '#664926',
      400: '#8c6333',
      500: '#b37f40',
      600: '#d9994d',
      700: '#f39c12',
      800: '#f7b348',
      900: '#fac980',
    },
    gray: {
      100: '#1a1a1a',
      200: '#303030',
      300: '#515151',
      400: '#727272',
      500: '#939393',
      600: '#b4b4b4',
      700: '#d5d5d5',
      800: '#e6e6e6',
      900: '#f7f7f7',
    },
  },
};
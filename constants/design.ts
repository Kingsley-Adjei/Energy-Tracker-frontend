// Design system for Energy Tracker App - Gentle, professional colors
export const colors = {
  // Primary - Soft teal for energy/eco theme
  primary: '#4DB8A8',
  primaryDark: '#3A9688',
  primaryLight: '#7DCDBF',
  
  // Secondary - Warm grey
  secondary: '#6B7280',
  secondaryLight: '#9CA3AF',
  
  // Accent - Soft orange for alerts/highlights
  accent: '#F59E0B',
  accentLight: '#FCD34D',
  
  // Backgrounds
  background: '#F9FAFB',
  backgroundSecondary: '#FFFFFF',
  cardBackground: '#FFFFFF',
  
  // Text
  text: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Chart colors - gentle palette
  chart1: '#4DB8A8',
  chart2: '#F59E0B',
  chart3: '#8B5CF6',
  chart4: '#EC4899',
  chart5: '#3B82F6',
  
  // Border
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
  caption: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  captionBold: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  smallBold: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

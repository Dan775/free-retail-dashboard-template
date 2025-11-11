// Chart color utilities that work with both light and dark themes
// Using direct color values that recharts can render properly

// Color palette based on the chart colors from globals.css
// Converted from oklch to rgb for better compatibility with recharts
export const chartColors = {
  chart1: '#3b82f6', // Blue - from oklch(0.65 0.22 250)
  chart2: '#10b981', // Green/Cyan - from oklch(0.72 0.18 160)
  chart3: '#f59e0b', // Yellow/Amber - from oklch(0.68 0.2 70)
  chart4: '#a855f7', // Purple/Magenta - from oklch(0.62 0.26 300)
  chart5: '#ef4444', // Red/Orange - from oklch(0.7 0.22 30)
};

// Alternative palette for better visibility in dark mode
export const chartColorsDark = {
  chart1: '#60a5fa', // Lighter Blue
  chart2: '#34d399', // Lighter Green
  chart3: '#fbbf24', // Lighter Amber
  chart4: '#c084fc', // Lighter Purple
  chart5: '#f87171', // Lighter Red
};

// Get colors based on current theme
export const getChartColors = () => {
  if (typeof window === 'undefined') {
    return chartColors;
  }
  
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? chartColorsDark : chartColors;
};


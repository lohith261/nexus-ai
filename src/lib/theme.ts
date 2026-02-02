// Cyberpunk Analyst color system
export const nexusTheme = {
  colors: {
    bg: '#0a0a0f',
    surface: '#12121a',
    surfaceHover: '#1a1a25',
    primary: '#00f0ff',
    secondary: '#7000ff',
    accent: '#ff006e',
    success: '#00ff9f',
    warning: '#ffb800',
    danger: '#ff4444',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
  },
  shadows: {
    glow: '0 0 40px rgba(0, 240, 255, 0.15)',
    glowHover: '0 0 60px rgba(0, 240, 255, 0.25)',
    purpleGlow: '0 0 30px rgba(112, 0, 255, 0.3)',
  },
  animation: {
    spring: { type: "spring", stiffness: 100, damping: 15 },
    smooth: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    fast: { duration: 0.3, ease: "easeOut" },
  }
};
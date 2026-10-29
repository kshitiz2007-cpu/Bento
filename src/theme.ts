export const theme = {
  color: {
    canvas: "#090B16",
    surface: "#15182B",
    surfaceElevated: "#1D2038",
    ink: "#F7F5FF",
    muted: "#A1A4BE",
    faint: "#737891",
    rose: "#FF5CA8",
    roseSoft: "#FFD8E8",
    violet: "#9A7BFF",
    violetSoft: "#302344",
    navy: "#090B16",
    navyMuted: "#45495B",
    mint: "#D1F5E2",
    border: "#2D304A",
    amber: "#FFE0A6",
    success: "#D8FF6A",
  },
  radius: { sm: 12, md: 16, lg: 22, xl: 28, pill: 999 },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 },
} as const;

export const shadow = {
  card: {
    shadowColor: "#03040B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 4,
  },
} as const;

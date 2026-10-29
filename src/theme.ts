export const theme = {
  color: {
    canvas: "#F6F6FA",
    surface: "#FFFFFF",
    ink: "#131726",
    muted: "#686D7E",
    rose: "#F53B85",
    roseSoft: "#FFE0EB",
    violet: "#6E4ADD",
    violetSoft: "#E3D9FF",
    navy: "#131728",
    navyMuted: "#45495B",
    mint: "#D1F5E2",
    border: "#E5E6EC",
    amber: "#FFE0A6",
    success: "#168451",
  },
  radius: { sm: 12, md: 16, lg: 22, xl: 28, pill: 999 },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 },
} as const;

export const shadow = {
  card: {
    shadowColor: "#1D2235",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.045,
    shadowRadius: 14,
    elevation: 2,
  },
} as const;
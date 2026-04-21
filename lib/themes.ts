import { ThemeName } from "@/types";

export const themes: Record<ThemeName, Record<string, string>> = {
  warm: { "--bg": "#FDF6EE", "--accent": "#D85A30", "--card": "#FFF8F2", "--text": "#4A1B0C" },
  bright: { "--bg": "#FFFBEA", "--accent": "#BA7517", "--card": "#FFFFF0", "--text": "#412402" },
  soft: { "--bg": "#F4F0F8", "--accent": "#7F77DD", "--card": "#FAF7FF", "--text": "#26215C" },
  clean: { "--bg": "#F0FAF6", "--accent": "#1D9E75", "--card": "#FAFFFC", "--text": "#04342C" },
  minimal: { "--bg": "#EEF4FB", "--accent": "#185FA5", "--card": "#F8FBFF", "--text": "#042C53" },
  vibrant: { "--bg": "#FFF0F5", "--accent": "#D4537E", "--card": "#FFF5F8", "--text": "#4B1528" }
};

export function applyTheme(themeName: ThemeName): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const theme = themes[themeName];

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

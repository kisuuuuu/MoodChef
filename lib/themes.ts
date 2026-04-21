import { ThemeName } from "@/types";

export const themes: Record<ThemeName, Record<string, string>> = {
  warm: {
    "--bg": "#fff5ed",
    "--bg-soft": "#fffaf3",
    "--bg-glow": "#ffe3cb",
    "--accent": "#d46b2a",
    "--card": "#fffdf8",
    "--text": "#4b2a15",
    "--header-bg": "#ffe6cf",
    "--header-text": "#5a2e0f",
    "--pill-bg": "#ffd8b6",
    "--pill-border": "#f2a96e"
  },
  bright: {
    "--bg": "#fffcef",
    "--bg-soft": "#fffef6",
    "--bg-glow": "#fff1bf",
    "--accent": "#bf8b1b",
    "--card": "#ffffff",
    "--text": "#4a3507",
    "--header-bg": "#fff0b8",
    "--header-text": "#5c4308",
    "--pill-bg": "#ffe49b",
    "--pill-border": "#e5be54"
  },
  soft: {
    "--bg": "#f4f1ff",
    "--bg-soft": "#faf8ff",
    "--bg-glow": "#e8e2ff",
    "--accent": "#7f77dd",
    "--card": "#ffffff",
    "--text": "#2f2d67",
    "--header-bg": "#e6e1ff",
    "--header-text": "#373478",
    "--pill-bg": "#d0c8ff",
    "--pill-border": "#a89bed"
  },
  clean: {
    "--bg": "#eefcf7",
    "--bg-soft": "#f6fffb",
    "--bg-glow": "#d6f6eb",
    "--accent": "#1f9d78",
    "--card": "#ffffff",
    "--text": "#0d4236",
    "--header-bg": "#d7f7ec",
    "--header-text": "#0d4f3e",
    "--pill-bg": "#baf0df",
    "--pill-border": "#6dcdae"
  },
  minimal: {
    "--bg": "#eff7ff",
    "--bg-soft": "#f7fbff",
    "--bg-glow": "#dbeeff",
    "--accent": "#2c6eb7",
    "--card": "#ffffff",
    "--text": "#1c406c",
    "--header-bg": "#dcecff",
    "--header-text": "#1f4f88",
    "--pill-bg": "#c0dcff",
    "--pill-border": "#84b4ea"
  },
  vibrant: {
    "--bg": "#fff1f7",
    "--bg-soft": "#fff8fc",
    "--bg-glow": "#ffdced",
    "--accent": "#d4537e",
    "--card": "#ffffff",
    "--text": "#5a1e34",
    "--header-bg": "#ffd4e5",
    "--header-text": "#6a1f3d",
    "--pill-bg": "#ffc0d8",
    "--pill-border": "#ea86ad"
  }
};

export function applyTheme(themeName: ThemeName): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const theme = themes[themeName];

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function applyDefaultTheme(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.style.setProperty("--bg", "#f5f1e8");
  root.style.setProperty("--bg-soft", "#fffdf8");
  root.style.setProperty("--bg-glow", "#f0e4d2");
  root.style.setProperty("--accent", "#9b7a56");
  root.style.setProperty("--card", "#fffaf1");
  root.style.setProperty("--text", "#45362a");
  root.style.setProperty("--header-bg", "#efe4d2");
  root.style.setProperty("--header-text", "#5a4735");
  root.style.setProperty("--pill-bg", "#e7d7bf");
  root.style.setProperty("--pill-border", "#ceb998");
}

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const gradients = {
  dark: {
    primary: "linear-gradient(to right, #4f46e5, #7c3aed)",
    secondary: "linear-gradient(to right, #3b82f6, #6366f1)",
    accent: "linear-gradient(to right, #ec4899, #8b5cf6)",
  },
  light: {
    primary: "linear-gradient(to right, #6366f1, #8b5cf6)",
    secondary: "linear-gradient(to right, #60a5fa, #6366f1)",
    accent: "linear-gradient(to right, #f472b6, #a78bfa)",
  },
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      root.style.setProperty(
        "--gradient-primary",
        gradients[systemTheme].primary,
      );
      root.style.setProperty(
        "--gradient-secondary",
        gradients[systemTheme].secondary,
      );
      root.style.setProperty(
        "--gradient-accent",
        gradients[systemTheme].accent,
      );
      return;
    }

    root.classList.add(theme);
    root.style.setProperty("--gradient-primary", gradients[theme].primary);
    root.style.setProperty("--gradient-secondary", gradients[theme].secondary);
    root.style.setProperty("--gradient-accent", gradients[theme].accent);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

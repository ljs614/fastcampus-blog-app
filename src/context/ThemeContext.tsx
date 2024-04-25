import { ReactNode, createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface ThemeProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "../themes/colors";

type Theme = "light" | "dark";

interface ThemeContextData {
    theme: Theme;
    isDark: boolean;
    colors: typeof lightColors;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>("light");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem("@theme");

            if (savedTheme === "dark" || savedTheme === "light") {
                setThemeState(savedTheme);
            }
        } catch (error) {
            console.log("Erro ao carregar tema:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const setTheme = async (newTheme: Theme) => {
        try {
            setThemeState(newTheme);
            await AsyncStorage.setItem("@theme", newTheme);
        } catch (error) {
            console.log("Erro ao salvar tema:", error);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    const isDark = theme === "dark";
    const colors = isDark ? darkColors : lightColors;

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark,
                colors,
                setTheme,
                toggleTheme,
                isLoading,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    return useContext(ThemeContext);
}

/*
========================================================
CONTEXT: THEME CONTEXT

OBJETIVO:
- Centralizar o tema global do aplicativo
- Controlar Light / Dark mode
- Expor a paleta de cores correta para toda a aplicação
- Persistir preferências no AsyncStorage
- Persistir também estados globais simples do fluxo

ESTADOS GLOBAIS MANTIDOS AQUI:
- theme
- isLoading
- permissionsCompleted

OBSERVAÇÃO:
- permissionsCompleted indica que o motorista já passou
  pela etapa inicial de permissões
- Isso permite que a tela Start saiba se deve mandar
  o usuário para PrivacyPolicy ou direto para Phone
========================================================
*/

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "../themes/colors";

/*
========================================================
TIPO DO TEMA
========================================================
*/
type Theme = "light" | "dark";

/*
========================================================
CHAVES DE PERSISTÊNCIA
Centralizadas para evitar erro de digitação
========================================================
*/
const STORAGE_KEYS = {
    theme: "@theme",
    permissionsCompleted: "@permissions_completed",
} as const;

/*
========================================================
TIPAGEM DO CONTEXTO
========================================================
*/
interface ThemeContextData {
    /*
    ================================================
    TEMA GLOBAL
    ================================================
    */
    theme: Theme;
    isDark: boolean;
    colors: typeof lightColors;

    /*
    ================================================
    CONTROLE DE TEMA
    ================================================
    */
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;

    /*
    ================================================
    ESTADO DE CARREGAMENTO INICIAL
    ================================================
    */
    isLoading: boolean;

    /*
    ================================================
    CONTROLE DO FLUXO DE PERMISSÕES
    ================================================
    */
    permissionsCompleted: boolean;
    setPermissionsCompleted: (value: boolean) => void;
    resetPermissionsCompleted: () => void;
}

/*
========================================================
CRIAÇÃO DO CONTEXTO
========================================================
*/
const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

/*
========================================================
PROVIDER PRINCIPAL
========================================================
*/
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    /*
    ========================================================
    ESTADOS PRINCIPAIS
    ========================================================
    */
    const [theme, setThemeState] = useState<Theme>("light");
    const [isLoading, setIsLoading] = useState(true);
    const [permissionsCompleted, setPermissionsCompletedState] =
        useState(false);

    /*
    ========================================================
    EFEITO INICIAL
    Carrega preferências e estados persistidos
    ========================================================
    */
    useEffect(() => {
        loadInitialPreferences();
    }, []);

    /*
    ========================================================
    CARREGAR DADOS INICIAIS
    - Tema salvo
    - Estado do fluxo de permissões
    ========================================================
    */
    const loadInitialPreferences = async () => {
        try {
            /*
            ============================================
            LÊ TEMA E STATUS DE PERMISSÕES EM PARALELO
            ============================================
            */
            const [savedTheme, savedPermissionsCompleted] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.theme),
                AsyncStorage.getItem(STORAGE_KEYS.permissionsCompleted),
            ]);

            /*
            ============================================
            TEMA
            ============================================
            */
            if (savedTheme === "dark" || savedTheme === "light") {
                setThemeState(savedTheme);
            }

            /*
            ============================================
            FLUXO DE PERMISSÕES
            ============================================
            */
            if (savedPermissionsCompleted === "true") {
                setPermissionsCompletedState(true);
            }
        } catch (error) {
            console.log("Erro ao carregar preferências iniciais:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*
    ========================================================
    DEFINIR TEMA
    ========================================================
    */
    const setTheme = async (newTheme: Theme) => {
        try {
            setThemeState(newTheme);
            await AsyncStorage.setItem(STORAGE_KEYS.theme, newTheme);
        } catch (error) {
            console.log("Erro ao salvar tema:", error);
        }
    };

    /*
    ========================================================
    ALTERNAR TEMA
    ========================================================
    */
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    /*
    ========================================================
    MARCAR PERMISSÕES COMO CONCLUÍDAS
    Usado quando o usuário termina o bloco inicial
    de permissões e já pode seguir para o cadastro.
    ========================================================
    */
    const setPermissionsCompleted = async (value: boolean) => {
        try {
            setPermissionsCompletedState(value);
            await AsyncStorage.setItem(
                STORAGE_KEYS.permissionsCompleted,
                String(value),
            );
        } catch (error) {
            console.log("Erro ao salvar estado de permissões:", error);
        }
    };

    /*
    ========================================================
    RESETAR PERMISSÕES CONCLUÍDAS
    Útil para testes ou reinício do fluxo
    ========================================================
    */
    const resetPermissionsCompleted = async () => {
        try {
            setPermissionsCompletedState(false);
            await AsyncStorage.removeItem(STORAGE_KEYS.permissionsCompleted);
        } catch (error) {
            console.log("Erro ao resetar estado de permissões:", error);
        }
    };

    /*
    ========================================================
    DERIVADOS DO TEMA
    ========================================================
    */
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
                permissionsCompleted,
                setPermissionsCompleted,
                resetPermissionsCompleted,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

/*
========================================================
HOOK DE CONSUMO DO CONTEXTO
========================================================
*/
export function useTheme() {
    return useContext(ThemeContext);
}

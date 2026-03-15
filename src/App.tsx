/*
========================================================
APP ENTRY POINT
Configura providers e navegação principal

ORDEM DOS PROVIDERS (importante):
1. ThemeProvider (mais externo)
2. DocumentProvider (meio)
3. NavigationContainer (mais interno)

Isso garante que todos os componentes tenham acesso
aos contexts necessários.
========================================================
*/
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/ThemeContext";
import { DocumentProvider } from "./context/DocumentContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
    return (
        <ThemeProvider>
            <DocumentProvider>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </DocumentProvider>
        </ThemeProvider>
    );
}

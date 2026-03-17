/*
========================================================
TELA INICIAL - START
Primeira tela do aplicativo com opções de Login e Cadastro.

FLUXO ATUALIZADO:
- Botão "Entrar": Navega para Phone com fromLogin: true
- Botão "Criar minha conta": Navega para PrivacyPolicy (cadastro)

PARÂMETROS ENVIADOS:
- Phone: { fromLogin: boolean }
  - true: Fluxo de Login (Entrar)
  - false: Fluxo de Cadastro
========================================================
*/
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

export default function StartScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    // Seleciona logo baseado no tema
    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

    return (
        <View
            style={[styles.container, theme === "dark" && styles.containerDark]}
        >
            {/* LOGO E TÍTULO */}
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.primaryTextOpac}>Z Motorista</Text>
            </View>

            {/* BOTÕES DE AÇÃO */}
            <View style={styles.buttonsContainer}>
                {/*
                ================================================
                BOTÃO "ENTRAR" - FLUXO DE LOGIN
                Navega para Phone passando fromLogin: true
                ================================================
                */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() =>
                        navigation.navigate("Phone", {
                            fromLogin: true, // ✅ Parâmetro crítico para diferenciar fluxos
                        })
                    }
                >
                    <Text style={styles.primaryText}>Entrar</Text>
                </TouchableOpacity>

                {/*
                ================================================
                BOTÃO "CRIAR MINHA CONTA" - FLUXO DE CADASTRO
                Navega para PrivacyPolicy (início do cadastro)
                ================================================
                */}
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                    <Text style={styles.secondaryText}>Criar minha conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 120,
    },
    containerDark: {
        backgroundColor: "#0B0B0B",
    },
    logoContainer: {
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    primaryTextOpac: {
        color: "#687076",
        fontSize: 18,
        fontWeight: "600",
    },
    buttonsContainer: {
        width: "100%",
        alignItems: "center",
    },
    primaryButton: {
        backgroundColor: "#1E6BE3",
        width: "80%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 14,
    },
    primaryText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: "#1E6BE3",
        width: "80%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    secondaryText: {
        color: "#1E6BE3",
        fontSize: 18,
        fontWeight: "600",
    },
});

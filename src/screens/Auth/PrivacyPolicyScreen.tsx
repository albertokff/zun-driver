/*
========================================================
TELA: PRIVACY POLICY (POLÍTICA DE PRIVACIDADE)

OBJETIVO:
- Informar o usuário sobre os termos de uso
- Solicitar aceite antes de continuar o cadastro
- Manter experiência leve e direta (estilo 99)

FLUXO:
- "Concordo e continuar" → Permissions
- "Sair" → Volta para tela anterior
========================================================
*/

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

// Componentes reutilizáveis
import ButtonPrimary from "../../components/ButtonPrimary";
import BackButton from "../../components/BackButton";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PrivacyPolicy"
>;

export default function PrivacyPolicyScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    HANDLERS DE AÇÃO
    ========================================================
    */

    // Usuário concorda com os termos e segue cadastro
    function handleAgree() {
        navigation.navigate("Permissions");
    }

    // Usuário decide sair do fluxo
    function handleExit() {
        navigation.goBack();
    }

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    BOTÃO DE VOLTAR
                ======================================================== */}
                <BackButton />

                {/* ========================================================
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <View style={styles.content}>
                    {/* Badge indicando etapa */}
                    <Text
                        style={[
                            styles.badge,
                            {
                                color: colors.primary,
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        Cadastro do motorista
                    </Text>

                    {/* Título principal */}
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Antes de continuar
                    </Text>

                    {/* Texto explicativo */}
                    <Text
                        style={[
                            styles.bodyText,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        Leia e concorde com os termos de uso e com a política de
                        privacidade para continuar seu cadastro na Zun.
                    </Text>

                    {/* Link (futuro: abrir documento real) */}
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text
                            style={[
                                styles.linkText,
                                {
                                    color: colors.primary,
                                },
                            ]}
                        >
                            Ver termos de uso e política de privacidade
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ========================================================
                    BOTÕES DE AÇÃO
                ======================================================== */}
                <View
                    style={[
                        styles.buttons,
                        {
                            backgroundColor: colors.background,
                        },
                    ]}
                >
                    {/* BOTÃO PRINCIPAL */}
                    <ButtonPrimary
                        title="Concordo e continuar"
                        onPress={handleAgree}
                        isDark={isDark}
                    />

                    {/* BOTÃO SECUNDÁRIO */}
                    <TouchableOpacity
                        style={[
                            styles.secondaryButton,
                            {
                                borderColor: colors.primary,
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                            },
                        ]}
                        activeOpacity={0.85}
                        onPress={handleExit}
                    >
                        <Text
                            style={[
                                styles.secondaryText,
                                {
                                    color: colors.primary,
                                },
                            ]}
                        >
                            Sair
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 24,
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },

    badge: {
        fontSize: 13,
        fontWeight: "600",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        marginBottom: 18,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 34,
        marginBottom: 14,
        maxWidth: 320,
    },

    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        maxWidth: 340,
    },

    linkText: {
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 22,
    },

    buttons: {
        width: "100%",
        gap: 14,
    },

    secondaryButton: {
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },

    secondaryText: {
        fontSize: 16,
        fontWeight: "600",
    },
});

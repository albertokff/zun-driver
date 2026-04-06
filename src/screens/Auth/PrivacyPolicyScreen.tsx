/*
========================================================
TELA: PRIVACY POLICY (POLÍTICA DE PRIVACIDADE)

OBJETIVO:
- Informar o usuário sobre os termos de uso
- Solicitar aceite antes de continuar o cadastro
- Seguir o padrão visual inspirado na 99:
  fundo fixo + fundo atenuado + card inferior

FLUXO:
- "Concordo" → Permissions
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
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

// Componentes reutilizáveis
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

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
    const { colors, isDark } = useTheme();

    /*
    ========================================================
    LOGO DE FUNDO
    Como o fundo usa a cor principal da marca, a logo branca
    gera melhor contraste.
    ========================================================
    */
    const logo = require("../../assets/logo/zun-logo-white.png");

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
                    backgroundColor: colors.primary,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.primary}
            />

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
            >
                {/* ========================================================
                    FUNDO COM MARCA CENTRALIZADA
                ======================================================== */}
                <View style={styles.brandArea}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.brandText}>Zun Motorista</Text>
                </View>

                {/* ========================================================
                    FUNDO ATENUADO
                    Não é uma camada escura pesada.
                    Serve apenas para tirar foco do fundo e destacar o card.
                ======================================================== */}
                <View
                    style={[
                        styles.overlay,
                        {
                            backgroundColor: isDark
                                ? "rgba(255, 255, 255, 0.06)"
                                : "rgba(255, 255, 255, 0.18)",
                        },
                    ]}
                />

                {/* ========================================================
                    CARD PRINCIPAL
                ======================================================== */}
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.surface,
                        },
                    ]}
                >
                    {/* Título principal */}
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Política de privacidade e uso Zun Motorista
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
                        Antes de usar os produtos ou serviços da Zun Motorista,
                        leia atentamente os Termos de Uso, as regras da
                        plataforma e a Política de Privacidade. Ao tocar em
                        "Concordo" e usar nossos produtos e serviços, você
                        confirma que leu, entendeu e concorda em agir de acordo
                        com os termos.
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
                            Privacidade e uso da Zun Motorista &gt;
                        </Text>
                    </TouchableOpacity>

                    {/* ========================================================
                        BOTÕES DE AÇÃO
                    ======================================================== */}
                    <View style={styles.buttons}>
                        {/* BOTÃO PRINCIPAL */}
                        <ButtonPrimary
                            title="Concordo"
                            onPress={handleAgree}
                            isDark={isDark}
                        />

                        {/* BOTÃO SECUNDÁRIO */}
                        <ButtonSecondary
                            title="Sair"
                            onPress={handleExit}
                            isDark={isDark}
                        />
                    </View>
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
        justifyContent: "flex-end",
    },

    brandArea: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    logo: {
        width: 150,
        height: 150,
        opacity: 0.22,
        marginBottom: 8,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "300",
        color: "rgba(255,255,255,0.58)",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
    },

    card: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 22,
        paddingTop: 30,
        paddingBottom: 28,
        minHeight: 560,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 32,
        marginBottom: 18,
    },

    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },

    linkText: {
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 22,
        marginBottom: 28,
    },

    buttons: {
        gap: 14,
        marginTop: "auto",
    },
});

/*
========================================================
TELA INICIAL - START

OBJETIVO:
- Apresentar a marca Zun Motorista
- Direcionar para login ou criação de conta
- Manter consistência visual com a SplashScreen
- Usar os botões no padrão oficial da Zun

FLUXO:
- Entrar → Phone (login)
- Criar conta → PrivacyPolicy
========================================================
*/

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

/*
========================================================
TIPAGEM PARA NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

export default function StartScreen() {
    const { theme, colors, isDark } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    LOGO POR TEMA
    ========================================================
    */
    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

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

            <View style={styles.container}>
                {/* ========================================================
                    BLOCO CENTRAL DE MARCA
                    Ajustado para alinhar visualmente com a SplashScreen
                ======================================================== */}
                <View style={styles.centerContent}>
                    <View style={styles.logoBlock}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text
                            style={[
                                styles.brandText,
                                { color: colors.subtext },
                            ]}
                        >
                            Z - Motorista
                        </Text>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Bem-vindo à Zun
                        </Text>

                        <Text
                            style={[styles.subtitle, { color: colors.subtext }]}
                        >
                            Ganhe mais dirigindo com liberdade.
                        </Text>
                    </View>
                </View>

                {/* ========================================================
                    BOTÕES
                ======================================================== */}
                <View style={styles.buttonsContainer}>
                    <ButtonPrimary
                        title="Entrar"
                        onPress={() =>
                            navigation.navigate("Phone", {
                                fromLogin: true,
                            })
                        }
                        isDark={isDark}
                    />

                    <ButtonSecondary
                        title="Criar minha conta"
                        onPress={() => navigation.navigate("PrivacyPolicy")}
                        isDark={isDark}
                    />

                    <Text
                        style={[styles.footerText, { color: colors.subtext }]}
                    >
                        Ao continuar, você concorda com os termos e a política
                        de privacidade.
                    </Text>
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
        paddingHorizontal: 24,
        paddingBottom: 12,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 220, // Ajuste para alinhar com a SplashScreen
    },

    logoBlock: {
        alignItems: "center",
        width: "100%",
    },

    logo: {
        width: 190,
        height: 190,
        marginBottom: 6,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.6,
        marginBottom: 12,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
    },

    buttonsContainer: {
        width: "100%",
        paddingBottom: 8,
        gap: 12,
    },

    footerText: {
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
        marginTop: 6,
        paddingHorizontal: 10,
    },
});

/*
========================================================
TELA: SPLASH SCREEN

OBJETIVO:
- Apresentar a identidade visual da Zun
- Criar uma primeira impressão forte e elegante
- Preparar a transição para a StartScreen
- Manter alinhamento visual com a tela de boas-vindas

COMPORTAMENTO:
- Exibe logo com animação suave
- Exibe identificação "Zun Motorista"
- Após alguns segundos, navega para a StartScreen
========================================================
*/

import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useTheme } from "../../context/ThemeContext";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { colors } = useTheme();

    /*
    ========================================================
    ANIMAÇÕES DA SPLASH
    ========================================================
    */
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.92)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    /*
    ========================================================
    LOGO DA SPLASH
    Como o fundo da splash é azul, usamos a logo branca
    para garantir contraste e legibilidade.
    ========================================================
    */
    const logo = require("../../assets/logo/zun-logo-white.png");

    useEffect(() => {
        /*
        ====================================================
        ANIMAÇÃO DE ENTRADA
        ====================================================
        */
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1100,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 1100,
                useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 1400,
                useNativeDriver: true,
            }),
        ]).start();

        /*
        ====================================================
        TRANSIÇÃO PARA PRÓXIMA TELA
        ====================================================
        */
        const timer = setTimeout(() => {
            navigation.replace("Start");
        }, 2200);

        return () => clearTimeout(timer);
    }, [navigation, opacity, scale, textOpacity]);

    return (
        <View
            style={[
                styles.container,
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

            {/* ========================================================
                BLOCO CENTRAL DE BRANDING
                Mantido com a mesma âncora visual da StartScreen
            ======================================================== */}
            <View style={styles.centerContent}>
                <Animated.Image
                    source={logo}
                    style={[
                        styles.logo,
                        {
                            opacity,
                            transform: [{ scale }],
                        },
                    ]}
                    resizeMode="contain"
                />

                <Animated.Text
                    style={[
                        styles.brandText,
                        {
                            opacity: textOpacity,
                            color: "rgba(255,255,255,0.88)",
                        },
                    ]}
                >
                    Zun Motorista
                </Animated.Text>
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
    },

    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 220,
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 6,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.6,
    },
});

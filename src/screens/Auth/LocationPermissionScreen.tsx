/*
========================================================
TELA DE PERMISSÃO DE LOCALIZAÇÃO

OBJETIVO:
- Representar a etapa 05 do fluxo
- Orientar o usuário a configurar a permissão
- Card deve subir de baixo para cima (igual 99)

FLUXO:
- Permitir → abre config ou segue fluxo
- Cancelar → volta
========================================================
*/

import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image,
    Platform,
    Animated,
    Easing,
} from "react-native";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "LocationPermission"
>;

export default function LocationPermissionScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { colors, isDark } = useTheme();

    const logo = require("../../assets/logo/zun-logo-white.png");

    /*
    ========================================================
    ANIMAÇÃO DO POPUP (CARD)
    ========================================================

    👉 AQUI você controla a velocidade da animação

    - duration: quanto menor = mais rápido
    - duration: quanto maior = mais lento

    Exemplo:
    200 = rápido
    300 = médio (recomendado)
    500 = lento
    ========================================================
    */
    const translateY = useRef(new Animated.Value(120)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,

                // AQUI MUDA A VELOCIDADE DO SUBIR
                duration: 300,

                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),

            Animated.timing(opacity, {
                toValue: 1,

                // AQUI MUDA A VELOCIDADE DO FADE
                duration: 250,

                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    /*
    ================================================
    PERMITIR
    ================================================
    */
    const handleAllow = async () => {
        try {
            if (Platform.OS === "web") {
                navigation.replace("BatteryPermission", {
                    nextScreen: "Start",
                });
                return;
            }

            await Linking.openSettings();
        } catch (error) {
            navigation.replace("BatteryPermission", {
                nextScreen: "Start",
            });
        }
    };

    /*
    ================================================
    CANCELAR
    ================================================
    */
    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors.primary }]}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.primary}
            />

            <View style={styles.container}>
                {/* FUNDO */}
                <View style={styles.brandArea}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.brandText}>Zun Motorista</Text>
                </View>

                {/* OVERLAY */}
                <View
                    style={[
                        styles.overlay,
                        {
                            backgroundColor: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(255,255,255,0.16)",
                        },
                    ]}
                />

                {/* CARD ANIMADO */}
                <Animated.View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.surface,
                            opacity,
                            transform: [{ translateY }],
                        },
                    ]}
                >
                    <Text style={[styles.title, { color: colors.text }]}>
                        Defina o acesso à localização no aplicativo como
                        "Permitir o tempo todo"
                    </Text>

                    <Text
                        style={[styles.description, { color: colors.subtext }]}
                    >
                        Isso ajudará a evitar cálculo incorreto de tarifas,
                        local de embarque impreciso e solicitações de corridas
                        muito distantes.
                    </Text>

                    <View style={styles.buttons}>
                        <ButtonPrimary
                            title="Permitir"
                            onPress={handleAllow}
                            isDark={isDark}
                        />

                        <ButtonSecondary
                            title="Cancelar"
                            onPress={handleCancel}
                            isDark={isDark}
                        />
                    </View>
                </Animated.View>
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
    },

    logo: {
        width: 170,
        height: 170,
        opacity: 0.22,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "600",
        color: "rgba(255,255,255,0.4)",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
    },

    card: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 22,
        paddingTop: 24,
        paddingBottom: 24,
        minHeight: 300,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        marginBottom: 24,
    },

    buttons: {
        gap: 12,
        marginTop: "auto",
    },
});

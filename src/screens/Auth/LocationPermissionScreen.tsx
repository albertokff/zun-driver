/*
========================================================
TELA DE PERMISSÃO DE LOCALIZAÇÃO

OBJETIVO:
- Orientar o usuário a configurar a permissão de
  localização como "Permitir o tempo todo"
- Seguir o padrão visual da referência:
  fundo fixo + fundo atenuado + card inferior

FLUXO:
- Aparece após AssistantPermissionScreen
- Em produção, o botão principal pode abrir as
  configurações do sistema
- No fluxo atual, segue para HomeScreen
========================================================
*/

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image,
} from "react-native";
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
    ================================================
    PERMITIR
    Em produção, aqui pode abrir a tela de configurações
    do sistema para o usuário ajustar a localização.
    No fluxo atual, segue para Home.
    ================================================
    */
    const handleAllow = () => {
        navigation.navigate("Home");
    };

    /*
    ================================================
    CANCELAR
    Volta para a tela anterior do fluxo.
    ================================================
    */
    const handleCancel = () => {
        navigation.goBack();
    };

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
                    Mantém a sensação de tela desativada ao fundo.
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
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Defina o acesso à localização no aplicativo como
                        {"\n"}
                        "Permitir o tempo todo"
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        Isso ajudará a evitar cálculo incorreto de tarifas,
                        local de embarque impreciso e solicitações de corridas
                        muito distantes.
                    </Text>

                    {/* ========================================================
                        BOTÕES DE AÇÃO
                    ======================================================== */}
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
        paddingTop: 24,
        paddingBottom: 24,
        minHeight: 300,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 28,
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },

    buttons: {
        gap: 12,
        marginTop: "auto",
    },
});

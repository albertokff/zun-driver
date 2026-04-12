/*
========================================================
TELA DE PERMISSÃO DE LOCALIZAÇÃO

OBJETIVO:
- Representar a etapa 05 do fluxo
- Orientar o usuário a configurar a permissão de
  localização como "Permitir o tempo todo"
- Seguir o padrão visual da referência:
  fundo fixo + fundo atenuado + card inferior

FLUXO:
- Aparece após o popup do sistema da etapa 04
- Ao tocar em "Permitir", o app deve levar o usuário
  para a etapa 06 (configuração do sistema Android)
- Após essa etapa, seguiremos para a próxima permissão
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
    Alert,
    Platform,
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

    REGRA DO FLUXO:
    - Esta tela representa a etapa 05
    - Ao tocar em "Permitir", precisamos levar o usuário
      para a etapa 06, que é a tela do sistema Android
      para ajuste da localização

    OBSERVAÇÃO:
    - No ambiente web, não existe a tela nativa do sistema
    - Então exibimos apenas uma simulação informativa
    ================================================
    */
    const handleAllow = async () => {
        try {
            /*
            ============================================
            WEB
            Não existe tela nativa de configuração igual
            ao Android, então apenas simulamos a etapa.
            ============================================
            */
            if (Platform.OS === "web") {
                Alert.alert(
                    "Simulação da etapa 06",
                    'No Android, aqui abriria a tela do sistema para ajustar a localização como "Permitir o tempo todo".',
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                /*
                                ========================================
                                TEMPORÁRIO
                                Depois da etapa 06, o próximo bloco será
                                a permissão de chamadas telefônicas (07).
                                Como ainda vamos construir essa etapa na
                                sequência, por enquanto apenas voltamos.
                                ========================================
                                */
                                navigation.goBack();
                            },
                        },
                    ],
                );
                return;
            }

            /*
            ============================================
            ANDROID / iOS
            Como aproximação segura, abrimos as
            configurações do app para o usuário ajustar
            a permissão manualmente.
            ============================================
            */
            await Linking.openSettings();
        } catch (error) {
            Alert.alert(
                "Erro",
                "Não foi possível abrir as configurações do dispositivo.",
            );
        }
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
                                : "rgba(255, 255, 255, 0.16)",
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
                        Defina o acesso à localização no aplicativo como{" "}
                        "Permitir o tempo todo"
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            {
                                color: colors.subtext,
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
        width: 170,
        height: 170,
        opacity: 0.22,
        marginBottom: 8,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.4,
        color: "rgba(255,255,255,0.42)",
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

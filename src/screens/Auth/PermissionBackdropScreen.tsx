/*
========================================
PERMISSION BACKDROP SCREEN

Tela educativa antes de abrir
a permissão do sistema.

PADRÃO VISUAL:
- Fundo com identidade da marca
- Fundo atenuado para tirar foco do fundo
- Card inferior com instrução clara
- Estrutura inspirada em apps como:
  Uber
  99
  iFood

FLUXO:

PermissionsScreen
      ↓
PermissionBackdropScreen
      ↓
Popup do sistema
      ↓
BatteryPermissionScreen
      ↓
PhoneScreen
========================================
*/

import React from "react";
import {
    StatusBar,
    Alert,
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import {
    useSystemPermissions,
    PermissionType,
} from "../../hooks/useSystemPermissions";
import { DEV_SIMULATE_PERMISSION } from "../../constants/permissions";

/*
TIPAGEM DE NAVEGAÇÃO
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PermissionBackdrop"
>;

type ScreenRouteProp = RouteProp<RootStackParamList, "PermissionBackdrop">;

export default function PermissionBackdropScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { colors, isDark } = useTheme();

    /*
    ========================================================
    HOOK CENTRALIZADO DE PERMISSÕES
    ========================================================
    */
    const { requestPermission, openSettings } = useSystemPermissions();

    /*
    ========================================================
    PERMISSÃO RECEBIDA DA TELA ANTERIOR
    Mantido para integração real do fluxo
    ========================================================
    */
    const { permissionToRequest } = route.params;

    /*
    ========================================================
    LOGO PARA O FUNDO DA TELA
    Como o fundo é azul, usamos a versão branca
    ========================================================
    */
    const logo = require("../../assets/logo/zun-logo-white.png");

    /*
    ========================================
    TEXTO DINÂMICO POR TIPO DE PERMISSÃO
    ========================================
    */
    const getPermissionContent = (type: PermissionType | string) => {
        switch (type) {
            case "location":
                return {
                    title: "Permitir acesso à localização",
                    description:
                        "Isso ajuda a calcular rotas, melhorar a precisão das corridas e aumentar a segurança durante o uso do app.",
                };

            case "camera":
                return {
                    title: "Permitir acesso à câmera",
                    description:
                        "Isso permite capturar fotos de documentos e concluir etapas importantes do seu cadastro.",
                };

            case "media-library":
                return {
                    title: "Permitir acesso à galeria",
                    description:
                        "Isso permite selecionar imagens e documentos salvos no seu dispositivo durante o cadastro.",
                };

            default:
                return {
                    title: "Permitir acesso",
                    description:
                        "Essa permissão é necessária para melhorar sua experiência no aplicativo.",
                };
        }
    };

    const { title, description } = getPermissionContent(permissionToRequest);

    /*
    ========================================
    FUNÇÃO PARA PEDIR PERMISSÃO
    ========================================
    */
    const askPermission = async () => {
        try {
            /*
            ========================================
            MODO SIMULADO (DEV / WEB)
            ========================================
            */
            if (DEV_SIMULATE_PERMISSION || Platform.OS === "web") {
                Alert.alert(title, description, [
                    {
                        text: "Negar",
                        style: "cancel",
                        onPress: () => navigation.goBack(),
                    },
                    {
                        text: "Permitir",
                        onPress: () =>
                            navigation.replace("BatteryPermission", {
                                nextScreen: "Phone",
                            }),
                    },
                ]);

                return;
            }

            /*
            ========================================
            PERMISSÃO REAL DO SISTEMA
            ========================================
            */
            const result = await requestPermission(
                permissionToRequest as PermissionType,
            );

            /*
            ========================================
            RESULTADOS POSSÍVEIS
            ========================================
            */
            if (result === "granted") {
                navigation.replace("BatteryPermission", {
                    nextScreen: "Phone",
                });
                return;
            }

            if (result === "denied") {
                Alert.alert(
                    "Permissão necessária",
                    "Para continuar, precisamos dessa permissão ativada.",
                );
                return;
            }

            if (result === "blocked") {
                Alert.alert(
                    "Permissão bloqueada",
                    "Ative essa permissão nas configurações do aplicativo para continuar.",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel",
                        },
                        {
                            text: "Abrir configurações",
                            onPress: openSettings,
                        },
                    ],
                );
                return;
            }

            Alert.alert(
                "Permissão indisponível",
                "Não foi possível solicitar essa permissão neste dispositivo.",
            );
        } catch (error) {
            Alert.alert("Erro", "Erro ao solicitar permissão.");
        }
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
            {/* ========================================
                STATUS BAR
            ======================================== */}
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
                {/* ========================================
                    FUNDO COM MARCA
                ======================================== */}
                <View style={styles.brandArea}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.brandText}>Zun Motorista</Text>
                </View>

                {/* ========================================
                    FUNDO ATENUADO
                    Mantém a sensação de tela ao fundo desativada
                ======================================== */}
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

                {/* ========================================
                    CARD INFERIOR
                ======================================== */}
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
                        {title}
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        {description}
                    </Text>

                    <View style={styles.button}>
                        <View style={styles.fullWidth}>
                            <ButtonPrimary
                                title="Permitir"
                                onPress={askPermission}
                                isDark={isDark}
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <View style={styles.fullWidth}>
                            <ButtonSecondary
                                title="Não permitir"
                                onPress={() => navigation.goBack()}
                                isDark={isDark}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================
ESTILOS
========================================
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
        minHeight: 320,
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

    button: {
        marginBottom: 12,
    },

    fullWidth: {
        width: "100%",
    },
});

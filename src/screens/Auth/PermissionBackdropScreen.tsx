/*
========================================
PERMISSION BACKDROP SCREEN

OBJETIVO:
- Representar a etapa 04 do fluxo
- Mostrar apenas o fundo da marca Zun
  desfocado / atenuado
- Disparar a permissão do sistema por cima

PADRÃO VISUAL:
- Fundo azul da Zun
- Logo branca apagada ao centro
- Sem card inferior
- Sem botões visíveis
- Popup do sistema deve aparecer por cima

FLUXO:

PermissionsScreen
      ↓
PermissionBackdropScreen  (tela 04)
      ↓
Popup do sistema
      ↓
LocationPermissionScreen (tela 05)
========================================
*/

import React, { useEffect, useRef } from "react";
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
import {
    useSystemPermissions,
    PermissionType,
} from "../../hooks/useSystemPermissions";
import { DEV_SIMULATE_PERMISSION } from "../../constants/permissions";

/*
========================================
TIPAGEM DE NAVEGAÇÃO
========================================
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
    ========================================================
    */
    const { permissionToRequest } = route.params;

    /*
    ========================================================
    CONTROLE PARA EVITAR DISPARO DUPLO
    ========================================================
    */
    const hasRequestedRef = useRef(false);

    /*
    ========================================================
    LOGO PARA O FUNDO DA TELA
    Como o fundo é azul, usamos a versão branca
    ========================================================
    */
    const logo = require("../../assets/logo/zun-logo-white.png");

    /*
    ========================================
    FUNÇÃO PARA PEDIR PERMISSÃO
    Esta tela não exibe botões.
    Ela apenas dispara automaticamente o sistema.
    ========================================
    */
    const askPermission = async () => {
        try {
            /*
            ========================================
            MODO SIMULADO (DEV / WEB)
            ========================================
            No desenvolvimento e na web, simulamos o
            comportamento do sistema e seguimos para a
            próxima tela do fluxo: 05
            ========================================
            */
            if (DEV_SIMULATE_PERMISSION || Platform.OS === "web") {
                setTimeout(() => {
                    navigation.replace("LocationPermission");
                }, 700);

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
                /*
                ====================================
                Após o popup do sistema, seguimos
                para a tela 05 do fluxo
                ====================================
                */
                navigation.replace("LocationPermission");
                return;
            }

            if (result === "denied") {
                Alert.alert(
                    "Permissão necessária",
                    "Para continuar, precisamos dessa permissão ativada.",
                    [
                        {
                            text: "Voltar",
                            onPress: () => navigation.goBack(),
                        },
                    ],
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
                            onPress: () => navigation.goBack(),
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
                [
                    {
                        text: "Voltar",
                        onPress: () => navigation.goBack(),
                    },
                ],
            );
        } catch (error) {
            Alert.alert("Erro", "Erro ao solicitar permissão.", [
                {
                    text: "Voltar",
                    onPress: () => navigation.goBack(),
                },
            ]);
        }
    };

    /*
    ========================================
    DISPARO AUTOMÁTICO DA PERMISSÃO
    A tela 04 não mostra interface interativa
    do app. Ela apenas prepara o fundo da Zun
    e o sistema aparece por cima.
    ========================================
    */
    useEffect(() => {
        if (hasRequestedRef.current) return;

        hasRequestedRef.current = true;
        askPermission();
    }, []);

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
                    FUNDO COM MARCA ZUN
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
                    CAMADA ATENUADA
                    Simula o fundo "desativado" da referência
                ======================================== */}
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
});

/*
========================================================
TELA: BATTERY PERMISSION SCREEN

OBJETIVO:
- Orientar o usuário sobre a importância da permissão
  relacionada à otimização de bateria
- Explicar de forma clara e amigável por que essa etapa
  melhora o recebimento de corridas
- Seguir o padrão visual da referência:
  fundo fixo + fundo atenuado + card inferior

FLUXO ESPERADO:
- Após as permissões anteriores
- Exibe lembrete sobre recebimento de corridas
- Em seguida abre a etapa de otimização de bateria
- Depois segue para a próxima tela configurada
========================================================
*/

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    SafeAreaView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../context/ThemeContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { useBatteryOptimization } from "../../hooks/useBatteryOptimization";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "BatteryPermission"
>;

type ScreenRouteProp = RouteProp<RootStackParamList, "BatteryPermission">;

export const BatteryPermissionScreen = () => {
    const { t } = useTranslation();
    const { colors, isDark } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();
    const { nextScreen } = route.params;

    /*
    ========================================================
    LOGO DE FUNDO
    Como o fundo usa a cor principal da marca, usamos
    a logo branca para melhor contraste visual.
    ========================================================
    */
    const logo = require("../../assets/logo/zun-logo-white.png");

    /*
    ========================================================
    FLUXO DE SUCESSO
    Ao conceder a permissão, segue para a próxima tela
    definida na navegação.
    ========================================================
    */
    const handleSuccess = () => {
        if (nextScreen === "Phone") {
            navigation.replace("Phone", {
                fromLogin: false,
            });
            return;
        }

        if (nextScreen === "Start") {
            navigation.replace("Start");
            return;
        }

        if (nextScreen === "Permissions") {
            navigation.replace("Permissions");
            return;
        }

        navigation.goBack();
    };

    /*
    ========================================================
    FLUXO DE NEGATIVA
    Se o usuário não permitir, volta para a tela anterior.
    ========================================================
    */
    const handleDeny = () => {
        navigation.goBack();
    };

    /*
    ========================================================
    HOOK DE OTIMIZAÇÃO DE BATERIA
    Mantém o comportamento atual centralizado no hook.
    ========================================================
    */
    const { requestPermission } = useBatteryOptimization(
        handleSuccess,
        handleDeny,
    );

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
                    Mantém a sensação de tela desativada ao fundo,
                    sem escurecer excessivamente.
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
                        {t("permissions.batteryOptimization.title")}
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        {t("permissions.batteryOptimization.description")}
                    </Text>

                    {/* ========================================================
                        BOTÕES DE AÇÃO
                    ======================================================== */}
                    <View style={styles.buttons}>
                        <ButtonPrimary
                            title={t("permissions.batteryOptimization.allow")}
                            onPress={requestPermission}
                            isDark={isDark}
                        />

                        <ButtonSecondary
                            title={t("permissions.batteryOptimization.deny")}
                            onPress={handleDeny}
                            isDark={isDark}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
        paddingTop: 26,
        paddingBottom: 24,
        minHeight: 340,
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

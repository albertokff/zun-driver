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
- Animar o card de baixo para cima
- Finalizar o bloco inicial de permissões

FLUXO ESPERADO:
- Após as permissões anteriores
- Exibe lembrete sobre recebimento de corridas
- Em seguida abre a etapa de otimização de bateria
- Depois retorna para a tela inicial
- O app deve lembrar que o motorista já concluiu
  o bloco inicial de permissões
========================================================
*/

import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    SafeAreaView,
    Animated,
    Easing,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    const { colors, isDark, setPermissionsCompleted } = useTheme();

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();
    const { nextScreen } = route.params;

    /*
    ========================================================
    ANIMAÇÃO DO CARD
    Faz o card subir de baixo para cima ao entrar na tela.

    AJUSTE DE VELOCIDADE:
    - duration menor = mais rápido
    - duration maior = mais lento
    ========================================================
    */
    const translateY = useRef(new Animated.Value(120)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,

                /*
                ============================================
                VELOCIDADE DA SUBIDA DO CARD
                Exemplo:
                200 = rápido
                320 = médio
                500 = lento
                ============================================
                */
                duration: 320,

                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,

                /*
                ============================================
                VELOCIDADE DO FADE
                ============================================
                */
                duration: 260,

                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, translateY]);

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
    TEXTO FIXO DA ETAPA
    Mantemos o texto alinhado com a referência da 99
    adaptado para a identidade Zun
    ========================================================
    */
    const title = "Lembrete: solicitações de corridas";
    const description =
        "Detectamos que suas configurações atuais de bateria podem impedir você de receber solicitações de corridas. Para que as solicitações de corridas sejam recebidas adequadamente, você deve permitir a execução deste aplicativo em segundo plano.";
    const allowLabel = "Permitir";
    const denyLabel = "Não permitir";

    /*
    ========================================================
    FINALIZAR BLOCO DE PERMISSÕES

    IMPORTANTE:
    - Ao chegar nesta etapa, o motorista já passou pelo
      bloco inicial de política e permissões
    - Portanto, ao concluir esta tela, marcamos o fluxo
      como concluído para não repetir tudo novamente
    ========================================================
    */
    const finishPermissionsFlow = async () => {
        await setPermissionsCompleted(true);
    };

    /*
    ========================================================
    FLUXO DE SUCESSO
    Ao conceder a permissão, marca o bloco inicial como
    concluído e segue para a próxima tela definida.
    ========================================================
    */
    const handleSuccess = async () => {
        await finishPermissionsFlow();

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
    Mesmo se o usuário negar a otimização, ele já concluiu
    o bloco inicial de permissões. Então marcamos o fluxo
    como concluído para não repetir tudo novamente.
    ========================================================
    */
    const handleDeny = async () => {
        await finishPermissionsFlow();

        if (nextScreen === "Start") {
            navigation.replace("Start");
            return;
        }

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
                                : "rgba(255, 255, 255, 0.16)",
                        },
                    ]}
                />

                {/* ========================================================
                    CARD PRINCIPAL
                ======================================================== */}
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
                                color: colors.subtext,
                            },
                        ]}
                    >
                        {description}
                    </Text>

                    {/* ========================================================
                        BOTÕES DE AÇÃO
                    ======================================================== */}
                    <View style={styles.buttons}>
                        <ButtonPrimary
                            title={allowLabel}
                            onPress={requestPermission}
                            isDark={isDark}
                        />

                        <ButtonSecondary
                            title={denyLabel}
                            onPress={handleDeny}
                            isDark={isDark}
                        />
                    </View>
                </Animated.View>
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

/*
========================================================
TELA DE PERMISSÃO DO ASSISTENTE

OBJETIVO:
- Solicitar ativação do assistente para receber
  solicitações de corrida e notificações
- Manter uma experiência clara, confortável e moderna
- Seguir o novo padrão visual do fluxo da Zun

FLUXO:
- Aparece após confirmação do código OTP
- Usuário pode ativar agora ou pular
- Se ativar, segue para a próxima etapa do fluxo
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

import BackButton from "../../components/BackButton";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "AssistantPermission"
>;

export default function AssistantPermissionScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ================================================
    ATIVAR ASSISTENTE AGORA
    Em produção, pode abrir configuração específica
    do Android. No fluxo atual segue para localização.
    ================================================
    */
    const handleActivateNow = () => {
        navigation.navigate("LocationPermission");
    };

    /*
    ================================================
    PULAR / NÃO OBRIGADO
    Segue para a próxima etapa do fluxo
    ================================================
    */
    const handleSkip = () => {
        navigation.navigate("LocationPermission");
    };

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

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    BOTÃO DE VOLTAR
                ======================================================== */}
                <BackButton />

                {/* ========================================================
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <View style={styles.content}>
                    {/* Badge de contexto */}
                    <Text
                        style={[
                            styles.badge,
                            {
                                color: colors.primary,
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        Assistente do aplicativo
                    </Text>

                    {/* Ilustração simplificada */}
                    <View
                        style={[
                            styles.illustrationContainer,
                            {
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.phoneCard,
                                {
                                    backgroundColor: colors.inputBackground,
                                    borderColor: colors.divider,
                                },
                            ]}
                        >
                            <Ionicons
                                name="phone-portrait-outline"
                                size={42}
                                color={colors.primary}
                            />
                        </View>

                        <View
                            style={[
                                styles.switchTrack,
                                {
                                    backgroundColor: colors.green,
                                },
                            ]}
                        >
                            <View style={styles.switchThumb} />
                        </View>

                        <View
                            style={[
                                styles.locationBadge,
                                {
                                    backgroundColor: isDark
                                        ? colors.inputBackground
                                        : colors.background,
                                    borderColor: colors.divider,
                                },
                            ]}
                        >
                            <Ionicons
                                name="navigate"
                                size={26}
                                color={colors.primary}
                            />
                        </View>
                    </View>

                    {/* Título */}
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Ative o assistente para receber solicitações e
                        notificações
                    </Text>

                    {/* Descrição */}
                    <Text
                        style={[
                            styles.description,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        Configure ações rápidas para visualizar alertas do app e
                        responder com mais agilidade quando chegar uma
                        solicitação.
                    </Text>
                </View>

                {/* ========================================================
                    BOTÕES DE AÇÃO
                ======================================================== */}
                <View
                    style={[
                        styles.footer,
                        {
                            backgroundColor: colors.background,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <ButtonPrimary
                        title="Ativar agora"
                        onPress={handleActivateNow}
                        isDark={isDark}
                    />

                    <View style={styles.secondaryButtonWrapper}>
                        <ButtonSecondary
                            title="Não, obrigado(a)"
                            onPress={handleSkip}
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
        justifyContent: "space-between",
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    badge: {
        alignSelf: "flex-start",
        fontSize: 13,
        fontWeight: "600",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        marginBottom: 22,
    },

    illustrationContainer: {
        width: 220,
        height: 220,
        borderRadius: 28,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
        position: "relative",
    },

    phoneCard: {
        width: 90,
        height: 120,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    switchTrack: {
        position: "absolute",
        top: 52,
        right: 34,
        width: 64,
        height: 34,
        borderRadius: 18,
        justifyContent: "center",
    },

    switchThumb: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-end",
        marginRight: 3,
    },

    locationBadge: {
        position: "absolute",
        bottom: 34,
        right: 44,
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 34,
        marginBottom: 14,
        maxWidth: 330,
    },

    description: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        maxWidth: 330,
    },

    footer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 20,
        borderTopWidth: 1,
    },

    secondaryButtonWrapper: {
        marginTop: 14,
    },
});

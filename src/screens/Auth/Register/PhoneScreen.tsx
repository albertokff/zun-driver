/*
========================================================
TELA DE TELEFONE

OBJETIVO:
- Permitir que o usuário informe o telefone
- Suportar os dois fluxos:
  1) Login
  2) Cadastro
- Seguir o padrão visual da referência da 99,
  adaptado para a identidade Zun

FLUXO:
- Login:
  Entrar → Phone → Otp

- Cadastro:
  Criar minha conta → Phone → Otp

REGRAS:
- fromLogin = true  → fluxo de login
- fromLogin = false → fluxo de cadastro
========================================================
*/

import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { usePhoneMask } from "../../../hooks/usePhoneMask";
import { useTheme } from "../../../context/ThemeContext";
import ButtonPrimary from "@/components/ButtonPrimary";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Phone">;

// Tipagem para rota com parâmetros
type PhoneRouteProp = RouteProp<RootStackParamList, "Phone">;

export default function PhoneScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<PhoneRouteProp>();

    /*
    ========================================================
    HOOK DE MÁSCARA DE TELEFONE
    ========================================================
    */
    const { phone, unmaskedPhone, isPhoneValid, handlePhoneChange } =
        usePhoneMask();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    ESTADO DO CHECKBOX DE ACEITE
    No fluxo de cadastro, o usuário precisa aceitar os
    termos antes de avançar.
    ========================================================
    */
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    /*
    ================================================
    VERIFICAR SE VEIO DO FLUXO DE LOGIN
    route.params pode ser undefined, então usamos || {}
    ================================================
    */
    const { fromLogin = false } = route.params || {};

    /*
    ========================================================
    PODE AVANÇAR?
    - Login: telefone válido
    - Cadastro: telefone válido + aceite
    ========================================================
    */
    const canContinue = useMemo(() => {
        if (fromLogin) {
            return isPhoneValid;
        }

        return isPhoneValid && acceptedTerms;
    }, [fromLogin, isPhoneValid, acceptedTerms]);

    /*
    ================================================
    AVANÇAR PARA OTP
    Passa o parâmetro fromLogin para a próxima tela
    ================================================
    */
    const handleNext = () => {
        if (!canContinue) return;

        navigation.navigate("Otp", {
            phone: unmaskedPhone,
            fromLogin,
        });
    };

    /*
    ================================================
    VOLTAR
    ================================================
    */
    const handleBack = () => {
        navigation.goBack();
    };

    /*
    ================================================
    FECHAR
    ================================================
    */
    const handleClose = () => {
        navigation.navigate("Start");
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
                    TOPO PADRONIZADO
                    Mesmo padrão visual das telas seguintes
                ======================================================== */}
                <View
                    style={[
                        styles.topBar,
                        {
                            backgroundColor: colors.background,
                            borderBottomColor: colors.divider,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleBack}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleClose}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.topBrand,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Zun
                    </Text>

                    <View style={styles.topSpacer} />
                </View>

                {/* ========================================================
                    BANNER SUPERIOR
                    No cadastro mostramos o banner em destaque.
                    No login usamos um banner mais simples para manter
                    a consistência do layout.
                ======================================================== */}
                <View
                    style={[
                        styles.banner,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}
                >
                    <View style={styles.bannerTextContainer}>
                        <Text
                            style={[
                                styles.bannerTitle,
                                {
                                    color: colors.white,
                                },
                            ]}
                        >
                            {fromLogin
                                ? "Acesse sua conta com segurança"
                                : "Na Zun sua segurança é prioridade!"}
                        </Text>

                        <Text
                            style={[
                                styles.bannerSubtitle,
                                {
                                    color: colors.white,
                                },
                            ]}
                        >
                            {fromLogin
                                ? "Informe seu número para receber o código de verificação."
                                : "Monitoramos suas corridas em tempo real e fortalecemos a segurança do motorista."}
                        </Text>
                    </View>

                    <View style={styles.bannerIconWrap}>
                        <Ionicons
                            name={
                                fromLogin
                                    ? "shield-checkmark-outline"
                                    : "shield-checkmark"
                            }
                            size={40}
                            color={colors.white}
                        />
                    </View>
                </View>

                {/* ========================================================
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <View style={styles.content}>
                    {/* ====================================================
                        CARD DO TELEFONE
                    ==================================================== */}
                    <View
                        style={[
                            styles.phoneCard,
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
                                styles.phoneInputRow,
                                {
                                    backgroundColor: colors.background,
                                    borderColor: colors.divider,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.countryCodeWrap,
                                    {
                                        borderRightColor: colors.divider,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.countryCodeText,
                                        {
                                            color: colors.subtext,
                                        },
                                    ]}
                                >
                                    +55
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.phoneInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                value={phone}
                                onChangeText={handlePhoneChange}
                                placeholder="Número de telefone"
                                placeholderTextColor={colors.subtext}
                                keyboardType="numeric"
                                maxLength={15}
                                returnKeyType="done"
                            />
                        </View>

                        <TouchableOpacity activeOpacity={0.8}>
                            <Text
                                style={[
                                    styles.helpLink,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                Ajuda com o cadastro &gt;
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ====================================================
                        CARD INFORMATIVO
                        Mostrado apenas no fluxo de cadastro, inspirado
                        na referência da 99.
                    ==================================================== */}
                    {!fromLogin && (
                        <View
                            style={[
                                styles.infoCard,
                                {
                                    backgroundColor: "#FFF8E1",
                                    borderColor: colors.divider,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.infoTitle,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                Dirija com tranquilidade
                            </Text>

                            <Text
                                style={[
                                    styles.infoDescription,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                Entre nossas iniciativas, você encontra recursos
                                de segurança, monitoramento e suporte para
                                ajudar durante sua jornada.
                            </Text>
                        </View>
                    )}
                </View>

                {/* ========================================================
                    RODAPÉ
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
                    {/* ====================================================
                        CHECKBOX DE ACEITE
                        Apenas no cadastro
                    ==================================================== */}
                    {!fromLogin && (
                        <TouchableOpacity
                            style={styles.termsRow}
                            activeOpacity={0.8}
                            onPress={() => setAcceptedTerms((prev) => !prev)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    {
                                        borderColor: colors.subtext,
                                        backgroundColor: acceptedTerms
                                            ? colors.primary
                                            : colors.background,
                                    },
                                ]}
                            >
                                {acceptedTerms && (
                                    <Ionicons
                                        name="checkmark"
                                        size={14}
                                        color={colors.white}
                                    />
                                )}
                            </View>

                            <Text
                                style={[
                                    styles.termsText,
                                    {
                                        color: colors.subtext,
                                    },
                                ]}
                            >
                                Aceitar Termos de Uso e Privacidade
                            </Text>
                        </TouchableOpacity>
                    )}

                    <ButtonPrimary
                        title={fromLogin ? "Continuar" : "Cadastre-se agora"}
                        onPress={handleNext}
                        isDark={isDark}
                        disabled={!canContinue}
                    />
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
    },

    /*
    ========================================================
    TOPO PADRONIZADO
    ========================================================
    */
    topBar: {
        height: 56,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },

    topIconButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 2,
    },

    topBrand: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 4,
    },

    topSpacer: {
        flex: 1,
    },

    /*
    ========================================================
    BANNER
    Mantido com altura padrão do fluxo
    ========================================================
    */
    banner: {
        minHeight: 108,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    bannerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    bannerTitle: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 4,
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    bannerIconWrap: {
        width: 56,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    CONTEÚDO
    ========================================================
    */
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    /*
    ========================================================
    CARD DO TELEFONE
    ========================================================
    */
    phoneCard: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
    },

    phoneInputRow: {
        minHeight: 56,
        borderWidth: 1,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 0,
    },

    countryCodeWrap: {
        width: 68,
        height: "100%",
        borderRightWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    countryCodeText: {
        fontSize: 18,
        fontWeight: "500",
    },

    phoneInput: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    helpLink: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: "600",
    },

    /*
    ========================================================
    CARD INFORMATIVO
    ========================================================
    */
    infoCard: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
    },

    infoTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },

    infoDescription: {
        fontSize: 15,
        lineHeight: 22,
    },

    /*
    ========================================================
    RODAPÉ
    ========================================================
    */
    footer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        borderTopWidth: 1,
    },

    termsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    termsText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
});

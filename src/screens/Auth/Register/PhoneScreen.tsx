/*
========================================================
TELA DE TELEFONE
Usuário insere número de telefone para login ou cadastro.

FLUXO ATUALIZADO:
- Diferencia entre Login e Cadastro
- Login: Botão "Entrar" na StartScreen passa fromLogin: true
- Cadastro: Botão "Criar conta" na StartScreen passa fromLogin: false

PARÂMETROS RECEBIDOS:
- fromLogin?: boolean (opcional)
  - true: Fluxo de Login (Entrar)
  - false/undefined: Fluxo de Cadastro
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

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { usePhoneMask } from "../../../hooks/usePhoneMask";
import { useTheme } from "../../../context/ThemeContext";

import BackButton from "../../../components/BackButton";
import ButtonPrimary from "../../../components/ButtonPrimary";
import FormTextInput from "../../../components/FormTextInput";

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
    ================================================
    VERIFICAR SE VEIO DO FLUXO DE LOGIN
    route.params pode ser undefined, então usamos || {}
    ================================================
    */
    const { fromLogin = false } = route.params || {};

    /*
    ================================================
    AVANÇAR PARA OTP
    Passa o parâmetro fromLogin para a próxima tela
    ================================================
    */
    const handleNext = () => {
        if (!isPhoneValid) return;

        navigation.navigate("Otp", {
            phone: unmaskedPhone,
            fromLogin,
        });
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
                {/* BOTÃO VOLTAR */}
                <BackButton />

                {/* ========================================================
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <View style={styles.content}>
                    {/* Badge de contexto da etapa */}
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
                        {fromLogin ? "Acessar conta" : "Cadastro do motorista"}
                    </Text>

                    {/* TÍTULO */}
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Digite seu telefone
                    </Text>

                    {/* SUBTÍTULO */}
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        {fromLogin
                            ? "Informe o número vinculado à sua conta para continuar."
                            : "Vamos usar seu número para continuar o cadastro com segurança."}
                    </Text>

                    {/* INPUT DE TELEFONE */}
                    <View style={styles.inputWrapper}>
                        <FormTextInput
                            label="Telefone"
                            value={phone}
                            onChangeText={handlePhoneChange}
                            isDark={isDark}
                            placeholder="(00) 00000-0000"
                            keyboardType="numeric"
                            maxLength={15}
                            returnKeyType="done"
                        />
                    </View>
                </View>

                {/* ========================================================
                    ÁREA DE AÇÃO
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
                        title="Continuar"
                        onPress={handleNext}
                        isDark={isDark}
                        disabled={!isPhoneValid}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            style={[
                                styles.footerHelper,
                                {
                                    color: colors.textSecondary,
                                },
                            ]}
                        >
                            {fromLogin
                                ? "Voltar para a tela inicial"
                                : "Ainda não é necessário informar senha"}
                        </Text>
                    </TouchableOpacity>
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
        marginBottom: 18,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 34,
        marginBottom: 10,
        maxWidth: 320,
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
        maxWidth: 340,
    },

    inputWrapper: {
        marginTop: 4,
    },

    footer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 20,
        borderTopWidth: 1,
    },

    footerHelper: {
        marginTop: 14,
        fontSize: 13,
        textAlign: "center",
    },
});

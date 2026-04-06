/*
========================================================
TELA DE VERIFICAÇÃO DE CÓDIGO OTP
Usuário insere o código de 6 dígitos enviado por SMS.

FLUXO ATUALIZADO:
- Diferencia entre Login e Cadastro
- Login: Após confirmar, vai para AssistantPermission
- Cadastro: Após confirmar, vai para Password

PARÂMETROS RECEBIDOS:
- fromLogin?: boolean (opcional)
  - true: Fluxo de Login
  - false/undefined: Fluxo de Cadastro
========================================================
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

import BackButton from "../../../components/BackButton";
import ButtonPrimary from "../../../components/ButtonPrimary";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Otp">;

// Tipagem para rota com parâmetros
type OtpRouteProp = RouteProp<RootStackParamList, "Otp">;

export default function OtpScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OtpRouteProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    ESTADOS DA TELA
    ========================================================
    */
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(60);

    /*
    ================================================
    VERIFICAR SE VEIO DO FLUXO DE LOGIN
    route.params pode ser undefined, então usamos || {}
    ================================================
    */
    const { fromLogin = false, phone } = route.params || {};

    /*
    ================================================
    TIMER DE REENVIO
    Decrementa a cada segundo até chegar a 0
    ================================================
    */
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    /*
    ================================================
    CONFIRMAR CÓDIGO
    Navegação condicional baseada no fluxo (Login/Cadastro)
    ================================================
    */
    const handleConfirm = () => {
        if (code.length !== 6) return;

        // Aqui futuramente validará o código com backend
        if (fromLogin) {
            /*
            ================================================
            FLUXO DE LOGIN (ENTRAR)
            Após confirmar código, vai para permissões
            ================================================
            */
            navigation.navigate("AssistantPermission");
        } else {
            /*
            ================================================
            FLUXO DE CADASTRO
            Após confirmar código, cria senha
            ================================================
            */
            navigation.navigate("Password");
        }
    };

    /*
    ================================================
    REENVIAR CÓDIGO
    Permite reenviar o SMS após timer chegar a 0
    ================================================
    */
    const handleResend = () => {
        if (timer > 0) return;

        // Futuramente chamará API de envio SMS
        setTimer(60);
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
                {/* BOTÃO DE VOLTAR */}
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
                        {fromLogin
                            ? "Confirmar acesso"
                            : "Verificação de telefone"}
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
                        Digite o código
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
                        Enviamos um código de 6 dígitos por SMS para{" "}
                        <Text style={{ fontWeight: "600", color: colors.text }}>
                            {phone}
                        </Text>
                    </Text>

                    {/* INPUT DO CÓDIGO */}
                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.inputBackground,
                                color: colors.text,
                            },
                        ]}
                        keyboardType="number-pad"
                        maxLength={6}
                        placeholder="000000"
                        placeholderTextColor={colors.placeholder}
                        value={code}
                        onChangeText={(text) =>
                            setCode(text.replace(/\D/g, "").slice(0, 6))
                        }
                        textAlign="center"
                    />

                    {/* TIMER OU LINK DE REENVIO */}
                    <View style={styles.resendContainer}>
                        {timer > 0 ? (
                            <Text
                                style={[
                                    styles.timer,
                                    {
                                        color: colors.textSecondary,
                                    },
                                ]}
                            >
                                Reenviar código em {timer}s
                            </Text>
                        ) : (
                            <TouchableOpacity
                                onPress={handleResend}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.resend,
                                        {
                                            color: colors.primary,
                                        },
                                    ]}
                                >
                                    Reenviar código
                                </Text>
                            </TouchableOpacity>
                        )}
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
                        title="Confirmar"
                        onPress={handleConfirm}
                        isDark={isDark}
                        disabled={code.length !== 6}
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

    input: {
        borderWidth: 1,
        borderRadius: 16,
        height: 62,
        fontSize: 24,
        letterSpacing: 12,
        paddingHorizontal: 16,
        fontWeight: "600",
    },

    resendContainer: {
        marginTop: 18,
        minHeight: 24,
        justifyContent: "center",
    },

    timer: {
        fontSize: 14,
        textAlign: "center",
    },

    resend: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },

    footer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 20,
        borderTopWidth: 1,
    },
});

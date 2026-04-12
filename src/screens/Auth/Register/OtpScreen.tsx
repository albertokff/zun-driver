/*
========================================================
TELA DE VERIFICAÇÃO DE CÓDIGO OTP

OBJETIVO:
- Permitir que o usuário informe o código de 6 dígitos
  enviado por SMS
- Seguir o padrão visual da referência da 99
  adaptado para a identidade Zun

FLUXO:
- Login:
  Phone → Otp → Home

- Cadastro:
  Phone → Otp → DriverCategory

PARÂMETROS RECEBIDOS:
- phone: telefone enviado pela tela anterior
- fromLogin?: boolean
  - true  = fluxo de login
  - false = fluxo de cadastro
========================================================
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import ButtonPrimary from "@/components/ButtonPrimary";

/*
========================================================
TIPAGEM PARA NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Otp">;

/*
========================================================
TIPAGEM DA ROTA
========================================================
*/
type OtpRouteProp = RouteProp<RootStackParamList, "Otp">;

export default function OtpScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OtpRouteProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors } = useTheme();

    /*
    ========================================================
    ESTADOS DA TELA
    ========================================================
    */
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(54);

    /*
    ========================================================
    REFERÊNCIA DO INPUT INVISÍVEL
    Usamos um único TextInput invisível para controlar
    as 6 caixas visuais do código.
    ========================================================
    */
    const inputRef = useRef<TextInput>(null);

    /*
    ================================================
    PARÂMETROS RECEBIDOS
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
    CÓDIGO FORMATADO EM 6 POSIÇÕES
    Cada caractere é exibido em sua própria caixa
    ================================================
    */
    const codeDigits = useMemo(() => {
        return Array.from({ length: 6 }, (_, index) => code[index] || "");
    }, [code]);

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

    /*
    ================================================
    CONFIRMAR CÓDIGO

    REGRA DE FLUXO:
    - Login    → Home
    - Cadastro → DriverCategory
    ================================================
    */
    const handleConfirm = () => {
        if (code.length !== 6) return;

        /*
        ============================================
        FUTURAMENTE:
        Aqui será feita a validação real com backend
        ============================================
        */
        if (fromLogin) {
            navigation.replace("Home");
            return;
        }

        navigation.replace("DriverCategory");
    };

    /*
    ================================================
    REENVIAR CÓDIGO
    Permite reenviar o SMS após timer chegar a 0
    ================================================
    */
    const handleResend = () => {
        if (timer > 0) return;

        /*
        ============================================
        FUTURAMENTE:
        Aqui chamaremos a API real de reenvio do SMS
        ============================================
        */
        setTimer(54);
    };

    /*
    ================================================
    FOCAR INPUT INVISÍVEL
    ================================================
    */
    const focusInput = () => {
        inputRef.current?.focus();
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
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <View style={styles.content}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Insira o código de verificação
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: colors.subtext,
                            },
                        ]}
                    >
                        O código de seis dígitos foi enviado para o seu celular
                    </Text>

                    <Text
                        style={[
                            styles.phoneText,
                            {
                                color: colors.subtext,
                            },
                        ]}
                    >
                        {phone}
                    </Text>

                    <View style={styles.codeHeaderRow}>
                        <Text
                            style={[
                                styles.codeLabel,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Código de verificação de 6 dígitos
                        </Text>

                        <Text
                            style={[
                                styles.timerText,
                                {
                                    color: "#E28C4A",
                                },
                            ]}
                        >
                            {timer}s
                        </Text>
                    </View>

                    {/* ====================================================
                        INPUT INVISÍVEL
                        Controla as 6 caixas do código
                    ==================================================== */}
                    <TextInput
                        ref={inputRef}
                        value={code}
                        onChangeText={(text) =>
                            setCode(text.replace(/\D/g, "").slice(0, 6))
                        }
                        keyboardType="number-pad"
                        maxLength={6}
                        style={styles.hiddenInput}
                        autoFocus
                    />

                    {/* ====================================================
                        CAIXAS DO CÓDIGO
                    ==================================================== */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={focusInput}
                        style={styles.codeBoxesRow}
                    >
                        {codeDigits.map((digit, index) => {
                            const isActive =
                                index === code.length && code.length < 6;
                            const isFilled = digit.length > 0;

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.codeBox,
                                        {
                                            borderColor:
                                                isFilled || isActive
                                                    ? colors.primary
                                                    : colors.divider,
                                            backgroundColor: colors.background,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.codeDigit,
                                            {
                                                color: colors.text,
                                            },
                                        ]}
                                    >
                                        {digit}
                                    </Text>
                                </View>
                            );
                        })}
                    </TouchableOpacity>

                    {/* ====================================================
                        REENVIO
                    ==================================================== */}
                    <View style={styles.resendContainer}>
                        {timer > 0 ? (
                            <Text
                                style={[
                                    styles.resendMuted,
                                    {
                                        color: colors.subtext,
                                    },
                                ]}
                            >
                                Aguarde para reenviar o código
                            </Text>
                        ) : (
                            <TouchableOpacity
                                onPress={handleResend}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.resendLink,
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
                    <ButtonPrimary
                        title="Confirmar"
                        onPress={handleConfirm}
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
    CONTEÚDO
    ========================================================
    */
    content: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 26,
    },

    title: {
        fontSize: 24,
        fontWeight: "400",
        lineHeight: 32,
        marginBottom: 8,
        maxWidth: 320,
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 2,
        maxWidth: 340,
    },

    phoneText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 28,
    },

    codeHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    codeLabel: {
        fontSize: 16,
        lineHeight: 22,
    },

    timerText: {
        fontSize: 16,
        fontWeight: "500",
    },

    hiddenInput: {
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1,
    },

    codeBoxesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    codeBox: {
        width: 48,
        height: 58,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    codeDigit: {
        fontSize: 24,
        fontWeight: "500",
    },

    resendContainer: {
        minHeight: 24,
        justifyContent: "center",
    },

    resendMuted: {
        fontSize: 14,
        lineHeight: 20,
    },

    resendLink: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 20,
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
});

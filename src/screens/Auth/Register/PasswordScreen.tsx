/*
========================================================
TELA DE CRIAÇÃO DE SENHA

Fluxo de cadastro do motorista Zun

REGRAS DE SENHA:
- mínimo 8 caracteres
- possuir pelo menos 2 dos 3 tipos:
    letras
    números
    símbolos

Também mostra feedback visual enquanto o usuário digita.
========================================================
*/

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";
import ButtonPrimary from "../../../components/ButtonPrimary";

/*
========================================================
TIPAGEM DA NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Password">;

/*
========================================================
COMPONENTE PRINCIPAL
========================================================
*/
export default function PasswordScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    STATES
    ========================================================
    */
    const [password, setPassword] = useState("");
    const [eyePassword, setEyePassword] = useState(false);

    /*
    ========================================================
    VALIDAÇÕES INDIVIDUAIS
    ========================================================
    */
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    /*
    Conta quantos tipos de caracteres existem
    */
    const typesCount = [hasLetter, hasNumber, hasSymbol].filter(Boolean).length;

    /*
    Senha válida precisa de pelo menos 2 tipos
    */
    const passwordValid = hasMinLength && typesCount >= 2;

    /*
    ========================================================
    AÇÃO AO CONFIRMAR SENHA
    ========================================================
    */
    const handleConfirm = () => {
        if (!passwordValid) return;

        navigation.navigate("DriverCategory");
    };

    /*
    ========================================================
    RENDER
    ========================================================
    */
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
                        Segurança da conta
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
                        Criar senha
                    </Text>

                    {/* DESCRIÇÃO */}
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        Sua senha deve conter pelo menos dois dos seguintes
                        itens: números, letras ou símbolos.
                    </Text>

                    {/* INPUT DE SENHA */}
                    <View
                        style={[
                            styles.containerInput,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: colors.text,
                                },
                            ]}
                            secureTextEntry={!eyePassword}
                            placeholder="Digite sua senha"
                            placeholderTextColor={colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {/* BOTÃO MOSTRAR / OCULTAR SENHA */}
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setEyePassword(!eyePassword)}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name={
                                    eyePassword
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                size={22}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* =====================================================
                        CHECKLIST DE VALIDAÇÃO
                        Mostra feedback em tempo real
                    ===================================================== */}
                    <View style={styles.rulesContainer}>
                        <RuleItem
                            label="mínimo 8 caracteres"
                            valid={hasMinLength}
                            isDark={isDark}
                        />
                        <RuleItem
                            label="contém letras"
                            valid={hasLetter}
                            isDark={isDark}
                        />
                        <RuleItem
                            label="contém números"
                            valid={hasNumber}
                            isDark={isDark}
                        />
                        <RuleItem
                            label="contém símbolos"
                            valid={hasSymbol}
                            isDark={isDark}
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
                        title="Confirmar"
                        onPress={handleConfirm}
                        isDark={isDark}
                        disabled={!passwordValid}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
COMPONENTE ITEM DE REGRA
Mostra ✓ ou ○ dependendo da validação
========================================================
*/
function RuleItem({
    label,
    valid,
    isDark,
}: {
    label: string;
    valid: boolean;
    isDark: boolean;
}) {
    const { colors } = useTheme();

    return (
        <View style={styles.ruleRow}>
            <Text
                style={[
                    styles.ruleIcon,
                    {
                        color: valid
                            ? colors.success
                            : isDark
                              ? colors.textSecondary
                              : colors.textMuted,
                    },
                ]}
            >
                {valid ? "✓" : "○"}
            </Text>

            <Text
                style={[
                    styles.ruleText,
                    {
                        color: valid
                            ? colors.success
                            : isDark
                              ? colors.textSecondary
                              : colors.textMuted,
                    },
                    valid && styles.ruleValid,
                ]}
            >
                {label}
            </Text>
        </View>
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

    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 58,
        borderRadius: 16,
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 12,
    },

    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 16,
        paddingRight: 8,
    },

    iconContainer: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },

    /*
    ========================================================
    CHECKLIST DE REGRAS
    ========================================================
    */
    rulesContainer: {
        marginTop: 18,
    },

    ruleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    ruleIcon: {
        width: 20,
        fontSize: 15,
        fontWeight: "700",
    },

    ruleText: {
        fontSize: 14,
        lineHeight: 20,
    },

    ruleValid: {
        fontWeight: "600",
    },

    /*
    ========================================================
    ÁREA DE AÇÃO
    ========================================================
    */
    footer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 20,
        borderTopWidth: 1,
    },
});

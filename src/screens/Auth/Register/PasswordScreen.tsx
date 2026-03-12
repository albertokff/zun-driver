/*
========================================================
TELA DE CRIAÇÃO DE SENHA
Fluxo de cadastro do motorista Zun
REGRAS DE SENHA
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

/*
========================================================
TIPAGEM DA NAVEGAÇÃO
========================================================
*/
// CORREÇÃO: A tipagem deve ser referente à tela atual, "Password".
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Password">;

/*
========================================================
COMPONENTE PRINCIPAL
========================================================
*/
export default function PasswordScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";
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
        // Esta linha já estava correta e agora vai funcionar com a tipagem certa.
        navigation.navigate("DriverCategory");
    };
    /*
    ========================================================
    RENDER
    ========================================================
    */
    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* TÍTULO */}
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Criar senha
            </Text>
            {/* DESCRIÇÃO */}
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Deve conter pelo menos dois dos seguintes itens: números, letras
                ou símbolos.
            </Text>
            {/* INPUT DE SENHA */}
            <View style={styles.containerInput}>
                <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    secureTextEntry={!eyePassword}
                    placeholder="********"
                    placeholderTextColor={isDark ? "#777" : "#999"}
                    value={password}
                    onChangeText={setPassword}
                />
                {/* BOTÃO MOSTRAR / OCULTAR SENHA */}
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setEyePassword(!eyePassword)}
                >
                    <Ionicons
                        name={eyePassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color={isDark ? "#BBB" : "#666"}
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
            {/* BOTÃO CONFIRMAR */}
            <TouchableOpacity
                style={[styles.button, { opacity: passwordValid ? 1 : 0.5 }]}
                disabled={!passwordValid}
                onPress={handleConfirm}
            >
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
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
    return (
        <Text
            style={[
                styles.ruleText,
                valid && styles.ruleValid,
                isDark && styles.ruleTextDark,
            ]}
        >
            {valid ? "✓" : "○"} {label}
        </Text>
    );
}
/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },
    containerDark: {
        backgroundColor: "#0B0B0B",
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        color: "#000",
    },
    titleDark: {
        color: "#fff",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 30,
    },
    subtitleDark: {
        color: "#aaa",
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        position: "relative",
    },
    input: {
        flex: 1,
        height: 55,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingRight: 50,
        fontSize: 18,
        color: "#000",
    },
    inputDark: {
        backgroundColor: "#222",
        color: "#FFF",
        borderColor: "#444",
        borderWidth: 1,
    },
    iconContainer: {
        position: "absolute",
        right: 15,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    /*
    ========================================================
    CHECKLIST DE REGRAS
    ========================================================
    */
    rulesContainer: {
        marginTop: 15,
    },
    ruleText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 6,
    },
    ruleTextDark: {
        color: "#AAA",
    },
    ruleValid: {
        color: "#2ECC71",
        fontWeight: "500",
    },
    /*
    ========================================================
    BOTÃO
    ========================================================
    */
    button: {
        marginTop: 30,
        backgroundColor: "#1E6BE3",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

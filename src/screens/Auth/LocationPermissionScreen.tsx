/*
========================================================
TELA DE PERMISSÃO DE LOCALIZAÇÃO
Solicita configuração da permissão de localização como
"Sempre permitir" para o app funcionar corretamente.

FLUXO:
- Aparece após AssistantPermissionScreen
- Instruções visuais de como configurar no Android
- Botão "Entendi" navega para HomeScreen
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "LocationPermission"
>;

export default function LocationPermissionScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    /*
    ================================================
    NAVEGAR PARA HOME
    Após usuário configurar permissão
    ================================================
    */
    const handleContinue = () => {
        // Em produção, aqui poderíamos verificar se a permissão foi concedida
        navigation.navigate("Home");
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
                {/* CABEÇALHO */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#222" />
                    </TouchableOpacity>
                    <Text style={styles.headerClose}>×</Text>
                    <Text style={styles.headerTitle}>Zun</Text>
                </View>

                {/* CONTEÚDO PRINCIPAL */}
                <View style={styles.contentContainer}>
                    {/* TÍTULO */}
                    <Text style={[styles.title, isDark && styles.titleDark]}>
                        Configure as permissões de localização como "Sempre
                        permitir"
                    </Text>

                    {/* ILUSTRAÇÃO */}
                    <View style={styles.illustrationContainer}>
                        <View
                            style={[
                                styles.illustrationBox,
                                isDark && styles.illustrationBoxDark,
                            ]}
                        >
                            <Ionicons
                                name="location"
                                size={50}
                                color="#1E6BE3"
                            />
                            <View style={styles.arrowDown}>
                                <Ionicons
                                    name="arrow-down"
                                    size={24}
                                    color="#666"
                                />
                            </View>
                            <View style={styles.toggleContainer}>
                                <Text
                                    style={[
                                        styles.toggleLabel,
                                        isDark && styles.toggleLabelDark,
                                    ]}
                                >
                                    Permitir acesso à localização
                                </Text>
                                <View style={styles.toggleSwitch}>
                                    <View style={styles.toggleCircle} />
                                </View>
                                <Text
                                    style={[
                                        styles.toggleValue,
                                        isDark && styles.toggleValueDark,
                                    ]}
                                >
                                    Sempre permitir
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* INSTRUÇÕES */}
                    <Text
                        style={[styles.subtitle, isDark && styles.subtitleDark]}
                    >
                        Para que o aplicativo funcione corretamente, siga os
                        passos abaixo:
                    </Text>

                    <View style={styles.stepsContainer}>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>1</Text>
                            </View>
                            <Text
                                style={[
                                    styles.stepText,
                                    isDark && styles.stepTextDark,
                                ]}
                            >
                                Toque em "Permissões" nas configurações do app
                            </Text>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>2</Text>
                            </View>
                            <Text
                                style={[
                                    styles.stepText,
                                    isDark && styles.stepTextDark,
                                ]}
                            >
                                Selecione "Localização"
                            </Text>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <Text
                                style={[
                                    styles.stepText,
                                    isDark && styles.stepTextDark,
                                ]}
                            >
                                Escolha a opção "Sempre permitir"
                            </Text>
                        </View>
                    </View>

                    {/* ALERTA IMPORTANTE */}
                    <View
                        style={[styles.alertBox, isDark && styles.alertBoxDark]}
                    >
                        <Ionicons
                            name="information-circle"
                            size={20}
                            color="#FF9800"
                        />
                        <Text
                            style={[
                                styles.alertText,
                                isDark && styles.alertTextDark,
                            ]}
                        >
                            Sem essa permissão, você não receberá solicitações
                            de corrida.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueButtonText}>Entendi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    containerDark: { backgroundColor: "#0B0B0B" },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    backButton: {
        marginRight: 15,
    },
    headerClose: {
        fontSize: 28,
        color: "#222",
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
    },

    // Conteúdo
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 28,
    },
    titleDark: {
        color: "#FFF",
    },

    // Ilustração
    illustrationContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    illustrationBox: {
        backgroundColor: "#F5F5F5",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        width: "100%",
    },
    illustrationBoxDark: {
        backgroundColor: "#1C1C1E",
    },
    arrowDown: {
        marginVertical: 10,
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginTop: 10,
    },
    toggleLabel: {
        flex: 1,
        fontSize: 14,
        color: "#666",
    },
    toggleLabelDark: {
        color: "#AAA",
    },
    toggleSwitch: {
        width: 40,
        height: 24,
        backgroundColor: "#4CAF50",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 2,
    },
    toggleCircle: {
        width: 20,
        height: 20,
        backgroundColor: "#FFF",
        borderRadius: 10,
    },
    toggleValue: {
        fontSize: 12,
        color: "#4CAF50",
        fontWeight: "600",
        marginLeft: 10,
    },
    toggleValueDark: {
        color: "#81C784",
    },

    // Subtítulo
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        lineHeight: 24,
    },
    subtitleDark: {
        color: "#AAA",
    },

    // Passos
    stepsContainer: {
        marginBottom: 30,
    },
    step: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#1E6BE3",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
    },
    stepTextDark: {
        color: "#AAA",
    },

    // Alerta
    alertBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#FFF3E0",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FFB74D",
    },
    alertBoxDark: {
        backgroundColor: "#3E2723",
        borderColor: "#FF9800",
    },
    alertText: {
        flex: 1,
        fontSize: 14,
        color: "#E65100",
        marginLeft: 10,
        lineHeight: 20,
    },
    alertTextDark: {
        color: "#FFCC80",
    },

    // Footer
    footer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#FFF",
    },
    footerDark: {
        backgroundColor: "#1C1C1E",
    },
    continueButton: {
        backgroundColor: "#1E6BE3",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    continueButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

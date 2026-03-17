/*
========================================================
TELA DE PERMISSÃO DO ASSISTENTE
Modal que solicita ativação do assistente para receber
solicitações de corrida e notificações.

FLUXO:
- Aparece após confirmação do código OTP
- Usuário pode ativar agora ou pular
- Se ativar, abre configurações de sobreposição do Android
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
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
    "AssistantPermission"
>;

export default function AssistantPermissionScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    /*
    ================================================
    ATIVAR ASSISTENTE AGORA
    Redireciona para configurações de sobreposição
    ================================================
    */
    const handleActivateNow = () => {
        // Em produção, isso abriria as configurações do Android
        // Para sobreposição (draw over other apps)
        navigation.navigate("LocationPermission");
    };

    /*
    ================================================
    PULAR / NÃO OBRIGADO
    Vai direto para tela de permissão de localização
    ================================================
    */
    const handleSkip = () => {
        navigation.navigate("LocationPermission");
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
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
                {/* ILUSTRAÇÃO */}
                <View style={styles.illustrationContainer}>
                    <View style={styles.illustration}>
                        <Ionicons
                            name="phone-portrait"
                            size={60}
                            color="#1E6BE3"
                        />
                        <View style={styles.toggleIcon}>
                            <View style={styles.toggleCircle} />
                        </View>
                        <Ionicons name="navigate" size={40} color="#1E6BE3" />
                    </View>
                </View>

                {/* TÍTULO */}
                <Text style={[styles.title, isDark && styles.titleDark]}>
                    Ative o Assistente para receber solicitações e notificações
                </Text>

                {/* DESCRIÇÃO */}
                <Text
                    style={[
                        styles.description,
                        isDark && styles.descriptionDark,
                    ]}
                >
                    Toque no Assistente do aplicativo para configurar ações
                    rápidas para quando chegar uma solicitação ou notificação.
                </Text>

                {/* BOTÕES */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.activateButton}
                        onPress={handleActivateNow}
                    >
                        <Text style={styles.activateButtonText}>
                            Ativar agora
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleSkip}
                    >
                        <Text style={styles.skipButtonText}>
                            Não, obrigado(a)
                        </Text>
                    </TouchableOpacity>
                </View>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    illustrationContainer: {
        marginBottom: 40,
        alignItems: "center",
    },
    illustration: {
        width: 200,
        height: 200,
        backgroundColor: "#F5F5F5",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    toggleIcon: {
        position: "absolute",
        width: 60,
        height: 34,
        backgroundColor: "#4CAF50",
        borderRadius: 17,
        top: 60,
    },
    toggleCircle: {
        width: 30,
        height: 30,
        backgroundColor: "#FFF",
        borderRadius: 15,
        position: "absolute",
        right: 2,
        top: 2,
    },

    // Título
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 32,
    },
    titleDark: {
        color: "#FFF",
    },

    // Descrição
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 40,
    },
    descriptionDark: {
        color: "#AAA",
    },

    // Botões
    buttonsContainer: {
        width: "100%",
        alignItems: "center",
    },
    activateButton: {
        backgroundColor: "#1E6BE3",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 15,
    },
    activateButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    skipButton: {
        backgroundColor: "#F5F5F5",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    skipButtonText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "500",
    },
});

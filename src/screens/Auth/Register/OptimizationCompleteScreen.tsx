/*
========================================================
TELA DE OTIMIZAÇÃO CONCLUÍDA
Mostra foto otimizada com opções de Enviar ou Corrigir.

FLUXO:
- Recebe foto já processada
- Mostra melhorias aplicadas (cor, aprovação)
- Botão "Enviar" → AnalysisInProgressScreen
- Botão "Corrigir" → Volta para CameraCapture
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useDocumentContext } from "../../../context/DocumentContext";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "OptimizationComplete"
>;
type OptimizationCompleteRouteProp = RouteProp<
    RootStackParamList,
    "OptimizationComplete"
>;

export default function OptimizationCompleteScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OptimizationCompleteRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Hook para atualizar status do documento
    const { updateDocumentStatus } = useDocumentContext();

    const { documentId, documentTitle, imageUri } = route.params;

    /*
    ================================================
    ENVIAR FOTO
    Atualiza contexto e navega para análise
    ================================================
    */
    const handleSend = () => {
        // Atualiza status no context
        updateDocumentStatus("photo", "analyzing", imageUri);

        // Navega para tela de análise em andamento
        navigation.navigate("AnalysisInProgress");
    };

    /*
    ================================================
    CORRIGIR FOTO
    Volta para câmera para tirar nova foto
    ================================================
    */
    const handleRetry = () => {
        navigation.navigate("CameraCapture", {
            documentId,
            documentTitle,
        });
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
                <Text style={styles.headerTitle}>99</Text>
            </View>

            {/* FOTO OTIMIZADA */}
            <View style={styles.photoContainer}>
                <View style={styles.photoCircle}>
                    <Image source={{ uri: imageUri }} style={styles.photo} />
                </View>
            </View>

            {/* CONTEÚDO */}
            <View
                style={[
                    styles.contentContainer,
                    isDark && styles.contentContainerDark,
                ]}
            >
                <Text style={[styles.title, isDark && styles.titleDark]}>
                    Otimização concluída
                </Text>

                {/* MELHORIAS APLICADAS */}
                <View style={styles.improvementsContainer}>
                    <View style={styles.improvement}>
                        <Text
                            style={[
                                styles.improvementText,
                                isDark && styles.improvementTextDark,
                            ]}
                        >
                            Cor da foto
                        </Text>
                        <View style={styles.improvementIcon}>
                            <Ionicons
                                name="arrow-up"
                                size={20}
                                color="#2ECC71"
                            />
                        </View>
                    </View>
                    <View style={styles.improvement}>
                        <Text
                            style={[
                                styles.improvementText,
                                isDark && styles.improvementTextDark,
                            ]}
                        >
                            Possibilidade de aprovação
                        </Text>
                        <View style={styles.improvementIcon}>
                            <Ionicons
                                name="arrow-up"
                                size={20}
                                color="#2ECC71"
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* BOTÕES INFERIORES */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSend}
                >
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={handleRetry}
                >
                    <Text style={styles.retryButtonText}>Corrigir</Text>
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

    // Foto
    photoContainer: {
        alignItems: "center",
        paddingVertical: 40,
    },
    photoCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "#F0F0F0",
    },
    photo: {
        width: "100%",
        height: "100%",
    },

    // Conteúdo
    contentContainer: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    contentContainerDark: {
        backgroundColor: "#0B0B0B",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        marginBottom: 30,
    },
    titleDark: {
        color: "#FFF",
    },

    // Melhorias
    improvementsContainer: {
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 20,
    },
    improvement: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    improvementText: {
        fontSize: 16,
        color: "#666",
    },
    improvementTextDark: {
        color: "#AAA",
    },
    improvementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        justifyContent: "center",
        alignItems: "center",
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
    sendButton: {
        backgroundColor: "#FFC107",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 15,
    },
    sendButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
    retryButton: {
        backgroundColor: "#FFF",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDD",
    },
    retryButtonText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "500",
    },
});

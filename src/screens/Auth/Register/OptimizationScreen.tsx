/*
========================================================
TELA DE OTIMIZAÇÃO DA FOTO
Mostra progresso de processamento da imagem.

FLUXO:
- Recebe foto capturada
- Simula processamento (0% → 100%)
- Mostra etapas: Reconhecer, Cortar, Ajustar
- Ao concluir, navega para OptimizationCompleteScreen
========================================================
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Optimization"
>;
type OptimizationRouteProp = RouteProp<RootStackParamList, "Optimization">;

export default function OptimizationScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OptimizationRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { documentId, documentTitle, imageUri } = route.params;

    const [progress, setProgress] = useState(0);
    const [steps, setSteps] = useState({
        recognize: false,
        crop: false,
        adjust: false,
    });

    /*
    ================================================
    SIMULAR PROCESSAMENTO DA FOTO
    ================================================
    */
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 2;

                // Atualiza etapas baseado no progresso
                if (newProgress >= 33 && !steps.recognize) {
                    setSteps((s) => ({ ...s, recognize: true }));
                }
                if (newProgress >= 66 && !steps.crop) {
                    setSteps((s) => ({ ...s, crop: true }));
                }
                if (newProgress >= 100) {
                    clearInterval(timer);
                    // Navega para tela de conclusão
                    setTimeout(() => {
                        navigation.navigate("OptimizationComplete", {
                            documentId,
                            documentTitle,
                            imageUri,
                        });
                    }, 500);
                    return 100;
                }

                return newProgress;
            });
        }, 100); // Atualiza a cada 100ms (5 segundos total)

        return () => clearInterval(timer);
    }, [steps]);

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

            {/* FOTO COM PROGRESSO */}
            <View style={styles.photoContainer}>
                <View style={styles.photoCircle}>
                    <Image source={{ uri: imageUri }} style={styles.photo} />
                    <View style={styles.progressOverlay}>
                        <Text style={styles.progressText}>{progress}%</Text>
                    </View>
                    {progress > 0 && progress < 100 && (
                        // COR ATUALIZADA: Verde #2ECC71
                        <View
                            style={[
                                styles.progressRing,
                                {
                                    borderColor: `rgba(46, 204, 113, ${progress / 100})`,
                                },
                            ]}
                        />
                    )}
                </View>
            </View>

            {/* STATUS */}
            <View
                style={[
                    styles.statusContainer,
                    isDark && styles.statusContainerDark,
                ]}
            >
                <Text
                    style={[
                        styles.statusTitle,
                        isDark && styles.statusTitleDark,
                    ]}
                >
                    Otimizando
                </Text>

                {/* ETAPAS */}
                <View style={styles.stepsContainer}>
                    <View style={styles.step}>
                        <Text
                            style={[
                                styles.stepText,
                                isDark && styles.stepTextDark,
                            ]}
                        >
                            Reconhecer foto
                        </Text>
                        {steps.recognize ? (
                            <Ionicons
                                name="checkmark"
                                size={20}
                                color="#2ECC71"
                            />
                        ) : (
                            <ActivityIndicator size="small" color="#2ECC71" />
                        )}
                    </View>
                    <View style={styles.step}>
                        <Text
                            style={[
                                styles.stepText,
                                isDark && styles.stepTextDark,
                            ]}
                        >
                            Cortar a imagem
                        </Text>
                        {steps.crop ? (
                            <Ionicons
                                name="checkmark"
                                size={20}
                                color="#2ECC71"
                            />
                        ) : (
                            <ActivityIndicator size="small" color="#2ECC71" />
                        )}
                    </View>
                    <View style={styles.step}>
                        <Text
                            style={[
                                styles.stepText,
                                isDark && styles.stepTextDark,
                            ]}
                        >
                            Ajustar o fundo
                        </Text>
                        {steps.adjust ? (
                            <Ionicons
                                name="checkmark"
                                size={20}
                                color="#2ECC71"
                            />
                        ) : (
                            <ActivityIndicator size="small" color="#2ECC71" />
                        )}
                    </View>
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

    // Foto com progresso
    photoContainer: {
        alignItems: "center",
        paddingVertical: 40,
    },
    photoCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        overflow: "hidden",
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    photo: {
        width: "100%",
        height: "100%",
    },
    progressOverlay: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    progressText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFF",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    progressRing: {
        position: "absolute",
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 8,
        borderColor: "rgba(46, 204, 113, 0.5)", // VERDE #2ECC71
    },

    // Status
    statusContainer: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    statusContainerDark: {
        backgroundColor: "#0B0B0B",
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        marginBottom: 30,
    },
    statusTitleDark: {
        color: "#FFF",
    },
    stepsContainer: {
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 20,
    },
    step: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    stepText: {
        fontSize: 16,
        color: "#666",
    },
    stepTextDark: {
        color: "#AAA",
    },
});

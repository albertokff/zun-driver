/*
========================================================
TELA DE CAPTURA DE FOTO
Câmera com guia de contorno para enquadrar o rosto.

FLUXO:
- Mostra outline do rosto como guia
- Instrução: "Olhe diretamente para a câmera"
- Botão para capturar foto
- Após capturar, navega para OptimizationScreen
========================================================
*/
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, // IMPORTADO
    Platform,
    Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera"; // expo-camera instalado

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "CameraCapture"
>;
type CameraCaptureRouteProp = RouteProp<RootStackParamList, "CameraCapture">;

export default function CameraCaptureScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<CameraCaptureRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { documentId, documentTitle } = route.params;

    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [isCapturing, setIsCapturing] = useState(false);

    /*
    ================================================
    VERIFICAR PERMISSÃO AO MONTAR
    ================================================
    */
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    /*
    ================================================
    CAPTURAR FOTO
    ================================================
    */
    const handleCapture = async () => {
        if (!cameraRef.current || isCapturing) return;

        setIsCapturing(true);

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: true,
            });

            if (photo) {
                // Navega para tela de otimização
                navigation.navigate("Optimization", {
                    documentId,
                    documentTitle,
                    imageUri: photo.uri,
                });
            }
        } catch (error) {
            console.error("Erro ao capturar foto:", error);
            Alert.alert("Erro", "Não foi possível capturar a foto.");
        } finally {
            setIsCapturing(false);
        }
    };

    /*
    ================================================
    SEM PERMISSÃO
    ================================================
    */
    if (!permission) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Text style={styles.loadingText}>Solicitando permissão...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, styles.permissionContainer]}>
                {/* Ícone corrigido: camera-outline em vez de camera-off */}
                <Ionicons name="camera-outline" size={80} color="#666" />
                <Text style={styles.permissionTitle}>
                    Permissão da câmera necessária
                </Text>
                <Text style={styles.permissionText}>
                    Precisamos de acesso à câmera para tirar sua foto.
                </Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.permissionButtonText}>
                        Conceder Permissão
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#222" />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
            </View>

            {/* CÂMERA */}
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing="front"
                    mirror={true}
                >
                    {/* OVERLAY COM OUTLINE DO ROSTO */}
                    <View style={styles.overlay}>
                        <View style={styles.faceOutline}>
                            <View style={styles.faceDottedLine} />
                        </View>
                    </View>
                </CameraView>
            </View>

            {/* INSTRUÇÕES */}
            <View
                style={[
                    styles.instructionsContainer,
                    isDark && styles.instructionsContainerDark,
                ]}
            >
                <Text
                    style={[
                        styles.instructionsText,
                        isDark && styles.instructionsTextDark,
                    ]}
                >
                    Olhe diretamente para a câmera e enquadre todo seu rosto
                </Text>
            </View>

            {/* BOTÃO DE CAPTURA */}
            <View style={styles.captureContainer}>
                <TouchableOpacity
                    style={[
                        styles.captureButton,
                        isCapturing && styles.captureButtonDisabled,
                    ]}
                    onPress={handleCapture}
                    disabled={isCapturing}
                >
                    <Ionicons name="camera" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
    },
    permissionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    permissionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginTop: 20,
        marginBottom: 10,
    },
    permissionText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: "#1E6BE3",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    permissionButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#FFF",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginLeft: 5,
    },

    // Câmera
    cameraContainer: {
        flex: 1,
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    faceOutline: {
        width: 250,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    faceDottedLine: {
        width: 230,
        height: 280,
        borderRadius: 140,
        borderWidth: 2,
        borderColor: "#FFF",
        borderStyle: "dashed",
    },

    // Instruções
    instructionsContainer: {
        padding: 20,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    instructionsContainerDark: {
        backgroundColor: "#1C1C1E",
    },
    instructionsText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        lineHeight: 24,
    },
    instructionsTextDark: {
        color: "#FFF",
    },

    // Botão de captura
    captureContainer: {
        paddingVertical: 30,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#3F3D56",
        justifyContent: "center",
        alignItems: "center",
    },
    captureButtonDisabled: {
        backgroundColor: "#999",
    },
});

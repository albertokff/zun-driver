/*
========================================================
TELA DE INFORMAÇÕES DO VEÍCULO
Formulário para preencher dados do veículo (Placa, RENAVAM, CPF/CNPJ).

FLUXO ATUALIZADO:
- Após envio bem-sucedido, atualiza status no DocumentContext
- Navega de volta para DocumentationScreen
- Mantém loading modal durante "upload"
========================================================
*/
import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    ActivityIndicator,
    Modal,
    Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
// Import do context para atualizar status
import { useDocumentContext } from "../../../context/DocumentContext";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleDocumentInfo"
>;
type VehicleDocumentInfoRouteProp = RouteProp<
    RootStackParamList,
    "VehicleDocumentInfo"
>;

export default function VehicleDocumentInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<VehicleDocumentInfoRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Hook para atualizar status do documento
    const { updateDocumentStatus } = useDocumentContext();

    const { documentId, documentTitle, documentType, imageUri } = route.params;

    const [placa, setPlaca] = useState("");
    const [renavam, setRenavam] = useState("");
    const [vehicleType, setVehicleType] = useState<"cpf" | "cnpj">("cpf");
    const [cpfCnpj, setCpfCnpj] = useState(""); // Campo para CPF/CNPJ
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = useMemo(() => {
        const placaValid = placa.length >= 7;
        const renavamValid = renavam.length >= 9;
        const cpfCnpjValid =
            vehicleType === "cpf"
                ? cpfCnpj.length === 14 // CPF: 000.000.000-00
                : cpfCnpj.length === 18; // CNPJ: 00.000.000/0001-00

        return placaValid && renavamValid && cpfCnpjValid;
    }, [placa, renavam, cpfCnpj, vehicleType]);

    const formatPlaca = (value: string) => {
        const clean = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
        if (clean.length <= 3) return clean;
        if (clean.length <= 7) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
        return clean.slice(0, 8);
    };

    const formatRenavam = (value: string) => {
        return value.replace(/\D/g, "").slice(0, 11);
    };

    // Formatação de CPF/CNPJ
    const formatCpfCnpj = (value: string) => {
        const clean = value.replace(/\D/g, "");

        if (vehicleType === "cpf") {
            // CPF: 000.000.000-00
            return clean
                .slice(0, 11)
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            // CNPJ: 00.000.000/0001-00
            return clean
                .slice(0, 14)
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }
    };

    const handleSubmit = async () => {
        if (!isFormValid) return;

        setIsLoading(true);

        try {
            // Simula upload/validação no backend (2 segundos)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("Documento enviado com sucesso!", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
                placa,
                renavam,
                vehicleType,
                cpfCnpj,
            });

            // ATUALIZA STATUS NO CONTEXT
            updateDocumentStatus(documentId, "analyzing", imageUri);

            // NAVEGA DE VOLTA PARA DOCUMENTATION (sem Alert, direto)
            navigation.navigate("Documentation");
        } catch (error) {
            console.error("Erro ao enviar documento:", error);
            Alert.alert(
                "Erro",
                "Não foi possível enviar o documento. Tente novamente.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        setPlaca("");
        setRenavam("");
        setCpfCnpj("");
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
                {/* BANNER SUPERIOR */}
                <View style={styles.banner}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>

                    <Text style={styles.bannerTitle}>
                        Complete as informações abaixo
                    </Text>
                </View>

                {/* FORMULÁRIO */}
                <View
                    style={[
                        styles.formContainer,
                        isDark && styles.formContainerDark,
                    ]}
                >
                    {/* CAMPO 1: PLACA */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark]}
                            placeholder="PLACA (Ex: ABC-1234 / ABC1D23)"
                            placeholderTextColor={isDark ? "#555" : "#AAA"}
                            value={placa}
                            onChangeText={(text) => setPlaca(formatPlaca(text))}
                            maxLength={8}
                            autoCapitalize="characters"
                            editable={!isLoading}
                        />
                    </View>

                    {/* CAMPO 2: RENAVAM */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark]}
                            placeholder="CÓD. RENAVAM (Ex.: 00123456789)"
                            placeholderTextColor={isDark ? "#555" : "#AAA"}
                            value={renavam}
                            onChangeText={(text) =>
                                setRenavam(formatRenavam(text))
                            }
                            keyboardType="number-pad"
                            maxLength={11}
                            editable={!isLoading}
                        />
                    </View>

                    {/* CAMPO 3: TIPO DE VEÍCULO */}
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.inputLabel,
                                isDark && styles.inputLabelDark,
                            ]}
                        >
                            Tipo de veículo
                        </Text>
                        <View style={styles.vehicleTypeContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.vehicleTypeOption,
                                    vehicleType === "cpf" &&
                                        styles.vehicleTypeOptionSelected,
                                    isDark && styles.vehicleTypeOptionDark,
                                    vehicleType === "cpf" &&
                                        isDark &&
                                        styles.vehicleTypeOptionSelectedDark,
                                ]}
                                onPress={() => {
                                    setVehicleType("cpf");
                                    setCpfCnpj(""); // Limpa CPF/CNPJ ao trocar
                                }}
                                disabled={isLoading}
                            >
                                <Text
                                    style={[
                                        styles.vehicleTypeText,
                                        vehicleType === "cpf" &&
                                            styles.vehicleTypeTextSelected,
                                        isDark && styles.vehicleTypeTextDark,
                                    ]}
                                >
                                    Veículo privado (CPF)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.vehicleTypeOption,
                                    vehicleType === "cnpj" &&
                                        styles.vehicleTypeOptionSelected,
                                    isDark && styles.vehicleTypeOptionDark,
                                    vehicleType === "cnpj" &&
                                        isDark &&
                                        styles.vehicleTypeOptionSelectedDark,
                                ]}
                                onPress={() => {
                                    setVehicleType("cnpj");
                                    setCpfCnpj(""); // Limpa CPF/CNPJ ao trocar
                                }}
                                disabled={isLoading}
                            >
                                <Text
                                    style={[
                                        styles.vehicleTypeText,
                                        vehicleType === "cnpj" &&
                                            styles.vehicleTypeTextSelected,
                                        isDark && styles.vehicleTypeTextDark,
                                    ]}
                                >
                                    Veículo de empresa (CNPJ)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* CAMPO 4: CPF ou CNPJ */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark]}
                            placeholder={
                                vehicleType === "cpf"
                                    ? "CPF (Ex: 000.000.000-00)"
                                    : "CNPJ (Ex: 00.000.000/0001-00)"
                            }
                            placeholderTextColor={isDark ? "#555" : "#AAA"}
                            value={cpfCnpj}
                            onChangeText={(text) =>
                                setCpfCnpj(formatCpfCnpj(text))
                            }
                            keyboardType="number-pad"
                            maxLength={vehicleType === "cpf" ? 14 : 18}
                            editable={!isLoading}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* BOTÕES INFERIORES */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        { opacity: isFormValid && !isLoading ? 1 : 0.5 },
                    ]}
                    disabled={!isFormValid || isLoading}
                    onPress={handleSubmit}
                >
                    <Text style={styles.confirmButtonText}>
                        {isLoading ? "Carregando..." : "Confirme o envio"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resendButton}
                    onPress={handleResend}
                    disabled={isLoading}
                >
                    <Text style={styles.resendButtonText}>
                        Enviar novamente
                    </Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE LOADING */}
            <Modal transparent={true} visible={isLoading} animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#1E6BE3" />
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    containerDark: { backgroundColor: "#0B0B0B" },

    // Banner
    banner: {
        backgroundColor: "#1E6BE3",
        padding: 20,
        paddingTop: Platform.OS === "ios" ? 65 : 45,
        paddingBottom: 25,
        position: "relative",
    },
    backButton: {
        position: "absolute",
        top: Platform.OS === "ios" ? 15 : 10,
        left: 10,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    backButtonText: {
        fontSize: 36,
        color: "#FFF",
        fontWeight: "300",
        marginTop: -5,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: Platform.OS === "ios" ? 35 : 30,
    },

    // Formulário
    formContainer: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    formContainerDark: {
        backgroundColor: "#0B0B0B",
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 8,
        fontWeight: "500",
    },
    inputLabelDark: {
        color: "#AAA",
    },
    input: {
        backgroundColor: "#F8F9FA",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        height: 55,
        fontSize: 16,
        paddingHorizontal: 15,
        color: "#222",
    },
    inputDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#2C2C2E",
        color: "#FFF",
    },

    // Tipo de veículo
    vehicleTypeContainer: {
        flexDirection: "row",
        gap: 10,
    },
    vehicleTypeOption: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#F8F9FA",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    vehicleTypeOptionDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#2C2C2E",
    },
    vehicleTypeOptionSelected: {
        backgroundColor: "#E8F4FF",
        borderColor: "#1E6BE3",
        borderWidth: 2,
    },
    vehicleTypeOptionSelectedDark: {
        backgroundColor: "#1E3A5F",
        borderColor: "#4A90E2",
    },
    vehicleTypeText: {
        fontSize: 13,
        color: "#666",
        textAlign: "center",
    },
    vehicleTypeTextDark: {
        color: "#AAA",
    },
    vehicleTypeTextSelected: {
        color: "#1E6BE3",
        fontWeight: "600",
    },

    // Footer
    footer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    footerDark: {
        backgroundColor: "#1C1C1E",
        borderTopColor: "#2C2C2E",
    },
    confirmButton: {
        backgroundColor: "#1E6BE3",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 15,
    },
    confirmButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    resendButton: {
        padding: 15,
        alignItems: "center",
    },
    resendButtonText: {
        color: "#666",
        fontSize: 14,
    },
    resendButtonTextDark: {
        color: "#AAA",
    },

    // Loading Modal
    loadingOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        backgroundColor: "#333",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    loadingText: {
        color: "#FFF",
        fontSize: 16,
        marginTop: 10,
    },
});

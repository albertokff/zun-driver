/*
========================================================
TELA DE INFORMAÇÕES DA CNH COM EAR
Formulário para inserir o número de registro da CNH.

FLUXO:
- Após tirar foto da CNH
- Usuário insere Nº do Registro
- Clica em "Confirme o envio"
- Loading
- Volta para DocumentationScreen (2/3 itens)
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
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { useDocumentContext } from "../../../context/DocumentContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "CNHInfo">;

export default function CNHInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Hook para atualizar status do documento
    const { updateDocumentStatus } = useDocumentContext();

    const [registroNumber, setRegistroNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /*
    ================================================
    VALIDAÇÃO DO FORMULÁRIO
    CNH Registro: 11 dígitos numéricos
    ================================================
    */
    const isFormValid = useMemo(() => {
        return registroNumber.length === 11;
    }, [registroNumber]);

    /*
    ================================================
    FORMATAÇÃO DO Nº DE REGISTRO
    Apenas números, máximo 11 dígitos
    ================================================
    */
    const formatRegistroNumber = (value: string) => {
        return value.replace(/\D/g, "").slice(0, 11);
    };

    /*
    ================================================
    ENVIO DO DOCUMENTO
    Simula upload e atualiza contexto
    ================================================
    */
    const handleSubmit = async () => {
        if (!isFormValid) return;

        setIsLoading(true);

        try {
            // Simula upload/validação no backend (2 segundos)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("CNH enviada com sucesso!", {
                documentId: "cnh",
                documentTitle: "CNH com EAR",
                registroNumber,
            });

            // ATUALIZA STATUS NO CONTEXT
            updateDocumentStatus("cnh", "analyzing");

            // NAVEGA DE VOLTA PARA DOCUMENTATION
            navigation.navigate("Documentation");
        } catch (error) {
            console.error("Erro ao enviar CNH:", error);
            Alert.alert(
                "Erro",
                "Não foi possível enviar o documento. Tente novamente.",
            );
        } finally {
            setIsLoading(false);
        }
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
                        Insira as informações da sua CNH
                    </Text>
                </View>

                {/* CONTEÚDO */}
                <View
                    style={[
                        styles.contentContainer,
                        isDark && styles.contentContainerDark,
                    ]}
                >
                    {/* TEXTO EXPLICATIVO */}
                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        • Você insere o número de registro e nós cuidamos do
                        resto.
                    </Text>

                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        • Para se cadastrar é necessário ter uma CNH válida com
                        observação de EAR. Caso você não possua EAR, seu
                        cadastro será rejeitado.
                    </Text>

                    <TouchableOpacity style={styles.linkButton}>
                        <Text style={styles.linkButtonText}>
                            Como obter EAR {">"}
                        </Text>
                    </TouchableOpacity>

                    {/* IMAGEM ILUSTRATIVA DA CNH */}
                    <View style={styles.imageContainer}>
                        <View style={styles.cnhMockup}>
                            <View style={styles.cnhHeader}>
                                <View style={styles.cnhPhoto} />
                                <View style={styles.cnhInfo} />
                            </View>
                            <View style={styles.cnhRegistroBox}>
                                <Text style={styles.cnhRegistroLabel}>
                                    Nº REGISTRO
                                </Text>
                                <Text style={styles.cnhRegistroValue}>
                                    12345678901
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* CAMPO DE INPUT */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark]}
                            placeholder="Nº REGISTRO (Ex.: 01234567891)"
                            placeholderTextColor={isDark ? "#555" : "#AAA"}
                            value={registroNumber}
                            onChangeText={(text) =>
                                setRegistroNumber(formatRegistroNumber(text))
                            }
                            keyboardType="number-pad"
                            maxLength={11}
                            editable={!isLoading}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
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
            </View>

            {/* MODAL DE LOADING */}
            <Modal transparent={true} visible={isLoading} animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FFC107" />
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

    // Conteúdo
    contentContainer: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    contentContainerDark: {
        backgroundColor: "#0B0B0B",
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
        marginBottom: 10,
    },
    infoTextDark: {
        color: "#AAA",
    },
    linkButton: {
        marginTop: 10,
        paddingVertical: 10,
        marginBottom: 30,
    },
    linkButtonText: {
        fontSize: 14,
        color: "#1E6BE3",
        fontWeight: "500",
    },

    // Imagem ilustrativa da CNH
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    cnhMockup: {
        width: 300,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    cnhHeader: {
        flexDirection: "row",
        marginBottom: 10,
    },
    cnhPhoto: {
        width: 60,
        height: 70,
        backgroundColor: "#DDD",
        borderRadius: 4,
    },
    cnhInfo: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: "#DDD",
        borderRadius: 4,
    },
    cnhRegistroBox: {
        backgroundColor: "#C8E6C9",
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    cnhRegistroLabel: {
        fontSize: 10,
        color: "#2E7D32",
        fontWeight: "bold",
    },
    cnhRegistroValue: {
        fontSize: 14,
        color: "#C62828",
        fontWeight: "bold",
        marginTop: 2,
    },

    // Input
    inputGroup: {
        marginTop: 20,
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
    },
    confirmButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
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

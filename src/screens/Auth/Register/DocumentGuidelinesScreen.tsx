/*
========================================================
TELA DE DIRETRIZES DO DOCUMENTO
Mostra erros comuns a serem evitados com exemplos visuais.

FLUXO ATUALIZADO:
- CRLV → VehicleDocumentInfoScreen (PLACA, RENAVAM, CPF)
- CNH → CNHInfoScreen (Nº REGISTRO)
- Foto → PhotoTipsScreen (Dicas + Câmera)

DEBUG: Adicionado console.log para verificar parâmetros recebidos
========================================================
*/
import React, { useEffect } from "react"; // Adicionado useEffect
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
    Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DocumentGuidelines"
>;
type DocumentGuidelinesRouteProp = RouteProp<
    RootStackParamList,
    "DocumentGuidelines"
>;

interface ErrorExample {
    id: string;
    image: string;
    label: string;
}

const ERROR_EXAMPLES: ErrorExample[] = [
    {
        id: "1",
        image: "https://via.placeholder.com/150x100/FF5252/FFFFFF?text=Desfocado",
        label: "Documento desfocado",
    },
    {
        id: "2",
        image: "https://via.placeholder.com/150x100/FF5252/FFFFFF?text=Cortado",
        label: "Documento cortado",
    },
    {
        id: "3",
        image: "https://via.placeholder.com/150x100/FF5252/FFFFFF?text=Errado",
        label: "Documento errado",
    },
    {
        id: "4",
        image: "https://via.placeholder.com/150x100/FF5252/FFFFFF?text=Vencido",
        label: "Documento do carro vencido",
    },
];

export default function DocumentGuidelinesScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DocumentGuidelinesRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { documentId, documentTitle, documentType } = route.params;

    /*
    ================================================
    DEBUG: Log dos parâmetros recebidos
    ================================================
    */
    useEffect(() => {
        console.log("🔍 [DocumentGuidelines] Parâmetros recebidos:", {
            documentId,
            documentTitle,
            documentType,
            documentIdType: typeof documentId,
            documentIdTrimmed: documentId?.trim?.().toLowerCase(),
        });
    }, [documentId, documentTitle, documentType]);

    /*
    ================================================
    NAVEGAÇÃO CONDICIONAL BASEADA NO DOCUMENTO
    Normaliza documentId para garantir comparação correta
    ================================================
    */
    const handleSendPhoto = () => {
        // Normaliza o documentId: remove espaços e converte para minúsculo
        const normalizedDocId = documentId?.trim().toLowerCase();

        console.log(
            "🔍 [DocumentGuidelines] Navegando com documentId:",
            normalizedDocId,
        );

        if (normalizedDocId === "crlv") {
            // CRLV: Precisa de PLACA, RENAVAM, CPF/CNPJ
            console.log("🚀 Navegando para VehicleDocumentInfo (CRLV)");
            navigation.navigate("VehicleDocumentInfo", {
                documentId,
                documentTitle,
                documentType,
            });
        } else if (normalizedDocId === "cnh") {
            // CNH: Precisa apenas do Nº REGISTRO
            console.log("🚀 Navegando para CNHInfo (CNH)");
            navigation.navigate("CNHInfo", {
                documentId,
                documentTitle,
                documentType,
            });
        } else if (normalizedDocId === "photo") {
            // Foto: Vai para tela de dicas antes de tirar foto
            console.log("🚀 Navegando para PhotoTips (Foto)");
            navigation.navigate("PhotoTips", {
                documentId,
                documentTitle,
                documentType,
            });
        } else {
            // Fallback para documentId desconhecido
            console.error(
                "❌ [DocumentGuidelines] documentId desconhecido:",
                documentId,
            );
            Alert.alert("Erro", `Documento não reconhecido: ${documentId}`);
        }
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
                {/* BANNER SUPERIOR */}
                <View style={styles.banner}>
                    {/* Botão de voltar */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>

                    <Text style={styles.bannerTitle}>
                        Como obter os documentos
                    </Text>
                </View>

                {/* CONTEÚDO */}
                <View
                    style={[
                        styles.contentContainer,
                        isDark && styles.contentContainerDark,
                    ]}
                >
                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        Atualmente, devido a pandemia, os órgãos emissores não
                        estão realizando a emissão do documento físico. Para
                        mais informações, orientamos que procure o Denatran.
                    </Text>

                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        Para obter o CRLV digital, selecione essa opção no nosso
                        app.
                    </Text>

                    <TouchableOpacity style={styles.linkButton}>
                        <Text style={styles.linkButtonText}>
                            Clique aqui para acessar o site
                        </Text>
                    </TouchableOpacity>

                    {/* ERROS COMUNS */}
                    <Text
                        style={[
                            styles.sectionTitle,
                            isDark && styles.sectionTitleDark,
                        ]}
                    >
                        Erros comuns a serem evitados
                    </Text>

                    <View style={styles.errorGrid}>
                        {ERROR_EXAMPLES.map((error) => (
                            <View key={error.id} style={styles.errorItem}>
                                <Image
                                    source={{ uri: error.image }}
                                    style={styles.errorImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.errorLabelContainer}>
                                    <Ionicons
                                        name="close-circle"
                                        size={16}
                                        color="#FF5252"
                                    />
                                    <Text style={styles.errorLabel}>
                                        {error.label}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSendPhoto}
                >
                    <Text style={styles.buttonText}>Envie a foto</Text>
                </TouchableOpacity>
            </View>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 20,
    },
    sectionTitleDark: {
        color: "#FFF",
    },

    // Grid de erros
    errorGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    errorItem: {
        width: "48%",
        marginBottom: 15,
    },
    errorImage: {
        width: "100%",
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    errorLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    errorLabel: {
        fontSize: 12,
        color: "#FF5252",
        marginLeft: 5,
        fontWeight: "500",
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
    button: {
        backgroundColor: "#1E6BE3",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
});

/*
========================================================
TELA DE REQUISITOS DE ENVIO
Mostra os requisitos para envio do documento.

FLUXO ATUALIZADO:
- CRLV → VehicleDocumentInfoScreen (PLACA, RENAVAM, CPF)
- CNH → CNHInfoScreen (Nº REGISTRO)
- Foto → PhotoTipsScreen (Dicas + Câmera)

DEBUG: Adicionado console.log para rastrear navegação
========================================================
*/
import React, { useState, useEffect } from "react"; // Adicionado useEffect
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
import ImagePickerModal from "../../../components/ImagePickerModal";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DocumentRequirements"
>;
type DocumentRequirementsRouteProp = RouteProp<
    RootStackParamList,
    "DocumentRequirements"
>;

export default function DocumentRequirementsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DocumentRequirementsRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { documentId, documentTitle, documentType } = route.params;

    /*
    ================================================
    DEBUG: Log dos parâmetros recebidos
    ================================================
    */
    useEffect(() => {
        console.log("🔍 [DocumentRequirements] Parâmetros recebidos:", {
            documentId,
            documentTitle,
            documentType,
        });
    }, [documentId, documentTitle, documentType]);

    // Estado para controlar o modal de escolha de imagem
    const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
        useState(false);
    // Estado para armazenar a imagem selecionada
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleContinue = () => {
        // Mostra o modal
        setIsImagePickerModalVisible(true);
    };

    /*
    ================================================
    NAVEGAÇÃO CONDICIONAL BASEADA NO DOCUMENTO
    ================================================
    */
    const navigateToNextScreen = (imageUri: string) => {
        // Normaliza o documentId para garantir comparação correta
        const normalizedDocId = documentId?.trim().toLowerCase();

        console.log(
            "🔍 [DocumentRequirements] Navegando com documentId:",
            normalizedDocId,
        );

        if (normalizedDocId === "crlv") {
            // CRLV: Precisa de PLACA, RENAVAM, CPF/CNPJ
            console.log("🚀 Navegando para VehicleDocumentInfo (CRLV)");
            navigation.navigate("VehicleDocumentInfo", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
        } else if (normalizedDocId === "cnh") {
            // CNH: Precisa apenas do Nº REGISTRO
            console.log("🚀 Navegando para CNHInfo (CNH)");
            navigation.navigate("CNHInfo", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
        } else if (normalizedDocId === "photo") {
            // ✅ Foto: Vai para tela de dicas antes de tirar foto
            console.log("🚀 Navegando para PhotoTips (Foto)");
            navigation.navigate("PhotoTips", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
        } else {
            // Fallback para documentId desconhecido
            console.error(
                "❌ [DocumentRequirements] documentId desconhecido:",
                documentId,
            );
            Alert.alert("Erro", `Documento não reconhecido: ${documentId}`);
        }
    };

    // Callback quando tira foto
    const handleTakePhoto = (imageUri: string) => {
        setSelectedImage(imageUri);
        console.log("📸 [DocumentRequirements] Foto tirada, URI:", imageUri);
        navigateToNextScreen(imageUri);
    };

    // Callback quando seleciona do álbum
    const handleSelectFromAlbum = (imageUri: string) => {
        setSelectedImage(imageUri);
        console.log(
            "🖼️ [DocumentRequirements] Imagem selecionada, URI:",
            imageUri,
        );
        navigateToNextScreen(imageUri);
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

                    <Text style={styles.bannerTitle}>Requisitos de envio</Text>
                </View>

                {/* IMAGEM DO DOCUMENTO */}
                <View
                    style={[
                        styles.documentImageContainer,
                        isDark && styles.documentImageContainerDark,
                    ]}
                >
                    <Image
                        source={
                            documentId?.trim().toLowerCase() === "crlv"
                                ? require('../../../assets/images/imagecrlv.png')
                                : require('../../../assets/images/imagecnh.png')}
                        style={styles.documentImage}
                        resizeMode="contain"
                    />
                </View>

                {/* LISTA DE REQUISITOS */}
                <View
                    style={[
                        styles.contentContainer,
                        isDark && styles.contentContainerDark,
                    ]}
                >
                    <Text
                        style={[
                            styles.sectionTitle,
                            isDark && styles.sectionTitleDark,
                        ]}
                    >
                        Requisitos de envio
                    </Text>

                    <View style={styles.requirementItem}>
                        <Text style={styles.requirementNumber}>1.</Text>
                        <Text
                            style={[
                                styles.requirementText,
                                isDark && styles.requirementTextDark,
                            ]}
                        >
                            O documento do veículo deve estar dentro do prazo de
                            validade.
                        </Text>
                    </View>

                    <View style={styles.requirementItem}>
                        <Text style={styles.requirementNumber}>2.</Text>
                        <Text
                            style={[
                                styles.requirementText,
                                isDark && styles.requirementTextDark,
                            ]}
                        >
                            Nos envie somente a primeira página do documento.
                            Mas lembre-se de que os dados precisam estar
                            legíveis.
                        </Text>
                    </View>

                    {/* COMO OBTER OS DOCUMENTOS */}
                    <Text
                        style={[
                            styles.sectionTitle,
                            styles.sectionTitleSecondary,
                            isDark && styles.sectionTitleDark,
                        ]}
                    >
                        Como obter os documentos
                    </Text>

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

                    <Text
                        style={[
                            styles.sectionTitle,
                            styles.sectionTitleSecondary,
                            isDark && styles.sectionTitleDark,
                        ]}
                    >
                        Erros comuns a serem evitados
                    </Text>

                    <View
                        style={[
                            styles.documentImageContainer,
                            isDark && styles.documentImageContainerDark,
                        ]}
                    >
                        <Image
                            source={require('../../../assets/images/erroscomuns.png')}
                            style={styles.documentImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>Envie a foto</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE ESCOLHA DE IMAGEM */}
            <ImagePickerModal
                visible={isImagePickerModalVisible}
                onClose={() => setIsImagePickerModalVisible(false)}
                onTakePhoto={handleTakePhoto}
                onSelectFromAlbum={handleSelectFromAlbum}
            />
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
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: Platform.OS === "ios" ? 35 : 30,
    },

    // Imagem do documento
    documentImageContainer: {
        backgroundColor: "#F5F5F5",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    documentImageContainerDark: {
        backgroundColor: "#1C1C1E",
    },
    documentImage: {
        width: "100%",
        height: 180,
        borderRadius: 8,
    },

    // Conteúdo
    contentContainer: {
        padding: 20,
        backgroundColor: "#FFF",
    },
    contentContainerDark: {
        backgroundColor: "#0B0B0B",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitleSecondary: {
        marginTop: 30,
    },
    sectionTitleDark: {
        color: "#FFF",
    },
    requirementItem: {
        flexDirection: "row",
        marginBottom: 15,
    },
    requirementNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1E6BE3",
        marginRight: 10,
        width: 25,
    },
    requirementText: {
        flex: 1,
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
    },
    requirementTextDark: {
        color: "#AAA",
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
    },
    linkButtonText: {
        fontSize: 14,
        color: "#1E6BE3",
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
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

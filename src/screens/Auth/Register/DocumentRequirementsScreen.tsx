/*
========================================================
TELA DE REQUISITOS DE ENVIO
Mostra os requisitos para envio do documento.
========================================================
*/
import React, { useState } from "react";
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

    // Estado para controlar o modal de escolha de imagem
    const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
        useState(false);
    // Estado para armazenar a imagem selecionada
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleContinue = () => {
        // Mostra o modal
        setIsImagePickerModalVisible(true);
    };

    // Callback quando tira foto
    const handleTakePhoto = (imageUri: string) => {
        setSelectedImage(imageUri);

        // Navega para próxima tela passando a imagem
        navigation.navigate("VehicleDocumentInfo", {
            documentId,
            documentTitle,
            documentType,
            imageUri, // Passa a URI da imagem
        });
    };

    // Callback quando seleciona do álbum
    const handleSelectFromAlbum = (imageUri: string) => {
        setSelectedImage(imageUri);

        // Navega para próxima tela passando a imagem
        navigation.navigate("VehicleDocumentInfo", {
            documentId,
            documentTitle,
            documentType,
            imageUri, // Passa a URI da imagem
        });
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
                        source={{
                            uri: "https://via.placeholder.com/300x180/4CAF50/FFFFFF?text=CRLV",
                        }}
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

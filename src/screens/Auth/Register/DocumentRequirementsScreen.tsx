/*
========================================================
TELA DE REQUISITOS DE ENVIO

OBJETIVO:
- Mostrar os requisitos para envio do documento
- Seguir o padrão visual consolidado da 99 + Zun
- Usar cores dinâmicas do tema
- Preparar o usuário antes de abrir a etapa de imagem

FLUXO:
- CRLV  → VehicleDocumentInfoScreen
- CNH   → CNHInfoScreen
- Foto  → PhotoTipsScreen

OBSERVAÇÃO:
- Mantivemos logs de debug para facilitar rastreamento
========================================================
*/

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar,
    Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ImagePickerModal from "../../../components/ImagePickerModal";

/*
========================================================
TIPAGEM
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DocumentRequirements"
>;

type DocumentRequirementsRouteProp = RouteProp<
    RootStackParamList,
    "DocumentRequirements"
>;

/*
========================================================
CONTROLE DE ESPAÇAMENTO ENTRE BLOCOS DE TEXTO

AJUSTE AQUI SE NECESSÁRIO:
- 24 = mais compacto
- 30 = equilíbrio atual
- 36 = mais espaçado
========================================================
*/
const SECTION_GAP = 30;

export default function DocumentRequirementsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DocumentRequirementsRouteProp>();

    const { theme, colors, isDark } = useTheme();

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

    /*
    ========================================================
    MODAL DE ESCOLHA DE IMAGEM
    ========================================================
    */
    const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
        useState(false);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    /*
    ========================================================
    AÇÃO DE VOLTAR
    ========================================================
    */
    const handleBack = () => {
        navigation.goBack();
    };

    /*
    ========================================================
    AÇÃO DE FECHAR
    ========================================================
    */
    const handleClose = () => {
        navigation.navigate("Start");
    };

    /*
    ========================================================
    CONTINUAR
    Abre modal para escolher foto ou galeria
    ========================================================
    */
    const handleContinue = () => {
        setIsImagePickerModalVisible(true);
    };

    /*
    ========================================================
    NAVEGAÇÃO CONDICIONAL BASEADA NO DOCUMENTO
    ========================================================
    */
    const navigateToNextScreen = (imageUri: string) => {
        const normalizedDocId = documentId?.trim().toLowerCase();

        console.log(
            "🔍 [DocumentRequirements] Navegando com documentId:",
            normalizedDocId,
        );

        if (normalizedDocId === "crlv") {
            console.log("🚀 Navegando para VehicleDocumentInfo (CRLV)");
            navigation.navigate("VehicleDocumentInfo", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
            return;
        }

        if (normalizedDocId === "cnh") {
            console.log("🚀 Navegando para CNHInfo (CNH)");
            navigation.navigate("CNHInfo", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
            return;
        }

        if (normalizedDocId === "photo") {
            console.log("🚀 Navegando para PhotoTips (Foto)");
            navigation.navigate("PhotoTips", {
                documentId,
                documentTitle,
                documentType,
                imageUri,
            });
            return;
        }

        console.error(
            "❌ [DocumentRequirements] documentId desconhecido:",
            documentId,
        );
        Alert.alert("Erro", `Documento não reconhecido: ${documentId}`);
    };

    /*
    ========================================================
    CALLBACK: TIRAR FOTO
    ========================================================
    */
    const handleTakePhoto = (imageUri: string) => {
        setSelectedImage(imageUri);
        console.log("📸 [DocumentRequirements] Foto tirada, URI:", imageUri);
        navigateToNextScreen(imageUri);
    };

    /*
    ========================================================
    CALLBACK: SELECIONAR DO ÁLBUM
    ========================================================
    */
    const handleSelectFromAlbum = (imageUri: string) => {
        setSelectedImage(imageUri);
        console.log(
            "🖼️ [DocumentRequirements] Imagem selecionada, URI:",
            imageUri,
        );
        navigateToNextScreen(imageUri);
    };

    /*
    ========================================================
    IMAGEM EXIBIDA
    - CRLV usa imagem específica
    - Demais documentos usam a imagem da CNH por enquanto
    ========================================================
    */
    const documentIllustration =
        documentId?.trim().toLowerCase() === "crlv"
            ? require("../../../assets/images/imagecrlv.png")
            : require("../../../assets/images/imagecnh.png");

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    TOPO PADRONIZADO
                ======================================================== */}
                <View
                    style={[
                        styles.topBar,
                        {
                            backgroundColor: colors.background,
                            borderBottomColor: colors.divider,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleBack}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleClose}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.topBrand,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Zun
                    </Text>

                    <View style={styles.topSpacer} />
                </View>

                {/* ========================================================
                    ÁREA ROLÁVEL
                ======================================================== */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {/* ====================================================
                        BANNER
                    ==================================================== */}
                    <View
                        style={[
                            styles.banner,
                            {
                                backgroundColor: colors.primary,
                            },
                        ]}
                    >
                        <View style={styles.bannerTextContainer}>
                            <Text
                                style={[
                                    styles.bannerTitle,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Requisitos de envio
                            </Text>

                            <Text
                                style={[
                                    styles.bannerSubtitle,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Confira os cuidados antes de enviar seu{" "}
                                {documentTitle}
                            </Text>
                        </View>

                        <View style={styles.bannerArt}>
                            <Ionicons
                                name="document-text-outline"
                                size={42}
                                color={colors.white}
                            />
                        </View>
                    </View>

                    {/* ====================================================
                        IMAGEM DO DOCUMENTO
                    ==================================================== */}
                    <View
                        style={[
                            styles.documentImageContainer,
                            {
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                            },
                        ]}
                    >
                        <Image
                            source={documentIllustration}
                            style={styles.documentImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* ====================================================
                        CONTEÚDO PRINCIPAL
                    ==================================================== */}
                    <View style={styles.contentContainer}>
                        {/* ================================================
                            REQUISITOS DE ENVIO
                        ================================================ */}
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Requisitos de envio
                        </Text>

                        <View style={styles.requirementItem}>
                            <Text
                                style={[
                                    styles.requirementNumber,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                1.
                            </Text>

                            <Text
                                style={[
                                    styles.requirementText,
                                    {
                                        color: colors.subtext,
                                    },
                                ]}
                            >
                                O documento do veículo deve estar dentro do
                                prazo de validade.
                            </Text>
                        </View>

                        <View style={styles.requirementItem}>
                            <Text
                                style={[
                                    styles.requirementNumber,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                2.
                            </Text>

                            <Text
                                style={[
                                    styles.requirementText,
                                    {
                                        color: colors.subtext,
                                    },
                                ]}
                            >
                                Nos envie somente a primeira página do
                                documento. Mas lembre-se de que os dados
                                precisam estar legíveis.
                            </Text>
                        </View>

                        {/* ================================================
                            COMO OBTER OS DOCUMENTOS
                        ================================================ */}
                        <Text
                            style={[
                                styles.sectionTitle,
                                styles.sectionTitleSecondary,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Como obter os documentos
                        </Text>

                        <Text
                            style={[
                                styles.infoText,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Atualmente, devido a mudanças operacionais em alguns
                            órgãos emissores, a emissão do documento físico pode
                            variar conforme a sua região.
                        </Text>

                        <Text
                            style={[
                                styles.infoText,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Para obter o CRLV digital, selecione essa opção no
                            nosso app e siga as etapas corretamente.
                        </Text>

                        <TouchableOpacity
                            style={styles.linkButton}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={[
                                    styles.linkButtonText,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                Clique aqui para acessar o site
                            </Text>
                        </TouchableOpacity>

                        {/* ================================================
                            ERROS COMUNS
                        ================================================ */}
                        <Text
                            style={[
                                styles.sectionTitle,
                                styles.sectionTitleSecondary,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Erros comuns a serem evitados
                        </Text>

                        <View
                            style={[
                                styles.documentImageContainer,
                                styles.commonErrorsImageContainer,
                                {
                                    backgroundColor: isDark
                                        ? colors.card
                                        : colors.surface,
                                },
                            ]}
                        >
                            <Image
                                source={require("../../../assets/images/erroscomuns.png")}
                                style={styles.documentImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* ========================================================
                    RODAPÉ FIXO
                ======================================================== */}
                <View
                    style={[
                        styles.footer,
                        {
                            backgroundColor: colors.background,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <ButtonPrimary
                        title="Envie a foto"
                        onPress={handleContinue}
                        isDark={isDark}
                    />
                </View>

                {/* ========================================================
                    MODAL DE ESCOLHA DE IMAGEM
                ======================================================== */}
                <ImagePickerModal
                    visible={isImagePickerModalVisible}
                    onClose={() => setIsImagePickerModalVisible(false)}
                    onTakePhoto={handleTakePhoto}
                    onSelectFromAlbum={handleSelectFromAlbum}
                />
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    /*
    ========================================================
    TOPO PADRONIZADO
    ========================================================
    */
    topBar: {
        height: 56,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },

    topIconButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 2,
    },

    topBrand: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 4,
    },

    topSpacer: {
        flex: 1,
    },

    /*
    ========================================================
    ÁREA ROLÁVEL
    ========================================================
    */
    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    /*
    ========================================================
    BANNER
    ========================================================
    */
    banner: {
        minHeight: 108,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    bannerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    bannerTitle: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 4,
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    bannerArt: {
        width: 56,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    IMAGEM DO DOCUMENTO
    ========================================================
    */
    documentImageContainer: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    commonErrorsImageContainer: {
        borderRadius: 16,
        marginTop: 4,
    },

    documentImage: {
        width: "100%",
        height: 180,
        borderRadius: 8,
    },

    /*
    ========================================================
    CONTEÚDO
    ========================================================
    */
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 14,
    },

    sectionTitleSecondary: {
        marginTop: SECTION_GAP,
    },

    requirementItem: {
        flexDirection: "row",
        marginBottom: 16,
    },

    requirementNumber: {
        fontSize: 16,
        fontWeight: "700",
        marginRight: 10,
        width: 24,
    },

    requirementText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 22,
    },

    infoText: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 10,
    },

    linkButton: {
        marginTop: 8,
        paddingVertical: 8,
    },

    linkButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },

    /*
    ========================================================
    RODAPÉ
    ========================================================
    */
    footer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
    },
});

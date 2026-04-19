/*
========================================================
TELA DE DICAS PARA FOTO

OBJETIVO:
- Mostrar dicas para uma boa foto de perfil
- Seguir o padrão visual consolidado da Zun
- Melhorar legibilidade com tipografia maior
- Exibir modal de privacidade antes da câmera
- Exibir loading reutilizável ao abrir câmera

FLUXO:
- Usuário visualiza dicas
- Toca em "Tirar foto"
- Abre modal de privacidade
- Solicita permissão da câmera
- Exibe loading rápido
- Navega para CameraCapture
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
    Modal,
    Linking,
    Alert,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonSecondary from "../../../components/ButtonSecondary";
import AppLoadingOverlay from "../../../components/AppLoadingOverlay";
import * as ImagePicker from "expo-image-picker";

/*
========================================================
TIPAGEM
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PhotoTips"
>;

/*
========================================================
CONTROLE DE TIPOGRAFIA DA TELA

AJUSTE AQUI SE NECESSÁRIO:
- mantém consistência com as outras telas
========================================================
*/
const PHOTO_TIPS_FONT_SCALE = {
    title: 22,
    sectionTitle: 18,
    subtitle: 16,
    text: 15,
    errorLabel: 13,
    modalTitle: 20,
    permissionTitle: 17,
    permissionDescription: 15,
} as const;

export default function PhotoTipsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    ESTADOS DE CONTROLE
    ========================================================
    */
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    /*
    ================================================
    SOLICITAR PERMISSÃO DA CÂMERA
    ================================================
    */
    const requestCameraPermission = async (): Promise<boolean> => {
        try {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à câmera para tirar sua foto de perfil.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        {
                            text: "Abrir Configurações",
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error("Erro ao solicitar permissão:", error);
            return false;
        }
    };

    /*
    ================================================
    ABRIR MODAL DE PRIVACIDADE
    ================================================
    */
    const handleTakePhoto = async () => {
        setShowPrivacyModal(true);
    };

    /*
    ================================================
    PERMITIR ACESSO À CÂMERA
    - Fecha modal
    - Solicita permissão
    - Exibe loading da Zun
    - Navega para captura
    ================================================
    */
    const handlePrivacyAllow = async () => {
        setShowPrivacyModal(false);

        const hasPermission = await requestCameraPermission();

        if (!hasPermission) return;

        /*
        ============================================
        LOADING DE TRANSIÇÃO
        Agora usando componente reutilizável
        ============================================
        */
        setShowLoading(true);

        setTimeout(() => {
            setShowLoading(false);

            navigation.navigate("CameraCapture", {
                documentId: "photo",
                documentTitle: "Foto",
            });
        }, 1000);
    };

    /*
    ================================================
    NEGAR ACESSO À CÂMERA
    ================================================
    */
    const handlePrivacyDeny = () => {
        setShowPrivacyModal(false);
        Alert.alert(
            "Permissão negada",
            "Sem a permissão da câmera, não será possível tirar sua foto de perfil.",
        );
    };

    /*
    ================================================
    VOLTAR
    ================================================
    */
    const handleBack = () => {
        navigation.goBack();
    };

    /*
    ================================================
    FECHAR
    ================================================
    */
    const handleClose = () => {
        navigation.navigate("Start");
    };

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}
            >
                {/* ====================================================
                    TOPO PADRÃO
                ==================================================== */}
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
                        style={styles.topBtn}
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
                        style={styles.topBtn}
                        onPress={handleClose}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.brand,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Zun
                    </Text>

                    <View style={{ flex: 1 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* ====================================================
                        ÁREA DA FOTO DE EXEMPLO
                    ==================================================== */}
                    <View
                        style={[
                            styles.heroArea,
                            {
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.photoCircle,
                                {
                                    backgroundColor: isDark
                                        ? colors.background
                                        : "#F0F0F0",
                                    borderColor: colors.divider,
                                },
                            ]}
                        >
                            <Image
                                source={require("../../../assets/images/foto_exemplo.png")}
                                style={styles.photoExample}
                            />
                        </View>
                    </View>

                    {/* ====================================================
                        CONTEÚDO
                    ==================================================== */}
                    <View style={styles.contentContainer}>
                        <Text
                            style={[
                                styles.title,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Dicas para uma boa foto
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Dicas:
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Centralize seu rosto no centro da câmera.
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Tire a foto na frente de um fundo claro e com boa
                            iluminação.
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Evite acessórios que cubram o rosto.
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                styles.subtitleBold,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Lembre-se:
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Uma vez que sua foto de perfil for aprovada, você{" "}
                            <Text
                                style={[
                                    styles.boldText,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                não poderá alterá-la.
                            </Text>
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Se precisar de ajuda, entre em contato com o
                            suporte.
                        </Text>

                        {/* ================================================
                            ERROS COMUNS
                        ================================================ */}
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Erros comuns
                        </Text>

                        <View style={styles.errorsContainer}>
                            <View style={styles.errorItem}>
                                <View
                                    style={[
                                        styles.smallPhotoCircle,
                                        {
                                            backgroundColor: isDark
                                                ? colors.card
                                                : "#F0F0F0",
                                            borderColor: colors.divider,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={require("../../../assets/images/foto_parcialmente_cortada.png")}
                                        style={styles.smallPhotoExample}
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.errorLabel,
                                        {
                                            color: colors.subtext,
                                        },
                                    ]}
                                >
                                    Parcialmente cortado
                                </Text>
                            </View>

                            <View style={styles.errorItem}>
                                <View
                                    style={[
                                        styles.smallPhotoCircle,
                                        {
                                            backgroundColor: isDark
                                                ? colors.card
                                                : "#F0F0F0",
                                            borderColor: colors.divider,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={require("../../../assets/images/foto_descentralizado.png")}
                                        style={styles.smallPhotoExample}
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.errorLabel,
                                        {
                                            color: colors.subtext,
                                        },
                                    ]}
                                >
                                    Descentralizado
                                </Text>
                            </View>

                            <View style={styles.errorItem}>
                                <View
                                    style={[
                                        styles.smallPhotoCircle,
                                        {
                                            backgroundColor: isDark
                                                ? colors.card
                                                : "#F0F0F0",
                                            borderColor: colors.divider,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={require("../../../assets/images/foto_parcialmente_coberto.png")}
                                        style={styles.smallPhotoExample}
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.errorLabel,
                                        {
                                            color: colors.subtext,
                                        },
                                    ]}
                                >
                                    Parcialmente coberto
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* ====================================================
                    RODAPÉ
                ==================================================== */}
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
                        title="Tirar foto"
                        onPress={handleTakePhoto}
                        isDark={isDark}
                    />
                </View>

                {/* ====================================================
                    MODAL DE PRIVACIDADE
                ==================================================== */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={showPrivacyModal}
                >
                    <View style={styles.modalOverlay}>
                        <View
                            style={[
                                styles.modalBackdrop,
                                {
                                    backgroundColor: "rgba(0, 0, 0, 0.34)",
                                },
                            ]}
                        />

                        <View
                            style={[
                                styles.modalContainer,
                                {
                                    backgroundColor: colors.surface,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalTitle,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                Política de Privacidade
                            </Text>

                            <View style={styles.permissionContainer}>
                                <Ionicons
                                    name="camera-outline"
                                    size={42}
                                    color={colors.primary}
                                />

                                <View style={styles.permissionText}>
                                    <Text
                                        style={[
                                            styles.permissionTitle,
                                            {
                                                color: colors.text,
                                            },
                                        ]}
                                    >
                                        Permissão para acessar a câmera
                                    </Text>

                                    <Text
                                        style={[
                                            styles.permissionDescription,
                                            {
                                                color: colors.subtext,
                                            },
                                        ]}
                                    >
                                        A Zun Motorista precisa de permissão
                                        para acessar sua câmera para
                                        reconhecimento facial, foto de perfil,
                                        envio de documentos e suporte ao
                                        cliente.
                                    </Text>
                                </View>
                            </View>

                            <ButtonPrimary
                                title="Permitir"
                                onPress={handlePrivacyAllow}
                                isDark={isDark}
                            />

                            <View style={styles.modalSecondaryButton}>
                                <ButtonSecondary
                                    title="Agora não"
                                    onPress={handlePrivacyDeny}
                                    isDark={isDark}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* ====================================================
                    LOADING REUTILIZÁVEL DA ZUN
                ==================================================== */}
                <AppLoadingOverlay
                    visible={showLoading}
                    message="Carregando..."
                    percentage="76%"
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

    topBtn: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },

    brand: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 6,
    },

    /*
    ========================================================
    ÁREA ROLÁVEL
    ========================================================
    */
    scrollContent: {
        paddingBottom: 16,
    },

    /*
    ========================================================
    HERO / EXEMPLO DE FOTO
    ========================================================
    */
    heroArea: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 28,
    },

    photoCircle: {
        width: 170,
        height: 170,
        borderRadius: 85,
        overflow: "hidden",
        borderWidth: 1,
    },

    photoExample: {
        width: "100%",
        height: "100%",
    },

    /*
    ========================================================
    CONTEÚDO
    ========================================================
    */
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 18,
    },

    title: {
        fontSize: PHOTO_TIPS_FONT_SCALE.title,
        fontWeight: "700",
        lineHeight: 30,
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: PHOTO_TIPS_FONT_SCALE.sectionTitle,
        fontWeight: "700",
        lineHeight: 24,
        marginTop: 26,
        marginBottom: 14,
    },

    subtitle: {
        fontSize: PHOTO_TIPS_FONT_SCALE.subtitle,
        marginTop: 14,
        marginBottom: 8,
        lineHeight: 22,
    },

    subtitleBold: {
        fontWeight: "700",
    },

    text: {
        fontSize: PHOTO_TIPS_FONT_SCALE.text,
        lineHeight: 22,
        marginBottom: 8,
    },

    boldText: {
        fontWeight: "700",
    },

    /*
    ========================================================
    ERROS COMUNS
    ========================================================
    */
    errorsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 16,
        gap: 10,
    },

    errorItem: {
        alignItems: "center",
        flex: 1,
    },

    smallPhotoCircle: {
        width: 82,
        height: 82,
        borderRadius: 41,
        overflow: "hidden",
        borderWidth: 1,
        marginBottom: 10,
    },

    smallPhotoExample: {
        width: "100%",
        height: "100%",
    },

    errorLabel: {
        fontSize: PHOTO_TIPS_FONT_SCALE.errorLabel,
        textAlign: "center",
        lineHeight: 18,
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

    /*
    ========================================================
    MODAL DE PRIVACIDADE
    ========================================================
    */
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },

    modalContainer: {
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 28,
    },

    modalTitle: {
        fontSize: PHOTO_TIPS_FONT_SCALE.modalTitle,
        fontWeight: "700",
        lineHeight: 28,
        marginBottom: 18,
    },

    permissionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },

    permissionText: {
        flex: 1,
        marginLeft: 14,
    },

    permissionTitle: {
        fontSize: PHOTO_TIPS_FONT_SCALE.permissionTitle,
        fontWeight: "700",
        lineHeight: 24,
        marginBottom: 8,
    },

    permissionDescription: {
        fontSize: PHOTO_TIPS_FONT_SCALE.permissionDescription,
        lineHeight: 22,
    },

    modalSecondaryButton: {
        marginTop: 12,
    },
});

/*
========================================================
TELA DE DICAS PARA FOTO
Mostra dicas de como tirar uma boa foto de perfil.

FLUXO:
- Mostra dicas e exemplo visual
- Botão "Tirar foto"
- Abre modal de permissão de privacidade
- Solicita permissão da câmera
- Abre câmera para captura
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
    Modal,
    Linking,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PhotoTips"
>;

export default function PhotoTipsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Estados para modais
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
    ABRIR CÂMERA
    ================================================
    */
    const handleTakePhoto = async () => {
        // Primeiro mostra o modal de privacidade
        setShowPrivacyModal(true);
    };

    const handlePrivacyAllow = async () => {
        setShowPrivacyModal(false);

        const hasPermission = await requestCameraPermission();

        if (hasPermission) {
            // Navega para tela de captura da câmera
            navigation.navigate("CameraCapture", {
                documentId: "photo",
                documentTitle: "Foto",
            });
        }
    };

    const handlePrivacyDeny = () => {
        setShowPrivacyModal(false);
        Alert.alert(
            "Permissão negada",
            "Sem a permissão da câmera, não será possível tirar sua foto de perfil.",
        );
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
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

                {/* FOTO DE EXEMPLO */}
                <View style={styles.photoContainer}>
                    <View style={styles.photoCircle}>
                        <Image
                            source={{
                                uri: "https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Foto",
                            }}
                            style={styles.photoExample}
                        />
                    </View>
                </View>

                {/* CONTEÚDO */}
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
                        Dicas para uma boa foto:
                    </Text>

                    {/* DICAS */}
                    <Text
                        style={[styles.subtitle, isDark && styles.subtitleDark]}
                    >
                        Dicas:
                    </Text>
                    <Text style={[styles.text, isDark && styles.textDark]}>
                        Centralize seu rosto no centro da câmera.
                    </Text>
                    <Text style={[styles.text, isDark && styles.textDark]}>
                        Tire a foto na frente de um fundo claro e com boa
                        iluminação.
                    </Text>
                    <Text style={[styles.text, isDark && styles.textDark]}>
                        Evite acessórios que cubram o rosto.
                    </Text>

                    {/* LEMBRE-SE */}
                    <Text
                        style={[
                            styles.subtitle,
                            styles.subtitleBold,
                            isDark && styles.subtitleDark,
                        ]}
                    >
                        Lembre-se:
                    </Text>
                    <Text style={[styles.text, isDark && styles.textDark]}>
                        Uma vez que sua foto de perfil for aprovada, você{" "}
                        <Text style={styles.boldText}>
                            não poderá alterá-la.
                        </Text>
                    </Text>
                    <Text style={[styles.text, isDark && styles.textDark]}>
                        Se precisar de ajuda, entre em contato com o suporte.
                    </Text>

                    {/* ERROS COMUNS */}
                    <View style={styles.errorsContainer}>
                        <View style={styles.errorItem}>
                            <View style={styles.errorIcon}>
                                <Ionicons
                                    name="close-circle"
                                    size={40}
                                    color="#FF5252"
                                />
                            </View>
                            <Text style={styles.errorLabel}>
                                Parcialmente cortado
                            </Text>
                        </View>
                        <View style={styles.errorItem}>
                            <View style={styles.errorIcon}>
                                <Ionicons
                                    name="close-circle"
                                    size={40}
                                    color="#FF5252"
                                />
                            </View>
                            <Text style={styles.errorLabel}>
                                Descentralizado
                            </Text>
                        </View>
                        <View style={styles.errorItem}>
                            <View style={styles.errorIcon}>
                                <Ionicons
                                    name="close-circle"
                                    size={40}
                                    color="#FF5252"
                                />
                            </View>
                            <Text style={styles.errorLabel}>
                                Parcialmente coberto
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePhoto}
                >
                    <Text style={styles.buttonText}>Tirar foto</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE POLÍTICA DE PRIVACIDADE */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={showPrivacyModal}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContainer,
                            isDark && styles.modalContainerDark,
                        ]}
                    >
                        <Text
                            style={[
                                styles.modalTitle,
                                isDark && styles.modalTitleDark,
                            ]}
                        >
                            Política de Privacidade
                        </Text>

                        <View style={styles.permissionContainer}>
                            <Ionicons name="camera" size={40} color="#1E6BE3" />
                            <View style={styles.permissionText}>
                                <Text
                                    style={[
                                        styles.permissionTitle,
                                        isDark && styles.permissionTitleDark,
                                    ]}
                                >
                                    Permissão para acessar a câmera
                                </Text>
                                <Text
                                    style={[
                                        styles.permissionDescription,
                                        isDark &&
                                            styles.permissionDescriptionDark,
                                    ]}
                                >
                                    A Zun Motorista precisa de permissão para
                                    acessar sua câmera para fornecer serviços
                                    como reconhecimento facial, tirar fotos de
                                    documentos, definir sua foto de perfil e
                                    viabilizar o suporte ao cliente.
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.allowButton}
                            onPress={handlePrivacyAllow}
                        >
                            <Text style={styles.allowButtonText}>Permitir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.denyButton}
                            onPress={handlePrivacyDeny}
                        >
                            <Text style={styles.denyButtonText}>Agora não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

    // Foto de exemplo
    photoContainer: {
        alignItems: "center",
        paddingVertical: 30,
    },
    photoCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        backgroundColor: "#F0F0F0",
    },
    photoExample: {
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 20,
    },
    sectionTitleDark: {
        color: "#FFF",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 15,
        marginBottom: 8,
    },
    subtitleBold: {
        fontWeight: "bold",
    },
    subtitleDark: {
        color: "#AAA",
    },
    text: {
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
        marginBottom: 5,
    },
    textDark: {
        color: "#AAA",
    },
    boldText: {
        fontWeight: "bold",
    },

    // Erros comuns
    errorsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
        marginBottom: 20,
    },
    errorItem: {
        alignItems: "center",
        flex: 1,
    },
    errorIcon: {
        marginBottom: 8,
    },
    errorLabel: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
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

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        paddingBottom: 30,
    },
    modalContainerDark: {
        backgroundColor: "#1C1C1E",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 20,
    },
    modalTitleDark: {
        color: "#FFF",
    },
    permissionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 25,
    },
    permissionText: {
        flex: 1,
        marginLeft: 15,
    },
    permissionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 8,
    },
    permissionTitleDark: {
        color: "#FFF",
    },
    permissionDescription: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
    permissionDescriptionDark: {
        color: "#AAA",
    },
    allowButton: {
        backgroundColor: "#1E6BE3",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    allowButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
    denyButton: {
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDD",
    },
    denyButtonText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "500",
    },
});

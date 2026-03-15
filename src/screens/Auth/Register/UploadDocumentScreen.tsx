/*
========================================================
TELA DE UPLOAD DE DOCUMENTO
O usuário seleciona se vai enviar documento físico ou digital (PDF).
========================================================
*/
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem para a navegação
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UploadDocument"
>;

// Tipagem para a rota com parâmetros
type UploadDocumentRouteProp = RouteProp<RootStackParamList, "UploadDocument">;

export default function UploadDocumentScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<UploadDocumentRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Recebe os parâmetros da tela anterior
    const { documentId, documentTitle } = route.params;

    const [selectedOption, setSelectedOption] = useState<
        "physical" | "digital" | null
    >(null);

    // ✅ Correção: Navegar para a próxima tela
    const handleNext = () => {
        if (selectedOption) {
            navigation.navigate("DocumentRequirements", {
                documentId,
                documentTitle,
                documentType: selectedOption,
            });
        }
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
                {/* BANNER SUPERIOR */}
                <View style={styles.banner}>
                    {/* Botão de voltar posicionado no canto superior esquerdo do banner */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>

                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>
                            Faça o envio do seu {documentTitle}
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                            Agora aceitamos o envio do documento físico e também
                            digital, em PDF
                        </Text>
                    </View>
                </View>

                {/* OPÇÕES DE ENVIO */}
                <View style={styles.optionsContainer}>
                    {/* Opção 1: Documento Físico */}
                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            isDark && styles.optionItemDark,
                            selectedOption === "physical" &&
                                styles.optionItemSelected,
                        ]}
                        onPress={() => setSelectedOption("physical")}
                    >
                        <View style={styles.optionLeft}>
                            {/* Placeholder para imagem do documento físico */}
                            <View
                                style={[
                                    styles.optionIcon,
                                    {
                                        backgroundColor: isDark
                                            ? "#333"
                                            : "#E8F5E9",
                                    },
                                ]}
                            >
                                <Ionicons
                                    name="document-outline"
                                    size={32}
                                    color={isDark ? "#AAA" : "#4CAF50"}
                                />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        isDark && styles.optionTitleDark,
                                    ]}
                                >
                                    Documento físico
                                </Text>
                                <Text
                                    style={[
                                        styles.optionSubtitle,
                                        isDark && styles.optionSubtitleDark,
                                    ]}
                                >
                                    Selecione esta opção se você tiver o{" "}
                                    {documentTitle} físico
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.radioCircle,
                                isDark && styles.radioCircleDark,
                                selectedOption === "physical" &&
                                    styles.radioChecked,
                            ]}
                        >
                            {selectedOption === "physical" && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* Opção 2: Documento Digital (PDF) */}
                    <TouchableOpacity
                        style={[
                            styles.optionItem,
                            isDark && styles.optionItemDark,
                            selectedOption === "digital" &&
                                styles.optionItemSelected,
                        ]}
                        onPress={() => setSelectedOption("digital")}
                    >
                        <View style={styles.optionLeft}>
                            {/* Placeholder para imagem do documento digital */}
                            <View
                                style={[
                                    styles.optionIcon,
                                    {
                                        backgroundColor: isDark
                                            ? "#333"
                                            : "#E3F2FD",
                                    },
                                ]}
                            >
                                <Ionicons
                                    name="file-tray-full-outline"
                                    size={32}
                                    color={isDark ? "#AAA" : "#2196F3"}
                                />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        isDark && styles.optionTitleDark,
                                    ]}
                                >
                                    Documento digital (somente PDF)
                                </Text>
                                <Text
                                    style={[
                                        styles.optionSubtitle,
                                        isDark && styles.optionSubtitleDark,
                                    ]}
                                >
                                    Selecione esta opção se você tiver o{" "}
                                    {documentTitle} digital em PDF
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.radioCircle,
                                isDark && styles.radioCircleDark,
                                selectedOption === "digital" &&
                                    styles.radioChecked,
                            ]}
                        >
                            {selectedOption === "digital" && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* INFORMAÇÕES ADICIONAIS */}
                <View
                    style={[
                        styles.infoContainer,
                        isDark && styles.infoContainerDark,
                    ]}
                >
                    <Text
                        style={[
                            styles.infoTitle,
                            isDark && styles.infoTitleDark,
                        ]}
                    >
                        Informações importantes
                    </Text>
                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        • O documento deve estar dentro da validade
                    </Text>
                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        • A imagem deve estar nítida e legível
                    </Text>
                    <Text
                        style={[styles.infoText, isDark && styles.infoTextDark]}
                    >
                        • Para PDF, o arquivo deve ter no máximo 5MB
                    </Text>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: selectedOption ? 1 : 0.5 },
                    ]}
                    disabled={!selectedOption}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F9FA" },
    containerDark: { backgroundColor: "#000" },

    // Banner com posição relativa para conter o botão absoluto
    banner: {
        backgroundColor: "#1E6BE3",
        padding: 20,
        paddingTop: Platform.OS === "ios" ? 65 : 45,
        paddingBottom: 25,
        position: "relative",
    },
    // Botão de voltar posicionado no canto superior esquerdo do banner
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
    bannerTextContainer: {
        marginTop: Platform.OS === "ios" ? 35 : 30,
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 8,
    },
    bannerSubtitle: {
        fontSize: 13,
        color: "#E0E0E0",
        lineHeight: 18,
    },

    optionsContainer: {
        padding: 20,
    },
    optionItem: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EEE",
    },
    optionItemDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#2C2C2E",
    },
    optionItemSelected: {
        borderColor: "#1E6BE3",
        borderWidth: 2,
    },
    optionLeft: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    optionIcon: {
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginBottom: 4,
    },
    optionTitleDark: {
        color: "#FFF",
    },
    optionSubtitle: {
        fontSize: 13,
        color: "#888",
        lineHeight: 18,
    },
    optionSubtitleDark: {
        color: "#AAA",
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#DDD",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    radioCircleDark: {
        borderColor: "#555",
    },
    radioChecked: {
        borderColor: "#1E6BE3",
        backgroundColor: "#1E6BE3",
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FFF",
    },

    infoContainer: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    infoContainerDark: {
        backgroundColor: "#1C1C1E",
        borderTopColor: "#2C2C2E",
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    infoTitleDark: {
        color: "#FFF",
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
        lineHeight: 20,
    },
    infoTextDark: {
        color: "#AAA",
    },

    footer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#F8F9FA",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    footerDark: {
        backgroundColor: "#1C1C1E",
        borderTopColor: "#2C2C2E",
    },
    button: {
        backgroundColor: "#1E6BE3", // Azul como na referência
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

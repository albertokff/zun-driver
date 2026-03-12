/*
========================================================
TELA DE DOCUMENTAÇÃO
O usuário deve enviar os documentos obrigatórios.
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";
import { Ionicons } from "@expo/vector-icons";

// Itens de documentação
const DOCUMENTS = [
    { id: "crlv", title: "CRLV (documento do veículo)" },
    { id: "cnh", title: "CNH com EAR" },
    { id: "photo", title: "Foto" },
];

export default function DocumentationScreen() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleUpload = (docTitle: string) => {
        Alert.alert("Upload", `Iniciar fluxo de upload para: ${docTitle}`);
    };

    // Componente para cada item da lista de documentos
    const DocumentItem = ({ item }: { item: (typeof DOCUMENTS)[0] }) => (
        <TouchableOpacity
            style={[styles.docItem, isDark && styles.docItemDark]}
            onPress={() => handleUpload(item.title)}
        >
            <Ionicons
                name="document-text-outline"
                size={24}
                color={isDark ? "#AAA" : "#888"}
            />
            <View style={styles.docTextContainer}>
                <Text style={[styles.docTitle, isDark && styles.docTitleDark]}>
                    {item.title}
                </Text>
                <Text
                    style={[
                        styles.docSubtitle,
                        isDark && styles.docSubtitleDark,
                    ]}
                >
                    Toque aqui para enviar o documento
                </Text>
            </View>
            <Text style={[styles.arrow, isDark && styles.arrowDark]}>›</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <BackButton />
            <ScrollView>
                {/* BANNER SUPERIOR */}
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>
                        Vem pra Zun e aproveite várias formas de ganhar
                        dinheiro!
                    </Text>
                </View>

                {/* CABEÇALHO DA LISTA */}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.headerTitle,
                            isDark && styles.headerTitleDark,
                        ]}
                    >
                        Documentos obrigatórios
                    </Text>
                    <Text
                        style={[
                            styles.headerCounter,
                            isDark && styles.headerCounterDark,
                        ]}
                    >
                        0/3 items
                    </Text>
                </View>

                {/* LISTA DE DOCUMENTOS */}
                <View style={styles.listContainer}>
                    {DOCUMENTS.map((doc) => (
                        <DocumentItem key={doc.id} item={doc} />
                    ))}
                </View>

                {/* SEÇÃO DE DICAS */}
                <View
                    style={[
                        styles.tipsContainer,
                        isDark && styles.tipsContainerDark,
                    ]}
                >
                    <Text
                        style={[
                            styles.tipsTitle,
                            isDark && styles.tipsTitleDark,
                        ]}
                    >
                        Dicas
                    </Text>
                    <Text
                        style={[styles.tipText, isDark && styles.tipTextDark]}
                    >
                        •{" "}
                        <Text style={styles.linkText}>
                            Veja aqui como adicionar EAR {">"}
                        </Text>
                    </Text>
                    <Text
                        style={[styles.tipText, isDark && styles.tipTextDark]}
                    >
                        • O Condumoto é necessário em São Paulo.
                    </Text>
                    <Text
                        style={[styles.tipText, isDark && styles.tipTextDark]}
                    >
                        • Os documentos que você enviou serão salvos e
                        manteremos suas informações seguras e protegidas.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F9FA" },
    containerDark: { backgroundColor: "#000" },
    banner: { backgroundColor: "#1E6BE3", padding: 20 },
    bannerTitle: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        paddingTop: 30,
    },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
    headerTitleDark: { color: "#FFF" },
    headerCounter: { fontSize: 14, color: "#E74C3C" },
    headerCounterDark: { color: "#FF6B6B" },
    listContainer: { paddingHorizontal: 20 },
    docItem: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EEE",
    },
    docItemDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#2C2C2E",
    },
    docTextContainer: { flex: 1, marginLeft: 15 },
    docTitle: { fontSize: 16, fontWeight: "500", color: "#333" },
    docTitleDark: { color: "#FFF" },
    docSubtitle: { fontSize: 14, color: "#888", marginTop: 4 },
    docSubtitleDark: { color: "#AAA" },
    arrow: { fontSize: 24, color: "#CCC" },
    arrowDark: { color: "#555" },
    tipsContainer: {
        padding: 20,
        marginTop: 20,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    tipsContainerDark: {
        backgroundColor: "#1C1C1E",
        borderTopColor: "#2C2C2E",
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    tipsTitleDark: { color: "#FFF" },
    tipText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
        lineHeight: 20,
    },
    tipTextDark: { color: "#AAA" },
    linkText: { color: "#1E6BE3", fontWeight: "500" },
});

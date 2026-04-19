/*
========================================================
TELA DE DOCUMENTAÇÃO

OBJETIVO:
- Exibir documentos obrigatórios
- Seguir padrão visual da 99
- Aplicar identidade Zun
- Usar tema dinâmico (light/dark)

REGRAS:
- Documento enviado = azul + check
- Documento pendente = clicável

OBSERVAÇÃO DE ACESSIBILIDADE:
- Esta tela recebeu ajuste de tipografia para melhorar
  a leitura e aproximar mais da referência da 99
- Mantemos tamanhos um pouco maiores para favorecer
  usabilidade e legibilidade
========================================================
*/

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import {
    useDocumentContext,
    DocumentStatus,
} from "../../../context/DocumentContext";

/*
========================================================
TIPAGEM
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Documentation"
>;

/*
========================================================
CONTROLE DE TIPOGRAFIA DA TELA

AJUSTE AQUI SE NECESSÁRIO:
- use estes valores como base de revisão
- isso ajuda a padronizar com as outras telas depois
========================================================
*/
const DOC_SCREEN_FONT_SCALE = {
    bannerTitle: 18,
    bannerSubtitle: 15,
    headerTitle: 18,
    counter: 18,
    docTitle: 17,
    docSubtitle: 14,
    tipsTitle: 17,
    tipText: 14,
} as const;

/*
========================================================
COMPONENTE
========================================================
*/
export default function DocumentationScreen() {
    const navigation = useNavigation<NavigationProp>();

    const { colors, theme } = useTheme();
    const isDark = theme === "dark";

    const { documents, getSentCount } = useDocumentContext();

    /*
    ========================================================
    UPLOAD
    ========================================================
    */
    const handleUpload = (docTitle: string, docId: string) => {
        if (docId === "photo") {
            navigation.navigate("PhotoTips", {
                documentId: docId,
                documentTitle: docTitle,
                documentType: "physical",
            });
        } else {
            navigation.navigate("UploadDocument", {
                documentId: docId,
                documentTitle: docTitle,
            });
        }
    };

    /*
    ========================================================
    ITEM DE DOCUMENTO
    ========================================================
    */
    const DocumentItem = ({
        doc,
    }: {
        doc: { id: string; title: string; status: DocumentStatus };
    }) => {
        const isSent = doc.status !== "pending";

        return (
            <TouchableOpacity
                style={[
                    styles.docItem,
                    {
                        backgroundColor: isDark ? colors.card : colors.surface,
                        borderColor: isSent ? colors.primary : colors.divider,
                    },
                ]}
                activeOpacity={0.85}
                disabled={isSent}
                onPress={() => handleUpload(doc.title, doc.id)}
            >
                <Ionicons
                    name={isSent ? "checkmark-circle" : "document-text-outline"}
                    /*
                    ================================================
                    ÍCONE LEVEMENTE MAIOR
                    Ajuda na leitura visual do card
                    ================================================
                    */
                    size={26}
                    color={isSent ? colors.primary : colors.subtext}
                />

                <View style={styles.docText}>
                    <Text
                        style={[
                            styles.docTitle,
                            {
                                color: isSent ? colors.primary : colors.text,
                            },
                        ]}
                    >
                        {doc.title}
                    </Text>

                    <Text
                        style={[
                            styles.docSubtitle,
                            {
                                color: colors.subtext,
                            },
                        ]}
                    >
                        {isSent ? "Documento enviado" : "Toque para enviar"}
                    </Text>
                </View>

                {isSent ? (
                    <Ionicons
                        name="checkmark"
                        size={22}
                        color={colors.primary}
                    />
                ) : (
                    <Text style={[styles.arrow, { color: colors.subtext }]}>
                        ›
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: colors.background }]}
        >
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View style={styles.container}>
                {/* ====================================================
                    TOPO PADRÃO
                ==================================================== */}
                <View
                    style={[
                        styles.topBar,
                        { borderBottomColor: colors.divider },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.topBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topBtn}
                        onPress={() => navigation.navigate("Start")}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text style={[styles.brand, { color: colors.text }]}>
                        Zun
                    </Text>

                    <View style={{ flex: 1 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* ====================================================
                        BANNER
                    ==================================================== */}
                    <View
                        style={[
                            styles.banner,
                            { backgroundColor: colors.primary },
                        ]}
                    >
                        <Text style={styles.bannerTitle}>
                            Envie seus documentos
                        </Text>

                        <Text style={styles.bannerSubtitle}>
                            Isso garante sua segurança e liberação rápida
                        </Text>
                    </View>

                    {/* ====================================================
                        HEADER
                    ==================================================== */}
                    <View style={styles.header}>
                        <Text
                            style={[styles.headerTitle, { color: colors.text }]}
                        >
                            Documentos obrigatórios
                        </Text>

                        <Text
                            style={[styles.counter, { color: colors.primary }]}
                        >
                            {getSentCount()}/3
                        </Text>
                    </View>

                    {/* ====================================================
                        LISTA
                    ==================================================== */}
                    <View style={styles.list}>
                        {documents.map((doc) => (
                            <DocumentItem key={doc.id} doc={doc} />
                        ))}
                    </View>

                    {/* ====================================================
                        DICAS
                    ==================================================== */}
                    <View
                        style={[
                            styles.tips,
                            {
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                            },
                        ]}
                    >
                        <Text
                            style={[styles.tipsTitle, { color: colors.text }]}
                        >
                            Dicas
                        </Text>

                        <Text
                            style={[styles.tipText, { color: colors.subtext }]}
                        >
                            • Verifique se a foto está legível
                        </Text>

                        <Text
                            style={[styles.tipText, { color: colors.subtext }]}
                        >
                            • Evite reflexos e cortes
                        </Text>

                        <Text
                            style={[styles.tipText, { color: colors.subtext }]}
                        >
                            • Seus dados estão protegidos
                        </Text>
                    </View>
                </ScrollView>
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
    safe: { flex: 1 },

    container: { flex: 1 },

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
    BANNER
    ========================================================
    */
    banner: {
        minHeight: 110,
        padding: 16,
        justifyContent: "center",
    },

    bannerTitle: {
        color: "#FFF",
        fontSize: DOC_SCREEN_FONT_SCALE.bannerTitle,
        fontWeight: "700",
        lineHeight: 24,
    },

    bannerSubtitle: {
        color: "#FFF",
        fontSize: DOC_SCREEN_FONT_SCALE.bannerSubtitle,
        marginTop: 6,
        lineHeight: 20,
    },

    /*
    ========================================================
    HEADER
    ========================================================
    */
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },

    headerTitle: {
        fontSize: DOC_SCREEN_FONT_SCALE.headerTitle,
        fontWeight: "700",
        lineHeight: 24,
    },

    counter: {
        fontSize: DOC_SCREEN_FONT_SCALE.counter,
        fontWeight: "700",
        lineHeight: 24,
    },

    /*
    ========================================================
    LISTA DE DOCUMENTOS
    ========================================================
    */
    list: {
        paddingHorizontal: 16,
    },

    docItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 10,
        minHeight: 74,
    },

    docText: {
        flex: 1,
        marginLeft: 12,
    },

    docTitle: {
        fontSize: DOC_SCREEN_FONT_SCALE.docTitle,
        fontWeight: "600",
        lineHeight: 22,
    },

    docSubtitle: {
        fontSize: DOC_SCREEN_FONT_SCALE.docSubtitle,
        marginTop: 4,
        lineHeight: 19,
    },

    arrow: {
        fontSize: 24,
        lineHeight: 24,
    },

    /*
    ========================================================
    BLOCO DE DICAS
    ========================================================
    */
    tips: {
        margin: 16,
        padding: 16,
        borderRadius: 14,
    },

    tipsTitle: {
        fontSize: DOC_SCREEN_FONT_SCALE.tipsTitle,
        fontWeight: "700",
        marginBottom: 12,
        lineHeight: 22,
    },

    tipText: {
        marginBottom: 8,
        fontSize: DOC_SCREEN_FONT_SCALE.tipText,
        lineHeight: 20,
    },
});

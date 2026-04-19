/*
========================================================
TELA DE UPLOAD DE DOCUMENTO

OBJETIVO:
- Escolher tipo de envio (físico ou digital)
- Seguir padrão visual da 99
- Aplicar identidade Zun
- Usar tema dinâmico

FLUXO:
- Seleciona opção
- Avança para DocumentRequirements

OBSERVAÇÃO DE ACESSIBILIDADE:
- Esta tela recebeu ajuste de tipografia para melhorar
  leitura e consistência com as telas anteriores
========================================================
*/

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonPrimary from "../../../components/ButtonPrimary";

/*
========================================================
TIPAGEM
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UploadDocument"
>;

type UploadDocumentRouteProp = RouteProp<RootStackParamList, "UploadDocument">;

/*
========================================================
CONTROLE DE TIPOGRAFIA DA TELA

AJUSTE AQUI SE NECESSÁRIO:
- esse bloco ajuda a manter consistência com as outras
  telas do fluxo
========================================================
*/
const UPLOAD_DOC_FONT_SCALE = {
    bannerTitle: 18,
    bannerSubtitle: 15,
    optionTitle: 16,
    tipsTitle: 17,
    tipText: 14,
} as const;

export default function UploadDocumentScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<UploadDocumentRouteProp>();

    const { colors, theme, isDark } = useTheme();

    const { documentId, documentTitle } = route.params;

    /*
    ========================================================
    DEBUG
    ========================================================
    */
    useEffect(() => {
        console.log("📄 Upload:", documentId, documentTitle);
    }, [documentId, documentTitle]);

    const [selectedOption, setSelectedOption] = useState<
        "physical" | "digital" | null
    >(null);

    /*
    ========================================================
    AVANÇAR
    ========================================================
    */
    const handleNext = () => {
        if (!selectedOption) return;

        navigation.navigate("DocumentRequirements", {
            documentId,
            documentTitle,
            documentType: selectedOption,
        });
    };

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

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: colors.background }]}
        >
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View style={styles.container}>
                {/* ============================================
                    TOPO PADRÃO
                ============================================ */}
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

                    <Text style={[styles.brand, { color: colors.text }]}>
                        Zun
                    </Text>

                    <View style={{ flex: 1 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* ============================================
                        BANNER
                    ============================================ */}
                    <View
                        style={[
                            styles.banner,
                            { backgroundColor: colors.primary },
                        ]}
                    >
                        <Text style={styles.bannerTitle}>
                            Envie seu {documentTitle}
                        </Text>

                        <Text style={styles.bannerSubtitle}>
                            Escolha como deseja enviar o documento
                        </Text>
                    </View>

                    {/* ============================================
                        OPÇÕES
                    ============================================ */}
                    <View style={styles.options}>
                        {[
                            {
                                id: "physical",
                                title: "Documento físico",
                                icon: "document-outline",
                            },
                            {
                                id: "digital",
                                title: "Documento digital (PDF)",
                                icon: "file-tray-full-outline",
                            },
                        ].map((item) => {
                            const selected = selectedOption === item.id;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.option,
                                        {
                                            backgroundColor: isDark
                                                ? colors.card
                                                : colors.surface,
                                            borderColor: selected
                                                ? colors.primary
                                                : colors.divider,
                                        },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={() =>
                                        setSelectedOption(
                                            item.id as "physical" | "digital",
                                        )
                                    }
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={28}
                                        color={colors.text}
                                    />

                                    <Text
                                        style={[
                                            styles.optionText,
                                            {
                                                color: colors.text,
                                            },
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    <View
                                        style={[
                                            styles.radio,
                                            {
                                                borderColor: selected
                                                    ? colors.primary
                                                    : colors.divider,
                                            },
                                        ]}
                                    >
                                        {selected && (
                                            <View
                                                style={[
                                                    styles.radioInner,
                                                    {
                                                        backgroundColor:
                                                            colors.primary,
                                                    },
                                                ]}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* ============================================
                        DICAS
                    ============================================ */}
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
                            Informações importantes
                        </Text>

                        <Text style={[styles.tip, { color: colors.subtext }]}>
                            • Documento válido
                        </Text>

                        <Text style={[styles.tip, { color: colors.subtext }]}>
                            • Imagem nítida
                        </Text>

                        <Text style={[styles.tip, { color: colors.subtext }]}>
                            • PDF até 5MB
                        </Text>
                    </View>
                </ScrollView>

                {/* ============================================
                    BOTÃO PADRÃO ZUN
                ============================================ */}
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
                        title="Próximo"
                        onPress={handleNext}
                        disabled={!selectedOption}
                        isDark={isDark}
                    />
                </View>
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
        justifyContent: "center",
        alignItems: "center",
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
        fontWeight: "700",
        fontSize: UPLOAD_DOC_FONT_SCALE.bannerTitle,
        lineHeight: 24,
    },

    bannerSubtitle: {
        color: "#FFF",
        fontSize: UPLOAD_DOC_FONT_SCALE.bannerSubtitle,
        marginTop: 6,
        lineHeight: 20,
    },

    /*
    ========================================================
    OPÇÕES
    ========================================================
    */
    options: {
        padding: 16,
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 10,
        minHeight: 74,
    },

    optionText: {
        flex: 1,
        marginLeft: 12,
        fontWeight: "600",
        fontSize: UPLOAD_DOC_FONT_SCALE.optionTitle,
        lineHeight: 22,
    },

    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
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
        fontWeight: "700",
        fontSize: UPLOAD_DOC_FONT_SCALE.tipsTitle,
        lineHeight: 22,
        marginBottom: 12,
    },

    tip: {
        marginBottom: 8,
        fontSize: UPLOAD_DOC_FONT_SCALE.tipText,
        lineHeight: 20,
    },

    /*
    ========================================================
    RODAPÉ
    ========================================================
    */
    footer: {
        padding: 16,
        borderTopWidth: 1,
    },
});

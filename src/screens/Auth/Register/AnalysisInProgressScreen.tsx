/*
========================================================
TELA DE ANÁLISE EM ANDAMENTO
Tela final após envio de todos os documentos.

FLUXO:
- Mostra que documentos estão sendo validados
- Informa tempo estimado (24 horas)
- Usuário será notificado quando concluir
- Botão para voltar ao início ou aguardar
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "AnalysisInProgress"
>;

export default function AnalysisInProgressScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#222" />
                </TouchableOpacity>
                <Text style={styles.headerClose}>×</Text>
                <Text style={styles.headerTitle}>Análise em andamento</Text>
            </View>

            {/* CONTEÚDO CENTRAL */}
            <View style={styles.contentContainer}>
                {/* ÍCONE DE RELÓGIO */}
                <View style={styles.iconContainer}>
                    <View style={styles.clockIcon}>
                        <Ionicons name="time" size={40} color="#FFF" />
                    </View>
                </View>

                {/* TÍTULO */}
                <Text style={[styles.title, isDark && styles.titleDark]}>
                    Análise em andamento
                </Text>

                {/* DESCRIÇÃO */}
                <Text
                    style={[
                        styles.description,
                        isDark && styles.descriptionDark,
                    ]}
                >
                    Enquanto seus documentos são validados junto ao Detran
                    estamos realizando a verificação de antecedentes criminais
                    em mais de 130 fontes em todo o país.
                </Text>

                <Text
                    style={[
                        styles.description,
                        styles.descriptionBold,
                        isDark && styles.descriptionDark,
                    ]}
                >
                    A análise estará pronta em até 24 horas e você será
                    notificado.
                </Text>
            </View>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Start")}
                >
                    <Text style={styles.buttonText}>Entendi</Text>
                </TouchableOpacity>
            </View>
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

    // Conteúdo
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    iconContainer: {
        marginBottom: 40,
    },
    clockIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FFC107",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginBottom: 20,
    },
    titleDark: {
        color: "#FFF",
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 15,
    },
    descriptionBold: {
        fontWeight: "600",
    },
    descriptionDark: {
        color: "#AAA",
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
        backgroundColor: "#FFC107",
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

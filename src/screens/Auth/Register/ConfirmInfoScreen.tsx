/*
========================================================
TELA DE CONFIRMAÇÃO DE INFORMAÇÕES
Mostra os dados preenchidos e um modal para confirmar ou corrigir.
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
    Modal,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ConfirmInfo"
>;
type ConfirmInfoRouteProp = RouteProp<RootStackParamList, "ConfirmInfo">;

export default function ConfirmInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ConfirmInfoRouteProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Recebe os dados da tela anterior
    const { firstName, cpf, gender, state, city } = route.params;

    // ✅ Estado para controlar o modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCorrect = () => {
        setIsModalVisible(false); // Fecha o modal
        navigation.goBack(); // Volta para a tela de edição
    };

    const handleAdvance = () => {
        setIsModalVisible(false); // Fecha o modal
        navigation.navigate("Documentation"); // Avança para a tela de documentos
    };

    const showConfirmationModal = () => {
        setIsModalVisible(true); // Mostra o modal
    };

    // Componente para exibir cada item de informação
    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, isDark && styles.infoLabelDark]}>
                {label}
            </Text>
            <Text style={[styles.infoValue, isDark && styles.infoValueDark]}>
                {value}
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView>
                {/* BANNER */}
                <View style={styles.banner}>
                    {/* Botão de voltar posicionado no canto superior esquerdo do banner */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>

                    <Text style={styles.bannerTitle}>
                        Vem pra Zun e aproveite várias formas de ganhar
                        dinheiro!
                    </Text>
                </View>

                {/* DADOS PREENCHIDOS */}
                <View style={styles.infoContainer}>
                    <InfoItem label="Primeiro nome" value={firstName} />
                    <InfoItem label="CPF" value={cpf} />
                    <InfoItem label="Gênero" value={gender} />
                    <InfoItem label="Estado" value={state} />
                    <InfoItem label="Cidade" value={city} />
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR - Ao clicar, mostra o modal de confirmação */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={showConfirmationModal} // ✅ Mostra o modal ao clicar
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE CONFIRMAÇÃO - Só aparece quando isModalVisible = true */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible} // ✅ Controlado pelo estado
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
                            Confirme se suas informações estão corretas
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.correctButton,
                                    isDark && styles.correctButtonDark,
                                ]}
                                onPress={handleCorrect}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.correctButtonText,
                                        isDark && styles.correctButtonTextDark,
                                    ]}
                                >
                                    Corrigir
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.advanceButton,
                                ]}
                                onPress={handleAdvance}
                            >
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        styles.advanceButtonText,
                                    ]}
                                >
                                    Avançar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    containerDark: { backgroundColor: "#0B0B0B" },

    // Banner com posição relativa para conter o botão absoluto
    banner: {
        backgroundColor: "#1E6BE3",
        padding: 20,
        marginBottom: 20,
        position: "relative", // Necessário para posicionar o botão absolutamente
        paddingTop: Platform.OS === "ios" ? 65 : 45, // Espaço para status bar
    },
    // Botão de voltar posicionado no canto superior esquerdo do banner
    backButton: {
        position: "absolute",
        top: Platform.OS === "ios" ? 15 : 10, // Ajuste fino para ficar acima do texto
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
        marginTop: -5, // Ajuste fino para centralizar verticalmente
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: Platform.OS === "ios" ? 35 : 30, // Espaço para não ficar embaixo do botão
    },

    infoContainer: { paddingHorizontal: 20 },
    infoItem: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "#E0E0E0",
    },
    infoLabel: { color: "#888", fontSize: 12 },
    infoLabelDark: { color: "#777" },
    infoValue: { color: "#222", fontSize: 16, marginTop: 4 },
    infoValueDark: { color: "#FFF" },

    // Rodapé com botão
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
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    // Estilos do Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContainerDark: { backgroundColor: "#1C1C1E" },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 25,
        color: "#222",
    },
    modalTitleDark: { color: "#FFF" },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        padding: 16,
        borderRadius: 30,
        alignItems: "center",
    },
    correctButton: {
        backgroundColor: "#F0F0F0",
        marginRight: 10,
    },
    correctButtonDark: { backgroundColor: "#2C2C2E" },
    advanceButton: {
        backgroundColor: "#1E6BE3",
        marginLeft: 10,
    },
    modalButtonText: { fontSize: 16, fontWeight: "bold" },
    correctButtonText: { color: "#333" },
    correctButtonTextDark: { color: "#FFF" },
    advanceButtonText: { color: "#FFF" },
});

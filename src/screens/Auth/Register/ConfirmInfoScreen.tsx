/*
========================================================
TELA DE CONFIRMAÇÃO DE INFORMAÇÕES
Mostra os dados preenchidos e um modal para confirmar ou corrigir.
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

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

    const handleCorrect = () => {
        navigation.goBack(); // Volta para a tela de edição
    };

    const handleAdvance = () => {
        navigation.navigate("Documentation"); // Avança para a tela de documentos
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
            <BackButton />
            <ScrollView>
                {/* BANNER */}
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>
                        Vem pra Zun e aproveite várias formas de ganhar
                        dinheiro!
                    </Text>
                </View>

                {/* DADOS PREENCHIDOS (FUNDO) */}
                <View style={styles.infoContainer}>
                    <InfoItem label="Primeiro nome" value={firstName} />
                    <InfoItem label="CPF" value={cpf} />
                    <InfoItem label="Gênero" value={gender} />
                    <InfoItem label="Estado" value={state} />
                    <InfoItem label="Cidade" value={city} />
                </View>
            </ScrollView>

            {/* MODAL DE CONFIRMAÇÃO */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={true} // Sempre visível nesta tela
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
    banner: { backgroundColor: "#1E6BE3", padding: 20, marginBottom: 20 },
    bannerTitle: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
    infoContainer: { paddingHorizontal: 20, opacity: 0.3 }, // Opacidade para simular fundo
    infoItem: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "#E0E0E0",
    },
    infoLabel: { color: "#888", fontSize: 12 },
    infoLabelDark: { color: "#777" },
    infoValue: { color: "#222", fontSize: 16, marginTop: 4 },
    infoValueDark: { color: "#FFF" },
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
    advanceButtonText: { color: "#333" },
});

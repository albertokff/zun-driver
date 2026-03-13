/*
========================================================
TELA DE INFORMAÇÕES DO MOTORISTA.
========================================================
*/
import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

// Hooks e componentes personalizados
import { useBrazilianCities } from "../../../hooks/useBrazilianCities";
import FormTextInput from "../../../components/FormTextInput"; // ← Crie este componente simples
import CollapsiblePicker from "../../../components/CollapsiblePicker"; // ← Crie este componente
import CityPicker from "../../../components/CityPicker";

// Tipagem para a navegação
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverInfo"
>;

export default function DriverInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Hook para gerenciar estados e cidades
    const {
        states,
        cities,
        selectedState,
        selectedCity,
        setSelectedState,
        setSelectedCity,
    } = useBrazilianCities();

    const [firstName, setFirstName] = useState("");
    const [cpf, setCpf] = useState("");
    const [gender, setGender] = useState("");

    // Validação do formulário
    const isFormValid = useMemo(() => {
        return (
            firstName.length > 2 &&
            cpf.length === 14 &&
            gender &&
            selectedState &&
            selectedCity
        );
    }, [firstName, cpf, gender, selectedState, selectedCity]);

    const formatCpf = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const handleNext = () => {
        if (!isFormValid) {
            Alert.alert(
                "Campos incompletos",
                "Por favor, preencha todos os campos para continuar.",
            );
            return;
        }
        navigation.navigate("ConfirmInfo", {
            firstName,
            cpf,
            gender,
            state: selectedState!,
            city: selectedCity!,
        });
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                stickyHeaderIndices={[0]}
            >
                {/* Banner fixo no topo */}
                <View style={styles.banner}>
                    {/* Botão de voltar posicionado dentro do banner, acima do texto */}
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
                    <Text style={styles.bannerSubtitle}>
                        Mais eventos de recompensa | Garantia Zun | Resgates
                        flexíveis
                    </Text>
                </View>

                {/* Área do formulário */}
                <View style={[styles.formArea, isDark && styles.formAreaDark]}>
                    <FormTextInput
                        label="Primeiro nome"
                        value={firstName}
                        onChangeText={setFirstName}
                        isDark={isDark}
                    />
                    <FormTextInput
                        label="CPF"
                        value={cpf}
                        onChangeText={(text: string) => setCpf(formatCpf(text))}
                        keyboardType="numeric"
                        maxLength={14}
                        isDark={isDark}
                    />
                    <CollapsiblePicker
                        label="Gênero"
                        options={["Masculino", "Feminino", "Outro"]}
                        selectedValue={gender}
                        onSelect={setGender}
                        isDark={isDark}
                    />
                    <Text
                        style={[styles.linkText, isDark && styles.linkTextDark]}
                    >
                        Confira aqui as cidades onde já operamos
                    </Text>
                    <CollapsiblePicker
                        label="Estado"
                        options={states}
                        selectedValue={selectedState}
                        onSelect={setSelectedState}
                        isDark={isDark}
                    />
                    <CityPicker
                        label="Cidade"
                        cities={cities}
                        selectedCity={selectedCity}
                        onSelect={setSelectedCity}
                        isDark={isDark}
                        placeholder={
                            selectedState
                                ? "Selecione uma cidade"
                                : "Selecione um estado primeiro"
                        }
                    />
                </View>
            </ScrollView>

            {/* Rodapé com o botão de avançar */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
                    disabled={!isFormValid}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ========================================================
// FOLHA DE ESTILOS (CSS)
// ========================================================
const styles = StyleSheet.create({
    // --- Estilos Gerais da Tela ---
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
    },
    containerDark: {
        backgroundColor: "#0B0B0B",
    },
    scrollContainer: {
        paddingBottom: 120,
    },

    // --- Estilos do Banner Superior ---
    banner: {
        backgroundColor: "#1E6BE3",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: Platform.OS === "ios" ? 65 : 45,
        position: "relative",
    },
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
    bannerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: Platform.OS === "ios" ? 35 : 30,
    },
    bannerSubtitle: {
        fontSize: 13,
        color: "#E0E0E0",
        marginTop: 5,
    },

    // --- Estilos da Área do Formulário ---
    formArea: {
        paddingTop: 20,
        backgroundColor: "#FFF",
    },
    formAreaDark: {
        backgroundColor: "#0B0B0B",
    },
    linkText: {
        color: "#1E6BE3",
        fontWeight: "500",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    linkTextDark: {
        color: "#4A90E2",
    },

    // --- Estilos do Rodapé e Botão Principal ---
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
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
});

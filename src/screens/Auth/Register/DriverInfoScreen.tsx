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
    TextInput,
    Alert,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

// Habilita a animação de layout no Android para o efeito "acordeão"
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Tipagem para a navegação
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverInfo"
>;

// Componente para campos de texto padrão (Nome, CPF, Cidade)
const FormTextInput = ({
    label,
    value,
    onChangeText,
    isDark,
    ...props
}: any) => (
    <View style={styles.inputContainer}>
        {value ? (
            <Text style={[styles.label, isDark && styles.labelDark]}>
                {label}
            </Text>
        ) : null}
        <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
            placeholderTextColor={isDark ? "#555" : "#AAA"}
            {...props}
        />
    </View>
);

// Componente de seleção no estilo Acordeão/Collapsible (para Gênero e Estado)
const CollapsiblePicker = ({
    label,
    options,
    selectedValue,
    onSelect,
    isDark,
}: {
    label: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    isDark: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        toggleOpen();
    };

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity
                onPress={toggleOpen}
                style={[
                    styles.input,
                    isDark && styles.inputDark,
                    styles.touchableInput,
                ]}
            >
                {selectedValue ? (
                    <Text style={[styles.label, isDark && styles.labelDark]}>
                        {label}
                    </Text>
                ) : null}
                <Text
                    style={[
                        styles.touchableInputText,
                        isDark && styles.touchableInputTextDark,
                        !selectedValue && styles.placeholderText,
                        !selectedValue && isDark && styles.placeholderTextDark,
                    ]}
                >
                    {selectedValue || label}
                </Text>
                <View
                    style={{
                        transform: [{ rotate: isOpen ? "90deg" : "0deg" }],
                    }}
                >
                    <Text style={[styles.arrow, isDark && styles.arrowDark]}>
                        ›
                    </Text>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View
                    style={[
                        styles.optionsContainer,
                        isDark && styles.optionsContainerDark,
                    ]}
                >
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{ maxHeight: 200 }}
                    >
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSelect(option)}
                                style={styles.optionItem}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isDark && styles.optionTextDark,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

// Dados para os seletores
const genderOptions = ["Masculino", "Feminino", "Outro"];
const brazilianStates = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
];

export default function DriverInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [firstName, setFirstName] = useState("");
    const [cpf, setCpf] = useState("");
    const [gender, setGender] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const isFormValid = useMemo(() => {
        return (
            firstName.length > 2 &&
            cpf.length === 14 &&
            gender &&
            state &&
            city.length > 1
        );
    }, [firstName, cpf, gender, state, city]);

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
            state,
            city,
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
                        options={genderOptions}
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
                        options={brazilianStates}
                        selectedValue={state}
                        onSelect={setState}
                        isDark={isDark}
                    />
                    <FormTextInput
                        label="Cidade"
                        value={city}
                        onChangeText={setCity}
                        isDark={isDark}
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
        flex: 1, // Ocupa toda a tela
        backgroundColor: "#F4F4F4", // Cor de fundo padrão (claro)
    },
    containerDark: {
        backgroundColor: "#0B0B0B", // Cor de fundo para o tema escuro
    },
    scrollContainer: {
        paddingBottom: 120, // Espaço no final da rolagem para não cobrir o último campo com o botão
    },

    // --- Estilos do Banner Superior ---
    banner: {
        backgroundColor: "#1E6BE3", // Cor de fundo azul do banner
        paddingHorizontal: 20, // Espaçamento nas laterais
        paddingBottom: 20,
        // Ajuste o padding top para dar espaço para o botão de voltar
        paddingTop: Platform.OS === "ios" ? 65 : 45,
        position: "relative", // Necessário para posicionar o botão absolutamente dentro dele
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
        // Adiciona margem superior para o texto não ficar embaixo do botão
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
    inputContainer: {
        marginBottom: 15,
        paddingHorizontal: 20,
        position: "relative",
    },
    label: {
        color: "#888",
        fontSize: 12,
        position: "absolute",
        top: -8,
        left: 30,
        zIndex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 4,
    },
    labelDark: {
        color: "#777",
        backgroundColor: "#1C1C1E",
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        height: 58,
        fontSize: 16,
        paddingHorizontal: 15,
        color: "#222",
        justifyContent: "center",
    },
    inputDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#444",
        color: "#FFF",
    },

    // --- Estilos dos Seletores (Gênero/Estado) ---
    touchableInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    touchableInputText: {
        fontSize: 16,
        color: "#222",
    },
    touchableInputTextDark: {
        color: "#FFF",
    },
    placeholderText: {
        color: "#AAA",
    },
    placeholderTextDark: {
        color: "#555",
    },
    arrow: {
        fontSize: 24,
        color: "#888",
    },
    arrowDark: {
        color: "#777",
    },

    // --- Estilos da Lista de Opções do Seletor ---
    optionsContainer: {
        marginTop: -8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#FFF",
        overflow: "hidden",
    },
    optionsContainerDark: {
        borderColor: "#444",
        backgroundColor: "#1C1C1E",
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    optionItemDark: {
        borderTopColor: "#2C2C2E",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    optionTextDark: {
        color: "#FFF",
    },

    // --- Outros Estilos ---
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

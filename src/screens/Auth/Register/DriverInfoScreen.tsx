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
import FormTextInput from "../../../components/FormTextInput";
import CollapsiblePicker from "../../../components/CollapsiblePicker";
import CityPicker from "../../../components/CityPicker";
import ButtonPrimary from "../../../components/ButtonPrimary";

// Tipagem para a navegação
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverInfo"
>;

export default function DriverInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { isDark, colors } = useTheme();

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
            firstName.trim().length > 2 &&
            cpf.length === 14 &&
            !!gender &&
            !!selectedState &&
            !!selectedCity
        );
    }, [firstName, cpf, gender, selectedState, selectedCity]);

    const formatCpf = (value: string) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
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
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Banner fixo no topo */}
                <View
                    style={[
                        styles.banner,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}
                >
                    {/* Botão de voltar posicionado dentro do banner, acima do texto */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.backButtonText,
                                { color: colors.white },
                            ]}
                        >
                            ‹
                        </Text>
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.bannerTitle,
                            {
                                color: colors.white,
                            },
                        ]}
                    >
                        Vem pra Zun e aproveite várias formas de ganhar
                        dinheiro!
                    </Text>

                    <Text
                        style={[
                            styles.bannerSubtitle,
                            {
                                color: "rgba(255,255,255,0.88)",
                            },
                        ]}
                    >
                        Mais eventos de recompensa | Garantia Zun | Resgates
                        flexíveis
                    </Text>
                </View>

                {/* Área do formulário */}
                <View
                    style={[
                        styles.formArea,
                        {
                            backgroundColor: colors.surface,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <FormTextInput
                        label="Primeiro nome"
                        value={firstName}
                        onChangeText={setFirstName}
                        isDark={isDark}
                        autoCapitalize="words"
                        autoCorrect={false}
                        returnKeyType="next"
                    />

                    <FormTextInput
                        label="CPF"
                        value={cpf}
                        onChangeText={(text: string) => setCpf(formatCpf(text))}
                        keyboardType="numeric"
                        maxLength={14}
                        isDark={isDark}
                        returnKeyType="done"
                    />

                    <CollapsiblePicker
                        label="Gênero"
                        options={["Masculino", "Feminino", "Outro"]}
                        selectedValue={gender}
                        onSelect={setGender}
                        isDark={isDark}
                    />

                    <Text
                        style={[
                            styles.linkText,
                            {
                                color: colors.primary,
                            },
                        ]}
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
            <View
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.surface,
                        borderTopColor: colors.divider,
                    },
                ]}
            >
                <ButtonPrimary
                    title="Avançar"
                    onPress={handleNext}
                    isDark={isDark}
                    disabled={!isFormValid}
                />
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
    },

    scrollContainer: {
        paddingBottom: 132,
    },

    // --- Estilos do Banner Superior ---
    banner: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "ios" ? 64 : 42,
        paddingBottom: 24,
        minHeight: 168,
        justifyContent: "flex-end",
    },

    backButton: {
        position: "absolute",
        top: Platform.OS === "ios" ? 16 : 10,
        left: 12,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    backButtonText: {
        fontSize: 34,
        fontWeight: "300",
        marginTop: -4,
    },

    bannerTitle: {
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 24,
        marginTop: 28,
        maxWidth: "88%",
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
        marginTop: 8,
        maxWidth: "95%",
    },

    // --- Estilos da Área do Formulário ---
    formArea: {
        paddingTop: 18,
        paddingBottom: 12,
        borderTopWidth: 1,
    },

    linkText: {
        fontWeight: "600",
        fontSize: 14,
        paddingHorizontal: 20,
        marginTop: 6,
        marginBottom: 10,
    },

    // --- Estilos do Rodapé e Botão Principal ---
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 30 : 20,
        borderTopWidth: 1,
    },
});

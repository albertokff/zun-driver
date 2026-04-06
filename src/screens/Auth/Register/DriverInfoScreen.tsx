/*
========================================================
TELA DE INFORMAÇÕES DO MOTORISTA

OBJETIVO:
- Coletar os dados básicos do motorista
- Seguir a estrutura visual da referência da 99
- Manter topo e rodapé com altura padronizada
- Usar apenas cores dinâmicas do tema
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
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

// Hooks e componentes personalizados
import { useBrazilianCities } from "../../../hooks/useBrazilianCities";
import FormTextInput from "../../../components/FormTextInput";
import CollapsiblePicker from "../../../components/CollapsiblePicker";
import CityPicker from "../../../components/CityPicker";
import ButtonPrimary from "../../../components/ButtonPrimary";

/*
========================================================
TIPAGEM PARA A NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverInfo"
>;

export default function DriverInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme, isDark, colors } = useTheme();

    /*
    ========================================================
    HOOK PARA GERENCIAR ESTADOS E CIDADES
    ========================================================
    */
    const {
        states,
        cities,
        selectedState,
        selectedCity,
        setSelectedState,
        setSelectedCity,
    } = useBrazilianCities();

    /*
    ========================================================
    STATES DO FORMULÁRIO
    ========================================================
    */
    const [firstName, setFirstName] = useState("");
    const [cpf, setCpf] = useState("");
    const [gender, setGender] = useState("");

    /*
    ========================================================
    VALIDAÇÃO DO FORMULÁRIO
    ========================================================
    */
    const isFormValid = useMemo(() => {
        return (
            firstName.trim().length > 2 &&
            cpf.length === 14 &&
            !!gender &&
            !!selectedState &&
            !!selectedCity
        );
    }, [firstName, cpf, gender, selectedState, selectedCity]);

    /*
    ========================================================
    FORMATAR CPF
    ========================================================
    */
    const formatCpf = (value: string) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    /*
    ========================================================
    AÇÃO DE AVANÇAR
    ========================================================
    */
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
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={isDark ? colors.background : colors.white}
            />

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    TOPO PADRONIZADO
                    Mantém a mesma sensação visual entre telas
                ======================================================== */}
                <View
                    style={[
                        styles.topBar,
                        {
                            backgroundColor: isDark
                                ? colors.background
                                : colors.white,
                            borderBottomColor: colors.divider,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.topBrand,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Zun
                    </Text>

                    <View style={styles.topSpacer} />
                </View>

                {/* ========================================================
                    CONTEÚDO ROLÁVEL
                ======================================================== */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {/* ====================================================
                        BANNER SUPERIOR
                        Mesmo padrão estrutural da tela anterior
                    ==================================================== */}
                    <View
                        style={[
                            styles.banner,
                            {
                                backgroundColor: colors.primary,
                            },
                        ]}
                    >
                        <View style={styles.bannerTextContainer}>
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
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Mais eventos de recompensa | Garantia Zun |
                                Resgates flexíveis
                            </Text>
                        </View>

                        <View style={styles.bannerArt}>
                            <Ionicons
                                name="cash-outline"
                                size={52}
                                color={colors.white}
                            />
                        </View>
                    </View>

                    {/* ====================================================
                        FORMULÁRIO
                    ==================================================== */}
                    <View
                        style={[
                            styles.formArea,
                            {
                                backgroundColor: colors.background,
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
                            onChangeText={(text: string) =>
                                setCpf(formatCpf(text))
                            }
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

                {/* ========================================================
                    RODAPÉ FIXO PADRONIZADO
                ======================================================== */}
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
                        title="Avançar"
                        onPress={handleNext}
                        isDark={isDark}
                        disabled={!isFormValid}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
FOLHA DE ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

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

    topIconButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 2,
    },

    topBrand: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 4,
    },

    topSpacer: {
        flex: 1,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    /*
    ========================================================
    BANNER SUPERIOR
    Mesma lógica visual de altura da tela anterior
    ========================================================
    */
    banner: {
        minHeight: 120,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    bannerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    bannerTitle: {
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 6,
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    bannerArt: {
        width: 78,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    FORMULÁRIO
    ========================================================
    */
    formArea: {
        paddingTop: 14,
        paddingBottom: 10,
    },

    linkText: {
        fontWeight: "600",
        fontSize: 14,
        paddingHorizontal: 20,
        marginTop: 6,
        marginBottom: 10,
    },

    /*
    ========================================================
    RODAPÉ FIXO
    Mesmo padrão de sensação entre telas
    ========================================================
    */
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
    },
});

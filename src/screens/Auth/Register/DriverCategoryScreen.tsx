/*
========================================================
TELA DE CATEGORIA DO MOTORISTA

OBJETIVO:
- Permitir que o usuário selecione a categoria em que vai atuar
- Seguir a estrutura visual da referência da 99
- Aplicar identidade Zun por cima da estrutura base
- Usar apenas cores dinâmicas do tema

FLUXO:
- Usuário escolhe uma categoria
- Botão "Próximo" habilita após seleção
- Navega para DriverInfo
========================================================
*/

import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverCategory"
>;

/*
========================================================
OPÇÕES DE CATEGORIA
Seguem a lógica da referência, adaptadas para a Zun
========================================================
*/
const CATEGORIES = [
    {
        id: "delivery",
        icon: "cube-outline",
        title: "Eu sou um entregador",
        subtitle: "Quero ganhar dinheiro fazendo entregas",
    },
    {
        id: "moto",
        icon: "bicycle-outline",
        title: "Eu tenho uma moto placa cinza",
        subtitle: "Quero fazer corridas com passageiros",
    },
    {
        id: "car",
        icon: "car-sport-outline",
        title: "Eu tenho um carro",
        subtitle: "Quero fazer corridas com passageiros ou realizar entregas",
    },
    {
        id: "rent",
        icon: "car-outline",
        title: "Preciso de ajuda para alugar um carro",
        subtitle: "A Zun pode te ajudar a encontrar",
    },
];

/*
========================================================
COMPONENTE PRINCIPAL
========================================================
*/
export default function DriverCategoryScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    ESTADO DA SELEÇÃO
    ========================================================
    */
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    /*
    ========================================================
    AÇÃO DE AVANÇAR
    ========================================================
    */
    const handleNext = () => {
        if (!selectedCategory) return;

        navigation.navigate("DriverInfo");
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
                    TOPO DA TELA
                    Estrutura inspirada na referência da 99
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
                        Estrutura da 99, identidade Zun
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
                                Zun é segurança em todas as categorias
                            </Text>

                            <Text
                                style={[
                                    styles.bannerSubtitle,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Monitoramos suas corridas em tempo real e, em
                                caso de anormalidade, um agente poderá entrar em
                                contato.
                            </Text>
                        </View>

                        <View style={styles.bannerArt}>
                            <Ionicons
                                name="shield-checkmark"
                                size={52}
                                color={colors.white}
                            />
                        </View>
                    </View>

                    {/* ====================================================
                        LISTA DE CATEGORIAS
                    ==================================================== */}
                    <View style={styles.listContainer}>
                        {CATEGORIES.map((item) => {
                            const isSelected = selectedCategory === item.id;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.categoryItem,
                                        {
                                            backgroundColor: isDark
                                                ? colors.background
                                                : colors.white,
                                            borderColor: isSelected
                                                ? colors.primary
                                                : colors.divider,
                                        },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={() => setSelectedCategory(item.id)}
                                >
                                    <View
                                        style={[
                                            styles.categoryIconWrap,
                                            {
                                                backgroundColor: isDark
                                                    ? colors.background
                                                    : colors.white,
                                                borderColor: colors.divider,
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={item.icon as any}
                                            size={30}
                                            color={colors.text}
                                        />
                                    </View>

                                    <View style={styles.categoryTextContainer}>
                                        <Text
                                            style={[
                                                styles.categoryTitle,
                                                {
                                                    color: colors.text,
                                                },
                                            ]}
                                        >
                                            {item.title}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.categorySubtitle,
                                                {
                                                    color: colors.subtext,
                                                },
                                            ]}
                                        >
                                            {item.subtitle}
                                        </Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.radioCircle,
                                            {
                                                borderColor: isSelected
                                                    ? colors.primary
                                                    : colors.divider,
                                            },
                                        ]}
                                    >
                                        {isSelected && (
                                            <View
                                                style={[
                                                    styles.radioChecked,
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
                </ScrollView>

                {/* ========================================================
                    RODAPÉ FIXO
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
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: colors.primary,
                                opacity: selectedCategory ? 1 : 0.35,
                            },
                        ]}
                        disabled={!selectedCategory}
                        onPress={handleNext}
                        activeOpacity={0.88}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    color: colors.white,
                                },
                            ]}
                        >
                            Próximo
                        </Text>
                    </TouchableOpacity>
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
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

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
        paddingBottom: 16,
    },

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

    listContainer: {
        paddingHorizontal: 14,
        paddingTop: 14,
    },

    categoryItem: {
        minHeight: 98,
        borderRadius: 14,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 12,
    },

    categoryIconWrap: {
        width: 72,
        height: 72,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    categoryTextContainer: {
        flex: 1,
        paddingRight: 12,
    },

    categoryTitle: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 4,
    },

    categorySubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },

    radioChecked: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },

    footer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
    },

    button: {
        minHeight: 54,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        fontSize: 17,
        fontWeight: "700",
    },
});

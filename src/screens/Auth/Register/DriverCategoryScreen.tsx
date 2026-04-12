/*
========================================================
TELA DE CATEGORIA DO MOTORISTA

OBJETIVO:
- Permitir que o usuário selecione a categoria em que vai atuar
- Seguir a estrutura visual da referência da 99
- Aplicar identidade Zun por cima da estrutura base
- Usar apenas cores dinâmicas do tema
- Manter o mesmo padrão de topo e rodapé das telas anteriores

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
import ButtonPrimary from "../../../components/ButtonPrimary";

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
    // {
    //     id: "rent",
    //     icon: "car-outline",
    //     title: "Preciso de ajuda para alugar um carro",
    //     subtitle: "A Zun pode te ajudar a encontrar",
    // },
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
    AÇÃO DE VOLTAR
    ========================================================
    */
    const handleBack = () => {
        navigation.goBack();
    };

    /*
    ========================================================
    AÇÃO DE FECHAR
    Volta para a tela inicial do fluxo
    ========================================================
    */
    const handleClose = () => {
        navigation.navigate("Start");
    };

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
                backgroundColor={colors.background}
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
                    Mesmo padrão visual aprovado nas telas anteriores
                ======================================================== */}
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
                        style={styles.topIconButton}
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
                        style={styles.topIconButton}
                        onPress={handleClose}
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
                        Estrutura da 99 com identidade Zun
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
                                size={48}
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
                                            backgroundColor: colors.surface,
                                            borderColor: isSelected
                                                ? colors.primary
                                                : colors.divider,
                                        },
                                    ]}
                                    activeOpacity={0.88}
                                    onPress={() => setSelectedCategory(item.id)}
                                >
                                    {/* ====================================
                                        BLOCO DO ÍCONE
                                    ==================================== */}
                                    <View
                                        style={[
                                            styles.categoryIconWrap,
                                            {
                                                backgroundColor: isDark
                                                    ? colors.card
                                                    : colors.background,
                                                borderColor: colors.divider,
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={item.icon as any}
                                            size={28}
                                            color={colors.text}
                                        />
                                    </View>

                                    {/* ====================================
                                        BLOCO DE TEXTO
                                    ==================================== */}
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

                                    {/* ====================================
                                        RADIO DE SELEÇÃO
                                    ==================================== */}
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
                    Mantido no padrão do app
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
                        title="Próximo"
                        onPress={handleNext}
                        isDark={isDark}
                        disabled={!selectedCategory}
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

    /*
    ========================================================
    ÁREA ROLÁVEL
    ========================================================
    */
    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 16,
    },

    /*
    ========================================================
    BANNER
    Mesmo padrão de altura das telas anteriores
    ========================================================
    */
    banner: {
        minHeight: 108,
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
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 4,
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    bannerArt: {
        width: 64,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    LISTA DE CATEGORIAS
    ========================================================
    */
    listContainer: {
        paddingHorizontal: 14,
        paddingTop: 14,
    },

    /*
    ========================================================
    CONTROLE DE ESPAÇAMENTO ENTRE CATEGORIAS
    marginBottom: 12,

    Ajuste aqui se quiser:
    - 6 = mais compacto
    - 10 = intermediário
    - 12+ = mais espaçado
    ========================================================
    */

    categoryItem: {
        minHeight: 96,
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 12,
    },

    categoryIconWrap: {
        width: 68,
        height: 68,
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

    /*
    ========================================================
    RODAPÉ
    ========================================================
    */
    footer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
    },
});

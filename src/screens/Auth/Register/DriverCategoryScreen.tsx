/*
========================================================
TELA DE CATEGORIA DO MOTORISTA
O usuário seleciona o tipo de veículo/serviço que irá operar.
========================================================
*/
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";

// Tipagem
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DriverCategory"
>;

// Opções de Categoria
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
];

export default function DriverCategoryScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const handleNext = () => {
        if (selectedCategory) {
            navigation.navigate("DriverInfo");
        }
    };

    // Componente para cada item da lista
    const CategoryItem = ({ item }: { item: (typeof CATEGORIES)[0] }) => {
        const isSelected = selectedCategory === item.id;
        return (
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    isDark && styles.categoryItemDark,
                    isSelected && styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(item.id)}
            >
                <Ionicons
                    name={item.icon as any}
                    size={32}
                    color={isDark ? "#FFF" : "#000"}
                    style={styles.categoryIcon}
                />
                <View style={styles.categoryTextContainer}>
                    <Text
                        style={[
                            styles.categoryTitle,
                            isDark && styles.categoryTitleDark,
                        ]}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={[
                            styles.categorySubtitle,
                            isDark && styles.categorySubtitleDark,
                        ]}
                    >
                        {item.subtitle}
                    </Text>
                </View>
                <View
                    style={[
                        styles.radioCircle,
                        isDark && styles.radioCircleDark,
                    ]}
                >
                    {isSelected && <View style={styles.radioChecked} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <BackButton />
            <ScrollView>
                {/* BANNER SUPERIOR */}
                <View style={styles.banner}>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>
                            Zun é segurança em todas as categorias
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                            Monitoramos suas corridas em tempo real e em caso de
                            anormalidade um agente entrará em contato
                        </Text>
                    </View>
                    <Ionicons
                        name="map-outline"
                        size={50}
                        color="#333"
                        style={styles.bannerIcon}
                    />
                </View>

                {/* LISTA DE CATEGORIAS */}
                <View style={styles.listContainer}>
                    {CATEGORIES.map((item) => (
                        <CategoryItem key={item.id} item={item} />
                    ))}

                    {/* ITEM NÃO SELECIONÁVEL */}
                    <View
                        style={[
                            styles.categoryItem,
                            isDark && styles.categoryItemDark,
                            { opacity: 0.7 },
                        ]}
                    >
                        <Ionicons
                            name="car-sport-outline"
                            size={32}
                            color={isDark ? "#FFF" : "#000"}
                            style={styles.categoryIcon}
                        />
                        <View style={styles.categoryTextContainer}>
                            <Text
                                style={[
                                    styles.categoryTitle,
                                    isDark && styles.categoryTitleDark,
                                ]}
                            >
                                Preciso de ajuda para alugar um carro
                            </Text>
                            <Text
                                style={[
                                    styles.categorySubtitle,
                                    isDark && styles.categorySubtitleDark,
                                ]}
                            >
                                A Zun pode te ajudar a encontrar
                            </Text>
                        </View>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={24}
                            color="#1E6BE3"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO INFERIOR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: selectedCategory ? 1 : 0.5 },
                    ]}
                    disabled={!selectedCategory}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F9FA" },
    containerDark: { backgroundColor: "#000" },
    banner: {
        backgroundColor: "#1E6BE3",
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    bannerTextContainer: { flex: 1, marginRight: 10 },
    bannerTitle: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
    bannerSubtitle: { fontSize: 13, color: "#555", marginTop: 5 },
    bannerIcon: { opacity: 0.8 },
    listContainer: { padding: 20 },
    categoryItem: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EEE",
    },
    categoryItemDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#2C2C2E",
    },
    categoryItemSelected: {
        borderColor: "#1E6BE3",
        borderWidth: 2,
    },
    categoryIcon: { marginRight: 15 },
    categoryTextContainer: { flex: 1 },
    categoryTitle: { fontSize: 16, fontWeight: "600", color: "#222" },
    categoryTitleDark: { color: "#FFF" },
    categorySubtitle: { fontSize: 14, color: "#666", marginTop: 4 },
    categorySubtitleDark: { color: "#AAA" },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#DDD",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    radioCircleDark: { borderColor: "#555" },
    radioChecked: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#1E6BE3",
    },
    footer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#F8F9FA",
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
});

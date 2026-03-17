/*
========================================================
COMPONENTE: DrawerHeader
Cabeçalho do menu lateral com foto, nome e avaliação.

BASEADO NA IMAGEM 09 QUE VOCÊ ENVIOU:
- Foto de perfil circular
- Nome do motorista
- Avaliação (estrelas)
- Categoria/Fase do veículo
========================================================
*/
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface DrawerHeaderProps {
    name?: string;
    rating?: number;
    category?: string;
    photoUri?: string;
}

export default function DrawerHeader({
    name = "Marcelo",
    rating = 4.95,
    category = "Carro · Fase 3",
    photoUri,
}: DrawerHeaderProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* FOTO DE PERFIL */}
            <View style={styles.photoContainer}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.photo} />
                ) : (
                    <View
                        style={[
                            styles.photoPlaceholder,
                            isDark && styles.photoPlaceholderDark,
                        ]}
                    >
                        <Ionicons
                            name="person"
                            size={40}
                            color={isDark ? "#AAA" : "#666"}
                        />
                    </View>
                )}
            </View>

            {/* NOME */}
            <Text style={[styles.name, isDark && styles.nameDark]}>{name}</Text>

            {/* AVALIAÇÃO */}
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFC107" />
                <Text style={[styles.rating, isDark && styles.ratingDark]}>
                    {rating}
                </Text>
            </View>

            {/* CATEGORIA/FASE */}
            <View
                style={[
                    styles.categoryBadge,
                    isDark && styles.categoryBadgeDark,
                ]}
            >
                <Ionicons name="car" size={14} color="#1E6BE3" />
                <Text
                    style={[
                        styles.categoryText,
                        isDark && styles.categoryTextDark,
                    ]}
                >
                    {category}
                </Text>
            </View>

            {/* TAXAS */}
            <View style={styles.ratesContainer}>
                <View style={styles.rateItem}>
                    <Text
                        style={[
                            styles.rateValue,
                            isDark && styles.rateValueDark,
                        ]}
                    >
                        0%
                    </Text>
                    <Text
                        style={[
                            styles.rateLabel,
                            isDark && styles.rateLabelDark,
                        ]}
                    >
                        Taxa de Aceitação
                    </Text>
                </View>
                <View style={styles.rateDivider} />
                <View style={styles.rateItem}>
                    <Text
                        style={[
                            styles.rateValue,
                            styles.rateValueRed,
                            isDark && styles.rateValueDark,
                        ]}
                    >
                        0%
                    </Text>
                    <Text
                        style={[
                            styles.rateLabel,
                            isDark && styles.rateLabelDark,
                        ]}
                    >
                        Taxa de Finalização
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        padding: 20,
        paddingTop: 40,
        alignItems: "center",
    },
    containerDark: {
        backgroundColor: "#1C1C1E",
    },
    photoContainer: {
        marginBottom: 15,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F0F0F0",
    },
    photoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
    },
    photoPlaceholderDark: {
        backgroundColor: "#2C2C2E",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 5,
    },
    nameDark: {
        color: "#FFF",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    rating: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
    },
    ratingDark: {
        color: "#AAA",
    },
    categoryBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8F4FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 20,
    },
    categoryBadgeDark: {
        backgroundColor: "#1E3A5F",
    },
    categoryText: {
        fontSize: 13,
        color: "#1E6BE3",
        fontWeight: "600",
        marginLeft: 5,
    },
    categoryTextDark: {
        color: "#4A90E2",
    },
    ratesContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
    },
    rateItem: {
        alignItems: "center",
    },
    rateValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
    },
    rateValueRed: {
        color: "#E74C3C",
    },
    rateValueDark: {
        color: "#FFF",
    },
    rateLabel: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 4,
    },
    rateLabelDark: {
        color: "#AAA",
    },
    rateDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#EEE",
    },
});

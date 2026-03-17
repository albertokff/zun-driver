/*
========================================================
COMPONENTE: DrawerItem
Item individual do menu lateral.

BASEADO NA IMAGEM 09 QUE VOCÊ ENVIOU:
- Ícone à esquerda
- Texto do item
- Badge de notificação (opcional)
- Seta à direita (opcional)
========================================================
*/
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface DrawerItemProps {
    icon: string;
    label: string;
    badge?: string | number;
    onPress?: () => void;
    showArrow?: boolean;
}

export default function DrawerItem({
    icon,
    label,
    badge,
    onPress,
    showArrow = true,
}: DrawerItemProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <TouchableOpacity
            style={[styles.container, isDark && styles.containerDark]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* ÍCONE */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name={icon as any}
                    size={22}
                    color={isDark ? "#AAA" : "#666"}
                />
            </View>

            {/* TEXTO */}
            <Text style={[styles.label, isDark && styles.labelDark]}>
                {label}
            </Text>

            {/* BADGE DE NOTIFICAÇÃO */}
            {badge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}

            {/* SETA */}
            {showArrow && (
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={isDark ? "#555" : "#CCC"}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F5F5F5",
    },
    containerDark: {
        backgroundColor: "#1C1C1E",
        borderBottomColor: "#2C2C2E",
    },
    iconContainer: {
        width: 30,
        alignItems: "center",
        marginRight: 15,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: "#222",
    },
    labelDark: {
        color: "#FFF",
    },
    badge: {
        backgroundColor: "#FFCDD2",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 10,
    },
    badgeText: {
        fontSize: 11,
        color: "#C62828",
        fontWeight: "600",
    },
});

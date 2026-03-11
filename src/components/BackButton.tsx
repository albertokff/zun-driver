import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function BackButton() {
    const navigation = useNavigation();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.goBack()}
        >
            <Text style={[styles.icon, isDark && styles.iconDark]}>←</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 60,
        left: 25,
        zIndex: 10,
    },

    icon: {
        fontSize: 28,
        color: "#000",
    },

    iconDark: {
        color: "#fff",
    },
});

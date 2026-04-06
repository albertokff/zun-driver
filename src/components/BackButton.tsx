import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function BackButton() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
        >
            <Text style={[styles.icon, { color: colors.white }]}>‹</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: Platform.OS === "ios" ? 16 : 10,
        left: 12,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    icon: {
        fontSize: 34,
        fontWeight: "300",
        marginTop: -4,
    },
});

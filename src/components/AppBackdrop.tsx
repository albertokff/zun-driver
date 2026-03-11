import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
    children?: React.ReactNode;
};

export default function AppBackdrop({ children }: Props) {
    const { theme } = useTheme();

    const logo =
        theme === "dark"
            ? require("../assets/logo/zun-logo-dark.png")
            : require("../assets/logo/zun-logo-light.png");

    const backgroundColor = theme === "dark" ? "#000000" : "#ffffff";
    const textColor = theme === "dark" ? "#9BA1A6" : "#687076";

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />

            <Text style={[styles.primaryTextOpac, { color: textColor }]}>
                Z - Motorista
            </Text>

            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    logo: {
        width: 180,
        height: 180,
        marginBottom: 10,
    },

    primaryTextOpac: {
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 2,
        marginTop: 6,
    },
});

import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
};

export default function AppBackdrop({
    children,
    title = "Z - Motorista",
    subtitle = "Mobilidade inteligente para motoristas parceiros.",
}: Props) {
    const { theme, colors } = useTheme();

    const logo =
        theme === "dark"
            ? require("../assets/logo/zun-logo-dark.png")
            : require("../assets/logo/zun-logo-light.png");

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* Bloco principal de branding */}
            <View style={styles.brandingContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />

                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {title}
                </Text>

                <Text
                    style={[
                        styles.subtitle,
                        {
                            color: colors.textSecondary,
                        },
                    ]}
                >
                    {subtitle}
                </Text>
            </View>

            {/* Área de conteúdo reutilizável */}
            <View style={styles.content}>{children}</View>
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

    brandingContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 24,
    },

    logo: {
        width: 168,
        height: 168,
        marginBottom: 8,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 1.2,
        textAlign: "center",
        marginTop: 4,
    },

    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
        maxWidth: 280,
    },

    content: {
        width: "100%",
        alignItems: "center",
    },
});

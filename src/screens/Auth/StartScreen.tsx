import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

export default function StartScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

    return (
        <View
            style={[styles.container, theme === "dark" && styles.containerDark]}
        >
            {/* Nova View para agrupar a logo e o texto */}
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.primaryTextOpac}>Z Motorista</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("Phone")}
                >
                    <Text style={styles.primaryText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                    <Text style={styles.secondaryText}>Criar minha conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 120,
    },
    containerDark: {
        backgroundColor: "#0B0B0B",
    },
    // Novo estilo para o container da logo
    logoContainer: {
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    buttonsContainer: {
        width: "100%",
        alignItems: "center",
    },
    primaryButton: {
        backgroundColor: "#1E6BE3",
        width: "80%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        marginBottom: 14,
    },
    primaryText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    primaryTextOpac: {
        color: "#687076",
        fontSize: 18,
        fontWeight: "600",
        // Opcional: Adicione uma margem negativa se quiser ainda mais próximo
        // marginTop: -20,
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: "#1E6BE3",
        width: "80%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    secondaryText: {
        color: "#1E6BE3",
        fontSize: 18,
        fontWeight: "600",
    },
});

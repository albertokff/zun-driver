import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PrivacyPolicy"
>;

export default function PrivacyPolicyScreen() {
    const navigation = useNavigation<NavigationProp>();

    function handleAgree() {
        navigation.navigate("Permissions");
    }

    function handleExit() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>
                    Política de privacidade e uso Zun Motorista
                </Text>

                <Text style={styles.bodyText}>
                    Antes de usar os produtos ou serviços da Zun Motorista, leia
                    atentamente os Termos de Uso, as regras da plataforma e a
                    Política de Privacidade.
                </Text>

                <TouchableOpacity>
                    <Text style={styles.linkText}>
                        Privacidade e uso da Zun Motorista
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleAgree}
                >
                    <Text style={styles.primaryText}>Concordo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleExit}
                >
                    <Text style={styles.secondaryText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },

    content: {
        padding: 24,
        paddingTop: 80,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0B0B0B",
        marginBottom: 20,
    },

    bodyText: {
        fontSize: 16,
        color: "#687076",
        lineHeight: 24,
        marginBottom: 20,
    },

    linkText: {
        fontSize: 16,
        color: "#1E6BE3",
        fontWeight: "600",
    },

    buttons: {
        padding: 24,
    },

    primaryButton: {
        backgroundColor: "#1E6BE3",
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

    secondaryButton: {
        borderWidth: 2,
        borderColor: "#1E6BE3",
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

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { usePhoneMask } from "../../../hooks/usePhoneMask";
import { useTheme } from "../../../context/ThemeContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Phone">;

export default function PhoneScreen() {
    const navigation = useNavigation<NavigationProp>();

    const { phone, unmaskedPhone, isPhoneValid, handlePhoneChange } =
        usePhoneMask();

    const { theme } = useTheme();

    const isDark = theme === "dark";

    const handleNext = () => {
        navigation.navigate("Otp", {
            phone: unmaskedPhone,
        });
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Digite seu telefone
            </Text>

            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="(00) 00000-0000"
                placeholderTextColor={isDark ? "#888" : "#999"}
                keyboardType="numeric"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={15}
            />

            <TouchableOpacity
                style={[styles.button, { opacity: isPhoneValid ? 1 : 0.5 }]}
                onPress={handleNext}
                disabled={!isPhoneValid}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "#ffffff",
    },

    containerDark: {
        backgroundColor: "#0B0B0B",
    },

    title: {
        fontSize: 22,
        marginBottom: 30,
        fontWeight: "600",
        color: "#000",
    },

    titleDark: {
        color: "#fff",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 15,
        fontSize: 18,
        color: "#000",
        backgroundColor: "#fff",
    },

    inputDark: {
        borderColor: "#333",
        color: "#fff",
        backgroundColor: "#1E1E1E",
    },

    button: {
        marginTop: 30,
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

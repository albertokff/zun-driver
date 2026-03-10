import React, { useState, useEffect } from "react";
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
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Otp">;

export default function OtpScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();

    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(60);

    const isDark = theme === "dark";

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleConfirm = () => {
        // futuramente valida no backend
        navigation.navigate("Start");
    };

    const handleResend = () => {
        if (timer > 0) return;

        // futuramente chamará API de envio SMS
        setTimer(60);
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <BackButton />

            <Text style={[styles.title, isDark && styles.titleDark]}>
                Digite o código
            </Text>

            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Enviamos um código por SMS para confirmar seu telefone
            </Text>

            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
                placeholderTextColor={isDark ? "#777" : "#999"}
                value={code}
                onChangeText={setCode}
            />

            <TouchableOpacity
                style={[
                    styles.button,
                    { opacity: code.length === 6 ? 1 : 0.5 },
                ]}
                disabled={code.length !== 6}
                onPress={handleConfirm}
            >
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            {timer > 0 ? (
                <Text style={[styles.timer, isDark && styles.timerDark]}>
                    Reenviar código em {timer}s
                </Text>
            ) : (
                <TouchableOpacity onPress={handleResend}>
                    <Text style={[styles.resend, isDark && styles.resendDark]}>
                        Reenviar código
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },

    containerDark: {
        backgroundColor: "#0B0B0B",
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        color: "#000",
    },

    titleDark: {
        color: "#fff",
    },

    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 30,
    },

    subtitleDark: {
        color: "#aaa",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 15,
        fontSize: 22,
        textAlign: "center",
        letterSpacing: 10,
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

    timer: {
        marginTop: 20,
        textAlign: "center",
        color: "#666",
    },

    timerDark: {
        color: "#aaa",
    },

    resend: {
        marginTop: 20,
        textAlign: "center",
        color: "#1E6BE3",
        fontWeight: "500",
    },

    resendDark: {
        color: "#4C8DFF",
    },
});

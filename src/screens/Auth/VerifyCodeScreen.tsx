import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "VerifyCode">;

export default function VerifyCodeScreen({ route, navigation }: Props) {
    const { phone } = route.params;

    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [loading, setLoading] = useState(false);

    // TIMER
    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // VALIDAR CODIGO
    const handleVerify = async () => {
        if (code.length !== 6) {
            Alert.alert("Digite o código de 6 dígitos");
            return;
        }

        try {
            setLoading(true);

            // chamada API (exemplo)
            // await api.post('/auth/verify', { phone, code })

            navigation.navigate("Register");
        } catch (error) {
            Alert.alert("Código inválido");
        } finally {
            setLoading(false);
        }
    };

    // REENVIAR CODIGO
    const handleResend = async () => {
        try {
            // await api.post('/auth/resend', { phone })

            setTimeLeft(60);

            Alert.alert("Novo código enviado");
        } catch (error) {
            Alert.alert("Erro ao reenviar código");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Digite o código enviado</Text>

            <Text style={styles.subtitle}>Enviamos um SMS para {phone}</Text>

            <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            {timeLeft > 0 ? (
                <Text style={styles.timer}>Reenviar código em {timeLeft}s</Text>
            ) : (
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resend}>Reenviar código</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        marginTop: 8,
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 10,
    },

    button: {
        backgroundColor: "#0066FF",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },

    timer: {
        textAlign: "center",
        marginTop: 20,
        color: "#888",
    },

    resend: {
        textAlign: "center",
        marginTop: 20,
        color: "#0066FF",
        fontWeight: "bold",
    },
});

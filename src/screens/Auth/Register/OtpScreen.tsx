/*
========================================================
TELA DE VERIFICAÇÃO DE CÓDIGO OTP
Usuário insere o código de 6 dígitos enviado por SMS.

FLUXO ATUALIZADO:
- Diferencia entre Login e Cadastro
- Login: Após confirmar, vai para AssistantPermission
- Cadastro: Após confirmar, vai para Password

PARÂMETROS RECEBIDOS:
- fromLogin?: boolean (opcional)
  - true: Fluxo de Login
  - false/undefined: Fluxo de Cadastro
========================================================
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Otp">;
// Tipagem para rota com parâmetros
type OtpRouteProp = RouteProp<RootStackParamList, "Otp">;

export default function OtpScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OtpRouteProp>();
    const { theme } = useTheme();

    // Estado para armazenar o código digitado
    const [code, setCode] = useState("");
    // Estado para timer de reenvio (60 segundos)
    const [timer, setTimer] = useState(60);

    const isDark = theme === "dark";

    /*
    ================================================
    VERIFICAR SE VEIO DO FLUXO DE LOGIN
    route.params pode ser undefined, então usamos || {}
    ================================================
    */
    const { fromLogin = false } = route.params || {};

    /*
    ================================================
    TIMER DE REENVIO
    Decrementa a cada segundo até chegar a 0
    ================================================
    */
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        // Limpa o intervalo quando o componente desmontar
        return () => clearInterval(interval);
    }, [timer]);

    /*
    ================================================
    CONFIRMAR CÓDIGO
    Navegação condicional baseada no fluxo (Login/Cadastro)
    ================================================
    */
    const handleConfirm = () => {
        // Aqui futuramente validará o código com backend

        if (fromLogin) {
            /*
            ================================================
            FLUXO DE LOGIN (ENTRAR)
            Após confirmar código, vai para permissões
            ================================================
            */
            navigation.navigate("AssistantPermission");
        } else {
            /*
            ================================================
            FLUXO DE CADASTRO
            Após confirmar código, cria senha
            ================================================
            */
            navigation.navigate("Password");
        }
    };

    /*
    ================================================
    REENVIAR CÓDIGO
    Permite reenviar o SMS após timer chegar a 0
    ================================================
    */
    const handleResend = () => {
        // Só permite reenviar se timer chegou a 0
        if (timer > 0) return;

        // Futuramente chamará API de envio SMS
        // Reseta timer para 60 segundos
        setTimer(60);
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* BOTÃO DE VOLTAR */}
            <BackButton />

            {/* TÍTULO */}
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Digite o código
            </Text>

            {/* SUBTÍTULO */}
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Enviamos um código por SMS para confirmar seu telefone
            </Text>

            {/* INPUT DO CÓDIGO */}
            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
                placeholderTextColor={isDark ? "#777" : "#999"}
                value={code}
                onChangeText={setCode}
            />

            {/* BOTÃO CONFIRMAR */}
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

            {/* TIMER OU LINK DE REENVIO */}
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

/*
========================================================
ESTILOS
========================================================
*/
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

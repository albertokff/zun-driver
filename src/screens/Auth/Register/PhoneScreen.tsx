/*
========================================================
TELA DE TELEFONE
Usuário insere número de telefone para login ou cadastro.

FLUXO ATUALIZADO:
- Diferencia entre Login e Cadastro
- Login: Botão "Entrar" na StartScreen passa fromLogin: true
- Cadastro: Botão "Criar conta" na StartScreen passa fromLogin: false

PARÂMETROS RECEBIDOS:
- fromLogin?: boolean (opcional)
  - true: Fluxo de Login (Entrar)
  - false/undefined: Fluxo de Cadastro
========================================================
*/
import React from "react";
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
import { usePhoneMask } from "../../../hooks/usePhoneMask";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Phone">;
// Tipagem para rota com parâmetros
type PhoneRouteProp = RouteProp<RootStackParamList, "Phone">;

export default function PhoneScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<PhoneRouteProp>();

    const { phone, unmaskedPhone, isPhoneValid, handlePhoneChange } =
        usePhoneMask();

    const { theme } = useTheme();

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
    AVANÇAR PARA OTP
    Passa o parâmetro fromLogin para o próximo tela
    ================================================
    */
    const handleNext = () => {
        navigation.navigate("Otp", {
            phone: unmaskedPhone,
            fromLogin, // Passa o parâmetro para OtpScreen
        });
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* BOTÃO VOLTAR */}
            <BackButton />

            {/* TÍTULO */}
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Digite seu telefone
            </Text>

            {/* INPUT DE TELEFONE */}
            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="(00) 00000-0000"
                placeholderTextColor={isDark ? "#888" : "#999"}
                keyboardType="numeric"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={15}
            />

            {/* BOTÃO CONTINUAR */}
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

/*
========================================================
ESTILOS
========================================================
*/
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

    backButton: {
        position: "absolute",
        top: 60,
        left: 25,
    },

    backText: {
        fontSize: 28,
        color: "#000",
    },

    backTextDark: {
        color: "#fff",
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

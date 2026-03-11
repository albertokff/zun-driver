import React, { useState } from "react";
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
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Otp">;

export default function PasswordScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();

    const [code, setCode] = useState("");
    const [eyePassword, setEyePassword] = useState(false);

    const isDark = theme === "dark";

    const handleConfirm = () => {
        // Aqui futuramente validará com backend
        navigation.navigate("Start");
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Criar senha
            </Text>

            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Deve conter pelo menos dois dos seguintes itens: números, letras ou símbolos.
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    secureTextEntry={!eyePassword}
                    placeholder="************************"
                    placeholderTextColor={isDark ? "#777" : "#999"}
                    value={code}
                    onChangeText={setCode}
                />
                <TouchableOpacity 
                    style={{ marginLeft: 10 }}
                    onPress={() => setEyePassword(!eyePassword)}
                >
                    <Ionicons 
                    name={eyePassword ? "eye-off-outline" : "eye-outline"} 
                    size={24} 
                    color={isDark ? "#BBB" : "#666"} 
                    />
                </TouchableOpacity>

            </View>

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

    resend: {
        marginTop: 20,
        textAlign: "center",
        color: "#1E6BE3",
        fontWeight: "500",
    },

    resendDark: {
        color: "#4C8DFF",
    },

    containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative', // Necessário para o ícone flutuar
  },
  input: {
    flex: 1,
    height: 55,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 50, // Espaço extra na direita para o ícone
    fontSize: 18,
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#222',
    color: '#FFF',
    borderColor: '#444',
    borderWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    right: 15, // Distância da borda direita
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

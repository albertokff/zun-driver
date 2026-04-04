/*
========================================================
TELA INICIAL - START (VERSÃO REFINADA)
Foco em conversão + simplicidade + elegância

OBJETIVO:
- Reduzir carga de texto
- Melhorar UX
- Aumentar conversão
- Estilo similar a apps como 99

FLUXO:
- Entrar → Phone (login)
- Criar conta → PrivacyPolicy
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import ButtonPrimary from "../../components/ButtonPrimary";

// Tipagem para navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

export default function StartScreen() {
    const { theme, colors } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View style={styles.container}>
                {/* BLOCO CENTRAL */}
                <View style={styles.centerContent}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={[styles.title, { color: colors.text }]}>
                        Bem-vindo à Zun
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Ganhe mais dirigindo com liberdade
                    </Text>
                </View>

                {/* BOTÕES */}
                <View style={styles.buttonsContainer}>
                    <ButtonPrimary
                        title="Entrar"
                        onPress={() =>
                            navigation.navigate("Phone", {
                                fromLogin: true,
                            })
                        }
                        isDark={theme === "dark"}
                    />

                    <TouchableOpacity
                        style={[
                            styles.secondaryButton,
                            {
                                borderColor: colors.primary,
                            },
                        ]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate("PrivacyPolicy")}
                    >
                        <Text
                            style={[
                                styles.secondaryText,
                                { color: colors.primary },
                            ]}
                        >
                            Criar minha conta
                        </Text>
                    </TouchableOpacity>

                    {/* TEXTO LEGAL (leve e discreto) */}
                    <Text
                        style={[
                            styles.footerText,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Ao continuar, você concorda com os termos e a política
                        de privacidade.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 24,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        textAlign: "center",
    },

    buttonsContainer: {
        width: "100%",
        gap: 14,
    },

    secondaryButton: {
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },

    secondaryText: {
        fontSize: 16,
        fontWeight: "600",
    },

    footerText: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 12,
        paddingHorizontal: 10,
    },
});

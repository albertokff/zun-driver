/*
========================================================
TELA: DrawerMenu
Menu lateral do motorista (Drawer/Menu Hamburguer).

BASEADO NA IMAGEM 09 QUE VOCÊ ENVIOU:
- Header com foto, nome, avaliação
- Lista de itens do menu
- Botão de sair no final

ITENS DO MENU:
• Perfil
• Ganhos
• Recompensas
• Indique um amigo
• Central de Ajuda
• Notificações (com badge)
• Central de Educação
• Loja Zun
• Veículo
• Configurações
• Sair
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Componentes do Drawer
import DrawerHeader from "./components/DrawerHeader";
import DrawerItem from "./components/DrawerItem";

// Tipagem
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function DrawerMenu() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    /*
    ================================================
    MANIPULAR SAÍDA
    ================================================
    */
    const handleLogout = () => {
        Alert.alert("Sair", "Tem certeza que deseja sair do aplicativo?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: () => {
                    navigation.navigate("Start");
                },
            },
        ]);
    };

    /*
    ================================================
    MANIPULAR NAVEGAÇÃO DOS ITENS
    ================================================
    */
    const handleNavigate = (screen: string) => {
        // Em produção, navegaria para a tela específica
        Alert.alert(
            "Em desenvolvimento",
            `Tela "${screen}" será implementada em breve.`,
            [{ text: "OK" }],
        );
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <DrawerHeader
                    name="Marcelo"
                    rating={4.95}
                    category="Carro · Fase 3"
                />

                {/* SEPARADOR */}
                <View
                    style={[styles.separator, isDark && styles.separatorDark]}
                />

                {/* ITENS DO MENU */}
                <View style={styles.menuContainer}>
                    <DrawerItem
                        icon="person"
                        label="Perfil"
                        onPress={() => handleNavigate("Perfil")}
                    />
                    <DrawerItem
                        icon="cash"
                        label="Ganhos"
                        onPress={() => handleNavigate("Ganhos")}
                    />
                    <DrawerItem
                        icon="gift"
                        label="Recompensas"
                        onPress={() => handleNavigate("Recompensas")}
                    />
                    <DrawerItem
                        icon="people"
                        label="Indique um amigo"
                        onPress={() => handleNavigate("Indique um amigo")}
                    />
                    <DrawerItem
                        icon="help-circle"
                        label="Central de Ajuda"
                        onPress={() => handleNavigate("Central de Ajuda")}
                    />
                    <DrawerItem
                        icon="notifications"
                        label="Notificações"
                        badge="1"
                        onPress={() => handleNavigate("Notificações")}
                    />
                    <DrawerItem
                        icon="school"
                        label="Central de Educação"
                        onPress={() => handleNavigate("Central de Educação")}
                    />
                    <DrawerItem
                        icon="storefront"
                        label="Loja Zun"
                        onPress={() => handleNavigate("Loja Zun")}
                    />
                    <DrawerItem
                        icon="car"
                        label="Veículo"
                        onPress={() => handleNavigate("Veículo")}
                    />
                    <DrawerItem
                        icon="settings"
                        label="Configurações"
                        onPress={() => handleNavigate("Configurações")}
                    />
                </View>

                {/* BOTÃO SAIR */}
                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                        style={[
                            styles.logoutButton,
                            isDark && styles.logoutButtonDark,
                        ]}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out" size={20} color="#E74C3C" />
                        <Text style={styles.logoutText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    containerDark: { backgroundColor: "#0B0B0B" },

    separator: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: 10,
    },
    separatorDark: {
        backgroundColor: "#2C2C2E",
    },

    menuContainer: {
        backgroundColor: "#FFF",
    },

    logoutContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E74C3C",
    },
    logoutButtonDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#E74C3C",
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#E74C3C",
        marginLeft: 10,
    },
});

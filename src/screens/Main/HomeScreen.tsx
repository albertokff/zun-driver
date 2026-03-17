/*
========================================================
TELA PRINCIPAL - HOME
Tela inicial do motorista após login bem-sucedido.

FUNCIONALIDADES:
- Mapa de localização em tempo real
- Botão "Conectar" para receber corridas
- Menu lateral (Drawer) acessível pelo ícone de 3 traços
- Exibe status do motorista (Offline/Online)

FLUXO:
- Acessada após LocationPermissionScreen
- Botão "Conectar" alterna status Online/Offline
- Ícone de menu abre DrawerMenu
========================================================
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

// Tipagem
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Estado de conexão do motorista
    const [isConnected, setIsConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(
        "Carregando localização...",
    );

    /*
    ================================================
    OBTER LOCALIZAÇÃO ATUAL AO MONTAR
    ================================================
    */
    useEffect(() => {
        (async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== "granted") {
                    Alert.alert(
                        "Permissão necessária",
                        "Precisamos de acesso à sua localização para mostrar corridas próximas.",
                    );
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (address.length > 0) {
                    const { street, city, region } = address[0];
                    setCurrentAddress(`${street}, ${city} - ${region}`);
                }
            } catch (error) {
                console.error("Erro ao obter localização:", error);
                setCurrentAddress("Não foi possível obter sua localização");
            }
        })();
    }, []);

    /*
    ================================================
    ABRIR MENU LATERAL (DRAWER)
    ================================================
    */
    const openDrawer = () => {
        // Em produção, isso abriria o Drawer Navigator
        // Para agora, mostramos um alert de demonstração
        Alert.alert(
            "Menu",
            "Menu lateral com opções:\n• Perfil\n• Ganhos\n• Histórico\n• Configurações\n• Sair",
            [{ text: "Fechar", style: "cancel" }],
        );
    };

    /*
    ================================================
    TOGLAR STATUS DE CONEXÃO
    ================================================
    */
    const toggleConnection = () => {
        if (!isConnected) {
            // Conectando
            Alert.alert(
                "Conectar",
                "Você está se conectando para receber solicitações de corrida.",
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Conectar",
                        onPress: () => setIsConnected(true),
                    },
                ],
            );
        } else {
            // Desconectando
            Alert.alert(
                "Desconectar",
                "Você ficará offline e não receberá novas solicitações.",
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Desconectar",
                        onPress: () => setIsConnected(false),
                    },
                ],
            );
        }
    };

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* CABEÇALHO */}
            <View style={[styles.header, isDark && styles.headerDark]}>
                {/* Botão Menu (3 traços) */}
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={openDrawer}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons
                        name="menu"
                        size={28}
                        color={isDark ? "#FFF" : "#222"}
                    />
                </TouchableOpacity>

                {/* Logo/Title */}
                <Text
                    style={[
                        styles.headerTitle,
                        isDark && styles.headerTitleDark,
                    ]}
                >
                    Zun Motorista
                </Text>

                {/* Placeholder para notificações */}
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color={isDark ? "#FFF" : "#222"}
                    />
                    <View style={styles.notificationBadge} />
                </TouchableOpacity>
            </View>

            {/* MAPA */}
            <View style={styles.mapContainer}>
                {/* Placeholder do mapa - em produção, usar react-native-maps */}
                <View
                    style={[
                        styles.mapPlaceholder,
                        isDark && styles.mapPlaceholderDark,
                    ]}
                >
                    <Ionicons
                        name="map"
                        size={60}
                        color={isDark ? "#555" : "#CCC"}
                    />
                    <Text
                        style={[
                            styles.mapPlaceholderText,
                            isDark && styles.mapPlaceholderTextDark,
                        ]}
                    >
                        Mapa em desenvolvimento
                    </Text>
                    <Text
                        style={[
                            styles.mapSubtext,
                            isDark && styles.mapSubtextDark,
                        ]}
                    >
                        Integração com Google Maps/Mapbox será adicionada
                    </Text>
                </View>

                {/* Indicador de localização atual */}
                <View style={styles.locationIndicator}>
                    <Ionicons name="location" size={20} color="#1E6BE3" />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {currentAddress}
                    </Text>
                </View>
            </View>

            {/* STATUS DO MOTORISTA */}
            <View
                style={[
                    styles.statusContainer,
                    isDark && styles.statusContainerDark,
                ]}
            >
                <View style={styles.statusRow}>
                    <Text
                        style={[
                            styles.statusLabel,
                            isDark && styles.statusLabelDark,
                        ]}
                    >
                        Status:
                    </Text>
                    <View
                        style={[
                            styles.statusBadge,
                            isConnected
                                ? styles.statusOnline
                                : styles.statusOffline,
                        ]}
                    >
                        <View
                            style={[
                                styles.statusDot,
                                isConnected
                                    ? styles.statusDotOnline
                                    : styles.statusDotOffline,
                            ]}
                        />
                        <Text
                            style={[
                                styles.statusText,
                                isConnected
                                    ? styles.statusTextOnline
                                    : styles.statusTextOffline,
                            ]}
                        >
                            {isConnected ? "Online" : "Offline"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* BOTÃO CONECTAR */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
                <TouchableOpacity
                    style={[
                        styles.connectButton,
                        isConnected && styles.connectButtonActive,
                    ]}
                    onPress={toggleConnection}
                >
                    <Text
                        style={[
                            styles.connectButtonText,
                            isConnected && styles.connectButtonTextActive,
                        ]}
                    >
                        {isConnected ? "Desconectar" : "Conectar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    containerDark: { backgroundColor: "#0B0B0B" },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    headerDark: {
        backgroundColor: "#1C1C1E",
        borderBottomColor: "#2C2C2E",
    },
    menuButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
    },
    headerTitleDark: {
        color: "#FFF",
    },
    notificationButton: {
        padding: 8,
        position: "relative",
    },
    notificationBadge: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E74C3C",
    },

    // Mapa
    mapContainer: {
        flex: 1,
        position: "relative",
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
    },
    mapPlaceholderDark: {
        backgroundColor: "#1C1C1E",
    },
    mapPlaceholderText: {
        fontSize: 16,
        color: "#666",
        marginTop: 15,
    },
    mapPlaceholderTextDark: {
        color: "#AAA",
    },
    mapSubtext: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
    },
    mapSubtextDark: {
        color: "#777",
    },

    // Indicador de localização
    locationIndicator: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    locationText: {
        flex: 1,
        fontSize: 14,
        color: "#222",
        marginLeft: 8,
    },

    // Status
    statusContainer: {
        padding: 15,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    statusContainerDark: {
        backgroundColor: "#1C1C1E",
        borderTopColor: "#2C2C2E",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    statusLabel: {
        fontSize: 14,
        color: "#666",
    },
    statusLabelDark: {
        color: "#AAA",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusOnline: {
        backgroundColor: "rgba(46, 204, 113, 0.2)",
    },
    statusOffline: {
        backgroundColor: "rgba(149, 165, 166, 0.2)",
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusDotOnline: {
        backgroundColor: "#2ECC71",
    },
    statusDotOffline: {
        backgroundColor: "#95A5A6",
    },
    statusText: {
        fontSize: 14,
        fontWeight: "600",
    },
    statusTextOnline: {
        color: "#2ECC71",
    },
    statusTextOffline: {
        color: "#95A5A6",
    },

    // Footer
    footer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#FFF",
    },
    footerDark: {
        backgroundColor: "#1C1C1E",
    },
    connectButton: {
        backgroundColor: "#1E6BE3",
        padding: 18,
        borderRadius: 40,
        alignItems: "center",
    },
    connectButtonActive: {
        backgroundColor: "#E74C3C",
    },
    connectButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },
    connectButtonTextActive: {
        color: "#FFF",
    },
});

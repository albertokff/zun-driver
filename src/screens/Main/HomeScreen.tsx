/*
========================================================
TELA PRINCIPAL - HOME
Tela inicial do motorista após login bem-sucedido.

FUNCIONALIDADES:
- Placeholder do mapa de localização em tempo real
- Botão "Conectar" para receber corridas
- Menu lateral (Drawer) acessível pelo ícone de menu
- Exibe status do motorista (Offline/Online)
- Exibe localização atual de forma amigável

FLUXO:
- Acessada após LocationPermissionScreen
- Botão "Conectar" alterna status Online/Offline
- Ícone de menu abre DrawerMenu futuramente
========================================================
*/

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    ESTADOS DA TELA
    ========================================================
    */
    const [isConnected, setIsConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(
        "Carregando localização...",
    );
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);

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
                    setCurrentAddress("Localização não autorizada");
                    setIsLoadingLocation(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (address.length > 0) {
                    const { street, city, region } = address[0];
                    const formattedAddress = [street, city, region]
                        .filter(Boolean)
                        .join(", ");

                    setCurrentAddress(
                        formattedAddress || "Localização identificada",
                    );
                } else {
                    setCurrentAddress("Localização identificada");
                }
            } catch (error) {
                console.error("Erro ao obter localização:", error);
                setCurrentAddress("Não foi possível obter sua localização");
            } finally {
                setIsLoadingLocation(false);
            }
        })();
    }, []);

    /*
    ================================================
    ABRIR MENU LATERAL (DRAWER)
    ================================================
    */
    const openDrawer = () => {
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
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    CABEÇALHO
                ======================================================== */}
                <View
                    style={[
                        styles.header,
                        {
                            backgroundColor: colors.surface,
                            borderBottomColor: colors.divider,
                        },
                    ]}
                >
                    {/* Botão Menu */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={openDrawer}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="menu" size={26} color={colors.text} />
                    </TouchableOpacity>

                    {/* Título central */}
                    <View style={styles.headerCenter}>
                        <Text
                            style={[
                                styles.headerTitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Zun Motorista
                        </Text>

                        <Text
                            style={[
                                styles.headerSubtitle,
                                {
                                    color: colors.textSecondary,
                                },
                            ]}
                        >
                            {isConnected ? "Online" : "Offline"}
                        </Text>
                    </View>

                    {/* Notificações */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={colors.text}
                        />
                        <View
                            style={[
                                styles.notificationBadge,
                                {
                                    backgroundColor: colors.error,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                </View>

                {/* ========================================================
                    ÁREA PRINCIPAL / MAPA PLACEHOLDER
                ======================================================== */}
                <View style={styles.mapContainer}>
                    <View
                        style={[
                            styles.mapPlaceholder,
                            {
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                            },
                        ]}
                    >
                        <Ionicons
                            name="map-outline"
                            size={62}
                            color={colors.textMuted}
                        />

                        <Text
                            style={[
                                styles.mapPlaceholderTitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Mapa em desenvolvimento
                        </Text>

                        <Text
                            style={[
                                styles.mapPlaceholderText,
                                {
                                    color: colors.textSecondary,
                                },
                            ]}
                        >
                            A integração com Google Maps ou Mapbox será
                            adicionada em uma próxima etapa.
                        </Text>
                    </View>

                    {/* Localização atual */}
                    <View
                        style={[
                            styles.locationCard,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.locationIconWrap,
                                {
                                    backgroundColor: isDark
                                        ? colors.inputBackground
                                        : colors.background,
                                },
                            ]}
                        >
                            <Ionicons
                                name="location"
                                size={18}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.locationTextWrap}>
                            <Text
                                style={[
                                    styles.locationLabel,
                                    {
                                        color: colors.textSecondary,
                                    },
                                ]}
                            >
                                Sua localização
                            </Text>

                            {isLoadingLocation ? (
                                <View style={styles.loadingRow}>
                                    <ActivityIndicator
                                        size="small"
                                        color={colors.primary}
                                    />
                                    <Text
                                        style={[
                                            styles.locationText,
                                            {
                                                color: colors.text,
                                            },
                                        ]}
                                    >
                                        Carregando...
                                    </Text>
                                </View>
                            ) : (
                                <Text
                                    style={[
                                        styles.locationText,
                                        {
                                            color: colors.text,
                                        },
                                    ]}
                                    numberOfLines={2}
                                >
                                    {currentAddress}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* ========================================================
                    RODAPÉ / STATUS + BOTÃO
                ======================================================== */}
                <View
                    style={[
                        styles.footer,
                        {
                            backgroundColor: colors.surface,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <View style={styles.statusRow}>
                        <Text
                            style={[
                                styles.statusLabel,
                                {
                                    color: colors.textSecondary,
                                },
                            ]}
                        >
                            Status do motorista
                        </Text>

                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor: isConnected
                                        ? "rgba(46, 204, 113, 0.16)"
                                        : "rgba(120, 120, 128, 0.14)",
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.statusDot,
                                    {
                                        backgroundColor: isConnected
                                            ? colors.success
                                            : colors.textMuted,
                                    },
                                ]}
                            />

                            <Text
                                style={[
                                    styles.statusText,
                                    {
                                        color: isConnected
                                            ? colors.success
                                            : colors.textMuted,
                                    },
                                ]}
                            >
                                {isConnected ? "Online" : "Offline"}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.connectButton,
                            {
                                backgroundColor: isConnected
                                    ? colors.error
                                    : colors.primary,
                            },
                        ]}
                        onPress={toggleConnection}
                        activeOpacity={0.88}
                    >
                        <Text style={styles.connectButtonText}>
                            {isConnected ? "Desconectar" : "Conectar"}
                        </Text>
                    </TouchableOpacity>
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
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },

    iconButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    headerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    headerSubtitle: {
        fontSize: 12,
        marginTop: 2,
    },

    notificationBadge: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    mapContainer: {
        flex: 1,
        padding: 16,
        position: "relative",
    },

    mapPlaceholder: {
        flex: 1,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    mapPlaceholderTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 16,
        textAlign: "center",
    },

    mapPlaceholderText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        marginTop: 8,
        maxWidth: 280,
    },

    locationCard: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 22,
        borderRadius: 18,
        borderWidth: 1,
        padding: 14,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    locationIconWrap: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    locationTextWrap: {
        flex: 1,
    },

    locationLabel: {
        fontSize: 12,
        marginBottom: 4,
    },

    locationText: {
        fontSize: 14,
        lineHeight: 20,
        marginLeft: 8,
    },

    loadingRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    footer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
        borderTopWidth: 1,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    statusLabel: {
        fontSize: 14,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    statusText: {
        fontSize: 13,
        fontWeight: "700",
    },

    connectButton: {
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    connectButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});

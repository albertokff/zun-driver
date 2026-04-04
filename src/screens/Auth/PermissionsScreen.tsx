/*
========================================================
TELA DE PERMISSÕES

OBJETIVO:
- Explicar ao usuário quais permissões o app precisa
- Mostrar de forma clara e amigável o motivo de cada uma
- Manter uma experiência elegante, leve e confiável

COMPATIBILIDADE:
- Web: permissões gerenciadas pelo navegador
- Android: permissões gerenciadas pelo fluxo do app
- iOS: permissões gerenciadas pelo fluxo do app

OBSERVAÇÃO:
- Ainda estamos em fase de desenvolvimento com dados mockados
- O fluxo foi mantido preparado para futura integração real
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";
import { permissions } from "../../constants/permissions";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import BackButton from "../../components/BackButton";

/*
========================================================
CONFIGURAÇÃO DE DESENVOLVIMENTO
Defina como false para testar permissões reais
========================================================
*/
const DEV_SIMULATE_PERMISSION = true;

/*
========================================================
TIPOS DE PERMISSÃO
Compatível com Web e Android usando strings simples
========================================================
*/
type PermissionType = "camera" | "media-library" | "location" | string;

/*
========================================================
TIPO DE PERMISSÃO PARA ANDROID
Mapeia para as permissões nativas do Android
========================================================
*/
const ANDROID_PERMISSIONS = {
    LOCATION: "location",
    CAMERA: "camera",
    MEDIA_LIBRARY: "media-library",
} as const;

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Permissions"
>;

type PermissionItemProps = {
    icon: string;
    title: string;
    description: string;
};

export default function PermissionsScreen() {
    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    BOTÃO "PERMITIR"
    Em desenvolvimento, segue o fluxo mockado.
    Em produção, segue para a tela que dispara a permissão.
    ========================================================
    */
    function handleAllow() {
        /*
        =====================================
        MODO DESENVOLVIMENTO
        =====================================
        */
        if (DEV_SIMULATE_PERMISSION) {
            console.log("Permissão simulada (DEV)");
            navigation.navigate("Phone", {
                fromLogin: false,
            });
            return;
        }

        /*
        =====================================
        MODO PRODUÇÃO
        =====================================
        Usa permissões compatíveis com o fluxo atual
        =====================================
        */
        const locationPermission: PermissionType = ANDROID_PERMISSIONS.LOCATION;

        if (!locationPermission) return;

        navigation.navigate("PermissionBackdrop", {
            permissionToRequest: locationPermission,
        });
    }

    /*
    ========================================================
    BOTÃO "NÃO PERMITIR E SAIR"
    Retorna para a tela inicial do fluxo
    ========================================================
    */
    function handleDenyAndExit() {
        navigation.navigate("Start");
    }

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
                    BOTÃO DE VOLTAR
                ======================================================== */}
                <BackButton />

                {/* ========================================================
                    CABEÇALHO
                ======================================================== */}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.badge,
                            {
                                color: colors.primary,
                                backgroundColor: isDark
                                    ? colors.card
                                    : colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        Permissões do aplicativo
                    </Text>

                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Para uma melhor experiência
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: colors.textSecondary,
                            },
                        ]}
                    >
                        A Zun precisa de algumas permissões para funcionar
                        corretamente no seu dispositivo.
                    </Text>
                </View>

                {/* ========================================================
                    LISTA DE PERMISSÕES
                ======================================================== */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {permissions.map((item, index) => (
                        <PermissionItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            isDark={isDark}
                        />
                    ))}
                </ScrollView>

                {/* ========================================================
                    BOTÕES FIXOS
                ======================================================== */}
                <View
                    style={[
                        styles.buttonsContainer,
                        {
                            backgroundColor: colors.background,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <View style={styles.buttonPrimary}>
                        <ButtonPrimary
                            title="Permitir"
                            onPress={handleAllow}
                            isDark={isDark}
                        />
                    </View>

                    <ButtonSecondary
                        title="Não permitir e sair"
                        onPress={handleDenyAndExit}
                        isDark={isDark}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

/*
========================================================
COMPONENTE ITEM DE PERMISSÃO
Exibe cada permissão com ícone, título e descrição
========================================================
*/
function PermissionItem({
    icon,
    title,
    description,
    isDark,
}: PermissionItemProps & { isDark: boolean }) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.permissionCard,
                {
                    backgroundColor: isDark ? colors.card : colors.surface,
                    borderColor: colors.divider,
                },
            ]}
        >
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: isDark
                            ? colors.inputBackground
                            : colors.background,
                    },
                ]}
            >
                <Icon name={icon} size={24} color={colors.primary} />
            </View>

            <View style={styles.permissionTextContainer}>
                <Text
                    style={[
                        styles.permissionTitle,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {title}
                </Text>

                <Text
                    style={[
                        styles.permissionDescription,
                        {
                            color: colors.textSecondary,
                        },
                    ]}
                >
                    {description}
                </Text>
            </View>
        </View>
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
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 10,
    },

    badge: {
        alignSelf: "flex-start",
        fontSize: 13,
        fontWeight: "600",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        marginBottom: 18,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 34,
        marginBottom: 10,
        maxWidth: 320,
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        maxWidth: 340,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 24,
        gap: 14,
    },

    permissionCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        marginRight: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    permissionTextContainer: {
        flex: 1,
    },

    permissionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },

    permissionDescription: {
        fontSize: 14,
        lineHeight: 21,
    },

    buttonsContainer: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 20,
        borderTopWidth: 1,
    },

    buttonPrimary: {
        marginBottom: 14,
    },
});

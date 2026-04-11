/*
========================================================
TELA DE PERMISSÕES

OBJETIVO:
- Explicar ao usuário quais permissões o app precisa
- Mostrar de forma clara e amigável o motivo de cada uma
- Seguir um layout mais limpo, inspirado na estrutura
  visual da 99, com foco em leitura e confiança

COMPATIBILIDADE:
- Web: permissões gerenciadas pelo navegador
- Android: permissões gerenciadas pelo fluxo do app
- iOS: permissões gerenciadas pelo fluxo do app

OBSERVAÇÃO:
- Ainda estamos em fase de desenvolvimento com dados mockados
- O fluxo foi mantido preparado para futura integração real
- Ao tocar em "Permitir", o app deve abrir o backdrop da Zun
  para simular o fundo desfocado antes do popup do sistema
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

/*
========================================================
COMPONENTE PRINCIPAL
========================================================
*/
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

    REGRA DO FLUXO:
    - NÃO deve pular para Phone
    - Deve abrir primeiro a tela/backdrop da Zun
    - O popup do sistema será disparado por cima desse fundo
    ========================================================
    */
    function handleAllow() {
        /*
        =====================================
        PERMISSÃO DE LOCALIZAÇÃO
        Esta é a primeira permissão do fluxo
        após a tela 03.
        =====================================
        */
        const locationPermission: PermissionType = ANDROID_PERMISSIONS.LOCATION;

        if (!locationPermission) return;

        /*
        =====================================
        ABRE O BACKDROP DA ZUN
        Essa navegação representa a tela 04:
        fundo azul desfocado da Zun + popup
        do sistema em primeiro plano.
        =====================================
        */
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
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Política de Privacidade{"\n"}A Zun Motorista precisa das
                        seguintes permissões:
                    </Text>
                </View>

                {/* ========================================================
                    LISTA DE PERMISSÕES
                ======================================================== */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
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
        <View style={styles.permissionItem}>
            <View style={styles.iconContainer}>
                <Icon
                    name={icon}
                    size={22}
                    color={isDark ? colors.subtext : "#6F6F6F"}
                />
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
                            color: colors.subtext,
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
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 2,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 27,
        maxWidth: 340,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
    },

    permissionItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 18,
    },

    iconContainer: {
        width: 24,
        alignItems: "center",
        marginRight: 8,
        paddingTop: 2,
    },

    permissionTextContainer: {
        flex: 1,
    },

    permissionTitle: {
        fontSize: 15,
        fontWeight: "700",
        lineHeight: 20,
        marginBottom: 2,
    },

    permissionDescription: {
        fontSize: 13,
        lineHeight: 18,
    },

    buttonsContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        borderTopWidth: 1,
    },

    buttonPrimary: {
        marginBottom: 10,
    },
});

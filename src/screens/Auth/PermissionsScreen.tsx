/*
========================================================
TELA DE PERMISSÕES
Explica ao usuário quais permissões o app precisa e por quê.

COMPATIBILIDADE:
- Web: Permissões são gerenciadas pelo navegador
- Android: Permissões são gerenciadas pelo expo-permissions
- iOS: Permissões são gerenciadas pelo expo-permissions

NÃO USA react-native-permissions (evita conflitos no Android)
========================================================
*/
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { permissions } from "../../constants/permissions";

/*
========================================================
CONFIGURAÇÃO DE DESENVOLVIMENTO
Defina como false para testar permissões reais
========================================================
*/
const DEV_SIMULATE_PERMISSION = true;

/*
========================================================
TIPOS DE PERMISSÃO (Compatível com Web e Android)
Usamos strings simples em vez do pacote react-native-permissions
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
TIPAGEM DE NAVEGAÇÃO
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
    ==========================================
    BOTÃO PERMITIR
    ==========================================
    Agora apenas navega para a tela de fundo
    onde o popup será chamado
    */
    function handleAllow() {
        /*
        =====================================
        MODO DESENVOLVIMENTO
        =====================================
        */
        if (DEV_SIMULATE_PERMISSION) {
            console.log("Permissão simulada (DEV)");
            navigation.navigate("Phone");
            return;
        }

        /*
        =====================================
        MODO PRODUÇÃO
        =====================================
        Usa permissões compatíveis com Expo (não react-native-permissions)
        =====================================
        */

        // Tipo simples (string) em vez de PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        const locationPermission: PermissionType = ANDROID_PERMISSIONS.LOCATION;

        if (!locationPermission) return;

        navigation.navigate("PermissionBackdrop", {
            permissionToRequest: locationPermission,
        });
    }

    /*
    Caso o usuário não aceite
    volta para tela inicial
    */
    function handleDenyAndExit() {
        navigation.navigate("Start");
    }

    return (
        <View style={styles.container}>
            {/* CABEÇALHO FIXO */}
            <View style={styles.header}>
                <Text style={styles.title}>Política de Privacidade</Text>

                <Text style={styles.subtitle}>
                    A Zun Motorista precisa das seguintes permissões:
                </Text>
            </View>

            {/* LISTA DE PERMISSÕES */}
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
                    />
                ))}
            </ScrollView>

            {/* BOTÕES FIXOS */}
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonPrimary}>
                    <ButtonPrimary title="Permitir" onPress={handleAllow} />
                </View>

                <ButtonSecondary
                    title="Não permitir e sair"
                    onPress={handleDenyAndExit}
                />
            </View>
        </View>
    );
}

/*
========================================================
COMPONENTE ITEM DE PERMISSÃO
Exibe cada permissão com ícone, título e descrição
========================================================
*/
function PermissionItem({ icon, title, description }: PermissionItemProps) {
    return (
        <View style={styles.permissionItem}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color="#687076" />
            </View>

            <View style={styles.permissionTextContainer}>
                <Text style={styles.permissionTitle}>{title}</Text>

                <Text style={styles.permissionDescription}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0B0B0B",
    },

    subtitle: {
        fontSize: 16,
        color: "#687076",
        marginTop: 8,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 30,
    },

    permissionItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 25,
    },

    iconContainer: {
        width: 40,
        height: 40,
        marginRight: 16,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    permissionTextContainer: {
        flex: 1,
    },

    permissionTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#333",
    },

    permissionDescription: {
        fontSize: 15,
        color: "#687076",
        marginTop: 4,
        lineHeight: 22,
    },

    buttonsContainer: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#ffffff",
    },

    buttonPrimary: {
        marginBottom: 14,
    },
});
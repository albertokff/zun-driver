/*
========================================
PERMISSION BACKDROP SCREEN

Tela educativa antes de abrir
a permissão do sistema.

Padrão usado por:
Uber
99
iFood

Fluxo:

PermissionsScreen
      ↓
PermissionBackdropScreen
      ↓
Popup do sistema
      ↓
BatteryPermissionScreen
      ↓
PhoneScreen
========================================
*/

import React from "react";
import {
    StatusBar,
    Alert,
    useColorScheme,
    Platform,
    View,
    Text,
    StyleSheet,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";

/*
HOOK CENTRALIZADO DE PERMISSÕES
Evita duplicação de código
*/
import { useSystemPermissions } from "../../hooks/useSystemPermissions";

import AppBackdrop from "../../components/AppBackdrop";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

/*
TIPAGEM DE NAVEGAÇÃO
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PermissionBackdrop"
>;

type ScreenRouteProp = RouteProp<RootStackParamList, "PermissionBackdrop">;

/*
========================================
MODO DE DESENVOLVIMENTO
========================================
true = simula permissão
false = usa permissão real
*/
const DEV_SIMULATE_PERMISSION = true;

export default function PermissionBackdropScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();

    /*
    Permissão recebida da tela anterior
    (Android ou iOS)
    */
    const { permissionToRequest } = route.params;

    /*
    Hook centralizado de permissões
    */
    const { requestLocation } = useSystemPermissions();

    /*
    Tema do sistema (claro / escuro)
    */
    const colorScheme = useColorScheme() || "light";
    const backgroundColor = colorScheme === "dark" ? "#000" : "#ffffff";
    const barStyle = colorScheme === "dark" ? "light-content" : "dark-content";

    /*
    ========================================
    FUNÇÃO PARA PEDIR PERMISSÃO
    ========================================
    */
    const askPermission = async () => {
        try {
            /*
            ========================================
            MODO SIMULADO (DEV / WEB)
            ========================================
            */
            if (DEV_SIMULATE_PERMISSION || Platform.OS === "web") {
                Alert.alert(
                    "Permitir acesso à localização?",
                    "Zun Motorista precisa acessar sua localização para calcular corridas e rotas.",
                    [
                        {
                            text: "Negar",
                            style: "cancel",
                            onPress: () => navigation.goBack(),
                        },
                        {
                            text: "Permitir",
                            onPress: () =>
                                navigation.replace("BatteryPermission", {
                                    nextScreen: "Phone",
                                }),
                        },
                    ],
                );

                return;
            }

            /*
            ========================================
            PERMISSÃO REAL DO SISTEMA
            ========================================
            */
            const result = await requestLocation(permissionToRequest);

            /*
            ========================================
            RESULTADOS POSSÍVEIS
            ========================================
            */

            if (result === "granted") {
                /*
                Permissão aceita
                segue fluxo normal
                */
                navigation.replace("BatteryPermission", {
                    nextScreen: "Phone",
                });

                return;
            }

            if (result === "denied") {
                /*
                Usuário negou
                */
                Alert.alert(
                    "Permissão necessária",
                    "Para continuar precisamos da sua localização.",
                );

                return;
            }

            if (result === "blocked") {
                /*
                Usuário bloqueou permanentemente
                */
                Alert.alert(
                    "Permissão bloqueada",
                    "Ative a localização nas configurações do celular.",
                );

                return;
            }

            /*
            Caso não seja suportado
            */
            Alert.alert("Erro", "Permissão indisponível no dispositivo.");
        } catch (error) {
            Alert.alert("Erro", "Erro ao solicitar permissão.");
        }
    };

    return (
        <>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />

            <AppBackdrop>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Permitir acesso à localização
                    </Text>

                    <Text style={styles.description}>
                        Precisamos da sua localização para calcular rotas,
                        estimar corridas e melhorar a segurança da plataforma.
                    </Text>

                    <View style={styles.button}>
                        <ButtonPrimary
                            title="Permitir"
                            onPress={askPermission}
                        />
                    </View>

                    <View style={styles.button}>
                        <ButtonSecondary
                            title="Não permitir"
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </View>
            </AppBackdrop>
        </>
    );
}

/*
========================================
ESTILOS
========================================
*/

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "100%",
        maxWidth: 360,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#687076",
        marginBottom: 30,
        lineHeight: 22,
    },

    button: {
        marginBottom: 12,
    },
});

import React from "react";
import { StatusBar, Alert, useColorScheme, Platform } from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { request, RESULTS } from "react-native-permissions";

import { RootStackParamList } from "../../navigation/RootNavigator";
import AppBackdrop from "../../components/AppBackdrop";

/*
TIPAGEM DE NAVEGAÇÃO
Define para qual tela podemos navegar
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PermissionBackdrop"
>;

/*
TIPAGEM DA ROTA
Define os parâmetros recebidos da tela anterior
*/
type ScreenRouteProp = RouteProp<RootStackParamList, "PermissionBackdrop">;

/*
==========================================
MODO DE DESENVOLVIMENTO

Quando TRUE:
Simula popup de permissão (para Web ou PC)

Quando FALSE:
Usa popup real do Android / iOS
==========================================
*/
const DEV_SIMULATE_PERMISSION = true;

export default function PermissionBackdropScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();

    /*
    Recebe a permissão enviada pela tela anterior
    */
    const { permissionToRequest } = route.params;

    const colorScheme = useColorScheme() || "light";

    const backgroundColor = colorScheme === "dark" ? "#000" : "#ffffff";
    const barStyle = colorScheme === "dark" ? "light-content" : "dark-content";

    /*
    ==========================================
    ASSIM QUE A TELA ABRE
    DISPARA O POPUP NATIVO DE PERMISSÃO
    ==========================================
    */
    React.useEffect(() => {
        const askPermission = async () => {
            try {
                /*
                ==========================================
                MODO SIMULADO (DESENVOLVIMENTO WEB)
                ==========================================
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
                                onPress: () => {
                                    navigation.replace("Phone");
                                },
                            },
                        ],
                    );

                    return;
                }

                /*
                ==========================================
                POPUP REAL DO DISPOSITIVO
                ==========================================
                */
                const result = await request(permissionToRequest);

                if (result === RESULTS.GRANTED) {
                    /*
                    Se usuário aceitou a permissão
                    segue para próxima tela
                    */
                    navigation.replace("Phone");
                } else {
                    /*
                    Caso o usuário negue a permissão
                    */
                    Alert.alert(
                        "Permissão necessária",
                        "Para continuar usando o aplicativo precisamos da permissão de localização.",
                        [
                            {
                                text: "OK",
                                onPress: () => navigation.goBack(),
                            },
                        ],
                    );
                }
            } catch (error) {
                Alert.alert(
                    "Erro",
                    "Ocorreu um erro ao solicitar a permissão.",
                );
                navigation.goBack();
            }
        };

        /*
        Pequeno delay para garantir que
        a tela carregou antes do popup aparecer
        */
        const timer = setTimeout(askPermission, 300);

        return () => clearTimeout(timer);
    }, [navigation, permissionToRequest]);

    return (
        <>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />

            {/* 
            BACKDROP reutilizável do app
            Contém o fundo e a logo centralizada
            */}
            <AppBackdrop />
        </>
    );
}

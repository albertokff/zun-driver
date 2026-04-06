/*
========================================================
HOOK: useSystemPermissions

Gerencia permissões do sistema de forma compatível com:
- Web (Chrome/Navegador)
- Android (Nativo)
- iOS (Nativo)

SOLUÇÃO COMPATÍVEL COM NODE 18 + EXPO SDK 52:
- Usa expo-image-picker para câmera/galeria
- Usa expo-location para localização
- Mantém compatibilidade com o fluxo atual do app
- Preparado para evolução do fluxo de permissões
========================================================
*/

import { useState, useCallback } from "react";
import { Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

/*
========================================================
TIPOS DE PERMISSÃO SUPORTADOS
========================================================
*/
export type PermissionType = "camera" | "media-library" | "location";

/*
========================================================
STATUS PADRONIZADO DE PERMISSÃO
- granted: concedida
- denied: negada
- blocked: bloqueada / sem novo pedido
- unavailable: indisponível
========================================================
*/
export type PermissionRequestResult =
    | "granted"
    | "denied"
    | "blocked"
    | "unavailable";

interface PermissionStatus {
    granted: boolean; // Se a permissão foi concedida
    canAskAgain: boolean; // Se pode solicitar novamente
    status: PermissionRequestResult; // Status padronizado
}

/*
========================================================
ESTADO PADRÃO DAS PERMISSÕES
========================================================
*/
const initialPermissionsState: Record<PermissionType, PermissionStatus> = {
    camera: {
        granted: false,
        canAskAgain: true,
        status: "denied",
    },
    "media-library": {
        granted: false,
        canAskAgain: true,
        status: "denied",
    },
    location: {
        granted: false,
        canAskAgain: true,
        status: "denied",
    },
};

/*
========================================================
HOOK PRINCIPAL
Retorna funções para gerenciar permissões
========================================================
*/
export function useSystemPermissions() {
    const [permissions, setPermissions] = useState(initialPermissionsState);

    /*
    ================================================
    FUNÇÃO AUXILIAR
    NORMALIZA O RESULTADO DAS PERMISSÕES
    ================================================
    */
    const normalizePermissionResult = (
        granted: boolean,
        canAskAgain: boolean,
    ): PermissionRequestResult => {
        if (granted) return "granted";
        if (!granted && !canAskAgain) return "blocked";
        return "denied";
    };

    /*
    ================================================
    ATUALIZA O ESTADO LOCAL DA PERMISSÃO
    ================================================
    */
    const updatePermissionState = useCallback(
        (
            type: PermissionType,
            granted: boolean,
            canAskAgain: boolean,
            status: PermissionRequestResult,
        ) => {
            setPermissions((prev) => ({
                ...prev,
                [type]: {
                    granted,
                    canAskAgain,
                    status,
                },
            }));
        },
        [],
    );

    /*
    ================================================
    CONSULTAR STATUS DA PERMISSÃO
    Sem disparar novo popup do sistema
    ================================================
    */
    const getPermissionStatus = useCallback(
        async (type: PermissionType): Promise<PermissionRequestResult> => {
            try {
                /*
                ============================================
                WEB
                No navegador, assumimos disponibilidade.
                A interação real ocorre no momento do uso.
                ============================================
                */
                if (Platform.OS === "web") {
                    updatePermissionState(type, true, true, "granted");
                    return "granted";
                }

                let granted = false;
                let canAskAgain = true;

                if (type === "camera") {
                    const result =
                        await ImagePicker.getCameraPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                } else if (type === "media-library") {
                    const result =
                        await ImagePicker.getMediaLibraryPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                } else if (type === "location") {
                    const result =
                        await Location.getForegroundPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                }

                const status = normalizePermissionResult(
                    granted,
                    canAskAgain,
                );

                updatePermissionState(type, granted, canAskAgain, status);

                return status;
            } catch (error) {
                console.error(
                    `[Erro] Falha ao consultar permissão ${type}:`,
                    error,
                );

                updatePermissionState(type, false, false, "unavailable");
                return "unavailable";
            }
        },
        [updatePermissionState],
    );

    /*
    ================================================
    SOLICITAR PERMISSÃO
    Funciona diferente em Web e Android/iOS:
    - Web: navegador gerencia a permissão
    - Android/iOS: solicita permissão nativa
    ================================================
    */
    const requestPermission = useCallback(
        async (type: PermissionType): Promise<PermissionRequestResult> => {
            try {
                /*
                ============================================
                WEB
                Navegadores modernos gerenciam permissões
                no momento da interação real.
                ============================================
                */
                if (Platform.OS === "web") {
                    console.log(
                        `[Web] Permissão ${type} - Gerenciada pelo navegador`,
                    );

                    updatePermissionState(type, true, true, "granted");
                    return "granted";
                }

                let granted = false;
                let canAskAgain = true;

                /*
                ============================================
                ANDROID / iOS
                ============================================
                */
                if (type === "camera") {
                    console.log("[Nativo] Solicitando permissão de câmera...");
                    const result =
                        await ImagePicker.requestCameraPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                } else if (type === "media-library") {
                    console.log("[Nativo] Solicitando permissão de galeria...");
                    const result =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                } else if (type === "location") {
                    console.log(
                        "[Nativo] Solicitando permissão de localização...",
                    );
                    const result =
                        await Location.requestForegroundPermissionsAsync();
                    granted = result.granted;
                    canAskAgain = result.canAskAgain ?? true;
                }

                const status = normalizePermissionResult(
                    granted,
                    canAskAgain,
                );

                console.log(`[Nativo] Permissão ${type}: ${status}`);

                updatePermissionState(type, granted, canAskAgain, status);

                return status;
            } catch (error) {
                console.error(
                    `[Erro] Falha ao solicitar permissão ${type}:`,
                    error,
                );

                updatePermissionState(type, false, false, "unavailable");
                return "unavailable";
            }
        },
        [updatePermissionState],
    );

    /*
    ================================================
    FUNÇÕES ESPECÍFICAS POR PERMISSÃO
    Facilitam uso nas telas e deixam o fluxo mais legível
    ================================================
    */
    const requestCamera = useCallback(
        async () => requestPermission("camera"),
        [requestPermission],
    );

    const requestMediaLibrary = useCallback(
        async () => requestPermission("media-library"),
        [requestPermission],
    );

    const requestLocation = useCallback(
        async () => requestPermission("location"),
        [requestPermission],
    );

    const getCameraStatus = useCallback(
        async () => getPermissionStatus("camera"),
        [getPermissionStatus],
    );

    const getMediaLibraryStatus = useCallback(
        async () => getPermissionStatus("media-library"),
        [getPermissionStatus],
    );

    const getLocationStatus = useCallback(
        async () => getPermissionStatus("location"),
        [getPermissionStatus],
    );

    /*
    ================================================
    ABRIR CONFIGURAÇÕES DO APP
    Permite ao usuário gerenciar permissões manualmente
    Disponível apenas em Android/iOS
    ================================================
    */
    const openSettings = useCallback(async () => {
        try {
            if (Platform.OS !== "web") {
                console.log("[Nativo] Abrindo configurações do app...");
                await Linking.openSettings();
            } else {
                console.log("[Web] openSettings não disponível");
            }
        } catch (error) {
            console.error("[Erro] Falha ao abrir configurações:", error);
        }
    }, []);

    return {
        permissions,

        // Consulta de status
        getPermissionStatus,
        getCameraStatus,
        getMediaLibraryStatus,
        getLocationStatus,

        // Solicitação de permissão
        requestPermission,
        requestCamera,
        requestMediaLibrary,
        requestLocation,

        // Utilitário
        openSettings,
    };
}
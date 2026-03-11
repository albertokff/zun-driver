/*
========================================
HOOK: useSystemPermissions

Centraliza todas as permissões do app.

Benefícios:
✔ evita código duplicado
✔ facilita manutenção
✔ facilita testes
✔ padrão usado em apps grandes
========================================
*/

import { Platform } from "react-native";
import {
    request,
    requestNotifications,
    RESULTS,
    Permission,
} from "react-native-permissions";

/*
========================================
TIPO DE RESULTADO PADRÃO
========================================
*/

export type PermissionResult =
    | "granted"
    | "denied"
    | "blocked"
    | "unavailable";

/*
========================================
HOOK PRINCIPAL
========================================
*/

export function useSystemPermissions() {
    /*
    ========================================
    PERMISSÃO DE LOCALIZAÇÃO
    ========================================
    */
    const requestLocation = async (
        permission: Permission,
    ): Promise<PermissionResult> => {
        try {
            const result = await request(permission);

            switch (result) {
                case RESULTS.GRANTED:
                    return "granted";

                case RESULTS.DENIED:
                    return "denied";

                case RESULTS.BLOCKED:
                    return "blocked";

                default:
                    return "unavailable";
            }
        } catch (error) {
            console.log("Erro ao pedir localização", error);
            return "unavailable";
        }
    };

    /*
    ========================================
    PERMISSÃO DE NOTIFICAÇÃO
    ========================================
    */

    const requestPushNotifications =
        async (): Promise<PermissionResult> => {
            try {
                const { status } = await requestNotifications([
                    "alert",
                    "sound",
                ]);

                if (status === "granted") return "granted";
                if (status === "blocked") return "blocked";

                return "denied";
            } catch (error) {
                console.log("Erro notificações", error);
                return "unavailable";
            }
        };

    /*
    ========================================
    PERMISSÃO DE OTIMIZAÇÃO DE BATERIA
    ========================================
    */

    const requestBatteryOptimization =
        async (): Promise<PermissionResult> => {
            try {
                if (Platform.OS !== "android") {
                    return "unavailable";
                }

                /*
                Aqui normalmente usaríamos
                uma lib nativa específica.

                Exemplo:
                react-native-disable-battery-optimizations
                */

                return "granted";
            } catch (error) {
                console.log("Erro bateria", error);
                return "unavailable";
            }
        };

    /*
    ========================================
    RETORNO DO HOOK
    ========================================
    */

    return {
        requestLocation,
        requestPushNotifications,
        requestBatteryOptimization,
    };
}
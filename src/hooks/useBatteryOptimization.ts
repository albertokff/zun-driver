/*
========================================================
HOOK: useBatteryOptimization

OBJETIVO:
- Abrir a tela de configurações de otimização de bateria
- Detectar quando o app volta para o primeiro plano
- Verificar se a otimização de bateria foi desativada
- Seguir o fluxo correto após a ação do usuário

COMPORTAMENTO:
- Se a otimização estiver desativada, executa onSuccess
- Se continuar ativada, executa onDeny (se informado)
- Em caso de erro, tenta fallback para Linking.openSettings()
========================================================
*/

import { useState, useEffect, useCallback, useRef } from "react";
import { AppState, AppStateStatus, Linking } from "react-native";
import {
    isBatteryOptimizationEnabled,
    requestBatteryOptimizationSettings,
} from "react-native-battery-optimization-check";

export const useBatteryOptimization = (
    onSuccess: () => void,
    onDeny?: () => void,
) => {
    /*
    ========================================================
    ESTADO DO APP
    Controla quando o app vai para background e volta
    ========================================================
    */
    const [appState, setAppState] = useState<AppStateStatus>(
        AppState.currentState,
    );

    /*
    ========================================================
    CONTROLE DE MONTAGEM
    Evita executar callbacks após desmontar o componente
    ========================================================
    */
    const isMountedRef = useRef(true);

    /*
    ========================================================
    VERIFICAR STATUS DA OTIMIZAÇÃO E SEGUIR FLUXO
    ========================================================
    */
    const checkStatusAndProceed = useCallback(async () => {
        try {
            const isEnabled = await isBatteryOptimizationEnabled();

            /*
            ====================================================
            REGRA DE NEGÓCIO
            - isEnabled = true  → otimização ainda está ativa
            - isEnabled = false → usuário desativou, pode seguir
            ====================================================
            */
            if (!isMountedRef.current) return;

            if (!isEnabled) {
                onSuccess();
            } else if (onDeny) {
                onDeny();
            }
        } catch (error) {
            console.error(
                "Erro ao verificar otimização de bateria:",
                error,
            );

            if (!isMountedRef.current) return;

            if (onDeny) {
                onDeny();
            }
        }
    }, [onSuccess, onDeny]);

    /*
    ========================================================
    OUVINTE DE MUDANÇA DE ESTADO DO APP
    Quando o app volta do background para ativo,
    verifica novamente o status da otimização.
    ========================================================
    */
    useEffect(() => {
        isMountedRef.current = true;

        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                const wasInBackground =
                    appState === "inactive" || appState === "background";

                if (wasInBackground && nextAppState === "active") {
                    console.log(
                        "App voltou para o primeiro plano, verificando otimização de bateria...",
                    );

                    /*
                    ============================================
                    Pequeno delay para dar tempo do sistema aplicar
                    a mudança antes da verificação.
                    ============================================
                    */
                    setTimeout(() => {
                        if (isMountedRef.current) {
                            checkStatusAndProceed();
                        }
                    }, 500);
                }

                setAppState(nextAppState);
            },
        );

        return () => {
            isMountedRef.current = false;
            subscription.remove();
        };
    }, [appState, checkStatusAndProceed]);

    /*
    ========================================================
    SOLICITAR PERMISSÃO / ABRIR CONFIGURAÇÃO
    ========================================================
    */
    const requestPermission = async () => {
        try {
            /*
            ============================================
            Abre a tela específica de otimização de bateria
            ============================================
            */
            await requestBatteryOptimizationSettings();
        } catch (error) {
            console.error(
                "Erro ao solicitar configurações de otimização:",
                error,
            );

            /*
            ============================================
            FALLBACK
            Se a tela específica falhar, abre as
            configurações gerais do app.
            ============================================
            */
            try {
                await Linking.openSettings();
            } catch (fallbackError) {
                console.error(
                    "Erro ao abrir configurações do app:",
                    fallbackError,
                );

                if (onDeny) {
                    onDeny();
                }
            }
        }
    };

    return { requestPermission };
};
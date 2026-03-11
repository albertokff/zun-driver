import { useState, useEffect, useCallback } from 'react';
import { AppState, Linking } from 'react-native';
import {
    isBatteryOptimizationEnabled,
    requestBatteryOptimizationSettings,
} from 'react-native-battery-optimization-check';

export const useBatteryOptimization = (
    onSuccess: () => void,
    onDeny?: () => void
) => {
    const [appState, setAppState] = useState(AppState.currentState);

    const checkStatusAndProceed = useCallback(async () => {
        try {
            const isEnabled = await isBatteryOptimizationEnabled();
            if (!isEnabled) {
                onSuccess();
            } else {
                if (onDeny) onDeny();
            }
        } catch (error) {
            console.error('Erro ao verificar otimização de bateria:', error);
            if (onDeny) onDeny();
        }
    }, [onSuccess, onDeny]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App voltou para o primeiro plano, verificando permissão...');
                setTimeout(checkStatusAndProceed, 500);
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState, checkStatusAndProceed]);

    const requestPermission = async () => {
        try {
            // Abre a tela de configurações de otimização de bateria do sistema
            await requestBatteryOptimizationSettings(); // <-- Função da nova biblioteca
        } catch (error) {
            console.error('Erro ao solicitar configurações de otimização:', error);
            // Fallback para abrir as configurações gerais do app
            Linking.openSettings();
        }
    };

    return { requestPermission };
};
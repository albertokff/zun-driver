/*
========================================================
HOOK: useSystemPermissions
Gerencia permissões do sistema de forma compatível com:
- Web (Chrome/Navegador)
- Android (Nativo)
- iOS (Nativo)

SOLUÇÃO COMPATÍVEL COM NODE 18 + EXPO SDK 52:
- Usa expo-image-picker para câmera/galeria (já instalado)
- Usa expo-location apenas para localização
- Sem manipulação manual de tipos PermissionResponse
========================================================
*/
import { useState, useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/*
========================================================
TIPOS DE PERMISSÃO SUPORTADOS
========================================================
*/
export type PermissionType = 'camera' | 'media-library' | 'location';

interface PermissionStatus {
    granted: boolean; // Se a permissão foi concedida
    canAskAgain: boolean; // Se pode solicitar novamente
}

/*
========================================================
HOOK PRINCIPAL
Retorna funções para gerenciar permissões
========================================================
*/
export function useSystemPermissions() {
    const [permissions, setPermissions] = useState<Record<PermissionType, PermissionStatus>>({
        camera: { granted: false, canAskAgain: true },
        'media-library': { granted: false, canAskAgain: true },
        location: { granted: false, canAskAgain: true },
    });

    /*
    ================================================
    SOLICITAR PERMISSÃO
    Funciona diferente em Web e Android:
    - Web: Retorna true automaticamente (navegador gerencia)
    - Android: Solicita permissão nativa
    ================================================
    */
    const requestPermission = useCallback(async (type: PermissionType): Promise<boolean> => {
        try {
            /*
            ================================================
            PLATAFORMA WEB
            Navegadores modernos gerenciam permissões automaticamente
            quando o usuário interage com câmera/galeria
            ================================================
            */
            if (Platform.OS === 'web') {
                console.log(`[Web] Permissão ${type} - Gerenciada pelo navegador`);
                setPermissions(prev => ({
                    ...prev,
                    [type]: { granted: true, canAskAgain: true },
                }));
                return true;
            }

            /*
            ================================================
            PLATAFORMA ANDROID/iOS
            Usa expo-image-picker para câmera e galeria
            (compatível com Node 18 + SDK 52)
            ================================================
            */
            let granted = false;
            let canAskAgain = true;

            if (type === 'camera') {
                console.log('[Android] Solicitando permissão de câmera...');
                const result = await ImagePicker.requestCameraPermissionsAsync();
                granted = result.granted;
                canAskAgain = result.canAskAgain ?? true;

            } else if (type === 'media-library') {
                console.log('[Android] Solicitando permissão de galeria...');
                const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
                granted = result.granted;
                canAskAgain = result.canAskAgain ?? true;

            } else if (type === 'location') {
                console.log('[Android] Solicitando permissão de localização...');
                const result = await Location.requestForegroundPermissionsAsync();
                granted = result.granted;
                canAskAgain = result.canAskAgain ?? true;
            }

            console.log(`[Android] Permissão ${type}: ${granted ? 'Concedida' : 'Negada'}`);

            setPermissions(prev => ({
                ...prev,
                [type]: {
                    granted,
                    canAskAgain,
                },
            }));

            return granted;
        } catch (error) {
            console.error(`[Erro] Falha ao solicitar permissão ${type}:`, error);
            return false;
        }
    }, []);

    /*
    ================================================
    ABRIR CONFIGURAÇÕES DO APP
    Permite ao usuário gerenciar permissões manualmente
    Disponível apenas em Android/iOS (Web não suporta)
    ================================================
    */
    const openSettings = useCallback(async () => {
        if (Platform.OS !== 'web') {
            console.log('[Android] Abrindo configurações do app...');
            await Linking.openSettings();
        } else {
            console.log('[Web] openSettings não disponível');
        }
    }, []);

    return {
        permissions,
        requestPermission,
        openSettings,
    };
}
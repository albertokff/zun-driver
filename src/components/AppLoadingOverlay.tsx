/*
========================================================
COMPONENTE: APP LOADING OVERLAY

OBJETIVO:
- Exibir um loading reutilizável em tela cheia
- Manter consistência visual com a identidade da Zun
- Ser usado em fluxos de:
  - upload de documentos
  - abertura de câmera
  - processamento
  - validação
  - envio de dados

RECURSOS:
- Overlay escuro translúcido
- Card central
- Indicador de atividade
- Percentual opcional
- Texto customizável
- Compatível com Light / Dark Mode
========================================================
*/

import React from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";

/*
========================================================
TIPAGEM DAS PROPS
========================================================
*/
interface AppLoadingOverlayProps {
    /*
    ================================================
    CONTROLA SE O LOADING ESTÁ VISÍVEL
    ================================================
    */
    visible: boolean;

    /*
    ================================================
    TEXTO EXIBIDO ABAIXO DO CÍRCULO
    Exemplo:
    - "Carregando..."
    - "Enviando documento..."
    - "Processando foto..."
    ================================================
    */
    message?: string;

    /*
    ================================================
    PERCENTUAL OPCIONAL
    Exemplo:
    - "76%"
    - "48%"
    Se não for enviado, não aparece no centro
    ================================================
    */
    percentage?: string;

    /*
    ================================================
    PERMITE FECHAR OU NÃO O MODAL PELO BOTÃO VOLTAR
    No geral, para loading, deixamos false.
    ================================================
    */
    closable?: boolean;

    /*
    ================================================
    CALLBACK OPCIONAL AO FECHAR
    ================================================
    */
    onRequestClose?: () => void;
}

/*
========================================================
COMPONENTE PRINCIPAL
========================================================
*/
export default function AppLoadingOverlay({
    visible,
    message = "Carregando...",
    percentage,
    closable = false,
    onRequestClose,
}: AppLoadingOverlayProps) {
    const { colors, isDark } = useTheme();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.overlay}>
                {/* ====================================================
                    CARD CENTRAL
                ==================================================== */}
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: isDark
                                ? colors.card
                                : colors.surface,
                        },
                    ]}
                >
                    {/* ================================================
                        CÍRCULO VISUAL DO LOADING
                    ================================================ */}
                    <View
                        style={[
                            styles.circle,
                            {
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />

                        {/* ============================================
                            PERCENTUAL OPCIONAL
                        ============================================ */}
                        {percentage ? (
                            <Text
                                style={[
                                    styles.percentage,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                {percentage}
                            </Text>
                        ) : null}
                    </View>

                    {/* ================================================
                        TEXTO DO LOADING
                    ================================================ */}
                    <Text
                        style={[
                            styles.message,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        {message}
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    /*
    ========================================================
    OVERLAY
    ========================================================
    */
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.42)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    /*
    ========================================================
    CARD CENTRAL
    ========================================================
    */
    card: {
        width: 240,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    CÍRCULO VISUAL
    ========================================================
    */
    circle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },

    /*
    ========================================================
    PERCENTUAL
    ========================================================
    */
    percentage: {
        position: "absolute",
        fontSize: 34,
        fontWeight: "300",
    },

    /*
    ========================================================
    TEXTO ABAIXO
    ========================================================
    */
    message: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
});

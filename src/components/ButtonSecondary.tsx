/*
========================================================
COMPONENTE: ButtonSecondary

OBJETIVO:
- Botão secundário do app
- Usado para ações alternativas (ex: sair, voltar, cancelar)
- Mantém consistência visual com o ButtonPrimary

SUPORTE:
- Light / Dark mode
- Tema centralizado
========================================================
*/

import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props {
    title: string;
    onPress: () => void;
    isDark?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function ButtonSecondary({
    title,
    onPress,
    isDark = false,
    disabled = false,
    style,
    textStyle,
}: Props) {
    /*
    ========================================================
    TEMA GLOBAL
    ========================================================
    */
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    borderColor: colors.primary,
                    backgroundColor: isDark ? colors.card : colors.surface,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.85}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: colors.primary,
                    },
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 52,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
    },

    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});

import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import { lightColors, darkColors } from "../themes/colors";

interface Props {
    title: string;
    onPress: () => void;
    isDark?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function ButtonPrimary({
    title,
    onPress,
    isDark = false,
    disabled = false,
    style,
    textStyle,
}: Props) {
    const palette = isDark ? darkColors : lightColors;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: palette.primary,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.85}
        >
            <Text style={[styles.text, { color: palette.white }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});

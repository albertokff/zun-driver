import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { lightColors, darkColors } from "../themes/colors";

interface FormTextInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    isDark: boolean;
}

export default function FormTextInput({
    label,
    value,
    onChangeText,
    isDark,
    ...props
}: FormTextInputProps) {
    const palette = isDark ? darkColors : lightColors;

    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value?.length > 0;

    return (
        <View style={styles.inputContainer}>
            {/* Label flutuante */}
            {(hasValue || isFocused) && (
                <Text
                    style={[
                        styles.label,
                        {
                            color: isFocused
                                ? palette.primary
                                : palette.subtext,
                            backgroundColor: palette.surface,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: palette.inputBackground,
                        borderColor: isFocused
                            ? palette.primary
                            : palette.border,
                        color: palette.text,
                    },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={!isFocused ? label : ""}
                placeholderTextColor={palette.placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        paddingHorizontal: 20,
        position: "relative",
    },

    label: {
        fontSize: 12,
        position: "absolute",
        top: -8,
        left: 30,
        zIndex: 1,
        paddingHorizontal: 6,
    },

    input: {
        borderWidth: 1,
        borderRadius: 14,
        height: 56,
        fontSize: 16,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
});

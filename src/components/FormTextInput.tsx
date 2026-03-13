import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface FormTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    isDark: boolean;
    [key: string]: any;
}

export default function FormTextInput({
    label,
    value,
    onChangeText,
    isDark,
    ...props
}: FormTextInputProps) {
    return (
        <View style={styles.inputContainer}>
            {value ? (
                <Text style={[styles.label, isDark && styles.labelDark]}>
                    {label}
                </Text>
            ) : null}
            <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                placeholderTextColor={isDark ? "#555" : "#AAA"}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
        paddingHorizontal: 20,
        position: "relative",
    },
    label: {
        color: "#888",
        fontSize: 12,
        position: "absolute",
        top: -8,
        left: 30,
        zIndex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 4,
    },
    labelDark: {
        color: "#777",
        backgroundColor: "#1C1C1E",
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        height: 58,
        fontSize: 16,
        paddingHorizontal: 15,
        color: "#222",
        justifyContent: "center",
    },
    inputDark: {
        backgroundColor: "#1C1C1E",
        borderColor: "#444",
        color: "#FFF",
    },
});

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    title: string;
    onPress: () => void;
}

export default function ButtonSecondary({ title, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderColor: "#1E6BE3",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: "center",
    },

    text: {
        color: "#1E6BE3",
        fontSize: 18,
        fontWeight: "600",
    },
});

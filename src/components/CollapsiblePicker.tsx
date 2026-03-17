import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Habilita animação no Android
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsiblePickerProps {
    label: string;
    options: string[];
    selectedValue: string | null; // Correção: aceita null também
    onSelect: (value: string) => void;
    isDark: boolean;
}

export default function CollapsiblePicker({
    label,
    options,
    selectedValue,
    onSelect,
    isDark,
}: CollapsiblePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        toggleOpen();
    };

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity
                onPress={toggleOpen}
                style={[
                    styles.input,
                    isDark && styles.inputDark,
                    styles.touchableInput,
                ]}
            >
                {selectedValue ? (
                    <Text style={[styles.label, isDark && styles.labelDark]}>
                        {label}
                    </Text>
                ) : null}
                <Text
                    style={[
                        styles.touchableInputText,
                        isDark && styles.touchableInputTextDark,
                        !selectedValue && styles.placeholderText,
                        !selectedValue && isDark && styles.placeholderTextDark,
                    ]}
                >
                    {selectedValue || label}
                </Text>
                <View
                    style={{
                        transform: [{ rotate: isOpen ? "90deg" : "0deg" }],
                    }}
                >
                    <Text style={[styles.arrow, isDark && styles.arrowDark]}>
                        ›
                    </Text>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View
                    style={[
                        styles.optionsContainer,
                        isDark && styles.optionsContainerDark,
                    ]}
                >
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{ maxHeight: 200 }}
                    >
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSelect(option)}
                                style={styles.optionItem}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isDark && styles.optionTextDark,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
        paddingHorizontal: 20,
        position: "relative",
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
    touchableInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    touchableInputText: {
        fontSize: 16,
        color: "#222",
    },
    touchableInputTextDark: {
        color: "#FFF",
    },
    placeholderText: {
        color: "#AAA",
    },
    placeholderTextDark: {
        color: "#555",
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
    arrow: {
        fontSize: 24,
        color: "#888",
    },
    arrowDark: {
        color: "#777",
    },
    optionsContainer: {
        marginTop: -8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#FFF",
        overflow: "hidden",
    },
    optionsContainerDark: {
        borderColor: "#444",
        backgroundColor: "#1C1C1E",
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    optionItemDark: {
        borderTopColor: "#2C2C2E",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    optionTextDark: {
        color: "#FFF",
    },
});

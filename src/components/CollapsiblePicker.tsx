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
import { lightColors, darkColors } from "../themes/colors";

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
    selectedValue: string | null;
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
    const palette = isDark ? darkColors : lightColors;
    const hasValue = !!selectedValue;

    const toggleOpen = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen((prevState) => !prevState);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(false);
    };

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity
                onPress={toggleOpen}
                activeOpacity={0.85}
                style={[
                    styles.input,
                    styles.touchableInput,
                    {
                        backgroundColor: palette.inputBackground,
                        borderColor: isOpen ? palette.primary : palette.border,
                        borderBottomLeftRadius: isOpen ? 0 : 14,
                        borderBottomRightRadius: isOpen ? 0 : 14,
                    },
                ]}
            >
                {hasValue ? (
                    <Text
                        style={[
                            styles.label,
                            {
                                color: isOpen
                                    ? palette.primary
                                    : palette.subtext,
                                backgroundColor: palette.surface,
                            },
                        ]}
                    >
                        {label}
                    </Text>
                ) : null}

                <Text
                    style={[
                        styles.touchableInputText,
                        {
                            color: hasValue
                                ? palette.text
                                : palette.placeholder,
                        },
                    ]}
                    numberOfLines={1}
                >
                    {selectedValue || label}
                </Text>

                <View
                    style={{
                        transform: [{ rotate: isOpen ? "90deg" : "0deg" }],
                    }}
                >
                    <Text
                        style={[
                            styles.arrow,
                            {
                                color: isOpen
                                    ? palette.primary
                                    : palette.textMuted,
                            },
                        ]}
                    >
                        ›
                    </Text>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View
                    style={[
                        styles.optionsContainer,
                        {
                            borderColor: palette.border,
                            backgroundColor: palette.card,
                        },
                    ]}
                >
                    <ScrollView
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                        style={styles.optionsScroll}
                    >
                        {options.map((option) => {
                            const isSelected = selectedValue === option;

                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => handleSelect(option)}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.optionItem,
                                        {
                                            borderTopColor: palette.divider,
                                            backgroundColor: isSelected
                                                ? palette.primaryLight
                                                : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            {
                                                color: isSelected
                                                    ? palette.primaryDark
                                                    : palette.text,
                                            },
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        paddingHorizontal: 20,
        position: "relative",
    },

    input: {
        borderWidth: 1,
        borderRadius: 14,
        minHeight: 56,
        paddingHorizontal: 16,
        justifyContent: "center",
    },

    touchableInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    touchableInputText: {
        flex: 1,
        fontSize: 16,
        marginRight: 12,
    },

    label: {
        fontSize: 12,
        position: "absolute",
        top: -8,
        left: 30,
        zIndex: 1,
        paddingHorizontal: 6,
    },

    arrow: {
        fontSize: 24,
        fontWeight: "400",
    },

    optionsContainer: {
        marginTop: -2,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        overflow: "hidden",
    },

    optionsScroll: {
        maxHeight: 220,
    },

    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderTopWidth: 1,
    },

    optionText: {
        fontSize: 16,
    },
});

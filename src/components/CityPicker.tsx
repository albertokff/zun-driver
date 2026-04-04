/*
========================================================
COMPONENTE: CityPicker
Seletor de cidades filtradas por estado com busca.
========================================================
*/
import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightColors, darkColors } from "../themes/colors";

interface CityPickerProps {
    label: string;
    cities: string[];
    selectedCity: string | null;
    onSelect: (city: string) => void;
    isDark: boolean;
    placeholder?: string;
}

export default function CityPicker({
    label,
    cities,
    selectedCity,
    onSelect,
    isDark,
    placeholder = "Selecione uma cidade",
}: CityPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const palette = isDark ? darkColors : lightColors;

    // Filtra cidades conforme busca do usuário
    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return cities;

        return cities.filter((city) =>
            city.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [cities, searchQuery]);

    const toggleOpen = () => {
        setIsOpen((prevState) => !prevState);

        if (!isOpen) {
            setSearchQuery("");
        }
    };

    const handleSelect = (city: string) => {
        onSelect(city);
        setIsOpen(false);
        setSearchQuery("");
    };

    const hasValue = !!selectedCity;

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
                    {selectedCity || placeholder}
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
                    {/* Barra de busca */}
                    <View
                        style={[
                            styles.searchBar,
                            {
                                borderBottomColor: palette.divider,
                                backgroundColor: palette.inputBackground,
                            },
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color={palette.textMuted}
                        />

                        <TextInput
                            style={[
                                styles.searchInput,
                                {
                                    color: palette.text,
                                },
                            ]}
                            placeholder="Buscar cidade..."
                            placeholderTextColor={palette.placeholder}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="words"
                        />
                    </View>

                    <ScrollView
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                        style={styles.optionsScroll}
                    >
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city) => {
                                const isSelected = selectedCity === city;

                                return (
                                    <TouchableOpacity
                                        key={city}
                                        onPress={() => handleSelect(city)}
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
                                                    fontWeight: isSelected
                                                        ? "600"
                                                        : "400",
                                                },
                                            ]}
                                        >
                                            {city}
                                        </Text>

                                        {isSelected && (
                                            <Ionicons
                                                name="checkmark"
                                                size={20}
                                                color={palette.primary}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <View style={styles.emptyState}>
                                <Text
                                    style={[
                                        styles.emptyStateText,
                                        {
                                            color: palette.textSecondary,
                                        },
                                    ]}
                                >
                                    Nenhuma cidade encontrada
                                </Text>
                            </View>
                        )}
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

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },

    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        paddingVertical: 4,
    },

    optionsScroll: {
        maxHeight: 220,
    },

    optionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
    },

    optionText: {
        fontSize: 16,
    },

    emptyState: {
        padding: 20,
        alignItems: "center",
    },

    emptyStateText: {
        fontSize: 14,
    },
});

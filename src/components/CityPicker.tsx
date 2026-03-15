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
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

    // Filtra cidades conforme busca do usuário
    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return cities;
        return cities.filter((city) =>
            city.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [cities, searchQuery]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setSearchQuery(""); // Limpa busca ao abrir
    };

    const handleSelect = (city: string) => {
        onSelect(city);
        setIsOpen(false);
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
                {selectedCity ? (
                    <Text style={[styles.label, isDark && styles.labelDark]}>
                        {label}
                    </Text>
                ) : null}
                <Text
                    style={[
                        styles.touchableInputText,
                        isDark && styles.touchableInputTextDark,
                        !selectedCity && styles.placeholderText,
                        !selectedCity && isDark && styles.placeholderTextDark,
                    ]}
                >
                    {selectedCity || placeholder}
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
                    {/* Barra de busca */}
                    <View
                        style={[
                            styles.searchBar,
                            isDark && styles.searchBarDark,
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color={isDark ? "#AAA" : "#888"}
                        />
                        <TextInput
                            style={[
                                styles.searchInput,
                                { color: isDark ? "#FFF" : "#222" },
                            ]}
                            placeholder="Buscar cidade..."
                            placeholderTextColor={isDark ? "#555" : "#AAA"}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="words"
                        />
                    </View>

                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{ maxHeight: 200 }}
                    >
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                                <TouchableOpacity
                                    key={city}
                                    onPress={() => handleSelect(city)}
                                    style={[
                                        styles.optionItem,
                                        isDark && styles.optionItemDark,
                                        selectedCity === city &&
                                            styles.optionItemSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            isDark && styles.optionTextDark,
                                            selectedCity === city &&
                                                styles.optionTextSelected,
                                        ]}
                                    >
                                        {city}
                                    </Text>
                                    {selectedCity === city && (
                                        <Ionicons
                                            name="checkmark"
                                            size={20}
                                            color="#1E6BE3"
                                        />
                                    )}
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Text
                                    style={[
                                        styles.emptyStateText,
                                        isDark && styles.emptyStateTextDark,
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
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    searchBarDark: {
        borderBottomColor: "#2C2C2E",
        backgroundColor: "#252527",
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        paddingVertical: 4,
    },
    optionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    optionItemDark: {
        borderTopColor: "#2C2C2E",
    },
    optionItemSelected: {
        backgroundColor: "#E8F4FF",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    optionTextDark: {
        color: "#FFF",
    },
    optionTextSelected: {
        color: "#1E6BE3",
        fontWeight: "500",
    },
    emptyState: {
        padding: 20,
        alignItems: "center",
    },
    emptyStateText: {
        color: "#888",
        fontSize: 14,
    },
    emptyStateTextDark: {
        color: "#AAA",
    },
});

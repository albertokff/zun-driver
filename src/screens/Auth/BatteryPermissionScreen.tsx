import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../context/ThemeContext";
// CORREÇÃO: Importando diretamente do arquivo de cores
import { lightColors, darkColors } from "../../themes/colors";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { useBatteryOptimization } from "../../hooks/useBatteryOptimization";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ScreenRouteProp = RouteProp<RootStackParamList, "BatteryPermission">;

export const BatteryPermissionScreen = () => {
    const { t } = useTranslation();
    const { theme: themeName } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRouteProp>();
    const { nextScreen } = route.params;

    // CORREÇÃO: Usando os nomes corretos importados
    const colors = themeName === "dark" ? darkColors : lightColors;

    const handleSuccess = () => {
        // @ts-ignore
        navigation.replace(nextScreen);
    };

    const handleDeny = () => {
        navigation.goBack();
    };

    const { requestPermission } = useBatteryOptimization(
        handleSuccess,
        handleDeny,
    );

    return (
        <View style={styles.backdrop}>
            <View
                style={[
                    styles.modalContainer,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text style={[styles.title, { color: colors.text }]}>
                    {t("permissions.batteryOptimization.title")}
                </Text>
                <Text
                    style={[
                        styles.description,
                        { color: colors.subtext || colors.subtext }, // Adicionado fallback
                    ]}
                >
                    {t("permissions.batteryOptimization.description")}
                </Text>
                <View style={styles.buttonContainer}>
                    <ButtonPrimary
                        title={t("permissions.batteryOptimization.allow")}
                        onPress={requestPermission}
                    />
                    <ButtonSecondary
                        title={t("permissions.batteryOptimization.deny")}
                        onPress={handleDeny}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "90%",
        maxWidth: 400,
        borderRadius: 28,
        padding: 24,
        alignItems: "stretch",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "left",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: "left",
        marginBottom: 24,
        lineHeight: 22,
    },
    buttonContainer: {
        width: "100%",
        gap: 12,
    },
});

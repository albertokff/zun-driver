import React, { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useTheme } from "../../context/ThemeContext";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();

    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.9)).current;

    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace("Start");
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View
            style={[styles.container, theme === "dark" && styles.containerDark]}
        >
            <Animated.Image
                source={logo}
                style={[
                    styles.logo,
                    {
                        opacity,
                        transform: [{ scale }],
                    },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    containerDark: {
        backgroundColor: "#0B0B0B",
    },

    logo: {
        width: 200,
        height: 200,
    },
});

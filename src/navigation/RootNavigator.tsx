import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Permission } from "react-native-permissions";
import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PrivacyPolicyScreen from "../screens/Auth/PrivacyPolicyScreen";
import PermissionsScreen from "../screens/Auth/PermissionsScreen";
import PasswordScreen from "@/screens/Auth/Register/PasswordScreen";
import { BatteryPermissionScreen } from "@/screens/Auth/BatteryPermissionScreen"; // Importe a nova tela
import PermissionBackdropScreen from "@/screens/Auth/PermissionBackdropScreen";

export type RootStackParamList = {
    // Telas normais
    Splash: undefined;
    Start: undefined;
    Phone: undefined;
    Password: undefined;
    Otp: { phone: string };
    PrivacyPolicy: undefined;
    Permissions: undefined;
    // Telas Modais
    BatteryPermission: { nextScreen: keyof RootStackParamList }; // <<-- ALTERAÇÃO AQUI
    PermissionBackdrop: {
        permissionToRequest: Permission;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Grupo para telas de fluxo principal */}
            <Stack.Group>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                />
                <Stack.Screen
                    name="Permissions"
                    component={PermissionsScreen}
                />
                <Stack.Screen name="Phone" component={PhoneScreen} />
                <Stack.Screen name="Otp" component={OtpScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />
            </Stack.Group>

            {/* Grupo para telas modais que aparecem por cima */}
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                <Stack.Screen
                    name="BatteryPermission"
                    component={BatteryPermissionScreen}
                />
                {/* A tela PermissionBackdrop também deveria estar aqui se for para ser um modal */}

                <Stack.Screen
                    name="PermissionBackdrop"
                    component={PermissionBackdropScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

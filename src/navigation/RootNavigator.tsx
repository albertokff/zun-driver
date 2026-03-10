import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Permission } from "react-native-permissions";

import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PrivacyPolicyScreen from "../screens/Auth/PrivacyPolicyScreen";
import PermissionsScreen from "../screens/Auth/PermissionsScreen";
import PermissionBackdropScreen from "../screens/Auth/PermissionBackdropScreen";

export type RootStackParamList = {
    Splash: undefined;
    Start: undefined;
    Phone: undefined;
    Otp: { phone: string };
    PrivacyPolicy: undefined;
    Permissions: undefined;

    /*
    NOVA TELA PARA BACKDROP DE PERMISSÃO
    */
    PermissionBackdrop: {
        permissionToRequest: Permission;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
            />
            <Stack.Screen name="Permissions" component={PermissionsScreen} />
            <Stack.Screen
                name="PermissionBackdrop"
                component={PermissionBackdropScreen}
            />
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
        </Stack.Navigator>
    );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PasswordScreen from "@/screens/Auth/Register/PasswordScreen";

export type RootStackParamList = {
    Splash: undefined;
    Start: undefined;
    Phone: undefined;
    Password: undefined;
    Otp: { phone: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="Password" component={PasswordScreen} />
        </Stack.Navigator>
    );
}

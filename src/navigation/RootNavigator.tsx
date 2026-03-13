import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ✅ Correção: Tipo simples para funcionar em Web e Android
// Comentado o import do pacote que pode não estar instalado
// import { Permission } from "react-native-permissions";
type Permission = string;

// Telas existentes
import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PrivacyPolicyScreen from "../screens/Auth/PrivacyPolicyScreen";
import PermissionsScreen from "../screens/Auth/PermissionsScreen";
import PasswordScreen from "../screens/Auth/Register/PasswordScreen";
// ✅ Named import para BatteryPermissionScreen
import { BatteryPermissionScreen } from "../screens/Auth/BatteryPermissionScreen";
import PermissionBackdropScreen from "../screens/Auth/PermissionBackdropScreen";

// Telas novas do fluxo de cadastro
import DriverCategoryScreen from "../screens/Auth/Register/DriverCategoryScreen";
import DriverInfoScreen from "../screens/Auth/Register/DriverInfoScreen";
import ConfirmInfoScreen from "../screens/Auth/Register/ConfirmInfoScreen";
import DocumentationScreen from "../screens/Auth/Register/DocumentationScreen";
import UploadDocumentScreen from "../screens/Auth/Register/UploadDocumentScreen";
import DocumentRequirementsScreen from "../screens/Auth/Register/DocumentRequirementsScreen";
import DocumentGuidelinesScreen from "../screens/Auth/Register/DocumentGuidelinesScreen";
import VehicleDocumentInfoScreen from "../screens/Auth/Register/VehicleDocumentInfoScreen";

// Tipagem correta e completa do Stack Navigator
export type RootStackParamList = {
    // Telas normais
    Splash: undefined;
    Start: undefined;
    Phone: undefined;
    Password: undefined;
    Otp: { phone: string };
    PrivacyPolicy: undefined;
    Permissions: undefined;

    // Novas telas do fluxo de cadastro do motorista
    DriverCategory: undefined;
    DriverInfo: undefined;
    ConfirmInfo: {
        firstName: string;
        cpf: string;
        gender: string;
        state: string;
        city: string;
    };
    Documentation: undefined;
    UploadDocument: {
        documentId: string;
        documentTitle: string;
    };
    DocumentRequirements: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
    };
    DocumentGuidelines: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
        imageUri?: string;
    };
    VehicleDocumentInfo: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
        imageUri?: string;
    };

    // Telas Modais
    BatteryPermission: { nextScreen: keyof RootStackParamList };
    PermissionBackdrop: {
        permissionToRequest: Permission; // ✅ Agora é string, não do pacote externo
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

                {/* Telas do fluxo de cadastro do motorista */}
                <Stack.Screen
                    name="DriverCategory"
                    component={DriverCategoryScreen}
                />
                <Stack.Screen name="DriverInfo" component={DriverInfoScreen} />
                <Stack.Screen
                    name="ConfirmInfo"
                    component={ConfirmInfoScreen}
                />
                <Stack.Screen
                    name="Documentation"
                    component={DocumentationScreen}
                />
                {/* ✅ UploadDocument aparece apenas UMA vez */}
                <Stack.Screen
                    name="UploadDocument"
                    component={UploadDocumentScreen}
                />
                <Stack.Screen
                    name="DocumentRequirements"
                    component={DocumentRequirementsScreen}
                />
                <Stack.Screen
                    name="DocumentGuidelines"
                    component={DocumentGuidelinesScreen}
                />
                <Stack.Screen
                    name="VehicleDocumentInfo"
                    component={VehicleDocumentInfoScreen}
                />
            </Stack.Group>

            {/* Grupo para telas modais que aparecem por cima */}
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                <Stack.Screen
                    name="BatteryPermission"
                    component={BatteryPermissionScreen}
                />
                <Stack.Screen
                    name="PermissionBackdrop"
                    component={PermissionBackdropScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

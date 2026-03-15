/*
========================================================
ROOT NAVIGATOR - Navegação Principal do App
Configura todas as rotas do aplicativo Zun Driver.
Funciona tanto na Web quanto no Android.
========================================================
*/
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/*
========================================================
TIPO DE PERMISSÃO
Usamos um tipo simples (string) para funcionar em ambas plataformas:
- Web: Permissões são gerenciadas pelo navegador
- Android: Permissões são gerenciadas pelo expo-permissions
========================================================
*/
// import { Permission } from "react-native-permissions"; // ❌ Removido - causa erro no Android
type Permission = "camera" | "media-library" | "location" | string; // ✅ Tipo compatível

/*
========================================================
IMPORTAÇÃO DAS TELAS EXISTENTES
Telas do fluxo inicial de autenticação
========================================================
*/
import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PrivacyPolicyScreen from "../screens/Auth/PrivacyPolicyScreen";
import PermissionsScreen from "../screens/Auth/PermissionsScreen";
import PasswordScreen from "../screens/Auth/Register/PasswordScreen";

// ✅ Named import para BatteryPermissionScreen (export named)
import { BatteryPermissionScreen } from "../screens/Auth/BatteryPermissionScreen";
import PermissionBackdropScreen from "../screens/Auth/PermissionBackdropScreen";

/*
========================================================
IMPORTAÇÃO DAS TELAS DO FLUXO DE CADASTRO
Novas telas adicionadas para cadastro de motoristas
========================================================
*/
import DriverCategoryScreen from "../screens/Auth/Register/DriverCategoryScreen";
import DriverInfoScreen from "../screens/Auth/Register/DriverInfoScreen";
import ConfirmInfoScreen from "../screens/Auth/Register/ConfirmInfoScreen";
import DocumentationScreen from "../screens/Auth/Register/DocumentationScreen";
import UploadDocumentScreen from "../screens/Auth/Register/UploadDocumentScreen";
import DocumentRequirementsScreen from "../screens/Auth/Register/DocumentRequirementsScreen";
import DocumentGuidelinesScreen from "../screens/Auth/Register/DocumentGuidelinesScreen";
import VehicleDocumentInfoScreen from "../screens/Auth/Register/VehicleDocumentInfoScreen";

/*
========================================================
TIPO DE PARÂMETROS DAS ROTAS (ROOT STACK)
Define os parâmetros que cada tela pode receber.
Isso garante type-safety na navegação.
========================================================
*/
export type RootStackParamList = {
    /*
    ================================================
    TELAS NORMAIS (Fluxo Principal)
    ================================================
    */
    Splash: undefined;
    Start: undefined;
    Phone: undefined;
    Password: undefined;
    Otp: { phone: string }; // Recebe número de telefone
    PrivacyPolicy: undefined;
    Permissions: undefined;

    /*
    ================================================
    NOVAS TELAS DO FLUXO DE CADASTRO DO MOTORISTA
    ================================================
    */
    DriverCategory: undefined; // Seleção da categoria (entregador/moto/carro)
    DriverInfo: undefined; // Informações pessoais do motorista
    ConfirmInfo: {
        firstName: string;
        cpf: string;
        gender: string;
        state: string;
        city: string;
    };
    Documentation: undefined; // Lista de documentos obrigatórios
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
        imageUri?: string; // URI da imagem selecionada (opcional)
    };
    VehicleDocumentInfo: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
        imageUri?: string; // URI da imagem selecionada (opcional)
    };

    /*
    ================================================
    TELAS MODAIS (Aparecem por cima das outras)
    presentation: "transparentModal"
    ================================================
    */
    BatteryPermission: {
        nextScreen: keyof RootStackParamList; // Próxima tela após permissão
    };
    PermissionBackdrop: {
        permissionToRequest: Permission; // Tipo de permissão a solicitar
    };
};

/*
========================================================
CONFIGURAÇÃO DO STACK NAVIGATOR
Cria o navegador com todas as rotas configuradas
========================================================
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* 
            ================================================
            GRUPO 1: TELAS DE FLUXO PRINCIPAL
            Navegação normal (tela cheia)
            ================================================
            */}
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

            {/* 
            ================================================
            GRUPO 2: TELAS MODAIS
            presentation: "transparentModal" - aparecem transparentes por cima
            ================================================
            */}
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

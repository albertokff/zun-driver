/*
========================================================
ROOT NAVIGATOR - NAVEGAÇÃO PRINCIPAL DO APP

OBJETIVO:
- Centralizar todas as rotas do aplicativo Zun Driver
- Organizar o fluxo de forma coerente com a experiência
  visual inspirada em apps como a 99
- Garantir tipagem segura entre as telas

COMPATIBILIDADE:
- Web
- Android
- Fluxo preparado para evolução futura
========================================================
*/

import { createNativeStackNavigator } from "@react-navigation/native-stack";

/*
========================================================
TIPO DE PERMISSÃO
Usamos um tipo simples (string) para funcionar em ambas
as plataformas sem depender de libs problemáticas.
========================================================
*/
type Permission = "camera" | "media-library" | "location" | string;

/*
========================================================
IMPORTAÇÃO DAS TELAS DO FLUXO INICIAL
========================================================
*/
import SplashScreen from "../screens/Auth/SplashScreen";
import StartScreen from "../screens/Auth/StartScreen";
import PrivacyPolicyScreen from "../screens/Auth/PrivacyPolicyScreen";
import PermissionsScreen from "../screens/Auth/PermissionsScreen";
import PermissionBackdropScreen from "../screens/Auth/PermissionBackdropScreen";

// Named import para BatteryPermissionScreen
import { BatteryPermissionScreen } from "../screens/Auth/BatteryPermissionScreen";

/*
========================================================
IMPORTAÇÃO DAS TELAS DE LOGIN / CADASTRO INICIAL
========================================================
*/
import PhoneScreen from "../screens/Auth/Register/PhoneScreen";
import OtpScreen from "../screens/Auth/Register/OtpScreen";
import PasswordScreen from "../screens/Auth/Register/PasswordScreen";

/*
========================================================
IMPORTAÇÃO DAS TELAS DO FLUXO DE CADASTRO DO MOTORISTA
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
import CNHInfoScreen from "../screens/Auth/Register/CNHInfoScreen";
import PhotoTipsScreen from "../screens/Auth/Register/PhotoTipsScreen";
import CameraCaptureScreen from "../screens/Auth/Register/CameraCaptureScreen";
import OptimizationScreen from "../screens/Auth/Register/OptimizationScreen";
import OptimizationCompleteScreen from "../screens/Auth/Register/OptimizationCompleteScreen";
import AnalysisInProgressScreen from "../screens/Auth/Register/AnalysisInProgressScreen";

/*
========================================================
IMPORTAÇÃO DAS TELAS DO FLUXO PÓS-ENTRADA / APOIO
========================================================
*/
import AssistantPermissionScreen from "../screens/Auth/AssistantPermissionScreen";
import LocationPermissionScreen from "../screens/Auth/LocationPermissionScreen";
import HomeScreen from "../screens/Main/HomeScreen";

/*
========================================================
TIPO DE PARÂMETROS DAS ROTAS (ROOT STACK)

REGRAS:
- Toda tela sem parâmetros usa undefined
- Toda tela com parâmetros usa objeto
- Nunca usar primitivo direto como parâmetro de rota
========================================================
*/
export type RootStackParamList = {
    /*
    ================================================
    FLUXO INICIAL DE ENTRADA
    ================================================
    */
    Splash: undefined;
    Start: undefined;
    PrivacyPolicy: undefined;
    Permissions: undefined;

    /*
    ================================================
    MODAIS / BACKDROPS DE PERMISSÃO
    ================================================
    */
    PermissionBackdrop: {
        permissionToRequest: Permission;
    };
    BatteryPermission: {
        nextScreen: keyof RootStackParamList;
    };

    /*
    ================================================
    LOGIN / CADASTRO INICIAL
    ================================================
    */
    Phone: {
        fromLogin?: boolean;
    };
    Otp: {
        phone: string;
        fromLogin?: boolean;
    };
    Password: undefined;

    /*
    ================================================
    CADASTRO DO MOTORISTA
    ================================================
    */
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

    CNHInfo: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
        imageUri?: string;
    };

    PhotoTips: {
        documentId: string;
        documentTitle: string;
        documentType: "physical" | "digital";
        imageUri?: string;
    };

    CameraCapture: {
        documentId: string;
        documentTitle: string;
        imageUri?: string;
    };

    Optimization: {
        documentId: string;
        documentTitle: string;
        imageUri: string;
    };

    OptimizationComplete: {
        documentId: string;
        documentTitle: string;
        imageUri: string;
    };

    AnalysisInProgress: undefined;

    /*
    ================================================
    TELAS DE APOIO / ENTRADA NO APP
    ================================================
    */
    AssistantPermission: undefined;
    LocationPermission: undefined;
    Home: undefined;
};

/*
========================================================
CONFIGURAÇÃO DO STACK NAVIGATOR
========================================================
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/*
            ================================================
            GRUPO 1: FLUXO PRINCIPAL
            Essas telas seguem a ordem natural da experiência
            do usuário desde a abertura até o cadastro.
            ================================================
            */}
            <Stack.Group>
                {/* Abertura do app */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Start" component={StartScreen} />

                {/* Aceite inicial e permissões */}
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                />
                <Stack.Screen
                    name="Permissions"
                    component={PermissionsScreen}
                />

                {/* Entrada do usuário */}
                <Stack.Screen name="Phone" component={PhoneScreen} />
                <Stack.Screen name="Otp" component={OtpScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />

                {/* Cadastro do motorista */}
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
                <Stack.Screen name="CNHInfo" component={CNHInfoScreen} />
                <Stack.Screen name="PhotoTips" component={PhotoTipsScreen} />
                <Stack.Screen
                    name="CameraCapture"
                    component={CameraCaptureScreen}
                />
                <Stack.Screen
                    name="Optimization"
                    component={OptimizationScreen}
                />
                <Stack.Screen
                    name="OptimizationComplete"
                    component={OptimizationCompleteScreen}
                />
                <Stack.Screen
                    name="AnalysisInProgress"
                    component={AnalysisInProgressScreen}
                />

                {/* Telas de apoio / entrada no app */}
                <Stack.Screen
                    name="AssistantPermission"
                    component={AssistantPermissionScreen}
                />
                <Stack.Screen
                    name="LocationPermission"
                    component={LocationPermissionScreen}
                />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Group>

            {/*
            ================================================
            GRUPO 2: MODAIS / BACKDROPS
            Essas telas aparecem por cima das outras e fazem
            parte do efeito visual de permissão e instrução.
            ================================================
            */}
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                <Stack.Screen
                    name="PermissionBackdrop"
                    component={PermissionBackdropScreen}
                />
                <Stack.Screen
                    name="BatteryPermission"
                    component={BatteryPermissionScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

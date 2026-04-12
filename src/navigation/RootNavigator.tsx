/*
========================================================
ROOT NAVIGATOR - NAVEGAÇÃO PRINCIPAL DO APP

OBJETIVO:
- Centralizar todas as rotas do aplicativo Zun Driver
- Organizar o fluxo de forma coerente com a experiência
  visual inspirada na 99, com identidade Zun
- Garantir tipagem segura entre as telas
- Deixar clara a ordem oficial do fluxo para a equipe

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
import LocationPermissionScreen from "../screens/Auth/LocationPermissionScreen";

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
IMPORTAÇÃO DAS TELAS DE APOIO / FUTURAS
IMPORTANTE:
- Essas telas ficam cadastradas no navigator
- Mas não entram no bloco validado 00 → 16
  até serem oficialmente conectadas ao fluxo
========================================================
*/
import AssistantPermissionScreen from "../screens/Auth/AssistantPermissionScreen";
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
    BLOCO 00 → 03
    FLUXO INICIAL VALIDADO
    ================================================
    */
    Splash: undefined;
    Start: undefined;
    PrivacyPolicy: undefined;
    Permissions: undefined;

    /*
    ================================================
    BLOCO 04 → 09
    PERMISSÕES / BACKDROPS / MODAIS
    ================================================
    */
    PermissionBackdrop: {
        permissionToRequest: Permission;
    };
    LocationPermission: undefined;
    BatteryPermission: {
        nextScreen: keyof RootStackParamList;
    };

    /*
    ================================================
    BLOCO 012 → 016
    CADASTRO INICIAL / MOTORISTA
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

    DriverCategory: undefined;
    DriverInfo: undefined;
    ConfirmInfo: {
        firstName: string;
        cpf: string;
        gender: string;
        state: string;
        city: string;
    };

    /*
    ================================================
    BLOCO DE DOCUMENTOS
    ETAPAS POSTERIORES DO CADASTRO
    ================================================
    */
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
    TELAS DE APOIO / FUTURAS
    Não fazem parte do bloco oficial validado agora
    ================================================
    */
    AssistantPermission: undefined;
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
            GRUPO 1: FLUXO PRINCIPAL VALIDADO

            ORDEM CONCEITUAL APROVADA ATÉ AGORA:
            00 Splash
            01 Start
            02 PrivacyPolicy
            03 Permissions
            04 PermissionBackdrop
            05 LocationPermission
            06 Sistema Android
            07 Popup chamadas
            08 Popup notificações
            09 BatteryPermission
            010/011 volta para Start
            012 Phone
            013 Otp
            014 DriverCategory
            015 DriverInfo
            016 ConfirmInfo
            ================================================
            */}
            <Stack.Group>
                {/* 00 */}
                <Stack.Screen name="Splash" component={SplashScreen} />

                {/* 01 / 011 */}
                <Stack.Screen name="Start" component={StartScreen} />

                {/* 02 */}
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                />

                {/* 03 */}
                <Stack.Screen
                    name="Permissions"
                    component={PermissionsScreen}
                />

                {/* 05 */}
                <Stack.Screen
                    name="LocationPermission"
                    component={LocationPermissionScreen}
                />

                {/* 012 */}
                <Stack.Screen name="Phone" component={PhoneScreen} />

                {/* 013 */}
                <Stack.Screen name="Otp" component={OtpScreen} />

                {/*
                ============================================
                IMPORTANTE:
                Password permanece registrada porque já existe
                no projeto, mas sua posição final no fluxo ainda
                pode ser revista depois, conforme a validação
                completa das telas restantes.
                ============================================
                */}
                <Stack.Screen name="Password" component={PasswordScreen} />

                {/* 014 */}
                <Stack.Screen
                    name="DriverCategory"
                    component={DriverCategoryScreen}
                />

                {/* 015 */}
                <Stack.Screen name="DriverInfo" component={DriverInfoScreen} />

                {/* 016 */}
                <Stack.Screen
                    name="ConfirmInfo"
                    component={ConfirmInfoScreen}
                />

                {/*
                ============================================
                BLOCO POSTERIOR DE DOCUMENTOS
                Será refinado depois do fluxo 00 → 16
                ============================================
                */}
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

                {/*
                ============================================
                TELAS DE APOIO / FUTURAS
                Mantidas no navigator, mas fora do bloco
                principal validado no momento
                ============================================
                */}
                <Stack.Screen
                    name="AssistantPermission"
                    component={AssistantPermissionScreen}
                />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Group>

            {/*
            ================================================
            GRUPO 2: MODAIS / BACKDROPS

            Essas telas aparecem por cima do fluxo principal
            e são fundamentais para reproduzir o efeito visual
            das permissões no padrão da 99 com identidade Zun.
            ================================================
            */}
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                {/* 04 */}
                <Stack.Screen
                    name="PermissionBackdrop"
                    component={PermissionBackdropScreen}
                />

                {/* 09 */}
                <Stack.Screen
                    name="BatteryPermission"
                    component={BatteryPermissionScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

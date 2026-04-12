/*
========================================================
TELA INICIAL - START

OBJETIVO:
- Apresentar a marca Zun Motorista
- Direcionar para login ou criação de conta
- Manter consistência visual com a SplashScreen
- Usar os botões no padrão oficial da Zun
- Verificar se o motorista já concluiu a etapa
  inicial de política de privacidade e permissões

REGRA DE FLUXO:
- Se permissionsCompleted = false:
  qualquer botão leva primeiro para PrivacyPolicy
- Se permissionsCompleted = true:
  Entrar → Phone (login)
  Criar minha conta → Phone (cadastro)

RECURSO DEV:
- Toque 5 vezes na logo para abrir o painel oculto
- Permite resetar o estado de permissões concluídas
========================================================
*/

import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";

/*
========================================================
TIPAGEM PARA NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

/*
========================================================
CONFIGURAÇÃO DEV
- true  = mostra o painel oculto ao ativar gesto
- false = desativa totalmente o painel DEV
========================================================
*/
const DEV_TOOLS_ENABLED = true;

/*
========================================================
QUANTIDADE DE TOQUES PARA ABRIR O PAINEL DEV
========================================================
*/
const DEV_TAP_COUNT = 5;

export default function StartScreen() {
    const {
        theme,
        colors,
        isDark,
        permissionsCompleted,
        resetPermissionsCompleted,
    } = useTheme();

    const navigation = useNavigation<NavigationProp>();

    /*
    ========================================================
    LOGO POR TEMA
    ========================================================
    */
    const logo =
        theme === "dark"
            ? require("../../assets/logo/zun-logo-dark.png")
            : require("../../assets/logo/zun-logo-light.png");

    /*
    ========================================================
    ESTADOS DEV
    ========================================================
    */
    const [showDevPanel, setShowDevPanel] = useState(false);
    const logoTapCountRef = useRef(0);

    /*
    ========================================================
    BOTÃO "ENTRAR"

    REGRA:
    - Se o usuário ainda não concluiu permissões,
      precisa passar primeiro por PrivacyPolicy
    - Se já concluiu, segue direto para Phone
      em modo de login
    ========================================================
    */
    const handleLogin = () => {
        if (!permissionsCompleted) {
            navigation.navigate("PrivacyPolicy");
            return;
        }

        navigation.navigate("Phone", {
            fromLogin: true,
        });
    };

    /*
    ========================================================
    BOTÃO "CRIAR MINHA CONTA"

    REGRA:
    - Se o usuário ainda não concluiu permissões,
      precisa passar primeiro por PrivacyPolicy
    - Se já concluiu, segue direto para Phone
      em modo de cadastro
    ========================================================
    */
    const handleCreateAccount = () => {
        if (!permissionsCompleted) {
            navigation.navigate("PrivacyPolicy");
            return;
        }

        navigation.navigate("Phone", {
            fromLogin: false,
        });
    };

    /*
    ========================================================
    GESTO OCULTO PARA PAINEL DEV

    COMO FUNCIONA:
    - Toque várias vezes na logo
    - Ao atingir o limite, abre o painel DEV
    ========================================================
    */
    const handleLogoTap = () => {
        if (!DEV_TOOLS_ENABLED) return;

        logoTapCountRef.current += 1;

        if (logoTapCountRef.current >= DEV_TAP_COUNT) {
            logoTapCountRef.current = 0;
            setShowDevPanel(true);
        }

        /*
        ================================================
        RESET SIMPLES DO CONTADOR
        Se o usuário parar de tocar, o contador zera
        depois de um curto tempo.
        ================================================
        */
        setTimeout(() => {
            logoTapCountRef.current = 0;
        }, 1200);
    };

    /*
    ========================================================
    RESETAR ESTADO DE PERMISSÕES
    Volta o app ao estado de primeiro acesso
    ========================================================
    */
    const handleResetPermissions = async () => {
        await resetPermissionsCompleted();
        setShowDevPanel(false);

        Alert.alert(
            "Modo DEV",
            "O estado de permissões foi resetado. Agora o app volta a se comportar como primeiro acesso.",
        );
    };

    /*
    ========================================================
    FECHAR PAINEL DEV
    ========================================================
    */
    const handleCloseDevPanel = () => {
        setShowDevPanel(false);
    };

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* ========================================================
                STATUS BAR
            ======================================================== */}
            <StatusBar
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colors.background}
            />

            <View style={styles.container}>
                {/* ========================================================
                    BLOCO CENTRAL DE MARCA
                    Ajustado para alinhar visualmente com a SplashScreen
                ======================================================== */}
                <View style={styles.centerContent}>
                    <View style={styles.logoBlock}>
                        {/* ====================================================
                            ÁREA CLICÁVEL DA LOGO
                            Toque múltiplo abre painel DEV oculto
                        ==================================================== */}
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleLogoTap}
                        >
                            <Image
                                source={logo}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <Text
                            style={[
                                styles.brandText,
                                { color: colors.subtext },
                            ]}
                        >
                            Z - Motorista
                        </Text>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Bem-vindo à Zun
                        </Text>

                        <Text
                            style={[styles.subtitle, { color: colors.subtext }]}
                        >
                            Ganhe mais dirigindo com liberdade.
                        </Text>
                    </View>
                </View>

                {/* ========================================================
                    BOTÕES
                ======================================================== */}
                <View style={styles.buttonsContainer}>
                    <ButtonPrimary
                        title="Entrar"
                        onPress={handleLogin}
                        isDark={isDark}
                    />

                    <ButtonSecondary
                        title="Criar minha conta"
                        onPress={handleCreateAccount}
                        isDark={isDark}
                    />

                    <Text
                        style={[styles.footerText, { color: colors.subtext }]}
                    >
                        Ao continuar, você concorda com os termos e a política
                        de privacidade.
                    </Text>
                </View>
            </View>

            {/* ============================================================
                PAINEL DEV OCULTO
                Abre somente via gesto escondido na logo
            ============================================================ */}
            {showDevPanel && (
                <View style={styles.devOverlay}>
                    <View
                        style={[
                            styles.devCard,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.divider,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.devTitle,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Painel DEV
                        </Text>

                        <Text
                            style={[
                                styles.devDescription,
                                {
                                    color: colors.subtext,
                                },
                            ]}
                        >
                            Use estas ações para testar o fluxo do app sem
                            precisar reinstalar ou limpar tudo manualmente.
                        </Text>

                        <Text
                            style={[
                                styles.devStatus,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            permissionsCompleted:{" "}
                            {permissionsCompleted ? "true" : "false"}
                        </Text>

                        <View style={styles.devButtons}>
                            <ButtonPrimary
                                title="Resetar permissões"
                                onPress={handleResetPermissions}
                                isDark={isDark}
                            />

                            <ButtonSecondary
                                title="Fechar"
                                onPress={handleCloseDevPanel}
                                isDark={isDark}
                            />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

/*
========================================================
ESTILOS
========================================================
*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 8,
    },

    centerContent: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 220,
    },

    logoBlock: {
        alignItems: "center",
        width: "100%",
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 6,
    },

    brandText: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.6,
        marginBottom: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
    },

    buttonsContainer: {
        width: "100%",
        gap: 12,
        paddingTop: 20,
    },

    footerText: {
        fontSize: 11,
        textAlign: "center",
        lineHeight: 16,
        marginTop: 2,
        paddingHorizontal: 10,
    },

    /*
    ========================================================
    ESTILOS DO PAINEL DEV
    ========================================================
    */
    devOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    devCard: {
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingVertical: 20,
    },

    devTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
    },

    devDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 14,
    },

    devStatus: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 16,
    },

    devButtons: {
        gap: 12,
    },
});

/*
========================================================
TELA DE CONFIRMAÇÃO DE INFORMAÇÕES

OBJETIVO:
- Exibir os dados preenchidos pelo motorista
- Manter o mesmo padrão visual das telas anteriores
- Mostrar um modal inferior para confirmar ou corrigir
- Deixar o fundo da tela principal atenuado quando o
  modal estiver aberto, como na referência da 99

FLUXO:
- Usuário revisa os dados enviados pela tela anterior
- Ao tocar em "Avançar", abre o modal de confirmação
- "Corrigir" volta para DriverInfo
- "Avançar" segue para Documentation
========================================================
*/

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Modal,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useTheme } from "../../../context/ThemeContext";
import ButtonPrimary from "../../../components/ButtonPrimary";

/*
========================================================
TIPAGEM DE NAVEGAÇÃO
========================================================
*/
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ConfirmInfo"
>;

type ConfirmInfoRouteProp = RouteProp<RootStackParamList, "ConfirmInfo">;

/*
========================================================
CONTROLE DE ESPAÇAMENTO ENTRE OS ITENS

AJUSTE AQUI SE NECESSÁRIO:
- 16 = mais compacto
- 20 = equilíbrio atual
- 24 = mais espaçado
========================================================
*/
const INFO_ITEM_VERTICAL_PADDING = 20;

export default function ConfirmInfoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ConfirmInfoRouteProp>();

    /*
    ========================================================
    TEMA GLOBAL (LIGHT / DARK)
    ========================================================
    */
    const { theme, colors, isDark } = useTheme();

    /*
    ========================================================
    DADOS RECEBIDOS DA TELA ANTERIOR
    ========================================================
    */
    const { firstName, cpf, gender, state, city } = route.params;

    /*
    ========================================================
    CONTROLE DO MODAL
    ========================================================
    */
    const [isModalVisible, setIsModalVisible] = useState(true);

    /*
    ========================================================
    AÇÃO DE VOLTAR
    ========================================================
    */
    const handleBack = () => {
        navigation.goBack();
    };

    /*
    ========================================================
    AÇÃO DE FECHAR
    ========================================================
    */
    const handleClose = () => {
        navigation.navigate("Start");
    };

    /*
    ========================================================
    AÇÃO DE CORRIGIR
    Fecha o modal e volta para a tela anterior
    ========================================================
    */
    const handleCorrect = () => {
        setIsModalVisible(false);
        navigation.goBack();
    };

    /*
    ========================================================
    AÇÃO DE AVANÇAR
    Fecha o modal e segue para a tela de documentos
    ========================================================
    */
    const handleAdvance = () => {
        setIsModalVisible(false);
        navigation.navigate("Documentation");
    };

    /*
    ========================================================
    AÇÃO PARA REABRIR O MODAL
    Caso o usuário toque no botão do rodapé
    ========================================================
    */
    const handleOpenConfirmation = () => {
        setIsModalVisible(true);
    };

    /*
    ========================================================
    COMPONENTE DE ITEM DE INFORMAÇÃO
    ========================================================
    */
    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <View
            style={[
                styles.infoItem,
                {
                    borderBottomColor: colors.divider,
                },
            ]}
        >
            <Text
                style={[
                    styles.infoLabel,
                    {
                        color: colors.subtext,
                    },
                ]}
            >
                {label}
            </Text>

            <Text
                style={[
                    styles.infoValue,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {value}
            </Text>
        </View>
    );

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

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                {/* ========================================================
                    TOPO PADRONIZADO
                ======================================================== */}
                <View
                    style={[
                        styles.topBar,
                        {
                            backgroundColor: colors.background,
                            borderBottomColor: colors.divider,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleBack}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topIconButton}
                        onPress={handleClose}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close" size={22} color={colors.text} />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.topBrand,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Zun
                    </Text>

                    <View style={styles.topSpacer} />
                </View>

                {/* ========================================================
                    CONTEÚDO PRINCIPAL
                ======================================================== */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {/* ====================================================
                        BANNER SUPERIOR
                        Mantido no mesmo padrão das telas anteriores
                    ==================================================== */}
                    <View
                        style={[
                            styles.banner,
                            {
                                backgroundColor: colors.primary,
                            },
                        ]}
                    >
                        <View style={styles.bannerTextContainer}>
                            <Text
                                style={[
                                    styles.bannerTitle,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Vem pra Zun e aproveite várias formas de ganhar
                                dinheiro!
                            </Text>

                            <Text
                                style={[
                                    styles.bannerSubtitle,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                Mais eventos de recompensa | Garantia Zun |
                                Resgates flexíveis
                            </Text>
                        </View>

                        <View style={styles.bannerArt}>
                            <Ionicons
                                name="cash-outline"
                                size={44}
                                color={colors.white}
                            />
                        </View>
                    </View>

                    {/* ====================================================
                        INFORMAÇÕES PREENCHIDAS
                    ==================================================== */}
                    <View style={styles.infoContainer}>
                        <InfoItem label="Primeiro nome" value={firstName} />
                        <InfoItem label="CPF" value={cpf} />
                        <InfoItem label="Gênero" value={gender} />
                        <InfoItem label="Estado" value={state} />
                        <InfoItem label="Cidade" value={city} />
                    </View>
                </ScrollView>

                {/* ========================================================
                    RODAPÉ FIXO
                    Mantido apenas como ação de reabrir confirmação
                ======================================================== */}
                <View
                    style={[
                        styles.footer,
                        {
                            backgroundColor: colors.background,
                            borderTopColor: colors.divider,
                        },
                    ]}
                >
                    <ButtonPrimary
                        title="Avançar"
                        onPress={handleOpenConfirmation}
                        isDark={isDark}
                    />
                </View>

                {/* ========================================================
                    MODAL DE CONFIRMAÇÃO
                    - fundo atenuado
                    - card inferior
                    - botões pequenos arredondados
                ======================================================== */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={isModalVisible}
                >
                    <View style={styles.modalOverlay}>
                        {/* ================================================
                            CAMADA DE FUNDO ATENUADO
                        ================================================ */}
                        <View
                            style={[
                                styles.modalBackdrop,
                                {
                                    backgroundColor: "rgba(0, 0, 0, 0.34)",
                                },
                            ]}
                        />

                        {/* ================================================
                            CARD DO MODAL
                        ================================================ */}
                        <View
                            style={[
                                styles.modalContainer,
                                {
                                    backgroundColor: colors.surface,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalTitle,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                Confirme se suas informações estão corretas
                            </Text>

                            <View style={styles.modalButtonRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.smallButton,
                                        styles.correctButton,
                                        {
                                            backgroundColor: isDark
                                                ? colors.card
                                                : "#EFEFEF",
                                        },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={handleCorrect}
                                >
                                    <Text
                                        style={[
                                            styles.correctButtonText,
                                            {
                                                color: colors.text,
                                            },
                                        ]}
                                    >
                                        Corrigir
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.smallButton,
                                        styles.advanceButton,
                                        {
                                            backgroundColor: colors.primary,
                                        },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={handleAdvance}
                                >
                                    <Text
                                        style={[
                                            styles.advanceButtonText,
                                            {
                                                color: colors.white,
                                            },
                                        ]}
                                    >
                                        Avançar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
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
    },

    /*
    ========================================================
    TOPO PADRONIZADO
    ========================================================
    */
    topBar: {
        height: 56,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },

    topIconButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 2,
    },

    topBrand: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 4,
    },

    topSpacer: {
        flex: 1,
    },

    /*
    ========================================================
    ÁREA ROLÁVEL
    ========================================================
    */
    scroll: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    /*
    ========================================================
    BANNER SUPERIOR
    ========================================================
    */
    banner: {
        minHeight: 108,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    bannerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },

    bannerTitle: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 4,
    },

    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },

    bannerArt: {
        width: 64,
        alignItems: "center",
        justifyContent: "center",
    },

    /*
    ========================================================
    LISTA DE INFORMAÇÕES
    ========================================================
    */
    infoContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    infoItem: {
        paddingVertical: INFO_ITEM_VERTICAL_PADDING,
        borderBottomWidth: 1,
    },

    infoLabel: {
        fontSize: 12,
        marginBottom: 4,
    },

    infoValue: {
        fontSize: 17,
        fontWeight: "500",
    },

    /*
    ========================================================
    RODAPÉ
    ========================================================
    */
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
    },

    /*
    ========================================================
    MODAL
    ========================================================
    */
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },

    modalContainer: {
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 26,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 26,
        marginBottom: 18,
    },

    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    /*
    ========================================================
    BOTÕES PEQUENOS DO MODAL
    Mantidos com a identidade Zun já aprovada
    ========================================================
    */
    smallButton: {
        flex: 1,
        minHeight: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    correctButton: {
        borderWidth: 0,
    },

    advanceButton: {
        borderWidth: 0,
    },

    correctButtonText: {
        fontSize: 16,
        fontWeight: "700",
    },

    advanceButtonText: {
        fontSize: 16,
        fontWeight: "700",
    },
});

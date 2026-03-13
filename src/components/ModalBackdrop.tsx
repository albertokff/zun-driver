import React from "react";
import {
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";

type Props = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
};

export const ModalBackdrop = ({ children, visible, onClose }: Props) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        {/* Este segundo Touchable evita que o clique no conteúdo feche o modal */}
                        {children}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundo escuro semi-transparente
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});

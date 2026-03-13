/*
========================================================
COMPONENTE: ImagePickerModal
Modal para escolher entre tirar foto ou selecionar do álbum.
========================================================
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onTakePhoto: (imageUri: string) => void;
    onSelectFromAlbum: (imageUri: string) => void;
}

export default function ImagePickerModal({
    visible,
    onClose,
    onTakePhoto,
    onSelectFromAlbum,
}: ImagePickerModalProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ✅ Função para solicitar permissão da câmera
    const requestCameraPermission = async (): Promise<boolean> => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à câmera para tirar fotos do documento.",
            );
            return false;
        }
        return true;
    };

    // ✅ Função para solicitar permissão da galeria
    const requestMediaLibraryPermission = async (): Promise<boolean> => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à galeria para selecionar fotos.",
            );
            return false;
        }
        return true;
    };

    // ✅ Função para tirar foto
    const handleTakePhoto = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            onClose();
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                cameraType: ImagePicker.CameraType.back, // Usa câmera traseira
            });

            if (!result.canceled && result.assets[0]) {
                onTakePhoto(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Erro ao tirar foto:", error);
            Alert.alert("Erro", "Não foi possível acessar a câmera.");
        } finally {
            onClose();
        }
    };

    // ✅ Função para selecionar do álbum
    const handleSelectFromAlbum = async () => {
        const hasPermission = await requestMediaLibraryPermission();
        if (!hasPermission) {
            onClose();
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                onSelectFromAlbum(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Erro ao selecionar imagem:", error);
            Alert.alert("Erro", "Não foi possível acessar a galeria.");
        } finally {
            onClose();
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View
                    style={[styles.container, isDark && styles.containerDark]}
                >
                    <Text style={[styles.title, isDark && styles.titleDark]}>
                        Escolher imagem
                    </Text>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={handleTakePhoto}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={24}
                            color={isDark ? "#FFF" : "#222"}
                        />
                        <Text
                            style={[
                                styles.optionText,
                                isDark && styles.optionTextDark,
                            ]}
                        >
                            Tirar foto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={handleSelectFromAlbum}
                    >
                        <Ionicons
                            name="images-outline"
                            size={24}
                            color={isDark ? "#FFF" : "#222"}
                        />
                        <Text
                            style={[
                                styles.optionText,
                                isDark && styles.optionTextDark,
                            ]}
                        >
                            Álbum de fotos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.cancelButton,
                            isDark && styles.cancelButtonDark,
                        ]}
                        onPress={onClose}
                    >
                        <Text
                            style={[
                                styles.cancelButtonText,
                                isDark && styles.cancelButtonTextDark,
                            ]}
                        >
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 30,
    },
    containerDark: {
        backgroundColor: "#1C1C1E",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 20,
        textAlign: "center",
    },
    titleDark: {
        color: "#FFF",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    optionText: {
        fontSize: 16,
        color: "#222",
        marginLeft: 15,
    },
    optionTextDark: {
        color: "#FFF",
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 15,
        alignItems: "center",
    },
    cancelButtonDark: {
        borderTopWidth: 1,
        borderTopColor: "#2C2C2E",
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#FF5252",
        fontWeight: "600",
    },
    cancelButtonTextDark: {
        color: "#FF6B6B",
    },
});

import { useState, useMemo } from 'react';

// O hook retorna um objeto para clareza
interface PhoneMaskResult {
    phone: string; // O valor com máscara para o input
    unmaskedPhone: string; // O valor sem máscara para validação e API
    isPhoneValid: boolean; // O booleano para o botão
    handlePhoneChange: (text: string) => void; // A função para o onChangeText
}

export const usePhoneMask = (initialValue: string = ''): PhoneMaskResult => {

    const [phone, setPhone] = useState(initialValue);

    // A sua função de máscara, agora dentro do hook
    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const truncated = cleaned.slice(0, 11);

        // Lógica da máscara (melhorei para lidar com 8 ou 9 dígitos no celular)
        let masked = '';
        if (truncated.length > 0) {
            masked = `(${truncated.slice(0, 2)}`;
        }
        if (truncated.length > 2) {
            const middlePartLength = truncated.length > 10 ? 5 : 4;
            masked += `) ${truncated.slice(2, 2 + middlePartLength)}`;
        }
        if (truncated.length > 6) {
            const middlePartLength = truncated.length > 10 ? 5 : 4;
            masked += `-${truncated.slice(2 + middlePartLength)}`;
        }

        setPhone(masked);
    };

    // Usamos useMemo para evitar recalcular isso em toda renderização
    const unmaskedPhone = useMemo(() => phone.replace(/\D/g, ''), [phone]);
    const isPhoneValid = useMemo(() => unmaskedPhone.length === 11, [unmaskedPhone]);

    return { phone, unmaskedPhone, isPhoneValid, handlePhoneChange };
};
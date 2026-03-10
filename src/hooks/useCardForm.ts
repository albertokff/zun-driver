import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

// Interface para o objeto de erros
interface FormErrors {
    cardName?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
}

// Interface para o que o hook retorna
interface CardFormResult {
    cardName: string;
    setCardName: (name: string) => void;
    cardNumber: string;
    handleCardNumberChange: (text: string) => void;
    expiryDate: string;
    handleExpiryChange: (text: string) => void;
    cvv: string;
    handleCvvChange: (text: string) => void;
    isFormValid: boolean;
    errors: FormErrors; // Expondo os erros
    validateAndSubmit: (onSuccess: () => void) => void;
}

export const useCardForm = (): CardFormResult => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    // Efeito para validar o formulário sempre que um campo muda
    useEffect(() => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Validação do Nome
        if (cardName.trim().length > 0 && cardName.trim().length < 3) {
            newErrors.cardName = 'Nome deve ter pelo menos 3 caracteres';
            isValid = false;
        }

        // Validação do Número do Cartão
        const unmaskedCardNumber = cardNumber.replace(/\s/g, '');
        if (unmaskedCardNumber.length > 0 && unmaskedCardNumber.length < 15) {
            newErrors.cardNumber = 'Número do cartão incompleto';
            isValid = false;
        }

        // Validação da Data de Validade
        if (expiryDate.length > 0) {
            const [monthStr, yearStr] = expiryDate.split('/');
            const month = parseInt(monthStr, 10);
            const year = parseInt(`20${yearStr}`, 10);
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;

            if (
                expiryDate.length < 5 ||
                month < 1 || month > 12 ||
                year < currentYear ||
                (year === currentYear && month < currentMonth)
            ) {
                newErrors.expiryDate = 'Data inválida';
                isValid = false;
            }
        }

        // Validação do CVV
        if (cvv.length > 0 && cvv.length < 3) {
            newErrors.cvv = 'CVV inválido';
            isValid = false;
        }

        // Checagem final para habilitar o botão
        const allFieldsFilled =
            cardName.trim().length >= 3 &&
            unmaskedCardNumber.length >= 15 &&
            expiryDate.length === 5 &&
            cvv.length >= 3;

        setErrors(newErrors);
        setIsFormValid(allFieldsFilled && isValid);

    }, [cardName, cardNumber, expiryDate, cvv]);

    // Funções de máscara (semelhantes às anteriores)
    const handleCardNumberChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const truncated = cleaned.slice(0, 16);
        const masked = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(masked);
    };

    const handleExpiryChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const truncated = cleaned.slice(0, 4);
        let formattedDate = truncated;
        if (truncated.length > 2) {
            formattedDate = `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
        }
        if (formattedDate !== expiryDate) {
            setExpiryDate(formattedDate);
        }
    };

    const handleCvvChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const truncated = cleaned.slice(0, 4);
        setCvv(truncated);
    };

    const validateAndSubmit = (onSuccess: () => void) => {
        if (!isFormValid) {
            Alert.alert("Formulário incompleto", "Por favor, preencha todos os campos corretamente.");
            return;
        }
        onSuccess();
    };

    return {
        cardName,
        setCardName,
        cardNumber,
        handleCardNumberChange,
        expiryDate,
        handleExpiryChange,
        cvv,
        handleCvvChange,
        isFormValid,
        errors, // Retornando o objeto de erros
        validateAndSubmit,
    };
};
import { sendOtp, verifyOtp } from '../services/auth/authService';
import { setUser } from '../store/authStore';

export const useAuth = () => {
    const requestOtp = async (phone: string) => {
        return await sendOtp(phone);
    };

    const confirmOtp = async (code: string) => {
        return await verifyOtp(code);
    };

    const completeRegistration = (name: string, phone: string, email?: string) => {
        setUser({
            id: '1',
            name,
            phone,
            email,
        });
    };

    return {
        requestOtp,
        confirmOtp,
        completeRegistration,
    };
};

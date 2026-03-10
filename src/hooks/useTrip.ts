import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

/* ------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------ */

export interface TripDetails {
    id: string;

    driver: {
        name: string;
        avatarUrl: string;
        rating: number;
        tripCount: number;
        phone: string;
    };

    car: {
        model: string;
        plate: string;
        color: string;
    };

    status: "DRIVER_EN_ROUTE" | "CANCELED" | "COMPLETED";

    cancellationFeeDeadline: string;
}

interface UseTripReturn {
    trip: TripDetails | null;
    isLoading: boolean;
    error: string | null;
    secondsToFee: number;
    cancelTrip: () => Promise<void>;
}

/* ------------------------------------------------ */
/* HOOK */
/* ------------------------------------------------ */

export const useTrip = (tripId: string): UseTripReturn => {
    const [trip, setTrip] = useState<TripDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [secondsToFee, setSecondsToFee] = useState(0);

    /* ------------------------------------------------ */
    /* FETCH TRIP */
    /* ------------------------------------------------ */

    const fetchTripDetails = useCallback(async () => {
        try {
            const response = await api.get<TripDetails>(`/trips/${tripId}`);

            setTrip(response.data);
            setError(null);
        } catch (err: unknown) {
            console.error(err);
            setError("Não foi possível carregar os detalhes da viagem.");
        } finally {
            setIsLoading(false);
        }
    }, [tripId]);

    /* ------------------------------------------------ */
    /* INITIAL FETCH */
    /* ------------------------------------------------ */

    useEffect(() => {
        if (!tripId) return;

        fetchTripDetails();
    }, [tripId, fetchTripDetails]);

    /* ------------------------------------------------ */
    /* POLLING (ATUALIZAÇÃO AUTOMÁTICA DA CORRIDA) */
    /* ------------------------------------------------ */

    useEffect(() => {
        if (!tripId) return;

        const interval = setInterval(() => {
            fetchTripDetails();
        }, 5000); // atualiza a cada 5s

        return () => clearInterval(interval);
    }, [tripId, fetchTripDetails]);

    /* ------------------------------------------------ */
    /* CANCELATION TIMER */
    /* ------------------------------------------------ */

    useEffect(() => {
        if (!trip?.cancellationFeeDeadline) return;

        const interval = setInterval(() => {
            const deadline = new Date(trip.cancellationFeeDeadline).getTime();
            const now = new Date().getTime();

            const diffInSeconds = Math.round((deadline - now) / 1000);

            setSecondsToFee(diffInSeconds > 0 ? diffInSeconds : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [trip]);

    /* ------------------------------------------------ */
    /* CANCEL TRIP */
    /* ------------------------------------------------ */

    const cancelTrip = useCallback(async () => {
        try {
            await api.post(`/trips/${tripId}/cancel`);

            setTrip((prev) =>
                prev
                    ? {
                        ...prev,
                        status: "CANCELED",
                    }
                    : null
            );
        } catch (err: unknown) {
            console.error("Erro ao cancelar a viagem", err);
        }
    }, [tripId]);

    return {
        trip,
        isLoading,
        error,
        secondsToFee,
        cancelTrip,
    };
};
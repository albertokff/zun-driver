/*
========================================================
TIPO DE DADOS DE PERMISSÃO
Define a estrutura de cada permissão exibida no app
========================================================
*/

export type Permission = {
    id: string; // Identificador único (IMPORTANTE para controle de fluxo)
    icon: string; // Nome do ícone (Ionicons / Material)
    title: string; // Título da permissão
    description: string; // Descrição explicativa
};

/*
========================================================
MODO DESENVOLVIMENTO
Simula permissões quando rodando na web ou sem emulador
========================================================
*/

export const DEV_SIMULATE_PERMISSION = true;

/*
========================================================
LISTA DE PERMISSÕES DO APP ZUN MOTORISTA
- Estruturado para fácil manutenção
- Preparado para tracking de permissões futuramente
========================================================
*/

export const permissions: Permission[] = [
    {
        id: "location",
        icon: "location-outline",
        title: "Informações de localização",
        description:
            "A Zun Motorista utiliza sua localização para otimizar sua experiência, identificar pontos de embarque e desembarque com precisão, calcular tarifas corretamente e aumentar a segurança das corridas, mesmo quando o app não estiver em uso.",
    },
    {
        id: "phone",
        icon: "call-outline",
        title: "Informações do dispositivo",
        description:
            "Permite gerenciar chamadas telefônicas e possibilita que a plataforma ofereça recursos como suporte ao motorista, segurança e prevenção de fraudes.",
    },
    {
        id: "notifications",
        icon: "notifications-outline",
        title: "Notificações da plataforma",
        description:
            "Permite que você receba notificações importantes sobre corridas, ganhos, promoções e atualizações da plataforma.",
    },
];
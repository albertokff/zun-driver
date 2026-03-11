/*
========================================
TIPO DE DADOS DE PERMISSÃO
Define a estrutura de cada permissão
========================================
*/

export type Permission = {
    icon: string;
    title: string;
    description: string;
};

/*
========================================
MODO DESENVOLVIMENTO
Simula permissões quando rodando na web
ou sem emulador
========================================
*/

export const DEV_SIMULATE_PERMISSION = true;

/*
========================================
LISTA DE PERMISSÕES DO APP ZUN MOTORISTA
========================================
*/

export const permissions: Permission[] = [
    {
        icon: "map-marker-outline",
        title: "Informações de localização",
        description:
            "A Zun Motorista coleta seus dados de localização para permitir e otimizar continuamente a sua experiência no cadastro e login como motorista parceiro, recuperar com precisão a localização dos pontos de embarque e desembarque, calcular tarifa da corrida, promover a segurança da corrida, ainda que o aplicativo não esteja aberto e em uso.",
    },
    {
        icon: "cellphone",
        title: "Informações do dispositivo",
        description:
            "Isso ajuda você a fazer e gerenciar ligações telefônicas e permite que a plataforma forneça serviços como gerenciamento de perfil e prevenção de fraudes.",
    },
    {
        icon: "bell-outline",
        title: "Notificações da plataforma",
        description:
            "Permite que você receba notificações relacionadas a recompensas, ofertas e outras informações.",
    },
];
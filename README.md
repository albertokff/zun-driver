<h1 align="center">
    <img src="./src/assets/logo/zun-logo-z2.png" style="width: 30%;" />
</h1>

# Zun Driver App

# Welcome to your Expo app 👋


# 📱 Sobre o Projeto

O Zun Driver é um aplicativo de transporte urbano focado em baixo custo para motoristas, oferecendo uma alternativa acessível às plataformas tradicionais.

# 💡 Diferencial Principal
💸 Taxa fixa de apenas R$ 0,35 por corrida
⚡ Pagamento direto via PIX (sem intermediários)
🚫 Sem taxas abusivas de gateways
🌙 Suporte a modo Light / Dark
🌎 Suporte a múltiplos idiomas (i18n)

# 💳 Sistema de Pagamento

O app utiliza um modelo inovador:

O motorista cadastra sua chave PIX
Ao finalizar a corrida:
Um QR Code PIX é gerado automaticamente
O passageiro paga diretamente ao motorista
O sistema utiliza confirmação manual (fase inicial)

⚠️ Esse modelo reduz drasticamente os custos operacionais e elimina intermediários financeiros.

# 🧱 Arquitetura do Projeto

Projeto desenvolvido com:

⚛️ React Native
🚀 Expo
🌐 Suporte Web (para desenvolvimento)
🧠 Context API + Hooks customizados
🌍 Internacionalização (i18next)

📂 Estrutura do Projeto
```bash
zun-driver
├── src/
│   ├── assets/          # Imagens, ícones e logos
│   ├── components/      # Componentes reutilizáveis
│   ├── constants/       # Constantes globais
│   ├── context/         # Context API (Theme, Document)
│   ├── hooks/           # Hooks customizados
│   ├── i18n/            # Traduções
│   ├── navigation/      # Navegação do app
│   ├── screens/         # Telas do aplicativo
│   ├── theme/           # Sistema de cores e estilos
│   ├── App.tsx
│   └── index.ts
```

# ⚙️ Requisitos
Node.js 18 (recomendado)

nvm install 18.20.4
nvm use 18.20.4

Hoje:
Node 18 = LTS estável para RN

# 🚀 Como Rodar o Projeto
📦 Instalar dependências

npm install

# ▶️ Rodar o projeto
🔹 Web (Chrome)
`npx expo start --web`

💡 Este projeto foi adaptado para rodar via navegador, ideal para máquinas sem Android Studio.

🔹 Android (para quem possui ambiente)
`npx expo start -c`

`npx expo run:android`

Tambem pode usar:

   `npx expo start`

   `npx expo start -c`

   `npx expo start --clear`


- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


# 🧪 Ambiente de Desenvolvimento

Devido à limitação de hardware, o projeto utiliza:

🌐 Emulador via navegador (Expo Web)
💻 VS Code + PowerShell
🔄 Compatibilidade com Android Studio para outros devs

# 🧠 Padrões do Projeto
 - Separação por responsabilidade (components, hooks, context)
 - Uso de hooks customizados
 - Tema centralizado (Light / Dark)
 - Navegação desacoplada
 - Estrutura escalável

## Resultado do mapeamento
O fluxo ideal da Zun fica assim:
Fluxo validado até o momento
00 Splash
01 Start
02 PrivacyPolicy
03 Permissions
04 PermissionBackdrop
05 LocationPermission
06 sistema Android
07 popup de chamadas
08 popup de notificações
09 BatteryPermission
010/011 volta para Start
012 Phone
013 Otp
014 DriverCategory
015 DriverInfo
016 ConfirmInfo


Splash
Start
PrivacyPolicy
Permissions
PermissionBackdrop
BatteryPermission
Phone
Otp
Password
DriverCategory
DriverInfo
ConfirmInfo
Documentation
sequência de documentos
análise/finalização
Home


layout 

## Estrutura de Pasta e Arquivos (Profissional e Escalável).

Light / Dark
```bash
zun-driver
├── .expo
├── .idea
├── .vscode
├── node_modules
├── src/
│   ├── assets/
│   │   ├── icon/
│   │   ├── images/
│   │   └── logo/
│   │
│   ├── components/
│   │   ├── AppBackdrop.tsx
│   │   ├── BackButton.tsx
│   │   ├── ButtonPrimary.tsx
│   │   ├── ButtonSecondary.tsx
│   │   ├── CityPicker.tsx
│   │   ├── CollapsiblePicker.tsx
│   │   ├── FormTextInput.tsx
│   │   ├── ImagePickerModal.tsx
│   │   └── ModalBackdrop.tsx
│   │
│   ├── constants/
│   │   └── permissions.ts
│   │
│   ├── context/
│   │   ├── DocumentContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBatteryOptimization.ts
│   │   ├── useBrazilianCities.ts
│   │   ├── useCardForm.ts
│   │   ├── usePhoneMask.ts
│   │   ├── useSystemPermissions.ts
│   │   └── useTrip.ts
│   │
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   └── pt.json
│   │   │
│   │   ├── i18next.d.ts
│   │   └── index.ts
│   │
│   ├── main/
│   │   └── AndroidManifest.xml
│   │
│   ├── navigation/
│   │   ├── AuthNavigator.tsx
│   │   └── RootNavigator.tsx
│   │
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── Register/
│   │   │   │   ├── AnalysisInProgressScreen.tsx
│   │   │   │   ├── CameraCaptureScreen.tsx
│   │   │   │   ├── CNHInfoScreen.tsx
│   │   │   │   ├── ConfirmInfoScreen.tsx
│   │   │   │   ├── DocumentationScreen.tsx
│   │   │   │   ├── DocumentGuidelinesScreen.tsx
│   │   │   │   ├── DocumentRequirementsScreen.tsx
│   │   │   │   ├── DriverCategoryScreen.tsx
│   │   │   │   ├── DriverInfoScreen.tsx
│   │   │   │   ├── OptimizationCompleteScreen.tsx
│   │   │   │   ├── OptimizationScreen.tsx
│   │   │   │   ├── OtpScreen.tsx
│   │   │   │   ├── PasswordScreen.tsx
│   │   │   │   ├── PhoneScreen.tsx
│   │   │   │   ├── PhotoTipsScreen.tsx
│   │   │   │   ├── UploadDocumentScreen.tsx
│   │   │   │   └── VehicleDocumentInfoScreen.tsx
│   │   │   │
│   │   │   ├── AssistantPermissionScreen.tsx
│   │   │   ├── BatteryPermissionScreen.tsx
│   │   │   ├── LocationPermissionScreen.tsx
│   │   │   ├── PermissionBackdropScreen.tsx
│   │   │   ├── PermissionsScreen.tsx
│   │   │   ├── PrivacyPolicyScreen.tsx
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── StartScreen.tsx
│   │   │   └── VerifyCodeScreen.tsx
│   │   │
│   │   ├── Drawer/
│   │   │   ├── components/
│   │   │   │   ├── DrawerHeader.tsx
│   │   │   │   └── DrawerItem.tsx
│   │   │   │
│   │   │   └── DrawerMenu.tsx
│   │   │
│   │   └── Main/
│   │       └── HomeScreen.tsx
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── index.ts 
│   │   ├── spacing.ts
│   │   └── typography.ts
│   │
│   ├── type/
│   │   └── react-native-battery-optimization-check.d.ts
│   │
│   ├── App.tsx
│   └── index.ts
│
├── .editorconfig
├── .gitignore
├── app.json
├── babel.config.json
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
```


# 🔄 Git Flow
Branch	 |  Descrição

main     |	Produção
staging	 |  Homologação
develop	 |  Desenvolvimento


# 📥 Atualizar a Branch:
git pull origin develop

git checkout develop   --> Troca de branch

git merge origin/develop

npm install

# 📥 Subir Projeto:
git add .

git commit -m "DESCRIÇÃO :construction:" 

git push origin develop

## ⚠️ Conflitos no Pull

### `Accept Current Change` (Aceitar Mudança Atual):

O que faz: Mantém o seu código e descarta a mudança que veio do pull.
Resultado: Seu código final será navigation.navigate("Start");.

### `Accept Incoming` (Aceitar Mudança Recebida):

O que faz: Descarta a sua mudança e aplica a que veio do pull.
Resultado: Seu código final será navigation.navigate("Password");.

### `Accept Both Changes` (Aceitar Ambas as Mudanças):

O que faz: Coloca um código depois do outro.
Resultado: Seu código ficaria com as duas linhas, algo como:
navigation.navigate("Start");
navigation.navigate("Password");

Cuidado: Para este seu caso, esta opção provavelmente está errada, pois o aplicativo tentaria navegar para duas telas ao mesmo tempo, o que causaria um comportamento inesperado ou um bug.

### `Compare Changes` (Comparar Mudanças):

O que faz: Abre uma tela de comparação lado a lado para você analisar as diferenças com mais detalhes. É útil para entender o conflito, mas não o resolve.

# 🌍 Tecnologias Utilizadas
React Native 0.76
Expo 52
React Navigation
i18next
Async Storage

# 📌 Roadmap

Integração com API de pagamentos (futuro)

Sistema de carteira (wallet)

Automação de confirmação PIX

Melhorias de UI/UX

# 👨‍💻 Time de Desenvolvimento

Projeto desenvolvido por uma equipe focada em soluções acessíveis e escaláveis para mobilidade urbana.

# 📄 Licença

Projeto privado.

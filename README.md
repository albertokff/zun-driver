<h1 align="center">
    <img src="./src/assets/logo/zun-logo-z2.png" style="width: 30%;" />
</h1>

# App Zun Driver

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

`Node 18`
nvm install 18.20.4
nvm use 18.20.4

Hoje:

Node 18 = LTS estável para RN

Node 20 = ainda gera edge cases

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   `npx expo start`

   `npx expo start -c`

   `npx expo start --clear`

## Rodar o App
Web (Chrome):
`npx expo start --web`

## Android Studio:

`npx expo start -c`

`npx expo run:android`


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


Estrutura de Pasta e Arquivos (Profissional e Escalável) 
```bash
zun-driver
├── .vscode
├── node_modules
├── src/
│    ├── assets/
│    │   ├── images
│    │   └── logo
│    │
│    ├── components/
│    │   ├── AppBackdrop.tsx
│    │   ├── BackButton.tsx
│    │   ├── ButtonPrimary.tsx
│    │   ├── ButtonSecondary.tsx
│    │   ├── CityPicker.tsx
│    │   ├── CollapsiblePicker.tsx
│    │   ├── FormTextInput.tsx
│    │   ├── ImagePickerModal.tsx
│    │   └── ModalBackdrop.tsx
│    │
│    ├── constants/
│    │   └── permissions.ts
│    │
│    ├── context/
│    │   ├── DocumentContext.tsx
│    │   └── ThemeContext.tsx
│    │
│    ├── hooks/
│    │   ├── useAuth.ts
│    │   ├── useBatteryOptimization.ts
│    │   ├── useBrazilianCities.ts
│    │   ├── useCardForm.ts
│    │   ├── usePhoneMask.ts
│    │   ├── useSystemPermissions.ts
│    │   └── useTrip.ts
│    │
│    ├── i18n/
│    │   ├── locales/
│    │   │   ├── en.json
│    │   │   ├── es.json
│    │   │   └── pt.json
│    │   │
│    │   ├── i18next.d.ts
│    │   └── index.ts
│    │
│    ├── main/
│    │   └── AndroidManifest.xml
│    │
│    ├── navigation/
│    │   ├── AuthNavigator.tsx
│    │   └── RootNavigator.tsx
│    │
│    ├── screens/
│    │   └── Auth/
│    │       ├── Register/
│    │       │   ├── ConfirmInfoScreen.tsx
│    │       │   ├── DocumentationScreen.tsx
│    │       │   ├── DocumentGuidelinesScreen.tsx
│    │       │   ├── DocumentRequirementsScreen.tsx
│    │       │   ├── DriverCategoryScreen.tsx
│    │       │   ├── DriverInfoScreen.tsx
│    │       │   ├── OtpScreen.tsx
│    │       │   ├── PasswordScreen.tsx
│    │       │   ├── PhoneScreen.tsx
│    │       │   ├── UploadDocumentScreen.tsx
│    │       │   └── VehicleDocumentInfoScreen.tsx
│    │       │
│    │       ├── BatteryPermissionScreen.tsx
│    │       ├── PermissionBackdropScreen.tsx
│    │       ├── PermissionsScreen.tsx
│    │       ├── PrivacyPolicyScreen.tsx
│    │       ├── SplashScreen.tsx
│    │       ├── StartScreen.tsx
│    │       └── VerifyCodeScreen.tsx
│    │
│    │
│    ├── theme/
│    │   ├── colors.ts
│    │   ├── index.ts 
│    │   ├── spacing.ts
│    │   └── typography.ts
│    │
│    ├── type/
│    │   └── react-native-battery-optimization-check.d.ts
│    │
│    ├── App.tsx
│    └── index.ts
│
├── .editorconfig
├── .gitignore
├── app.json
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
```
Light / Dark


## COMANDOS GitHub
main    -   Branch principal, código em produção
staging -   Branch de homologação ou pré-produção.
develop -   Branch de desenvolvimento

### Atualizar a Branch:
git pull origin develop

git checkout develop   --> Troca de branch

git merge origin/develop

npm install

### Subir Projeto:
git add .

git commit -m "DESCRIÇÃO :construction:" 

git push origin develop

## Conflitos no Pull
`Accept Current Change` (Aceitar Mudança Atual):

O que faz: Mantém o seu código e descarta a mudança que veio do pull.
Resultado: Seu código final será navigation.navigate("Start");.

`Accept Incoming` (Aceitar Mudança Recebida):

O que faz: Descarta a sua mudança e aplica a que veio do pull.
Resultado: Seu código final será navigation.navigate("Password");.

`Accept Both Changes` (Aceitar Ambas as Mudanças):

O que faz: Coloca um código depois do outro.
Resultado: Seu código ficaria com as duas linhas, algo como:
navigation.navigate("Start");
navigation.navigate("Password");

Cuidado: Para este seu caso, esta opção provavelmente está errada, pois o aplicativo tentaria navegar para duas telas ao mesmo tempo, o que causaria um comportamento inesperado ou um bug.

`Compare Changes` (Comparar Mudanças):

O que faz: Abre uma tela de comparação lado a lado para você analisar as diferenças com mais detalhes. É útil para entender o conflito, mas não o resolve.
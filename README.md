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

   ```bash
   npx expo start
   ```

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


Estrutura de Pasta (Profissional e Escalável) 
```bash
zun-driver
├── .vscode
├── node_modules
├── src/
│    ├── assets/
│    │   ├── images
│    │   └── logo
│    │
│    ├── hooks/
│    │   ├── useAuth.ts
│    │   ├── useCardForm.ts
│    │   ├── usePhoneMask.ts
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
│    ├── navigation/
│    │   ├── AuthNavigator.tsx
│    │   └── RootNavigator.tsx
│    │
│    ├── screens/
│    │   ├── Auth/
│    │       ├── Register/
│    │       │   ├── OtpScreen.tsx
│    │       │   └── PhoneScreen.tsx
│    │       │
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

## COMANDOS GitHub
main    -   Branch principal, código em produção
staging -   Branch de homologação ou pré-produção.
develop -   Branch de desenvolvimento

### Atualizar a Branch:
git pull origin develop

git checkout develop   --> Troca de branch

git merge develop

npm install

### Subir Projeto:
git add .

git commit -m 'DESCRIÇÃO' :construction: 

git push origin develop

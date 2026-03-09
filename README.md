# 💰 DT Money App

![DT Money Screenshot](./assets/dt-money-screenshot.png)

O **DT Money** é um aplicativo mobile de gerenciamento financeiro desenvolvido com **Expo**, **React Native** e **NativeWind** (Tailwind CSS para React Native).
📚 **Este projeto foi desenvolvido como parte de um estudo baseado nos conteúdos da Rocketseat**, com o objetivo de praticar conceitos de desenvolvimento mobile utilizando React Native e Expo.

O aplicativo permite que o usuário:

- Fazer **login e cadastro**
- **Adicionar e visualizar transações**
- Controlar **entradas e saídas de dinheiro**
- Exibir **estado de carregamento**
- Tratar **erros de requisição**
- Utilizar um layout adaptado para **dispositivos móveis**

---

# 🚀 Como executar o projeto

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)  
- **npm** ou **yarn**
- **Expo CLI**

Instale o Expo CLI com:

```bash
npm install -g expo-cli
```

Para rodar no celular ou emulador:

- **Android Studio** (Android)
- **Xcode** (iOS – apenas macOS)

---

# 📦 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd dt-money-app
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

ou

```bash
yarn
```

---

# ▶️ Executar o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run start
```

ou

```bash
yarn start
```

Depois você pode abrir o app em:

### Android

```bash
npm run android
```

(requer Android Studio ou dispositivo conectado)

### iOS (apenas macOS)

```bash
npm run ios
```

(requer Xcode)

### Web

```bash
npm run web
```

---

# 📁 Estrutura do projeto

```
src/
├── components/        # Componentes reutilizáveis
├── context/           # Contextos React (auth, transações, snackbar)
├── screens/           # Telas do aplicativo (Home, Login, Register)
├── shared/            # Cores, enums, interfaces, serviços e API
├── styles/            # Estilos globais (Tailwind / NativeWind)
└── utils/             # Funções utilitárias
```

---

# 🎨 Estilização

A estilização é feita com **NativeWind**, que permite usar **Tailwind CSS no React Native**.

Configurações principais:

- `tailwind.config.js`
- `src/styles/global.css`

As cores da aplicação estão definidas em:

```
src/shared/colors.ts
```

---

# 🧠 TypeScript

O projeto utiliza **TypeScript em modo estrito**, configurado no arquivo:

```
tsconfig.json
```

Sempre que adicionar novas funcionalidades, procure **tipar corretamente os dados**.

---

# 🛠 Dicas de desenvolvimento

Se ocorrer problema de cache do Metro (estilos ou assets não atualizando), execute:

```bash
npm run start -c
```

Para facilitar os imports, o projeto usa **alias `@`**, exemplo:

```ts
import { Button } from '@/components/Button'
```

---

# 📜 Scripts disponíveis

| Comando | Descrição |
|--------|-----------|
| `npm run start` | Inicia o servidor do Expo |
| `npm run android` | Executa no Android |
| `npm run ios` | Executa no iOS (macOS) |
| `npm run web` | Executa versão web |

---

# 📄 Licença

Este projeto é open source.  
Adicione aqui as informações da licença se desejar.

---

📌 **Observação:**  
## 📱 Preview do Aplicativo

<p align="center">
  <img width="300" src="https://github.com/user-attachments/assets/8859e983-df5e-4a8a-90eb-ca8fc23622a6" />
  <img width="300" src="https://github.com/user-attachments/assets/42b02787-c5b7-4a16-a36e-102d3d5a956d" />
</p>


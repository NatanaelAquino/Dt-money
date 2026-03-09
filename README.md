# DT Money App

![DT Money Screenshot](./assets/dt-money-screenshot.png)

**DT Money** is a mobile finance manager built with Expo, React Native, and NativeWind (Tailwind CSS for React Native). The app allows users to log in, register, and manage transactions with start/stop loading states, error handling, and device‑friendly layouts.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- Android Studio or Xcode (for simulators) if running on a device/emulator

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url> dt-money-app
   cd dt-money-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run start
   # or
   yarn start
   ```

4. Launch the app on a simulator or physical device:
   - Android: `npm run android` (requires Android Studio)
   - iOS (macOS only): `npm run ios` (requires Xcode)
   - Web: `npm run web`

### Project Structure

```
src/
├── components/        # Reusable UI components
├── context/           # React contexts for auth, transactions, snackbar, etc.
├── screens/           # App screens (Home, Login, Register, etc.)
├── shared/            # Colors, enums, API helpers, hooks, interfaces, services
├── styles/            # Global Tailwind CSS import
└── utils/             # Utility helpers (e.g. money mapper)
```

### Styling

Tailwind-style utilities are applied via NativeWind. Update `tailwind.config.js` and `src/styles/global.css` as needed. Color tokens are defined in `src/shared/colors.ts`.

### TypeScript

The project uses strict TypeScript settings (see `tsconfig.json`). Add types when extending features.

## 🛠 Development Tips

- Use `npm run start -c` to clear Metro cache if styles or assets appear stale.
- Follow the Babel alias `@` for imports (`import { X } from '@/components/X'`).
- Modify Tailwind config if adding new file extensions or custom theme values.

## 📦 Scripts

| Command            | Description                      |
|--------------------|----------------------------------|
| `npm run start`    | Start Metro & Expo dev tools     |
| `npm run android`  | Build+run on Android device/emulator |
| `npm run ios`      | Build+run on iOS simulator (macOS)  |
| `npm run web`      | Launch web preview               |

## 📄 License

This project is open source. Add license information here if applicable.


---

> 📌 **Note:** Add the screenshot image file at `assets/dt-money-screenshot.png` or adjust path accordingly.

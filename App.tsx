import NavigationRoute from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/Auth.context';
import { SnackBarContextProvider } from '@/context/snackBar.context';
import { SnackBar } from '@/components/Snackbar';

export default function App() {
  return (
    <SnackBarContextProvider>
      <AuthContextProvider>
        <NavigationRoute />
        <SnackBar />
      </AuthContextProvider>
    </SnackBarContextProvider>

  );
}


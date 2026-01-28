import NavigationRoute from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/Auth.context';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoute />
    </AuthContextProvider>
  );
}


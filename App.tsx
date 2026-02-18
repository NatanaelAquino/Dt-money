import NavigationRoute from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/Auth.context';
import { SnackBarContextProvider } from '@/context/snackBar.context';
import { SnackBar } from '@/components/Snackbar';
import { BottomSheetProvider } from '@/context/bottomsheet.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <SnackBarContextProvider>
        <AuthContextProvider>
          <BottomSheetProvider>
            <NavigationRoute />
            <SnackBar />
          </BottomSheetProvider>
        </AuthContextProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>

  );
}


import NavigationRoute from '@/routes';
import './src/styles/global.css';
import { AuthContextProvider } from '@/context/Auth.context';
import { SnackBarContextProvider } from '@/context/snackBar.context';
import { SnackBar } from '@/components/Snackbar';
import { BottomSheetProvider } from '@/context/bottomsheet.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TransactiontContextProvider } from '@/context/Transaction.context';

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <SnackBarContextProvider>
        <AuthContextProvider>
          <TransactiontContextProvider>
            <BottomSheetProvider>
              <NavigationRoute />
              <SnackBar />
            </BottomSheetProvider>
          </TransactiontContextProvider>
        </AuthContextProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>

  );
}


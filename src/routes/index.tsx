import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { SystemBars } from 'react-native-edge-to-edge';
import { useAuthContext } from '@/context/Auth.context';


const NavigationRoute = () => {
    const { user, token} = useAuthContext();

    const Routes = useCallback(() => {
        if (!user || !token) {
            return <PublicRoutes />
        }
        return <PrivateRoutes />
    }, [user,token])

    return (
        <NavigationContainer>
            <SystemBars style={"light"} />
            <Routes />
        </NavigationContainer>

    )
}

export default NavigationRoute;
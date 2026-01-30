import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { SystemBars } from 'react-native-edge-to-edge';
import { useAuthContext } from '@/context/Auth.context';
import { Loading } from '@/screens/loading';


const NavigationRoute = () => {
    const [loading, setLoading] = useState(true);
    const { user, token} = useAuthContext();

    const Routes = useCallback(() => {
        if(loading) return <Loading setLoading={setLoading}/>
        if (!user || !token) {
            return <PublicRoutes />
        }
        return <PrivateRoutes />
    }, [user,token,loading])

    return (
        <NavigationContainer>
            <SystemBars style={"light"} />
            <Routes />
        </NavigationContainer>

    )
}

export default NavigationRoute;
import { Home } from "@/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";


export type PrivateStackParamList = {
    Home: undefined;
}


export const PrivateRoutes = () => {
    const PrivateStack = createStackNavigator<PrivateStackParamList>();

    return (
        <PrivateStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <PrivateStack.Screen name="Home" component={Home} />
        </PrivateStack.Navigator>
    )
}
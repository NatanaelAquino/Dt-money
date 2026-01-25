import { Login } from "@/screens/login";
import { Register } from "@/screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamList = {
    Login: undefined;
    Register: undefined;
};

export const PublicRoutes = () => {
   const PublicStack = createStackNavigator<PublicStackParamList>();
       return (
               <PublicStack.Navigator
                   screenOptions={{ headerShown: false }}
               >
                   <PublicStack.Screen name="Login" component={Login} />
                   <PublicStack.Screen name="Register" component={Register} />
               </PublicStack.Navigator>
       )
}
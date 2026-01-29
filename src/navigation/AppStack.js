import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from "../screens/Main/HomeScreen";


const Stack = createNativeStackNavigator();

export default function AppStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Feed' component={FeedScreen}/>
        </Stack.Navigator>
    );
}

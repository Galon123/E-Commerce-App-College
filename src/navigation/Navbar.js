import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

//Screens
import AddItemScreen from '../screens/Main/AddItemScreen';
import FeedScreen from '../screens/Main/HomeScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

//Custom Add Button
import CustomTabButton from '../components/CustomTabButton';

const Tab = createBottomTabNavigator();

export default function Navbar(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,

                tabBarStyle:{

                }
            }}
        >
            <Tab.Screen
                name='Feed'
                component={FeedScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name='home' size={25}/>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name='AddItem'
                component={AddItemScreen}
                options={{
                    tabBarButton:(props)=>(
                        <CustomTabButton {...props}/>
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name='settings' size={25}/>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}
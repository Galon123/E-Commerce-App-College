import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

//Screens
import AddItemScreen from '../screens/Main/AddItemScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

//Custom Add Button
import CustomTabButton from '../components/CustomTabButton';
import AppStack from './AppStack';

const Tab = createBottomTabNavigator();

export default function Navbar(){
        return(
            <Tab.Navigator
                screenOptions={{
                    headerShown:false,
                    tabBarShowLabel:false,

                    tabBarStyle:{
                        position: 'absolute', // Makes it float over the content
                        bottom: -10, // Lift it up from bottom
                        left: 20,   // Margin from left
                        right: 20,  // Margin from right
                        elevation: 0,
                        backgroundColor: '#ffffff',
                        borderRadius: 15, // Rounded corners
                        height: 90, // Taller to accommodate the button
                    
                    // Shadows
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5
                    }
                }}
            >
                <Tab.Screen
                    name='Feed'
                    component={AppStack}
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
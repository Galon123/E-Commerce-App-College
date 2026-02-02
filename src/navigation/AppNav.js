import { NavigationContainer } from '@react-navigation/native';
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import Navbar from "./Navbar";

export default function AppNav(){
    const { isLoading, user } = useContext(AuthContext);

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    return(
        <NavigationContainer>
            {user !== null ? <Navbar/> : <AuthStack/> }
            
        </NavigationContainer>
    )
}
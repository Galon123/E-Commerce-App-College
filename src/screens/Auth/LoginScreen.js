import { useContext, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";




export default function LoginScreen({ navigation }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const { login, isLoading } = useContext(AuthContext);

    const handleLogin=async()=>{

        if(!username || !password){
            Alert.alert("Both fields need to be filled")
            return;
        }
        
        await login(username,password);
    }

    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <KeyboardAvoidingView behavior ={Platform.OS == 'ios'? 'padding':'height'}>
                <View>
                    <Text>Welcome</Text>
                    <Text>Log in to continue</Text>
                    
                    <View>
                        <Text>Email</Text>
                        <TextInput
                            placeholder='Username'
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <View>
                        <Text>Password</Text>
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
                        <Text>{isLoading? 'Logging In': 'Log In'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                        <Text>Don't have an account? <Text style={{fontWeight:'bold', color:'#007AFF'}}>Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
import { useContext, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
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
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.bg}}>
            <KeyboardAvoidingView behavior ={Platform.OS == 'ios'? 'padding':'height'} style={{flex:1}}>
                <View style={styles.container}>
                    <Text style={styles.mainText}>Welcome</Text>
                    <Text style={styles.subText}>Log in to continue</Text>
                    
                    <View>
                        <Text style={styles.inputHeader}>Username</Text>
                        <TextInput
                            placeholder='Username'
                            value={username}
                            onChangeText={setUsername}
                            style={styles.inputField}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputHeader}>Password</Text>
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            style={styles.inputField}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} disabled={isLoading} onPress={handleLogin}>
                        <Text style={styles.login}>{isLoading ? 'Logging In' : 'Login'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                        <Text style={styles.footer}>Don't have an account? 
                            <Text style={{fontWeight:'bold', color:colors.primary}}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:50,
        backgroundColor: colors.card,
        color: colors.text,
        borderRadius: 5
    },
    mainText:{
        fontSize:45,
        alignSelf:'center',
        fontWeight:'bold'
    },
    subText:{
        fontSize:14,
        alignSelf:'center',
        fontWeight:'400',
        paddingBottom:40,
        color: colors.muted
    },
    inputHeader:{
        fontWeight:'500',
        fontSize:15
    },
    inputField:{
        borderWidth:1,
        borderColor:colors.card_border_swatch,
        borderRadius:5,
        backgroundColor:colors.bg,
        marginVertical:5,
        marginBottom:20,
    },
    button:{
        alignItems:'center',
        backgroundColor:colors.primary,
        borderRadius:5,
        padding:10,
        margin:15,
        width:'100%',
        alignSelf:'center'
    },
    login:{
        alignSelf:'center',
        fontSize:18,
        fontWeight:'600',
        color: colors.card
    },
    footer:{
        alignSelf:'center',
        fontStyle:'italic',
        fontSize:12,
        color: colors.muted
    }

})
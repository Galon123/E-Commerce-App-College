import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'
import colors from '../../constants/colors'
import api from '../../services/api'


//Config
const COLLEGE_DOMAIN = '@gectcr.ac.in'

//Validation
const registerSchema = z.object({
    fullName:z.string().min(2,'Name is too Short'),
    email:z.email('Invalid Email').refine(
        (val) => val.endsWith(COLLEGE_DOMAIN),
        {message:"Must be a GECT Student Email"}
    ),
    phone_no:z.string().min(10),
    password:z.string().min(8,"Password is too Short"),
    confirmPassword:z.string().min(8)
}).refine((data)=>data.password === data.confirmPassword,
    {
        message: "Password do not match",
        path:["confirmPassword"]
    }
)


export default function RegisterScreen({ navigation }){
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState :{errors}} = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onRegister = async(data) =>{
        setIsLoading(true);
        try{
            
            await api.post("/register",{
                username: data.fullName,
                email: data.email,
                password: data.password,
                phone_no: data.phone_no,
                confirm_password: data.confirmPassword
            })
            Alert.alert("Registered Successfully")
        }
        catch (error) {
            if (error.response) {
                // 👇 THIS IS THE KEY LINE. Look at your terminal/Metro logs for this!
                console.log("Validation Error Details:", JSON.stringify(error.response.data, null, 2));
        
                // Show the specific error to the user
                const serverMsg = error.response.data.detail || "Invalid inputs";
                // If detail is an array (FastAPI default), verify specific field
                const displayMsg = Array.isArray(serverMsg) ? serverMsg[0].msg : serverMsg;
        
                Alert.alert("Registration Failed", JSON.stringify(displayMsg));
            } else {
                console.log(error);
                Alert.alert("Error", "Network Error");
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.bg}}>
            <Pressable style={{flex:1}}>
              <KeyboardAvoidingView
              behavior={Platform.OS == 'ios'? "padding":"height" }
              style={styles.card}
              >
                <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}} showsVerticalScrollIndicator={false}>
                    <Image source={require('../../../assets/Logo.png')}
                        style={styles.logo}
                    />
                    <Text style ={styles.headerText}>Create an Account</Text>
                    <View>
                        <Text style={styles.inputHeader}>Username</Text>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({field:{onChange,value}})=>(
                                <TextInput
                                    placeholder='Username'
                                    value={value}
                                    onChangeText={onChange}
                                    style = {styles.inputField}
                                />
                            )}
                        />
                        <Text>{errors.fullName && <Text>{errors.fullname.message}</Text>}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputHeader}>E-mail</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({field:{onChange,value}})=>(
                                <TextInput
                                    placeholder='placeholder@gectcr.ac.in'
                                    value={value}
                                    onChangeText={onChange}
                                    style = {styles.inputField}
                                />
                            )}
                        />
                        <Text>{errors.email && <Text>{errors.email.message}</Text>}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputHeader}>Phone Number</Text>
                        <Controller
                            control={control}
                            name="phone_no"
                            render={({field:{onChange,value}})=>(
                                <TextInput
                                    placeholder='9023948576'
                                    value={value}
                                    onChangeText={onChange}
                                    style = {styles.inputField}
                                />
                            )}
                        />
                        <Text>{errors.phone_no && <Text>{errors.phone_no.message}</Text>}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputHeader}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({field:{onChange,value}})=>(
                                <TextInput
                                    placeholder='Password@123'
                                    value={value}
                                    onChangeText={onChange}
                                    style = {styles.inputField}
                                />
                            )}
                        />
                        <Text>{errors.password && <Text>{errors.password.message}</Text>}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputHeader}>Confirm Password</Text>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({field:{onChange,value}})=>(
                                <TextInput
                                    placeholder='Password@123'
                                    value={value}
                                    onChangeText={onChange}
                                    style = {styles.inputField}
                                />
                            )}
                        />
                        <Text>{errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}</Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={handleSubmit(onRegister)}
                        disabled={isLoading}
                        style={styles.button}
                    >
                        <Text style={styles.register}>{isLoading? 'Submitting' : 'Register'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>navigation.navigate("Login")}
                    >
                        <Text style={styles.footer}>Already have an Account? <Text style={{fontWeight:'bold', color:'#007AFF'}}>Log In</Text></Text>
                    </TouchableOpacity>

                </ScrollView>
              </KeyboardAvoidingView>
            </Pressable>  
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    card:{
        flex:1,
        height:'80%',
        width:'100%',
        marginVertical:25,
        padding:20
    },
    logo:{
        width:80,
        height:80,
        alignSelf:'center'
    },
    headerText:{
        alignSelf:'center',
        fontSize:28,
        fontWeight:'bold',
        fontStyle:'normal',
        margin:10,
        color:colors.text
    },
    inputHeader:{
        fontWeight:'500',
        fontSize:15,
        marginVertical:5,
        color:colors.text
    },
    inputField:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:5,
        backgroundColor:'#f0f0f0'
    },
    button:{
        alignItems:'center',
        backgroundColor:colors.Green,
        borderRadius:5,
        borderWidth:1,
        borderColor:colors.Charcoal,
        padding:5,
        margin:5,
        width:'55%',
        alignSelf:'center'
    },
    register:{
        fontSize:18,
        fontWeight:'600',
        color:colors.text
    },
    footer:{
        alignSelf:'center',
        fontStyle:'italic',
        fontSize:14,
        color:colors.text
    }
})
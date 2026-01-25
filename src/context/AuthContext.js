import { createContext, useEffect, useState } from "react";
import api from "../services/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const checkLoggedIn = async()=>{

        setIsLoading(true);
        try{
            const response = await api.get("/username");
            setUser(response.data)
        }
        catch(error){
            console.log("Not Logged in");
            setUser(null);
        }
        finally{
            setIsLoading(false);
        }
    }

    //Calls Once during App Startup
    useEffect(()=>{
        checkLoggedIn();
    },[])

    const login = async(username,password) =>{
        setIsLoading(true);

        try{

            const formData = new URLSearchParams();

            formData.append("username",username);
            formData.append("password",password);
            
            const response=await api.post("/login",formData.toString(),{
                headers : { 'Content-Type' : 'application/x-www-form-urlencoded'}
            })

            console.log("Login Response:", response.data);
            
            await checkLoggedIn();
        }
        catch(error){
            console.log("Login Failed ",error);
        }
        finally{
            setIsLoading(false);
        }

    }

    const logout = async()=>{
        setIsLoading(true);
        try{
            await api.post("/logout");
            console.log("Logged Out Successfully");
            setUser(null);
        }
        catch(error){
            console.log(error);
            //Force Logout
            setUser(null);
        }
        finally{
            setIsLoading(false);
        }
    }
    

    return(
        <AuthContext.Provider value={{login, logout, isLoading, user}}>
            { children }
        </AuthContext.Provider>
    )
}
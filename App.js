import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";


export default function App(){


    return(
        <SafeAreaProvider>

            <AuthProvider>

               <AppNav/>

            </AuthProvider>

        </SafeAreaProvider>
    )
}
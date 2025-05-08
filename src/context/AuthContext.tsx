import { useRouter, SplashScreen } from "expo-router";
import { useContext, PropsWithChildren, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync()

type AuthState = {
    isLoggedIn: boolean,
    isReady: boolean,
    logIn: () => void,
    logOut: () => void
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => {},
    logOut: () => {}
});

const storeAuthState = async(newState: { isLoggedIn : boolean}) => {
    try{
        await AsyncStorage.setItem("auth-token", JSON.stringify(newState));
    }catch(error){
        console.log("Failed to Store, ", error);
    }
};

export function AuthProvider({ children } : PropsWithChildren){
    const [ isReady, setIsReady ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const router = useRouter();
    
    const logIn = () => {
        setIsLoggedIn(true);
        storeAuthState({isLoggedIn: true});
        router.replace('/');
    }

    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState({ isLoggedIn: false});
        router.replace('/signIn');
    }
    
    useEffect(() => {
        if (isReady){
            SplashScreen.hideAsync();
        }
    }, [isReady])

    useEffect(() => {
        const getAuthFromStorage = async () => {
            //Simulate delay
            await new Promise((res) => setTimeout(() => res(null), 1000));
            try{
                const value = await AsyncStorage.getItem("auth-token");
                if ( value !== null ){
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                } 
            }catch(error){
                console.log("Failed to Fetch, ", error);
            }
            setIsReady(true);
        };
        getAuthFromStorage();
    }, [])
    

    return (
        <AuthContext.Provider value ={{ isReady, isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}
import { useRouter, SplashScreen } from "expo-router";
import { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync()

type AuthState = {
    isLoggedIn: boolean,
    isReady: boolean,
    user : IUser | null,
    logIn: ( User : IUser) => void,
    logOut: () => void
}

interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    devices?: number[]
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    logIn: ( ) => {},
    logOut: () => {}
});

const storeAuthState = async(newState: { isLoggedIn : boolean}) => {
    try{
        await AsyncStorage.setItem("auth-state", JSON.stringify(newState));
    }catch(error){
        console.log("Failed to Store, ", error);
    }
};

export function AuthProvider({ children } : PropsWithChildren){
    const [ isReady, setIsReady ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState<IUser | null>(null);
    const router = useRouter();
    
    const logIn = async ( User : IUser) => {
        setIsLoggedIn(true);
        await setUser(User);
        console.log(user);
        storeAuthState({isLoggedIn: true});
        router.replace('/');
    }

    const logOut = () => {
        setIsLoggedIn(false);
        setUser(null);
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
        <AuthContext.Provider value ={{ isReady, isLoggedIn, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const authUser = () => useContext(AuthContext).user;
import { useRouter, SplashScreen } from "expo-router";
import { PropsWithChildren, createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync()

type AuthState = {
    isLoggedIn: boolean,
    isReady: boolean,
    user : IUser | null,
    logIn: ( user?: IUser | null) => void,
    logOut: () => void
}

interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    devices?: string[]
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    user: null,
    logIn: () => {},
    logOut: () => {}
});

const storeAuthState = async(newState: { isLoggedIn : boolean, user?: IUser | null}) => {
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
    
    const logIn = async ( userParam?: IUser | null) => {
        setIsLoggedIn(true);
        setUser(userParam ?? null);
        console.log('Logged in user:', userParam ?? null);
        await storeAuthState({isLoggedIn: true, user: userParam ?? null});
        router.replace('/');
    }

    const logOut = () => {
        setIsLoggedIn(false);
        setUser(null);
        storeAuthState({ isLoggedIn: false, user: null});
        router.replace('/signIn');
    }
    
    useEffect(() => {
        if (isReady){
            SplashScreen.hideAsync();
        }
    }, [isReady])

    useEffect(() => {
        const getAuthFromStorage = async () => {
            try {
                const value = await AsyncStorage.getItem("auth-state");
                if (value !== null) {
                    const auth = JSON.parse(value);
                    
                    // Validate the stored auth data
                    if (auth.user && 
                        typeof auth.user.id === 'string' && 
                        auth.user.name && 
                        auth.user.email) {
                        
                        console.log('Restoring auth state for user:', auth.user.name);
                        setIsLoggedIn(true);
                        setUser(auth.user);
                        
                        // Redirect to home if logged in
                        if (auth.isLoggedIn) {
                            router.replace('/');
                        }
                    } else {
                        // Invalid stored data, clear it
                        await AsyncStorage.removeItem("auth-state");
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Failed to restore auth state:", error);
                // On error, clear the stored state
                await AsyncStorage.removeItem("auth-state");
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsReady(true);
                SplashScreen.hideAsync();
            }
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
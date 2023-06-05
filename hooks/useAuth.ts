import { AuthenticationContext } from "@/pages/context/AuthContext";
import axios from "axios"
import { useContext } from "react";
import {removeCookies} from "cookies-next";


const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext)
    const signIn = async ({email, password}: {email: string; password: string}, handleClose: () => void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        }) 
        try {
           const response = await axios.post("http://localhost:3000/api/auth/signin", {
                email,
                password, 
            })
            console.log(response);
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            });
            handleClose(); 
        } catch (error : any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            }) 
        }
    }
    const signUp = async ({
        email,
        password,
        firstName,
        lastName,
        city,
        phone
    }: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        city: string;
        phone: string;
    },
    handleClose: () => void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        }) 
        try {
           const response = await axios.post("http://localhost:3000/api/auth/signup", {
                email,
                password, 
                firstName,
                lastName,
                city,
                phone
            })
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            });
            handleClose(); 
        } catch (error : any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            }) 
        }
    };


    const signOut = () => {
        removeCookies("jwt");
        
        setAuthState({
            data: null,
            loading: false,
            error: null,
        })
    }

    return {
        signIn, signUp, signOut
    }
}

export default useAuth;
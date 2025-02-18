import { useState } from "react";
import AuthModel from "../models/authModel";

interface LoginCreds {
    email: string;
    password: string;
}

interface RegisterCreds {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const LoginViewModel = () =>{
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (creds: LoginCreds) => {
        setLoading(true);
        setError('');
        try {
            const data = await AuthModel.login<LoginCreds, any>(creds);
            console.log(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, login };
}

export const SignupViewModel = () =>{
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (creds: RegisterCreds) => {
        setLoading(true);
        setError('');
        try {
            const data = await AuthModel.login<RegisterCreds, any>(creds);
            console.log(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, login };
}
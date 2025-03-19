import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode'

export const AuthContext = React.createContext<any | false>(false);

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [user, setUser] = React.useState<any | false>(false);

    useEffect(() => {
        const getUser = async () => {
            const stored = await SecureStore.getItemAsync(`user`);
            if (null === stored) setUser(false);
            else setUser(JSON.parse(stored));
        }
        getUser()
    }, []);

    const login = async (email: string, password: string) => {
        return fetch('https://ayamku.leadmatix.net:3001/auth/login', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                const { message, access_token, refresh_token } = data;
                if (access_token) {
                    const userData = { ...jwtDecode(access_token), refresh_token };
                    await SecureStore.setItemAsync(`user`, JSON.stringify(userData));
                    setUser(userData);
                }
                return { message };
            })
            .catch(error => {
                const { message } = error;
                return { message };
            });
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(`user`);
        setUser(false);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
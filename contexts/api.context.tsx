import { createContext, ReactNode, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';

const secureStorageKey = `user`;
export const ApiContext = createContext({
    isLoggedIn: false,
    authenticate: (userData: any | null) => { },
    apiGet: (url: string): Promise<any> | void => { },
    apiPost: (url: string, body: any): any => { },
    apiPut: (url: string, body: any): any => { }
})

export function ApiContextProvider({ children }: { children: ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLoggedInUserFromStorage() {
            setIsLoggedIn(`` !== await getAccessToken());
        }
        checkLoggedInUserFromStorage();
    }, []);

    async function authenticate(userData: any | null) {
        if (null == userData) {
            await SecureStore.deleteItemAsync(secureStorageKey);
            setIsLoggedIn(false);
        } else {
            await SecureStore.setItemAsync(secureStorageKey, JSON.stringify(userData));
            setIsLoggedIn(true);
        }
    }

    async function getAccessToken() {
        const stored = await SecureStore.getItemAsync(secureStorageKey);
        if (null === stored) return ``
        else {
            const { access_token } = JSON.parse(stored);
            return access_token;
        }
    }

    async function refreshToken() {
        const stored = await SecureStore.getItemAsync(secureStorageKey);
        if (null === stored) return false;
        const user = JSON.parse(stored);
        const { refresh_token } = user;
        return fetch(`https://ayamku.leadmatix.net:3001/auth/refresh`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${refresh_token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json();
            })
            .then(async (json) => {
                const { access_token, refresh_token } = json;
                await authenticate({ ...user, access_token, refresh_token });
                return true;
            })
            .catch(error => {
                return error;
            });
    }

    async function apiGet(url: string): Promise<any> {
        const access_token = await getAccessToken();
        return await fetch(`https://ayamku.leadmatix.net:3001${url}`, {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(async (response) => {
                const json = await response.json();
                const { message } = json;
                if (message && `Unauthorized` === message) {
                    await refreshToken();
                    return await apiGet(url);
                } else return json;
            })
            .catch(error => {
                return error;
            });
    }

    async function apiPost(url: string, body: any) {
        const access_token = await getAccessToken();
        return fetch(`https://ayamku.leadmatix.net:3001${url}`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(async (response) => {
                const json = await response.json();
                const { message } = json;
                if (message && `Unauthorized` === message) {
                    await refreshToken();
                    return await apiGet(url);
                } else return json;
            })
            .catch(error => {
                return error;
            });
    }

    async function apiPut(url: string, body: any) {
        const access_token = await getAccessToken();
        return fetch(`https://ayamku.leadmatix.net:3001${url}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(async (response) => {
                const json = await response.json();
                const { message } = json;
                if (message && `Unauthorized` === message) {
                    await refreshToken();
                    return await apiGet(url);
                } else return json;
            })
            .catch(error => {
                return error;
            });
    }

    return (
        <ApiContext.Provider value={{ isLoggedIn, authenticate, apiGet, apiPost, apiPut }}>
            {children}
        </ApiContext.Provider>
    );
}
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode'

export async function getUser() {
    const str = await SecureStore.getItemAsync(`user`);
    return null === str ? null : JSON.parse(str);
}

export async function login(email: string, password: string): Promise<any> {
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
                const user = { ...jwtDecode(access_token), refresh_token }
                await SecureStore.setItemAsync(`user`, JSON.stringify(user));
            }
            return { message };
        })
        .catch(error => {
            const { message } = error;
            return { message };
        });

}

export async function logout() {
    return await SecureStore.deleteItemAsync(`user`);
}
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode'

async function getCurrentUser() {
    return await SecureStore.getItemAsync('user');
}

function postLogin(email: string, password: string) {
    fetch('https://ayamku.leadmatix.net:3001/auth/login', {
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
            const { message, access_token, refresh_token } = data
            if (message) {
                Alert.alert(
                    'Login Failed',
                    Array.isArray(message) ? message[0] : message,
                    [{
                        text: 'OK',
                        style: 'cancel'
                    }]
                );
            } else {
                const user = { ...jwtDecode(access_token), refresh_token }
                await SecureStore.setItemAsync('user', JSON.stringify(user));
            }
        })
        .catch(error => console.error('Login failed:', error));
}

async function postLogout() {
    await SecureStore.deleteItemAsync('user');
}

export { getCurrentUser, postLogin, postLogout }
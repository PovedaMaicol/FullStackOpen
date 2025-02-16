import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace
    }

    // get the access token for the storage
    async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`)
    return token ? JSON.parse(token) : null;

    }
    // Add the access token to the storage
    async setAccessToken(token) {
        if(!token) {
            throw new Error('Token required');
        }
    
    await AsyncStorage.setItem(`${this.namespace}:token`, JSON.stringify(token));
    console.log(AsyncStorage)
    }

    async removeAccessToken() {
    // remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`)
    }
}



export default AuthStorage;




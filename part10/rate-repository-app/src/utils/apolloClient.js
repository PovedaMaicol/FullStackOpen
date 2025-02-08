import { ApolloClient, InMemoryCache } from '@apollo/client';
import {BASE_URL_GRAPHQL} from '@env'

const createApolloClient = (authStorage) => {
    console.log('el server de apolo accede a la direccion:', BASE_URL_GRAPHQL)
    return new ApolloClient({

        request: async (operation) => {
            try {
                const accessToken = await authStorage.getAccessToken();
                operation.setContext({
                    headers: {
                        authorization: accessToken ? `Bearer ${accessToken}` : '',
                    }
                })
            } catch (e) {
                console.log(e)
            }

        },
       
        uri: `${BASE_URL_GRAPHQL}/graphql`,
        
        cache: new InMemoryCache(),
    });
}

export default createApolloClient;
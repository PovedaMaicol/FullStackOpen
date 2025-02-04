import { ApolloClient, InMemoryCache } from '@apollo/client';
import {BASE_URL_GRAPHQL} from '@env'

const createApolloClient = () => {
    // console.log('el server de apolo accede a la direccion:', BASE_URL_GRAPHQL)
    return new ApolloClient({
       
        uri: `${BASE_URL_GRAPHQL}/graphql`,
        
        cache: new InMemoryCache(),
    });
}

export default createApolloClient;
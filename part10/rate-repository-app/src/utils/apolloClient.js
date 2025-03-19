import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {BASE_URL_GRAPHQL} from '@env'

const createApolloClient = (authStorage) => {
    console.log('el server de apolo accede a la direccion:', BASE_URL_GRAPHQL)

    //setting link HTTP
    const httpLink = createHttpLink({
        uri: `${BASE_URL_GRAPHQL}`,
    });

  // Configura el enlace de autenticación
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return { headers };
    }
  });

    return new ApolloClient({
        link: authLink.concat(httpLink),        
        cache: new InMemoryCache(),
        credentials: 'include',
          onError: ({ networkError, graphQLErrors }) => {
    if (networkError) console.error('Network Error:', networkError);
    if (graphQLErrors) console.error('GraphQL Errors:', graphQLErrors);
          }
    });
}

export default createApolloClient;
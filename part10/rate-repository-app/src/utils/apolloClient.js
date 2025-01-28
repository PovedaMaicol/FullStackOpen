import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'http://http://192.168.101.19:5000/graphql',
    });
}

export default createApolloClient;
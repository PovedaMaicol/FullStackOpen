import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

// obtencion respositorios con apollo client - graphql
const useRepositoriesGQL = ({ orderBy= 'CREATED_AT', orderDirection= 'DESC', searchKeyword}) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, { 
        variables: { orderBy, orderDirection, searchKeyword},
        fetchPolicy: 'cache-and-network' });

    if (loading) return { repositories: [], loading };
    if (error) { 
        console.error('error en useRepositoriesGQL', error);
        return { repositories: [], error };

    }
  

    return { repositories: data?.repositories || [], loading,};

}

export default useRepositoriesGQL;
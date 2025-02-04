import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

// obtencion respositorios con apollo client - graphql
const useRepositoriesGQL = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });

    if (loading) return { repositories: [], loading };
    if (error) { 
        console.error('error en useRepositoriesGQL', error);
        return { repositories: [], error };

    }
  

    return { repositories: data?.repositories || [], loading,};

}

export default useRepositoriesGQL;
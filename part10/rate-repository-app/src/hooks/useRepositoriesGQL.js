import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

// obtencion respositorios con apollo client - graphql
const useRepositoriesGQL = ({  orderBy= 'CREATED_AT', orderDirection= 'DESC', searchKeyword}) => {
    
    const variables = {
        
        orderBy,
        orderDirection,
        searchKeyword,
    }

    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { 
        variables,
        fetchPolicy: 'cache-and-network' });

        
        if (loading) return { repositories: [], loading };
        if (error) { 
            console.error('error en useRepositoriesGQL', error);
            return { repositories: [], error };
    
        }
    

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;
    
        if (!canFetchMore) return;
    
            fetchMore({
                variables: {
                    ...variables,
                    after: data.repositories.pageInfo.endCursor,
                   
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previousResult;
                  
                    return {
                      repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                          ...previousResult.repositories.edges,
                          ...fetchMoreResult.repositories.edges, // ✅ Añade solo los nuevos edges
                        ],
                        pageInfo: fetchMoreResult.repositories.pageInfo, // ✅ Actualiza correctamente pageInfo
                      },
                    };
                  }
            })
    
        }
      

    return { 
        repositories: data ? data.repositories : undefined, 
        fetchMore: handleFetchMore,
        loading,
        error,
        ...result,
    };

}

export default useRepositoriesGQL;
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useReviews = () => {
    const {data, loading, fetchMore, refetch} = useQuery(ME, {
        variables: { includeReviews: true, first: 10},
        fetchPolicy: 'cache-and-network'
    })

    const handleFetchMore = () => {
        if (data?.me?.reviews?.hasNextPage) {
            fetchMore({
                variables: {
                after: data.me.reviews.pageInfo.endCursor,
                includeReviews: true,
                first: 10,
                }
            })
        }
    }

    return {
        reviews: data?.me?.reviews?.edges?.map(edge => edge.node) || [],
        loading,
        fetchMore: handleFetchMore,
        refetch,
    }
}

export default useReviews;
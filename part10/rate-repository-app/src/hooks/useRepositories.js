import { useState, useEffect } from "react";
import {BASE_URL} from '@env'

// obtencion repositorios HTTP
const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/repositories`);
        const json = await response.json();

        setLoading(false);
        setRepositories(json);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;

// obtencion respositorios con apollo client - graphql


// const useRepositoriesGql = () => {
//     const { data, error, loading } = useQuery(GET_REPOSITORIES);

//     console.log('en data viene', data)
//     // Transforma los datos si es necesario
//     // const repositories = data ? data.repositories : [];

//     return { repositories, loading, error };
// }

// export default useRepositoriesGql;

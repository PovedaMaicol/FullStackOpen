import { useState, useEffect } from "react";
import {BASE_URL} from '@env'


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
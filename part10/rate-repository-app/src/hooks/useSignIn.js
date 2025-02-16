import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATION } from "../graphql/mutations";
import { useContext } from "react";

import { useNavigate } from "react-router-native";
import AuthStorageContext from "../context/AuthStorageContext";


const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient()
    const navigate = useNavigate();
    const [mutate, result] = useMutation(AUTHENTICATION);

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    
                        username,
                        password,
                },
            });
            

            //almacenar el token de acceso
            await authStorage.setAccessToken(data.authenticate.accessToken)

            //restablecer la tienda de apollo
            await apolloClient.resetStore()

            //redirigir al usuario a la vista de repositorios
            navigate("/");

            return data;
        } catch (error) {
            console.error("Wrong to login:", error)
            throw error;

        }
    }
    return [signIn, result]
}
export default useSignIn;
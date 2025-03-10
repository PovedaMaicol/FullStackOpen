import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATION } from "../graphql/mutations";
import { useContext } from "react";
import { useNavigate } from "react-router-native";
import AuthStorageContext from "../context/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [mutate, { data, loading, error }] = useMutation(AUTHENTICATION);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          username,
          password,
        },
      });

      // Almacenar el token de acceso
      await authStorage.setAccessToken(data.authenticate.accessToken);

      // Restablecer la tienda de Apollo
      await apolloClient.resetStore();

      // Redirigir al usuario a la vista de repositorios
      navigate("/");

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { signIn, loading, error, data };
};

export default useSignIn;

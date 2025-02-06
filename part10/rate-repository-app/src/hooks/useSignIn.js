import { useMutation } from "@apollo/client";
import { AUTHENTICATION } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATION);

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    
                        username,
                        password
                    ,
                },
            });
            return data;
        } catch (error) {
            console.error("Wrong to login:", error)
            throw error;

        }
    }
    return [signIn, result]
}
export default useSignIn;
import { setAuthToken } from "@/services/config/api";
import { useAuth } from "@clerk/clerk-expo";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

export function useAuthMutation<
	TData,
	TVariables,
	TError = unknown,
	TContext = unknown,
>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	options?: Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		"mutationFn"
	>,
) {
	const { getToken, isSignedIn } = useAuth();

	return useMutation({
		mutationFn: async (variables: TVariables) => {
			// Set token before mutation
			if (isSignedIn) {
				const token = await getToken();
				if (token) {
					setAuthToken(token);
				}
			}
			return mutationFn(variables);
		},
		...options,
	});
}

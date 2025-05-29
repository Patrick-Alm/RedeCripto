import { setAuthToken } from "@/services/config/api";
import { useAuth } from "@clerk/clerk-expo";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useAuthQuery<TData, TError = unknown>(
	queryKey: unknown[],
	queryFn: () => Promise<TData>,
	options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">,
) {
	const { getToken, isSignedIn } = useAuth();

	return useQuery({
		queryKey,
		queryFn: async () => {
			if (isSignedIn) {
				const token = await getToken();
				if (token) {
					setAuthToken(token);
				}
			}
			return queryFn();
		},
		...options,
		enabled: isSignedIn && options?.enabled !== false,
	});
}

import { type WalletPayload, createWallet } from "@/services/wallet";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthMutation } from "../auth/use-auth-mutation";

export const useCreateWallet = () => {
	const queryClient = useQueryClient();

	return useAuthMutation((data: WalletPayload) => createWallet(data), {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		},
	});
};

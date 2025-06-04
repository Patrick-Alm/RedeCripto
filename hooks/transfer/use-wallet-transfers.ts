import { getWalletTransfers } from "@/services/transfer";
import { useAuthQuery } from "../auth/use-auth-query";

export const useWalletTransfers = (walletId: number) => {
	return useAuthQuery(
		["wallet-transfers", walletId],
		() => (walletId ? getWalletTransfers(walletId) : Promise.resolve([])),
		{
			enabled: !!walletId,
		},
	);
};

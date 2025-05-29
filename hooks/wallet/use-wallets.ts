import { getWallets } from "@/services/wallet";
import { useAuthQuery } from "../auth/use-auth-query";

export const useWallets = () => {
	return useAuthQuery(["wallets"], getWallets);
};

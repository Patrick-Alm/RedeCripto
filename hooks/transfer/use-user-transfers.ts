import { getUserTransfers } from "@/services/transfer";
import { useAuthQuery } from "../auth/use-auth-query";

export const useUsersTransfers = () => {
	return useAuthQuery(["user-transfers"], () => getUserTransfers(), {
		enabled: true,
	});
};

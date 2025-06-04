import api from "../config/api";
import type { Transfer } from "./types";

export const getWalletTransfers = async (
	walletId: number,
): Promise<Transfer[]> => {
	const res = await api.get(`/transfers/wallet/${walletId}`);

	return res.data;
};

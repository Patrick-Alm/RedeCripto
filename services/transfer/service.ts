import api from "../config/api";
import type { Transfer } from "./types";

export const getWalletTransfers = async (
	walletId: number,
): Promise<Transfer[]> => {
	const res = await api.get(`/transfers/wallet/${walletId}`);

	return res.data;
};

export const getUserTransfers = async (): Promise<Transfer[]> => {
	const res = await api.get("/transfers/user");

	return res.data;
};

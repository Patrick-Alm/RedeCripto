import api from "../config/api";
import type { Wallet, WalletPayload } from "./types";

export const createWallet = async (data: WalletPayload) => {
	const res = await api.post("/wallets", data);
	return res.data;
};

export const getWallets = async (): Promise<Wallet[]> => {
	const res = await api.get("/wallets");
	return res.data;
};

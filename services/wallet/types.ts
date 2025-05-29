export interface WalletPayload {
	name: string;
	network: string;
	address: string;
}

export interface Wallet extends WalletPayload {
	id: string;
	createdAt: string;
	updatedAt: string;
}

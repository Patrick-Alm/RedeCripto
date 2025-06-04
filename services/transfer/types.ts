export interface Transfer {
	id: number;
	blockNum: string | null;
	uniqueId: string;
	hash: string | null;
	from: string | null;
	to: string | null;
	value: string;
	tokenId: string | null;
	asset: string | null;
	category: string | null;
	walletId: number | null;
	direction: string | null;
	createdAt: string;
	updatedAt: string;
}

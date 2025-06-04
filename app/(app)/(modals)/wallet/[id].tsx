import { useWalletTransfers } from "@/hooks/transfer/use-wallet-transfers";
import type { Transfer } from "@/services/transfer";
import { appStyles } from "@/styles/appStyles";
import { walletDetailStyles } from "@/styles/walletDetailStyles";
import { formatAddress } from "@/utils/format-address";
import { formatValue } from "@/utils/format-value";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {} from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletTransfersModal() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const {
		data: transfers,
		isLoading,
		error,
		refetch,
	} = useWalletTransfers(Number(id));

	const renderTransferItem = ({ item }: { item: Transfer }) => (
		<View
			style={[
				walletDetailStyles.transferItem,
				item.direction === "RECEIVED"
					? walletDetailStyles.incomingTransfer
					: walletDetailStyles.outgoingTransfer,
			]}
		>
			<View style={walletDetailStyles.transferDetails}>
				<View style={walletDetailStyles.transferType}>
					<MaterialCommunityIcons
						name={item.direction === "RECEIVED" ? "arrow-down" : "arrow-up"}
						size={24}
						color={item.direction === "RECEIVED" ? "#4CAF50" : "#F44336"}
					/>
				</View>

				<View style={walletDetailStyles.transferInfo}>
					<Text style={walletDetailStyles.transferAmount}>
						{`${formatValue(item.value)} ${item.asset}`}
					</Text>
					<Text style={walletDetailStyles.transferAddress}>
						{item.direction === "RECEIVED"
							? `De: ${formatAddress(item.from!)}`
							: `Para: ${formatAddress(item.to!)}`}
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={appStyles.container}>
			<View style={walletDetailStyles.modalContent}>
				<View style={walletDetailStyles.header}>
					{/* <Text style={walletDetailStyles.title}>{walletName}</Text> */}
					<TouchableOpacity
						onPress={() => router.back()}
						style={walletDetailStyles.closeButton}
					>
						<MaterialCommunityIcons name="close" size={24} color="#FFF" />
					</TouchableOpacity>
				</View>

				<Text style={walletDetailStyles.subtitle}>
					Histórico de Transferências
				</Text>

				{isLoading ? (
					<View style={walletDetailStyles.loadingContainer}>
						<ActivityIndicator size="large" color="#3A5AFF" />
						<Text style={walletDetailStyles.loadingText}>
							Carregando transferências...
						</Text>
					</View>
				) : error ? (
					<View style={walletDetailStyles.errorContainer}>
						<MaterialCommunityIcons
							name="alert-circle-outline"
							size={48}
							color="#F44336"
						/>
						<Text style={walletDetailStyles.errorText}>
							Erro ao carregar transferências
						</Text>
						<TouchableOpacity
							style={walletDetailStyles.retryButton}
							onPress={() => refetch()}
						>
							<Text style={walletDetailStyles.retryButtonText}>
								Tentar novamente
							</Text>
						</TouchableOpacity>
					</View>
				) : transfers && transfers.length > 0 ? (
					<FlatList
						data={transfers}
						renderItem={renderTransferItem}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={walletDetailStyles.transfersList}
						showsVerticalScrollIndicator={false}
						refreshing={isLoading}
						onRefresh={refetch}
					/>
				) : (
					<View style={walletDetailStyles.emptyContainer}>
						<MaterialCommunityIcons
							name="swap-horizontal"
							size={48}
							color="#666"
						/>
						<Text style={walletDetailStyles.emptyText}>
							Nenhuma transferência encontrada
						</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

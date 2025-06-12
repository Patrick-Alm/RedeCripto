import { useUsersTransfers } from "@/hooks/transfer/use-user-transfers";
import type { Transfer } from "@/services/transfer";
import { appStyles } from "@/styles/appStyles";
import { rootStyles } from "@/styles/rootStyles";
import { walletDetailStyles } from "@/styles/walletDetailStyles";
import { formatAddress } from "@/utils/format-address";
import { formatValue } from "@/utils/format-value";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ActivityScreen() {
	const { data: transfers, isLoading, error, refetch } = useUsersTransfers();

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
						{`De: ${formatAddress(item.from!)}`}
					</Text>
					<Text style={walletDetailStyles.transferAddress}>
						{`Para: ${formatAddress(item.to!)}`}
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={rootStyles.container}>
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
					style={appStyles.container}
					ListHeaderComponent={
						<View style={appStyles.header}>
							<Text style={appStyles.title}>Atividade de Transferências</Text>
						</View>
					}
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
		</SafeAreaView>
	);
}

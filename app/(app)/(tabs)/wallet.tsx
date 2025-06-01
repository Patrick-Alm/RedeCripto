import { useWallets } from "@/hooks/wallet/use-wallets";
import type { Wallet } from "@/services/wallet/types";
import { appStyles } from "@/styles/appStyles";
import { walletStyles } from "@/styles/walletStyles";
import { formatAddress } from "@/utils/format-address";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletsScreen() {
	const router = useRouter();
	const { data: wallets, isLoading, error, refetch } = useWallets();

	const handleAddWallet = () => {
		router.push("/(app)/(modals)/add-wallet");
	};

	const networksMap: Record<string, string> = {
		"eth-mainnet": "Ethereum",
		"polygon-mainnet": "Polygon",
		"solana-mainnet": "Solana",
		"bnb-mainnet": "Binance Smart Chain",
	};

	const renderWalletItem = ({ item }: { item: Wallet }) => (
		<TouchableOpacity
			style={walletStyles.card}
			onPress={() => Alert.alert("Carteira", `Detalhes de ${item.name}`)}
		>
			<View style={walletStyles.info}>
				<Text style={walletStyles.name}>{item.name}</Text>
				<Text style={walletStyles.address}>{formatAddress(item.address)}</Text>
				<Text style={walletStyles.network}>
					{networksMap[item.network] ?? item.network}
				</Text>
			</View>
			<View style={walletStyles.balance}>
				{/* <Text style={walletStyles.balanceText}>
					{item.balance || "Carregando..."}
				</Text> */}
			</View>
		</TouchableOpacity>
	);

	if (isLoading) {
		return (
			<SafeAreaView style={appStyles.container}>
				<View style={walletStyles.loadingContainer}>
					<ActivityIndicator size="large" color="#555" />
					<Text style={walletStyles.loadingText}>Carregando carteiras...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={appStyles.container}>
				<View style={walletStyles.emptyState}>
					<MaterialCommunityIcons name="alert-circle" size={64} color="#555" />
					<Text style={walletStyles.emptyText}>Erro ao carregar carteiras</Text>
					<TouchableOpacity
						style={walletStyles.addButton}
						onPress={() => refetch()}
					>
						<Text style={walletStyles.addText}>Tentar novamente</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={appStyles.container}>
			<View style={walletStyles.header}>
				<Text style={appStyles.title}>Minhas Carteiras</Text>
				<TouchableOpacity
					style={walletStyles.addButton}
					onPress={handleAddWallet}
				>
					<MaterialCommunityIcons name="plus" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			{wallets && wallets.length > 0 ? (
				<FlatList
					data={wallets}
					renderItem={renderWalletItem}
					keyExtractor={(item, index) =>
						item.id ? item.id.toString() : `wallet-${index}`
					}
					style={walletStyles.list}
					refreshing={isLoading}
					onRefresh={refetch}
				/>
			) : (
				<View style={walletStyles.emptyState}>
					<MaterialCommunityIcons
						name="wallet-outline"
						size={64}
						color="#555"
					/>
					<Text style={walletStyles.emptyText}>
						Você ainda não tem carteiras cadastradas
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

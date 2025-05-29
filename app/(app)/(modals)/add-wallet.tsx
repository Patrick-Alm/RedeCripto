import { useCreateWallet } from "@/hooks/wallet/use-create-wallet";
import type { WalletPayload } from "@/services/wallet/types";
import { appStyles } from "@/styles/appStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddWalletScreen() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [network, setNetwork] = useState("Ethereum");
	const [showPicker, setShowPicker] = useState(false);

	const {
		mutate: createWallet,
		isPending: isCreating,
		error,
	} = useCreateWallet();

	const networkIcons: Record<string, string> = {
		Ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
		Bitcoin: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
		"Binance Smart Chain": "https://cryptologos.cc/logos/bnb-bnb-logo.png",
		Polygon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
		Solana: "https://cryptologos.cc/logos/solana-sol-logo.png",
	};

	const handleSubmit = () => {
		if (!name.trim()) {
			Alert.alert("Erro", "Por favor, digite o nome da carteira");
			return;
		}

		if (!address.trim()) {
			Alert.alert("Erro", "Por favor, digite o endereço da carteira");
			return;
		}

		const payload: WalletPayload = { name, network, address };

		createWallet(payload, {
			onSuccess: () => {
				Alert.alert("Sucesso", "Carteira adicionada!");
				router.push("/wallet");
			},
			onError: (err: any) => {
				Alert.alert(
					"Erro",
					err.message || "Não foi possível adicionar a carteira",
				);
			},
		});
	};

	const handleScanQR = () => {
		Alert.alert("Ação", "Aqui abriria a câmera para ler QR Code.");
	};

	return (
		<SafeAreaView style={appStyles.container}>
			<Text style={appStyles.title}>Adicionar Nova Carteira</Text>

			<Text style={styles.label}>Nome da Carteira</Text>
			<TextInput
				style={styles.input}
				placeholder="Minha carteira Ethereum"
				placeholderTextColor="#666"
				value={name}
				onChangeText={setName}
			/>

			<Text style={styles.label}>Rede</Text>
			<TouchableOpacity
				style={styles.pickerButton}
				onPress={() => setShowPicker(true)}
			>
				<Text style={styles.pickerButtonText}>{network}</Text>
				<MaterialCommunityIcons name="chevron-down" size={20} color="#AAA" />
			</TouchableOpacity>

			<Text style={styles.label}>Endereço da Carteira</Text>
			<View style={styles.row}>
				<TextInput
					style={[styles.input, { flex: 1 }]}
					placeholder={
						network === "Bitcoin"
							? "bc1..."
							: network === "Solana"
								? "HN7c..."
								: "0x..."
					}
					placeholderTextColor="#666"
					value={address}
					onChangeText={setAddress}
				/>
				<TouchableOpacity style={styles.scanButton} onPress={handleScanQR}>
					<MaterialCommunityIcons name="qrcode-scan" size={24} color="#555" />
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={handleSubmit}
				disabled={isCreating}
			>
				{isCreating ? (
					<ActivityIndicator color="#FFF" />
				) : (
					<Text style={styles.buttonText}>Adicionar Carteira</Text>
				)}
			</TouchableOpacity>
			{error && (
				<Text style={styles.errorText}>{(error as Error).message}</Text>
			)}

			{/* Ajuda */}
			<View style={{ marginTop: 16 }}>
				<Text style={styles.helpText}>
					Precisa de ajuda?{" "}
					<Text
						style={styles.linkText}
						onPress={() => Alert.alert("Ajuda", "Aqui abriria um tutorial.")}
					>
						Saiba como encontrar o endereço
					</Text>
				</Text>
			</View>

			<Modal visible={showPicker} transparent animationType="slide">
				<View style={styles.modalContainer}>
					<View style={styles.pickerModalContent}>
						<View style={styles.pickerHeader}>
							<Text style={styles.pickerTitle}>Escolha a Rede</Text>
							<TouchableOpacity onPress={() => setShowPicker(false)}>
								<MaterialCommunityIcons name="close" size={24} color="#FFF" />
							</TouchableOpacity>
						</View>
						<Picker
							selectedValue={network}
							onValueChange={(itemValue) => {
								setNetwork(itemValue);
								if (Platform.OS === "android") setShowPicker(false);
							}}
							style={styles.picker}
						>
							{Object.keys(networkIcons).map((net) => (
								<Picker.Item label={net} value={net} key={net} />
							))}
						</Picker>
						{Platform.OS === "ios" && (
							<TouchableOpacity
								style={styles.confirmButton}
								onPress={() => setShowPicker(false)}
							>
								<Text style={styles.confirmButtonText}>Confirmar</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	label: { color: "#AAA", marginBottom: 4 },
	input: {
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 8,
		padding: 12,
		color: "#FFF",
		marginBottom: 16,
	},
	pickerButton: {
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	pickerButtonText: { color: "#FFF" },
	row: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
	scanButton: {
		padding: 12,
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 8,
		marginLeft: 8,
	},
	button: {
		backgroundColor: "#3A5AFF",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: { color: "#FFF", fontWeight: "bold" },
	errorText: { color: "red", marginTop: 8, textAlign: "center" },
	helpText: { color: "#AAA", textAlign: "center" },
	linkText: { color: "#3A5AFF" },
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	pickerModalContent: {
		backgroundColor: "#1A1A1A",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingBottom: Platform.OS === "ios" ? 40 : 20,
	},
	pickerHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},
	pickerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
	picker: { backgroundColor: "#1A1A1A", color: "#FFF" },
	confirmButton: {
		backgroundColor: "#3A5AFF",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		margin: 16,
		marginTop: 8,
	},
	confirmButtonText: { color: "#FFF", fontWeight: "bold" },
});

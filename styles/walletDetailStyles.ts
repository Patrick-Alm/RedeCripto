import { StyleSheet } from "react-native";

export const walletDetailStyles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
	},
	modalContent: {
		flex: 1,
		padding: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFF",
	},
	subtitle: {
		fontSize: 18,
		color: "#AAA",
		marginBottom: 20,
	},
	closeButton: {
		padding: 8,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		color: "#AAA",
		marginTop: 16,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#F44336",
		fontSize: 16,
		marginTop: 12,
		marginBottom: 24,
	},
	retryButton: {
		backgroundColor: "#3A5AFF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	retryButtonText: {
		color: "#FFF",
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		color: "#666",
		fontSize: 16,
		marginTop: 16,
	},
	transfersList: {
		paddingBottom: 20,
	},
	transferItem: {
		backgroundColor: "#222",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	incomingTransfer: {
		borderLeftWidth: 4,
		borderLeftColor: "#4CAF50",
	},
	outgoingTransfer: {
		borderLeftWidth: 4,
		borderLeftColor: "#F44336",
	},
	transferDetails: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	transferType: {
		marginRight: 12,
	},
	transferInfo: {
		flex: 1,
	},
	transferAmount: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFF",
		marginBottom: 4,
	},
	transferAddress: {
		fontSize: 14,
		color: "#AAA",
		marginBottom: 4,
	},
	transferDate: {
		fontSize: 12,
		color: "#888",
	},
	transferStatus: {
		marginLeft: 12,
	},
	statusText: {
		fontSize: 12,
		fontWeight: "bold",
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
	},
	completedStatus: {
		backgroundColor: "rgba(76, 175, 80, 0.2)",
		color: "#4CAF50",
	},
	pendingStatus: {
		backgroundColor: "rgba(255, 193, 7, 0.2)",
		color: "#FFC107",
	},
	failedStatus: {
		backgroundColor: "rgba(244, 67, 54, 0.2)",
		color: "#F44336",
	},
});

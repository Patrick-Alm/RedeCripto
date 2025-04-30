import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";


export const walletStyles = StyleSheet.create({
 header: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   marginBottom: theme.spacing.md,
 },
 addButton: {
   backgroundColor: theme.colors.primary,
   width: 40,
   height: 40,
   borderRadius: 20,
   justifyContent: "center",
   alignItems: "center",
 },
 list: {
   flex: 1,
 },
 card: {
   backgroundColor: theme.colors.surface,
   borderRadius: theme.radii.lg,
   padding: theme.spacing.md,
   marginBottom: theme.spacing.sm,
   flexDirection: "row",
   justifyContent: "space-between",
 },
 info: {
   flex: 1,
 },
 name: {
   fontSize: theme.fontSizes.md,
   fontWeight: "bold",
   color: theme.colors.text,
   marginBottom: theme.spacing.xs,
 },
 address: {
   fontSize: theme.fontSizes.sm,
   color: theme.colors.textMuted,
   marginBottom: theme.spacing.xs,
 },
 network: {
   fontSize: theme.fontSizes.sm,
   color: theme.colors.text,
 },
 balance: {
   justifyContent: "center",
 },
 balanceText: {
   fontSize: theme.fontSizes.md,
   fontWeight: "bold",
   color: theme.colors.primary,
 },
 emptyState: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   paddingBottom: 100,
 },
 emptyText: {
   color: theme.colors.textMuted,
   fontSize: theme.fontSizes.md,
   textAlign: "center",
   marginTop: theme.spacing.md,
   marginBottom: theme.spacing.lg,
 },
 addText: {
   color: theme.colors.primary,
   fontWeight: "bold",
 },
});



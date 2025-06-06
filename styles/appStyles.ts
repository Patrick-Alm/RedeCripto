import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.text,
    fontWeight: "600",
  },
  subtitle: {
    color: theme.colors.textMuted,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    color: theme.colors.text,
  },
});

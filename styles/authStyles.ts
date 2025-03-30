// app/(auth)/styles.ts
import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing.md,
		backgroundColor: theme.colors.background,
	},
	startButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
		marginTop: theme.spacing.xl,
	},
	cardContainer: {
		width: '100%',
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.radii.lg,
		padding: theme.spacing.lg,
	},
	socialContainer: {
		flexDirection: 'column',
		gap: 12,
		marginBottom: theme.spacing.lg,
	},
	title: {
		fontSize: theme.fontSizes.title,
		fontWeight: 'bold',
		marginBottom: theme.spacing.md,
		textAlign: 'center',
		color: theme.colors.primary,
	},
	subtitle: {
		fontSize: theme.fontSizes.md,
		textAlign: 'center',
		color: theme.colors.text,
		paddingHorizontal: theme.spacing.xl,
	},
	socialButton: {
		backgroundColor: theme.colors.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		marginBottom: theme.spacing.lg,
	},
	label: {
		marginBottom: theme.spacing.xs,
		fontSize: theme.fontSizes.sm,
		color: theme.colors.textMuted,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.radii.md,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		marginBottom: theme.spacing.md,
		backgroundColor: theme.colors.background,
		height: 40,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: theme.spacing.md,
		borderRadius: theme.radii.md,
	},
	outlinedButton: {
		backgroundColor: 'transparent',
		borderColor: theme.colors.border,
		borderWidth: 1,
		padding: theme.spacing.md,
		borderRadius: theme.radii.md,
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 16,
	},
	signup: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	link: {
		color: '#2563eb',
		fontWeight: '500',
	},
	header: {
		marginBottom: theme.spacing.xl,
	},
	termsAndConditions: {
		paddingHorizontal: theme.spacing.xs,
		marginTop: theme.spacing.md,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
});

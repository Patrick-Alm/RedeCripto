import { theme } from '@/constants/theme';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

export function Separator() {
	return (
		<View style={styles.container}>
			<View style={styles.line} />
			<Text style={styles.text}>OU</Text>
			<View style={styles.line} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: theme.spacing.md,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: theme.colors.border,
	},
	text: {
		marginHorizontal: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
		color: theme.colors.textMuted,
	},
});

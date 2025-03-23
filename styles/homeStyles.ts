import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    fontWeight: '600',
  },
  subtitle: {
    color: theme.colors.textMuted,
  },
});

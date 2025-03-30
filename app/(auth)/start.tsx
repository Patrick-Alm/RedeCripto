// app/(auth)/start.tsx
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { rootStyles } from '@/styles/rootStyles';
import { authStyles } from '@/styles/authStyles';

export default function StartScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={rootStyles.container}>
			<View style={authStyles.container}>
				<View>
					<Text style={authStyles.title}>RedeCripto</Text>
					<Text style={authStyles.subtitle}>
						Acompanhe suas carteiras de criptomoedas em diferentes redes
					</Text>
				</View>

				<View style={authStyles.startButtonsContainer}>
					<TouchableOpacity
						style={authStyles.button}
						onPress={() => router.push('/sign-in')}
					>
						<Text style={authStyles.buttonText}>Entrar</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={authStyles.outlinedButton}
						onPress={() => router.push('/sign-up')}
					>
						<Text style={authStyles.buttonText}>Criar conta</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

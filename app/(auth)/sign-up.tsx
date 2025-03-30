import { useAuth, useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	SafeAreaView,
} from 'react-native';
import { authStyles } from '../../styles/authStyles';
import { setAuthToken } from '@/services/api';
import { rootStyles } from '@/styles/rootStyles';
import { theme } from '@/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { getToken } = useAuth();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [pendingVerification, setPendingVerification] = useState(false);

	const handleSignUp = async () => {
		if (!isLoaded) return;
		setLoading(true);

		if (emailAddress === '' || password === '' || confirmPassword === '') {
			Alert.alert('Erro ao criar conta', 'Preencha todos os campos.');
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert('Erro ao criar conta', 'As senhas não coincidem.');
			setLoading(false);
			return;
		}

		if (password.length < 8) {
			Alert.alert(
				'Erro ao criar conta',
				'A senha deve ter pelo menos 6 caracteres.',
			);
			setLoading(false);
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			setPendingVerification(true);
		} catch (err: any) {
			Alert.alert(
				'Erro ao criar conta',
				err?.errors?.[0]?.message || 'Tente novamente.',
			);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (signUpAttempt.status === 'complete') {
				await setActive({ session: signUpAttempt.createdSessionId });
				const token = await getToken();

				if (token) {
					setAuthToken(token);
				}
				router.replace('/');
			} else {
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
			Alert.alert(
				'Erro ao criar conta',
				err?.errors?.[0]?.message || 'Tente novamente.',
			);
		}
	};

	if (pendingVerification) {
		return (
			<SafeAreaView style={rootStyles.container}>
				<View style={authStyles.container}>
					<View style={authStyles.header}>
						<Text style={authStyles.title}>RedeCripto</Text>
						<Text
							style={{ ...authStyles.subtitle, color: theme.colors.textMuted }}
						>
							Verifique seu email
						</Text>
					</View>
					<View style={authStyles.cardContainer}>
						<Text style={authStyles.label}>Codigo</Text>
						<TextInput
							style={authStyles.input}
							value={code}
							placeholder="Informe o código de verificação"
							onChangeText={(code) => setCode(code)}
						/>
						<FontAwesome.Button
							name="envelope-o"
							onPress={onVerifyPress}
							style={{ ...authStyles.button, justifyContent: 'center' }}
						>
							Verificar
						</FontAwesome.Button>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={rootStyles.container}>
			<View style={authStyles.container}>
				<View style={authStyles.header}>
					<Text style={authStyles.title}>RedeCripto</Text>
					<Text
						style={{ ...authStyles.subtitle, color: theme.colors.textMuted }}
					>
						Cria sua conta para acompanhar suas criptomoedas
					</Text>
				</View>
				{/* <Text style={authStyles.title}>Criar conta</Text> */}
				<View style={authStyles.cardContainer}>
					<Text style={authStyles.label}>Email</Text>
					<TextInput
						style={authStyles.input}
						placeholder="seu@email.com"
						value={emailAddress}
						onChangeText={setEmailAddress}
						keyboardType="email-address"
						autoCapitalize="none"
					/>

					<Text style={authStyles.label}>Senha</Text>
					<TextInput
						style={authStyles.input}
						placeholder="********"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<Text style={authStyles.label}>Confirmar senha</Text>
					<TextInput
						style={authStyles.input}
						placeholder="********"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>

					<FontAwesome.Button
						name="user-o"
						onPress={handleSignUp}
						style={{ ...authStyles.button, justifyContent: 'center' }}
						disabled={loading}
					>
						Entrar com email
					</FontAwesome.Button>

					<View style={authStyles.signup}>
						<Text style={{ marginRight: 4, color: theme.colors.textMuted }}>
							Já tem uma conta?
						</Text>
						<Link href="/sign-in">
							<Text style={authStyles.link}>Entrar</Text>
						</Link>
					</View>
				</View>
				<View style={authStyles.termsAndConditions}>
					<Text style={{ marginHorizontal: 4, color: theme.colors.textMuted }}>
						Ao continuar voce concorda com os
					</Text>
					<Link href="/">
						<Text style={authStyles.link}>Termos de Serviço</Text>
					</Link>
					<Text style={{ marginHorizontal: 4, color: theme.colors.textMuted }}>
						e
					</Text>
					<Link href="/">
						<Text style={authStyles.link}>Política de Privacidade</Text>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}

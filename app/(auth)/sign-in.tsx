import { useAuth, useSignIn, useSSO } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
	ActivityIndicator,
	SafeAreaView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { authStyles } from '../../styles/authStyles';
import { useWarmUpBrowser } from '@/utils/warm-up-browser';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setAuthToken } from '@/services/api';
import { rootStyles } from '@/styles/rootStyles';
import { Separator } from '@/components/Separator';
import { theme } from '@/constants/theme';

export default function SignInPage() {
	useWarmUpBrowser();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const { startSSOFlow } = useSSO();
	const { getToken } = useAuth();
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const handleOAuth = useCallback(
		async (strategy: 'oauth_google' | 'oauth_github') => {
			try {
				setLoading(true);
				const { createdSessionId } = await startSSOFlow({
					strategy,
					redirectUrl: AuthSession.makeRedirectUri(),
				});

				if (createdSessionId) {
					await setActive!({ session: createdSessionId });
					const token = await getToken();

					if (token) {
						setAuthToken(token);
					}

					router.replace('/');
				}
			} catch (err: any) {
				console.error(err);
				Alert.alert(
					'Erro no login social',
					'Não foi possível entrar com o provedor selecionado.',
				);
			} finally {
				setLoading(false);
			}
		},
		[startSSOFlow, router.replace],
	);

	const handleSignIn = async () => {
		if (!isLoaded) return;
		setLoading(true);

		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				const token = await getToken();

				if (token) {
					setAuthToken(token);
				}

				router.replace('/');
			} else {
				Alert.alert(
					'Atenção',
					'Etapas adicionais são necessárias para o login.',
				);
			}
		} catch (err: any) {
			console.error(err);
			Alert.alert('Erro ao entrar', 'Verifique seu email e senha.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={rootStyles.container}>
			<View style={authStyles.container}>
				<View style={authStyles.header}>
					<Text style={authStyles.title}>RedeCripto</Text>
					<Text
						style={{ ...authStyles.subtitle, color: theme.colors.textMuted }}
					>
						Entre na sua conta para continuar
					</Text>
				</View>
				<View style={authStyles.cardContainer}>
					<View style={authStyles.socialContainer}>
						<FontAwesome.Button
							name="google"
							onPress={() => handleOAuth('oauth_google')}
							style={authStyles.socialButton}
						>
							Entrar com Google
						</FontAwesome.Button>
						<FontAwesome.Button
							name="github"
							onPress={() => handleOAuth('oauth_github')}
							style={authStyles.socialButton}
						>
							Entrar com GitHub
						</FontAwesome.Button>
					</View>

					<Separator />

					<View style={authStyles.form}>
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

						<FontAwesome.Button
							name="envelope-o"
							onPress={handleSignIn}
							style={{ ...authStyles.button, justifyContent: 'center' }}
							disabled={loading}
						>
							Entrar com email
						</FontAwesome.Button>
					</View>

					<View style={authStyles.signup}>
						<Text style={{ marginRight: 4, color: theme.colors.textMuted }}>
							Não tem uma conta?
						</Text>
						<Link href="/sign-up">
							<Text style={authStyles.link}>Criar conta</Text>
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

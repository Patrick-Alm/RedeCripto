import { useAuth, useSignIn, useSSO } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { authStyles } from '../../styles/authStyles';
import { useWarmUpBrowser } from '@/utils/warm-up-browser';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setAuthToken } from '@/services/api';

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
          'Não foi possível entrar com o provedor selecionado.'
        );
      } finally {
        setLoading(false);
      }
    },
    [startSSOFlow, router.replace]
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
          'Etapas adicionais são necessárias para o login.'
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
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Entrar</Text>

      <View style={authStyles.social}>
        <TouchableOpacity
          style={authStyles.socialButton}
          onPress={() => handleOAuth('oauth_google')}
        >
          <Ionicons name="logo-google" size={32} color="##1c1917" />
        </TouchableOpacity>

        <TouchableOpacity
          style={authStyles.socialButton}
          onPress={() => handleOAuth('oauth_github')}
        >
          <Ionicons name="logo-github" size={32} color="##1c1917" />
        </TouchableOpacity>
      </View>

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

        <TouchableOpacity
          style={authStyles.button}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={authStyles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={authStyles.signup}>
        <Text style={{ marginRight: 4 }}>Não tem uma conta?</Text>
        <Link href="/sign-up">
          <Text style={authStyles.signupLink}>Criar conta</Text>
        </Link>
      </View>
    </View>
  );
}

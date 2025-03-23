import { useAuth, useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { authStyles } from '../../styles/authStyles';
import { setAuthToken } from '@/services/api';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { getToken } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);

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
        err?.errors?.[0]?.message || 'Tente novamente.'
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
        err?.errors?.[0]?.message || 'Tente novamente.'
      );
    }
  };

  if (pendingVerification) {
    return (
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Verifique seu email</Text>
        <TextInput
          style={authStyles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity style={authStyles.button} onPress={onVerifyPress}>
          <Text style={authStyles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Criar conta</Text>

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
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={authStyles.buttonText}>Criar conta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

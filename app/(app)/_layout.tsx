import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (isLoaded && !isSignedIn) {
    return <Redirect href="/(auth)/start" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />
    </Stack>
  );
}

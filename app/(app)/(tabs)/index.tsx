import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { rootStyles } from "@/styles/rootStyles";
import { appStyles } from "@/styles/appStyles";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={rootStyles.container}>
      <ScrollView
        style={appStyles.container}
        contentContainerStyle={appStyles.content}
      >
        <View style={appStyles.header}>
          <Image src={user?.imageUrl} />
          <Text style={appStyles.greeting}>Olá, {user?.fullName}</Text>
          <Text style={appStyles.subtitle}>Bem-vindo de volta</Text>
        </View>

        <View>
          <Button title="Logout" onPress={() => signOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

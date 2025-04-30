import { appStyles } from "@/styles/appStyles";
import { rootStyles } from "@/styles/rootStyles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
    const { user } = useUser();
    const { signOut } = useAuth();
    
    return (
    <SafeAreaView style={rootStyles.container}>
    <ScrollView
    style={appStyles.container}
    contentContainerStyle={appStyles.content}
    >
    <View style={appStyles.header}>
    <Text>Settings</Text>
    </View>
    
    <View>
    <Button title="Logout" onPress={() => signOut()} />
    </View>
    </ScrollView>
    </SafeAreaView>
    );
    }
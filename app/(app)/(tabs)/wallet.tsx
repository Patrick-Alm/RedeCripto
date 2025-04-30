import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { appStyles } from "@/styles/appStyles";
import { walletStyles } from "@/styles/walletStyles";


type Wallet = {
 id: string;
 name: string;
 address: string;
 network: string;
 balance: string;
};


export default function WalletsScreen() {
 const router = useRouter();
 const [wallets, setWallets] = useState<Wallet[]>([
   {
     id: "1",
     name: "Minha carteira ETH",
     address: "0x1234...5678",
     network: "Ethereum",
     balance: "1.25 ETH",
   },
   {
     id: "2",
     name: "Bitcoin Savings",
     address: "bc1q9h...7r2v",
     network: "Bitcoin",
     balance: "0.015 BTC",
   },
 ]);


 const handleAddWallet = () => {
   router.push("/(app)/(modals)/add-wallet");
 };


 const renderWalletItem = ({ item }: { item: Wallet }) => (
   <TouchableOpacity
     style={walletStyles.card}
     onPress={() => Alert.alert("Carteira", `Detalhes de ${item.name}`)}
   >
     <View style={walletStyles.info}>
       <Text style={walletStyles.name}>{item.name}</Text>
       <Text style={walletStyles.address}>{item.address}</Text>
       <Text style={walletStyles.network}>{item.network}</Text>
     </View>
     <View style={walletStyles.balance}>
       <Text style={walletStyles.balanceText}>{item.balance}</Text>
     </View>
   </TouchableOpacity>
 );


 return (
   <SafeAreaView style={appStyles.container}>
     <View style={walletStyles.header}>
       <Text style={appStyles.title}>Minhas Carteiras</Text>
       <TouchableOpacity
         style={walletStyles.addButton}
         onPress={handleAddWallet}
       >
         <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
       </TouchableOpacity>
     </View>


     {wallets.length > 0 ? (
       <FlatList
         data={wallets}
         renderItem={renderWalletItem}
         keyExtractor={(item) => item.id}
         style={walletStyles.list}
       />
     ) : (
       <View style={walletStyles.emptyState}>
         <MaterialCommunityIcons
           name="wallet-outline"
           size={64}
           color="#555"
         />
         <Text style={walletStyles.emptyText}>
           Você ainda não tem carteiras cadastradas
         </Text>
         <TouchableOpacity
           style={walletStyles.addButton}
           onPress={handleAddWallet}
         >
           <Text style={walletStyles.addText}>Adicionar Carteira</Text>
         </TouchableOpacity>
       </View>
     )}
   </SafeAreaView>
 );
}




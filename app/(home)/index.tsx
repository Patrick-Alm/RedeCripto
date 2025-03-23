import { useUser } from '@clerk/clerk-expo';
import { Image, ScrollView, Text, View } from 'react-native';
import { homeStyles } from '../../styles/homeStyles';

export default function Page() {
  const { user } = useUser();

  return (
    <ScrollView
      style={homeStyles.container}
      contentContainerStyle={homeStyles.content}
    >
      <View style={homeStyles.header}>
        <Image src={user?.imageUrl} />
        <Text style={homeStyles.greeting}>Olá, {user?.fullName}</Text>
        <Text style={homeStyles.subtitle}>Bem-vindo de volta</Text>
      </View>
    </ScrollView>
  );
}

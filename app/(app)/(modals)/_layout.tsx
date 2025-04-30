import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: "modal",
        animation: "slide_from_bottom",
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="add_wallet"
        options={{
          title: "Adicionar Carteira",
        }}
      />
    </Stack>
  );
}

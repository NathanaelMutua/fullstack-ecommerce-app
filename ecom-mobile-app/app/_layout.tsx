import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="cart" options={{ title: "Cart" }} />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="cart" options={{ title: "Cart" }} />
          <Stack.Screen name="product/[id]" options={{ title: "product" }} />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

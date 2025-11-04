import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>
      <GluestackUIProvider mode="dark">
        <View style={styles.container}>
          <Text>Ecommerce Mobile App</Text>
          <StatusBar style="auto" />
        </View>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

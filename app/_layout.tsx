import "../global.css";
import "../lib/nativewind-interop";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PAPER = "#F4F1E9";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: PAPER }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: PAPER }, animation: "fade" }} />
    </GestureHandlerRootView>
  );
}

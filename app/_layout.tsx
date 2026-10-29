import "../global.css";
import "../lib/nativewind-interop";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#080A12" }}>
      <StatusBar style="light" backgroundColor="#080A12" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#080A12" }, animation: "fade" }} />
    </GestureHandlerRootView>
  );
}
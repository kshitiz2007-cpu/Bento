import { Slot } from "expo-router";
import { View } from "react-native";
import { FloatingNav } from "@/components/floating-nav";

export default function TabsLayout() {
  return <View className="flex-1 bg-ink"><Slot /><FloatingNav /></View>;
}
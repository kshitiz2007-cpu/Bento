import { useEffect } from "react";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight } from "lucide-react-native";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-lilac">{children}</Text>;
}
export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return <View className="mb-6 gap-2"><Eyebrow>{eyebrow}</Eyebrow><Text className="text-[32px] font-bold leading-[38px] tracking-[-1.2px] text-white">{title}</Text>{subtitle ? <Text className="text-sm leading-5 text-muted">{subtitle}</Text> : null}</View>;
}
export function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return <View className="mb-3 mt-7 flex-row items-center justify-between"><Text className="text-lg font-bold tracking-[-0.4px] text-white">{title}</Text>{action ? <Pressable onPress={onPress} className="flex-row items-center gap-1 py-1"><Text className="text-xs font-semibold text-lilac">{action}</Text><ChevronRight size={14} color="#B9A6FF" /></Pressable> : null}</View>;
}
export function BentoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-[26px] border border-white/[0.07] bg-panel p-4 ${className}`}>{children}</View>;
}
export function ProgressBar({ value, color = "#B9A6FF" }: { value: number; color?: string }) {
  const reducedMotion = useReducedMotion();
  const progress = useSharedValue(0);
  useEffect(() => {
    const target = Math.max(0, Math.min(value, 100));
    if (reducedMotion) {
      progress.value = target;
      return;
    }
    progress.value = withTiming(target, { duration: 650 });
    return () => cancelAnimation(progress);
  }, [value, reducedMotion, progress]);
  const animatedStyle = useAnimatedStyle(() => ({ width: `${progress.value}%`, backgroundColor: color }));
  return <View className="h-[5px] overflow-hidden rounded-full bg-white/10"><Animated.View style={animatedStyle} className="h-full rounded-full" /></View>;
}
export function GradientButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} accessibilityRole="button"><LinearGradient colors={["#E8D39D", "#C4A6EE"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="items-center rounded-2xl px-4 py-3"><Text className="text-sm font-bold text-[#10121C]">{label}</Text></LinearGradient></Pressable>;
}
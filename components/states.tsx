import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { AlertCircle, BookOpen, RefreshCw } from "lucide-react-native";

export function SkeletonBlock({ className = "h-4 w-full rounded-lg" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(0.42);
  useEffect(() => {
    if (reducedMotion) {
      opacity.value = 0.55;
      return;
    }
    opacity.value = withRepeat(withTiming(0.82, { duration: 950 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [reducedMotion, opacity]);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View accessibilityLabel="Loading content" style={animatedStyle} className={`bg-white/10 ${className}`} />;
}

export function SkeletonCourseCard() {
  return <View className="rounded-[26px] border border-white/[0.07] bg-panel p-4">
    <View className="flex-row items-center gap-3">
      <SkeletonBlock className="h-12 w-12 rounded-2xl" />
      <View className="flex-1 gap-2"><SkeletonBlock className="h-3 w-2/5" /><SkeletonBlock className="h-4 w-4/5" /><SkeletonBlock className="h-3 w-3/5" /></View>
    </View>
    <View className="mt-4"><SkeletonBlock className="h-[5px] w-full rounded-full" /></View>
  </View>;
}

export function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return <View className="items-center rounded-[26px] border border-dashed border-white/15 bg-white/[0.025] px-6 py-8">
    <View className="mb-4 h-14 w-14 items-center justify-center rounded-2xl bg-lilac/10"><BookOpen size={24} color="#B9A6FF" /></View>
    <Text className="text-base font-bold text-white">{title}</Text>
    <Text className="mt-2 text-center text-sm leading-5 text-muted">{description}</Text>
    {actionLabel && onAction ? <Pressable accessibilityRole="button" onPress={onAction} className="mt-5 rounded-xl bg-white/10 px-4 py-3"><Text className="text-sm font-semibold text-white">{actionLabel}</Text></Pressable> : null}
  </View>;
}

export function ErrorState({ title = "That didn't load.", description = "Check your connection and try again.", onRetry }: { title?: string; description?: string; onRetry: () => void }) {
  return <View className="items-center rounded-[26px] border border-rose/20 bg-rose/[0.04] px-6 py-8">
    <View className="mb-4 h-14 w-14 items-center justify-center rounded-2xl bg-rose/10"><AlertCircle size={24} color="#F2A6CE" /></View>
    <Text className="text-base font-bold text-white">{title}</Text>
    <Text className="mt-2 text-center text-sm leading-5 text-muted">{description}</Text>
    <Pressable accessibilityRole="button" onPress={onRetry} className="mt-5 flex-row items-center gap-2 rounded-xl bg-white/10 px-4 py-3"><RefreshCw size={15} color="#F2A6CE" /><Text className="text-sm font-semibold text-white">Try again</Text></Pressable>
  </View>;
}
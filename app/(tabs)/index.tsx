import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowUpRight, Bell, BookOpen, CalendarDays, Flame, Play, Sparkles, Timer, Zap } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BentoCard, ProgressBar, SectionHeader } from "@/components/ui";
import { mockCourses } from "@/lib/mock-data";

export default function HomeScreen() {
  const router = useRouter();
  const go = (path: string) => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined); router.push(path as never); };
  return <SafeAreaView className="flex-1 bg-ink" edges={["top"]}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 128 }}>
      <View className="mb-7 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3"><View className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-panel2"><Sparkles size={21} color="#E5CB91" /></View><View><Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-muted">GYANKUNJ · BENTO LAB</Text><Text className="mt-1 text-lg font-bold text-white">Your learning space</Text></View></View>
        <Pressable accessibilityLabel="Notifications preview" onPress={() => go("/profile")} className="h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-panel"><Bell size={19} color="#F5F5FA" /><View className="absolute right-[10px] top-[9px] h-2 w-2 rounded-full bg-rose" /></Pressable>
      </View>
      <LinearGradient colors={["#272342", "#171A2C", "#151923"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="overflow-hidden rounded-[30px] border border-lilac/20 p-5">
        <View className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-lilac/10" /><View className="absolute -bottom-14 right-16 h-32 w-32 rounded-full bg-rose/10" />
        <View className="mb-5 flex-row items-center justify-between"><View className="flex-row items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-2"><View className="h-2 w-2 rounded-full bg-[#8DD9C3]" /><Text className="text-[10px] font-bold tracking-[1.5px] text-[#D5D7E4]">YOUR NEXT CHAPTER</Text></View><ArrowUpRight size={20} color="#E5CB91" /></View>
        <Text className="text-[32px] font-bold leading-[37px] tracking-[-1.1px] text-white">Small steps.{ "\n" }Big outcomes.</Text>
        <Text className="mt-3 max-w-[270px] text-sm leading-5 text-[#C1C2D2]">A focused space for your next UPSC milestone.</Text>
        <View className="mt-6 flex-row items-end justify-between"><View><Text className="text-[10px] font-bold uppercase tracking-[1.8px] text-lilac">WEEKLY MOMENTUM</Text><View className="mt-2 flex-row items-center gap-2"><Flame size={18} color="#F2A6CE" /><Text className="text-2xl font-bold text-white">5 day streak</Text></View></View><Pressable onPress={() => go("/study")} className="h-12 w-12 items-center justify-center rounded-2xl bg-champagne"><Play size={19} color="#111522" fill="#111522" /></Pressable></View>
      </LinearGradient>
      <View className="mt-4 flex-row gap-3">
        <BentoCard className="flex-1"><View className="mb-4 h-9 w-9 items-center justify-center rounded-xl bg-lilac/10"><Zap size={18} color="#B9A6FF" /></View><Text className="text-2xl font-bold text-white">72%</Text><Text className="mt-1 text-xs text-muted">Weekly target</Text><View className="mt-3"><ProgressBar value={72} /></View></BentoCard>
        <BentoCard className="flex-1"><View className="mb-4 h-9 w-9 items-center justify-center rounded-xl bg-rose/10"><Timer size={18} color="#F2A6CE" /></View><Text className="text-2xl font-bold text-white">4.2h</Text><Text className="mt-1 text-xs text-muted">Focused this week</Text><View className="mt-3"><ProgressBar value={56} color="#F2A6CE" /></View></BentoCard>
      </View>
      <SectionHeader title="Pick up where you left off" action="All courses" onPress={() => go("/study")} />
      <Pressable onPress={() => go("/study")} className="rounded-[26px] border border-white/[0.07] bg-panel p-4">
        <View className="flex-row items-center gap-3"><LinearGradient colors={["#B9A6FF", "#7866BB"]} className="h-[58px] w-[58px] items-center justify-center rounded-2xl"><BookOpen size={24} color="#141323" /></LinearGradient><View className="flex-1"><Text className="text-[10px] font-bold tracking-[1.8px] text-lilac">POLITY · LESSON 08</Text><Text className="mt-1 text-base font-bold text-white">Fundamental Rights</Text><Text className="mt-1 text-xs text-muted">Continue your last session</Text></View><ArrowUpRight size={19} color="#E5CB91" /></View>
        <View className="mt-4 flex-row items-center gap-3"><View className="flex-1"><ProgressBar value={64} /></View><Text className="text-xs font-semibold text-[#D6D8E5]">64%</Text></View>
      </Pressable>
      <SectionHeader title="Today's focus" action="View plan" onPress={() => go("/study")} />
      <View className="flex-row gap-3">
        <Pressable onPress={() => go("/tests")} className="flex-1"><BentoCard className="min-h-[145px]"><View className="mb-5 h-9 w-9 items-center justify-center rounded-xl bg-[#8DD9C3]/10"><CalendarDays size={18} color="#8DD9C3" /></View><Text className="text-sm font-bold text-white">Daily drill</Text><Text className="mt-1 text-xs leading-4 text-muted">15 questions to warm up</Text><Text className="mt-3 text-xs font-semibold text-[#8DD9C3]">Start practice ↗</Text></BentoCard></Pressable>
        <Pressable onPress={() => go("/library")} className="flex-1"><BentoCard className="min-h-[145px]"><View className="mb-5 h-9 w-9 items-center justify-center rounded-xl bg-rose/10"><BookOpen size={18} color="#F2A6CE" /></View><Text className="text-sm font-bold text-white">Quick revision</Text><Text className="mt-1 text-xs leading-4 text-muted">Fundamental Rights cards</Text><Text className="mt-3 text-xs font-semibold text-rose">Open library ↗</Text></BentoCard></Pressable>
      </View>
      <SectionHeader title="Your learning tracks" action="Explore" onPress={() => go("/study")} />
      <View className="gap-3">{mockCourses.slice(0, 2).map(course => <Pressable key={course.id} onPress={() => go("/study")} className="rounded-[24px] border border-white/[0.07] bg-panel p-4"><View className="flex-row items-center gap-3"><View style={{ backgroundColor: course.color + "20" }} className="h-11 w-11 items-center justify-center rounded-2xl"><BookOpen size={19} color={course.color} /></View><View className="flex-1"><Text style={{ color: course.color }} className="text-[9px] font-bold tracking-[1.8px]">{course.subtitle}</Text><Text className="mt-1 text-sm font-bold text-white">{course.title}</Text><Text className="mt-1 text-xs text-muted">{course.lessons}</Text></View><Text className="text-sm font-bold text-white">{course.progress}%</Text></View><View className="mt-4"><ProgressBar value={course.progress} color={course.color} /></View></Pressable>)}</View>
      <View className="mt-5 flex-row items-center justify-center gap-2"><Sparkles size={13} color="#9298AD" /><Text className="text-[10px] tracking-wide text-muted">CALM · CLEAR · CAPABLE</Text></View>
    </ScrollView>
  </SafeAreaView>;
}
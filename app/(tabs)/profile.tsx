import { Bell, ChevronRight, CircleHelp, Download, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BentoCard, PageHeader } from "@/components/ui";

const settings = [
  { title: "Learning preferences", subtitle: "Exam target, medium and goals", Icon: SlidersHorizontal },
  { title: "Notifications", subtitle: "Class reminders and study nudges", Icon: Bell },
  { title: "Offline downloads", subtitle: "Manage saved learning resources", Icon: Download },
  { title: "Privacy & security", subtitle: "Account and device preferences", Icon: ShieldCheck },
  { title: "Help & support", subtitle: "FAQs and contact the team", Icon: CircleHelp }
];
export default function ProfileScreen() {
  return <SafeAreaView className="flex-1 bg-ink" edges={["top"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 128 }}>
    <PageHeader eyebrow="YOUR SPACE" title="Make it yours." subtitle="Your learning identity and preferences, thoughtfully organized." />
    <View className="flex-row items-center gap-4 rounded-[28px] border border-lilac/20 bg-panel p-5"><View className="h-[62px] w-[62px] items-center justify-center rounded-[22px] bg-lilac/15"><UserRound size={28} color="#B9A6FF" /></View><View className="flex-1"><Text className="text-lg font-bold text-white">Your learner profile</Text><Text className="mt-1 text-xs text-muted">UPSC CSE · Hindi medium</Text><Text className="mt-2 text-[10px] font-bold tracking-[1.5px] text-champagne">PERSONALIZATION PREVIEW</Text></View></View>
    <View className="mt-4 flex-row gap-3"><BentoCard className="flex-1"><Text className="text-2xl font-bold text-white">12</Text><Text className="mt-1 text-xs text-muted">Practice sets</Text></BentoCard><BentoCard className="flex-1"><Text className="text-2xl font-bold text-white">5 days</Text><Text className="mt-1 text-xs text-muted">Current streak</Text></BentoCard></View>
    <Text className="mb-3 mt-8 text-lg font-bold text-white">Preferences & support</Text>
    <View className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-panel px-4">{settings.map(({ title, subtitle, Icon }, i) => <Pressable key={title} className={`flex-row items-center gap-3 py-4 ${i ? "border-t border-white/[0.07]" : ""}`}><View className="h-10 w-10 items-center justify-center rounded-xl bg-white/5"><Icon size={18} color="#B9A6FF" /></View><View className="flex-1"><Text className="text-sm font-semibold text-white">{title}</Text><Text className="mt-1 text-xs text-muted">{subtitle}</Text></View><ChevronRight size={17} color="#777E95" /></Pressable>)}</View>
    <Text className="mt-5 text-center text-[10px] tracking-wide text-[#777E95]">BENTO UI LAB · DESIGN PREVIEW 0.1</Text>
  </ScrollView></SafeAreaView>;
}
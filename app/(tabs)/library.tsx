import { Download, FileText, Filter, Headphones, Search, Sparkles, Star } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BentoCard, PageHeader, SectionHeader } from "@/components/ui";

const resources = [
  { title: "Fundamental Rights", meta: "POLITY · QUICK NOTES", color: "#B9A6FF", icon: FileText },
  { title: "Constitutional Amendments", meta: "POLITY · REVISION AUDIO", color: "#F2A6CE", icon: Headphones },
  { title: "Modern India timeline", meta: "HISTORY · VISUAL NOTES", color: "#8DD9C3", icon: Sparkles }
];
export default function LibraryScreen() {
  return <SafeAreaView className="flex-1 bg-ink" edges={["top"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 128 }}>
    <PageHeader eyebrow="YOUR KNOWLEDGE VAULT" title="Keep the good stuff close." subtitle="Notes, visual explainers and revision resources — in one calm space." />
    <View className="mb-4 flex-row items-center gap-3 rounded-2xl border border-white/10 bg-panel px-4 py-3"><Search size={18} color="#9298AD" /><Text className="flex-1 text-sm text-muted">Find a topic or resource</Text><Filter size={17} color="#B9A6FF" /></View>
    <View className="flex-row gap-2">{["All", "Notes", "Visual", "Saved"].map((v, i) => <View key={v} className={`rounded-full px-4 py-2 ${i === 0 ? "bg-lilac/15" : "border border-white/10"}`}><Text className={`text-xs font-semibold ${i === 0 ? "text-[#C8B9FF]" : "text-muted"}`}>{v}</Text></View>)}</View>
    <SectionHeader title="Continue reading" />
    <BentoCard><View className="flex-row items-center gap-3"><View className="h-14 w-14 items-center justify-center rounded-2xl bg-lilac/15"><FileText size={23} color="#B9A6FF" /></View><View className="flex-1"><Text className="text-[9px] font-bold tracking-[1.6px] text-lilac">LAST OPENED · 4 PAGES LEFT</Text><Text className="mt-1 text-base font-bold text-white">Constitutional Development</Text><Text className="mt-1 text-xs text-muted">Notes · 18 pages</Text></View><Star size={17} color="#E5CB91" /></View><View className="mt-4 flex-row items-center gap-2"><View className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><View className="h-full w-[72%] rounded-full bg-lilac" /></View><Text className="text-xs text-muted">72%</Text></View></BentoCard>
    <SectionHeader title="Curated for your syllabus" action="See all" />
    <View className="gap-3">{resources.map(r => { const Icon = r.icon; return <Pressable key={r.title} className="flex-row items-center gap-3 rounded-[24px] border border-white/[0.07] bg-panel p-4"><View style={{ backgroundColor: r.color + "20" }} className="h-12 w-12 items-center justify-center rounded-2xl"><Icon size={20} color={r.color} /></View><View className="flex-1"><Text style={{ color: r.color }} className="text-[9px] font-bold tracking-[1.6px]">{r.meta}</Text><Text className="mt-1 text-sm font-bold text-white">{r.title}</Text><Text className="mt-1 text-xs text-muted">Updated for revision · Mock item</Text></View><Download size={17} color="#9298AD" /></Pressable>; })}</View>
    <SectionHeader title="Offline collection" />
    <BentoCard className="items-center py-7"><View className="mb-3 h-12 w-12 items-center justify-center rounded-2xl bg-white/5"><Download size={21} color="#9298AD" /></View><Text className="text-sm font-bold text-white">Your offline shelf is ready</Text><Text className="mt-2 text-center text-xs leading-5 text-muted">Download controls will connect to real storage in a later milestone.</Text></BentoCard>
  </ScrollView></SafeAreaView>;
}
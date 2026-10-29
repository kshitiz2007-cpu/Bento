import React, { Component, useState } from "react";
import {
  Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Flame, GraduationCap,
  House, Library, Newspaper, Play, Sparkles, Target, Timer, Trophy, UserRound, Zap,
} from "lucide-react-native";

type Tab = "Home" | "Study" | "Practice" | "Library" | "Profile";
const tabs: { label: Tab; icon: typeof House }[] = [
  { label: "Home", icon: House }, { label: "Study", icon: BookOpen },
  { label: "Practice", icon: Target }, { label: "Library", icon: Library },
  { label: "Profile", icon: UserRound },
];
const C = {
  bg: "#090B16", surface: "#15182B", surface2: "#1D2038", ink: "#F7F5FF",
  muted: "#A1A4BE", faint: "#737891", rose: "#FF5CA8", lime: "#D8FF6A",
  violet: "#9A7BFF", border: "#2D304A", purpleSoft: "#E8E1FF",
  roseSoft: "#FFD8E8",
};

function Label({ children, color = C.rose }: { children: React.ReactNode; color?: string }) {
  return <Text style={[s.eyebrow, { color }]}>{children}</Text>;
}
function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <View style={s.sectionHeading}>
    <Text style={s.sectionTitle}>{title}</Text>
    {action ? <Pressable style={s.actionRow}><Text style={s.actionText}>{action}</Text><ArrowUpRight size={14} color={C.violet} /></Pressable> : null}
  </View>;
}
function Stat({ icon: Icon, value, label, accent = false }: { icon: typeof Timer; value: string; label: string; accent?: boolean }) {
  return <View style={[s.statCard, accent && s.statAccent]}>
    <Icon size={15} color={accent ? C.lime : C.muted} strokeWidth={2.2} />
    <Text style={[s.statValue, accent && { color: C.lime }]}>{value}</Text>
    <Text style={s.statLabel}>{label}</Text>
  </View>;
}
function QuickRow({ icon: Icon, title, subtitle, tint, ink }: { icon: typeof BookOpen; title: string; subtitle: string; tint: string; ink: string }) {
  return <Pressable style={({ pressed }) => [s.quickRow, pressed && s.pressed]}>
    <View style={[s.quickIcon, { backgroundColor: tint }]}><Icon size={19} color={ink} /></View>
    <View style={s.quickCopy}><Text style={s.quickTitle}>{title}</Text><Text style={s.quickSubtitle}>{subtitle}</Text></View>
    <ChevronRight size={17} color={C.faint} />
  </Pressable>;
}
function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const { width } = useWindowDimensions();
  const compact = width < 370;
  return <SafeAreaView style={s.safe}>
    <ExpoStatusBar style="light" />
    <StatusBar barStyle="light-content" backgroundColor={C.bg} />
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[s.content, compact && s.contentCompact]}>
        <View style={s.header}>
          <View style={s.brandIcon}><GraduationCap size={21} color={C.bg} strokeWidth={2.4} /></View>
          <View style={s.brandCopy}><Text style={s.brand}>CIVILPREP</Text><Text style={s.brandSub}>GYANKUNJ ACADEMY</Text></View>
          <Pressable accessibilityLabel="Profile" style={s.avatar}><Text style={s.avatarText}>K</Text><View style={s.avatarDot} /></Pressable>
        </View>

        <View style={s.greeting}>
          <Label color={C.lime}>THURSDAY  ·  29 OCT</Label>
          <Text style={s.headline}>Your future,{"\n"}<Text style={s.headlineAccent}>in motion.</Text></Text>
          <Text style={s.subhead}>One smart session at a time.</Text>
        </View>

        <LinearGradient colors={["#8056E9", "#44377F", "#20223E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.hero}>
          <View style={s.heroOrbOne} /><View style={s.heroOrbTwo} /><View style={s.heroOrbThree} />
          <View style={s.heroTop}>
            <View style={s.heroPill}><View style={s.liveDot} /><Text style={s.heroPillText}>CONTINUE YOUR JOURNEY</Text></View>
            <View style={s.heroArrow}><ArrowUpRight size={17} color={C.ink} /></View>
          </View>
          <Label color="#E6DFFF">01  /  INDIAN POLITY</Label>
          <Text style={s.heroTitle}>Fundamental{"\n"}Rights</Text>
          <Text style={s.heroMeta}>Chapter 04  ·  18 min left</Text>
          <View style={s.progressMeta}><Text style={s.progressLabel}>YOUR MOMENTUM</Text><Text style={s.progressPercent}>68%</Text></View>
          <View style={s.progressTrack}><LinearGradient colors={[C.lime, "#B7FFBA"]} style={s.progressFill} /></View>
          <View style={s.heroFooter}><Text style={s.heroFooterText}>Pick up where you left off</Text><Pressable style={s.resume}><Text style={s.resumeText}>Resume</Text><ArrowRight size={14} color={C.bg} /></Pressable></View>
        </LinearGradient>

        <View style={s.section}>
          <SectionHeading title="Your daily momentum" action="View stats" />
          <View style={s.statsRow}>
            <Stat icon={Timer} value="2h 40m" label="FOCUS TIME" />
            <Stat icon={Flame} value="12 days" label="STREAK" />
            <Stat icon={Check} value="4 / 5" label="TASKS DONE" accent />
          </View>
        </View>

        <View style={s.section}>
          <Label>THE DAILY LOOP</Label>
          <SectionHeading title="Small wins. Big rank energy." action="See all" />
          <View style={s.bentoRow}>
            <Pressable style={({ pressed }) => [s.bentoCard, pressed && s.pressed]}>
              <LinearGradient colors={["#E8E1FF", "#CFC1FF"]} style={s.bentoGradient}>
                <View style={s.bentoIcon}><Zap size={19} color="#5C3BB6" fill="#5C3BB6" /></View>
                <View><Text style={s.bentoKicker}>PRACTICE / 01</Text><Text style={s.bentoTitle}>Daily Drill</Text><Text style={s.bentoMeta}>10 MCQs · 8 min</Text></View>
                <View style={s.bentoArrow}><ArrowUpRight size={15} color="#5C3BB6" /></View>
              </LinearGradient>
            </Pressable>
            <Pressable style={({ pressed }) => [s.bentoCard, pressed && s.pressed]}>
              <LinearGradient colors={["#FFD8E8", "#FFB9D5"]} style={s.bentoGradient}>
                <View style={s.bentoIcon}><Newspaper size={19} color="#A92763" /></View>
                <View><Text style={s.bentoKicker}>CURRENT AFFAIRS</Text><Text style={s.bentoTitle}>Daily Crux</Text><Text style={s.bentoMeta}>5 key updates</Text></View>
                <View style={s.bentoArrow}><ArrowUpRight size={15} color="#A92763" /></View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={s.streakCard}>
          <View style={s.streakIcon}><Sparkles size={18} color={C.lime} /></View>
          <View style={s.streakCopy}><Text style={s.streakTitle}>12-day streak</Text><Text style={s.streakSubtitle}>You're building a powerful habit.</Text></View>
          <Text style={s.streakPlus}>+1</Text>
        </View>

        <View style={s.section}>
          <SectionHeading title="Jump back in" action="Open planner" />
          <View style={s.quickList}>
            <QuickRow icon={BookOpen} title="Revision cards" subtitle="Fundamental Rights · 12 cards" tint="#30274B" ink={C.violet} />
            <QuickRow icon={Newspaper} title="Current affairs" subtitle="October 29 · Daily brief" tint="#1D3A36" ink="#7BE0B0" />
            <QuickRow icon={Trophy} title="Mock test analysis" subtitle="Review your last attempt" tint="#3A3020" ink="#FFD080" />
          </View>
        </View>

        <View style={s.footer}><Sparkles size={13} color={C.rose} /><Text style={s.footerText}>Small steps. Strong preparation. Your future.</Text></View>
      </ScrollView>

      <View style={s.navWrap}><View style={s.nav}>
        {tabs.map(({ label, icon: Icon }) => {
          const active = activeTab === label;
          return <Pressable key={label} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => setActiveTab(label)} style={({ pressed }) => [s.navItem, active && s.navItemActive, pressed && s.pressed]}>
            <Icon size={18} color={active ? C.rose : C.faint} strokeWidth={active ? 2.4 : 1.8} />
            <Text style={[s.navLabel, active && s.navLabelActive]}>{label.toUpperCase()}</Text>
          </Pressable>;
        })}
      </View></View>
    </View>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg }, root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 124, gap: 24 },
  contentCompact: { paddingHorizontal: 16, gap: 20 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandIcon: { width: 42, height: 42, borderRadius: 15, backgroundColor: C.lime, alignItems: "center", justifyContent: "center" },
  brandCopy: { flex: 1, gap: 3 }, brand: { color: C.ink, fontSize: 13, fontWeight: "900", letterSpacing: 1.35 },
  brandSub: { color: C.muted, fontSize: 9, fontWeight: "700", letterSpacing: 1.5 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#29233D", borderWidth: 1, borderColor: "#51416E", alignItems: "center", justifyContent: "center" },
  avatarText: { color: C.ink, fontSize: 15, fontWeight: "800" }, avatarDot: { position: "absolute", width: 8, height: 8, right: 1, bottom: 1, borderRadius: 4, backgroundColor: C.lime, borderWidth: 1, borderColor: C.bg },
  greeting: { gap: 7 }, eyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.55 },
  headline: { color: C.ink, fontSize: 37, lineHeight: 41, letterSpacing: -1.5, fontWeight: "900" },
  headlineAccent: { color: C.lime }, subhead: { color: C.muted, fontSize: 12, letterSpacing: 0.15 },
  hero: { minHeight: 245, borderRadius: 26, padding: 17, gap: 10, overflow: "hidden" },
  heroOrbOne: { position: "absolute", right: -30, top: -36, width: 170, height: 170, borderRadius: 85, backgroundColor: "#FF5CA8", opacity: 0.15 },
  heroOrbTwo: { position: "absolute", right: -2, top: 28, width: 118, height: 118, borderRadius: 59, borderWidth: 1, borderColor: "#D8FF6A", opacity: 0.32 },
  heroOrbThree: { position: "absolute", right: 20, top: 50, width: 74, height: 74, borderRadius: 37, borderWidth: 1, borderColor: "#D8FF6A", opacity: 0.24 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 },
  heroPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(10,11,28,0.28)", borderRadius: 99, paddingHorizontal: 10, paddingVertical: 7 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.lime },
  heroPillText: { color: "#F3EFFF", fontSize: 8, fontWeight: "800", letterSpacing: 0.5 },
  heroArrow: { width: 30, height: 30, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" },
  heroTitle: { color: C.ink, fontSize: 27, lineHeight: 29, fontWeight: "900", letterSpacing: -0.6 },
  heroMeta: { color: "#E0DDF8", fontSize: 11, marginTop: -5 },
  progressMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 2 },
  progressLabel: { color: "#D4CCF1", fontSize: 8, fontWeight: "800", letterSpacing: 1.2 },
  progressPercent: { color: C.lime, fontSize: 12, fontWeight: "900" },
  progressTrack: { height: 5, borderRadius: 5, backgroundColor: "#69608F", overflow: "hidden" },
  progressFill: { width: "68%", height: 5, borderRadius: 5 },
  heroFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 1 },
  heroFooterText: { color: "#D5D0ED", fontSize: 10 }, resume: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: C.lime, borderRadius: 99, paddingHorizontal: 12, paddingVertical: 8 },
  resumeText: { color: C.bg, fontSize: 10, fontWeight: "900" },
  section: { gap: 11 }, sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  sectionTitle: { flex: 1, color: C.ink, fontSize: 16, fontWeight: "800", letterSpacing: -0.35 },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 3 }, actionText: { color: C.violet, fontSize: 10, fontWeight: "800" },
  statsRow: { flexDirection: "row", gap: 8 }, statCard: { flex: 1, minWidth: 0, backgroundColor: C.surface, borderRadius: 17, borderWidth: 1, borderColor: C.border, padding: 11, gap: 8 },
  statAccent: { backgroundColor: "#202A28", borderColor: "#48533A" }, statValue: { color: C.ink, fontSize: 14, fontWeight: "900", letterSpacing: -0.5 },
  statLabel: { color: C.muted, fontSize: 7, fontWeight: "800", letterSpacing: 0.65 },
  bentoRow: { flexDirection: "row", gap: 11 }, bentoCard: { flex: 1, minWidth: 0, borderRadius: 22, overflow: "hidden" },
  bentoGradient: { minHeight: 139, padding: 13, justifyContent: "space-between" },
  bentoIcon: { width: 36, height: 36, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.58)", alignItems: "center", justifyContent: "center" },
  bentoKicker: { color: "#6C5C9D", fontSize: 7, fontWeight: "900", letterSpacing: 0.7, marginBottom: 4 },
  bentoTitle: { color: "#17142C", fontSize: 16, fontWeight: "900", letterSpacing: -0.3 }, bentoMeta: { color: "#5F5879", fontSize: 9, marginTop: 3 },
  bentoArrow: { position: "absolute", right: 11, bottom: 12, width: 25, height: 25, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.62)", alignItems: "center", justifyContent: "center" },
  streakCard: { flexDirection: "row", alignItems: "center", gap: 11, padding: 13, borderRadius: 19, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border },
  streakIcon: { width: 37, height: 37, borderRadius: 14, backgroundColor: "#302A28", alignItems: "center", justifyContent: "center" },
  streakCopy: { flex: 1, gap: 4 }, streakTitle: { color: C.ink, fontSize: 13, fontWeight: "900" }, streakSubtitle: { color: C.muted, fontSize: 10 },
  streakPlus: { color: C.lime, fontSize: 17, fontWeight: "900" }, quickList: { gap: 8 },
  quickRow: { flexDirection: "row", alignItems: "center", gap: 11, padding: 12, borderRadius: 17, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border },
  quickIcon: { width: 39, height: 39, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  quickCopy: { flex: 1, gap: 4 }, quickTitle: { color: C.ink, fontSize: 12, fontWeight: "800" }, quickSubtitle: { color: C.muted, fontSize: 10 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 7, paddingTop: 2 },
  footerText: { color: C.muted, fontSize: 9, fontWeight: "600" },
  navWrap: { position: "absolute", left: 16, right: 16, bottom: 8 },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "rgba(25,28,49,0.98)", borderRadius: 25, paddingHorizontal: 4, paddingVertical: 6, borderWidth: 1, borderColor: "#343750" },
  navItem: { flex: 1, minWidth: 0, height: 47, alignItems: "center", justifyContent: "center", gap: 4, borderRadius: 16 },
  navItemActive: { backgroundColor: "#302344" }, navLabel: { color: C.faint, fontSize: 7, fontWeight: "800", letterSpacing: 0.35 },
  navLabelActive: { color: C.ink },
  errorScreen: { flex: 1, backgroundColor: C.bg, padding: 24, justifyContent: "center", gap: 12 },
  errorEyebrow: { color: C.rose, fontSize: 11, fontWeight: "800", letterSpacing: 1.1 },
  errorTitle: { color: C.ink, fontSize: 24, fontWeight: "800" }, errorMessage: { color: C.rose, fontSize: 14, lineHeight: 21, fontWeight: "600" },
  errorHint: { color: C.muted, fontSize: 12, lineHeight: 18 },
});
class AppErrorBoundary extends Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error("CivilPrep UI render error:", error); }
  render() {
    if (this.state.error) return <View style={s.errorScreen}>
      <Text style={s.errorEyebrow}>CIVILPREP • STARTUP DIAGNOSTIC</Text>
      <Text style={s.errorTitle}>The screen hit a rendering error.</Text>
      <Text style={s.errorMessage}>{this.state.error.message || "Unknown rendering error"}</Text>
      <Text style={s.errorHint}>Please share this message so the exact cause can be fixed.</Text>
    </View>;
    return this.props.children;
  }
}
export default function App() {
  return <AppErrorBoundary><SafeAreaProvider><AppContent /></SafeAreaProvider></AppErrorBoundary>;
}

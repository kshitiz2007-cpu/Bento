import React, { Component, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Flame,
  GraduationCap,
  House,
  Library,
  Menu,
  Newspaper,
  Play,
  Plus,
  Sparkles,
  Target,
  Timer,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { theme, shadow } from "./src/theme";

type Tab = "Home" | "Study" | "Practice" | "Library" | "Profile";

const tabs: { label: Tab; icon: typeof House }[] = [
  { label: "Home", icon: House },
  { label: "Study", icon: BookOpen },
  { label: "Practice", icon: Target },
  { label: "Library", icon: Library },
  { label: "Profile", icon: UserRound },
];

function Eyebrow({ children, color = theme.color.rose }: { children: React.ReactNode; color?: string }) {
  return <Text style={[styles.eyebrow, { color }]}>{children}</Text>;
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" style={styles.inlineAction}>
          <Text style={styles.inlineActionText}>{action}</Text>
          <ArrowUpRight size={14} color={theme.color.violet} />
        </Pressable>
      ) : null}
    </View>
  );
}

function StatCard({
  value,
  label,
  icon: Icon,
  accent = "default",
}: {
  value: string;
  label: string;
  icon: typeof Timer;
  accent?: "default" | "rose";
}) {
  const isRose = accent === "rose";
  return (
    <View style={[styles.statCard, isRose && styles.statCardRose]}>
      <View style={styles.statTop}>
        <Icon size={15} color={isRose ? theme.color.rose : theme.color.muted} strokeWidth={2.1} />
        {isRose ? <View style={styles.statDot} /> : null}
      </View>
      <Text style={[styles.statValue, isRose && { color: theme.color.rose }]}>{value}</Text>
      <Text style={[styles.statLabel, isRose && { color: theme.color.rose }]}>{label}</Text>
    </View>
  );
}

function QuickAction({
  title,
  subtitle,
  icon: Icon,
  tint,
  ink,
}: {
  title: string;
  subtitle: string;
  icon: typeof Sparkles;
  tint: string;
  ink: string;
}) {
  return (
    <Pressable accessibilityRole="button" style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
      <View style={[styles.quickIcon, { backgroundColor: tint }]}>
        <Icon size={19} color={ink} strokeWidth={2.2} />
      </View>
      <View style={styles.quickText}>
        <Text style={styles.quickTitle}>{title}</Text>
        <Text style={styles.quickSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={17} color={theme.color.muted} />
    </Pressable>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const { width } = useWindowDimensions();
  const compact = width < 375;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor={theme.color.canvas} />
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, compact && styles.scrollContentCompact]}
        >
          <View style={styles.header}>
            <Pressable accessibilityLabel="Open menu" style={styles.brandMark}>
              <GraduationCap size={22} color="#FFFFFF" strokeWidth={2.2} />
            </Pressable>
            <View style={styles.brandText}>
              <Text style={styles.brandName}>CIVILPREP</Text>
              <Text style={styles.brandSub}>GYANKUNJ ACADEMY</Text>
            </View>
            <Pressable accessibilityLabel="Open profile" style={styles.avatar}>
              <Text style={styles.avatarText}>K</Text>
              <View style={styles.avatarStatus} />
            </Pressable>
          </View>

          <View style={styles.greeting}>
            <Eyebrow>THURSDAY, 29 OCTOBER</Eyebrow>
            <Text style={styles.headline}>Your next rank{ "\n" }starts today.</Text>
            <Text style={styles.greetingSub}>A little progress, every single day.</Text>
          </View>

          <LinearGradient
            colors={["#171B30", "#24223F", "#342650"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroGlow} />
            <View style={styles.heroHeader}>
              <View style={styles.heroPill}>
                <Play size={10} fill={theme.color.roseSoft} color={theme.color.roseSoft} />
                <Text style={styles.heroPillText}>PICK UP WHERE YOU LEFT OFF</Text>
              </View>
              <View style={styles.heroArrow}>
                <ArrowUpRight size={17} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.heroTitle}>Indian Polity</Text>
            <Text style={styles.heroSub}>Fundamental Rights · Chapter 04</Text>
            <View style={styles.progressMeta}>
              <Text style={styles.progressLabel}>YOUR PROGRESS</Text>
              <Text style={styles.progressPercent}>68%</Text>
            </View>
            <View style={styles.progressTrack}>
              <LinearGradient
                colors={["#FF6BA5", "#D9A8FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressFill}
              />
            </View>
            <View style={styles.heroFooter}>
              <Text style={styles.heroFooterText}>18 min left to finish</Text>
              <Pressable accessibilityRole="button" style={styles.resumeButton}>
                <Text style={styles.resumeText}>Resume</Text>
                <ArrowRight size={15} color={theme.color.navy} />
              </Pressable>
            </View>
          </LinearGradient>

          <View style={styles.section}>
            <SectionTitle title="Your daily momentum" action="View stats" />
            <View style={styles.statsRow}>
              <StatCard value="2h 40m" label="FOCUS TIME" icon={Timer} />
              <StatCard value="12 days" label="STREAK" icon={Flame} />
              <StatCard value="4 / 5" label="TASKS DONE" icon={Check} accent="rose" />
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Made for your exam" action="See all" />
            <View style={styles.bentoGrid}>
              <Pressable accessibilityRole="button" style={({ pressed }) => [styles.bentoLarge, pressed && styles.pressed]}>
                <LinearGradient colors={["#F0E9FF", "#E8E1FF"]} style={styles.bentoGradient}>
                  <View style={styles.bentoIconPurple}>
                    <Zap size={19} color={theme.color.violet} fill={theme.color.violet} />
                  </View>
                  <View style={styles.bentoBottom}>
                    <Text style={styles.bentoTitle}>Daily Drill</Text>
                    <Text style={styles.bentoSubtitle}>10 MCQs · 8 min</Text>
                  </View>
                  <View style={styles.bentoArrowPurple}>
                    <ArrowUpRight size={15} color={theme.color.violet} />
                  </View>
                </LinearGradient>
              </Pressable>
              <Pressable accessibilityRole="button" style={({ pressed }) => [styles.bentoLarge, pressed && styles.pressed]}>
                <LinearGradient colors={["#FFE4EE", "#FFD9E8"]} style={styles.bentoGradient}>
                  <View style={styles.bentoIconRose}>
                    <Newspaper size={19} color={theme.color.rose} />
                  </View>
                  <View style={styles.bentoBottom}>
                    <Text style={styles.bentoTitle}>Daily Crux</Text>
                    <Text style={styles.bentoSubtitle}>5 key updates</Text>
                  </View>
                  <View style={styles.bentoArrowRose}>
                    <ArrowUpRight size={15} color={theme.color.rose} />
                  </View>
                </LinearGradient>
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Keep your streak alive" action="Open planner" />
            <View style={styles.targetCard}>
              <View style={styles.targetIcon}>
                <Target size={20} color={theme.color.rose} />
              </View>
              <View style={styles.targetCopy}>
                <Text style={styles.targetTitle}>One more task to go</Text>
                <Text style={styles.targetSub}>Complete today's revision target.</Text>
                <View style={styles.targetProgressTrack}>
                  <View style={styles.targetProgressFill} />
                </View>
              </View>
              <View style={styles.targetCount}>
                <Text style={styles.targetCountText}>80%</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Jump back in" />
            <View style={styles.quickList}>
              <QuickAction title="Revision cards" subtitle="Fundamental Rights · 12 cards" icon={BookOpen} tint={theme.color.violetSoft} ink={theme.color.violet} />
              <QuickAction title="Current affairs" subtitle="October 29 · Daily brief" icon={Newspaper} tint={theme.color.mint} ink={theme.color.success} />
              <QuickAction title="Mock test analysis" subtitle="Review your last attempt" icon={Trophy} tint={theme.color.amber} ink="#9A6411" />
            </View>
          </View>

          <View style={styles.footerNote}>
            <Sparkles size={14} color={theme.color.rose} />
            <Text style={styles.footerNoteText}>Small steps. Strong preparation. Your future.</Text>
          </View>
        </ScrollView>

        <View style={styles.navWrap}>
          <View style={styles.floatingNav}>
            {tabs.map(({ label, icon: Icon }) => {
              const active = activeTab === label;
              return (
                <Pressable
                  key={label}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setActiveTab(label)}
                  style={({ pressed }) => [
                    styles.navItem,
                    active && styles.navItemActive,
                    pressed && styles.navPressed,
                  ]}
                >
                  <Icon size={19} color={active ? theme.color.rose : theme.color.muted} strokeWidth={active ? 2.5 : 1.9} />
                  <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorScreen: { flex: 1, backgroundColor: "#F6F6FA", padding: 24, justifyContent: "center", gap: 12 },
  errorEyebrow: { color: "#F53B85", fontSize: 11, fontWeight: "800", letterSpacing: 1.1 },
  errorTitle: { color: "#131726", fontSize: 24, fontWeight: "800" },
  errorMessage: { color: "#9B174D", fontSize: 14, lineHeight: 21, fontWeight: "600" },
  errorHint: { color: "#686D7E", fontSize: 12, lineHeight: 18 },
  safeArea: { flex: 1, backgroundColor: theme.color.canvas },
  root: { flex: 1, backgroundColor: theme.color.canvas },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 130, gap: 24 },
  scrollContentCompact: { paddingHorizontal: 16, gap: 20 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandMark: { width: 42, height: 42, borderRadius: 15, backgroundColor: theme.color.navy, alignItems: "center", justifyContent: "center" },
  brandText: { flex: 1, gap: 2 },
  brandName: { color: theme.color.ink, fontSize: 13, fontWeight: "900", letterSpacing: 1.1 },
  brandSub: { color: theme.color.muted, fontSize: 9, fontWeight: "700", letterSpacing: 1.35 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.color.roseSoft, alignItems: "center", justifyContent: "center", position: "relative" },
  avatarText: { color: theme.color.rose, fontSize: 15, fontWeight: "800" },
  avatarStatus: { position: "absolute", width: 9, height: 9, borderRadius: 5, backgroundColor: theme.color.success, right: 0, bottom: 1, borderWidth: 2, borderColor: theme.color.canvas },
  greeting: { gap: 6 },
  eyebrow: { fontSize: 10, letterSpacing: 1.45, fontWeight: "800" },
  headline: { fontSize: 30, lineHeight: 35, letterSpacing: -0.9, fontWeight: "800", color: theme.color.ink },
  greetingSub: { color: theme.color.muted, fontSize: 13, lineHeight: 19 },
  hero: { borderRadius: 28, padding: 18, overflow: "hidden", minHeight: 220, ...shadow.card },
  heroGlow: { position: "absolute", width: 180, height: 180, borderRadius: 90, backgroundColor: "#604078", opacity: 0.26, right: -70, top: -80 },
  heroHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heroPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.10)", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 99 },
  heroPillText: { color: "#F9D7E6", fontSize: 8, letterSpacing: 0.65, fontWeight: "800" },
  heroArrow: { width: 30, height: 30, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.10)", alignItems: "center", justifyContent: "center" },
  heroTitle: { marginTop: 12, fontSize: 25, lineHeight: 30, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 },
  heroSub: { color: "#C3C5D2", fontSize: 12, marginTop: 2 },
  progressMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, marginBottom: 7 },
  progressLabel: { fontSize: 9, letterSpacing: 1, color: "#B9BBCB", fontWeight: "700" },
  progressPercent: { fontSize: 11, color: "#FFFFFF", fontWeight: "800" },
  progressTrack: { height: 6, borderRadius: 8, backgroundColor: "#3B3E53", overflow: "hidden" },
  progressFill: { width: "68%", height: "100%", borderRadius: 8 },
  heroFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  heroFooterText: { fontSize: 11, color: "#C6C7D3" },
  resumeButton: { flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "#FDE0EC", borderRadius: 99, paddingHorizontal: 13, paddingVertical: 9 },
  resumeText: { fontSize: 11, fontWeight: "800", color: theme.color.navy },
  section: { gap: 12 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  sectionTitle: { color: theme.color.ink, fontSize: 17, fontWeight: "800", letterSpacing: -0.3, flex: 1 },
  inlineAction: { flexDirection: "row", alignItems: "center", gap: 3 },
  inlineActionText: { color: theme.color.violet, fontSize: 11, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 9 },
  statCard: { flex: 1, minWidth: 0, paddingHorizontal: 11, paddingVertical: 12, backgroundColor: theme.color.surface, borderRadius: 18, gap: 7, borderWidth: 1, borderColor: "#F0F0F4" },
  statCardRose: { backgroundColor: theme.color.roseSoft, borderColor: "#FFD2E2" },
  statTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.color.rose },
  statValue: { color: theme.color.ink, fontSize: 15, fontWeight: "800", letterSpacing: -0.4 },
  statLabel: { color: theme.color.muted, fontSize: 8, letterSpacing: 0.7, fontWeight: "800" },
  bentoGrid: { flexDirection: "row", gap: 12 },
  bentoLarge: { flex: 1, minWidth: 0, borderRadius: 23, overflow: "hidden" },
  bentoGradient: { minHeight: 142, padding: 14, justifyContent: "space-between" },
  bentoIconPurple: { width: 38, height: 38, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.75)", alignItems: "center", justifyContent: "center" },
  bentoIconRose: { width: 38, height: 38, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.75)", alignItems: "center", justifyContent: "center" },
  bentoBottom: { gap: 4, paddingRight: 12 },
  bentoTitle: { fontSize: 16, color: theme.color.ink, fontWeight: "800", letterSpacing: -0.3 },
  bentoSubtitle: { fontSize: 11, color: "#55596A" },
  bentoArrowPurple: { position: "absolute", right: 12, bottom: 13, width: 25, height: 25, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.75)", alignItems: "center", justifyContent: "center" },
  bentoArrowRose: { position: "absolute", right: 12, bottom: 13, width: 25, height: 25, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.75)", alignItems: "center", justifyContent: "center" },
  targetCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: theme.color.surface, borderRadius: 21, borderWidth: 1, borderColor: "#EEEEF3" },
  targetIcon: { width: 42, height: 42, borderRadius: 15, backgroundColor: theme.color.roseSoft, alignItems: "center", justifyContent: "center" },
  targetCopy: { flex: 1, gap: 4 },
  targetTitle: { color: theme.color.ink, fontSize: 13, fontWeight: "800" },
  targetSub: { color: theme.color.muted, fontSize: 10, lineHeight: 15 },
  targetProgressTrack: { height: 4, borderRadius: 4, backgroundColor: "#F0DDE5", marginTop: 3, overflow: "hidden" },
  targetProgressFill: { height: "100%", width: "80%", borderRadius: 4, backgroundColor: theme.color.rose },
  targetCount: { width: 43, height: 43, borderRadius: 22, borderWidth: 3, borderColor: "#FFC6DB", alignItems: "center", justifyContent: "center" },
  targetCountText: { fontSize: 10, fontWeight: "800", color: theme.color.rose },
  quickList: { gap: 9 },
  quickCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 13, borderRadius: 18, backgroundColor: theme.color.surface, borderWidth: 1, borderColor: "#EEEEF3" },
  quickIcon: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  quickText: { flex: 1, gap: 4 },
  quickTitle: { color: theme.color.ink, fontSize: 13, fontWeight: "800" },
  quickSubtitle: { color: theme.color.muted, fontSize: 11 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  footerNote: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingTop: 2 },
  footerNoteText: { color: theme.color.muted, fontSize: 10, fontWeight: "600" },
  navWrap: { position: "absolute", left: 16, right: 16, bottom: 10 },
  floatingNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "rgba(255,255,255,0.97)", borderRadius: 26, paddingHorizontal: 5, paddingVertical: 7, borderWidth: 1, borderColor: "#ECECF2", ...shadow.card },
  navItem: { flex: 1, minWidth: 0, height: 48, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 17 },
  navItemActive: { backgroundColor: theme.color.roseSoft },
  navPressed: { opacity: 0.7 },
  navLabel: { color: theme.color.muted, fontSize: 9, fontWeight: "600" },
  navLabelActive: { color: theme.color.rose, fontWeight: "800" },
});

class AppErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("CivilPrep UI render error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorScreen}>
          <Text style={styles.errorEyebrow}>CIVILPREP • STARTUP DIAGNOSTIC</Text>
          <Text style={styles.errorTitle}>The screen hit a rendering error.</Text>
          <Text style={styles.errorMessage}>{this.state.error.message || "Unknown rendering error"}</Text>
          <Text style={styles.errorHint}>Please share this message so the exact cause can be fixed.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}

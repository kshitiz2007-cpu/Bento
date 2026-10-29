import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  Atom,
  Bell,
  BookOpen,
  BookOpenCheck,
  Bookmark,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  FlaskConical,
  GraduationCap,
  Home,
  Landmark,
  Library,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react-native";

type NavItem = { label: string; icon: React.ComponentType<any> };
const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: Home },
  { label: "Study", icon: BookOpen },
  { label: "Current Affairs", icon: CalendarDays },
  { label: "Tests & Drills", icon: BrainCircuit },
  { label: "Live Classes", icon: Video },
  { label: "Notes & Resources", icon: Library },
  { label: "My Progress", icon: Activity },
  { label: "Downloads", icon: ArrowDownToLine },
];
const SUBJECTS = [
  { name: "Polity & Governance", count: "120+ resources", icon: Landmark, colors: ["#312E81", "#172554"] as const },
  { name: "Economy", count: "95+ resources", icon: Activity, colors: ["#78350F", "#1E293B"] as const },
  { name: "International Relations", count: "80+ resources", icon: Atom, colors: ["#1D4ED8", "#172554"] as const },
  { name: "Environment", count: "75+ resources", icon: FlaskConical, colors: ["#065F46", "#0F172A"] as const },
  { name: "Science & Tech", count: "90+ resources", icon: Zap, colors: ["#4338CA", "#172554"] as const },
  { name: "History & Culture", count: "110+ resources", icon: Landmark, colors: ["#9A3412", "#1E1B4B"] as const },
];
const QUICK_ACTIONS = [
  { label: "Study Notes", icon: BookOpen, colors: ["#7C3AED", "#4F46E5"] as const },
  { label: "Practice Quiz", icon: BrainCircuit, colors: ["#DB2777", "#7C3AED"] as const },
  { label: "Current Affairs", icon: CalendarDays, colors: ["#0891B2", "#4F46E5"] as const },
  { label: "Mock Tests", icon: Target, colors: ["#D97706", "#DB2777"] as const },
];

function GlassPanel({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
    </View>
  );
}

function Metric({ icon: Icon, value, label, tone }: { icon: React.ComponentType<any>; value: string; label: string; tone: string }) {
  return (
    <GlassPanel style={styles.metric}>
      <View style={[styles.metricIcon, { backgroundColor: tone + "22" }]}>
        <Icon size={18} color={tone} strokeWidth={2.2} />
      </View>
      <View style={styles.metricText}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </GlassPanel>
  );
}

export function CivilPrepDashboard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isTablet = width >= 720;
  const [activeNav, setActiveNav] = useState("Home");
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [notice, setNotice] = useState("Your learning space is ready. Pick up where you left off.");
  const filteredSubjects = useMemo(
    () => SUBJECTS.filter((subject) => subject.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const Sidebar = (
    <View style={[styles.sidebar, !isDesktop && styles.mobileSidebar]}>
      <View style={styles.brandRow}>
        <LinearGradient colors={["#F472B6", "#8B5CF6", "#38BDF8"]} style={styles.brandMark}>
          <GraduationCap color="#FFFFFF" size={21} strokeWidth={2.4} />
        </LinearGradient>
        <Text style={styles.brandName}>Civil<Text style={styles.brandAccent}>Prep</Text></Text>
      </View>
      <Text style={styles.sidebarEyebrow}>YOUR WORKSPACE</Text>
      {NAV_ITEMS.map(({ label, icon: Icon }) => {
        const selected = activeNav === label;
        return (
          <Pressable
            key={label}
            onPress={() => {
              setActiveNav(label);
              setNotice(label === "Home" ? "Welcome back. Your next step is waiting." : label + " workspace selected — UI preview uses sample content.");
            }}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={[styles.navItem, selected && styles.navItemActive]}
          >
            <Icon size={17} color={selected ? "#F5D0FE" : "#9AA8C8"} />
            <Text style={[styles.navLabel, selected && styles.navLabelActive]}>{label}</Text>
            {selected ? <View style={styles.navDot} /> : null}
          </Pressable>
        );
      })}
      <View style={styles.sidebarSpacer} />
      <LinearGradient colors={["#211748", "#111A35"]} style={styles.streakCard}>
        <View style={styles.streakTop}>
          <Flame size={20} color="#FDBA74" fill="#FB923C" />
          <Text style={styles.streakDays}>12-day streak</Text>
        </View>
        <Text style={styles.streakTitle}>Consistency wins.</Text>
        <Text style={styles.streakSub}>A little progress every day adds up.</Text>
        <View style={styles.streakProgress}><View style={styles.streakProgressFill} /></View>
      </LinearGradient>
      <Pressable style={styles.profileRow} onPress={() => setNotice("Profile preview selected.")}>
        <LinearGradient colors={["#C084FC", "#EC4899"]} style={styles.avatar}><Text style={styles.avatarText}>K</Text></LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>Learner Profile</Text>
          <Text style={styles.profileSub}>UPSC Aspirant</Text>
        </View>
        <Settings2 size={17} color="#8290B2" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.app}>
      {isDesktop ? Sidebar : null}
      <View style={styles.main}>
        <View style={styles.topbar}>
          {!isDesktop ? (
            <Pressable style={styles.mobileBrand} onPress={() => setActiveNav("Home")}>
              <LinearGradient colors={["#F472B6", "#8B5CF6"]} style={styles.brandMarkSmall}>
                <GraduationCap size={17} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.brandName}>Civil<Text style={styles.brandAccent}>Prep</Text></Text>
            </Pressable>
          ) : null}
          <View style={[styles.searchBox, !isDesktop && styles.searchBoxMobile]}>
            <Search size={17} color="#7F8DB0" />
            <Text
              style={styles.searchPlaceholder}
              onPress={() => setNotice("Search preview: type a subject name in the subject filter below.")}
              numberOfLines={1}
            >Search notes, videos, tests, current affairs…</Text>
            {isDesktop ? <Text style={styles.shortcut}>⌘ K</Text> : null}
          </View>
          <View style={styles.topActions}>
            <View style={styles.topStreak}><Flame size={15} color="#FDBA74" /><Text style={styles.topStreakText}>12 days</Text></View>
            <Pressable style={styles.iconButton} onPress={() => setNotice("You’re all caught up — no new notifications.")} accessibilityLabel="Notifications">
              <Bell size={18} color="#B8C4E3" />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, !isDesktop && styles.contentCompact]}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#30205F", "#171C45", "#101A33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroGlowOne} />
            <View style={styles.heroGlowTwo} />
            <View style={styles.heroCopy}>
              <View style={styles.eyebrowPill}><Sparkles size={13} color="#F0ABFC" /><Text style={styles.eyebrowText}>YOUR PERSONAL LEARNING SPACE</Text></View>
              <Text style={styles.heroWelcome}>Welcome back, Kshitiz <Text style={{ color: "#F9A8D4" }}>✦</Text></Text>
              <Text style={styles.heroTitle}>लक्ष्य स्पष्ट है,{"\n"}और आप सही दिशा में हैं।</Text>
              <Text style={styles.heroSubtitle}>Structured learning · Daily practice · Real progress</Text>
              <View style={styles.heroSearch}>
                <Search size={18} color="#D8C9FF" />
                <Text style={styles.heroSearchText} numberOfLines={1}>आज आप क्या सीखना चाहते हैं?</Text>
                <Pressable style={styles.heroSearchButton} onPress={() => setActiveNav("Study")} accessibilityLabel="Explore study topics">
                  <ArrowRight size={17} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
            {isTablet ? (
              <View style={styles.heroQuote}>
                <View style={styles.quoteMark}><Sparkles size={18} color="#E9D5FF" /></View>
                <Text style={styles.quoteText}>“तैयारी सिर्फ परीक्षा के लिए नहीं, एक बेहतर भविष्य के लिए है।”</Text>
                <View style={styles.quoteDivider} />
                {[
                  { title: "Learn", desc: "Concepts with structured notes", icon: BookOpen },
                  { title: "Practice", desc: "MCQs, quizzes and mock tests", icon: BrainCircuit },
                  { title: "Track", desc: "See your progress clearly", icon: Activity },
                ].map(({ title, desc, icon: Icon }) => (
                  <View style={styles.quoteFeature} key={title}>
                    <View style={styles.quoteFeatureIcon}><Icon size={15} color="#D8B4FE" /></View>
                    <View><Text style={styles.quoteFeatureTitle}>{title}</Text><Text style={styles.quoteFeatureDesc}>{desc}</Text></View>
                  </View>
                ))}
              </View>
            ) : null}
            <View style={styles.heroOrbs}><View style={styles.orbLarge} /><View style={styles.orbSmall} /></View>
          </LinearGradient>

          <View style={styles.noticeRow}>
            <CheckCircle2 size={15} color="#6EE7B7" />
            <Text style={styles.noticeText}>{notice}</Text>
          </View>

          <View style={styles.metricsGrid}>
            <Metric icon={Flame} value="12 days" label="Learning streak" tone="#FDBA74" />
            <Metric icon={BookOpenCheck} value="142" label="Questions solved" tone="#C084FC" />
            <Metric icon={Activity} value="78%" label="Overall accuracy" tone="#34D399" />
            <Metric icon={Target} value="05" label="Mock tests" tone="#60A5FA" />
          </View>

          <View style={styles.continueWrap}>
            <GlassPanel style={styles.continueCard}>
              <LinearGradient colors={["#1D2A57", "#151B3B"]} style={styles.continueIcon}><BookOpen size={23} color="#C4B5FD" /></LinearGradient>
              <View style={styles.continueInfo}>
                <Text style={styles.continueEyebrow}>CONTINUE LEARNING</Text>
                <Text style={styles.continueTitle}>भारतीय संविधान का विकास</Text>
                <Text style={styles.continueMeta}>Notes · Polity · 18 min left</Text>
                <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
                <Text style={styles.progressLabel}>65% completed</Text>
              </View>
              <Pressable style={styles.playButton} onPress={() => { setActiveNav("Study"); setNotice("Continue learning: भारतीय संविधान का विकास (sample route preview)."); }} accessibilityLabel="Continue learning">
                <ArrowRight size={19} color="#FFFFFF" />
              </Pressable>
            </GlassPanel>
          </View>

          <View style={styles.sectionBlock}>
            <SectionTitle title="Explore by Subject" hint="BROWSE LIBRARY  →" />
            <View style={styles.subjectSearch}>
              <Search size={15} color="#7F8DB0" />
              <TextInput value={query} onChangeText={setQuery} placeholder="Filter subjects by name…" placeholderTextColor="#7F8DB0" autoCapitalize="none" style={styles.subjectSearchInput} accessibilityLabel="Filter subjects by name" />
              {query ? <Pressable onPress={() => setQuery("")}><Text style={styles.clearText}>Clear</Text></Pressable> : null}
            </View>
            <View style={[styles.subjectGrid, !isTablet && styles.subjectGridMobile]}>
              {filteredSubjects.map(({ name, count, icon: Icon, colors }) => (
                <Pressable key={name} style={[styles.subjectCard, { maxWidth: isDesktop ? "32%" : "48%", flexBasis: isDesktop ? 150 : "46%" }, activeSubject === name && styles.subjectCardSelected]} onPress={() => { setActiveSubject(name); setNotice(name + " selected. Subject resources are sample data in this UI milestone."); }}>
                  <LinearGradient colors={colors} style={styles.subjectArtwork}>
                    <View style={styles.artworkGlow} />
                    <Icon size={isDesktop ? 32 : 27} color="#E0E7FF" strokeWidth={1.5} />
                    <View style={styles.artworkOrb} />
                  </LinearGradient>
                  <View style={styles.subjectCardBottom}>
                    <Text style={styles.subjectName} numberOfLines={2}>{name}</Text>
                    <Text style={styles.subjectCount}>{count}</Text>
                  </View>
                  <View style={styles.subjectArrow}><ChevronRight size={14} color="#C4B5FD" /></View>
                </Pressable>
              ))}
              {filteredSubjects.length === 0 ? (
                <GlassPanel style={styles.emptyState}>
                  <CircleHelp size={22} color="#C4B5FD" />
                  <Text style={styles.emptyTitle}>No matching subjects</Text>
                  <Text style={styles.emptyCopy}>Try “Polity”, “Economy” or “History”.</Text>
                  <Pressable onPress={() => setQuery("")} style={styles.smallAction}><Text style={styles.smallActionText}>Reset filter</Text></Pressable>
                </GlassPanel>
              ) : null}
            </View>
          </View>

          <View style={[styles.lowerGrid, !isTablet && styles.lowerGridMobile]}>
            <GlassPanel style={styles.dailyCard}>
              <SectionTitle title="Your Daily Drill" hint="TODAY" />
              <Text style={styles.cardIntro}>Small, focused sessions create lasting recall.</Text>
              {[
                { label: "Revise Fundamental Rights", meta: "Polity · 10 questions", done: true },
                { label: "Read today’s current affairs", meta: "Daily crux · 8 min", done: false },
                { label: "Attempt a quick practice set", meta: "Mixed topics · 15 min", done: false },
              ].map((task) => (
                <Pressable key={task.label} style={styles.taskRow} onPress={() => setNotice(task.label + " selected for your daily plan.")}>
                  <View style={[styles.taskCheck, task.done && styles.taskCheckDone]}>{task.done ? <CheckCircle2 size={15} color="#6EE7B7" /> : <View style={styles.taskCheckInner} />}</View>
                  <View style={{ flex: 1 }}><Text style={styles.taskTitle}>{task.label}</Text><Text style={styles.taskMeta}>{task.meta}</Text></View>
                  <ChevronRight size={16} color="#7F8DB0" />
                </Pressable>
              ))}
            </GlassPanel>
            <GlassPanel style={styles.progressCard}>
              <SectionTitle title="Progress Snapshot" hint="THIS WEEK" />
              <View style={styles.progressHero}>
                <View style={styles.progressRing}><Text style={styles.progressRingValue}>78<Text style={styles.progressPercent}>%</Text></Text><Text style={styles.progressRingCaption}>accuracy</Text></View>
                <View style={styles.progressDetails}>
                  <Text style={styles.progressGood}><Activity size={14} color="#6EE7B7" /> +12% this month</Text>
                  <Text style={styles.progressDetailText}>You’re building a strong revision rhythm.</Text>
                  <View style={styles.miniBars}>{[30, 46, 38, 65, 52, 78, 68].map((height, i) => <View key={i} style={styles.miniBarTrack}><LinearGradient colors={i === 5 ? ["#F0ABFC", "#8B5CF6"] : ["#6366F1", "#38BDF8"]} style={[styles.miniBar, { height: height + "%" }]} /></View>)}</View>
                </View>
              </View>
              <View style={styles.progressFooter}><Trophy size={16} color="#FCD34D" /><Text style={styles.progressFooterText}>Consistency badge · 7-day goal achieved</Text></View>
            </GlassPanel>
          </View>

          <View style={styles.sectionBlock}>
            <SectionTitle title="Quick Access" hint="PICK UP THE PACE" />
            <View style={[styles.quickGrid, !isTablet && styles.quickGridMobile]}>
              {QUICK_ACTIONS.map(({ label, icon: Icon, colors }) => (
                <Pressable key={label} style={styles.quickCard} onPress={() => { setActiveNav(label === "Study Notes" ? "Study" : label === "Mock Tests" || label === "Practice Quiz" ? "Tests & Drills" : "Current Affairs"); setNotice(label + " opened in preview mode."); }}>
                  <LinearGradient colors={[...colors]} style={styles.quickIcon}><Icon size={20} color="#FFFFFF" /></LinearGradient>
                  <Text style={styles.quickLabel}>{label}</Text>
                  <ArrowRight size={15} color="#9CA3FF" />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerBrand}><ShieldCheck size={15} color="#A78BFA" /><Text style={styles.footerText}>CivilPrep · Learn with purpose</Text></View>
            <Text style={styles.footerNote}>UI foundation preview · Sample metrics, no backend connected</Text>
          </View>
        </ScrollView>

        {!isDesktop ? (
          <View style={styles.bottomNavWrap}>
            <BlurView intensity={42} tint="dark" style={styles.bottomNav}>
              {[
                { label: "Home", icon: Home },
                { label: "Study", icon: BookOpen },
                { label: "Practice", icon: BrainCircuit },
                { label: "Library", icon: Bookmark },
                { label: "Profile", icon: Users },
              ].map(({ label, icon: Icon }) => {
                const selected = (label === "Practice" && activeNav === "Tests & Drills") || (label === "Library" && activeNav === "Notes & Resources") || activeNav === label;
                return <Pressable key={label} style={styles.bottomNavItem} onPress={() => { setActiveNav(label === "Practice" ? "Tests & Drills" : label === "Library" ? "Notes & Resources" : label); setNotice(label + " section selected."); }}>
                  <View style={[styles.bottomNavIcon, selected && styles.bottomNavIconActive]}><Icon size={18} color={selected ? "#E9D5FF" : "#8290B2"} /></View>
                  <Text style={[styles.bottomNavLabel, selected && styles.bottomNavLabelActive]}>{label}</Text>
                </Pressable>;
              })}
            </BlurView>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, flexDirection: "row", backgroundColor: "#070B18", minHeight: "100%" },
  main: { flex: 1, minWidth: 0, backgroundColor: "#070B18" },
  sidebar: { width: 244, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 18, backgroundColor: "#0A1022", borderRightWidth: 1, borderRightColor: "#1E2B4C" },
  mobileSidebar: { width: "100%" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 35, paddingHorizontal: 4 },
  brandMark: { width: 37, height: 37, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  brandMarkSmall: { width: 31, height: 31, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  brandName: { color: "#F8FAFC", fontSize: 21, fontWeight: "800", letterSpacing: -0.7 },
  brandAccent: { color: "#C084FC" },
  sidebarEyebrow: { color: "#657493", fontSize: 9, fontWeight: "800", letterSpacing: 1.6, marginHorizontal: 10, marginBottom: 12 },
  navItem: { minHeight: 43, borderRadius: 12, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 5, borderWidth: 1, borderColor: "transparent" },
  navItemActive: { backgroundColor: "#39216B", borderColor: "#6D3BA6" },
  navLabel: { color: "#9AA8C8", fontSize: 12, fontWeight: "600", flex: 1 },
  navLabelActive: { color: "#F5D0FE", fontWeight: "700" },
  navDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#E879F9" },
  sidebarSpacer: { flex: 1, minHeight: 28 },
  streakCard: { borderRadius: 17, borderWidth: 1, borderColor: "#44326F", padding: 14, marginBottom: 18 },
  streakTop: { flexDirection: "row", alignItems: "center", gap: 7 },
  streakDays: { color: "#FDE68A", fontSize: 11, fontWeight: "800" },
  streakTitle: { color: "#F1F5F9", fontSize: 15, fontWeight: "800", marginTop: 12 },
  streakSub: { color: "#A7B3D0", fontSize: 10, lineHeight: 15, marginTop: 4 },
  streakProgress: { height: 4, backgroundColor: "#30375A", borderRadius: 4, marginTop: 12, overflow: "hidden" },
  streakProgressFill: { width: "76%", height: "100%", backgroundColor: "#C084FC", borderRadius: 4 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 3, paddingTop: 15, borderTopWidth: 1, borderTopColor: "#1C2948" },
  avatar: { width: 35, height: 35, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  profileName: { color: "#E2E8F0", fontSize: 11, fontWeight: "700" },
  profileSub: { color: "#7F8DB0", fontSize: 10, marginTop: 3 },
  topbar: { height: 70, paddingHorizontal: 26, flexDirection: "row", alignItems: "center", gap: 18, borderBottomWidth: 1, borderBottomColor: "#172340", backgroundColor: "#090E1F" },
  mobileBrand: { flexDirection: "row", alignItems: "center", gap: 7 },
  searchBox: { height: 41, flex: 1, maxWidth: 610, borderRadius: 13, borderWidth: 1, borderColor: "#253253", backgroundColor: "#101831", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 13 },
  searchBoxMobile: { height: 38, paddingHorizontal: 10 },
  searchPlaceholder: { color: "#8492B2", fontSize: 11, flex: 1 },
  shortcut: { color: "#8996B5", fontSize: 10, borderWidth: 1, borderColor: "#34405E", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  topActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  topStreak: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 11, paddingVertical: 9, borderRadius: 11, backgroundColor: "#231B37", borderWidth: 1, borderColor: "#49305D" },
  topStreakText: { color: "#FDE68A", fontSize: 10, fontWeight: "800" },
  iconButton: { width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: "#263252", alignItems: "center", justifyContent: "center", position: "relative" },
  notificationDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#F472B6", position: "absolute", right: 8, top: 7 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 26, paddingTop: 24, paddingBottom: 32, maxWidth: 1600, width: "100%", alignSelf: "center", gap: 19 },
  contentCompact: { paddingHorizontal: 15, paddingTop: 15, paddingBottom: 110, gap: 16 },
  hero: { borderRadius: 24, padding: 28, minHeight: 290, overflow: "hidden", borderWidth: 1, borderColor: "#4B3C82", flexDirection: "row", justifyContent: "space-between", position: "relative" },
  heroCopy: { flex: 1, maxWidth: 690, zIndex: 2, justifyContent: "center" },
  heroGlowOne: { position: "absolute", width: 300, height: 300, borderRadius: 150, right: 100, top: -160, backgroundColor: "#7C3AED", opacity: 0.2 },
  heroGlowTwo: { position: "absolute", width: 220, height: 220, borderRadius: 110, right: -50, bottom: -150, backgroundColor: "#EC4899", opacity: 0.2 },
  eyebrowPill: { flexDirection: "row", alignItems: "center", gap: 7, alignSelf: "flex-start", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#FFFFFF0D", borderWidth: 1, borderColor: "#C4B5FD35", marginBottom: 17 },
  eyebrowText: { color: "#D8B4FE", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  heroWelcome: { color: "#E2E8F0", fontSize: 14, fontWeight: "600", marginBottom: 9 },
  heroTitle: { color: "#FFFFFF", fontSize: 31, lineHeight: 42, fontWeight: "900", letterSpacing: -0.7 },
  heroSubtitle: { color: "#B7C1E0", fontSize: 12, marginTop: 10, marginBottom: 20 },
  heroSearch: { height: 48, maxWidth: 500, borderRadius: 15, paddingLeft: 14, paddingRight: 5, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#FFFFFF12", borderWidth: 1, borderColor: "#D8B4FE44" },
  heroSearchText: { color: "#D8D8F4", fontSize: 12, flex: 1 },
  heroSearchButton: { width: 37, height: 37, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#8B5CF6" },
  heroQuote: { width: 260, alignSelf: "stretch", borderRadius: 19, padding: 17, marginLeft: 20, backgroundColor: "#0B102B75", borderWidth: 1, borderColor: "#C4B5FD30", zIndex: 2 },
  quoteMark: { width: 31, height: 31, borderRadius: 10, backgroundColor: "#8B5CF633", alignItems: "center", justifyContent: "center", marginBottom: 9 },
  quoteText: { color: "#F3E8FF", fontSize: 14, lineHeight: 22, fontWeight: "700" },
  quoteDivider: { height: 1, backgroundColor: "#FFFFFF20", marginVertical: 13 },
  quoteFeature: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 11 },
  quoteFeatureIcon: { width: 29, height: 29, borderRadius: 9, backgroundColor: "#8B5CF62B", alignItems: "center", justifyContent: "center" },
  quoteFeatureTitle: { color: "#F3E8FF", fontSize: 11, fontWeight: "800" },
  quoteFeatureDesc: { color: "#A7B3D0", fontSize: 9, marginTop: 2 },
  heroOrbs: { position: "absolute", right: 300, top: 10, opacity: 0.55 },
  orbLarge: { width: 90, height: 90, borderRadius: 45, borderWidth: 1, borderColor: "#C4B5FD45" },
  orbSmall: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#F0ABFC", opacity: 0.3, position: "absolute", top: 20, left: 50 },
  noticeRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 4, minHeight: 18 },
  noticeText: { color: "#91A1C3", fontSize: 10, flex: 1 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  panel: { backgroundColor: "#0D152B", borderWidth: 1, borderColor: "#253253", borderRadius: 17 },
  metric: { flexGrow: 1, flexBasis: 145, minHeight: 88, padding: 14, flexDirection: "row", alignItems: "center", gap: 11 },
  metricIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  metricText: { flex: 1 },
  metricValue: { color: "#F8FAFC", fontSize: 20, fontWeight: "900", letterSpacing: -0.4 },
  metricLabel: { color: "#8D9BBB", fontSize: 10, marginTop: 4 },
  continueWrap: { width: "100%" },
  continueCard: { padding: 17, flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#111831" },
  continueIcon: { width: 54, height: 54, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  continueInfo: { flex: 1, minWidth: 0 },
  continueEyebrow: { color: "#A78BFA", fontSize: 9, fontWeight: "800", letterSpacing: 1.1 },
  continueTitle: { color: "#F8FAFC", fontSize: 15, fontWeight: "800", marginTop: 6 },
  continueMeta: { color: "#8D9BBB", fontSize: 10, marginTop: 4 },
  progressTrack: { height: 5, borderRadius: 5, backgroundColor: "#283354", marginTop: 11, overflow: "hidden", maxWidth: 450 },
  progressFill: { width: "65%", height: "100%", borderRadius: 5, backgroundColor: "#A855F7" },
  progressLabel: { color: "#8D9BBB", fontSize: 9, marginTop: 5 },
  playButton: { width: 42, height: 42, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#7C3AED" },
  sectionBlock: { gap: 14 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  sectionTitle: { color: "#F1F5F9", fontSize: 18, fontWeight: "900", letterSpacing: -0.35 },
  sectionHint: { color: "#A78BFA", fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
  subjectSearch: { height: 39, borderRadius: 12, backgroundColor: "#0D152B", borderWidth: 1, borderColor: "#253253", flexDirection: "row", alignItems: "center", gap: 9, paddingHorizontal: 12 },
  subjectSearchText: { color: "#7F8DB0", fontSize: 11, flex: 1 },
  subjectSearchInput: { color: "#E2E8F0", fontSize: 11, flex: 1, paddingVertical: 0, outlineStyle: "none" } as any,
  clearText: { color: "#C4B5FD", fontSize: 10, fontWeight: "700" },
  subjectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  subjectGridMobile: { gap: 10 },
  subjectCard: { flexGrow: 1, flexBasis: 150, minWidth: 0, borderRadius: 17, overflow: "hidden", borderWidth: 1, borderColor: "#2C3A61", backgroundColor: "#0D152B", position: "relative" },
  subjectCardSelected: { borderColor: "#C084FC", borderWidth: 2 },
  subjectArtwork: { height: 100, alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" },
  artworkGlow: { position: "absolute", width: 95, height: 95, borderRadius: 48, backgroundColor: "#FFFFFF", opacity: 0.045, top: -30, right: -20 },
  artworkOrb: { position: "absolute", width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: "#FFFFFF20", bottom: -24, left: 16 },
  subjectCardBottom: { paddingHorizontal: 12, paddingVertical: 11, paddingRight: 25 },
  subjectName: { color: "#F1F5F9", fontSize: 11, lineHeight: 15, fontWeight: "800", minHeight: 30 },
  subjectCount: { color: "#9AA8C8", fontSize: 9, marginTop: 5 },
  subjectArrow: { position: "absolute", right: 8, bottom: 11, width: 20, height: 20, borderRadius: 7, backgroundColor: "#8B5CF622", alignItems: "center", justifyContent: "center" },
  emptyState: { flexGrow: 1, flexBasis: "100%", alignItems: "center", padding: 25, gap: 8 },
  emptyTitle: { color: "#F1F5F9", fontSize: 14, fontWeight: "800" },
  emptyCopy: { color: "#9AA8C8", fontSize: 11, textAlign: "center" },
  smallAction: { marginTop: 5, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: "#6D28D9" },
  smallActionText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  lowerGrid: { flexDirection: "row", gap: 14 },
  lowerGridMobile: { flexDirection: "column" },
  dailyCard: { flex: 1.1, padding: 18, gap: 13 },
  progressCard: { flex: 0.9, padding: 18, gap: 14 },
  cardIntro: { color: "#8D9BBB", fontSize: 11, marginTop: -5 },
  taskRow: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#202D4A" },
  taskCheck: { width: 25, height: 25, borderRadius: 9, borderWidth: 1, borderColor: "#485778", alignItems: "center", justifyContent: "center" },
  taskCheckDone: { backgroundColor: "#064E3B55", borderColor: "#047857" },
  taskCheckInner: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#7F8DB0" },
  taskTitle: { color: "#DDE5F5", fontSize: 11, fontWeight: "700" },
  taskMeta: { color: "#7F8DB0", fontSize: 9, marginTop: 4 },
  progressHero: { flexDirection: "row", alignItems: "center", gap: 18 },
  progressRing: { width: 108, height: 108, borderRadius: 54, borderWidth: 8, borderColor: "#8B5CF6", backgroundColor: "#151B3B", alignItems: "center", justifyContent: "center" },
  progressRingValue: { color: "#FFFFFF", fontSize: 25, fontWeight: "900" },
  progressPercent: { color: "#C4B5FD", fontSize: 13 },
  progressRingCaption: { color: "#9AA8C8", fontSize: 9, marginTop: 1 },
  progressDetails: { flex: 1 },
  progressGood: { color: "#6EE7B7", fontSize: 10, fontWeight: "800", flexDirection: "row", alignItems: "center" },
  progressDetailText: { color: "#9AA8C8", fontSize: 10, lineHeight: 15, marginTop: 7 },
  miniBars: { height: 42, flexDirection: "row", alignItems: "flex-end", gap: 5, marginTop: 7 },
  miniBarTrack: { flex: 1, height: "100%", justifyContent: "flex-end", borderRadius: 4, backgroundColor: "#1C2948", overflow: "hidden" },
  miniBar: { width: "100%", borderRadius: 4 },
  progressFooter: { flexDirection: "row", alignItems: "center", gap: 8, borderTopWidth: 1, borderTopColor: "#202D4A", paddingTop: 12 },
  progressFooterText: { color: "#A7B3D0", fontSize: 10 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  quickGridMobile: { gap: 9 },
  quickCard: { flexGrow: 1, flexBasis: 180, flexDirection: "row", alignItems: "center", gap: 10, padding: 13, borderRadius: 15, backgroundColor: "#0D152B", borderWidth: 1, borderColor: "#253253" },
  quickIcon: { width: 39, height: 39, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  quickLabel: { color: "#E2E8F0", fontSize: 11, fontWeight: "800", flex: 1 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#172340" },
  footerBrand: { flexDirection: "row", alignItems: "center", gap: 7 },
  footerText: { color: "#9AA8C8", fontSize: 10, fontWeight: "700" },
  footerNote: { color: "#647393", fontSize: 9 },
  bottomNavWrap: { position: "absolute", left: 12, right: 12, bottom: 10, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "#B9A5FF35", backgroundColor: "#0A1022D9" },
  bottomNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 5, paddingTop: 8, paddingBottom: 9, backgroundColor: "#0B1028AA" },
  bottomNavItem: { flex: 1, alignItems: "center", gap: 3 },
  bottomNavIcon: { width: 33, height: 28, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  bottomNavIconActive: { backgroundColor: "#7C3AED55" },
  bottomNavLabel: { color: "#7786A7", fontSize: 9, fontWeight: "600" },
  bottomNavLabelActive: { color: "#E9D5FF", fontWeight: "800" },
});

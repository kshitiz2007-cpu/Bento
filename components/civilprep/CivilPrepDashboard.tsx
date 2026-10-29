import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Atom, AudioLines, BookOpen,
  BrainCircuit, CalendarDays, Check, ChevronRight, CircleHelp, Clock3, Compass,
  Flame, GraduationCap, Landmark, Layers3, Menu, Search, Sparkles, Target,
  Timer, Trophy, Waypoints, Zap
} from "lucide-react-native";

const INK = "#17211D";
const MUTED = "#737B72";
const PAPER = "#F2F0E7";
const BLUE = "#354BEA";
const LIME = "#D9F56A";
const RULE = "#D8D8CC";

const SECTIONS = [
  { label: "Overview", index: "01" },
  { label: "Learn", index: "02" },
  { label: "Briefing", index: "03" },
  { label: "Practice", index: "04" },
  { label: "Progress", index: "05" },
];
const SUBJECTS = [
  { name: "Constitutional India", short: "POLITY", count: "24 field notes", icon: Landmark, number: "01", progress: 68 },
  { name: "The living economy", short: "ECONOMY", count: "18 field notes", icon: Activity, number: "02", progress: 42 },
  { name: "Earth systems", short: "GEOGRAPHY", count: "16 field notes", icon: Compass, number: "03", progress: 81 },
  { name: "Science at the edge", short: "SCIENCE", count: "12 field notes", icon: Atom, number: "04", progress: 27 },
];
const BRIEFINGS = [
  { category: "POLITY", title: "Finance Commission: the fiscal compact", time: "06 MIN", color: "#354BEA" },
  { category: "ENVIRONMENT", title: "A new lens on biodiversity finance", time: "04 MIN", color: "#527A35" },
  { category: "SCIENCE", title: "Semiconductors and strategic autonomy", time: "08 MIN", color: "#B65A3C" },
];

function Rule({ style }: { style?: object }) { return <View style={[styles.rule, style]} />; }
function Eyebrow({ children, color = MUTED }: { children: React.ReactNode; color?: string }) {
  return <Text style={[styles.eyebrow, { color }]}>{children}</Text>;
}
function Action({ children, onPress, inverted = false }: { children: React.ReactNode; onPress: () => void; inverted?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.action, inverted && styles.actionInverted]}>{children}</Pressable>;
}

export function CivilPrepDashboard() {
  const { width } = useWindowDimensions();
  const wide = width >= 1120;
  const mid = width >= 760;
  const [section, setSection] = useState("Overview");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState("Constitutional India");
  const [notice, setNotice] = useState("Your field notes are ready.");
  const [drillStarted, setDrillStarted] = useState(false);
  const filtered = useMemo(() => SUBJECTS.filter(s => (s.name + s.short).toLowerCase().includes(filter.toLowerCase())), [filter]);

  const nav = (
    <View style={[styles.rail, !wide && styles.railCompact]}>
      <View style={styles.brandMark}><GraduationCap size={22} color={PAPER} /></View>
      {SECTIONS.map((item) => {
        const active = item.label === section;
        return <Pressable key={item.label} onPress={() => { setSection(item.label); setNotice(item.label + " workspace selected."); }} style={[styles.railItem, active && styles.railItemActive]}>
          <Text style={[styles.railIndex, active && styles.railIndexActive]}>{item.index}</Text>
          {wide ? <Text style={[styles.railLabel, active && styles.railLabelActive]}>{item.label}</Text> : null}
        </Pressable>;
      })}
      <View style={{ flex: 1 }} />
      <Pressable onPress={() => setNotice("Your saved field notes are up to date.")} style={styles.railBottom}><Layers3 size={18} color={INK} /></Pressable>
    </View>
  );

  return (
    <View style={styles.root}>
      {wide ? nav : null}
      <View style={styles.workspace}>
        <View style={styles.topline}>
          {!wide ? <View style={styles.brandInline}><View style={styles.brandMarkSmall}><GraduationCap size={17} color={PAPER} /></View><Text style={styles.brandWord}>CIVILPREP<span> / FIELDWORK</span></Text></View> : <Eyebrow> CIVILPREP / FIELDWORK — VOL. 01 </Eyebrow>}
          <View style={styles.toplineRight}>
            <View style={styles.liveDot} /><Text style={styles.toplineMeta}>YOUR STUDY SYSTEM</Text>
            <Pressable onPress={() => setNotice("Search is ready — filter the learning atlas below.")} style={styles.searchButton}><Search size={16} color={INK} /><Text style={styles.searchButtonText}>SEARCH</Text></Pressable>
          </View>
        </View>
        {!wide ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mobileNav}>
          {SECTIONS.map(item => <Pressable key={item.label} onPress={() => { setSection(item.label); setNotice(item.label + " workspace selected."); }} style={[styles.mobileNavItem, section === item.label && styles.mobileNavItemActive]}><Text style={[styles.mobileNavText, section === item.label && styles.mobileNavTextActive]}>{item.index}  {item.label}</Text></Pressable>)}
        </ScrollView> : null}
        <ScrollView contentContainerStyle={[styles.page, !wide && styles.pageMobile]} showsVerticalScrollIndicator={false}>
          <View style={styles.masthead}>
            <View style={styles.mastheadTitle}>
              <Eyebrow color={BLUE}>THURSDAY, 29 OCTOBER 2026  /  YOUR DAILY EDITION</Eyebrow>
              <Text style={styles.greeting}>Good evening,</Text>
              <Text style={styles.nameTitle}>Kshitiz<Text style={styles.period}>.</Text></Text>
              <Text style={styles.intro}>The syllabus is vast. Your next move doesn't have to be.</Text>
            </View>
            <View style={styles.editionStamp}>
              <Text style={styles.stampTop}>TODAY'S</Text><Text style={styles.stampMain}>FIELD</Text><Text style={styles.stampMain}>NOTES</Text>
              <Rule style={{ backgroundColor: INK, marginVertical: 9 }} />
              <Text style={styles.stampDate}>ED. 029 / 365</Text>
            </View>
          </View>

          <View style={styles.statusLine}><View style={styles.statusMark}><Sparkles size={13} color={INK} /></View><Text style={styles.statusText}>{notice}</Text><Text style={styles.statusRight}>SYSTEM STATUS  <Text style={{ color: "#3C8555" }}>● READY</Text></Text></View>
          <Rule />

          <View style={[styles.leadGrid, !mid && styles.stack]}>
            <View style={styles.leadStory}>
              <View style={styles.storyMeta}><Eyebrow color={BLUE}>01 / THE BIG PICTURE</Eyebrow><View style={styles.metaDash} /><Eyebrow>4 MIN READ</Eyebrow></View>
              <Text style={styles.leadHeadline}>Make sense.{ "\n" }Then make progress.</Text>
              <Text style={styles.leadBody}>A sharper way to prepare for the civil services: connect ideas, test what you know, and return to what matters.</Text>
              <Action onPress={() => { setSection("Learn"); setNotice("Your learning atlas is ready below."); }}><Text style={styles.actionText}>ENTER YOUR LEARNING ATLAS</Text><ArrowUpRight size={17} color={PAPER} /></Action>
            </View>
            <View style={styles.focusPanel}>
              <View style={styles.focusTop}><Eyebrow color={LIME}>YOUR FOCUS WINDOW</Eyebrow><AudioLines size={19} color={LIME} /></View>
              <Text style={styles.focusNumber}>38<Text style={styles.focusUnit}> min</Text></Text>
              <Text style={styles.focusDescription}>One deliberate session beats an hour of distracted scrolling.</Text>
              <View style={styles.focusTrack}><View style={styles.focusTrackFill} /></View>
              <View style={styles.focusBottom}><Text style={styles.focusSmall}>TODAY'S DEEP WORK</Text><Text style={styles.focusSmall}>22 / 38 MIN</Text></View>
              <Pressable onPress={() => { setDrillStarted(!drillStarted); setNotice(drillStarted ? "Focus session paused." : "Focus session started — 16 minutes to your goal."); }} style={styles.focusPlay}><Text style={styles.focusPlayText}>{drillStarted ? "PAUSE SESSION" : "START FOCUS SESSION"}</Text><ArrowRight size={15} color={INK} /></Pressable>
            </View>
          </View>

          <View style={styles.metricsStrip}>
            <View style={styles.metricCell}><Eyebrow>STREAK</Eyebrow><Text style={styles.metricBig}>12<Text style={styles.metricSuffix}> days</Text></Text><Text style={styles.metricNote}><Flame size={12} color="#B65A3C" /> Still in motion</Text></View>
            <Rule style={styles.metricDivider} />
            <View style={styles.metricCell}><Eyebrow>RECALL RATE</Eyebrow><Text style={styles.metricBig}>78<Text style={styles.metricSuffix}>%</Text></Text><Text style={styles.metricNote}><ArrowUpRight size={12} color="#3C8555" /> +6% this month</Text></View>
            <Rule style={styles.metricDivider} />
            <View style={styles.metricCell}><Eyebrow>QUESTIONS</Eyebrow><Text style={styles.metricBig}>142</Text><Text style={styles.metricNote}>Across 9 topics</Text></View>
            <Rule style={styles.metricDivider} />
            <View style={styles.metricCell}><Eyebrow>MOCKS</Eyebrow><Text style={styles.metricBig}>05</Text><Text style={styles.metricNote}>Last score 112/200</Text></View>
          </View>

          <View style={styles.sectionHeader}>
            <View><Eyebrow color={BLUE}>02 / THE LEARNING ATLAS</Eyebrow><Text style={styles.sectionHeadline}>Where will you go next?</Text></View>
            <View style={styles.filterBox}><Search size={14} color={MUTED} /><TextInput value={filter} onChangeText={setFilter} placeholder="Find a territory…" placeholderTextColor={MUTED} style={styles.filterInput} accessibilityLabel="Filter learning atlas" /></View>
          </View>
          <View style={[styles.atlasLayout, !mid && styles.stack]}>
            <View style={styles.atlasIndex}>
              <Text style={styles.atlasIndexBig}>A—Z</Text><Rule /><Text style={styles.atlasIndexText}>THE{ "\n" }SYLLABUS{ "\n" }IS A{ "\n" }TERRITORY.</Text>
              <View style={styles.atlasCompass}><Compass size={39} color={BLUE} strokeWidth={1.1} /><View style={styles.compassCenter} /></View>
              <Eyebrow>SELECT A REGION</Eyebrow>
            </View>
            <View style={styles.atlasList}>
              {filtered.map((subject, i) => {
                const Icon = subject.icon;
                const active = selected === subject.name;
                return <Pressable key={subject.name} onPress={() => { setSelected(subject.name); setNotice(subject.name + " selected in your learning atlas."); }} style={[styles.atlasRow, active && styles.atlasRowActive]}>
                  <Text style={[styles.atlasNumber, active && styles.atlasNumberActive]}>{subject.number}</Text>
                  <View style={styles.atlasRowMain}>
                    <Eyebrow color={active ? LIME : MUTED}>{subject.short}</Eyebrow>
                    <Text style={[styles.atlasTitle, active && styles.atlasTitleActive]}>{subject.name}</Text>
                    <Text style={[styles.atlasCount, active && styles.atlasCountActive]}>{subject.count}</Text>
                    <View style={[styles.atlasProgress, active && styles.atlasProgressActive]}><View style={[styles.atlasProgressFill, { width: subject.progress + "%" }, active && styles.atlasProgressFillActive]} /></View>
                  </View>
                  <View style={styles.atlasRowEnd}><Text style={[styles.atlasPercent, active && styles.atlasPercentActive]}>{subject.progress}%</Text><ChevronRight size={17} color={active ? LIME : MUTED} /></View>
                </Pressable>;
              })}
              {filtered.length === 0 ? <View style={styles.noResults}><CircleHelp size={20} color={BLUE} /><Text style={styles.noResultsText}>No territory found. Try Polity, Economy or Science.</Text></View> : null}
            </View>
          </View>

          <View style={styles.briefingHead}>
            <View><Eyebrow color={BLUE}>03 / THE DAILY BRIEFING</Eyebrow><Text style={styles.sectionHeadline}>The world, distilled.</Text></View>
            <Text style={styles.briefingDate}>29 OCT  /  THURSDAY</Text>
          </View>
          <View style={[styles.briefingLayout, !mid && styles.stack]}>
            <View style={styles.briefingLead}>
              <View style={styles.briefingImage}>
                <LinearGradient colors={["#D9E3FF", "#AAB8F7", "#5667C7"]} style={styles.briefingArt}>
                  <View style={styles.artSun} /><View style={styles.artOrbitOne} /><View style={styles.artOrbitTwo} />
                  <Landmark size={mid ? 92 : 68} color="#25347C" strokeWidth={0.8} />
                  <View style={styles.artLabel}><Text style={styles.artLabelText}>POLICY / 001</Text></View>
                </LinearGradient>
              </View>
              <Eyebrow color={BLUE}>EDITOR'S PICK  /  POLITY</Eyebrow>
              <Text style={styles.briefingHeadline}>Finance Commission: who gets what, and why?</Text>
              <Text style={styles.briefingBody}>Understand the constitutional logic behind fiscal transfers, vertical devolution and the questions examiners actually ask.</Text>
              <Pressable onPress={() => setNotice("Finance Commission briefing opened in preview mode.")} style={styles.textLink}><Text style={styles.textLinkText}>READ THE BRIEFING</Text><ArrowUpRight size={15} color={BLUE} /></Pressable>
            </View>
            <View style={styles.briefingRail}>
              {BRIEFINGS.slice(1).map((item, i) => <Pressable key={item.title} onPress={() => setNotice(item.title + " briefing selected.")} style={styles.briefingItem}>
                <View style={[styles.briefingColor, { backgroundColor: item.color }]} />
                <View style={styles.briefingItemContent}><Eyebrow color={item.color}>{item.category} / 0{i + 2}</Eyebrow><Text style={styles.briefingItemTitle}>{item.title}</Text><Text style={styles.briefingItemTime}><Clock3 size={11} color={MUTED} /> {item.time} READ</Text></View>
                <ArrowUpRight size={16} color={INK} />
              </Pressable>)}
              <View style={styles.briefingQuote}><Text style={styles.quoteGlyph}>“</Text><Text style={styles.briefingQuoteText}>Current affairs become powerful when they connect to static concepts.</Text><Eyebrow color={LIME}>THE CIVILPREP METHOD</Eyebrow></View>
            </View>
          </View>

          <View style={styles.practiceBand}>
            <View style={styles.practiceLeft}>
              <Eyebrow color={LIME}>04 / RETRIEVAL PRACTICE</Eyebrow>
              <Text style={styles.practiceTitle}>Can you recall it{ "\n" }without looking?</Text>
              <Text style={styles.practiceCopy}>A quick, low-stakes check to make knowledge stick.</Text>
            </View>
            <View style={styles.practiceRight}>
              <View style={styles.practiceMeta}><View style={styles.practiceIcon}><BrainCircuit size={18} color={LIME} /></View><Eyebrow color="#B5B9AC">DAILY DRILL / POLITY</Eyebrow><Text style={styles.practiceDuration}><Timer size={14} color={LIME} /> 05 QUESTIONS · 04 MIN</Text></View>
              <Text style={styles.practiceQuestion}>{drillStarted ? "Focus session is active. Ready to test your recall?" : "Which Article establishes the Finance Commission of India?"}</Text>
              <Action inverted onPress={() => { setDrillStarted(true); setSection("Practice"); setNotice("Daily drill launched in preview mode. Question data is illustrative."); }}><Text style={styles.actionInvertedText}>BEGIN THE DRILL</Text><ArrowRight size={16} color={INK} /></Action>
            </View>
            <View style={styles.practiceWatermark}><Text style={styles.practiceWatermarkText}>Q.</Text></View>
          </View>

          <View style={styles.bottomLine}>
            <View style={styles.bottomBrand}><View style={styles.bottomBrandMark}><GraduationCap size={16} color={PAPER} /></View><Text style={styles.bottomBrandText}>CIVILPREP <Text style={{ color: MUTED }}>/ LEARN WITH INTENT</Text></Text></View>
            <Text style={styles.bottomNote}>UI CONCEPT / SAMPLE DATA / BUILD 001</Text>
          </View>
        </ScrollView>
        {!wide ? <View style={styles.mobileDock}>
          <Pressable onPress={() => setSection("Overview")} style={styles.dockItem}><Compass size={18} color={section === "Overview" ? LIME : "#A9B0A4"} /><Text style={[styles.dockText, section === "Overview" && styles.dockTextActive]}>EXPLORE</Text></Pressable>
          <Pressable onPress={() => setSection("Learn")} style={styles.dockItem}><BookOpen size={18} color={section === "Learn" ? LIME : "#A9B0A4"} /><Text style={[styles.dockText, section === "Learn" && styles.dockTextActive]}>LEARN</Text></Pressable>
          <Pressable onPress={() => setSection("Practice")} style={styles.dockCenter}><Zap size={20} color={INK} /><Text style={styles.dockCenterText}>DRILL</Text></Pressable>
          <Pressable onPress={() => setSection("Briefing")} style={styles.dockItem}><CalendarDays size={18} color={section === "Briefing" ? LIME : "#A9B0A4"} /><Text style={[styles.dockText, section === "Briefing" && styles.dockTextActive]}>BRIEF</Text></Pressable>
          <Pressable onPress={() => setSection("Progress")} style={styles.dockItem}><Activity size={18} color={section === "Progress" ? LIME : "#A9B0A4"} /><Text style={[styles.dockText, section === "Progress" && styles.dockTextActive]}>GROW</Text></Pressable>
        </View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: "row", backgroundColor: PAPER, minHeight: "100%" },
  workspace: { flex: 1, minWidth: 0, backgroundColor: PAPER },
  rail: { width: 188, backgroundColor: "#E8E7DC", borderRightWidth: 1, borderRightColor: RULE, paddingHorizontal: 18, paddingTop: 23, paddingBottom: 20 },
  railCompact: { width: 70, paddingHorizontal: 10 },
  brandMark: { width: 43, height: 43, borderRadius: 14, backgroundColor: INK, alignItems: "center", justifyContent: "center", marginBottom: 48 },
  railItem: { minHeight: 46, flexDirection: "row", alignItems: "center", gap: 11, paddingHorizontal: 9, borderRadius: 9, marginBottom: 6 },
  railItemActive: { backgroundColor: INK },
  railIndex: { color: "#8A9085", fontSize: 10, fontWeight: "800", fontVariant: ["tabular-nums"] },
  railIndexActive: { color: LIME },
  railLabel: { color: "#737B72", fontSize: 12, fontWeight: "700" },
  railLabelActive: { color: PAPER },
  railBottom: { width: 40, height: 40, borderRadius: 13, backgroundColor: LIME, alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  topline: { height: 63, borderBottomWidth: 1, borderBottomColor: RULE, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 27, gap: 14 },
  toplineRight: { flexDirection: "row", alignItems: "center", gap: 9 },
  toplineMeta: { color: MUTED, fontSize: 9, letterSpacing: 1.2, fontWeight: "800" },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#3C8555" },
  searchButton: { height: 33, paddingHorizontal: 11, flexDirection: "row", alignItems: "center", gap: 7, borderWidth: 1, borderColor: "#C8CABC", borderRadius: 7, marginLeft: 10 },
  searchButtonText: { color: INK, fontSize: 9, fontWeight: "800", letterSpacing: 0.6 },
  brandInline: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandMarkSmall: { width: 29, height: 29, borderRadius: 9, backgroundColor: INK, alignItems: "center", justifyContent: "center" },
  brandWord: { color: INK, fontSize: 12, fontWeight: "900", letterSpacing: 0.3 },
  mobileNav: { paddingHorizontal: 15, paddingVertical: 10, gap: 8, borderBottomWidth: 1, borderBottomColor: RULE },
  mobileNavItem: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: "#D0D0C5" },
  mobileNavItemActive: { backgroundColor: INK, borderColor: INK },
  mobileNavText: { color: MUTED, fontSize: 10, fontWeight: "700" },
  mobileNavTextActive: { color: LIME },
  page: { paddingHorizontal: 34, paddingTop: 29, paddingBottom: 50, maxWidth: 1500, width: "100%", alignSelf: "center" },
  pageMobile: { paddingHorizontal: 18, paddingTop: 22, paddingBottom: 112 },
  masthead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 20, paddingBottom: 24 },
  mastheadTitle: { flex: 1 },
  eyebrow: { color: MUTED, fontSize: 9, fontWeight: "900", letterSpacing: 1.4, lineHeight: 14 },
  greeting: { color: INK, fontSize: 22, marginTop: 18, fontWeight: "500", letterSpacing: -0.5 },
  nameTitle: { color: INK, fontSize: 63, lineHeight: 68, fontWeight: "900", letterSpacing: -3.2 },
  period: { color: BLUE },
  intro: { color: "#596157", fontSize: 13, lineHeight: 20, marginTop: 8, maxWidth: 440 },
  editionStamp: { width: 145, borderLeftWidth: 1, borderLeftColor: "#B9BDB0", paddingLeft: 18, paddingBottom: 4, marginBottom: 4 },
  stampTop: { color: MUTED, fontSize: 9, fontWeight: "900", letterSpacing: 2 },
  stampMain: { color: INK, fontSize: 25, lineHeight: 26, fontWeight: "900", letterSpacing: -0.8 },
  stampDate: { color: MUTED, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  statusLine: { minHeight: 37, flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 7 },
  statusMark: { width: 23, height: 23, borderRadius: 7, backgroundColor: LIME, alignItems: "center", justifyContent: "center" },
  statusText: { color: "#596157", fontSize: 10, flex: 1 },
  statusRight: { color: MUTED, fontSize: 8, fontWeight: "900", letterSpacing: 0.6 },
  rule: { height: 1, backgroundColor: RULE, width: "100%" },
  leadGrid: { flexDirection: "row", gap: 24, paddingVertical: 27 },
  stack: { flexDirection: "column" },
  leadStory: { flex: 1.35, minWidth: 0, paddingVertical: 6, paddingRight: 10 },
  storyMeta: { flexDirection: "row", alignItems: "center", gap: 10 },
  metaDash: { width: 25, height: 1, backgroundColor: RULE },
  leadHeadline: { color: INK, fontSize: 44, lineHeight: 48, letterSpacing: -2.1, fontWeight: "900", marginTop: 19 },
  leadBody: { color: "#596157", fontSize: 13, lineHeight: 21, maxWidth: 410, marginTop: 12, marginBottom: 21 },
  action: { alignSelf: "flex-start", minHeight: 43, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 6, backgroundColor: BLUE, flexDirection: "row", alignItems: "center", gap: 16 },
  actionInverted: { backgroundColor: LIME },
  actionText: { color: PAPER, fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  actionInvertedText: { color: INK, fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  focusPanel: { flex: 0.85, minWidth: 245, backgroundColor: INK, padding: 21, position: "relative", overflow: "hidden" },
  focusTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  focusNumber: { color: PAPER, fontSize: 56, lineHeight: 65, fontWeight: "900", letterSpacing: -2.2, marginTop: 14 },
  focusUnit: { color: LIME, fontSize: 20, letterSpacing: -0.4 },
  focusDescription: { color: "#B7BCAF", fontSize: 11, lineHeight: 17, maxWidth: 260 },
  focusTrack: { height: 5, backgroundColor: "#3A443C", marginTop: 20, overflow: "hidden" },
  focusTrackFill: { height: "100%", width: "58%", backgroundColor: LIME },
  focusBottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  focusSmall: { color: "#A3AB9C", fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
  focusPlay: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: LIME, paddingHorizontal: 12, paddingVertical: 11, marginTop: 19 },
  focusPlayText: { color: INK, fontSize: 9, fontWeight: "900", letterSpacing: 0.5 },
  metricsStrip: { flexDirection: "row", alignItems: "stretch", paddingVertical: 18, borderTopWidth: 1, borderBottomWidth: 1, borderColor: RULE, gap: 17 },
  metricCell: { flex: 1, minWidth: 0, gap: 5 },
  metricDivider: { width: 1, height: 55, alignSelf: "center" },
  metricBig: { color: INK, fontSize: 28, lineHeight: 32, fontWeight: "900", letterSpacing: -1.1 },
  metricSuffix: { fontSize: 12, color: MUTED, fontWeight: "700", letterSpacing: 0 },
  metricNote: { color: MUTED, fontSize: 9, flexDirection: "row", alignItems: "center", gap: 4 },
  sectionHeader: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 15, paddingTop: 36, paddingBottom: 17 },
  sectionHeadline: { color: INK, fontSize: 27, fontWeight: "900", letterSpacing: -1.2, marginTop: 5 },
  filterBox: { width: 210, height: 38, borderBottomWidth: 1, borderBottomColor: "#AEB4A5", flexDirection: "row", alignItems: "center", gap: 8 },
  filterInput: { color: INK, fontSize: 11, flex: 1, paddingVertical: 5, outlineStyle: "none" } as any,
  atlasLayout: { flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: RULE, minHeight: 260 },
  atlasIndex: { width: 185, padding: 18, borderRightWidth: 1, borderRightColor: RULE, justifyContent: "space-between" },
  atlasIndexBig: { color: BLUE, fontSize: 40, fontWeight: "900", letterSpacing: -2 },
  atlasIndexText: { color: INK, fontSize: 17, lineHeight: 20, fontWeight: "900", letterSpacing: -0.5, marginVertical: 13 },
  atlasCompass: { alignSelf: "flex-start", position: "relative", marginVertical: 9 },
  compassCenter: { position: "absolute", width: 5, height: 5, borderRadius: 3, backgroundColor: LIME, top: 17, left: 17 },
  atlasList: { flex: 1, minWidth: 0 },
  atlasRow: { flexDirection: "row", alignItems: "center", gap: 13, minHeight: 91, paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: RULE },
  atlasRowActive: { backgroundColor: INK },
  atlasNumber: { color: "#9CA296", fontSize: 11, fontWeight: "900", alignSelf: "flex-start", marginTop: 4 },
  atlasNumberActive: { color: LIME },
  atlasRowMain: { flex: 1, minWidth: 0 },
  atlasTitle: { color: INK, fontSize: 16, lineHeight: 20, fontWeight: "800", letterSpacing: -0.3, marginTop: 2 },
  atlasTitleActive: { color: PAPER },
  atlasCount: { color: MUTED, fontSize: 9, marginTop: 4 },
  atlasCountActive: { color: "#B7BCAF" },
  atlasProgress: { height: 2, backgroundColor: "#D4D7CC", marginTop: 9, maxWidth: 290 },
  atlasProgressActive: { backgroundColor: "#39443B" },
  atlasProgressFill: { height: "100%", backgroundColor: BLUE },
  atlasProgressFillActive: { backgroundColor: LIME },
  atlasRowEnd: { alignItems: "flex-end", gap: 7 },
  atlasPercent: { color: MUTED, fontSize: 10, fontWeight: "800" },
  atlasPercentActive: { color: LIME },
  noResults: { padding: 25, flexDirection: "row", gap: 10, alignItems: "center" },
  noResultsText: { color: MUTED, fontSize: 11, flex: 1 },
  briefingHead: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 12, paddingTop: 37, paddingBottom: 17 },
  briefingDate: { color: MUTED, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  briefingLayout: { flexDirection: "row", gap: 25, paddingBottom: 36 },
  briefingLead: { flex: 1.15, minWidth: 0 },
  briefingImage: { height: 175, overflow: "hidden", marginBottom: 15 },
  briefingArt: { flex: 1, alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" },
  artSun: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "#E6F3A4", top: -15, right: 30, opacity: 0.9 },
  artOrbitOne: { position: "absolute", width: 250, height: 100, borderRadius: 125, borderWidth: 1, borderColor: "#FFFFFF85", transform: [{ rotate: "-22deg" }] },
  artOrbitTwo: { position: "absolute", width: 300, height: 130, borderRadius: 150, borderWidth: 1, borderColor: "#FFFFFF60", transform: [{ rotate: "18deg" }] },
  artLabel: { position: "absolute", left: 13, bottom: 12, backgroundColor: PAPER, paddingHorizontal: 8, paddingVertical: 5 },
  artLabelText: { color: INK, fontSize: 8, fontWeight: "900", letterSpacing: 1 },
  briefingHeadline: { color: INK, fontSize: 23, lineHeight: 27, letterSpacing: -0.8, fontWeight: "900", marginTop: 8, maxWidth: 490 },
  briefingBody: { color: "#596157", fontSize: 11, lineHeight: 18, marginTop: 8, maxWidth: 500 },
  textLink: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 14, alignSelf: "flex-start" },
  textLinkText: { color: BLUE, fontSize: 9, fontWeight: "900", letterSpacing: 0.8 },
  briefingRail: { flex: 0.9, minWidth: 0, borderTopWidth: 1, borderTopColor: RULE },
  briefingItem: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: RULE },
  briefingColor: { width: 4, height: 54 },
  briefingItemContent: { flex: 1, gap: 6 },
  briefingItemTitle: { color: INK, fontSize: 15, lineHeight: 19, fontWeight: "800", letterSpacing: -0.3 },
  briefingItemTime: { color: MUTED, fontSize: 9, flexDirection: "row", alignItems: "center", gap: 4 },
  briefingQuote: { backgroundColor: INK, padding: 17, marginTop: 15 },
  quoteGlyph: { color: LIME, fontSize: 34, lineHeight: 35, fontWeight: "900" },
  briefingQuoteText: { color: PAPER, fontSize: 14, lineHeight: 20, fontWeight: "700", marginBottom: 13 },
  practiceBand: { backgroundColor: INK, padding: 24, flexDirection: "row", alignItems: "center", gap: 24, position: "relative", overflow: "hidden", marginBottom: 30 },
  practiceLeft: { flex: 1, minWidth: 0, zIndex: 1 },
  practiceTitle: { color: PAPER, fontSize: 30, lineHeight: 34, letterSpacing: -1.2, fontWeight: "900", marginTop: 10 },
  practiceCopy: { color: "#B7BCAF", fontSize: 11, lineHeight: 17, marginTop: 9, maxWidth: 270 },
  practiceRight: { flex: 1, minWidth: 0, zIndex: 1 },
  practiceMeta: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 9 },
  practiceIcon: { width: 32, height: 32, borderRadius: 9, backgroundColor: "#FFFFFF12", alignItems: "center", justifyContent: "center" },
  practiceDuration: { color: "#B7BCAF", fontSize: 9, flexDirection: "row", alignItems: "center", gap: 4 },
  practiceQuestion: { color: PAPER, fontSize: 16, lineHeight: 22, fontWeight: "700", marginTop: 15, marginBottom: 16 },
  practiceWatermark: { position: "absolute", right: 10, bottom: -50, opacity: 0.05 },
  practiceWatermarkText: { color: PAPER, fontSize: 190, fontWeight: "900" },
  bottomLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: 17, borderTopWidth: 1, borderTopColor: RULE },
  bottomBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  bottomBrandMark: { width: 26, height: 26, borderRadius: 8, backgroundColor: INK, alignItems: "center", justifyContent: "center" },
  bottomBrandText: { color: INK, fontSize: 9, fontWeight: "900", letterSpacing: 0.6 },
  bottomNote: { color: MUTED, fontSize: 8, fontWeight: "800", letterSpacing: 0.7 },
  mobileDock: { position: "absolute", left: 12, right: 12, bottom: 10, minHeight: 63, backgroundColor: INK, flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 6, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: "#495147" },
  dockItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  dockText: { color: "#A9B0A4", fontSize: 7, fontWeight: "900", letterSpacing: 0.7 },
  dockTextActive: { color: LIME },
  dockCenter: { width: 54, height: 48, alignItems: "center", justifyContent: "center", backgroundColor: LIME, borderRadius: 12, gap: 2 },
  dockCenterText: { color: INK, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 },
});
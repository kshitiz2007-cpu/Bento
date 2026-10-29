import React, { useMemo, useState } from "react";
import {
  Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View,
} from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import { CognitiveHeroArtwork } from "@/components/civilprep/CivilPrepVisualSystem";
import {
  ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronRight, Compass,
  Network, Search, Sparkles, Target, X,
} from "lucide-react-native";

const C = {
  ink: "#172A27", paper: "#F4F1E9", lime: "#C6F36A", cobalt: "#355DCA",
  muted: "#68736B", line: "#D9DDD3", panel: "#EAEDE4", white: "#FFFFFF",
  darkMuted: "#C8D2CB", red: "#B94A48", green: "#2E7D55",
};

type Screen = "mission" | "field" | "recall";
type Topic = { id: string; title: string; group: string; description: string; related: string[] };
const TOPICS: Topic[] = [
  { id: "rights", title: "Fundamental Rights", group: "POLITY", description: "Articles 12–35 · constitutional safeguards", related: ["equality", "dpsp", "judgments"] },
  { id: "equality", title: "Right to Equality", group: "POLITY", description: "Articles 14–18 · equality and classification", related: ["rights", "judgments"] },
  { id: "dpsp", title: "Directive Principles", group: "POLITY", description: "Part IV · goals of the welfare state", related: ["rights", "parliament"] },
  { id: "parliament", title: "Parliament", group: "POLITY", description: "Legislature · law-making and accountability", related: ["dpsp", "current"] },
  { id: "judgments", title: "Landmark Judgments", group: "POLITY", description: "Judicial interpretation of the Constitution", related: ["rights", "equality"] },
  { id: "current", title: "Current Affairs Links", group: "BRIEFING", description: "Connect today's news to static syllabus concepts", related: ["parliament", "rights"] },
];

const QUESTIONS = [
  {
    prompt: "Which Article guarantees equality before the law and equal protection of the laws?",
    options: ["Article 12", "Article 14", "Article 19", "Article 32"],
    answer: 1,
    explanation: "Article 14 guarantees equality before the law and equal protection of the laws to every person within its scope.",
  },
  {
    prompt: "The Directive Principles of State Policy are primarily contained in which Part?",
    options: ["Part II", "Part III", "Part IV", "Part IVA"],
    answer: 2,
    explanation: "Directive Principles of State Policy are contained in Part IV of the Constitution, Articles 36–51.",
  },
  {
    prompt: "Which Article provides the right to constitutional remedies?",
    options: ["Article 21", "Article 25", "Article 32", "Article 44"],
    answer: 2,
    explanation: "Article 32 allows individuals to move the Supreme Court for enforcement of Fundamental Rights.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <Text style={[s.eyebrow, light && { color: C.darkMuted }]}>{children}</Text>;
}
function Action({ children, onPress, secondary = false }: { children: React.ReactNode; onPress: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[s.action, secondary && s.actionSecondary]}>{children}</Pressable>;
}
function Rule() { return <View style={s.rule} />; }

function FieldMap({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const nodes = [
    { id: "rights", x: 160, y: 92, label: "Fundamental Rights", r: 29 },
    { id: "equality", x: 64, y: 40, label: "Equality", r: 19 },
    { id: "dpsp", x: 254, y: 38, label: "DPSP", r: 19 },
    { id: "parliament", x: 279, y: 145, label: "Parliament", r: 19 },
    { id: "judgments", x: 88, y: 160, label: "Judgments", r: 19 },
    { id: "current", x: 168, y: 181, label: "Current affairs", r: 17 },
  ];
  const links = [["rights", "equality"], ["rights", "dpsp"], ["rights", "parliament"], ["rights", "judgments"], ["rights", "current"], ["dpsp", "parliament"], ["equality", "judgments"]];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <View style={s.mapFrame}>
      <Svg viewBox="0 0 330 220" width="100%" height={235}>
        {links.map(([a, b]) => <Line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} stroke="#91A097" strokeWidth="1.4" strokeOpacity=".7" />)}
        {nodes.map(n => {
          const active = n.id === selectedId;
          return <React.Fragment key={n.id}>
            <Circle cx={n.x} cy={n.y} r={n.r + (active ? 4 : 0)} fill={active ? C.lime : C.ink} stroke={active ? C.ink : "#FFFFFF"} strokeWidth={active ? 2 : 1} onPress={() => onSelect(n.id)} />
            <SvgText x={n.x} y={n.y + n.r + 13} fontSize="9" fill={C.ink} fontWeight={active ? "700" : "500"} textAnchor="middle" onPress={() => onSelect(n.id)}>{n.label}</SvgText>
          </React.Fragment>;
        })}
      </Svg>
      <Text style={s.mapHint}>Select a node to inspect its connections. Use the topic list below for an accessible alternative.</Text>
    </View>
  );
}

export function CivilPrepCognitiveField() {
  const { width } = useWindowDimensions();
  const desktop = width >= 1050;
  const [screen, setScreen] = useState<Screen>("mission");
  const [topicId, setTopicId] = useState("rights");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"understand" | "visualise" | "recall" | "exam">("understand");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [notice, setNotice] = useState("Prototype mode · sample learning content");

  const topic = TOPICS.find(t => t.id === topicId) ?? TOPICS[0];
  const filteredTopics = useMemo(() => TOPICS.filter(t => (t.title + t.group).toLowerCase().includes(query.toLowerCase())), [query]);
  const question = QUESTIONS[questionIndex];
  const answeredCount = Object.keys(submitted).filter(k => submitted[Number(k)]).length;
  const score = QUESTIONS.reduce((total, q, i) => total + (submitted[i] && answers[i] === q.answer ? 1 : 0), 0);

  const openTopic = (id: string) => {
    setTopicId(id);
    setMode("understand");
    setScreen("field");
    setNotice("Topic workspace · illustrative content");
  };
  const startRecall = () => {
    setQuestionIndex(0);
    setShowSummary(false);
    setScreen("recall");
    setNotice("Recall session · sample questions");
  };
  const navigation = [
    { id: "mission" as Screen, label: "Mission", icon: Compass },
    { id: "field" as Screen, label: "Explore", icon: Network },
    { id: "recall" as Screen, label: "Recall", icon: Brain },
  ];

  const navButton = (id: Screen, label: string, Icon: typeof Compass) => (
    <Pressable key={id} accessibilityRole="button" accessibilityState={{ selected: screen === id }} onPress={() => id === "recall" ? startRecall() : setScreen(id)} style={[s.navItem, screen === id && s.navItemActive, !desktop && s.mobileNavItem]}>
      <Icon size={18} color={screen === id ? C.lime : C.darkMuted} />
      {desktop ? <Text style={[s.navText, screen === id && s.navTextActive]}>{label}</Text> : <Text style={[s.mobileNavText, screen === id && s.navTextActive]}>{label}</Text>}
    </Pressable>
  );

  return (
    <View style={[s.root, desktop && s.rootDesktop]}>
      {desktop ? <View style={s.sidebar}>
        <View style={s.brandMark}><Compass color={C.lime} size={23} /></View>
        <Text style={s.brand}>CIVILPREP</Text>
        <Text style={s.brandSub}>THE COGNITIVE FIELD</Text>
        <View style={s.navGroup}>{navigation.map(n => navButton(n.id, n.label, n.icon))}</View>
        <View style={s.sidebarFoot}><Text style={s.sidebarFootText}>LEARN WITH INTENT</Text><Text style={s.sidebarFootText}>PROTOTYPE / V1</Text></View>
      </View> : null}
      <View style={s.workspace}>
        <View style={s.topbar}>
          {!desktop ? <View style={s.brandInline}><View style={s.brandMarkSmall}><Compass color={C.lime} size={18} /></View><Text style={s.brand}>CIVILPREP</Text></View> : <Eyebrow>THE COGNITIVE FIELD / VOL. 01</Eyebrow>}
          <View style={s.topbarRight}><View style={s.statusDot} /><Text style={s.topbarStatus}>PROTOTYPE MODE</Text></View>
        </View>
        <ScrollView contentContainerStyle={[s.page, desktop && s.pageDesktop]} showsVerticalScrollIndicator={false}>
          <View style={s.notice}><Sparkles size={14} color={C.ink} /><Text style={s.noticeText}>{notice}</Text><Text style={s.sampleTag}>SAMPLE DATA</Text></View>

          {screen === "mission" ? <>
            <View style={[s.heroGrid, desktop && s.heroGridDesktop]}>
              <View style={s.heroMain}>
                <Eyebrow>YOUR NEXT STEP / DAILY MISSION</Eyebrow>
                <Text style={s.heroTitle}>Make sense.{ "\n" }Then make progress.</Text>
                <Text style={s.heroBody}>A focused path through the syllabus, with the wider knowledge field always one step away.</Text>
                <CognitiveHeroArtwork />
                <View style={s.mission}>
                  <View style={s.missionHead}><Eyebrow light>RECOMMENDED MISSION</Eyebrow><Target size={18} color={C.lime} /></View>
                  <Text style={s.missionTitle}>Fundamental Rights</Text>
                  <Text style={s.missionBody}>Review key Articles, connect related concepts, then test your recall.</Text>
                  <View style={s.missionMeta}><Text style={s.missionMetaText}>POLITY · ABOUT 20 MIN</Text><Action onPress={() => openTopic("rights")}><Text style={s.actionText}>BEGIN MISSION</Text><ArrowRight color={C.ink} size={16} /></Action></View>
                </View>
              </View>
              <View style={s.sideStack}>
                <Pressable accessibilityRole="button" onPress={() => { setScreen("field"); setNotice("Explore connected syllabus concepts."); }} style={s.fieldPreview}>
                  <View style={s.previewHead}><Eyebrow>THE KNOWLEDGE FIELD</Eyebrow><ArrowRight size={17} color={C.ink} /></View>
                  <Text style={s.previewTitle}>Your syllabus, connected.</Text>
                  <FieldMap selectedId={topicId} onSelect={openTopic} />
                  <Text style={s.previewLink}>OPEN THE FIELD ↗</Text>
                </Pressable>
                <View style={s.quickRow}>
                  <Pressable onPress={() => openTopic("rights")} style={s.quickAction}><BookOpen color={C.ink} size={18} /><Text style={s.quickTitle}>Continue</Text><Text style={s.quickSub}>Fundamental Rights</Text></Pressable>
                  <Pressable onPress={startRecall} style={s.quickAction}><Brain color={C.ink} size={18} /><Text style={s.quickTitle}>Daily recall</Text><Text style={s.quickSub}>3 sample questions</Text></Pressable>
                </View>
              </View>
            </View>
            <Rule />
            <View style={s.sectionHead}><View><Eyebrow>YOUR STUDY WORLD</Eyebrow><Text style={s.sectionTitle}>Choose a territory.</Text></View><Text style={s.sectionNote}>Browse by topic, not by card grid.</Text></View>
            <TextInput accessibilityLabel="Search topics" value={query} onChangeText={setQuery} placeholder="Search Polity, Equality, Judgments…" placeholderTextColor={C.muted} style={s.searchInput} />
            <View style={[s.topicList, desktop && s.topicListDesktop]}>{filteredTopics.map((t, i) => <Pressable key={t.id} onPress={() => openTopic(t.id)} style={s.topicRow}>
              <Text style={s.topicIndex}>{String(i + 1).padStart(2, "0")}</Text><View style={s.topicMain}><Eyebrow>{t.group}</Eyebrow><Text style={s.topicTitle}>{t.title}</Text><Text style={s.topicDescription}>{t.description}</Text></View><ChevronRight color={C.muted} size={18} />
            </Pressable>)}</View>
            {filteredTopics.length === 0 ? <Text style={s.empty}>No matching topics. Try a broader search.</Text> : null}
          </> : null}

          {screen === "field" ? <>
            <View style={s.screenHeading}>
              <Eyebrow>EXPLORE / CONNECTED SYLLABUS</Eyebrow>
              <Text style={s.heroTitle}>The Knowledge Field.</Text>
              <Text style={s.heroBody}>Select a node, inspect its relationships, or use the searchable topic index.</Text>
            </View>
            <View style={[s.fieldLayout, desktop && s.fieldLayoutDesktop]}>
              <View style={s.fieldMain}><FieldMap selectedId={topicId} onSelect={openTopic} />
                <View style={s.fieldLegend}><View style={s.legendDot} /><Text style={s.mapHint}>Selected topic</Text><View style={[s.legendDot, { backgroundColor: C.ink }]} /><Text style={s.mapHint}>Related concepts</Text></View>
              </View>
              <View style={s.topicPanel}>
                <Eyebrow>{topic.group} / SELECTED TOPIC</Eyebrow><Text style={s.topicPanelTitle}>{topic.title}</Text><Text style={s.topicDescription}>{topic.description}</Text>
                <Rule />
                <Eyebrow>CONNECTED TOPICS</Eyebrow>
                {topic.related.map(id => { const related = TOPICS.find(t => t.id === id); return related ? <Pressable key={id} onPress={() => setTopicId(id)} style={s.relatedRow}><Text style={s.relatedText}>{related.title}</Text><ChevronRight color={C.muted} size={15} /></Pressable> : null; })}
                <Rule />
                <Eyebrow>CHOOSE A MODE</Eyebrow>
                {([
                  ["understand", "Understand", "Notes and explanations", BookOpen],
                  ["visualise", "Visualise", "Concept relationships", Network],
                  ["recall", "Recall", "Active revision", Brain],
                  ["exam", "Exam mode", "PYQ-style practice", Target],
                ] as const).map(([id, label, desc, Icon]) => <Pressable key={id} onPress={() => { setMode(id); if (id === "recall" || id === "exam") startRecall(); }} style={[s.modeRow, mode === id && s.modeRowActive]}><Icon size={17} color={mode === id ? C.lime : C.ink} /><View style={s.modeCopy}><Text style={[s.modeTitle, mode === id && s.modeTitleActive]}>{label}</Text><Text style={[s.modeDesc, mode === id && s.modeDescActive]}>{desc}</Text></View><ChevronRight size={15} color={mode === id ? C.lime : C.muted} /></Pressable>)}
                {mode === "understand" ? <View style={s.studyPreview}><Eyebrow>STUDY PREVIEW</Eyebrow><Text style={s.studyPreviewTitle}>Start with the constitutional text.</Text><Text style={s.studyPreviewBody}>Read the relevant Articles, identify key terms, then compare related provisions. Full lesson content will be connected after the prototype review.</Text></View> : null}
                {mode === "visualise" ? <View style={s.studyPreview}><Eyebrow>VISUALISATION PREVIEW</Eyebrow><Text style={s.studyPreviewTitle}>Follow the relationships.</Text><Text style={s.studyPreviewBody}>Use the field nodes and related-topic links to trace how this concept connects to other parts of the syllabus.</Text></View> : null}
              </View>
            </View>
            <View style={s.sectionHead}><Text style={s.sectionTitle}>Topic index</Text><Text style={s.sectionNote}>An accessible alternative to the map.</Text></View>
            <TextInput accessibilityLabel="Search knowledge field" value={query} onChangeText={setQuery} placeholder="Find a topic…" placeholderTextColor={C.muted} style={s.searchInput} />
            <View style={s.topicList}>{filteredTopics.map(t => <Pressable key={t.id} onPress={() => setTopicId(t.id)} style={[s.topicRow, topicId === t.id && s.topicRowActive]}><View style={s.topicMain}><Eyebrow>{t.group}</Eyebrow><Text style={[s.topicTitle, topicId === t.id && s.topicTitleActive]}>{t.title}</Text><Text style={[s.topicDescription, topicId === t.id && s.topicDescriptionActive]}>{t.description}</Text></View><ChevronRight color={topicId === t.id ? C.lime : C.muted} size={18} /></Pressable>)}</View>
          </> : null}

          {screen === "recall" ? <>
            <View style={s.screenHeading}>
              <Eyebrow>RECALL CHAMBER / POLITY</Eyebrow>
              <Text style={s.heroTitle}>{showSummary ? "Session complete." : "Retrieve. Then reinforce."}</Text>
              <Text style={s.heroBody}>A small sample session demonstrates the flow. This is not a live exam or saved production assessment.</Text>
            </View>
            {showSummary ? <View style={s.summaryPanel}><View style={s.summaryIcon}><Check size={24} color={C.ink} /></View><Eyebrow>SESSION SUMMARY</Eyebrow><Text style={s.summaryScore}>{score} / {QUESTIONS.length}</Text><Text style={s.topicDescription}>Correct answers in this sample session.</Text><Action onPress={() => { setAnswers({}); setSubmitted({}); setQuestionIndex(0); setShowSummary(false); }}><Text style={s.actionText}>TRY AGAIN</Text><ArrowRight size={16} color={C.ink} /></Action><Action secondary onPress={() => setScreen("field")}><Text style={s.actionSecondaryText}>RETURN TO FIELD</Text></Action></View> : <View style={[s.recallLayout, desktop && s.recallLayoutDesktop]}>
              <View style={s.questionPanel}>
                <View style={s.questionTop}><Eyebrow>QUESTION {String(questionIndex + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}</Eyebrow><Text style={s.questionTag}>UNTIMED PRACTICE</Text></View>
                <View style={s.progressTrack}><View style={[s.progressFill, { width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%` as `${number}%` }]} /></View>
                <Text style={s.questionPrompt}>{question.prompt}</Text>
                <View style={s.options}>{question.options.map((option, i) => {
                  const isChosen = answers[questionIndex] === i;
                  const isSubmitted = !!submitted[questionIndex];
                  const isCorrect = i === question.answer;
                  return <Pressable key={option} disabled={isSubmitted} onPress={() => setAnswers(old => ({ ...old, [questionIndex]: i }))} style={[s.option, isChosen && s.optionChosen, isSubmitted && isCorrect && s.optionCorrect, isSubmitted && isChosen && !isCorrect && s.optionWrong]}>
                    <View style={s.optionLetter}><Text style={s.optionLetterText}>{String.fromCharCode(65 + i)}</Text></View><Text style={s.optionText}>{option}</Text>{isSubmitted && isCorrect ? <Check size={17} color={C.green} /> : isSubmitted && isChosen ? <X size={17} color={C.red} /> : null}
                  </Pressable>;
                })}</View>
                {submitted[questionIndex] ? <View style={s.explanation}><Eyebrow>EXPLANATION</Eyebrow><Text style={s.explanationText}>{question.explanation}</Text></View> : null}
                {!submitted[questionIndex] ? <Action onPress={() => { if (answers[questionIndex] !== undefined) setSubmitted(old => ({ ...old, [questionIndex]: true })); }}><Text style={s.actionText}>CHECK ANSWER</Text><ArrowRight size={16} color={C.ink} /></Action> : <Action onPress={() => { if (questionIndex < QUESTIONS.length - 1) setQuestionIndex(i => i + 1); else setShowSummary(true); }}><Text style={s.actionText}>{questionIndex < QUESTIONS.length - 1 ? "NEXT QUESTION" : "VIEW SUMMARY"}</Text><ArrowRight size={16} color={C.ink} /></Action>}
              </View>
              <View style={s.questionNavigator}><Eyebrow>QUESTION MAP</Eyebrow><Text style={s.navigatorTitle}>{answeredCount} of {QUESTIONS.length} reviewed</Text><View style={s.questionGrid}>{QUESTIONS.map((q, i) => <Pressable key={i} onPress={() => setQuestionIndex(i)} style={[s.questionNumber, i === questionIndex && s.questionNumberActive, submitted[i] && s.questionNumberDone]}><Text style={[s.questionNumberText, i === questionIndex && s.questionNumberTextActive]}>{i + 1}</Text></Pressable>)}</View><Rule /><Text style={s.mapHint}>Choose a number to revisit a question. Your answers remain in this prototype session.</Text><Action secondary onPress={() => setScreen("field")}><Text style={s.actionSecondaryText}>EXIT TO FIELD</Text></Action></View>
            </View>}
          </> : null}

          <View style={s.footer}><Text style={s.footerBrand}>CIVILPREP / THE COGNITIVE FIELD</Text><Text style={s.footerNote}>INTERACTIVE UI PROTOTYPE · SAMPLE CONTENT ONLY</Text></View>
        </ScrollView>
        {!desktop ? <View style={s.mobileDock}>{navigation.map(n => navButton(n.id, n.label, n.icon))}</View> : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, minHeight: "100%", backgroundColor: C.paper, flexDirection: "column" },
  rootDesktop: { flexDirection: "row" },
  sidebar: { width: 218, backgroundColor: C.ink, paddingHorizontal: 20, paddingTop: 28, paddingBottom: 22 },
  brandMark: { width: 46, height: 46, borderRadius: 15, backgroundColor: "#29423A", alignItems: "center", justifyContent: "center", marginBottom: 15 },
  brand: { color: C.paper, fontSize: 17, fontWeight: "900", letterSpacing: 1.2 },
  brandSub: { color: C.darkMuted, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginTop: 6 },
  navGroup: { gap: 7, marginTop: 48 },
  navItem: { minHeight: 46, flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 12, borderRadius: 10 },
  navItemActive: { backgroundColor: "#29423A" },
  navText: { color: C.darkMuted, fontSize: 12, fontWeight: "700" },
  navTextActive: { color: C.lime },
  sidebarFoot: { marginTop: "auto", gap: 8, paddingTop: 28 },
  sidebarFootText: { color: "#87968D", fontSize: 8, letterSpacing: 1, fontWeight: "800" },
  workspace: { flex: 1, minWidth: 0, backgroundColor: C.paper },
  topbar: { height: 62, paddingHorizontal: 22, borderBottomWidth: 1, borderBottomColor: C.line, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brandInline: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandMarkSmall: { width: 30, height: 30, borderRadius: 10, backgroundColor: C.ink, alignItems: "center", justifyContent: "center" },
  topbarRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  topbarStatus: { color: C.muted, fontSize: 8, fontWeight: "900", letterSpacing: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: C.green },
  page: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 115 },
  pageDesktop: { paddingHorizontal: 38, paddingTop: 32, paddingBottom: 50, maxWidth: 1500, width: "100%", alignSelf: "center" },
  notice: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 9, paddingHorizontal: 11, backgroundColor: "#E8EDDF", borderRadius: 8, marginBottom: 24 },
  noticeText: { color: C.ink, fontSize: 10, flex: 1 },
  sampleTag: { color: C.muted, fontSize: 7, fontWeight: "900", letterSpacing: .8 },
  heroGrid: { gap: 23, paddingBottom: 27 },
  heroGridDesktop: { flexDirection: "row", alignItems: "flex-start" },
  heroMain: { flex: 1.05, minWidth: 0 },
  heroTitle: { color: C.ink, fontSize: 39, lineHeight: 43, letterSpacing: -1.7, fontWeight: "900", marginTop: 13 },
  heroBody: { color: "#56635A", fontSize: 13, lineHeight: 21, maxWidth: 520, marginTop: 10, marginBottom: 20 },
  mission: { backgroundColor: C.ink, padding: 19, borderRadius: 15, marginTop: 7 },
  missionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { color: C.muted, fontSize: 8, lineHeight: 13, fontWeight: "900", letterSpacing: 1.25 },
  missionTitle: { color: C.paper, fontSize: 25, lineHeight: 30, fontWeight: "900", letterSpacing: -.7, marginTop: 15 },
  missionBody: { color: C.darkMuted, fontSize: 11, lineHeight: 17, marginTop: 7, maxWidth: 420 },
  missionMeta: { borderTopWidth: 1, borderTopColor: "#405148", paddingTop: 13, marginTop: 16, gap: 12 },
  missionMetaText: { color: C.darkMuted, fontSize: 8, fontWeight: "800", letterSpacing: .7 },
  action: { alignSelf: "flex-start", minHeight: 42, paddingHorizontal: 13, paddingVertical: 11, borderRadius: 8, backgroundColor: C.lime, flexDirection: "row", alignItems: "center", gap: 12, marginTop: 3 },
  actionSecondary: { backgroundColor: "transparent", borderWidth: 1, borderColor: C.line },
  actionText: { color: C.ink, fontSize: 9, fontWeight: "900", letterSpacing: .7 },
  actionSecondaryText: { color: C.ink, fontSize: 9, fontWeight: "900", letterSpacing: .7 },
  sideStack: { flex: .95, minWidth: 0, gap: 14 },
  fieldPreview: { backgroundColor: C.panel, padding: 15, borderRadius: 14 },
  previewHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  previewTitle: { color: C.ink, fontSize: 19, fontWeight: "900", letterSpacing: -.5, marginTop: 8 },
  mapFrame: { backgroundColor: "#EEF0E8", borderRadius: 12, padding: 7, marginTop: 12, overflow: "hidden" },
  mapHint: { color: C.muted, fontSize: 9, lineHeight: 15 },
  previewLink: { color: C.cobalt, fontSize: 9, fontWeight: "900", letterSpacing: .7, marginTop: 10 },
  quickRow: { flexDirection: "row", gap: 10 },
  quickAction: { flex: 1, minWidth: 0, backgroundColor: "#E9EDE4", borderRadius: 12, padding: 13, gap: 7 },
  quickTitle: { color: C.ink, fontSize: 12, fontWeight: "900" },
  quickSub: { color: C.muted, fontSize: 9, lineHeight: 14 },
  rule: { height: 1, backgroundColor: C.line, marginVertical: 15 },
  sectionHead: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginTop: 25, marginBottom: 14 },
  sectionTitle: { color: C.ink, fontSize: 25, lineHeight: 30, fontWeight: "900", letterSpacing: -.8, marginTop: 5 },
  sectionNote: { color: C.muted, fontSize: 9, maxWidth: 180, textAlign: "right" },
  searchInput: { height: 43, borderBottomWidth: 1, borderBottomColor: "#AAB4A9", color: C.ink, fontSize: 12, marginBottom: 8, paddingHorizontal: 3 },
  topicList: { borderTopWidth: 1, borderTopColor: C.line },
  topicListDesktop: { maxWidth: 900 },
  topicRow: { flexDirection: "row", alignItems: "center", gap: 13, paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  topicRowActive: { backgroundColor: C.ink, borderRadius: 9 },
  topicIndex: { color: C.cobalt, fontSize: 10, fontWeight: "900", alignSelf: "flex-start", marginTop: 3 },
  topicMain: { flex: 1, minWidth: 0 },
  topicTitle: { color: C.ink, fontSize: 15, fontWeight: "800", marginTop: 3 },
  topicTitleActive: { color: C.paper },
  topicDescription: { color: C.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  topicDescriptionActive: { color: C.darkMuted },
  empty: { color: C.muted, fontSize: 12, padding: 18 },
  screenHeading: { marginBottom: 22 },
  fieldLayout: { gap: 18 },
  fieldLayoutDesktop: { flexDirection: "row", alignItems: "flex-start" },
  fieldMain: { flex: 1.1, minWidth: 0 },
  fieldLegend: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 10, flexWrap: "wrap" },
  legendDot: { width: 9, height: 9, borderRadius: 6, backgroundColor: C.lime, borderWidth: 1, borderColor: C.ink },
  topicPanel: { flex: .9, minWidth: 0, backgroundColor: C.white, borderRadius: 14, padding: 17, borderWidth: 1, borderColor: C.line },
  topicPanelTitle: { color: C.ink, fontSize: 24, lineHeight: 29, fontWeight: "900", marginTop: 9 },
  relatedRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#EDF0E9" },
  relatedText: { color: C.ink, fontSize: 11, fontWeight: "700" },
  modeRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 9, marginTop: 5 },
  modeRowActive: { backgroundColor: C.ink },
  modeCopy: { flex: 1 },
  modeTitle: { color: C.ink, fontSize: 11, fontWeight: "900" },
  modeTitleActive: { color: C.lime },
  modeDesc: { color: C.muted, fontSize: 9, marginTop: 3 },
  modeDescActive: { color: C.darkMuted },
  studyPreview: { backgroundColor: "#EEF0E8", borderRadius: 10, padding: 12, marginTop: 12 },
  studyPreviewTitle: { color: C.ink, fontSize: 13, fontWeight: "900", marginTop: 7 },
  studyPreviewBody: { color: C.muted, fontSize: 10, lineHeight: 16, marginTop: 6 },
  recallLayout: { gap: 16 },
  recallLayoutDesktop: { flexDirection: "row", alignItems: "flex-start" },
  questionPanel: { flex: 1, minWidth: 0, backgroundColor: C.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: C.line },
  questionTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  questionTag: { color: C.muted, fontSize: 8, fontWeight: "900", letterSpacing: .8 },
  progressTrack: { height: 4, backgroundColor: C.line, borderRadius: 4, overflow: "hidden", marginTop: 13 },
  progressFill: { height: "100%", backgroundColor: C.cobalt },
  questionPrompt: { color: C.ink, fontSize: 21, lineHeight: 28, fontWeight: "800", marginTop: 23, marginBottom: 19 },
  options: { gap: 9, marginBottom: 17 },
  option: { flexDirection: "row", alignItems: "center", gap: 11, minHeight: 54, borderWidth: 1, borderColor: C.line, borderRadius: 10, padding: 12 },
  optionChosen: { borderColor: C.cobalt, backgroundColor: "#F0F3FF" },
  optionCorrect: { borderColor: "#80B59A", backgroundColor: "#EFF8F1" },
  optionWrong: { borderColor: "#D7A09E", backgroundColor: "#FFF1F0" },
  optionLetter: { width: 27, height: 27, borderRadius: 8, borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center" },
  optionLetterText: { color: C.ink, fontSize: 10, fontWeight: "900" },
  optionText: { color: C.ink, flex: 1, fontSize: 12, lineHeight: 18 },
  explanation: { backgroundColor: "#EEF0E8", borderRadius: 10, padding: 13, marginBottom: 14 },
  explanationText: { color: C.ink, fontSize: 11, lineHeight: 18, marginTop: 7 },
  questionNavigator: { width: 235, backgroundColor: C.panel, borderRadius: 14, padding: 16, alignSelf: "flex-start" },
  navigatorTitle: { color: C.ink, fontSize: 12, fontWeight: "800", marginTop: 7 },
  questionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 13 },
  questionNumber: { width: 39, height: 39, borderRadius: 9, backgroundColor: C.paper, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.line },
  questionNumberActive: { backgroundColor: C.ink, borderColor: C.ink },
  questionNumberDone: { borderColor: C.green },
  questionNumberText: { color: C.ink, fontSize: 11, fontWeight: "900" },
  questionNumberTextActive: { color: C.lime },
  summaryPanel: { backgroundColor: C.white, borderRadius: 15, padding: 24, alignItems: "flex-start", borderWidth: 1, borderColor: C.line, gap: 10 },
  summaryIcon: { width: 47, height: 47, backgroundColor: C.lime, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  summaryScore: { color: C.ink, fontSize: 42, fontWeight: "900", letterSpacing: -1 },
  footer: { borderTopWidth: 1, borderTopColor: C.line, paddingTop: 15, marginTop: 36, gap: 6 },
  footerBrand: { color: C.ink, fontSize: 9, fontWeight: "900", letterSpacing: .8 },
  footerNote: { color: C.muted, fontSize: 8, letterSpacing: .6 },
  mobileDock: { position: "absolute", left: 12, right: 12, bottom: 10, backgroundColor: C.ink, borderRadius: 15, minHeight: 66, flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 7, paddingVertical: 8, borderWidth: 1, borderColor: "#405148" },
  mobileNavItem: { flex: 1, minHeight: 45, justifyContent: "center", paddingHorizontal: 4, gap: 3, borderRadius: 9, alignItems: "center" },
  mobileNavText: { color: C.darkMuted, fontSize: 8, fontWeight: "800", letterSpacing: .4 },
});

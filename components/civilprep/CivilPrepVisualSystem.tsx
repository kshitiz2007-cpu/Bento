import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Stop,
} from "react-native-svg";

/**
 * Shared SVG art primitives for CivilPrep.
 * Keep illustrations vector-first so they scale cleanly across Android and web.
 */
export const VISUAL_TOKENS = {
  color: {
    ink: "#172A27",
    paper: "#F4F1E9",
    rose: "#F5A5C8",
    lavender: "#A99BFF",
    cyan: "#8AE8E0",
    lime: "#C6F36A",
    muted: "#91A097",
    line: "#D9DDD3",
  },
  gradient: {
    cognitive: ["#172A27", "#263B39", "#34315A"],
    roseMist: ["#FCE7F3", "#E9D5FF", "#DCEAFE"],
    fieldGlow: ["#F5A5C8", "#A99BFF", "#8AE8E0"],
    earth: ["#163B36", "#277A68", "#8AE8E0"],
    archive: ["#3C2824", "#87533D", "#E9B878"],
  },
  type: {
    display: { size: 42, lineHeight: 46, tracking: -1.8 },
    heading: { size: 28, lineHeight: 34, tracking: -0.8 },
    title: { size: 18, lineHeight: 24, tracking: -0.3 },
    body: { size: 14, lineHeight: 22, tracking: 0 },
    meta: { size: 10, lineHeight: 14, tracking: 1.1 },
  },
  space: { xs: 4, sm: 8, md: 12, lg: 18, xl: 24, xxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  motion: { quick: 140, standard: 220, emphasis: 320 },
} as const;

export type SubjectArtVariant = "polity" | "history" | "geography" | "science" | "economy" | "current";

const ART_COLORS: Record<SubjectArtVariant, [string, string, string]> = {
  polity: ["#A99BFF", "#F5A5C8", "#C6F36A"],
  history: ["#E9B878", "#E78C72", "#F4D7A1"],
  geography: ["#8AE8E0", "#6AC39B", "#C6F36A"],
  science: ["#8AE8E0", "#A99BFF", "#F5A5C8"],
  economy: ["#F7C66A", "#F18F78", "#A99BFF"],
  current: ["#F5A5C8", "#A99BFF", "#8AE8E0"],
};

/** Compact, reusable vector motif for subject rows and cards. */
export function SubjectArtwork({ variant, size = 52 }: { variant: SubjectArtVariant; size?: number }) {
  const [a, b, c] = ART_COLORS[variant];
  return (
    <View accessible={false} style={[styles.subjectArt, { width: size, height: size, borderRadius: size * 0.27 }]}>
      <Svg width="100%" height="100%" viewBox="0 0 64 64">
        <Defs>
          <LinearGradient id={`art-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={a} />
            <Stop offset="1" stopColor={b} />
          </LinearGradient>
          <RadialGradient id={`art-glow-${variant}`} cx="50%" cy="40%" rx="65%" ry="65%">
            <Stop offset="0" stopColor={a} stopOpacity="0.32" />
            <Stop offset="1" stopColor={b} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Path d="M0 0H64V64H0Z" fill="#172A27" />
        <Path d="M0 0H64V64H0Z" fill={`url(#art-glow-${variant})`} />
        {variant === "polity" ? <>
          <Path d="M13 26L32 13L51 26V48H13Z" fill="none" stroke={`url(#art-${variant})`} strokeWidth="1.8" />
          <Path d="M9 51H55M20 30V46M29 30V46M38 30V46M47 30V46" stroke={c} strokeWidth="1.7" />
          <Circle cx="32" cy="13" r="3" fill={b} />
        </> : null}
        {variant === "history" ? <>
          <Path d="M12 50V27L32 14L52 27V50ZM20 50V31H44V50M27 50V36H37V50" fill="none" stroke={`url(#art-${variant})`} strokeWidth="1.8" />
          <Path d="M8 54H56" stroke={c} strokeWidth="2" />
          <Circle cx="32" cy="14" r="2.5" fill={b} />
        </> : null}
        {variant === "geography" ? <>
          <Path d="M-4 20C9 5 22 34 35 19S55 8 68 18M-4 31C9 16 22 45 35 30S55 19 68 29M-4 42C9 27 22 56 35 41S55 30 68 40M-4 53C9 38 22 67 35 52S55 41 68 51" fill="none" stroke={`url(#art-${variant})`} strokeWidth="1.7" />
          <Circle cx="42" cy="22" r="4" fill={c} />
        </> : null}
        {variant === "science" ? <>
          <Ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(-35 32 32)" fill="none" stroke={`url(#art-${variant})`} strokeWidth="1.6" />
          <Ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(35 32 32)" fill="none" stroke={b} strokeWidth="1.4" />
          <Circle cx="32" cy="32" r="5" fill={a} /><Circle cx="50" cy="19" r="3" fill={c} />
        </> : null}
        {variant === "economy" ? <>
          <Path d="M10 48L21 38L30 42L43 24L54 29" fill="none" stroke={`url(#art-${variant})`} strokeWidth="2.4" />
          <Path d="M10 48L21 38L30 42L43 24L54 29V53H10Z" fill={b} opacity="0.18" />
          {[ [10,48], [21,38], [30,42], [43,24], [54,29] ].map(([x,y],i) => <Circle key={i} cx={x} cy={y} r="2.5" fill={i === 4 ? c : a} />)}
        </> : null}
        {variant === "current" ? <>
          <Circle cx="32" cy="32" r="21" fill="none" stroke={`url(#art-${variant})`} strokeWidth="1.5" strokeDasharray="3 4" />
          <Circle cx="32" cy="32" r="12" fill="none" stroke={b} strokeWidth="1.6" />
          <Path d="M32 11V24M32 40V53M11 32H24M40 32H53" stroke={c} strokeWidth="1.5" />
          <Circle cx="32" cy="32" r="4" fill={a} />
        </> : null}
      </Svg>
    </View>
  );
}

export function CognitiveHeroArtwork() {
  return (
    <View accessible={false} style={styles.frame}>
      <Svg width="100%" height="100%" viewBox="0 0 560 228" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="field-base" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#172A27" />
            <Stop offset="0.55" stopColor="#263B39" />
            <Stop offset="1" stopColor="#34315A" />
          </LinearGradient>
          <LinearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F5A5C8" />
            <Stop offset="0.52" stopColor="#A99BFF" />
            <Stop offset="1" stopColor="#8AE8E0" />
          </LinearGradient>
          <RadialGradient id="field-glow" cx="70%" cy="43%" rx="52%" ry="65%">
            <Stop offset="0" stopColor="#A99BFF" stopOpacity="0.42" />
            <Stop offset="1" stopColor="#A99BFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Path d="M0 0H560V228H0Z" fill="url(#field-base)" />
        <Path d="M0 0H560V228H0Z" fill="url(#field-glow)" />
        <G opacity="0.12" stroke="#F4F1E9" strokeWidth="0.7">
          {Array.from({ length: 15 }, (_, i) => <Path key={`v${i}`} d={`M${20 + i * 38} 0V228`} />)}
          {Array.from({ length: 7 }, (_, i) => <Path key={`h${i}`} d={`M0 ${20 + i * 34}H560`} />)}
        </G>
        <G transform="translate(390 113)">
          <Ellipse rx="130" ry="43" transform="rotate(-27)" fill="none" stroke="url(#orbit-stroke)" strokeWidth="1.4" opacity="0.8" />
          <Ellipse rx="110" ry="58" transform="rotate(33)" fill="none" stroke="url(#orbit-stroke)" strokeWidth="1.1" opacity="0.62" />
          <Ellipse rx="78" ry="78" transform="rotate(-12)" fill="none" stroke="#F4F1E9" strokeWidth="0.8" strokeDasharray="2 7" opacity="0.38" />
          <Circle r="38" fill="#A99BFF" opacity="0.13" />
          <Circle r="26" fill="none" stroke="#F5A5C8" strokeWidth="1.2" opacity="0.85" />
          <Circle r="12" fill="#F5A5C8" opacity="0.95" />
          <Circle cx="99" cy="-61" r="5" fill="#8AE8E0" />
          <Circle cx="-88" cy="48" r="4" fill="#C6F36A" />
          <Circle cx="33" cy="74" r="3" fill="#F4F1E9" />
          <Path d="M-72 -18L-24 -3L0 0L43 -32L83 -26" fill="none" stroke="#8AE8E0" strokeWidth="1.1" opacity="0.8" />
          <Circle cx="-72" cy="-18" r="3.2" fill="#8AE8E0" />
          <Circle cx="-24" cy="-3" r="3.2" fill="#8AE8E0" />
          <Circle cx="43" cy="-32" r="3.2" fill="#8AE8E0" />
        </G>
        <G fill="#F4F1E9">
          <Circle cx="45" cy="34" r="1.7" opacity="0.8" />
          <Circle cx="96" cy="72" r="1.2" opacity="0.55" />
          <Circle cx="176" cy="31" r="1.6" opacity="0.7" />
          <Circle cx="248" cy="190" r="1.4" opacity="0.6" />
          <Circle cx="517" cy="181" r="1.8" opacity="0.7" />
          <Circle cx="486" cy="44" r="1.2" opacity="0.55" />
        </G>
        <Path d="M28 176C76 146 98 155 128 124S183 91 217 112" fill="none" stroke="#C6F36A" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.68" />
        <Circle cx="128" cy="124" r="4" fill="#C6F36A" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  subjectArt: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: VISUAL_TOKENS.color.ink,
    borderWidth: 1,
    borderColor: "rgba(169,155,255,0.24)",
  },
  frame: {
    width: "100%",
    height: 178,
    overflow: "hidden",
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: VISUAL_TOKENS.color.ink,
    borderWidth: 1,
    borderColor: "rgba(169,155,255,0.28)",
  },
});

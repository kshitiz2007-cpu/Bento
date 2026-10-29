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
  ink: "#172A27",
  paper: "#F4F1E9",
  rose: "#F5A5C8",
  lavender: "#A99BFF",
  cyan: "#8AE8E0",
  lime: "#C6F36A",
  muted: "#91A097",
} as const;

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
  frame: {
    width: "100%",
    height: 178,
    overflow: "hidden",
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: VISUAL_TOKENS.ink,
    borderWidth: 1,
    borderColor: "rgba(169,155,255,0.28)",
  },
});

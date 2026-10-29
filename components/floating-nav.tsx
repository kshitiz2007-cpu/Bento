import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { usePathname, useRouter } from "expo-router";
import { BookOpen, ClipboardCheck, House, LibraryBig, UserRound } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const items = [
  { label: "Home", href: "/", Icon: House },
  { label: "Study", href: "/study", Icon: BookOpen },
  { label: "Tests", href: "/tests", Icon: ClipboardCheck },
  { label: "Library", href: "/library", Icon: LibraryBig },
  { label: "You", href: "/profile", Icon: UserRound }
];

export function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <View className="absolute bottom-0 left-0 right-0 px-4 pb-3">
      <BlurView intensity={42} tint="dark" className="overflow-hidden rounded-[28px] border border-white/10">
        <View className="flex-row items-center justify-between px-2 py-2">
          {items.map(({ label, href, Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Pressable key={href} accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={label}
              onPress={() => { Haptics.selectionAsync().catch(() => undefined); router.navigate(href as never); }}
              className={`min-w-[54px] items-center justify-center rounded-[20px] px-3 py-2 ${active ? "bg-white/10" : "bg-transparent"}`}>
              <Icon size={20} color={active ? "#E5CB91" : "#8F95AA"} strokeWidth={active ? 2.4 : 1.8} />
              <Text className={`mt-1 text-[10px] font-semibold ${active ? "text-white" : "text-[#8F95AA]"}`}>{label}</Text>
              <View className={`mt-1 h-1 w-1 rounded-full ${active ? "bg-champagne" : "bg-transparent"}`} />
            </Pressable>;
          })}
        </View>
      </BlurView>
    </View>
  );
}
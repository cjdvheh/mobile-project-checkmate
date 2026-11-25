import { StyleSheet, Text, View } from "react-native";

export default function ProgressCard({ tasks }) {
  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / Math.max(tasks.length, 1)) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View>
          <Text style={styles.label}>오늘의 진행률</Text>
          <Text style={styles.count}>
            <Text style={styles.num}>{completed}</Text> / {tasks.length} 완료
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{progress}%</Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 10, padding: 18, borderRadius: 20, backgroundColor: "#171815" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  label: { fontSize: 12, fontWeight: "700", color: "rgba(255,255,255,.75)" },
  count: { marginTop: 4, fontSize: 15, fontWeight: "600", color: "rgba(255,255,255,.65)" },
  num: { fontSize: 28, fontWeight: "800", color: "#d7e868" },
  badge: { backgroundColor: "#d7e868", borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 13, fontWeight: "800", color: "#171815" },
  track: { height: 8, marginTop: 4, borderRadius: 99, backgroundColor: "rgba(255,255,255,.15)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 99, backgroundColor: "#d7e868" },
});

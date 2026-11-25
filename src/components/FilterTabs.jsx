import { Pressable, StyleSheet, Text, View } from "react-native";
import { FILTERS } from "../constants/tasks";

export default function FilterTabs({ filter, setFilter, count }) {
  return (
    <View style={styles.tabs}>
      {FILTERS.map((f) => (
        <Pressable key={f} onPress={() => setFilter(f)} style={styles.tab}>
          <Text style={[styles.tabText, filter === f && styles.tabTextOn]}>{f}</Text>
          {filter === f && <View style={styles.tabBar} />}
        </Pressable>
      ))}
      <Text style={styles.count}>{count}개</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dfe0db",
  },
  tab: { paddingBottom: 12 },
  tabText: { fontSize: 15, fontWeight: "800", color: "#73776f" },
  tabTextOn: { color: "#171815" },
  tabBar: { position: "absolute", left: 0, right: 0, bottom: -1, height: 2, backgroundColor: "#171815" },
  count: { marginLeft: "auto", paddingBottom: 12, fontSize: 11, fontWeight: "700", color: "#6d7169" },
});

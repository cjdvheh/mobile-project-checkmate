import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorOf } from "../utils/taskUtils";

export default function TaskItem({ item, categories, onToggle, onRemove }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onToggle(item.id)}
        style={[styles.check, item.done && styles.checkOn]}
        accessibilityLabel={item.done ? "미완료로 표시" : "완료로 표시"}
      >
        {item.done && <Ionicons name="checkmark" size={15} color="#fff" />}
      </Pressable>

      <View style={styles.body}>
        <Text numberOfLines={1} style={[styles.title, item.done && styles.titleDone]}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <View style={[styles.dot, { backgroundColor: colorOf(categories, item.category) }]} />
          <Text style={styles.metaText}>{item.category}</Text>
        </View>
      </View>

      <Pressable onPress={() => onRemove(item.id)} hitSlop={8} accessibilityLabel="삭제">
        <Ionicons name="trash-outline" size={20} color="#d66049" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 70,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e0e1dc",
    backgroundColor: "#fff",
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bfc2ba",
    alignItems: "center",
    justifyContent: "center",
  },
  checkOn: { backgroundColor: "#171815", borderColor: "#171815" },
  body: { flex: 1, paddingVertical: 12 },
  title: { fontSize: 16, fontWeight: "700", color: "#20221e" },
  titleDone: { color: "#94978f", textDecorationLine: "line-through" },
  meta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  metaText: { fontSize: 12, fontWeight: "600", color: "#676b63" },
});
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorOf } from "../utils/taskUtils";

export default function TaskItem({ item, categories, onToggle, onRemove, onEdit }) {
  // Alert.alert는 웹에서 뜨지 않아서 카드 안에 확인 줄을 보여줌
  const [confirming, setConfirming] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Pressable
          onPress={() => onToggle(item.id)}
          style={[styles.check, item.done && styles.checkOn]}
          accessibilityLabel={item.done ? "미완료로 표시" : "완료로 표시"}
        >
          {item.done && <Ionicons name="checkmark" size={15} color="#fff" />}
        </Pressable>

        <Pressable style={styles.body} onPress={() => onEdit(item)} accessibilityLabel="수정">
          <Text numberOfLines={1} style={[styles.title, item.done && styles.titleDone]}>
            {item.title}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.dot, { backgroundColor: colorOf(categories, item.category) }]} />
            <Text style={styles.metaText}>{item.category}</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setConfirming(true)} hitSlop={8} accessibilityLabel="삭제">
          <Ionicons name="trash-outline" size={20} color="#d66049" />
        </Pressable>
      </View>

      {confirming && (
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>이 할 일을 삭제할까요?</Text>
          <Pressable onPress={() => setConfirming(false)} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable onPress={() => onRemove(item.id)} style={styles.delBtn}>
            <Text style={styles.delText}>삭제</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e0e1dc",
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 70 },
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
  confirm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeeee9",
  },
  confirmText: { flex: 1, fontSize: 12, color: "#d66049" },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: "#eeeee9" },
  cancelText: { fontSize: 12, fontWeight: "700", color: "#555951" },
  delBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: "#d66049" },
  delText: { fontSize: 12, fontWeight: "700", color: "#fff" },
});

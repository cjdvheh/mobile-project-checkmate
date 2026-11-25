import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryChip({ label, color, icon, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipOn]}>
      {color && <View style={[styles.dot, { backgroundColor: color }]} />}
      <Text style={[styles.text, selected && styles.textOn]}>{label}</Text>
      {icon && <Ionicons name={icon} size={13} color={selected ? "#fff" : "#555951"} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#d8dad4",
    backgroundColor: "#fff",
  },
  chipOn: { backgroundColor: "#171815", borderColor: "#171815" },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 13, fontWeight: "800", color: "#555951" },
  textOn: { color: "#fff" },
});
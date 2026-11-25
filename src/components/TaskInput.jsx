import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryChip from "./CategoryChip";

export default function TaskInput({ categories, onAdd }) {
  const [title, setTitle] = useState("");
  const [picked, setPicked] = useState("");

  // 선택한 카테고리가 삭제·변경되었으면 첫 번째 카테고리로 대체
  const category = categories.some((c) => c.name === picked) ? picked : categories[0]?.name;

  const submit = () => {
    const text = title.trim();
    if (!text || !category) return;
    onAdd(text, category);
    setTitle("");
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.inputBox}>
        <TextInput
          value={title}
          onChangeText={(v) => setTitle(v.slice(0, 100))}
          onSubmitEditing={submit}
          returnKeyType="done"
          placeholder="무엇을 해야 하나요?"
          placeholderTextColor="#81867d"
          style={styles.input}
        />
        <Pressable onPress={submit} style={styles.send} accessibilityLabel="할 일 추가">
          <Ionicons name="arrow-forward" size={18} color="#171815" />
        </Pressable>
      </View>
      <View style={styles.chips}>
        {categories.map((c) => (
          <CategoryChip
            key={c.name}
            label={c.name}
            color={c.color}
            selected={category === c.name}
            onPress={() => setPicked(c.name)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 4, marginBottom: 12 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#ccd0c7",
    backgroundColor: "#fff",
  },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, fontWeight: "700", color: "#20221e" },
  send: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#d7e868", alignItems: "center", justifyContent: "center" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingTop: 12 },
});
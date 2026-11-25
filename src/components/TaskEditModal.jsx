import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryChip from "./CategoryChip";

// key로 할 일마다 새로 만들어서, 열 때마다 입력값이 그 할 일로 초기화되게 함
function Form({ task, categories, onSave, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [picked, setPicked] = useState(task.category);

  // 고르던 카테고리가 사라졌으면 첫 번째 카테고리로 대체
  const category = categories.some((c) => c.name === picked) ? picked : categories[0]?.name;

  const save = () => {
    if (onSave(task.id, { title, category })) onClose();
  };

  return (
    <>
      <TextInput
        value={title}
        onChangeText={(v) => setTitle(v.slice(0, 100))}
        onSubmitEditing={save}
        returnKeyType="done"
        placeholder="무엇을 해야 하나요?"
        placeholderTextColor="#81867d"
        style={styles.input}
        autoFocus
      />
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
      <View style={styles.buttons}>
        <Pressable onPress={onClose} style={[styles.btn, styles.cancelBtn]}>
          <Text style={styles.cancelText}>취소</Text>
        </Pressable>
        <Pressable onPress={save} disabled={!title.trim()} style={[styles.btn, styles.saveBtn, !title.trim() && { opacity: 0.4 }]}>
          <Text style={styles.saveText}>저장</Text>
        </Pressable>
      </View>
    </>
  );
}

export default function TaskEditModal({ task, categories, onSave, onClose }) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={!!task} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.head}>
            <Text style={styles.title}>할 일 수정</Text>
            <Pressable onPress={onClose} hitSlop={6} style={styles.iconBtn} accessibilityLabel="닫기">
              <Ionicons name="close" size={19} color="#4f534c" />
            </Pressable>
          </View>
          {task && <Form key={task.id} task={task} categories={categories} onSave={onSave} onClose={onClose} />}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: { flex: 1, backgroundColor: "rgba(31,33,30,.4)" },
  sheet: { backgroundColor: "#fbfaf7", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 18 },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "800", color: "#171815" },
  iconBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  input: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccd0c7",
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "700",
    color: "#20221e",
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingTop: 12 },
  buttons: { flexDirection: "row", gap: 8, marginTop: 18 },
  btn: { flex: 1, alignItems: "center", paddingVertical: 12, borderRadius: 99 },
  cancelBtn: { backgroundColor: "#eeeee9" },
  cancelText: { fontSize: 14, fontWeight: "700", color: "#555951" },
  saveBtn: { backgroundColor: "#d7e868" },
  saveText: { fontSize: 14, fontWeight: "800", color: "#171815" },
});

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function IconBtn({ name, onPress, disabled, color = "#4f534c" }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} hitSlop={6} style={[styles.iconBtn, disabled && { opacity: 0.25 }]}>
      <Ionicons name={name} size={19} color={color} />
    </Pressable>
  );
}

function Row({ item, index, total, fallback, onRename, onDelete, onMove }) {
  const [draft, setDraft] = useState(item.name);
  const [confirming, setConfirming] = useState(false);

  const commit = () => {
    if (draft.trim() === item.name) return;
    if (!onRename(item.name, draft)) setDraft(item.name);
  };

  return (
    <View style={styles.row}>
      <View style={styles.rowMain}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onBlur={commit}
          onSubmitEditing={commit}
          maxLength={12}
          style={styles.name}
        />
        <IconBtn name="chevron-up" disabled={index === 0} onPress={() => onMove(item.name, -1)} />
        <IconBtn name="chevron-down" disabled={index === total - 1} onPress={() => onMove(item.name, 1)} />
        {total > 1 && <IconBtn name="trash-outline" color="#d66049" onPress={() => setConfirming(true)} />}
      </View>

      {confirming && (
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>삭제하면 할 일이 "{fallback}"(으)로 이동해요.</Text>
          <Pressable onPress={() => setConfirming(false)} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(item.name)} style={styles.delBtn}>
            <Text style={styles.delText}>삭제</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function CategoryManager({ visible, categories, onClose, onAdd, onRename, onDelete, onMove }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");

  const add = () => {
    if (onAdd(name)) setName("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.head}>
            <Text style={styles.title}>카테고리 관리</Text>
            <IconBtn name="close" onPress={onClose} />
          </View>
          <Text style={styles.hint}>이름을 눌러 수정하고, 화살표로 순서를 바꿀 수 있어요.</Text>

          <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
            {categories.map((c, i) => (
              <Row
                key={c.name}
                item={c}
                index={i}
                total={categories.length}
                fallback={categories.find((x) => x.name !== c.name)?.name}
                onRename={onRename}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))}
          </ScrollView>

          <View style={styles.addBox}>
            <TextInput
              value={name}
              onChangeText={setName}
              onSubmitEditing={add}
              maxLength={12}
              placeholder="새 카테고리 이름"
              placeholderTextColor="#81867d"
              style={styles.addInput}
            />
            <Pressable onPress={add} style={styles.addBtn} accessibilityLabel="카테고리 추가">
              <Ionicons name="add" size={20} color="#171815" />
            </Pressable>
          </View>
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
  hint: { marginTop: 4, fontSize: 12, color: "#94968f" },
  list: { marginTop: 12, maxHeight: 300 },
  row: { borderBottomWidth: 1, borderBottomColor: "#eeeee9", paddingVertical: 6 },
  rowMain: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  name: { flex: 1, paddingVertical: 8, paddingHorizontal: 6, fontSize: 15, fontWeight: "700", color: "#20221e" },
  iconBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  confirm: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8 },
  confirmText: { flex: 1, fontSize: 12, color: "#d66049" },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: "#eeeee9" },
  cancelText: { fontSize: 12, fontWeight: "700", color: "#555951" },
  delBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: "#d66049" },
  delText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  addBox: { flexDirection: "row", alignItems: "center", marginTop: 14, padding: 8, borderRadius: 18, borderWidth: 1, borderColor: "#ccd0c7", backgroundColor: "#fff" },
  addInput: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, fontWeight: "700", color: "#20221e" },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#d7e868", alignItems: "center", justifyContent: "center" },
});

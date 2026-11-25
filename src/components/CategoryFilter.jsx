import { ScrollView, StyleSheet } from "react-native";
import CategoryChip from "./CategoryChip";

export default function CategoryFilter({ categories, category, setCategory, onManage }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
      contentContainerStyle={styles.chips}
    >
      {/* 누르면 전체 보기로 바뀌고 카테고리 관리 창이 열림 */}
      <CategoryChip
        label="전체 카테고리"
        icon="create-outline"
        selected={category === "전체"}
        onPress={() => {
          setCategory("전체");
          onManage();
        }}
      />
      {categories.map((c) => (
        <CategoryChip
          key={c.name}
          label={c.name}
          color={c.color}
          selected={category === c.name}
          onPress={() => setCategory(c.name)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginHorizontal: -24, flexGrow: 0 },
  chips: { flexDirection: "row", gap: 8, paddingHorizontal: 24, paddingVertical: 14 },
});
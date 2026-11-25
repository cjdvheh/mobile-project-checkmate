import { FlatList, StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

export default function TaskList({ tasks, allTasks, categories, onToggle, onRemove, onEdit }) {
  return (
    <FlatList
      style={styles.list}
      data={tasks}
      extraData={categories}
      keyExtractor={(t) => String(t.id)}
      renderItem={({ item }) => (
        <TaskItem item={item} categories={categories} onToggle={onToggle} onRemove={onRemove} onEdit={onEdit} />
      )}
      ListEmptyComponent={<EmptyState hasAnyTasks={allTasks.length > 0} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 4, paddingBottom: 24, flexGrow: 1 },
  separator: { height: 10 },
});
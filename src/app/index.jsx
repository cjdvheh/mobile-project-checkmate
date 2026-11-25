import { useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "../components/Header";
import ProgressCard from "../components/ProgressCard";
import FilterTabs from "../components/FilterTabs";
import CategoryFilter from "../components/CategoryFilter";
import CategoryManager from "../components/CategoryManager";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskEditModal from "../components/TaskEditModal";
import useTodos from "../hooks/useTodos";

export default function App() {
  const insets = useSafeAreaInsets();
  const {
    loaded,
    tasks, categories, visible,
    filter, setFilter, category, setCategory,
    addTask, toggleTask, removeTask,
    editTask,
    addCategory, renameCategory, deleteCategory, moveCategory,
  } = useTodos();
  const [manageOpen, setManageOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  if (!loaded) {
    return (
      <View style={[styles.safe, styles.center]}>
        <ActivityIndicator size="large" color="#171815" />
      </View>
    );
  }

  return (
    <View style={[styles.safe, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.top}>
        <Header />
        <ProgressCard tasks={tasks} />
        <FilterTabs filter={filter} setFilter={setFilter} count={visible.length} />
        <CategoryFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
          onManage={() => setManageOpen(true)}
        />
        <TaskInput categories={categories} onAdd={addTask} />
      </View>

      <TaskList
        tasks={visible}
        allTasks={tasks}
        categories={categories}
        onToggle={toggleTask}
        onRemove={removeTask}
        onEdit={(item) => setEditing(item)}
      />

      <CategoryManager
        visible={manageOpen}
        categories={categories}
        onClose={() => setManageOpen(false)}
        onAdd={addCategory}
        onRename={renameCategory}
        onDelete={deleteCategory}
        onMove={moveCategory}
      />

      <TaskEditModal
        task={editing}
        categories={categories}
        onSave={editTask}
        onClose={() => setEditing(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f8f6" },
  center: { alignItems: "center", justifyContent: "center" },
  top: { paddingHorizontal: 24 },
});

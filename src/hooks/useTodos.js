import { useMemo, useState } from "react";
import { CATEGORY_COLORS, INITIAL_CATEGORIES, INITIAL_TASKS } from "../constants/tasks";

export default function useTodos() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [filter, setFilter] = useState("전체");
  const [category, setCategory] = useState("전체");

  const visible = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (category === "전체" || t.category === category) &&
          (filter === "전체" || (filter === "완료" ? t.done : !t.done))
      ),
    [tasks, filter, category]
  );

  // ---- 할 일 ----
  const addTask = (title, cat) =>
    setTasks((cur) => [{ id: Date.now(), title, category: cat, done: false }, ...cur]);

  const toggleTask = (id) =>
    setTasks((cur) => cur.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id) => setTasks((cur) => cur.filter((t) => t.id !== id));

  // ---- 카테고리 (성공하면 true 반환) ----
  const addCategory = (name) => {
    const n = name.trim();
    if (!n || categories.some((c) => c.name === n)) return false;
    setCategories((cur) => [...cur, { name: n, color: CATEGORY_COLORS[cur.length % CATEGORY_COLORS.length] }]);
    return true;
  };

  const renameCategory = (oldName, newName) => {
    const n = newName.trim();
    if (!n || n === oldName || categories.some((c) => c.name === n)) return false;
    setCategories((cur) => cur.map((c) => (c.name === oldName ? { ...c, name: n } : c)));
    setTasks((cur) => cur.map((t) => (t.category === oldName ? { ...t, category: n } : t)));
    setCategory((cur) => (cur === oldName ? n : cur));
    return true;
  };

  const deleteCategory = (name) => {
    if (categories.length <= 1) return;
    const fallback = categories.find((c) => c.name !== name).name;
    setCategories((cur) => cur.filter((c) => c.name !== name));
    setTasks((cur) => cur.map((t) => (t.category === name ? { ...t, category: fallback } : t)));
    setCategory((cur) => (cur === name ? "전체" : cur));
  };

  const moveCategory = (name, dir) =>
    setCategories((cur) => {
      const i = cur.findIndex((c) => c.name === name);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return {
    tasks, categories, visible,
    filter, setFilter, category, setCategory,
    addTask, toggleTask, removeTask,
    addCategory, renameCategory, deleteCategory, moveCategory,
  };
}

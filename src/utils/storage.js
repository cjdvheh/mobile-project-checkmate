import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "checkmate:v1";

// 저장된 적이 없거나 내용이 깨졌으면 null
export async function loadData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.version !== 1 || !Array.isArray(data.tasks) || !Array.isArray(data.categories)) return null;
    return { tasks: data.tasks, categories: data.categories };
  } catch {
    return null;
  }
}

// 실패해도 앱이 멈추지 않게 console.warn만
export async function saveData({ tasks, categories }) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks, categories }));
  } catch (e) {
    console.warn("저장 실패", e);
  }
}

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState({ hasAnyTasks }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Ionicons name="checkmark" size={26} color="#8f9289" />
      </View>
      <Text style={styles.title}>
        {hasAnyTasks ? "조건에 맞는 할 일이 없어요" : "아직 할 일이 없어요"}
      </Text>
      <Text style={styles.desc}>
        {hasAnyTasks
          ? "필터를 바꾸거나 새로운 할 일을 추가해 보세요."
          : "위 입력창에 첫 번째 할 일을 추가해 보세요."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginTop: 32 },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#eeefe9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { marginTop: 16, fontSize: 14, fontWeight: "600", color: "#171815" },
  desc: { marginTop: 4, fontSize: 12, color: "#9b9d96" },
});

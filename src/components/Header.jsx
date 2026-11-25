import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  const today = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <View>
      <Text style={styles.date}>{today}</Text>
      {/* 모바일 환경에서 창이 다 보이지 않는 문제가 있어 헤더부분을 줄임 */}
      <Text style={styles.heading}>오늘도 하나씩</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: { marginTop: 20, fontSize: 12, fontWeight: "700", color: "#6d7169" },
  heading: { marginTop: 6, fontSize: 18, fontWeight: "800", lineHeight: 32, color: "#171815" },
});

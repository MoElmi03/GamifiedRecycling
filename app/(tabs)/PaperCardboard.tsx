import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CHAPTERS = [
  { id: 'paper-recycling-basics', number: '01', label: 'Paper Recycling Basics', emoji: '📄' },
  { id: 'cardboard-rules', number: '02', label: 'Cardboard Rules', emoji: '📦' },
  { id: 'composite-paper-packaging', number: '03', label: 'Composite Packaging', emoji: '🧃' },
];

export default function PaperCardboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Paper & Cardboard</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.heroBox}>
          <Text style={styles.heroText}>📄 📦 🗞️</Text>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.descTitle}>Learn about Paper & Cardboard</Text>
          <Text style={styles.descSub}>Tap a chapter to start your lessons and quizzes.</Text>
        </View>
        <View style={styles.list}>
          {CHAPTERS.map(ch => (
            <TouchableOpacity
              key={ch.id}
              style={styles.row}
              activeOpacity={0.75}
              onPress={() => router.push(("/(tabs)/ChapterDetail?chapter=" + ch.id) as any)}
            >
              <View style={styles.thumb}><Text style={{ fontSize: 26 }}>{ch.emoji}</Text></View>
              <View style={styles.info}>
                <Text style={styles.num}>Chapter {ch.number}</Text>
                <Text style={styles.label}>{ch.label}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#606C38" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  navTitle: { fontSize: 17, fontWeight: '700', color: '#333' },
  heroBox: { marginHorizontal: 20, marginTop: 8, borderRadius: 18, height: 160, backgroundColor: '#FFF9C4', justifyContent: 'center', alignItems: 'center' },
  heroText: { fontSize: 44, letterSpacing: 8 },
  descBox: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
  descTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  descSub: { fontSize: 13, color: '#777', lineHeight: 19 },
  list: { paddingHorizontal: 20, marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  thumb: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#FFF9C4', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  info: { flex: 1 },
  num: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  label: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
});
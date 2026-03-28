import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Part {
  number: string;
  label: string;
  emoji: string;
}

interface ChapterData {
  id: string;
  navTitle: string;
  title: string;
  subtitle: string;
  parts: Part[];
  quizzes: string[];
}

const CHAPTER_DATA: Record<string, ChapterData> = {
  'glass-recycling': {
    id: 'glass-recycling',
    navTitle: 'Glass Recycling',
    title: 'Understanding Glass Recycling Basics',
    subtitle: 'Learn how glass is sorted, cleaned, and recycled.',
    parts: [
      { number: '01', label: 'Bottles & Jars',  emoji: '🫙' },
      { number: '02', label: 'Removing Lids',   emoji: '🪛' },
      { number: '03', label: 'Rinsing Glass',   emoji: '💧' },
    ],
    quizzes: ['Part 01 Quiz', 'Part 02 Quiz', 'Part 03 Quiz'],
  },
  'metal-recycling': {
    id: 'metal-recycling',
    navTitle: 'Metal Recycling',
    title: 'Understanding Metal Recycling Basics',
    subtitle: 'Learn how metals are sorted, cleaned, and recycled.',
    parts: [
      { number: '01', label: 'Cans & Tins',          emoji: '🥫' },
      { number: '02', label: 'Aluminium vs. Steel',   emoji: '⚙️' },
      { number: '03', label: 'Aerosols',              emoji: '🧴' },
    ],
    quizzes: ['Part 01 Quiz', 'Part 02 Quiz', 'Part 03 Quiz'],
  },
  'foil-small-metals': {
    id: 'foil-small-metals',
    navTitle: 'Foil & Small Metals',
    title: 'Understanding Foil & Small Metals',
    subtitle: 'Learn what foil and small metals can be recycled.',
    parts: [
      { number: '01', label: 'Foil Scrunch Test', emoji: '🫕' },
      { number: '02', label: 'Metal Lids',        emoji: '🔩' },
      { number: '03', label: 'Bottle Caps',       emoji: '🍾' },
    ],
    quizzes: ['Part 01 Quiz', 'Part 02 Quiz', 'Part 03 Quiz'],
  },
};

// ─── Screen ──────────────────────────────────────────────────────────────────

type Tab = 'lesson' | 'quiz';

export default function GlassAndMetalChapters() {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const data = CHAPTER_DATA[chapter ?? ''] ?? CHAPTER_DATA['glass-recycling'];
  const [activeTab, setActiveTab] = useState<Tab>('lesson');

  const isLesson = activeTab === 'lesson';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Nav */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/GlassAndMetal' as any)} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          {data.navTitle}
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Hero Image */}
        <View style={styles.heroBox}>
          {/* Replace with your image:
            <Image source={require('../../assets/images/glass-hero.png')} style={styles.heroImage} />
          */}
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroEmoji}>
              {data.id === 'glass-recycling' ? '🫙' : data.id === 'metal-recycling' ? '🥫' : '🔩'}
            </Text>
          </View>
        </View>

        {/* Title + Subtitle */}
        <View style={styles.titleBox}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
        </View>

        {/* Lesson / Quiz Toggle */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, isLesson && styles.tabBtnActive]}
            onPress={() => setActiveTab('lesson')}
            activeOpacity={0.8}
          >
            <Feather
              name="book-open"
              size={15}
              color={isLesson ? '#fff' : '#606C38'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabLabel, isLesson && styles.tabLabelActive]}>Lesson</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, !isLesson && styles.tabBtnActive]}
            onPress={() => setActiveTab('quiz')}
            activeOpacity={0.8}
          >
            <Feather
              name="help-circle"
              size={15}
              color={!isLesson ? '#fff' : '#606C38'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabLabel, !isLesson && styles.tabLabelActive]}>Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Content List */}
        {isLesson ? (
          <View style={styles.partList}>
            {data.parts.map((part) => (
              <TouchableOpacity key={part.number} style={styles.partRow} activeOpacity={0.75}>
                <View style={styles.partThumb}>
                  <Text style={{ fontSize: 22 }}>{part.emoji}</Text>
                </View>
                <View style={styles.partInfo}>
                  <Text style={styles.partNumber}>Part {part.number}</Text>
                  <Text style={styles.partLabel}>{part.label}</Text>
                </View>
                <View style={styles.partArrow}>
                  <Feather name="chevron-right" size={18} color="#606C38" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.partList}>
            {data.quizzes.map((quiz, i) => (
              <TouchableOpacity key={i} style={styles.partRow} activeOpacity={0.75}>
                <View style={styles.partInfo}>
                  <Text style={styles.partLabel}>{quiz}</Text>
                </View>
                <View style={styles.partArrow}>
                  <Feather name="chevron-right" size={18} color="#606C38" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
          <Text style={styles.startBtnText}>
            {isLesson ? 'Start Lesson' : 'Start Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },

  heroBox: { marginHorizontal: 20, marginTop: 8, borderRadius: 18, overflow: 'hidden' },
  heroImage: { width: '100%', height: 190, resizeMode: 'cover' },
  heroPlaceholder: {
    width: '100%',
    height: 190,
    backgroundColor: '#E8F0DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  heroEmoji: { fontSize: 72 },

  titleBox: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 },
  title: { fontSize: 19, fontWeight: '700', color: '#1A1A1A', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 19 },

  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabBtnActive: { backgroundColor: '#606C38' },
  tabLabel: { fontSize: 14, fontWeight: '600', color: '#606C38' },
  tabLabelActive: { color: '#fff' },

  partList: { paddingHorizontal: 20, marginTop: 12 },
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  partThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#E8F0DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  partInfo: { flex: 1 },
  partNumber: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  partLabel: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  partArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  startBtn: {
    backgroundColor: '#606C38',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
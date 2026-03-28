import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ALL_CHALLENGES } from '../../lib/challenges';
import { auth } from '../../lib/firebase';
import { getUserProgress } from '../../lib/progress';

export default function ChallengeScreen() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [lessonCount,  setLessonCount]  = useState(0);
  const [quizCount,    setQuizCount]    = useState(0);
  const [loading,      setLoading]      = useState(true);
  const [userName,     setUserName]     = useState('');

  useEffect(() => {
    const name = auth.currentUser?.displayName ?? auth.currentUser?.email?.split('@')[0] ?? 'Recycler';
    setUserName(name);

    getUserProgress().then(p => {
      if (p) {
        setCompletedIds(p.completedChallenges ?? []);
        setLessonCount(p.completedLessons?.length ?? 0);
        setQuizCount(p.completedQuizzes?.length   ?? 0);
      }
      setLoading(false);
    });
  }, []);

  function getProgress(c: (typeof ALL_CHALLENGES)[0]): number {
    const val = c.metric === 'lessons' ? lessonCount : quizCount;
    return Math.min(val / c.target, 1);
  }

  function isComplete(c: (typeof ALL_CHALLENGES)[0]): boolean {
    return completedIds.includes(c.id);
  }

  const daily   = ALL_CHALLENGES.filter(c => c.type === 'daily');
  const weekly  = ALL_CHALLENGES.filter(c => c.type === 'weekly');
  const totalDone = ALL_CHALLENGES.filter(c => isComplete(c)).length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Challenges 🎮</Text>
          <Text style={styles.subGreeting}>Hey {userName}! Keep it up.</Text>
        </View>
        <View style={styles.doneBadge}>
          <Text style={styles.doneNum}>{totalDone}/{ALL_CHALLENGES.length}</Text>
          <Text style={styles.doneLbl}>Done</Text>
        </View>
      </View>

      <View style={styles.sheet}>
        {loading ? (
          <View style={styles.loadingBox}><Text style={styles.loadingText}>Loading challenges…</Text></View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.sectionTitle}>📅 Daily Challenges</Text>
            {daily.map(c => (
              <ChallengeCard key={c.id} challenge={c} progress={getProgress(c)} done={isComplete(c)} />
            ))}

            <View style={{ height: 8 }} />

            <Text style={styles.sectionTitle}>🗓️ Weekly Challenges</Text>
            {weekly.map(c => (
              <ChallengeCard key={c.id} challenge={c} progress={getProgress(c)} done={isComplete(c)} />
            ))}

            {lessonCount === 0 && quizCount === 0 && (
              <TouchableOpacity style={styles.ctaBox} onPress={() => router.push('/(tabs)/guide' as any)}>
                <Text style={styles.ctaEmoji}>🌱</Text>
                <Text style={styles.ctaTitle}>Start your first lesson!</Text>
                <Text style={styles.ctaSub}>Head to the Guide to begin earning points.</Text>
                <View style={styles.ctaBtn}><Text style={styles.ctaBtnText}>Open Guide →</Text></View>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

function ChallengeCard({
  challenge: c,
  progress,
  done,
}: {
  challenge: (typeof ALL_CHALLENGES)[0];
  progress: number;
  done: boolean;
}) {
  const pct = Math.round(progress * 100);
  return (
    <View style={[styles.card, done && styles.cardDone]}>
      <View style={[styles.cardIcon, done && styles.cardIconDone]}>
        <Text style={styles.cardEmoji}>{done ? '✅' : c.icon}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={[styles.cardTitle, done && styles.cardTitleDone]}>{c.title}</Text>
          <View style={[styles.ptsPill, done && styles.ptsPillDone]}>
            <Text style={[styles.ptsText, done && styles.ptsTextDone]}>+{c.points}pts</Text>
          </View>
        </View>
        <Text style={styles.cardDesc}>{c.description}</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: done ? '#606C38' : '#DDA15E' }]} />
        </View>
        <Text style={styles.barLabel}>{done ? '✓ Completed!' : `${pct}% — keep going!`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#606C38' },
  header:       { paddingTop: 70, paddingHorizontal: 24, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting:     { fontSize: 26, fontWeight: '800', color: '#fff' },
  subGreeting:  { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  doneBadge:    { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center' },
  doneNum:      { fontSize: 22, fontWeight: '900', color: '#fff' },
  doneLbl:      { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  sheet:        { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 },
  loadingBox:   { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText:  { color: '#888', fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginBottom: 12, marginTop: 4 },
  card:         { flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 18, padding: 14, marginBottom: 12, gap: 12, alignItems: 'flex-start' },
  cardDone:     { backgroundColor: '#F0F5E8', borderWidth: 1.5, borderColor: '#C5D9A0' },
  cardIcon:     { width: 46, height: 46, borderRadius: 12, backgroundColor: '#E8F0DC', justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  cardIconDone: { backgroundColor: '#D4EDDA' },
  cardEmoji:    { fontSize: 22 },
  cardBody:     { flex: 1 },
  cardTop:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle:    { fontSize: 15, fontWeight: '700', color: '#1A1A1A', flex: 1, marginRight: 8 },
  cardTitleDone:{ color: '#606C38' },
  cardDesc:     { fontSize: 12, color: '#777', marginBottom: 10, lineHeight: 17 },
  ptsPill:      { backgroundColor: '#FFF3E0', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  ptsPillDone:  { backgroundColor: '#E8F0DC' },
  ptsText:      { fontSize: 12, fontWeight: '700', color: '#DDA15E' },
  ptsTextDone:  { color: '#606C38' },
  barTrack:     { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' },
  barFill:      { height: 6, borderRadius: 3 },
  barLabel:     { fontSize: 11, color: '#888', marginTop: 5, fontWeight: '600' },
  ctaBox:       { backgroundColor: '#F0F5E8', borderRadius: 20, padding: 24, alignItems: 'center', marginTop: 16 },
  ctaEmoji:     { fontSize: 48, marginBottom: 10 },
  ctaTitle:     { fontSize: 18, fontWeight: '800', color: '#283618', marginBottom: 6 },
  ctaSub:       { fontSize: 13, color: '#606C38', textAlign: 'center', lineHeight: 19, marginBottom: 16 },
  ctaBtn:       { backgroundColor: '#606C38', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12 },
  ctaBtnText:   { color: '#fff', fontWeight: '700', fontSize: 15 },
});
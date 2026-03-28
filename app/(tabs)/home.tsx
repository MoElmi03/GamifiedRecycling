import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ALL_CHALLENGES } from '../../lib/challenges';
import { auth, db } from '../../lib/firebase';

interface UserData {
  name: string;
  totalPoints: number;
  weeklyPoints: number;
  currentStreak: number;
  level: number;
  completedChallenges: string[];
}

export default function HomeScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  // 🌱 Real-time listener on the current user's Firestore document
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const unsub = onSnapshot(doc(db, 'users', uid), (snap) => {
      if (snap.exists()) {
        setUserData(snap.data() as UserData);
      }
    });
    return unsub;
  }, []);

  const dailyChallenges = ALL_CHALLENGES.filter(c => c.type === 'daily');
  const completed = userData?.completedChallenges ?? [];
  const completedCount = dailyChallenges.filter(c => completed.includes(c.id)).length;
  const progressPct = dailyChallenges.length > 0
    ? Math.round((completedCount / dailyChallenges.length) * 100)
    : 0;

  const greeting = getGreeting();
  const name = userData?.name ?? '…';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Sparkles />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}, {name}</Text>
          <Text style={styles.streak}>
            {userData?.currentStreak
              ? `You're on a ${userData.currentStreak}-day recycling streak 🥇`
              : 'Start your recycling streak today! 🌱'}
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="settings" size={18} color="#283618" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="bell" size={18} color="#283618" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main White Panel */}
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <StatCard label="Total Points" value={userData?.totalPoints ?? 0} emoji="⭐" />
            <StatCard label="This Week" value={userData?.weeklyPoints ?? 0} emoji="📅" />
            <StatCard label="Level" value={userData?.level ?? 1} emoji="🏅" />
          </View>

          {/* Goal Card */}
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>🎯 Today's Goal</Text>
            <Text style={styles.goalSubtitle}>
              Complete {dailyChallenges.length} challenges ({completedCount}/{dailyChallenges.length} done)
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
            </View>
            <Text style={styles.percent}>{progressPct}%</Text>
          </View>

          {/* Continue Journey */}
          <Text style={styles.sectionTitle}>Continue Your Journey</Text>
          <TouchableOpacity style={styles.challengeCard} onPress={() => router.push('/(tabs)/challenge')}>
            <View style={styles.challengeIcon}>
              <Text style={{ fontSize: 20 }}>♻️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>
                {completedCount === dailyChallenges.length
                  ? 'All done today! Check back tomorrow 🎉'
                  : 'Tap to complete today\'s challenges'}
              </Text>
              <Text style={styles.challengeSub}>
                {completedCount === dailyChallenges.length
                  ? 'Great work!'
                  : `${dailyChallenges.length - completedCount} remaining`}
              </Text>
            </View>
            <Feather name="chevron-right" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Learn & Earn */}
          <Text style={styles.sectionTitle}>Learn & Earn</Text>
          <View style={styles.learnCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.learnTitle}>HELP THE ENVIRONMENT</Text>
              <Text style={styles.learnSub}>
                Earn points by playing quizzes that test your recycling awareness and knowledge
              </Text>
              <TouchableOpacity style={styles.gameBtn}>
                <Text style={styles.gameText}>🎮 Start a Game</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/images/HappyEarth.png')}
              style={styles.learnImage}
            />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

function StatCard({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function Sparkles() {
  return (
    <Svg width={211} height={232} viewBox="0 0 211 232" style={styles.sparkles}>
      <Path d="M101 104C101 104 103.207 124.6 111.804 133.196C120.4 141.793 141 144 141 144C141 144 120.4 146.207 111.804 154.804C103.207 163.4 101 184 101 184C101 184 98.793 163.4 90.1964 154.804C81.5997 146.207 61 144 61 144C61 144 81.5997 141.793 90.1964 133.196C98.793 124.6 101 104 101 104Z" fill="white" fillOpacity={0.35} />
      <Path d="M171 152C171 152 173.207 172.6 181.804 181.196C190.4 189.793 211 192 211 192C211 192 190.4 194.207 181.804 202.804C173.207 211.4 171 232 171 232C171 232 168.793 211.4 160.196 202.804C151.6 194.207 131 192 131 192C131 192 151.6 189.793 160.196 181.196C168.793 172.6 171 152 171 152Z" fill="white" fillOpacity={0.2} />
      <Path d="M161.5 0C161.5 0 163.183 30.3846 169.738 43.0646C176.293 55.7447 192 59 192 59C192 59 176.293 62.2553 169.738 74.9354C163.183 87.6154 161.5 118 161.5 118C161.5 118 159.817 87.6154 153.262 74.9354C146.707 62.2553 131 59 131 59C131 59 146.707 55.7447 153.262 43.0646C159.817 30.3846 161.5 0 161.5 0Z" fill="white" fillOpacity={0.2} />
      <Path d="M30.5 39C30.5 39 32.1828 54.4498 38.7378 60.8973C45.2927 67.3447 61 69 61 69C61 69 45.2927 70.6553 38.7378 77.1027C32.1828 83.5502 30.5 99 30.5 99C30.5 99 28.8172 83.5502 22.2622 77.1027C15.7073 70.6553 0 69 0 69C0 69 15.7073 67.3447 22.2622 60.8973C28.8172 54.4498 30.5 39 30.5 39Z" fill="white" fillOpacity={0.2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#606C38' },
  header: { paddingTop: 70, paddingHorizontal: 24, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: '700', color: '#FEFAE0' },
  streak: { fontSize: 13, color: '#EAEFD0', marginTop: 4 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  iconBtn: { backgroundColor: '#FEFAE0', padding: 10, borderRadius: 12 },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#606C38', borderRadius: 14, padding: 12, alignItems: 'center' },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700', color: '#FEFAE0' },
  statLabel: { fontSize: 10, color: '#FEFAE0', textAlign: 'center', marginTop: 2 },
  goalCard: { backgroundColor: '#F8F8F8', borderRadius: 18, padding: 18, marginBottom: 20 },
  goalTitle: { fontSize: 16, fontWeight: '700', color: '#606C38' },
  goalSubtitle: { fontSize: 13, color: '#7A7A7A', marginBottom: 10 },
  progressTrack: { height: 10, backgroundColor: '#E6E6E6', borderRadius: 10, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#606C38', borderRadius: 10 },
  percent: { textAlign: 'right', marginTop: 6, fontWeight: '600', color: '#606C38' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
  challengeCard: { backgroundColor: '#606C38', padding: 18, borderRadius: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  challengeIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FEFAE0', marginRight: 14, justifyContent: 'center', alignItems: 'center' },
  challengeTitle: { color: '#fff', fontWeight: '700', fontSize: 15 },
  challengeSub: { color: '#EAEFD0', fontSize: 12 },
  learnCard: { backgroundColor: '#606C38', borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  learnTitle: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  learnSub: { color: '#EAEFD0', fontSize: 12, marginBottom: 10 },
  gameBtn: { backgroundColor: '#FEFAE0', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, alignSelf: 'flex-start' },
  gameText: { color: '#283618', fontWeight: '700' },
  learnImage: { width: 90, height: 90, borderRadius: 40, marginLeft: 14 },
  sparkles: { position: 'absolute', top: 0, right: 0, opacity: 0.8 },
});

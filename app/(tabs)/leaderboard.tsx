import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { auth } from '../../lib/firebase';
import { getLeaderboard } from '../../lib/leaderboard';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  level: number;
  weeklyPoints: number;
}

const MEDAL = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ useRef prevents Animated.Value from being recreated on every render
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    loadLeaderboard();
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, []);

  async function loadLeaderboard() {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      setUsers(data as LeaderboardUser[]);
    } finally {
      setLoading(false);
    }
  }

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <View style={styles.container}>
      <Sparkles />

      <Text style={styles.title}>🏆 Leaderboard</Text>
      <Text style={styles.subtitle}>Weekly Rankings</Text>

      {/* PODIUM */}
      {loading ? (
        <Text style={styles.loadingText}>Loading rankings…</Text>
      ) : (
        <View style={styles.podiumRow}>
          {/* Reorder: 2nd, 1st, 3rd for visual podium effect */}
          {[top3[1], top3[0], top3[2]].map((user, visualIndex) => {
            if (!user) return <View key={visualIndex} style={styles.podiumPlaceholder} />;
            const actualIndex = top3.indexOf(user);
            const isCurrentUser = user.id === currentUid;
            return (
              <Animated.View
                key={user.id}
                style={[
                  styles.podiumItem,
                  visualIndex === 1 && styles.podiumCenter,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Text style={styles.medal}>{MEDAL[actualIndex]}</Text>
                <View style={[styles.avatar, isCurrentUser && styles.avatarHighlight]}>
                  <Text style={styles.avatarText}>{user.name?.[0]?.toUpperCase() ?? '?'}</Text>
                </View>
                <Text style={[styles.name, isCurrentUser && styles.youLabel]} numberOfLines={1}>
                  {isCurrentUser ? 'You' : user.name}
                </Text>
                <Text style={styles.pts}>{user.weeklyPoints} pts</Text>
                <Text style={styles.level}>Lv {user.level}</Text>
              </Animated.View>
            );
          })}
        </View>
      )}

      {/* RANK LIST */}
      <View style={styles.listBox}>
        <Text style={styles.listHeader}>Top 50 This Week</Text>
        <FlatList
          data={rest}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isCurrentUser = item.id === currentUid;
            return (
              <View style={[styles.row, isCurrentUser && styles.rowHighlight]}>
                <Text style={styles.rowRank}>#{item.rank}</Text>
                <View style={styles.rowAvatar}>
                  <Text style={styles.rowAvatarText}>{item.name?.[0]?.toUpperCase() ?? '?'}</Text>
                </View>
                <Text style={[styles.rowName, isCurrentUser && styles.youLabel]} numberOfLines={1}>
                  {isCurrentUser ? 'You' : item.name}
                </Text>
                <Text style={styles.rowPts}>{item.weeklyPoints} pts</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No more players yet. Challenge your friends!</Text>
          }
        />
      </View>
    </View>
  );
}

function Sparkles() {
  return (
    <Svg width={211} height={232} viewBox="0 0 211 232" style={styles.sparkles}>
      <Path d="M101 104C101 104 103.207 124.6 111.804 133.196C120.4 141.793 141 144 141 144C141 144 120.4 146.207 111.804 154.804C103.207 163.4 101 184 101 184C101 184 98.793 163.4 90.1964 154.804C81.5997 146.207 61 144 61 144C61 144 81.5997 141.793 90.1964 133.196C98.793 124.6 101 104 101 104Z" fill="white" fillOpacity={0.35} />
      <Path d="M171 152C171 152 173.207 172.6 181.804 181.196C190.4 189.793 211 192 211 192C211 192 190.4 194.207 181.804 202.804C173.207 211.4 171 232 171 232C171 232 168.793 211.4 160.196 202.804C151.6 194.207 131 192 131 192C131 192 151.6 189.793 160.196 181.196C168.793 172.6 171 152 171 152Z" fill="white" fillOpacity={0.2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#606C38', paddingTop: 60 },
  sparkles: { position: 'absolute', top: 0, right: 0 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: '#EAEFD0', fontSize: 13, textAlign: 'center', marginTop: 4, marginBottom: 8 },
  loadingText: { color: '#EAEFD0', textAlign: 'center', marginTop: 40 },
  podiumRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 20, marginBottom: 8, paddingHorizontal: 16 },
  podiumItem: { alignItems: 'center', flex: 1 },
  podiumCenter: { marginBottom: 16 },
  podiumPlaceholder: { flex: 1 },
  medal: { fontSize: 28, marginBottom: 4 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FEFAE0', justifyContent: 'center', alignItems: 'center' },
  avatarHighlight: { borderWidth: 3, borderColor: '#FCB351' },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#606C38' },
  name: { color: '#fff', fontWeight: '600', marginTop: 6, fontSize: 13, textAlign: 'center' },
  youLabel: { color: '#FCB351', fontWeight: '700' },
  pts: { color: '#EAEFD0', fontSize: 12, marginTop: 2 },
  level: { color: '#ccc', fontSize: 11 },
  listBox: { flex: 1, backgroundColor: '#F5F5F5', marginTop: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 },
  listHeader: { fontSize: 15, fontWeight: '700', color: '#606C38', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowHighlight: { backgroundColor: '#EAEEDC', borderRadius: 10, paddingHorizontal: 8 },
  rowRank: { width: 32, fontSize: 13, fontWeight: '700', color: '#606C38' },
  rowAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#606C38', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  rowAvatarText: { color: '#fff', fontWeight: '700' },
  rowName: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  rowPts: { fontSize: 13, fontWeight: '700', color: '#606C38' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});

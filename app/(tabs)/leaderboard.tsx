import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { auth, db } from '../../lib/firebase';
import { getLeaderboard, getPostcodeLeaderboard, LeaderboardUser } from '../../lib/leaderboard';
import { doc, getDoc } from 'firebase/firestore';

const MEDAL = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const [activeTab,  setActiveTab]  = useState<'global' | 'local'>('global');
  const [users,      setUsers]      = useState<LeaderboardUser[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [postcode,   setPostcode]   = useState('');
  const scaleAnim   = useRef(new Animated.Value(0.8)).current;
  const currentUid  = auth.currentUser?.uid;

  useFocusEffect(
    useCallback(() => {
      loadData();
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    }, [activeTab])
  );

  async function loadData() {
    setLoading(true);
    try {
      if (activeTab === 'global') {
        const data = await getLeaderboard();
        setUsers(data);
      } else {
        // get user's postcode
        if (!currentUid) return;
        let pc = postcode;
        if (!pc) {
          const snap = await getDoc(doc(db, 'users', currentUid));
          pc = snap.data()?.postcode ?? '';
          setPostcode(pc);
        }
        if (!pc) {
          setUsers([]);
        } else {
          const data = await getPostcodeLeaderboard(pc);
          setUsers(data);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const top3 = users.slice(0, 3);
  const rest  = users.slice(3);

  return (
    <View style={styles.container}>
      <Sparkles />
      <Text style={styles.title}>🏆 Leaderboard</Text>

      {/* Tab switcher */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'global' && styles.tabActive]}
          onPress={() => setActiveTab('global')}
        >
          <Text style={[styles.tabText, activeTab === 'global' && styles.tabTextActive]}>🌍 Global</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'local' && styles.tabActive]}
          onPress={() => setActiveTab('local')}
        >
          <Text style={[styles.tabText, activeTab === 'local' && styles.tabTextActive]}>
            📍 {postcode ? postcode : 'Neighbourhood'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        {activeTab === 'global' ? 'Weekly Rankings' : `${postcode} — Weekly Rankings`}
      </Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading rankings…</Text>
      ) : users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyBig}>📍</Text>
          <Text style={styles.emptyTitle}>No neighbours yet!</Text>
          <Text style={styles.emptyBody}>
            {postcode
              ? `No one else with postcode ${postcode} has signed up yet. Be the first!`
              : 'Add your postcode in your profile to see your neighbourhood ranking.'}
          </Text>
        </View>
      ) : (
        <>
          {/* Podium */}
          <View style={styles.podiumRow}>
            {[top3[1], top3[0], top3[2]].map((user, vi) => {
              if (!user) return <View key={vi} style={styles.podiumPlaceholder} />;
              const ai = top3.indexOf(user);
              const isMe = user.id === currentUid;
              return (
                <Animated.View
                  key={user.id}
                  style={[styles.podiumItem, vi === 1 && styles.podiumCenter, { transform: [{ scale: scaleAnim }] }]}
                >
                  <Text style={styles.medal}>{MEDAL[ai]}</Text>
                  <View style={[styles.avatar, isMe && styles.avatarHighlight]}>
                    <Text style={styles.avatarText}>{(user.username ?? user.name)?.[0]?.toUpperCase() ?? '?'}</Text>
                  </View>
                  <Text style={[styles.name, isMe && styles.youLabel]} numberOfLines={1}>
                    {isMe ? 'You' : (user.username ?? user.name)}
                  </Text>
                  <Text style={styles.pts}>{user.weeklyPoints} pts</Text>
                  <Text style={styles.level}>Lv {user.level}</Text>
                </Animated.View>
              );
            })}
          </View>

          {/* List */}
          <View style={styles.listBox}>
            <Text style={styles.listHeader}>
              {activeTab === 'global' ? 'Top 50 This Week' : `Top Players in ${postcode}`}
            </Text>
            <FlatList
              data={rest}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isMe = item.id === currentUid;
                return (
                  <View style={[styles.row, isMe && styles.rowHighlight]}>
                    <Text style={styles.rowRank}>#{item.rank}</Text>
                    <View style={styles.rowAvatar}>
                      <Text style={styles.rowAvatarText}>{(item.username ?? item.name)?.[0]?.toUpperCase() ?? '?'}</Text>
                    </View>
                    <Text style={[styles.rowName, isMe && styles.youLabel]} numberOfLines={1}>
                      {isMe ? 'You' : (item.username ?? item.name)}
                    </Text>
                    <Text style={styles.rowPts}>{item.weeklyPoints} pts</Text>
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={styles.emptyText}>No more players yet!</Text>}
            />
          </View>
        </>
      )}
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
  container:        { flex: 1, backgroundColor: '#606C38', paddingTop: 60 },
  sparkles:         { position: 'absolute', top: 0, right: 0 },
  title:            { color: '#fff', fontSize: 26, fontWeight: '700', textAlign: 'center' },
  subtitle:         { color: '#EAEFD0', fontSize: 13, textAlign: 'center', marginTop: 4, marginBottom: 8 },
  tabRow:           { flexDirection: 'row', marginHorizontal: 24, marginTop: 14, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 4, gap: 4 },
  tab:              { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabActive:        { backgroundColor: '#FEFAE0' },
  tabText:          { color: '#EAEFD0', fontWeight: '600', fontSize: 13 },
  tabTextActive:    { color: '#283618' },
  loadingText:      { color: '#EAEFD0', textAlign: 'center', marginTop: 40 },
  emptyContainer:   { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyBig:         { fontSize: 56, marginBottom: 12 },
  emptyTitle:       { color: '#FEFAE0', fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptyBody:        { color: '#EAEFD0', fontSize: 14, textAlign: 'center', lineHeight: 21 },
  podiumRow:        { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 16, marginBottom: 8, paddingHorizontal: 16 },
  podiumItem:       { alignItems: 'center', flex: 1 },
  podiumCenter:     { marginBottom: 16 },
  podiumPlaceholder:{ flex: 1 },
  medal:            { fontSize: 28, marginBottom: 4 },
  avatar:           { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FEFAE0', justifyContent: 'center', alignItems: 'center' },
  avatarHighlight:  { borderWidth: 3, borderColor: '#FCB351' },
  avatarText:       { fontSize: 22, fontWeight: '700', color: '#606C38' },
  name:             { color: '#fff', fontWeight: '600', marginTop: 6, fontSize: 13, textAlign: 'center' },
  youLabel:         { color: '#FCB351', fontWeight: '700' },
  pts:              { color: '#EAEFD0', fontSize: 12, marginTop: 2 },
  level:            { color: '#ccc', fontSize: 11 },
  listBox:          { flex: 1, backgroundColor: '#F5F5F5', marginTop: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 },
  listHeader:       { fontSize: 15, fontWeight: '700', color: '#606C38', marginBottom: 12 },
  row:              { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowHighlight:     { backgroundColor: '#EAEEDC', borderRadius: 10, paddingHorizontal: 8 },
  rowRank:          { width: 32, fontSize: 13, fontWeight: '700', color: '#606C38' },
  rowAvatar:        { width: 36, height: 36, borderRadius: 18, backgroundColor: '#606C38', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  rowAvatarText:    { color: '#fff', fontWeight: '700' },
  rowName:          { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  rowPts:           { fontSize: 13, fontWeight: '700', color: '#606C38' },
  emptyText:        { textAlign: 'center', color: '#999', marginTop: 20 },
});
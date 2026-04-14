import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { logoutUser } from '../../lib/auth';
import { auth, db } from '../../lib/firebase';

interface UserData {
  name: string;
  email: string;
  totalPoints: number;
  weeklyPoints: number;
  level: number;
  currentStreak: number;
}

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  // 🔐 Real-time user data
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const unsub = onSnapshot(doc(db, 'users', uid), (snap) => {
      if (snap.exists()) setUserData(snap.data() as UserData);
    });
    return unsub;
  }, []);

  async function handleLogout() {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logoutUser();
          router.replace('/(auth)');
        },
      },
    ]);
  }

  const initials = userData?.name
    ? userData.name.slice(0, 2).toUpperCase()
    : auth.currentUser?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userData?.name ?? auth.currentUser?.email ?? 'Player'}</Text>
              <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatBox label="Total Points" value={userData?.totalPoints ?? 0} emoji="⭐" />
          <StatBox label="Weekly Pts" value={userData?.weeklyPoints ?? 0} emoji="📅" />
          <StatBox label="Level" value={userData?.level ?? 1} emoji="🏅" />
          <StatBox label="Streak" value={userData?.currentStreak ?? 0} emoji="🔥" />
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <MenuRow icon="person-circle-outline" label="Edit Profile" />
          <MenuRow icon="mail-outline" label="Change Email" />
          <MenuRow icon="lock-closed-outline" label="Change Password" />
        </View>

        {/* Other */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <MenuRow icon="settings-outline" label="Settings" />
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout} activeOpacity={0.7}>
            <View style={styles.menuItemContent}>
              <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
              <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function StatBox({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuRow({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={24} color="#606C38" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#333' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  userCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#606C38', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#FEFAE0' },
  userDetails: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '700', color: '#333' },
  userEmail: { fontSize: 13, color: '#888', marginTop: 2 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statBox: { flex: 1, minWidth: '45%', backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2, elevation: 1 },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#606C38' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, marginBottom: 8, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, elevation: 1 },
  logoutItem: { borderWidth: 1, borderColor: '#FFDEDE' },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 15, fontWeight: '500', color: '#333', marginLeft: 12 },
  logoutText: { color: '#E53E3E' },
});

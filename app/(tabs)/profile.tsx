import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { logoutUser } from '../../lib/auth';
import { auth, db } from '../../lib/firebase';

interface UserData {
  firstName?: string;
  lastName?:  string;
  username?:  string;
  name:       string;
  email:      string;
  postcode?:  string;
  totalPoints:  number;
  weeklyPoints: number;
  level:        number;
  currentStreak:number;
}

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const unsub = onSnapshot(doc(db, 'users', uid), snap => {
      if (snap.exists()) setUserData(snap.data() as UserData);
    });
    return unsub;
  }, []);

  async function handleLogout() {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => {
        await logoutUser();
        router.replace('/(auth)');
      }},
    ]);
  }

  const displayName = userData?.username ?? userData?.name ?? 'Player';
  const fullName    = (userData?.firstName && userData?.lastName)
    ? `${userData.firstName} ${userData.lastName}`
    : displayName;
  const initials    = displayName.slice(0, 2).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Green header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* User card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userUsername}>@{userData?.username ?? displayName}</Text>
            {userData?.postcode && (
              <View style={styles.postcodePill}>
                <Feather name="map-pin" size={11} color="#606C38" />
                <Text style={styles.postcodeText}> {userData.postcode}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/(tabs)/EditProfile' as any)}
          >
            <Feather name="edit-2" size={16} color="#606C38" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatBox label="Total Points"  value={userData?.totalPoints  ?? 0} emoji="⭐" />
          <StatBox label="Weekly Pts"    value={userData?.weeklyPoints ?? 0} emoji="📅" />
          <StatBox label="Level"         value={userData?.level        ?? 1} emoji="🏅" />
          <StatBox label="Streak"        value={userData?.currentStreak ?? 0} emoji="🔥" />
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <MenuRow icon="person-circle-outline" label="Edit Profile"     onPress={() => router.push('/(tabs)/EditProfile' as any)} />
          <MenuRow icon="mail-outline"          label="Change Email"     onPress={() => router.push('/(tabs)/ChangeEmail' as any)} />
          <MenuRow icon="lock-closed-outline"   label="Change Password"  onPress={() => router.push('/(tabs)/ChangePassword' as any)} />
        </View>

        {/* Other */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <MenuRow icon="settings-outline" label="Settings" onPress={() => router.push('/(tabs)/Settings' as any)} />
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

function MenuRow({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={24} color="#606C38" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#f8f8f8' },
  header:          { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#606C38' },
  headerTitle:     { fontSize: 28, fontWeight: '700', color: '#FEFAE0' },
  userCard:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 18, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  avatar:          { width: 64, height: 64, borderRadius: 32, backgroundColor: '#606C38', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText:      { fontSize: 24, fontWeight: '700', color: '#FEFAE0' },
  userDetails:     { flex: 1 },
  userName:        { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  userUsername:    { fontSize: 13, color: '#888', marginTop: 2 },
  postcodePill:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F0DC', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 6, alignSelf: 'flex-start' },
  postcodeText:    { fontSize: 11, color: '#606C38', fontWeight: '700' },
  editBtn:         { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F5E8', justifyContent: 'center', alignItems: 'center' },
  statsGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 10, margin: 16 },
  statBox:         { flex: 1, minWidth: '45%', backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2, elevation: 1 },
  statEmoji:       { fontSize: 22, marginBottom: 4 },
  statValue:       { fontSize: 22, fontWeight: '700', color: '#606C38' },
  statLabel:       { fontSize: 11, color: '#888', marginTop: 2 },
  section:         { marginHorizontal: 16, marginBottom: 24 },
  sectionTitle:    { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10 },
  menuItem:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, marginBottom: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, elevation: 1 },
  logoutItem:      { borderWidth: 1, borderColor: '#FFDEDE' },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  menuItemText:    { fontSize: 15, fontWeight: '500', color: '#333', marginLeft: 12 },
  logoutText:      { color: '#E53E3E' },
});
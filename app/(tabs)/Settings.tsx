import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest]   = useState(false);
  const [soundEffects, setSoundEffects]   = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Settings</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <ToggleRow
            icon="bell"
            label="Push Notifications"
            desc="Receive app notifications"
            value={notifications}
            onChange={setNotifications}
          />
          <View style={styles.divider} />
          <ToggleRow
            icon="zap"
            label="Streak Reminders"
            desc="Get reminded to maintain your streak"
            value={streakReminders}
            onChange={setStreakReminders}
          />
          <View style={styles.divider} />
          <ToggleRow
            icon="mail"
            label="Weekly Digest"
            desc="Weekly summary of your progress"
            value={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </View>

        {/* App */}
        <Text style={styles.sectionTitle}>App</Text>
        <View style={styles.card}>
          <ToggleRow
            icon="volume-2"
            label="Sound Effects"
            desc="Play sounds for achievements"
            value={soundEffects}
            onChange={setSoundEffects}
          />
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <LinkRow icon="info" label="About GamifiedRecycling" onPress={() => {}} />
          <View style={styles.divider} />
          <LinkRow icon="file-text" label="Privacy Policy"    onPress={() => {}} />
          <View style={styles.divider} />
          <LinkRow icon="book-open" label="Terms of Service"  onPress={() => {}} />
          <View style={styles.divider} />
          <LinkRow icon="star"      label="Rate the App"      onPress={() => {}} />
          <View style={styles.divider} />
          <LinkRow icon="message-circle" label="Send Feedback" onPress={() => {}} />
        </View>

        {/* Danger zone */}
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.dangerRow}
            onPress={() => Alert.alert('Delete Account', 'This action cannot be undone. Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => {} },
            ])}
          >
            <Feather name="trash-2" size={20} color="#E53E3E" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.dangerLabel}>Delete Account</Text>
              <Text style={styles.dangerDesc}>Permanently remove your account and data</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>GamifiedRecycling v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

function ToggleRow({ icon, label, desc, value, onChange }: {
  icon: string; label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Feather name={icon as any} size={18} color="#606C38" />
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowDesc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#E0E0E0', true: '#A8C690' }}
        thumbColor={value ? '#606C38' : '#f4f3f4'}
      />
    </View>
  );
}

function LinkRow({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowIcon}>
        <Feather name={icon as any} size={18} color="#606C38" />
      </View>
      <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
      <Feather name="chevron-right" size={18} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f8f8f8' },
  nav:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backBtn:      { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  navTitle:     { fontSize: 17, fontWeight: '700', color: '#333' },
  content:      { padding: 20, paddingBottom: 60 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, marginTop: 8 },
  card:         { backgroundColor: '#fff', borderRadius: 16, marginBottom: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  divider:      { height: 1, backgroundColor: '#F5F5F5', marginLeft: 58 },
  row:          { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  rowIcon:      { width: 34, height: 34, borderRadius: 10, backgroundColor: '#F0F5E8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowInfo:      { flex: 1 },
  rowLabel:     { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  rowDesc:      { fontSize: 12, color: '#999', marginTop: 2 },
  dangerRow:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  dangerLabel:  { fontSize: 15, fontWeight: '600', color: '#E53E3E' },
  dangerDesc:   { fontSize: 12, color: '#999', marginTop: 2 },
  version:      { textAlign: 'center', color: '#bbb', fontSize: 12, marginTop: 8 },
});
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { changeUserEmail } from '../../lib/auth';
import { auth } from '../../lib/firebase';

export default function ChangeEmailScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail,        setNewEmail]        = useState('');
  const [confirmEmail,    setConfirmEmail]    = useState('');
  const [loading,         setLoading]         = useState(false);
  const [showPass,        setShowPass]        = useState(false);

  async function handleChange() {
    if (!currentPassword || !newEmail || !confirmEmail) {
      alert('Please fill in all fields'); return;
    }
    if (newEmail !== confirmEmail) {
      alert('Emails do not match'); return;
    }
    setLoading(true);
    try {
      await changeUserEmail(currentPassword, newEmail.trim());
      Alert.alert('Done', 'Your email has been updated.', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Change Email</Text>
        <View style={{ width: 38 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.infoCard}>
            <Feather name="mail" size={20} color="#606C38" />
            <Text style={styles.infoText}>Current email: <Text style={styles.infoBold}>{auth.currentUser?.email}</Text></Text>
          </View>

          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#bbb"
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eye}>
              <Feather name={showPass ? 'eye-off' : 'eye'} size={18} color="#999" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>New Email</Text>
          <TextInput style={styles.inputPlain} value={newEmail} onChangeText={setNewEmail} placeholder="Enter new email" placeholderTextColor="#bbb" autoCapitalize="none" keyboardType="email-address" />

          <Text style={styles.label}>Confirm New Email</Text>
          <TextInput style={styles.inputPlain} value={confirmEmail} onChangeText={setConfirmEmail} placeholder="Confirm new email" placeholderTextColor="#bbb" autoCapitalize="none" keyboardType="email-address" />

          <TouchableOpacity style={[styles.btn, loading && { opacity: 0.6 }]} onPress={handleChange} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Updating…' : 'Update Email'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f8f8f8' },
  nav:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backBtn:      { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  navTitle:     { fontSize: 17, fontWeight: '700', color: '#333' },
  content:      { padding: 20, paddingBottom: 60 },
  infoCard:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F0DC', borderRadius: 12, padding: 14, marginBottom: 24, gap: 10 },
  infoText:     { fontSize: 13, color: '#333' },
  infoBold:     { fontWeight: '700', color: '#283618' },
  label:        { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#E8E8E8', marginBottom: 16 },
  input:        { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1A1A1A' },
  eye:          { padding: 14 },
  inputPlain:   { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1A1A1A', borderWidth: 1, borderColor: '#E8E8E8', marginBottom: 16 },
  btn:          { backgroundColor: '#606C38', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 8 },
  btnText:      { color: '#fff', fontSize: 17, fontWeight: '700' },
});
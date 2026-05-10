import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { changeUserPassword } from '../../lib/auth';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword,     setNewPassword]     = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,         setLoading]         = useState(false);
  const [showCurrent,     setShowCurrent]     = useState(false);
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);

  function passwordStrength(p: string): { label: string; color: string; pct: number } {
    if (p.length === 0)  return { label: '',       color: '#E0E0E0', pct: 0   };
    if (p.length < 6)    return { label: 'Weak',   color: '#E53E3E', pct: 25  };
    if (p.length < 10)   return { label: 'Fair',   color: '#DDA15E', pct: 55  };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^a-zA-Z0-9]/.test(p))
      return { label: 'Strong', color: '#606C38', pct: 100 };
    return { label: 'Good', color: '#6BAE42', pct: 75 };
  }

  const strength = passwordStrength(newPassword);

  async function handleChange() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields'); return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match'); return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters'); return;
    }
    setLoading(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      Alert.alert('Done', 'Your password has been updated.', [{ text: 'OK', onPress: () => router.back() }]);
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
        <Text style={styles.navTitle}>Change Password</Text>
        <View style={{ width: 38 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

          <Text style={styles.label}>Current Password</Text>
          <PasswordInput value={currentPassword} onChange={setCurrentPassword} show={showCurrent} toggle={() => setShowCurrent(v => !v)} placeholder="Enter current password" />

          <Text style={styles.label}>New Password</Text>
          <PasswordInput value={newPassword}     onChange={setNewPassword}     show={showNew}     toggle={() => setShowNew(v => !v)}     placeholder="Enter new password" />

          {newPassword.length > 0 && (
            <View style={styles.strengthBox}>
              <View style={styles.strengthTrack}>
                <View style={[styles.strengthFill, { width: `${strength.pct}%` as any, backgroundColor: strength.color }]} />
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
            </View>
          )}

          <Text style={styles.label}>Confirm New Password</Text>
          <PasswordInput value={confirmPassword} onChange={setConfirmPassword} show={showConfirm} toggle={() => setShowConfirm(v => !v)} placeholder="Confirm new password" />

          {confirmPassword.length > 0 && newPassword !== confirmPassword && (
            <Text style={styles.mismatch}>Passwords do not match</Text>
          )}

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>Password tips:</Text>
            <Text style={styles.tipsItem}>• At least 8 characters</Text>
            <Text style={styles.tipsItem}>• Mix of uppercase and lowercase</Text>
            <Text style={styles.tipsItem}>• Include numbers and symbols</Text>
          </View>

          <TouchableOpacity style={[styles.btn, loading && { opacity: 0.6 }]} onPress={handleChange} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Updating…' : 'Update Password'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function PasswordInput({ value, onChange, show, toggle, placeholder }: {
  value: string; onChange: (v: string) => void; show: boolean; toggle: () => void; placeholder: string;
}) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        secureTextEntry={!show}
      />
      <TouchableOpacity onPress={toggle} style={styles.eye}>
        <Feather name={show ? 'eye-off' : 'eye'} size={18} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#f8f8f8' },
  nav:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backBtn:       { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  navTitle:      { fontSize: 17, fontWeight: '700', color: '#333' },
  content:       { padding: 20, paddingBottom: 60 },
  label:         { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  inputWrapper:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#E8E8E8', marginBottom: 16 },
  input:         { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1A1A1A' },
  eye:           { padding: 14 },
  strengthBox:   { flexDirection: 'row', alignItems: 'center', marginTop: -8, marginBottom: 16, gap: 10 },
  strengthTrack: { flex: 1, height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' },
  strengthFill:  { height: 6, borderRadius: 3 },
  strengthLabel: { fontSize: 12, fontWeight: '700', width: 50 },
  mismatch:      { fontSize: 12, color: '#E53E3E', marginTop: -10, marginBottom: 12 },
  tips:          { backgroundColor: '#F0F5E8', borderRadius: 12, padding: 14, marginBottom: 24 },
  tipsTitle:     { fontSize: 13, fontWeight: '700', color: '#606C38', marginBottom: 6 },
  tipsItem:      { fontSize: 12, color: '#606C38', lineHeight: 20 },
  btn:           { backgroundColor: '#606C38', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  btnText:       { color: '#fff', fontSize: 17, fontWeight: '700' },
});
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateProfile } from '../../lib/auth';
import { auth, db } from '../../lib/firebase';

export default function EditProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [username,  setUsername]  = useState('');
  const [postcode,  setPostcode]  = useState('');
  const [loading,   setLoading]   = useState(false);
  const [fetching,  setFetching]  = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    getDoc(doc(db, 'users', uid)).then(snap => {
      if (snap.exists()) {
        const d = snap.data();
        setFirstName(d.firstName ?? '');
        setLastName(d.lastName   ?? '');
        setUsername(d.username   ?? d.name ?? '');
        setPostcode(d.postcode   ?? '');
      }
      setFetching(false);
    });
  }, []);

  async function handleSave() {
    if (!firstName.trim() || !lastName.trim() || !username.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(firstName.trim(), lastName.trim(), username.trim(), postcode.trim());
      alert('Profile updated!');
      router.back();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#606C38" /></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Text style={[styles.saveText, loading && { opacity: 0.5 }]}>{loading ? 'Saving…' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Avatar preview */}
          <View style={styles.avatarBox}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(username[0] ?? '?').toUpperCase()}</Text>
            </View>
            <Text style={styles.avatarHint}>@{username || 'username'}</Text>
          </View>

          <Field label="First Name *"   value={firstName} onChange={setFirstName} placeholder="Enter first name" />
          <Field label="Last Name *"    value={lastName}  onChange={setLastName}  placeholder="Enter last name" />
          <Field label="Username *"     value={username}  onChange={setUsername}  placeholder="Choose a username" autoCapitalize="none" />
          <Field label="Postcode"       value={postcode}  onChange={setPostcode}  placeholder="e.g. B12 8QX" autoCapitalize="characters" />

          <Text style={styles.hint}>* Required fields. Postcode is used for the neighbourhood leaderboard.</Text>

          <TouchableOpacity style={[styles.saveBtn, loading && { opacity: 0.6 }]} onPress={handleSave} disabled={loading}>
            <Text style={styles.saveBtnText}>{loading ? 'Saving…' : 'Save Changes'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, value, onChange, placeholder, autoCapitalize }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; autoCapitalize?: 'none' | 'words' | 'characters';
}) {
  return (
    <View style={styles.fieldBox}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        autoCapitalize={autoCapitalize ?? 'words'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f8f8f8' },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  nav:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backBtn:     { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  navTitle:    { fontSize: 17, fontWeight: '700', color: '#333' },
  saveText:    { fontSize: 15, fontWeight: '700', color: '#606C38' },
  content:     { padding: 20, paddingBottom: 60 },
  avatarBox:   { alignItems: 'center', marginBottom: 28 },
  avatar:      { width: 80, height: 80, borderRadius: 40, backgroundColor: '#606C38', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarText:  { fontSize: 30, fontWeight: '700', color: '#FEFAE0' },
  avatarHint:  { fontSize: 14, color: '#888' },
  fieldBox:    { marginBottom: 16 },
  fieldLabel:  { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  fieldInput:  { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1A1A1A', borderWidth: 1, borderColor: '#E8E8E8' },
  hint:        { fontSize: 12, color: '#aaa', marginBottom: 24, lineHeight: 18 },
  saveBtn:     { backgroundColor: '#606C38', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
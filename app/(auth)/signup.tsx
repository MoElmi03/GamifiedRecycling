import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { registerUser } from '../../lib/auth';

export default function SignupScreen() {
  const [firstName,       setFirstName]       = useState('');
  const [lastName,        setLastName]         = useState('');
  const [username,        setUsername]         = useState('');
  const [postcode,        setPostcode]         = useState('');
  const [email,           setEmail]            = useState('');
  const [password,        setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword]  = useState('');
  const [loading,         setLoading]          = useState(false);
  const [showPass,        setShowPass]         = useState(false);
  const [showConfirm,     setShowConfirm]      = useState(false);

  async function handleSignup() {
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !postcode.trim() || !email.trim() || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await registerUser(email.trim(), password, firstName.trim(), lastName.trim(), username.trim(), postcode.trim());
      router.replace('/(tabs)/home');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackgroundCircles />
      <Sparkles />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start recycling smarter</Text>

          {/* Name row */}
          <View style={styles.row}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#9AA084"
              style={[styles.input, styles.inputHalf]}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#9AA084"
              style={[styles.input, styles.inputHalf]}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          {/* Username */}
          <View style={styles.inputWrapper}>
            <Feather name="at-sign" size={18} color="#9AA084" style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#9AA084"
              style={styles.inputWithIcon}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Postcode */}
          <View style={styles.inputWrapper}>
            <Feather name="map-pin" size={18} color="#9AA084" style={styles.inputIcon} />
            <TextInput
              placeholder="Postcode (e.g. B12 8QX)"
              placeholderTextColor="#9AA084"
              style={styles.inputWithIcon}
              value={postcode}
              onChangeText={setPostcode}
              autoCapitalize="characters"
            />
          </View>
          <Text style={styles.postcodeHint}>Used to rank you in your neighbourhood leaderboard</Text>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#9AA084" style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#9AA084"
              style={styles.inputWithIcon}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#9AA084" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9AA084"
              style={[styles.inputWithIcon, { flex: 1 }]}
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
              <Feather name={showPass ? 'eye-off' : 'eye'} size={18} color="#9AA084" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#9AA084" style={styles.inputIcon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#9AA084"
              style={[styles.inputWithIcon, { flex: 1 }]}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={styles.eyeBtn}>
              <Feather name={showConfirm ? 'eye-off' : 'eye'} size={18} color="#9AA084" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.mainButton, loading && styles.mainButtonDisabled]} onPress={handleSignup} disabled={loading}>
            <Text style={styles.mainButtonText}>{loading ? 'Creating Account…' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}><AntDesign name="google" size={22} color="#000" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><FontAwesome name="facebook" size={22} color="#000" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><FontAwesome name="apple" size={24} color="#000" /></TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.switchText}>Already have an account? <Text style={styles.switchBold}>Login</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function BackgroundCircles() {
  return (
    <>
      <Svg width={600} height={600} style={styles.circle1}>
        <Circle cx="300" cy="300" r="299.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.35" />
      </Svg>
      <Svg width={700} height={700} style={styles.circle2}>
        <Circle cx="350" cy="350" r="349.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.25" />
      </Svg>
    </>
  );
}

function Sparkles() {
  return (
    <Svg width={211} height={232} viewBox="0 0 211 232" style={styles.sparkles}>
      <Path d="M101 104C101 104 103.207 124.6 111.804 133.196C120.4 141.793 141 144 141 144C141 144 120.4 146.207 111.804 154.804C103.207 163.4 101 184 101 184C101 184 98.793 163.4 90.1964 154.804C81.5997 146.207 61 144 61 144C61 144 81.5997 141.793 90.1964 133.196C98.793 124.6 101 104 101 104Z" fill="white" fillOpacity={0.35} />
      <Path d="M161.5 0C161.5 0 163.183 30.3846 169.738 43.0646C176.293 55.7447 192 59 192 59C192 59 176.293 62.2553 169.738 74.9354C163.183 87.6154 161.5 118 161.5 118C161.5 118 159.817 87.6154 153.262 74.9354C146.707 62.2553 131 59 131 59C131 59 146.707 55.7447 153.262 43.0646C159.817 30.3846 161.5 0 161.5 0Z" fill="white" fillOpacity={0.2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: '#606C38' },
  scroll:              { paddingHorizontal: 28, paddingTop: 70, paddingBottom: 40, zIndex: 2 },
  title:               { fontSize: 32, fontWeight: '700', color: '#FEFAE0', textAlign: 'center' },
  subtitle:            { fontSize: 15, color: '#FCB351', textAlign: 'center', marginTop: 6, marginBottom: 24 },
  row:                 { flexDirection: 'row', gap: 10, marginBottom: 0 },
  input:               { backgroundColor: '#FEFAE0', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 18, fontSize: 15, marginBottom: 12, color: '#283618' },
  inputHalf:           { flex: 1 },
  inputWrapper:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEFAE0', borderRadius: 14, marginBottom: 12, paddingHorizontal: 14 },
  inputIcon:           { marginRight: 8 },
  inputWithIcon:       { flex: 1, paddingVertical: 16, fontSize: 15, color: '#283618' },
  eyeBtn:              { padding: 8 },
  postcodeHint:        { fontSize: 11, color: '#EAEFD0', marginTop: -8, marginBottom: 10, paddingLeft: 4 },
  mainButton:          { backgroundColor: '#FEFAE0', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 8 },
  mainButtonDisabled:  { opacity: 0.7 },
  mainButtonText:      { color: '#283618', fontSize: 18, fontWeight: '700' },
  orText:              { textAlign: 'center', color: '#EAEFD0', marginVertical: 16, fontSize: 14 },
  socialRow:           { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: 24 },
  socialBtn:           { width: 54, height: 54, borderRadius: 16, backgroundColor: '#FEFAE0', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 6 },
  switchText:          { textAlign: 'center', color: '#EAEFD0', fontSize: 14 },
  switchBold:          { fontWeight: '700', color: '#FEFAE0' },
  circle1:             { position: 'absolute', left: -442, top: -474 },
  circle2:             { position: 'absolute', left: -502, top: -534 },
  sparkles:            { position: 'absolute', top: 0, right: 0, opacity: 0.8 },
});
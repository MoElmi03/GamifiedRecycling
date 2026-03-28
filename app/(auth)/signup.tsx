import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { registerUser } from '../../lib/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignup() {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await registerUser(email, password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundCircles />
      <Sparkles />

      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start recycling smarter</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9AA084"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9AA084"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#9AA084"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
          <Text style={styles.mainButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or continue with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="google" size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="apple" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.switchText}>
            Already have an account? <Text style={styles.switchBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- DECORATIVE COMPONENTS ---------------- */

function BackgroundCircles() {
  return (
    <>
      <Svg width={600} height={600} style={styles.circle1}>
        <Circle
          cx="300"
          cy="300"
          r="299.5"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
          opacity="0.35"
        />
      </Svg>

      <Svg width={700} height={700} style={styles.circle2}>
        <Circle
          cx="350"
          cy="350"
          r="349.5"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
          opacity="0.25"
        />
      </Svg>
    </>
  );
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


/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#606C38',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 28,
    zIndex: 2,
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FEFAE0',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#FCB351',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
  },

  input: {
    width: '100%',
    backgroundColor: '#FEFAE0',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 14,
    color: '#283618',
  },

  mainButton: {
    backgroundColor: '#FEFAE0',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  mainButtonText: {
    color: '#283618',
    fontSize: 18,
    fontWeight: '700',
  },

  orText: {
    textAlign: 'center',
    color: '#EAEFD0',
    marginVertical: 18,
    fontSize: 14,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 26,
  },

  socialBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  switchText: {
    textAlign: 'center',
    color: '#EAEFD0',
    fontSize: 14,
  },

  switchBold: {
    fontWeight: '700',
    color: '#FEFAE0',
  },

  circle1: {
    position: 'absolute',
    left: -442,
    top: -474,
  },

  circle2: {
    position: 'absolute',
    left: -502,
    top: -534,
  },

  sparkles: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.8,
  },
});


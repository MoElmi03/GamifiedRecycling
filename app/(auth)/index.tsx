import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundCircles />
      <Sparkles />

      <Text style={styles.title}>
        Recycle Anytime,{'\n'}Anywhere
      </Text>

      <Image
        source={require('../../assets/images/recycle.png')}
        style={styles.image}
      />

      <Text style={styles.subtitle}>
        Turn Waste Into Wonder.{'\n'}One Item at a Time.
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
  
}

/* DECORATIVE COMPONENTS */

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



/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#606C38',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#FEFAE0',
    textAlign: 'center',
    lineHeight: 44,
    marginTop: 28,
    zIndex: 2,
  },

  image: {
    width: 260,
    height: 260,
    zIndex: 2,
    transform: [{ rotate: '20deg' }],
  },

  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FEFAE0',
    textAlign: 'center',
    zIndex: 2,
  },

  button: {
    width: '100%',
    backgroundColor: '#FEFAE0',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    zIndex: 2,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#283618',
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













import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#999999',
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
      tabBarLabelStyle: styles.tabBarLabel,
    }}>

      {/* ── VISIBLE tabs (only these 5 show in nav bar) ── */}
      <Tabs.Screen name="home"        options={{ tabBarLabel: 'Home',        tabBarIcon: ({ color, size }) => <Feather name="home"        color={color} size={size} />, tabBarActiveBackgroundColor: '#606C38' }} />
      <Tabs.Screen name="challenge"   options={{ tabBarLabel: 'Challenge',   tabBarIcon: ({ color, size }) => <Feather name="zap"         color={color} size={size} />, tabBarActiveBackgroundColor: '#606C38' }} />
      <Tabs.Screen name="guide"       options={{ tabBarLabel: 'Guide',       tabBarIcon: ({ color, size }) => <Feather name="book"        color={color} size={size} />, tabBarActiveBackgroundColor: '#606C38' }} />
      <Tabs.Screen name="leaderboard" options={{ tabBarLabel: 'Leaderboard', tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" color={color} size={size} />, tabBarActiveBackgroundColor: '#606C38' }} />
      <Tabs.Screen name="profile"     options={{ tabBarLabel: 'Profile',     tabBarIcon: ({ color, size }) => <Feather name="user"        color={color} size={size} />, tabBarActiveBackgroundColor: '#606C38' }} />

      {/* ── HIDDEN screens (href: null removes them from the nav bar) ── */}
      <Tabs.Screen name="explore"                    options={{ href: null }} />
      <Tabs.Screen name="GlassAndMetal"              options={{ href: null }} />
      <Tabs.Screen name="PlasticItems"               options={{ href: null }} />
      <Tabs.Screen name="PaperCardboard"             options={{ href: null }} />
      <Tabs.Screen name="FoodOrganicWaste"           options={{ href: null }} />
      <Tabs.Screen name="CommonContaminants"         options={{ href: null }} />
      <Tabs.Screen name="LocalRules"                 options={{ href: null }} />
      <Tabs.Screen name="ChapterDetail"              options={{ href: null }} />
      <Tabs.Screen name="LessonPlayer"               options={{ href: null }} />
      <Tabs.Screen name="QuizPlayer"                 options={{ href: null }} />
      <Tabs.Screen name="GlassAndMetalChapters"      options={{ href: null }} />
      <Tabs.Screen name="PlasticItemsChapters"       options={{ href: null }} />
      <Tabs.Screen name="PaperCardboardChapters"     options={{ href: null }} />
      <Tabs.Screen name="FoodOrganicWasteChapters"   options={{ href: null }} />
      <Tabs.Screen name="CommonContaminantsChapters" options={{ href: null }} />
      <Tabs.Screen name="LocalRulesChapters"         options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70, backgroundColor: '#FFFFFF', borderTopWidth: 0,
    paddingBottom: 12, paddingTop: 8, paddingHorizontal: 8,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: -3 },
  },
  tabBarItem:  { borderRadius: 18, marginHorizontal: 3, paddingVertical: 6 },
  tabBarLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
});
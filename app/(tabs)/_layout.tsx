import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#606C38',
      tabBarInactiveTintColor: '#999999',
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
      tabBarLabelStyle: styles.tabBarLabel,
    }}>
      {/* ── Visible tabs ── */}
      <Tabs.Screen name="home"        options={{ tabBarLabel: 'Home',        tabBarIcon: ({ color, size }) => <Feather name="home"        color={color} size={size} /> }} />
      <Tabs.Screen name="challenge"   options={{ tabBarLabel: 'Challenge',   tabBarIcon: ({ color, size }) => <Feather name="zap"         color={color} size={size} /> }} />
      <Tabs.Screen name="guide"       options={{ tabBarLabel: 'Guide',       tabBarIcon: ({ color, size }) => <Feather name="book"        color={color} size={size} /> }} />
      <Tabs.Screen name="leaderboard" options={{ tabBarLabel: 'Leaderboard', tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" color={color} size={size} /> }} />
      <Tabs.Screen name="profile"     options={{ tabBarLabel: 'Profile',     tabBarIcon: ({ color, size }) => <Feather name="user"        color={color} size={size} /> }} />

      {/* ── Hidden screens ── */}
      <Tabs.Screen name="GlassAndMetal"      options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="PlasticItems"       options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="PaperCardboard"     options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="FoodOrganicWaste"   options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="CommonContaminants" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="LocalRules"         options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="ChapterDetail"      options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="LessonPlayer"       options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="QuizPlayer"         options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="EditProfile"        options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="ChangeEmail"        options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="ChangePassword"     options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="Settings"           options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="GlassAndMetalChapters"      options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="PlasticItemsChapters"       options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="PaperCardboardChapters"     options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="FoodOrganicWasteChapters"   options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="CommonContaminantsChapters" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="LocalRulesChapters"         options={{ tabBarButton: () => null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F0F0F0',
    paddingBottom: 10, paddingTop: 8, paddingHorizontal: 0,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: -3 },
  },
  tabBarItem:  { flex: 1, marginHorizontal: 0, paddingVertical: 4 },
  tabBarLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
});
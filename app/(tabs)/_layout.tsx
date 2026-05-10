import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Only these 5 routes appear in the bar — everything else is invisible
const VISIBLE_TABS = [
  { name: 'home',        label: 'Home',        icon: 'home'        },
  { name: 'challenge',   label: 'Challenge',   icon: 'zap'         },
  { name: 'guide',       label: 'Guide',       icon: 'book'        },
  { name: 'leaderboard', label: 'Leaderboard', icon: 'bar-chart-2' },
  { name: 'profile',     label: 'Profile',     icon: 'user'        },
] as const;

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {VISIBLE_TABS.map(tab => {
        const route  = state.routes.find(r => r.name === tab.name);
        if (!route) return null;
        const isFocused = state.index === state.routes.indexOf(route);

        function onPress() {
          const event = navigation.emit({ type: 'tabPress', target: route!.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route!.name);
          }
        }

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.75}
          >
            <Feather
              name={tab.icon as any}
              size={22}
              color={isFocused ? '#606C38' : '#999'}
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* ── Visible tabs ── */}
      <Tabs.Screen name="home"        />
      <Tabs.Screen name="challenge"   />
      <Tabs.Screen name="guide"       />
      <Tabs.Screen name="leaderboard" />
      <Tabs.Screen name="profile"     />

      {/* ── Hidden screens — no tabBarButton needed, custom bar ignores them ── */}
      <Tabs.Screen name="GlassAndMetal"              options={{ href: null }} />
      <Tabs.Screen name="PlasticItems"               options={{ href: null }} />
      <Tabs.Screen name="PaperCardboard"             options={{ href: null }} />
      <Tabs.Screen name="FoodOrganicWaste"           options={{ href: null }} />
      <Tabs.Screen name="CommonContaminants"         options={{ href: null }} />
      <Tabs.Screen name="LocalRules"                 options={{ href: null }} />
      <Tabs.Screen name="ChapterDetail"              options={{ href: null }} />
      <Tabs.Screen name="LessonPlayer"               options={{ href: null }} />
      <Tabs.Screen name="QuizPlayer"                 options={{ href: null }} />
      <Tabs.Screen name="EditProfile"                options={{ href: null }} />
      <Tabs.Screen name="ChangeEmail"                options={{ href: null }} />
      <Tabs.Screen name="ChangePassword"             options={{ href: null }} />
      <Tabs.Screen name="Settings"                   options={{ href: null }} />
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
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,               
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999',
    marginTop: 3,
  },
  labelActive: {
    color: '#606C38',
  },
});
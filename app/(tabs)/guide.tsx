import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { key: 'plastic',       label: 'Plastic Items',        image: require('../../assets/images/plastic.png'),      route: '/(tabs)/PlasticItems' },
  { key: 'paper',         label: 'Paper & Cardboard',    image: require('../../assets/images/paper.png'),        route: '/(tabs)/PaperCardboard' },
  { key: 'glass',         label: 'Glass & Metal',        image: require('../../assets/images/glass.png'),        route: '/(tabs)/GlassAndMetal' },
  { key: 'organic',       label: 'Food & Organic Waste', image: require('../../assets/images/organic.png'),      route: '/(tabs)/FoodOrganicWaste' },
  { key: 'contaminants',  label: 'Common Contaminants',  image: require('../../assets/images/contaminants.png'), route: '/(tabs)/CommonContaminants' },
  { key: 'rules',         label: 'Local Rules',          image: require('../../assets/images/rules.png'),        route: '/(tabs)/LocalRules' },
];

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput placeholder="Search items" placeholderTextColor="#999" style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Feather name="sliders" size={20} color="#606C38" />
        </TouchableOpacity>
      </View>

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore categories</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={styles.categoryCard}
                onPress={() => router.push(cat.route as any)}
                activeOpacity={0.75}
              >
                <Image source={cat.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#606C38' },
  header: { paddingTop: 70, paddingHorizontal: 24, paddingBottom: 24, flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEFAE0', borderRadius: 25, paddingHorizontal: 16, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#283618' },
  filterBtn: { backgroundColor: '#FEFAE0', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#000' },
  seeAll: { fontSize: 14, color: '#606C38', fontWeight: '600' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  categoryCard: { width: '48%', backgroundColor: '#F8F8F8', borderRadius: 18, padding: 16, alignItems: 'center', justifyContent: 'center' },
  categoryImage: { width: 100, height: 100, marginBottom: 12, resizeMode: 'contain' },
  categoryName: { fontSize: 14, fontWeight: '700', color: '#000', textAlign: 'center' },
});
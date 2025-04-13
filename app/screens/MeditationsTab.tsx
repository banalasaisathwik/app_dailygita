// app/screens/MeditationsTab.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Get device width for responsive design
const { width } = Dimensions.get('window');

// Sample data for meditation sessions
const MEDITATIONS = [
  {
    id: '1',
    title: 'Morning Awakening',
    type: 'Guided',
    duration: '10 min',
    teacher: 'Guru Atma',
    cover: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Start your day with this gentle guided meditation focused on gratitude and setting positive intentions.',
    category: 'Morning',
    level: 'Beginner',
    isPopular: true,
    isRecent: true
  },
  {
    id: '2',
    title: 'Divine Mantra Meditation',
    type: 'Chanting',
    duration: '15 min',
    teacher: 'Swami Vishnu',
    cover: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Experience the transformative power of ancient Sanskrit mantras that align your energy with divine consciousness.',
    category: 'Spiritual',
    level: 'Intermediate',
    isPopular: true,
    isRecent: false
  },
  {
    id: '3',
    title: 'Inner Peace Meditation',
    type: 'Silent',
    duration: '20 min',
    teacher: 'Maya Devi',
    cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'A silent meditation practice to help you discover the wellspring of tranquility that exists within you.',
    category: 'Mindfulness',
    level: 'Advanced',
    isPopular: false,
    isRecent: true
  },
  {
    id: '4',
    title: 'Sleep & Relaxation',
    type: 'Guided',
    duration: '25 min',
    teacher: 'Rishi Kumar',
    cover: 'https://images.unsplash.com/photo-1511295742362-92c96b5adb36?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Release the tensions of the day and prepare your mind and body for restful sleep with this calming meditation.',
    category: 'Evening',
    level: 'Beginner',
    isPopular: true,
    isRecent: true
  },
  {
    id: '5',
    title: 'Chakra Balancing',
    type: 'Guided',
    duration: '30 min',
    teacher: 'Ananda Ji',
    cover: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Harmonize your seven energy centers with this powerful chakra meditation that promotes holistic healing.',
    category: 'Spiritual',
    level: 'Intermediate',
    isPopular: false,
    isRecent: false
  },
];

// Filter options with icons
const FILTERS = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'recent', label: 'New', icon: '🆕' },
  { id: 'beginner', label: 'Beginner', icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate', icon: '🌿' },
  { id: 'advanced', label: 'Advanced', icon: '🌳' },
];

// Categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🧘‍♀️' },
  { id: 'morning', name: 'Morning', icon: '🌅' },
  { id: 'evening', name: 'Evening', icon: '🌙' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧠' },
  { id: 'spiritual', name: 'Spiritual', icon: '✨' },
  { id: 'breath', name: 'Breath', icon: '💨' },
  { id: 'sleep', name: 'Sleep', icon: '😴' },
];

const MeditationCard = ({ meditation, colors, onPlay }) => {
  return (
    <TouchableOpacity 
      style={[styles.meditationCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPlay(meditation.id)}
      activeOpacity={0.7}
    >
      {/* Image and play button */}
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: meditation.cover }} style={styles.thumbnail} />
        <TouchableOpacity 
          style={[styles.playOverlay, { backgroundColor: `${colors.tint}CC` }]}
          onPress={() => onPlay(meditation.id)}
        >
          <FontAwesome name="play" size={24} color="white" />
        </TouchableOpacity>
        
        {/* Duration badge */}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{meditation.duration}</Text>
        </View>
      </View>
      
      {/* Meditation info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.meditationTitle, { color: colors.text }]} numberOfLines={1}>
            {meditation.title}
          </Text>
          
          {meditation.isPopular && (
            <View style={[styles.popularBadge, { backgroundColor: colors.warning }]}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.teacherName, { color: colors.gray[600] }]} numberOfLines={1}>
          by {meditation.teacher}
        </Text>
        
        {/* Meta tags */}
        <View style={styles.metaContainer}>
          <View style={[styles.metaTag, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.type}</Text>
          </View>
          
          <View style={[styles.metaTag, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.level}</Text>
          </View>
          
          <View style={[styles.metaTag, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MeditationsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Apply filters
  const filteredMeditations = MEDITATIONS.filter(meditation => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || 
      meditation.category.toLowerCase() === selectedCategory;
    
    // Type filter
    let typeMatch = true;
    if (activeFilter === 'popular') typeMatch = meditation.isPopular;
    if (activeFilter === 'recent') typeMatch = meditation.isRecent;
    if (activeFilter === 'beginner') typeMatch = meditation.level === 'Beginner';
    if (activeFilter === 'intermediate') typeMatch = meditation.level === 'Intermediate';
    if (activeFilter === 'advanced') typeMatch = meditation.level === 'Advanced';
    
    return categoryMatch && typeMatch;
  });
  
  const handlePlayMeditation = (id) => {
    // Handle playing meditation
    console.log(`Playing meditation: ${id}`);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Filter pills */}
      <View style={[styles.filtersWrapper, { borderBottomColor: colors.border }]}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity 
              key={filter.id}
              style={[
                styles.filterButton,
                { 
                  backgroundColor: activeFilter === filter.id 
                    ? colors.tint 
                    : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              {filter.icon && (
                <Text style={styles.filterIcon}>{filter.icon}</Text>
              )}
              <Text 
                style={[
                  styles.filterButtonText, 
                  { 
                    color: activeFilter === filter.id 
                      ? 'white' 
                      : colors.text 
                  }
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: selectedCategory === category.id 
                    ? colors.orange[100] 
                    : 'transparent',
                  borderColor: colors.orange[300],
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              )}
              <Text 
                style={[
                  styles.categoryButtonText, 
                  { color: colors.orange[700] }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Meditation grid */}
      <FlatList
        data={filteredMeditations}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <MeditationCard 
              meditation={item} 
              colors={colors} 
              onPlay={handlePlayMeditation} 
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersWrapper: {
    borderBottomWidth: 1,
  },
  filtersContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  filterIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesWrapper: {
    paddingVertical: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContainer: {
    padding: 8,
  },
  gridItem: {
    width: '50%',
    padding: 4,
  },
  meditationCard: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    height: 220,
  },
  thumbnailContainer: {
    height: 120,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  infoContainer: {
    padding: 8,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  meditationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  popularBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  popularText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  teacherName: {
    fontSize: 12,
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default MeditationsTab;
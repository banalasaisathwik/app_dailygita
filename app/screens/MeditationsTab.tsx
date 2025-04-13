// app/screens/MeditationsTab.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

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

// Filter options
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'popular', label: 'Popular' },
  { id: 'recent', label: 'New' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

// Categories
const CATEGORIES = [
  'All',
  'Morning',
  'Evening',
  'Mindfulness',
  'Spiritual',
  'Breath',
  'Sleep',
];

const MeditationCard = ({ meditation, colors, onPlay }) => {
  return (
    <TouchableOpacity 
      style={[styles.meditationCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPlay(meditation.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: meditation.cover }} style={styles.meditationCover} />
      
      <View style={styles.meditationInfo}>
        <View style={styles.meditationHeader}>
          <View>
            <Text style={[styles.meditationTitle, { color: colors.text }]} numberOfLines={1}>
              {meditation.title}
            </Text>
            <Text style={[styles.teacherName, { color: colors.gray[600] }]}>
              by {meditation.teacher}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.playButton, { backgroundColor: colors.tint }]}
            onPress={() => onPlay(meditation.id)}
          >
            <FontAwesome name="play" size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.meditationMeta}>
          <View style={[styles.metaItem, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.duration}</Text>
          </View>
          
          <View style={[styles.metaItem, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.type}</Text>
          </View>
          
          <View style={[styles.metaItem, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.metaText, { color: colors.tint }]}>{meditation.level}</Text>
          </View>
        </View>
        
        <Text style={[styles.meditationDescription, { color: colors.text }]} numberOfLines={2}>
          {meditation.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MeditationsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Apply filters
  const filteredMeditations = MEDITATIONS.filter(meditation => {
    // Category filter
    const categoryMatch = selectedCategory === 'All' || meditation.category === selectedCategory;
    
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
                  : colors.subtle,
              }
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
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
      
      {/* Categories */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedCategory === category 
                  ? colors.orange[100] 
                  : 'transparent',
                borderColor: colors.orange[300],
              }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText, 
                { color: colors.orange[700] }
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Meditation list */}
      <FlatList
        data={filteredMeditations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MeditationCard 
            meditation={item} 
            colors={colors} 
            onPlay={handlePlayMeditation} 
          />
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
  filtersContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  meditationCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  meditationCover: {
    width: '100%',
    height: 160,
  },
  meditationInfo: {
    padding: 16,
  },
  meditationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meditationMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  meditationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MeditationsTab;
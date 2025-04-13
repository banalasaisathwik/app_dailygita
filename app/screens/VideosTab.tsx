// app/screens/VideosTab.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Sample data for video suggestions
const VIDEOS = [
  {
    id: '1',
    title: 'Understanding the Essence of the Bhagavad Gita',
    speaker: 'Sadhguru',
    thumbnail: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    duration: '24:15',
    views: '1.2M',
    description: 'Sadhguru explains the profound wisdom contained in the Bhagavad Gita and how it applies to our everyday challenges.',
    category: 'Philosophy',
    isSaved: true
  },
  {
    id: '2',
    title: 'Morning Meditation for Beginners',
    speaker: 'Gurudev Sri Sri Ravi Shankar',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    duration: '18:30',
    views: '854K',
    description: 'A guided meditation practice perfect for beginners to start their day with peace and clarity of mind.',
    category: 'Meditation',
    isSaved: false
  },
  {
    id: '3',
    title: 'Karma Yoga: The Path of Selfless Action',
    speaker: 'Swami Sarvapriyananda',
    thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    duration: '42:18',
    views: '623K',
    description: 'An exploration of Karma Yoga as explained in the Bhagavad Gita, focusing on selfless service as a path to spiritual growth.',
    category: 'Yoga',
    isSaved: false
  },
  {
    id: '4',
    title: 'The Four Paths of Yoga Explained',
    speaker: 'Isha Foundation',
    thumbnail: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    duration: '32:45',
    views: '1.5M',
    description: 'A comprehensive explanation of the four main paths of yoga: Karma Yoga, Bhakti Yoga, Jnana Yoga, and Raja Yoga.',
    category: 'Yoga',
    isSaved: true
  },
  {
    id: '5',
    title: 'Understanding Hindu Temple Architecture',
    speaker: 'Dr. Deepak Shimkhada',
    thumbnail: 'https://images.unsplash.com/photo-1560181857-adf0a4896ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    duration: '28:50',
    views: '345K',
    description: 'An insightful lecture on the symbolism and spiritual significance of traditional Hindu temple architecture.',
    category: 'Culture',
    isSaved: false
  },
];

const CATEGORIES = [
  'All',
  'Philosophy',
  'Meditation',
  'Yoga',
  'Bhakti',
  'Culture',
  'Lifestyle'
];

const VideoCard = ({ video, toggleSave, colors }) => {
  const [isSaved, setIsSaved] = useState(video.isSaved);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    toggleSave(video.id);
  };
  
  return (
    <View style={[styles.videoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      
      <View style={styles.videoDetails}>
        <View style={styles.videoHeader}>
          <View style={styles.videoTitleContainer}>
            <Text style={[styles.videoTitle, { color: colors.text }]} numberOfLines={2}>
              {video.title}
            </Text>
          </View>
          
          <TouchableOpacity onPress={handleSave}>
            <FontAwesome 
              name={isSaved ? 'bookmark' : 'bookmark-o'} 
              size={20} 
              color={isSaved ? colors.tint : colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.speakerName, { color: colors.gray[600] }]}>
          {video.speaker}
        </Text>
        
        <View style={styles.videoStats}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.subtle }]}>
            <Text style={[styles.categoryText, { color: colors.tint }]}>{video.category}</Text>
          </View>
          
          <Text style={[styles.viewsText, { color: colors.gray[500] }]}>
            <FontAwesome name="eye" size={14} color={colors.gray[500]} /> {video.views} views
          </Text>
        </View>
        
        <Text style={[styles.videoDescription, { color: colors.text }]} numberOfLines={2}>
          {video.description}
        </Text>
        
        <TouchableOpacity 
          style={[styles.watchButton, { backgroundColor: colors.tint }]}
          onPress={() => {/* Handle watch video */}}
        >
          <FontAwesome name="play" size={14} color="white" style={styles.playIcon} />
          <Text style={styles.watchButtonText}>Watch Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const VideosTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState(VIDEOS);
  
  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);
    
  const toggleSave = (id) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === id ? { ...video, isSaved: !video.isSaved } : video
      )
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                  ? colors.tint 
                  : colors.subtle,
              }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText, 
                { 
                  color: selectedCategory === category 
                    ? 'white' 
                    : colors.text 
                }
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard video={item} toggleSave={toggleSave} colors={colors} />
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
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  videoCard: {
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 0.5,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  videoDetails: {
    padding: 16,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  videoTitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  speakerName: {
    fontSize: 14,
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewsText: {
    fontSize: 12,
  },
  videoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  playIcon: {
    marginRight: 8,
  },
  watchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default VideosTab;

// app/screens/VideosTab.tsx
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

// Categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🎬' },
  { id: 'philosophy', name: 'Philosophy', icon: '🧠' },
  { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️' },
  { id: 'yoga', name: 'Yoga', icon: '🌿' },
  { id: 'bhakti', name: 'Bhakti', icon: '🙏' },
  { id: 'culture', name: 'Culture', icon: '🏛️' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
];

const VideoCard = ({ video, toggleSave, colors, onPress }) => {
  const [isSaved, setIsSaved] = useState(video.isSaved);
  
  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toggleSave(video.id);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.videoCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Thumbnail with duration */}
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      
      {/* Video info */}
      <View style={styles.videoInfo}>
        {/* Video title and save button */}
        <View style={styles.videoHeader}>
          <Text style={[styles.videoTitle, { color: colors.text }]} numberOfLines={2}>
            {video.title}
          </Text>
          
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <FontAwesome 
              name={isSaved ? 'bookmark' : 'bookmark-o'} 
              size={18} 
              color={isSaved ? colors.tint : colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Speaker and views */}
        <View style={styles.metaRow}>
          <Text style={[styles.speakerName, { color: colors.gray[600] }]} numberOfLines={1}>
            {video.speaker}
          </Text>
          <View style={styles.viewsContainer}>
            <FontAwesome name="eye" size={12} color={colors.gray[500]} />
            <Text style={[styles.viewsText, { color: colors.gray[500] }]}>
              {video.views}
            </Text>
          </View>
        </View>
        
        {/* Category tag */}
        <View style={[styles.categoryPill, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {video.category}
          </Text>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.watchButton, { backgroundColor: colors.tint }]}
          >
            <FontAwesome name="play" size={12} color="white" style={styles.playIcon} />
            <Text style={styles.watchButtonText}>Watch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="share" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              Share
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="plus" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              Add to
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const VideosTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState(VIDEOS);
  
  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category.toLowerCase() === selectedCategory);
    
  const toggleSave = (id) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === id ? { ...video, isSaved: !video.isSaved } : video
      )
    );
  };
  
  const handleVideoPress = (id) => {
    console.log(`Video ${id} pressed`);
    // Navigate to video detail screen or play video
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Categories */}
      <View style={[styles.categoriesWrapper, { borderBottomColor: colors.border }]}>
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
                    ? colors.tint 
                    : colors.card,
                  borderColor: colors.border,
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
                  { 
                    color: selectedCategory === category.id 
                      ? 'white' 
                      : colors.text 
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Videos list */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard 
            video={item} 
            toggleSave={toggleSave} 
            colors={colors} 
            onPress={() => handleVideoPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesWrapper: {
    borderBottomWidth: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    paddingBottom: 16,
  },
  videoCard: {
    backgroundColor: 'white',
    padding: 12,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
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
    fontSize: 11,
    fontWeight: '500',
  },
  videoInfo: {
    paddingTop: 4,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    flex: 1,
    paddingRight: 8,
  },
  saveButton: {
    padding: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  speakerName: {
    fontSize: 13,
    flex: 1,
    paddingRight: 8,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  playIcon: {
    marginRight: 4,
  },
  watchButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    marginLeft: 4,
  },
  separator: {
    height: 1,
    width: '100%',
  },
});

export default VideosTab;
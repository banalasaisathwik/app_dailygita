// app/screens/DiscussionsTab.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Sample data for discussions
const DISCUSSIONS = [
  {
    id: '1',
    author: 'Arjuna',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    time: '2 hours ago',
    title: 'Finding purpose in your spiritual journey',
    content: 'I\'ve been practicing meditation for the past 6 months but still feel like I\'m searching for deeper meaning. What practices have helped you find your purpose?',
    comments: 12,
    likes: 32,
    tags: ['Spirituality', 'Purpose']
  },
  {
    id: '2',
    author: 'Krishna108',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    time: '6 hours ago',
    title: 'Understanding the Bhagavad Gita\'s teachings on duty',
    content: 'I\'ve been reflecting on the concept of dharma (duty) as explained in chapter 2. How do you apply these ancient teachings to modern life?',
    comments: 28,
    likes: 56,
    tags: ['Bhagavad Gita', 'Dharma']
  },
  {
    id: '3',
    author: 'Radha1008',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    time: 'Yesterday',
    title: 'Balancing spiritual practice with family life',
    content: 'As a parent with young children, I\'m finding it challenging to maintain a consistent spiritual practice. Any advice from others in similar situations?',
    comments: 34,
    likes: 67,
    tags: ['Family', 'Balance']
  },
  {
    id: '4',
    author: 'Yogiraj',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    time: '2 days ago',
    title: 'Benefits of early morning meditation',
    content: 'I\'ve been waking up at 5 AM for my sadhana practice for the past year. The transformation has been incredible. Has anyone else experienced significant changes from early morning practice?',
    comments: 42,
    likes: 104,
    tags: ['Meditation', 'Morning Routine']
  },
];

const CATEGORIES = [
  'All',
  'Meditation',
  'Philosophy',
  'Yoga',
  'Bhagavad Gita',
  'Devotion',
  'Lifestyle'
];

const DiscussionItem = ({ item, colors }) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>{item.author}</Text>
            <Text style={[styles.timeText, { color: colors.gray[500] }]}>{item.time}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.content, { color: colors.text }]} numberOfLines={3}>
          {item.content}
        </Text>
        
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: colors.subtle }]}>
              <Text style={[styles.tagText, { color: colors.tint }]}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <FontAwesome name="comment-o" size={18} color={colors.gray[600]} />
            <Text style={[styles.actionText, { color: colors.gray[600] }]}>{item.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setLiked(!liked)}
          >
            <FontAwesome 
              name={liked ? "heart" : "heart-o"} 
              size={18} 
              color={liked ? colors.tint : colors.gray[600]} 
            />
            <Text 
              style={[
                styles.actionText, 
                { color: liked ? colors.tint : colors.gray[600] }
              ]}
            >
              {liked ? item.likes + 1 : item.likes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DiscussionsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDiscussions = selectedCategory === 'All'
    ? DISCUSSIONS
    : DISCUSSIONS.filter(item => 
        item.tags.some(tag => tag === selectedCategory)
      );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome name="search" size={16} color={colors.gray[500]} style={styles.searchIcon} />
          <TextInput
            placeholder="Search discussions..."
            placeholderTextColor={colors.gray[500]}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
      </View>
      
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
                styles.categoryText, 
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
        data={filteredDiscussions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DiscussionItem item={item} colors={colors} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {/* Handle new post */}}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 8,
    paddingBottom: 80, // Extra space for FAB
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 14,
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  }
});

export default DiscussionsTab;
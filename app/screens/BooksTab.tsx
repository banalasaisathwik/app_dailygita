// app/screens/BooksTab.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Sample data for book suggestions
const BOOKS = [
  {
    id: '1',
    title: 'Bhagavad Gita: As It Is',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'A comprehensive translation and commentary on the Bhagavad Gita, explaining the science of self-realization and the essence of all Vedic knowledge.',
    rating: 4.9,
    category: 'Scripture',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Autobiography of a Yogi',
    author: 'Paramahansa Yogananda',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'A spiritual classic that introduces Western readers to meditation, karma, and the ancient science of yoga, chronicling the life journey of Paramahansa Yogananda.',
    rating: 4.8,
    category: 'Biography',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Light on Yoga',
    author: 'B.K.S. Iyengar',
    cover: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'Often called the bible of modern yoga, this comprehensive guide covers the philosophy and practices of yoga including more than 200 postures.',
    rating: 4.7,
    category: 'Yoga',
    isFavorite: false
  },
  {
    id: '4',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'A guide to spiritual enlightenment that emphasizes the importance of living in the present moment and transcending thoughts of the past or future.',
    rating: 4.7,
    category: 'Mindfulness',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Be Here Now',
    author: 'Ram Dass',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    description: 'A seminal work on Eastern philosophy and spirituality that bridges Western and Eastern traditions, sharing wisdom through words, illustrations, and practices.',
    rating: 4.8,
    category: 'Philosophy',
    isFavorite: false
  },
];

const CATEGORIES = [
  'All',
  'Scripture',
  'Philosophy',
  'Yoga',
  'Mindfulness',
  'Biography',
  'Practice',
];

const BookCard = ({ book, toggleFavorite, colors }) => {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);
  
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toggleFavorite(book.id);
  };
  
  return (
    <View style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image source={{ uri: book.cover }} style={styles.bookCover} />
      
      <View style={styles.bookDetails}>
        <View style={styles.bookHeader}>
          <View style={styles.bookTitleContainer}>
            <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={[styles.bookAuthor, { color: colors.gray[600] }]} numberOfLines={1}>
              by {book.author}
            </Text>
          </View>
          
          <TouchableOpacity onPress={handleFavorite}>
            <FontAwesome 
              name={isFavorite ? 'heart' : 'heart-o'} 
              size={22} 
              color={isFavorite ? colors.tint : colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.categoryBadge, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>{book.category}</Text>
        </View>
        
        <Text style={[styles.bookDescription, { color: colors.text }]} numberOfLines={3}>
          {book.description}
        </Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <FontAwesome 
                key={index} 
                name="star" 
                size={16} 
                color={index < Math.floor(book.rating) ? '#FFD700' : colors.gray[300]} 
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={[styles.ratingText, { color: colors.gray[600] }]}>{book.rating.toFixed(1)}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.readMoreButton, { backgroundColor: colors.tint }]}
          onPress={() => {/* Handle read more */}}
        >
          <Text style={styles.readMoreButtonText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BooksTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [books, setBooks] = useState(BOOKS);
  
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);
    
  const toggleFavorite = (id) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
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
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard book={item} toggleFavorite={toggleFavorite} colors={colors} />
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
  bookCard: {
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
  bookCover: {
    width: '100%',
    height: 160,
  },
  bookDetails: {
    padding: 16,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookTitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  readMoreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readMoreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BooksTab;
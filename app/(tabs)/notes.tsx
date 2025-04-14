

import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Text, 
  StatusBar
} from 'react-native';
import { View } from '@/components/Themed';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotesList from '../../components/notes/NotesList';
import NoteForm from '../../components/notes/NoteForm';
import { SAMPLE_NOTES, CATEGORIES } from '../../constants/noteData';
import { Note } from '../../components/notes/types';
import { FontAwesome } from '@expo/vector-icons';

const HEADER_HEIGHT = 80;

export default function NotesTab() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);

  const filteredNotes = notes.filter(note =>
    selectedCategory === 'all' || note.source.type === selectedCategory
  );

  // Animation values for the header
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

  const handleAddNote = (newNote: {
    title: string;
    content: string;
    source: {
      type: 'video' | 'book' | 'other';
      title?: string;
      link?: string;
    };
  }) => {
    const note: Note = {
      ...newNote,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      category: newNote.source.type,
      isFavorite: false
    };
    setNotes(prev => [note, ...prev]);
    setIsNoteFormVisible(false);
  };

  const toggleFavorite = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header, 
          { 
            backgroundColor: colors.card,
            paddingTop: insets.top,
            transform: [{ translateY: headerTranslate }],
            opacity: headerOpacity,
            borderBottomColor: colors.border
          }
        ]}
      >
        <View style={[styles.headerContent, ]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Spiritual Journal</Text>
          <Text style={[styles.headerSubtitle, { color: colors.gray[600] }]}>
            Capture insights from your journey
          </Text>
        </View>
      </Animated.View>

      <NotesList
        notes={filteredNotes}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onNotePress={(id) => console.log('Note pressed:', id)}
        toggleFavorite={toggleFavorite}
        onScroll={handleScroll}
        headerHeight={HEADER_HEIGHT + insets.top}
      />

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.tint,
            bottom: insets.bottom + 80
          }
        ]}
        onPress={() => setIsNoteFormVisible(true)}
      >
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>

      <NoteForm
        visible={isNoteFormVisible}
        onClose={() => setIsNoteFormVisible(false)}
        onSubmit={handleAddNote}
        colors={colors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
  
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
 
   
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
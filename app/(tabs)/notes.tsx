import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotesList from '../../components/notes/NotesList';
import NoteForm from '../../components/notes/NoteForm';
import { SAMPLE_NOTES, CATEGORIES } from '../../constants/noteData';
import { Note } from '../../components/notes/types';
import { FontAwesome } from '@expo/vector-icons';

export default function NotesTab() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();

  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);

  const filteredNotes = notes.filter(note =>
    selectedCategory === 'all' || note.source.type === selectedCategory
  );

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
      category: newNote.source.type, // Set category based on source type
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NotesList
        notes={filteredNotes}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onNotePress={(id) => console.log('Note pressed:', id)}
        toggleFavorite={toggleFavorite}
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
  fab: {
    position: 'absolute',
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
});

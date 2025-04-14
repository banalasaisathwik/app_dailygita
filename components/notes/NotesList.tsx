import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Note, Category, ThemeColors } from './types';
import NoteCard from './NoteCard';
import CategoryList from '../shared/CategoryList';

interface NotesListProps {
  notes: Note[];
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
  onNotePress: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
  onNotePress,
  toggleFavorite,
}) => {
  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={onSelectCategory}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            colors={colors}
            onPress={onNotePress}
            toggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    
    
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 100,
  },
});

export default NotesList;
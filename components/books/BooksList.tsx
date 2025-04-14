import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Book, Category, ThemeColors } from './types';
import BookCard from './BookCard';
import CategoryList from './CategoryList';

interface BooksListProps {
  books: Book[];
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
  onBookPress: (id: string) => void;
  onAddToList: (id: string) => void;  // Changed from onToggleFavorite
}

export const BooksList: React.FC<BooksListProps> = ({
  books,
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
  onBookPress,
  onAddToList,  // Changed from onToggleFavorite
}) => {
  const filteredBooks = selectedCategory === 'all'
    ? books
    : selectedCategory === 'reading-list'
    ? books.filter(book => book.isInReadingList)
    : books.filter(book => book.category.toLowerCase() === selectedCategory);

  const renderHeader = () => (
    <CategoryList
      categories={categories}
      selectedCategory={selectedCategory}
      colors={colors}
      onSelectCategory={onSelectCategory}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            colors={colors}
            onPress={() => onBookPress(item.id)}
            onAddToList={() => onAddToList(item.id)}  // Changed from toggleFavorite
          />
        )}
        ListHeaderComponent={renderHeader}
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
  listContainer: {
   
    padding: 16,
    paddingTop: 8,
    paddingBottom: 80, // Space for FAB
  },
});

export default BooksList;
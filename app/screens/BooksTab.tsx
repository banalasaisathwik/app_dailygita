import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BooksList from "../../components/books/BooksList";
import FloatingActionButton from "../../components/books/FloatingActionButton";
import BookForm from "../../components/books/BookForm";
import { Book } from "../../components/books/types";
import { BOOKS, CATEGORIES } from "../../constants/bookData";

const BooksTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [isBookFormVisible, setIsBookFormVisible] = useState(false);

  const handleBookPress = (id: string) => {
    console.log(`Book ${id} pressed`);
  };

  const handleAddBook = () => {
    setIsBookFormVisible(true);
  };

  const handleAddToList = (bookId: string) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId
          ? { ...book, isInReadingList: !book.isInReadingList }
          : book
      )
    );
  };

  const handleSubmitBook = (bookData: any) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...bookData,
      cover: 'https://via.placeholder.com/150',
      rating: 0,
      isInReadingList: false,
      userName: 'You',
      userAvatar: 'https://via.placeholder.com/40',
      timestamp: 'Just now'
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingBottom: insets.bottom + 70 // Add padding for tab bar
        }
      ]}
    >
      <BooksList
        books={books}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onBookPress={handleBookPress}
        onAddToList={handleAddToList}
      />
      <FloatingActionButton 
        colors={colors} 
        onPress={handleAddBook}
        style={{ bottom: insets.bottom + 80 }} // Position above tab bar
      />
      <BookForm
        visible={isBookFormVisible}
        onClose={() => setIsBookFormVisible(false)}
        onSubmit={handleSubmitBook}
        colors={colors}
        categories={CATEGORIES}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default BooksTab;
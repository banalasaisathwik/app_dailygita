

// app/screens/BooksTab.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

// Get device width for responsive design
const { width } = Dimensions.get("window");

// Sample data for book suggestions
const BOOKS = [
  {
    id: "1",
    title: "Bhagavad Gita: As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description:
      "A comprehensive translation and commentary on the Bhagavad Gita, explaining the science of self-realization and the essence of all Vedic knowledge.",
    rating: 4.9,
    category: "Scripture",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Autobiography of a Yogi",
    author: "Paramahansa Yogananda",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description:
      "A spiritual classic that introduces Western readers to meditation, karma, and the ancient science of yoga, chronicling the life journey of Paramahansa Yogananda.",
    rating: 4.8,
    category: "Biography",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Light on Yoga",
    author: "B.K.S. Iyengar",
    cover:
      "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description:
      "Often called the bible of modern yoga, this comprehensive guide covers the philosophy and practices of yoga including more than 200 postures.",
    rating: 4.7,
    category: "Yoga",
    isFavorite: false,
  },
  {
    id: "4",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description:
      "A guide to spiritual enlightenment that emphasizes the importance of living in the present moment and transcending thoughts of the past or future.",
    rating: 4.7,
    category: "Mindfulness",
    isFavorite: true,
  },
  {
    id: "5",
    title: "Be Here Now",
    author: "Ram Dass",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description:
      "A seminal work on Eastern philosophy and spirituality that bridges Western and Eastern traditions, sharing wisdom through words, illustrations, and practices.",
    rating: 4.8,
    category: "Philosophy",
    isFavorite: false,
  },
];

// Categories with icons
const CATEGORIES = [
  { id: "all", name: "All", icon: "📚" },
  { id: "scripture", name: "Scripture", icon: "📜" },
  { id: "philosophy", name: "Philosophy", icon: "🧠" },
  { id: "yoga", name: "Yoga", icon: "🧘‍♀️" },
  { id: "mindfulness", name: "Mindfulness", icon: "🌿" },
  { id: "biography", name: "Biography", icon: "👤" },
  { id: "practice", name: "Practice", icon: "✨" },
];

const BookCard = ({ book, toggleFavorite, colors, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toggleFavorite(book.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.bookCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Book thumbnail */}
      <Image source={{ uri: book.cover }} style={styles.bookThumbnail} />

      {/* Book content */}
      <View style={styles.bookContent}>
        {/* Category */}
        <View style={[styles.categoryTag, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {book.category}
          </Text>
        </View>

        {/* Title and author */}
        <Text
          style={[styles.bookTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text
          style={[styles.bookAuthor, { color: colors.gray[600] }]}
          numberOfLines={1}
        >
          by {book.author}
        </Text>

        {/* Ratings */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <FontAwesome
                key={index}
                name="star"
                size={12}
                color={
                  index < Math.floor(book.rating) ? "#FFD700" : colors.gray[300]
                }
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={[styles.ratingText, { color: colors.gray[600] }]}>
            {book.rating.toFixed(1)}
          </Text>
        </View>

        {/* Preview text */}
        <Text
          style={[styles.bookPreview, { color: colors.gray[700] }]}
          numberOfLines={2}
        >
          {book.description}
        </Text>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.subtle }]}
            onPress={() => {
              /* Handle read more */
            }}
          >
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>
              Read More
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavorite}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={16}
              color={isFavorite ? colors.tint : colors.gray[500]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BooksTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [books, setBooks] = useState(BOOKS);

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book) => book.category.toLowerCase() === selectedCategory
        );

  const toggleFavorite = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const handleBookPress = (id) => {
    console.log(`Book ${id} pressed`);
    // Navigate to book detail screen
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Categories */}
      <View style={styles.categoriesWrapper}>
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
                  backgroundColor:
                    selectedCategory === category.id
                      ? colors.tint
                      : colors.card,
                  borderColor: colors.border,
                },
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
                    color:
                      selectedCategory === category.id ? "white" : colors.text,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Books list */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            toggleFavorite={toggleFavorite}
            colors={colors}
            onPress={() => handleBookPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button for adding books */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {
          /* Handle add book */
        }}
      >
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "500",
  },
  listContainer: {
    padding: 12,
    paddingBottom: 80, // Extra space for FAB
  },
  bookCard: {
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  bookThumbnail: {
    width: 90,
    height: 130,
  },
  bookContent: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "500",
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    lineHeight: 18,
  },
  bookAuthor: {
    fontSize: 12,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  stars: {
    flexDirection: "row",
    marginRight: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
  },
  bookPreview: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: "600",
  },
  favoriteButton: {
    padding: 6,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default BooksTab;

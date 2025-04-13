
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

// Get device width for responsive design
const { width } = Dimensions.get("window");

// Sample data for discussions
const DISCUSSIONS = [
  {
    id: "1",
    author: "Arjuna",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    time: "2h",
    title: "Finding purpose in your spiritual journey",
    content:
      "I've been practicing meditation for the past 6 months but still feel like I'm searching for deeper meaning. What practices have helped you find your purpose?",
    comments: 12,
    likes: 32,
    tags: ["Spirituality", "Purpose"],
  },
  {
    id: "2",
    author: "Krishna108",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    time: "6h",
    title: "Understanding the Bhagavad Gita's teachings on duty",
    content:
      "I've been reflecting on the concept of dharma (duty) as explained in chapter 2. How do you apply these ancient teachings to modern life?",
    comments: 28,
    likes: 56,
    tags: ["Bhagavad Gita", "Dharma"],
  },
  {
    id: "3",
    author: "Radha1008",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    time: "1d",
    title: "Balancing spiritual practice with family life",
    content:
      "As a parent with young children, I'm finding it challenging to maintain a consistent spiritual practice. Any advice from others in similar situations?",
    comments: 34,
    likes: 67,
    tags: ["Family", "Balance"],
  },
  {
    id: "4",
    author: "Yogiraj",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    time: "2d",
    title: "Benefits of early morning meditation",
    content:
      "I've been waking up at 5 AM for my sadhana practice for the past year. The transformation has been incredible. Has anyone else experienced significant changes from early morning practice?",
    comments: 42,
    likes: 104,
    tags: ["Meditation", "Morning Routine"],
  },
];

// Categories inspired by spiritual topics
const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "scripture", name: "Scripture", icon: "📜" },
  { id: "philosophy", name: "Philosophy", icon: "🧠" },
  { id: "yoga", name: "Yoga", icon: "🧘‍♀️" },
  { id: "meditation", name: "Meditation", icon: "🌿" },
  { id: "bhakti", name: "Bhakti", icon: "🙏" },
  { id: "karma", name: "Karma", icon: "⚖️" },
  { id: "lifestyle", name: "Lifestyle", icon: "✨" },
];

const DiscussionItem = ({ item, colors, onPress }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <TouchableOpacity
      style={[
        styles.postCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Vote buttons (Reddit style) */}
      <View style={styles.voteColumn}>
        <TouchableOpacity onPress={handleLike}>
          <FontAwesome
            name="arrow-up"
            size={16}
            color={liked ? colors.tint : colors.gray[400]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.voteCount,
            {
              color: liked ? colors.tint : colors.text,
            },
          ]}
        >
          {liked ? item.likes + 1 : item.likes}
        </Text>
        <TouchableOpacity>
          <FontAwesome name="arrow-down" size={16} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      {/* Post content */}
      <View style={styles.postContent}>
        {/* Post header info */}
        <View style={styles.postMeta}>
          <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
          <Text style={[styles.authorText, { color: colors.gray[600] }]}>
            {item.author} • {item.time}
          </Text>
        </View>

        {/* Post title and preview */}
        <Text
          style={[styles.postTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.postPreview, { color: colors.gray[700] }]}
          numberOfLines={2}
        >
          {item.content}
        </Text>

        {/* Tags */}
        {item.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {item.tags.map((tag, index) => (
              <View
                key={index}
                style={[styles.tagPill, { backgroundColor: colors.subtle }]}
              >
                <Text style={[styles.tagText, { color: colors.tint }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="comment-o" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              {item.comments}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="share" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="bookmark-o" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DiscussionsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter discussions by category and search
  const filteredDiscussions = DISCUSSIONS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.tags.some((tag) => tag.toLowerCase() === selectedCategory);

    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handlePostPress = (id) => {
    console.log(`Post ${id} pressed`);
    // Navigate to post detail screen
  };

  const renderHeader = () => (
    <>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <FontAwesome
            name="search"
            size={16}
            color={colors.gray[500]}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search discussions..."
            placeholderTextColor={colors.gray[500]}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <FontAwesome
                name="times-circle"
                size={16}
                color={colors.gray[500]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

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
                  styles.categoryText,
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
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredDiscussions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscussionItem
            item={item}
            colors={colors}
            onPress={() => handlePostPress(item.id)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {
          /* Handle new post */
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
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
    paddingVertical: 0,
  },
  categoriesWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 80, // Extra space for FAB
  },
  postCard: {
    flexDirection: "row",
    marginBottom: 1, // Thin separator between posts
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  voteColumn: {
    alignItems: "center",
    paddingRight: 10,
    width: 35,
  },
  voteCount: {
    fontSize: 12,
    fontWeight: "500",
    marginVertical: 4,
  },
  postContent: {
    flex: 1,
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatarSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  authorText: {
    fontSize: 11,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 20,
  },
  postPreview: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  tagPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    paddingVertical: 4,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
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

export default DiscussionsTab;

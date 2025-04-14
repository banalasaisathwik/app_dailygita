import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiscussionsList from "../../components/discussions/DiscussionsList";
import { FloatingActionButton } from "../../components/discussions/FloatingActionButton";
import PostForm from "../../components/discussions/PostForm";
import { DISCUSSIONS, CATEGORIES } from "../../constants/discussionData";

const DiscussionsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handlePostPress = (id: string) => {
    console.log(`Post ${id} pressed`);
    // TODO: Navigate to post detail screen
  };

  const handleCreatePost = () => {
    setIsPostFormVisible(true);
  };

  const handleSubmitPost = (post: { title: string; content: string; category: string }) => {
    console.log('New post:', post);
    // TODO: Implement post creation logic
    Alert.alert('Success', 'Post created successfully!');
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingBottom: insets.bottom // Add padding for safe area
        }
      ]}
    >
      <View style={styles.content}>
        <DiscussionsList
          discussions={DISCUSSIONS}
          selectedCategory={selectedCategory}
          categories={CATEGORIES}
          colors={colors}
          onSelectCategory={setSelectedCategory}
          onPostPress={handlePostPress}
        />
      </View>
      <FloatingActionButton colors={colors} onPress={handleCreatePost} />
      <PostForm
        visible={isPostFormVisible}
        onClose={() => setIsPostFormVisible(false)}
        onSubmit={handleSubmitPost}
        colors={colors}
        categories={CATEGORIES}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
});

export default DiscussionsTab;

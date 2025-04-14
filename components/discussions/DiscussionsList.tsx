import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Discussion, ThemeColors } from './types';
import DiscussionItem from './DiscussionItem';
import { CategoryList } from './CategoryList';

interface DiscussionsListProps {
  discussions: Discussion[];
  selectedCategory: string;
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
  }>;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
  onPostPress: (id: string) => void;
}

const DiscussionsList: React.FC<DiscussionsListProps> = ({
  discussions,
  selectedCategory,
  categories,
  colors,
  onSelectCategory,
  onPostPress,
}) => {
  const filteredDiscussions = discussions.filter(
    (item) =>
      selectedCategory === 'all' ||
      item.tags.some((tag) => tag.toLowerCase() === selectedCategory)
  );

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
        data={filteredDiscussions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscussionItem
            item={item}
            colors={colors}
            onPress={() => onPostPress(item.id)}
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
    paddingBottom: 80, // Extra space for FAB
  },
});

export default DiscussionsList;

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import VideoCard from './VideoCard';
import CategoryList from './CategoryList';
import { Video, Category, ThemeColors } from './types';

interface VideosListProps {
  videos: Video[];
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
  onVideoPress: (id: string) => void;
  toggleSave: (id: string) => void;
}

export const VideosList: React.FC<VideosListProps> = ({
  videos,
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
  onVideoPress,
  toggleSave,
}) => {
  // console.log('Videos data:', videos); // Add this debug log

  const renderVideo = ({ item }: { item: Video }) => {
    // console.log('Rendering video:', item); // Add this debug log
    return (
      <VideoCard
        video={item}
        colors={colors}
        onPress={() => onVideoPress(item.id)}
        toggleSave={toggleSave}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={onSelectCategory}
      />
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
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
    padding: 8,
  },
});

export default VideosList;
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VideosList from '../../components/videos/VideosList';
import VideoForm from '../../components/videos/VideoForm';
import { Video } from '../../components/videos/types';
import { VIDEOS, CATEGORIES } from '../../constants/videoData';

const VideosTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState<Video[]>(VIDEOS);
  const [isVideoFormVisible, setIsVideoFormVisible] = useState(false);

  const handleVideoPress = (id: string) => {
    console.log(`Video ${id} pressed`);
    // TODO: Navigate to video detail screen or play video
  };

  const handleToggleSave = (id: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === id ? { ...video, isSaved: !video.isSaved } : video
      )
    );
  };

  const handleSubmitVideo = (videoData: any) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      ...videoData,
      isSaved: false,
      userName: 'You',
      userAvatar: 'https://via.placeholder.com/40',
      timestamp: 'Just now'
    };
    setVideos(prevVideos => [newVideo, ...prevVideos]);
    setIsVideoFormVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <VideosList
        videos={videos}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onVideoPress={handleVideoPress}
        toggleSave={handleToggleSave}
      />
      
      <TouchableOpacity 
        style={[
          styles.fab, 
          { 
            backgroundColor: colors.tint,
            bottom: insets.bottom + 80 // Adjusted to be above tab bar
          }
        ]}
        onPress={() => setIsVideoFormVisible(true)}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <VideoForm
        visible={isVideoFormVisible}
        onClose={() => setIsVideoFormVisible(false)}
        onSubmit={handleSubmitVideo}
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
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
});

export default VideosTab;
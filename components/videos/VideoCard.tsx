import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video, ThemeColors } from './types';
import { getVideoMetadata } from '../../utils/videoUtils';

interface VideoCardProps {
  video: Video;
  colors: ThemeColors;
  toggleSave: (id: string) => void;
  onPress: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  colors,
  toggleSave,
  onPress,
}) => {
  const [isSaved, setIsSaved] = useState(video.isSaved);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getVideoMetadata(video.videoUrl);
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [video.videoUrl]);

  const handleSave = (e: any) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toggleSave(video.id);
  };

  return (
    <TouchableOpacity
      style={[styles.videoCard, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image 
            source={
              imageError || !video.userAvatar
                ? require('../../assets/images/icon.png')
                : { uri: video.userAvatar }
            }
            style={styles.userAvatar}
            onError={() => setImageError(true)}
          />
          <View style={styles.userMeta}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {video.userName || 'Anonymous'}
            </Text>
            <Text style={[styles.timestamp, { color: colors.gray[500] }]}>
              {video.timestamp || 'Just now'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <FontAwesome
            name={isSaved ? 'bookmark' : 'bookmark-o'}
            size={18}
            color={isSaved ? colors.tint : colors.gray[500]}
          />
        </TouchableOpacity>
      </View>

      {/* Description and Tag Section */}
      <View style={styles.descriptionSection}>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={3}>
          {video.description}
        </Text>
        <View style={[styles.categoryPill, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {video.category}
          </Text>
        </View>
      </View>

      {/* Video Preview Section */}
      <View style={styles.previewContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.tint} />
          </View>
        ) : (
          <>
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: metadata?.thumbnail }} style={styles.thumbnail} />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{metadata?.duration}</Text>
              </View>
            </View>

            <View style={styles.metadataContainer}>
              <Text style={[styles.videoTitle, { color: colors.text }]} numberOfLines={2}>
                {metadata?.title}
              </Text>
              <Text style={[styles.speakerName, { color: colors.gray[600] }]}>
                {metadata?.speaker}
              </Text>
              
              <View style={styles.viewsContainer}>
                <FontAwesome name="eye" size={12} color={colors.gray[500]} />
                <Text style={[styles.viewsText, { color: colors.gray[500] }]}>
                  {metadata?.views}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoCard: {
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  descriptionSection: {
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  previewContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 80,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  metadataContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  speakerName: {
    fontSize: 12,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 11,
    marginLeft: 4,
  },
  saveButton: {
    padding: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f0f0f0', // Add background color for loading state
  },
  userMeta: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  loadingContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
  },
});

export default VideoCard;
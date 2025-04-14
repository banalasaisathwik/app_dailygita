
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Video, ThemeColors } from "./types";
import { getVideoMetadata } from "../../utils/videoUtils";

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
  const [reportMenuVisible, setReportMenuVisible] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getVideoMetadata(video.videoUrl);
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
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

  const toggleReportMenu = (e: any) => {
    e.stopPropagation();
    setReportMenuVisible(!reportMenuVisible);
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
                ? require("../../assets/images/icon.png")
                : { uri: video.userAvatar }
            }
            style={styles.userAvatar}
            onError={() => setImageError(true)}
          />
          <View style={styles.userMeta}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {video.userName || "Anonymous"}
            </Text>
            <Text style={[styles.timestamp, { color: colors.gray[500] }]}>
              {video.timestamp || "Just now"}
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <FontAwesome
              name={isSaved ? "bookmark" : "bookmark-o"}
              size={18}
              color={isSaved ? colors.tint : colors.gray[500]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleReportMenu}
          >
            <FontAwesome name="ellipsis-v" size={18} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description and Tag Section */}
      <View style={styles.descriptionSection}>
        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={3}
        >
          {video.description}
        </Text>
        <View style={[styles.categoryPill, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
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
              <Image
                source={{
                  uri:
                    metadata?.thumbnail ||
                    "https://via.placeholder.com/240x135",
                }}
                style={styles.thumbnail}
              />
              <View style={styles.playButtonOverlay}>
                <View style={styles.playButton}>
                  <FontAwesome name="play" size={16} color="white" />
                </View>
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>
                  {metadata?.duration || "00:00"}
                </Text>
              </View>
            </View>

            <View style={styles.metadataContainer}>
              <Text
                style={[styles.videoTitle, { color: colors.text }]}
                numberOfLines={2}
              >
                {metadata?.title || video.description.substring(0, 50) + "..."}
              </Text>
              <Text style={[styles.speakerName, { color: colors.gray[600] }]}>
                {metadata?.speaker || video.userName}
              </Text>

              <View style={styles.viewsContainer}>
                <FontAwesome name="eye" size={12} color={colors.gray[500]} />
                <Text style={[styles.viewsText, { color: colors.gray[500] }]}>
                  {metadata?.views || "0 views"}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Report Menu (conditionally rendered) */}
      {reportMenuVisible && (
        <View
          style={[
            styles.reportMenu,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.reportMenuItem}
            onPress={() => setReportMenuVisible(false)}
          >
            <FontAwesome
              name="flag"
              size={14}
              color={colors.gray[700]}
              style={styles.reportMenuIcon}
            />
            <Text style={[styles.reportMenuText, { color: colors.gray[700] }]}>
              Report content
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reportMenuItem}
            onPress={() => setReportMenuVisible(false)}
          >
            <FontAwesome
              name="eye-slash"
              size={14}
              color={colors.gray[700]}
              style={styles.reportMenuIcon}
            />
            <Text style={[styles.reportMenuText, { color: colors.gray[700] }]}>
              Not interested
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reportMenuItem}
            onPress={() => setReportMenuVisible(false)}
          >
            <FontAwesome
              name="times"
              size={14}
              color={colors.gray[700]}
              style={styles.reportMenuIcon}
            />
            <Text style={[styles.reportMenuText, { color: colors.gray[700] }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoCard: {
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    position: "relative",
  },
  descriptionSection: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  previewContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
    overflow: "hidden",
    height: 90,
  },
  thumbnailContainer: {
    position: "relative",
    width: 160,
    height: "100%",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playButtonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  durationBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
  },
  metadataContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  speakerName: {
    fontSize: 12,
    marginBottom: 4,
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewsText: {
    fontSize: 11,
    marginLeft: 4,
  },
  actionButton: {
    padding: 6,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
  },
  userMeta: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  loadingContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  reportMenu: {
    position: "absolute",
    top: 40,
    right: 12,
    width: 180,
    borderRadius: 8,
    borderWidth: 1,
    padding: 4,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  reportMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  reportMenuIcon: {
    marginRight: 8,
    width: 16,
  },
  reportMenuText: {
    fontSize: 13,
  },
});

export default VideoCard;

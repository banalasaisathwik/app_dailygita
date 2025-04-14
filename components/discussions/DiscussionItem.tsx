// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Share,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { Discussion, ThemeColors } from "./types";

// interface DiscussionItemProps {
//   item: Discussion;
//   colors: ThemeColors;
//   onPress: () => void;
// }

// export const DiscussionItem: React.FC<DiscussionItemProps> = ({
//   item,
//   colors,
//   onPress,
// }) => {
//   const [liked, setLiked] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [commentCount, setCommentCount] = useState(item.comments);
//   const [voteCount, setVoteCount] = useState(item.likes);

//   const handleLike = () => {
//     setLiked(!liked);
//     setVoteCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
//   };

//   const handleComment = () => {
//     Alert.alert(
//       "Comments",
//       "Navigate to comments screen for post: " + item.title
//     );
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `${item.title}\n\n${item.content}\n\nShared from GrowWithin App`,
//       });
//     } catch (error) {
//       Alert.alert("Error", "Could not share the post");
//     }
//   };

//   const handleSave = () => {
//     setSaved(!saved);
//     Alert.alert(
//       saved ? "Post Unsaved" : "Post Saved",
//       saved ? "Post removed from saved items" : "Post added to saved items"
//     );
//   };

//   // Format large numbers like 1.2k
//   const formatNumber = (num: number): string => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "k";
//     }
//     return num.toString();
//   };

//   return (
//     <TouchableOpacity
//       style={[
//         styles.postCard,
//         { backgroundColor: colors.card, borderColor: colors.border },
//       ]}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       {/* Vote buttons */}
//       <View style={styles.voteColumn}>
//         <TouchableOpacity onPress={handleLike} style={styles.voteButton}>
//           <FontAwesome
//             name="arrow-up"
//             size={16}
//             color={liked ? colors.tint : colors.gray[400]}
//           />
//         </TouchableOpacity>
//         <Text
//           style={[
//             styles.voteCount,
//             {
//               color: liked ? colors.tint : colors.text,
//               fontSize: voteCount >= 1000 ? 11 : 12, // Smaller font for large numbers
//             },
//           ]}
//         >
//           {formatNumber(voteCount)}
//         </Text>
//         <TouchableOpacity style={styles.voteButton}>
//           <FontAwesome name="arrow-down" size={16} color={colors.gray[400]} />
//         </TouchableOpacity>
//       </View>

//       {/* Post content */}
//       <View style={styles.postContent}>
//         <View style={styles.postMeta}>
//           <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
//           <Text style={[styles.authorText, { color: colors.gray[600] }]}>
//             {item.author} • {item.time}
//           </Text>
//         </View>

//         <Text
//           style={[styles.postTitle, { color: colors.text }]}
//           numberOfLines={2}
//         >
//           {item.title}
//         </Text>
//         <Text
//           style={[styles.postPreview, { color: colors.gray[700] }]}
//           numberOfLines={2}
//         >
//           {item.content}
//         </Text>

//         {/* Tags */}
//         {item.tags.length > 0 && (
//           <View style={styles.tagsRow}>
//             {item.tags.map((tag, index) => (
//               <View
//                 key={index}
//                 style={[styles.tagPill, { backgroundColor: colors.subtle }]}
//               >
//                 <Text style={[styles.tagText, { color: colors.tint }]}>
//                   {tag}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Action buttons */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
//             <FontAwesome name="comment-o" size={14} color={colors.gray[500]} />
//             <Text style={[styles.actionText, { color: colors.gray[500] }]}>
//               {commentCount}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
//             <FontAwesome name="share" size={14} color={colors.gray[500]} />
//             <Text style={[styles.actionText, { color: colors.gray[500] }]}>
//               Share
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
//             <FontAwesome
//               name={saved ? "bookmark" : "bookmark-o"}
//               size={14}
//               color={saved ? colors.tint : colors.gray[500]}
//             />
//             <Text
//               style={[
//                 styles.actionText,
//                 { color: saved ? colors.tint : colors.gray[500] },
//               ]}
//             >
//               {saved ? "Saved" : "Save"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   postCard: {
//     flexDirection: "row",
//     marginBottom: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   voteColumn: {
//     alignItems: "center",
//     paddingRight: 5,
//     width: 40, // Increased width to accommodate larger numbers
//     justifyContent: "flex-start",
//   },
//   voteButton: {
//     paddingVertical: 4,
//     alignItems: "center",
//     width: "100%", // Make touch target larger
//   },
//   voteCount: {
//     fontSize: 12,
//     fontWeight: "500",
//     marginVertical: 4,
//     textAlign: "center",
//     width: "100%", // Ensure centered text
//   },
//   postContent: {
//     flex: 1,
//   },
//   postMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   avatarSmall: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     marginRight: 4,
//   },
//   authorText: {
//     fontSize: 11,
//   },
//   postTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     marginBottom: 4,
//     lineHeight: 20,
//   },
//   postPreview: {
//     fontSize: 13,
//     lineHeight: 18,
//     marginBottom: 6,
//   },
//   tagsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 6,
//   },
//   tagPill: {
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//     marginRight: 6,
//     marginBottom: 4,
//   },
//   tagText: {
//     fontSize: 10,
//     fontWeight: "500",
//   },
//   actionRow: {
//     flexDirection: "row",
//     marginTop: 2,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 16,
//     paddingVertical: 4,
//   },
//   actionText: {
//     marginLeft: 4,
//     fontSize: 12,
//   },
// });

// export default DiscussionItem;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Discussion, ThemeColors } from "./types";

interface DiscussionItemProps {
  item: Discussion;
  colors: ThemeColors;
  onPress: () => void;
}

export const DiscussionItem: React.FC<DiscussionItemProps> = ({
  item,
  colors,
  onPress,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentCount, setCommentCount] = useState(item.comments);
  const [voteCount, setVoteCount] = useState(item.likes);
  const [reportMenuVisible, setReportMenuVisible] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setVoteCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const handleComment = () => {
    Alert.alert(
      "Comments",
      "Navigate to comments screen for post: " + item.title
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.title}\n\n${item.content}\n\nShared from GrowWithin App`,
      });
    } catch (error) {
      Alert.alert("Error", "Could not share the post");
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    Alert.alert(
      saved ? "Post Unsaved" : "Post Saved",
      saved ? "Post removed from saved items" : "Post added to saved items"
    );
  };

  const handleToggleReportMenu = () => {
    setReportMenuVisible(!reportMenuVisible);
  };

  const handleReport = () => {
    Alert.alert(
      "Report Content",
      "Are you sure you want to report this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Report",
          onPress: () => {
            Alert.alert(
              "Reported",
              "Thank you for your feedback. We will review this content."
            );
            setReportMenuVisible(false);
          },
          style: "destructive",
        },
      ]
    );
  };

  // Format large numbers like 1.2k
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
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
      {/* Vote buttons */}
      <View style={styles.voteColumn}>
        <TouchableOpacity onPress={handleLike} style={styles.voteButton}>
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
              fontSize: voteCount >= 1000 ? 11 : 12, // Smaller font for large numbers
            },
          ]}
        >
          {formatNumber(voteCount)}
        </Text>
        <TouchableOpacity style={styles.voteButton}>
          <FontAwesome name="arrow-down" size={16} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      {/* Post content */}
      <View style={styles.postContent}>
        <View style={styles.postMeta}>
          <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
          <Text style={[styles.authorText, { color: colors.gray[600] }]}>
            {item.author} • {item.time}
          </Text>

          {/* Report button */}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleToggleReportMenu}
          >
            <FontAwesome name="ellipsis-v" size={12} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
            <FontAwesome name="comment-o" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              {commentCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <FontAwesome name="share" size={14} color={colors.gray[500]} />
            <Text style={[styles.actionText, { color: colors.gray[500] }]}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <FontAwesome
              name={saved ? "bookmark" : "bookmark-o"}
              size={14}
              color={saved ? colors.tint : colors.gray[500]}
            />
            <Text
              style={[
                styles.actionText,
                { color: saved ? colors.tint : colors.gray[500] },
              ]}
            >
              {saved ? "Saved" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report menu dropdown */}
      {reportMenuVisible && (
        <View
          style={[
            styles.reportMenu,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.reportMenuItem}
            onPress={handleReport}
          >
            <FontAwesome
              name="flag"
              size={14}
              color={colors.gray[700]}
              style={styles.reportMenuIcon}
            />
            <Text style={[styles.reportMenuText, { color: colors.gray[700] }]}>
              Report post
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
              Hide post
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
  postCard: {
    flexDirection: "row",
    marginBottom: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "relative",
  },
  voteColumn: {
    alignItems: "center",
    paddingRight: 10,
    width: 40, // Increased width to accommodate larger numbers
    justifyContent: "flex-start",
  },
  voteButton: {
    paddingVertical: 4,
    alignItems: "center",
    width: "100%", // Make touch target larger
  },
  voteCount: {
    fontSize: 12,
    fontWeight: "500",
    marginVertical: 4,
    textAlign: "center",
    width: "100%", // Ensure centered text
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
    flex: 1,
  },
  reportButton: {
    padding: 4,
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
  reportMenu: {
    position: "absolute",
    top: 30,
    right: 12,
    width: 150,
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

export default DiscussionItem;

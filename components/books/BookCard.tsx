// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { Book, ThemeColors } from "./types";

// const { width } = Dimensions.get("window");
// const CARD_PADDING = 12;
// const IMAGE_WIDTH = width * 0.3;

// interface BookCardProps {
//   book: Book;
//   colors: ThemeColors;
//   onPress: () => void;
//   onAddToList: () => void;
// }

// export const BookCard: React.FC<BookCardProps> = ({
//   book,
//   colors,
//   onPress,
//   onAddToList,
// }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.bookCard,
//         { backgroundColor: colors.card, borderColor: colors.border },
//       ]}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       {/* Add user info header */}
//       <View style={styles.userInfoContainer}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: book.userAvatar }} style={styles.userAvatar} />
//           <Text style={[styles.userName, { color: colors.text }]}>
//             {book.userName}
//           </Text>
//         </View>
//         <Text style={[styles.timestamp, { color: colors.gray[500] }]}>
//           {book.timestamp}
//         </Text>
//       </View>

//       <View style={styles.contentContainer}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: book.cover }}
//             style={styles.bookThumbnail}
//             resizeMode="cover"
//           />
//         </View>

//         <View style={styles.detailsContainer}>
//           <Text
//             style={[styles.bookTitle, { color: colors.text }]}
//             numberOfLines={2}
//           >
//             {book.title}
//           </Text>

//           <Text
//             style={[styles.bookAuthor, { color: colors.gray[600] }]}
//             numberOfLines={1}
//           >
//             by {book.author}
//           </Text>

//           <View style={styles.ratingRow}>
//             <View style={styles.stars}>
//               {[1, 2, 3, 4, 5].map((_, index) => (
//                 <FontAwesome
//                   key={index}
//                   name="star"
//                   size={12}
//                   color={
//                     index < Math.floor(book.rating)
//                       ? "#FFD700"
//                       : colors.gray[300]
//                   }
//                   style={{ marginRight: 2 }}
//                 />
//               ))}
//               <Text style={[styles.ratingText, { color: colors.gray[600] }]}>
//                 ({book.rating.toFixed(1)})
//               </Text>
//             </View>
//           </View>

//           <View
//             style={[styles.categoryTag, { backgroundColor: colors.subtle }]}
//           >
//             <Text style={[styles.categoryText, { color: colors.tint }]}>
//               {book.category}
//             </Text>
//           </View>

//           <Text
//             style={[styles.bookPreview, { color: colors.gray[700] }]}
//             numberOfLines={2}
//           >
//             {book.description}
//           </Text>

//           <TouchableOpacity
//             style={[styles.addToListButton, { backgroundColor: colors.tint }]}
//             onPress={onAddToList}
//           >
//             <FontAwesome
//               name="plus"
//               size={12}
//               color="white"
//               style={styles.buttonIcon}
//             />
//             <Text style={styles.addToListText}>Add to Reading List</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   bookCard: {
//     marginHorizontal: 2,
//     marginVertical: 6,
//     borderRadius: 8,
//     borderWidth: 1,
//     overflow: "hidden",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   contentContainer: {
//     flexDirection: "row",
//     padding: CARD_PADDING,
//   },
//   imageContainer: {
//     width: IMAGE_WIDTH,
//     height: IMAGE_WIDTH * 1.5,
//     marginRight: CARD_PADDING,
//     borderRadius: 4,
//     overflow: "hidden",
//     backgroundColor: "#f0f0f0",
//   },
//   bookThumbnail: {
//     width: "100%",
//     height: "100%",
//   },
//   detailsContainer: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   bookTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   bookAuthor: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   ratingRow: {
//     marginBottom: 8,
//   },
//   stars: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingText: {
//     fontSize: 12,
//     marginLeft: 4,
//   },
//   categoryTag: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   categoryText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   bookPreview: {
//     fontSize: 12,
//     lineHeight: 16,
//     marginBottom: 12,
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   addToListButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 4,
//     marginTop: 8,
//   },
//   buttonIcon: {
//     marginRight: 6,
//   },
//   addToListText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   userInfoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: CARD_PADDING,
//     paddingBottom: 0,
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userAvatar: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     marginRight: 8,
//   },
//   userName: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   timestamp: {
//     fontSize: 12,
//   },
// });

// export default BookCard;

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Book, ThemeColors } from './types';

const { width } = Dimensions.get('window');
const CARD_PADDING = 8; // Reduced padding
const IMAGE_WIDTH = width * 0.22; // Reduced image width

interface BookCardProps {
  book: Book;
  colors: ThemeColors;
  onPress: () => void;
  onAddToList: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  colors,
  onPress,
  onAddToList,
}) => {
  return (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: book.cover }} 
            style={styles.bookThumbnail}
            resizeMode="cover"
          />
        </View>

        <View style={styles.detailsContainer}>
          {/* User info in compact form */}
          <View style={styles.userInfoContainer}>
            <Image 
              source={{ uri: book.userAvatar }} 
              style={styles.userAvatar}
            />
            <View style={styles.userTextContainer}>
              <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
                {book.userName}
              </Text>
              <Text style={[styles.timestamp, { color: colors.gray[500] }]}>
                {book.timestamp}
              </Text>
            </View>
          </View>

          <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={2}>
            {book.title}
          </Text>
          
          <Text style={[styles.bookAuthor, { color: colors.gray[600] }]} numberOfLines={1}>
            by {book.author}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={10} // Smaller icons
                  color={index < Math.floor(book.rating) ? '#FFD700' : colors.gray[300]}
                  style={{ marginRight: 1 }}
                />
              ))}
              <Text style={[styles.ratingText, { color: colors.gray[600] }]}>
                ({book.rating.toFixed(1)})
              </Text>
            </View>

            <View style={[styles.categoryTag, { backgroundColor: colors.subtle }]}>
              <Text style={[styles.categoryText, { color: colors.tint }]}>
                {book.category}
              </Text>
            </View>
          </View>

          {/* Footer with action buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.addToListButton, { backgroundColor: colors.tint }]}
              onPress={onAddToList}
            >
              <FontAwesome name="plus" size={10} color="white" style={styles.buttonIcon} />
              <Text style={styles.addToListText}>Add to Reading List</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.moreButton}>
              <FontAwesome name="ellipsis-h" size={12} color={colors.gray[500]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    marginHorizontal: 6,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5, // Thinner border
    overflow: 'hidden',
    elevation: 1, // Reduced elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: CARD_PADDING,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 1.5,
    marginRight: CARD_PADDING,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  bookThumbnail: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatar: {
    width: 18, // Smaller avatar
    height: 18,
    borderRadius: 9,
    marginRight: 4,
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 11,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 9,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
    lineHeight: 16,
  },
  bookAuthor: {
    fontSize: 11,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 9,
    marginLeft: 3,
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  addToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 3,
  },
  addToListText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  }
});

export default BookCard;
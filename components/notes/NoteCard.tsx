import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Note, ThemeColors } from './types';

interface NoteCardProps {
  note: Note;
  colors: ThemeColors;
  onPress: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  colors,
  onPress,
  toggleFavorite,
}) => {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'video': return 'play-circle';
      case 'book': return 'book';
      default: return 'sticky-note';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => onPress(note.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome 
            name={getSourceIcon(note.source.type)} 
            size={16} 
            color={colors.tint}
            style={styles.sourceIcon}
          />
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {note.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(note.id)}>
          <FontAwesome
            name={note.isFavorite ? 'star' : 'star-o'}
            size={20}
            color={note.isFavorite ? colors.warning : colors.gray[400]}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.content, { color: colors.gray[600] }]} numberOfLines={3}>
        {note.content}
      </Text>

      {note.source.title && (
        <View style={styles.sourceInfo}>
          <Text style={[styles.sourceText, { color: colors.gray[500] }]} numberOfLines={1}>
            From: {note.source.title}
          </Text>
        </View>
      )}

      <Text style={[styles.timestamp, { color: colors.gray[400] }]}>
        {new Date(note.timestamp).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  sourceIcon: {
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  sourceInfo: {
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 12,
  },
  timestamp: {
    fontSize: 11,
  },
});

export default NoteCard;
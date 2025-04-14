import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Event, ThemeColors } from './types';
import { formatDate } from '../../utils/dateUtils';

interface EventCardProps {
  event: Event;
  colors: ThemeColors;
  toggleSave: (id: string) => void;
  onPress: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  colors,
  toggleSave,
  onPress,
}) => {
  const [isSaved, setIsSaved] = useState(event.isSaved);

  const handleSave = (e: any) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toggleSave(event.id);
  };

  return (
    <TouchableOpacity 
      style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPress(event.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: event.image }} 
          style={styles.eventImage}
        />
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
        >
          <FontAwesome
            name={isSaved ? 'bookmark' : 'bookmark-o'}
            size={20}
            color={isSaved ? colors.tint : 'white'}
          />
        </TouchableOpacity>
        {event.isVirtual && (
          <View style={[styles.virtualBadge, { backgroundColor: colors.info }]}>
            <Text style={styles.virtualText}>Virtual</Text>
          </View>
        )}
      </View>

      <View style={styles.eventDetails}>
        <View style={styles.dateTimeLocation}>
          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              {formatDate(event.date)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              {event.time}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.text }]} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {event.title}
        </Text>
        
        <Text style={[styles.organizer, { color: colors.gray[600] }]}>
          by {event.organizer}
        </Text>

        <View style={styles.footer}>
          <View style={styles.attendeeInfo}>
            <FontAwesome name="users" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.attendeeText, { color: colors.gray[600] }]}>
              {event.attendees} attending
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.interestedButton, { backgroundColor: colors.tint }]}
            onPress={() => onPress(event.id)}
          >
            <Text style={styles.interestedText}>Interested</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  virtualBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  virtualText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  eventDetails: {
    padding: 12,
  },
  dateTimeLocation: {
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 6,
    width: 16,
  },
  infoText: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  organizer: {
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  attendeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  interestedButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  interestedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default EventCard;
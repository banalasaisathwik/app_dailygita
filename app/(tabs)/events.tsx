import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventsList from '../../components/events/EventsList';
import { EVENTS, CATEGORIES } from '../../constants/eventData';
import { Event } from '../../components/events/types';
import EventForm from '../../components/events/EventForm';

const EventsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  
  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory
  );

  const toggleSave = (id: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, isSaved: !event.isSaved } : event
      )
    );
  };

  const handleEventPress = (id: string) => {
    console.log(`Event ${id} pressed`);
    // TODO: Navigate to event details
  };

  const handleSubmitEvent = (eventData: any) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      image: 'https://picsum.photos/seed/' + Date.now() + '/400/200',
      organizer: 'You',
      isVirtual: false,
      isSaved: false,
      attendees: 0
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EventsList
        events={filteredEvents}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onEventPress={handleEventPress}
        toggleSave={toggleSave}
      />
      
      <TouchableOpacity 
        style={[
          styles.fab, 
          { 
            backgroundColor: colors.tint,
            bottom: insets.bottom + 80 // Position above tab bar
          }
        ]}
        onPress={() => setIsEventFormVisible(true)}
      >
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>

      <EventForm
        visible={isEventFormVisible}
        onClose={() => setIsEventFormVisible(false)}
        onSubmit={handleSubmitEvent}
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
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
});

export default EventsTab;
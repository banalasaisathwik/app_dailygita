

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar, 
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventsList from '../../components/events/EventsList';
import { EVENTS, CATEGORIES } from '../../constants/eventData';
import { Event } from '../../components/events/types';
import EventForm from '../../components/events/EventForm';

const HEADER_HEIGHT = 80;

const EventsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const insets = useSafeAreaInsets();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const scrollY = new Animated.Value(0);
  
  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

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
    setIsEventFormVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header, 
          { 
           
            paddingTop: insets.top,
            transform: [{ translateY: headerTranslate }],
            borderBottomColor: colors.border
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Spiritual Events</Text>
          <Text style={[styles.headerSubtitle, { color: colors.gray[600] }]}>
            Connect with your community
          </Text>
        </View>
      </Animated.View>

      <EventsList
        events={filteredEvents}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={setSelectedCategory}
        onEventPress={handleEventPress}
        toggleSave={toggleSave}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1000,
    borderBottomWidth: 1,

  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
   
  },
  headerSubtitle: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
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
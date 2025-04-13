// app/screens/EventsTab.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Get device width for responsive design
const { width } = Dimensions.get('window');

// Sample data for events
const EVENTS = [
  {
    id: '1',
    title: 'Meditation Retreat: Journey to Inner Peace',
    organizer: 'Spiritual Growth Center',
    location: 'Rishikesh, India',
    date: '2023-12-15',
    time: '08:00 AM - 05:00 PM',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A three-day retreat focused on deep meditation techniques and mindfulness practices in the spiritual heart of India.',
    category: 'Retreat',
    isFeatured: true,
    isVirtual: false,
    isSaved: true,
    attendees: 42
  },
  {
    id: '2',
    title: 'Bhagavad Gita Study Circle',
    organizer: 'Vedic Wisdom Foundation',
    location: 'Virtual (Zoom)',
    date: '2023-11-20',
    time: '07:00 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1532104338806-7029c3765a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Weekly study group exploring the profound teachings of the Bhagavad Gita with scholar Ravi Krishnan.',
    category: 'Study',
    isFeatured: false,
    isVirtual: true,
    isSaved: false,
    attendees: 78
  },
  {
    id: '3',
    title: 'Yoga & Sound Healing Workshop',
    organizer: 'Harmonious Soul Collective',
    location: 'Central Park Yoga Studio, New York',
    date: '2023-11-28',
    time: '10:00 AM - 01:00 PM',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Combine the power of yoga asanas with sound healing through Tibetan singing bowls and crystal bowls for deep relaxation and chakra alignment.',
    category: 'Workshop',
    isFeatured: true,
    isVirtual: false,
    isSaved: true,
    attendees: 25
  },
  {
    id: '4',
    title: 'Spiritual Q&A with Swami Atmananada',
    organizer: 'Global Dharma Initiative',
    location: 'Virtual (YouTube Live)',
    date: '2023-12-05',
    time: '06:30 PM - 08:00 PM',
    image: 'https://images.unsplash.com/photo-1519834255828-9e0c13742053?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'An interactive session with the renowned spiritual teacher Swami Atmananada, addressing questions about spiritual growth, meditation, and life challenges.',
    category: 'Webinar',
    isFeatured: false,
    isVirtual: true,
    isSaved: false,
    attendees: 156
  },
  {
    id: '5',
    title: 'Sacred Kirtan & Bhajan Night',
    organizer: 'Bhakti Yoga Community',
    location: 'Krishna Temple, Los Angeles',
    date: '2023-11-25',
    time: '07:00 PM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'An evening of devotional music, chanting, and singing to nurture the heart and soul. Open to all regardless of background or experience.',
    category: 'Gathering',
    isFeatured: true,
    isVirtual: false,
    isSaved: false,
    attendees: 64
  },
];

// Categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🗓️' },
  { id: 'retreat', name: 'Retreats', icon: '🏞️' },
  { id: 'workshop', name: 'Workshops', icon: '🧠' },
  { id: 'study', name: 'Study', icon: '📚' },
  { id: 'webinar', name: 'Webinars', icon: '💻' },
  { id: 'gathering', name: 'Gatherings', icon: '🧘‍♀️' },
];

// Filter options
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'saved', label: 'Saved' },
  { id: 'virtual', label: 'Virtual' },
  { id: 'inperson', label: 'In-Person' },
  { id: 'upcoming', label: 'Upcoming' },
];

// Format date to be more readable
const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Check if an event is upcoming
const isUpcoming = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  return eventDate >= today;
};

const EventCard = ({ event, toggleSave, colors, onPress }) => {
  const [isSaved, setIsSaved] = useState(event.isSaved);
  
  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toggleSave(event.id);
  };
  
  const formattedDate = formatDate(event.date);
  
  return (
    <TouchableOpacity 
      style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPress(event.id)}
      activeOpacity={0.7}
    >
      {/* Event image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        
        {event.isVirtual && (
          <View style={[styles.virtualBadge, { backgroundColor: colors.info }]}>
            <Text style={styles.virtualText}>Virtual</Text>
          </View>
        )}
        
        {event.isFeatured && (
          <View style={[styles.featuredBadge, { backgroundColor: colors.warning }]}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      {/* Event details */}
      <View style={styles.eventDetails}>
        <View style={styles.titleRow}>
          <Text style={[styles.eventTitle, { color: colors.text }]} numberOfLines={2}>
            {event.title}
          </Text>
          
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <FontAwesome 
              name={isSaved ? 'bookmark' : 'bookmark-o'} 
              size={18} 
              color={isSaved ? colors.tint : colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.categoryBadge, { backgroundColor: colors.subtle }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {event.category}
          </Text>
        </View>
        
        <View style={styles.infoRows}>
          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.gray[600] }]}>
              {formattedDate}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.gray[600] }]}>
              {event.time}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: colors.gray[600] }]} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.attendeeInfo}>
            <FontAwesome name="users" size={12} color={colors.gray[500]} style={styles.infoIcon} />
            <Text style={[styles.attendeeText, { color: colors.gray[600] }]}>
              {event.attendees} attending
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.registerButton, { backgroundColor: colors.tint }]}
            onPress={() => onPress(event.id)}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EventsTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState(EVENTS);
  
  // Filter events based on selected filter and category
  const filteredEvents = events.filter(event => {
    // Apply category filter
    const categoryMatch = selectedCategory === 'all' || 
      event.category.toLowerCase() === selectedCategory;
    
    // Apply other filters
    let filterMatch = true;
    if (selectedFilter === 'featured') filterMatch = event.isFeatured;
    if (selectedFilter === 'saved') filterMatch = event.isSaved;
    if (selectedFilter === 'virtual') filterMatch = event.isVirtual;
    if (selectedFilter === 'inperson') filterMatch = !event.isVirtual;
    if (selectedFilter === 'upcoming') filterMatch = isUpcoming(event.date);
    
    return categoryMatch && filterMatch;
  });
  
  const toggleSave = (id) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, isSaved: !event.isSaved } : event
      )
    );
  };
  
  const handleEventPress = (id) => {
    console.log(`Event ${id} pressed`);
    // Navigate to event details
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Filters */}
      <View style={[styles.filtersWrapper, { borderBottomColor: colors.border }]}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity 
              key={filter.id}
              style={[
                styles.filterButton,
                { 
                  backgroundColor: selectedFilter === filter.id 
                    ? colors.tint 
                    : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text 
                style={[
                  styles.filterButtonText, 
                  { 
                    color: selectedFilter === filter.id 
                      ? 'white' 
                      : colors.text 
                  }
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: selectedCategory === category.id 
                    ? colors.tint 
                    : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              )}
              <Text 
                style={[
                  styles.categoryButtonText, 
                  { 
                    color: selectedCategory === category.id 
                      ? 'white' 
                      : colors.text 
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Events list */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            toggleSave={toggleSave} 
            colors={colors} 
            onPress={handleEventPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Create Event Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {/* Handle create event */}}
      >
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersWrapper: {
    borderBottomWidth: 1,
  },
  filtersContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesWrapper: {
    paddingVertical: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 80, // Space for FAB
  },
  eventCard: {
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  virtualBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  virtualText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventDetails: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8,
  },
  saveButton: {
    padding: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
  },
  infoRows: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    width: 16,
    textAlign: 'center',
    marginRight: 8,
  },
  infoText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  attendeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeText: {
    fontSize: 12,
    marginLeft: 8,
  },
  registerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  registerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
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
  }
});

export default EventsTab;
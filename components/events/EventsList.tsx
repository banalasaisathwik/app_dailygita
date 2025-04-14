import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Event, Category, ThemeColors } from './types';
import EventCard from './EventCard';
import CategoryList from './CategoryList';

interface EventsListProps {
  events: Event[];
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
  onEventPress: (id: string) => void;
  toggleSave: (id: string) => void;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
  onEventPress,
  toggleSave,
}) => {
  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={onSelectCategory}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            colors={colors}
            toggleSave={toggleSave}
            onPress={onEventPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Replace with your desired background color
    padding: 16, // Adjust padding as needed
  },
  listContainer: {
    paddingBottom: 16, // Adjust padding as needed
  },
});

export default EventsList;
// import React from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import { Event, Category, ThemeColors } from './types';
// import EventCard from './EventCard';
// import CategoryList from './CategoryList';

// interface EventsListProps {
//   events: Event[];
//   categories: Category[];
//   selectedCategory: string;
//   colors: ThemeColors;
//   onSelectCategory: (category: string) => void;
//   onEventPress: (id: string) => void;
//   toggleSave: (id: string) => void;
// }

// export const EventsList: React.FC<EventsListProps> = ({
//   events,
//   categories,
//   selectedCategory,
//   colors,
//   onSelectCategory,
//   onEventPress,
//   toggleSave,
// }) => {
//   return (
//     <View style={styles.container}>
//       <CategoryList
//         categories={categories}
//         selectedCategory={selectedCategory}
//         colors={colors}
//         onSelectCategory={onSelectCategory}
//       />
//       <FlatList
//         data={events}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <EventCard
//             event={item}
//             colors={colors}
//             toggleSave={toggleSave}
//             onPress={onEventPress}
//           />
//         )}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // Replace with your desired background color
//     padding: 16, // Adjust padding as needed
//   },
//   listContainer: {
//     paddingBottom: 16, // Adjust padding as needed
//   },
// });

// export default EventsList;

import React from 'react';
import { 
  View, 
  Animated, 
  StyleSheet, 
  FlatList, 
  Text,
  RefreshControl
} from 'react-native';
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
  onScroll?: (event: any) => void;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
  onEventPress,
  toggleSave,
  onScroll
}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        colors={colors}
        onSelectCategory={onSelectCategory}
      />
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.emptyText, { color: colors.gray[600] }]}>
        No events found for this category.
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.gray[500] }]}>
        Try selecting a different category or create a new event.
      </Text>
    </View>
  );

  return (
    <Animated.FlatList
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
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={[
        styles.listContainer,
        events.length === 0 && styles.emptyList
      ]}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.tint]}
          tintColor={colors.tint}
          progressBackgroundColor={colors.card}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 80, // Space for header
    paddingBottom: 80, // Space for FAB + tab bar
    minHeight: '100%'
  },
  listHeader: {
    paddingTop: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  }
});

export default EventsList;
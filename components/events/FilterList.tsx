import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Filter, ThemeColors } from './types';

interface FilterListProps {
  filters: Filter[];
  selectedFilter: string;
  colors: ThemeColors;
  onSelectFilter: (filterId: string) => void;
}

export const FilterList: React.FC<FilterListProps> = ({
  filters,
  selectedFilter,
  colors,
  onSelectFilter,
}) => {
  return (
    <View style={[styles.filtersWrapper, { borderBottomColor: colors.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedFilter === filter.id ? colors.tint : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onSelectFilter(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterButtonText,
                { color: selectedFilter === filter.id ? 'white' : colors.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersWrapper: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  filtersContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FilterList;
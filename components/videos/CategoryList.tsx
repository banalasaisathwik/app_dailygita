import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Category, ThemeColors } from './types';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (category: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
}) => {
  return (
    <View style={[styles.categoriesWrapper, { borderBottomColor: colors.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === category.id ? colors.tint : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            {category.icon && <Text style={styles.categoryIcon}>{category.icon}</Text>}
            <Text
              style={[
                styles.categoryButtonText,
                { color: selectedCategory === category.id ? 'white' : colors.text },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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
});

export default CategoryList;
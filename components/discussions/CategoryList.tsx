import React, { useRef, useEffect, useState } from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { Category, ThemeColors } from './types';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Custom animation config for smooth transitions
const animationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  colors: ThemeColors;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  colors,
  onSelectCategory,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [categoryWidths, setCategoryWidths] = useState<{ [key: string]: number }>({});

  const handleLayout = (categoryId: string, event: any) => {
    const { width } = event.nativeEvent.layout;
    setCategoryWidths(prev => ({
      ...prev,
      [categoryId]: width,
    }));
  };

  const scrollToCategory = (categoryId: string) => {
    let scrollPosition = 0;
    let found = false;

    // Calculate scroll position based on cumulative widths
    categories.some(category => {
      if (category.id === categoryId) {
        found = true;
        return true;
      }
      if (!found) {
        scrollPosition += (categoryWidths[category.id] || 0) + 8; // 8 is marginRight
      }
      return false;
    });

    // Center the category in the scroll view
    if (scrollViewWidth > 0) {
      const categoryWidth = categoryWidths[categoryId] || 0;
      const centerPosition = Math.max(
        0,
        scrollPosition - (scrollViewWidth - categoryWidth) / 2
      );
      
      // Use timing for smoother scrolling
      scrollViewRef.current?.scrollTo({
        x: centerPosition,
        animated: true,
      });
    }
  };

  const handlePress = (categoryId: string) => {
    // Configure animation before state changes
    LayoutAnimation.configureNext(animationConfig);
    onSelectCategory(categoryId);
    
    // Add a small delay before scrolling for smoother animation
    setTimeout(() => {
      scrollToCategory(categoryId);
    }, 50);
  };

  // Handle scroll view width measurement
  const handleScrollViewLayout = (event: any) => {
    setScrollViewWidth(event.nativeEvent.layout.width);
  };

  // Add animation to initial scroll
  useEffect(() => {
    LayoutAnimation.configureNext(animationConfig);
    const timeoutId = setTimeout(() => {
      if (Object.keys(categoryWidths).length === categories.length) {
        scrollToCategory(selectedCategory);
      }
    }, 150); // Increased timeout for smoother initial animation

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, categoryWidths, scrollViewWidth]);

  return (
    <View style={styles.categoriesWrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        onLayout={handleScrollViewLayout}
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
            onLayout={(event) => handleLayout(category.id, event)}
            onPress={() => handlePress(category.id)}
          >
            {category.icon && <Text style={styles.categoryIcon}>{category.icon}</Text>}
            <Text
              style={[
                styles.categoryText,
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
    borderBottomColor: '#e0e0e0',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    // Add these properties for smoother transitions
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  categoryIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CategoryList;
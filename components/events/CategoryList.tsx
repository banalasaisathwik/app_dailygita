import React, { useRef, useEffect, useState } from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  LayoutAnimation, 
  Platform, 
  UIManager,
  NativeSyntheticEvent,
  LayoutChangeEvent 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Category, ThemeColors } from './types';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Animation configuration
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
  const [categoryWidths, setCategoryWidths] = useState<Record<string, number>>({});

  const handleLayout = (categoryId: string, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCategoryWidths(prev => ({
      ...prev,
      [categoryId]: width,
    }));
  };

  const scrollToCategory = (categoryId: string) => {
    let scrollPosition = 0;
    let found = false;

    categories.some(category => {
      if (category.id === categoryId) {
        found = true;
        return true;
      }
      if (!found) {
        scrollPosition += (categoryWidths[category.id] || 0) + 8;
      }
      return false;
    });

    if (scrollViewWidth > 0) {
      const categoryWidth = categoryWidths[categoryId] || 0;
      const centerPosition = Math.max(
        0,
        scrollPosition - (scrollViewWidth - categoryWidth) / 2
      );
      
      scrollViewRef.current?.scrollTo({
        x: centerPosition,
        animated: true,
      });
    }
  };

  const handlePress = (categoryId: string) => {
    LayoutAnimation.configureNext(animationConfig);
    onSelectCategory(categoryId);
    
    requestAnimationFrame(() => {
      scrollToCategory(categoryId);
    });
  };

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    setScrollViewWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (Object.keys(categoryWidths).length === categories.length) {
      LayoutAnimation.configureNext(animationConfig);
      requestAnimationFrame(() => {
        scrollToCategory(selectedCategory);
      });
    }
  }, [selectedCategory, categoryWidths, scrollViewWidth]);

  return (
    <View style={[styles.categoriesWrapper, { borderBottomColor: colors.border }]}>
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
            {category.icon && (
              <FontAwesome
                name={category.icon as keyof typeof FontAwesome.glyphMap}
                size={14}
                color={selectedCategory === category.id ? 'white' : colors.text}
                style={styles.categoryIcon}
              />
            )}
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
   
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CategoryList;
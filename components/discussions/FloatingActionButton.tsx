import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeColors } from './types';

interface FABProps {
  colors: ThemeColors;
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({ colors, onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.fab, 
        { 
          backgroundColor: colors.tint,
          bottom: insets.bottom + 70 // Adjust this value based on your tab bar height
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <FontAwesome name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
});

export default FloatingActionButton;
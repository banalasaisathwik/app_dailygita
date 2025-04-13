
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from '@/components/Themed';
import { useTheme } from '../../context/ThemeContext';

// Import your tab screens
import DiscussionsTab from '../screens/DiscussionsTab';
import BooksTab from '../screens/BooksTab';
import VideosTab from '../screens/VideosTab';
import MeditationsTab from '../screens/MeditationsTab';
import PracticesTab from '../screens/PracticesTab';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;

export default function TabOneScreen() {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Spiritual Growth</Text>
        <Text style={[styles.subtitle, { color: colors.gray[600] }]}>
          Discover resources for your journey
        </Text>
      </View>

      <Tab.Navigator
        initialRouteName="Discussions"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          tabBarItemStyle: {
            width: windowWidth / 2.5, // Make tabs narrower so they require scrolling
            paddingHorizontal: 10,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.tint,
            height: 3,
            borderRadius: 3,
          },
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.gray[500],
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
            textTransform: 'none',
          },
        }}
      >
        <Tab.Screen 
          name="Discussions" 
          component={DiscussionsTab}
          options={{ tabBarLabel: 'Discussions' }}
        />
        <Tab.Screen 
          name="Books" 
          component={BooksTab}
          options={{ tabBarLabel: 'Book Suggestions' }}
        />
        <Tab.Screen 
          name="Videos" 
          component={VideosTab}
          options={{ tabBarLabel: 'Video Teachings' }}
        />
        <Tab.Screen 
          name="Meditations" 
          component={MeditationsTab}
          options={{ tabBarLabel: 'Meditations' }}
        />
        <Tab.Screen 
          name="Practices" 
          component={PracticesTab}
          options={{ tabBarLabel: 'Daily Practices' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
});
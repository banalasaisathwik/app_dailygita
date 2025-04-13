// import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Link, Tabs } from 'expo-router';
// import { Pressable } from 'react-native';

// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';
// import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: useClientOnlyValue(false, true),
//         tabBarStyle: {
//           paddingBottom: 5,
//           paddingTop: 5,
//           height: 60,
//         },
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Discussions',
//           tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="events"
//         options={{
//           title: 'Events',
//           tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="analyse"
//         options={{
//           title: 'Self Analysis',
//           tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="notes"
//         options={{
//           title: 'Notes',
//           tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  const { name, color, focused } = props;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      Animated.spring(scaleValue, {
        toValue: 1.2,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [focused, scaleValue]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        alignItems: 'center',
      }}
    >
      <FontAwesome
        size={24}
        style={{ marginBottom: 0 }}
        name={name}
        color={color}
      />
      {/* Indicator dot removed */}
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  
  // Custom theme colors for spiritual app
  const customTheme = {
    light: {
      primary: '#8e44ad', // Purple
      background: '#ffffff',
      card: '#f9f9f9',
      text: '#333333',
      border: '#e0e0e0',
      accent: '#9b59b6',
      subtle: '#f0e6f6',
    },
    dark: {
      primary: '#9b59b6', // Lighter purple for dark mode
      background: '#121212',
      card: '#1e1e1e',
      text: '#f0f0f0',
      border: '#333333',
      accent: '#d6b0e4',
      subtle: '#2d1d36',
    },
  };
  
  const theme = customTheme[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666666" : "#999999",
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: theme.primary,
          fontSize: 18,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          height: 70 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom,
          elevation: 0,
          shadowOpacity: 0,
          position: "absolute",
          borderTopWidth: 0,
          ...(Platform.OS === "ios" && {
            borderTopWidth: 0,
            shadowColor: "transparent",
          }),
        },
        tabBarItemStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: -5,
        },
        contentStyle: {
          backgroundColor: theme.background,
          paddingBottom: 70,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Community",
          headerShown: false,

          headerTitle: "Spiritual Community",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="comments" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: "Events",
          headerTitle: "Spiritual Events",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="calendar" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyse"
        options={{
          title: "Self Analysis",
          headerShown: false,

          headerTitle: "Mindfulness Tracker",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="line-chart" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                marginRight: 15,
              })}
            >
              <FontAwesome name="plus" size={22} color={theme.primary} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          headerShown: false,

          headerTitle: "Spiritual Journal",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="book" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                marginRight: 15,
              })}
            >
              <FontAwesome name="pencil" size={22} color={theme.primary} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,

          headerTitle: "My Spiritual Journey",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user-circle" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                marginRight: 15,
              })}
            >
              <FontAwesome name="cog" size={22} color={theme.primary} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
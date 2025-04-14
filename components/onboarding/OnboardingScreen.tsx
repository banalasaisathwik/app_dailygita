import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// Onboarding slides data
const slides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Find Inner Peace',
    subtitle: 'Begin your spiritual journey with guided meditation and mindfulness practices'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Connect with Community',
    subtitle: 'Join like-minded souls on the path to enlightenment and growth'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Grow Your Knowledge',
    subtitle: 'Discover wisdom through curated spiritual content and shared experiences'
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const colors = theme.colors;

  // Handle when a slide changes
  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Config for viewability
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  // Handle next button press
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    }
  };

  // Handle skip button press
  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true
    });
  };

  // Handle get started button press
  const handleGetStarted = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      // Navigate anyway
      router.replace('/(tabs)');
    }
  };

  // Handle sign in with Google
  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In pressed');
    // After successful sign in
    router.replace('/(tabs)');
  };

  // Render dots indicator
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          const width = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { opacity, width, backgroundColor: colors.tint }
              ]}
            />
          );
        })}
      </View>
    );
  };

  // Render one slide
  const renderSlide = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: colors.gray[600] }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  // Render footer with buttons
  const renderFooter = () => {
    if (currentIndex === slides.length - 1) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: colors.tint }]}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.googleButton, { borderColor: colors.border }]}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.googleIconContainer}>
              <FontAwesome name="google" size={18} color="#DB4437" />
            </View>
            <Text style={[styles.googleButtonText, { color: colors.text }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>
          
          <View style={styles.termsContainer}>
            <Text style={[styles.termsText, { color: colors.gray[500] }]}>
              By continuing, you agree to our 
            </Text>
            <TouchableOpacity>
              <Text style={[styles.termsLink, { color: colors.tint }]}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text style={[styles.termsText, { color: colors.gray[500] }]}> and </Text>
            <TouchableOpacity>
              <Text style={[styles.termsLink, { color: colors.tint }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipButtonText, { color: colors.gray[600] }]}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.tint }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <FontAwesome name="arrow-right" size={16} color="white" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.logoContainer}>
        <FontAwesome name="om" size={36} color={colors.tint} />
        <Text style={[styles.logoText, { color: colors.text }]}>SoulPath</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {renderDots()}
      {renderFooter()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    paddingVertical: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  slideContainer: {
    width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 40,
    height: height * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
  },
  nextButton: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 5,
  },
  skipButtonText: {
    fontSize: 16,
  },
  getStartedButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  googleIconContainer: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
  },
  termsLink: {
    fontSize: 12,
    fontWeight: '500',
  },
});
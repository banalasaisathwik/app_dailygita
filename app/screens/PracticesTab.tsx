// app/screens/PracticesTab.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  Image,
  ProgressBarAndroid,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Import ProgressViewIOS for iOS
let ProgressViewIOS;
if (Platform.OS === 'ios') {
  ProgressViewIOS = require('@react-native-community/progress-view').default;
}

// Sample data for daily practices
const PRACTICES = [
  {
    id: '1',
    title: 'Morning Gratitude',
    description: 'Begin your day by reflecting on three things you are grateful for. This practice sets a positive tone for the day ahead.',
    duration: '5 min',
    category: 'Mindfulness',
    icon: '🙏',
    streak: 7, // days in a row
    progress: 0.7, // 70% complete for today
    isCompleted: false,
    steps: [
      'Find a quiet place to sit',
      'Close your eyes and take three deep breaths',
      'Think of three things you are grateful for',
      'Express your gratitude silently or aloud',
      'Set an intention for the day'
    ]
  },
  {
    id: '2',
    title: 'Surya Namaskar (Sun Salutation)',
    description: 'A sequence of 12 powerful yoga poses that form a flowing movement to build strength and increase flexibility.',
    duration: '15 min',
    category: 'Yoga',
    icon: '☀️',
    streak: 3,
    progress: 0.5,
    isCompleted: false,
    steps: [
      'Begin in Mountain Pose (Tadasana)',
      'Move through all 12 positions slowly',
      'Coordinate each movement with your breath',
      'Complete at least 3 full cycles',
      'End with a moment of stillness'
    ]
  },
  {
    id: '3',
    title: 'Sacred Text Reading',
    description: 'Read a small passage from a spiritual text of your choice. Contemplate its meaning and how it applies to your life.',
    duration: '10 min',
    category: 'Study',
    icon: '📖',
    streak: 12,
    progress: 1.0, // 100% complete
    isCompleted: true,
    steps: [
      'Choose a short passage from a sacred text',
      'Read it slowly and mindfully',
      'Reflect on its meaning in your life',
      'Write down any insights that arise',
      'Carry one teaching with you through the day'
    ]
  },
  {
    id: '4',
    title: 'Evening Reflection',
    description: 'Before sleep, reflect on your day with acceptance and without judgment. Note what went well and what you learned.',
    duration: '5 min',
    category: 'Mindfulness',
    icon: '🌙',
    streak: 0,
    progress: 0.0,
    isCompleted: false,
    steps: [
      'Find a comfortable position',
      'Review the events of your day',
      'Acknowledge accomplishments and challenges',
      'Release any lingering tensions',
      'Set your intention for tomorrow'
    ]
  },
  {
    id: '5',
    title: 'Japa Meditation',
    description: 'Practice mantra repetition using a mala (prayer beads). This meditation helps focus the mind and cultivate inner peace.',
    duration: '20 min',
    category: 'Meditation',
    icon: '📿',
    streak: 21,
    progress: 0.9,
    isCompleted: false,
    steps: [
      'Hold your mala in your right hand',
      'Begin with the bead next to the guru bead',
      'Recite your chosen mantra for each bead',
      'Complete one full round (108 repetitions)',
      'Sit in silence for a moment after completion'
    ]
  },
];

const CATEGORIES = [
  'All',
  'Meditation',
  'Yoga',
  'Mindfulness',
  'Study',
  'Ritual',
  'Service'
];

const PracticeCard = ({ practice, onToggleComplete, onViewDetails, colors }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <View style={[styles.practiceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <TouchableOpacity 
        style={styles.practiceHeader}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.practiceMain}>
          <View style={styles.iconContainer}>
            <Text style={styles.practiceIcon}>{practice.icon}</Text>
          </View>
          
          <View style={styles.practiceInfo}>
            <Text style={[styles.practiceTitle, { color: colors.text }]}>
              {practice.title}
            </Text>
            
            <View style={styles.practiceMeta}>
              <Text style={[styles.practiceDuration, { color: colors.gray[600] }]}>
                {practice.duration}
              </Text>
              
              <View style={[styles.categoryBadge, { backgroundColor: colors.subtle }]}>
                <Text style={[styles.categoryText, { color: colors.tint }]}>
                  {practice.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.practiceActions}>
          {practice.streak > 0 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {practice.streak}</Text>
            </View>
          )}
          
          <TouchableOpacity
            style={[
              styles.completeButton,
              { 
                backgroundColor: practice.isCompleted 
                  ? colors.success 
                  : 'transparent',
                borderColor: practice.isCompleted 
                  ? colors.success 
                  : colors.border,
              }
            ]}
            onPress={() => onToggleComplete(practice.id)}
          >
            <FontAwesome 
              name={practice.isCompleted ? 'check' : 'circle-o'} 
              size={20} 
              color={practice.isCompleted ? 'white' : colors.gray[500]} 
            />
          </TouchableOpacity>
          
          <FontAwesome 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color={colors.gray[500]} 
          />
        </View>
      </TouchableOpacity>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: colors.gray[600] }]}>
          Progress: {Math.round(practice.progress * 100)}%
        </Text>
        
        {Platform.OS === 'android' ? (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={practice.progress}
            color={colors.tint}
            style={styles.progressBar}
          />
        ) : (
          <ProgressViewIOS
            progress={practice.progress}
            progressTintColor={colors.tint}
            trackTintColor={colors.gray[200]}
            style={styles.progressBar}
          />
        )}
      </View>
      
      {/* Expanded content */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={[styles.descriptionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.gray[700] }]}>
            {practice.description}
          </Text>
          
          <Text style={[styles.stepsTitle, { color: colors.text }]}>Steps</Text>
          {practice.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
            </View>
          ))}
          
          <TouchableOpacity 
            style={[styles.detailsButton, { backgroundColor: colors.tint }]}
            onPress={() => onViewDetails(practice.id)}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const PracticesTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [practices, setPractices] = useState(PRACTICES);
  
  const filteredPractices = selectedCategory === 'All'
    ? practices
    : practices.filter(practice => practice.category === selectedCategory);
    
  const toggleComplete = (id) => {
    setPractices(prevPractices => 
      prevPractices.map(practice => 
        practice.id === id 
          ? { 
              ...practice, 
              isCompleted: !practice.isCompleted,
              progress: practice.isCompleted ? practice.progress : 1.0 
            } 
          : practice
      )
    );
  };
  
  const viewDetails = (id) => {
    // Handle view details
    console.log(`View details for practice: ${id}`);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Categories */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedCategory === category 
                  ? colors.tint 
                  : colors.subtle,
              }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText, 
                { 
                  color: selectedCategory === category 
                    ? 'white' 
                    : colors.text 
                }
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <FlatList
        data={filteredPractices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PracticeCard 
            practice={item} 
            onToggleComplete={toggleComplete}
            onViewDetails={viewDetails}
            colors={colors} 
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
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  practiceCard: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 0.5,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  practiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  practiceMain: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  practiceIcon: {
    fontSize: 24,
  },
  practiceInfo: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  practiceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceDuration: {
    fontSize: 12,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  practiceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBadge: {
    marginRight: 12,
  },
  streakText: {
    fontSize: 14,
  },
  completeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressText: {
    fontSize: 12,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  expandedContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  stepNumber: {
    width: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  detailsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 16,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default PracticesTab;
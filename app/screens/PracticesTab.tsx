// app/screens/PracticesTab.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  ProgressBarAndroid,
  Platform,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Get device width for responsive design
const { width } = Dimensions.get('window');

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

// Categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️' },
  { id: 'yoga', name: 'Yoga', icon: '🌿' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧠' },
  { id: 'study', name: 'Study', icon: '📚' },
  { id: 'ritual', name: 'Ritual', icon: '🔥' },
  { id: 'service', name: 'Service', icon: '🤲' },
];

const PracticeCard = ({ practice, onToggleComplete, onViewDetails, colors }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  // Calculate streak badge color
  const getStreakColor = (streak) => {
    if (streak >= 21) return colors.success;
    if (streak >= 7) return colors.warning;
    return colors.orange[400];
  };
  
  return (
    <View style={[styles.practiceCard, { 
      backgroundColor: colors.card,
      borderLeftColor: practice.isCompleted ? colors.success : colors.tint,
      borderTopColor: colors.border,
      borderRightColor: colors.border,
      borderBottomColor: colors.border,
    }]}>
      <TouchableOpacity 
        style={styles.cardHeader}
        onPress={() => onViewDetails(practice.id)}
        activeOpacity={0.7}
      >
        {/* Practice icon and info */}
        <View style={styles.headerMain}>
          <View style={styles.iconWrapper}>
            <Text style={styles.practiceIcon}>{practice.icon}</Text>
          </View>
          
          <View style={styles.practiceInfo}>
            <Text style={[styles.practiceTitle, { color: colors.text }]} numberOfLines={1}>
              {practice.title}
            </Text>
            
            <View style={styles.metaRow}>
              <Text style={[styles.durationText, { color: colors.gray[600] }]}>
                {practice.duration}
              </Text>
              
              <View style={[styles.categoryTag, { backgroundColor: colors.subtle }]}>
                <Text style={[styles.categoryText, { color: colors.tint }]}>
                  {practice.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.headerActions}>
          {practice.streak > 0 && (
            <View style={[styles.streakBadge, { backgroundColor: getStreakColor(practice.streak) }]}>
              <Text style={styles.streakText}>🔥 {practice.streak}</Text>
            </View>
          )}
          
          <TouchableOpacity
            style={[styles.completeButton, { 
              backgroundColor: practice.isCompleted ? colors.success : 'transparent',
              borderColor: practice.isCompleted ? colors.success : colors.border,
            }]}
            onPress={() => onToggleComplete(practice.id)}
          >
            <FontAwesome 
              name={practice.isCompleted ? 'check' : 'circle-o'} 
              size={18} 
              color={practice.isCompleted ? 'white' : colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={[styles.progressLabel, { color: colors.gray[600] }]}>
            Progress: {Math.round(practice.progress * 100)}%
          </Text>
          
          <TouchableOpacity onPress={handleToggleExpand}>
            <FontAwesome 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={14} 
              color={colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        
        {Platform.OS === 'android' ? (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={practice.progress}
            color={practice.isCompleted ? colors.success : colors.tint}
            style={styles.progressBar}
          />
        ) : (
          <ProgressViewIOS
            progress={practice.progress}
            progressTintColor={practice.isCompleted ? colors.success : colors.tint}
            trackTintColor={colors.gray[200]}
            style={styles.progressBar}
          />
        )}
      </View>
      
      {/* Expanded content */}
      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.border }]}>
          <Text style={[styles.description, { color: colors.gray[700] }]}>
            {practice.description}
          </Text>
          
          <Text style={[styles.stepsHeader, { color: colors.text }]}>Steps:</Text>
          {practice.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={[styles.stepBullet, { color: colors.tint }]}>•</Text>
              <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
            </View>
          ))}
          
          <TouchableOpacity 
            style={[styles.detailsButton, { backgroundColor: colors.tint }]}
            onPress={() => onViewDetails(practice.id)}
          >
            <Text style={styles.detailsButtonText}>View Detail</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const PracticesTab = () => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [practices, setPractices] = useState(PRACTICES);
  
  const filteredPractices = selectedCategory === 'all'
    ? practices
    : practices.filter(practice => practice.category.toLowerCase() === selectedCategory);
    
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
    console.log(`View details for practice: ${id}`);
    // Handle navigation to details screen
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Categories */}
      <View style={[styles.categoriesWrapper, { borderBottomColor: colors.border }]}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: selectedCategory === category.id 
                    ? colors.tint 
                    : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              )}
              <Text 
                style={[
                  styles.categoryButtonText, 
                  { 
                    color: selectedCategory === category.id 
                      ? 'white' 
                      : colors.text 
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Stats summary */}
      <View style={[styles.statsBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {practices.filter(p => p.isCompleted).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.gray[600] }]}>Completed</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {practices.reduce((total, p) => total + p.streak, 0)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.gray[600] }]}>Total Streak</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {practices.length - practices.filter(p => p.isCompleted).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.gray[600] }]}>Remaining</Text>
        </View>
      </View>
      
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
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {/* Handle add new practice */}}
      >
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default PracticesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesWrapper: {
    borderBottomWidth: 1,
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
  statsBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 80, // Space for FAB
  },
  practiceCard: {
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerMain: {
    flexDirection: 'row',
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
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
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    marginRight: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  completeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 11,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  expandedContent: {
    padding: 12,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  stepsHeader: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
  },
  stepBullet: {
    width: 12,
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  detailsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 12,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});
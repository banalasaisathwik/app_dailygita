// ProfileScreen.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Switch,
  View

} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@/components/Themed';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// Sample user data
const userData = {
  name: "Sarah Johnson",
  username: "@sarahjohnson",
  bio: "Spiritual seeker on a journey of self-discovery. Passionate about meditation, mindfulness, and connecting with like-minded souls.",
  joinDate: "March 2024",
  location: "Portland, OR",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  coverImage: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  stats: {
    posts: 24,
    followers: 143,
    following: 87
  },
  interests: ["Meditation", "Yoga", "Mindfulness", "Spirituality", "Personal Growth"],
  achievements: [
    {
      name: "Meditation Streak",
      icon: "om",
      value: "30 days"
    },
    {
      name: "Community Contributor",
      icon: "heart",
      value: "Silver"
    },
    {
      name: "Book Recommendations",
      icon: "book",
      value: "12"
    }
  ]
};

// Menu items
const menuItems = [
  { icon: 'bookmark', label: 'Saved Content' },
  { icon: 'calendar', label: 'My Events' },
  { icon: 'cog', label: 'Settings' },
  { icon: 'question-circle', label: 'Help & Support' },
  { icon: 'sign-out', label: 'Sign Out' }
];

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const colors = theme.colors;
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover and Avatar Section */}
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: userData.coverImage }} 
            style={styles.coverImage}
          />
          <TouchableOpacity style={[styles.editCoverButton, { backgroundColor: colors.background }]}>
            <FontAwesome name="camera" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: userData.avatar }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: colors.tint }]}>
              <FontAwesome name="pencil" size={12} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>{userData.name}</Text>
          <Text style={[styles.userHandle, { color: colors.gray[600] }]}>{userData.username}</Text>
          
          <View style={styles.bioContainer}>
            <Text style={[styles.bioText, { color: colors.text }]}>{userData.bio}</Text>
          </View>
          
          <View style={styles.locationDateContainer}>
            <View style={styles.infoItem}>
              <FontAwesome name="map-marker" size={14} color={colors.gray[600]} style={styles.infoIcon} />
              <Text style={[styles.infoText, { color: colors.gray[600] }]}>{userData.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="calendar" size={14} color={colors.gray[600]} style={styles.infoIcon} />
              <Text style={[styles.infoText, { color: colors.gray[600] }]}>Joined {userData.joinDate}</Text>
            </View>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.editProfileButton, { backgroundColor: colors.tint }]}
            >
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.shareProfileButton, { borderColor: colors.tint }]}
            >
              <FontAwesome name="share-alt" size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={[styles.sectionContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <FontAwesome name="moon-o" size={18} color={colors.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.gray[300], true: colors.tint }}
              thumbColor="white"
            />
          </View>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLabelContainer}>
              <FontAwesome name="bell" size={18} color={colors.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: colors.gray[300], true: colors.tint }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={[styles.sectionContainer, { backgroundColor: colors.card }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && { 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border 
                }
              ]}
            >
              <View style={styles.menuIconWrapper}>
                <FontAwesome name={item.icon as any} size={18} color={colors.text} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <FontAwesome name="chevron-right" size={14} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version info */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.gray[500] }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  coverContainer: {
    height: 150,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -50,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '80%',
  },
  bioContainer: {
    width: '100%',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  locationDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  infoIcon: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  editProfileButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  shareProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 12,
    fontWeight: '500',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 60) / 3,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 10,
    width: 24,
  },
  settingLabel: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuIconWrapper: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
  }
});
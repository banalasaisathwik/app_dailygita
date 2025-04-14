import { Video, Category } from "../components/videos/types";

export const CATEGORIES: Category[] = 
  [
  { id: 'all', name: 'All', icon: '🎬' },
  { id: 'philosophy', name: 'Philosophy', icon: '🧠' },
  { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️' },
  { id: 'yoga', name: 'Yoga', icon: '🌿' },
  { id: 'bhakti', name: 'Bhakti', icon: '🙏' },
  { id: 'culture', name: 'Culture', icon: '🏛️' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
];

export const VIDEOS: Video[] = [
  {
    id: '1',
    description: 'Learn how to build React Native apps',
    videoUrl: 'https://youtube.com/watch?v=example1',
    category: 'Development',
    userName: 'John Doe',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    timestamp: '2h ago',
    isSaved: false
  },
  // Add more sample videos here
];

// Categories with icons




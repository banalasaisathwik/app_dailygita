import { Discussion } from '../components/discussions/types';

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All',
    icon: '🌟'
  },
  {
    id: 'meditation',
    name: 'Meditation',
    icon: '🧘'
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    icon: '🍃'
  },
  {
    id: 'spirituality',
    name: 'Spirituality',
    icon: '✨'
  },
  {
    id: 'growth',
    name: 'Personal Growth',
    icon: '🌱'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    icon: '🌺'
  }
];

export const DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    author: 'MindfulSoul',
    avatar: 'https://ui-avatars.com/api/?name=MindfulSoul',
    time: '2h ago',
    title: 'How meditation changed my daily routine',
    content: 'After practicing meditation for 30 days straight, I have noticed significant changes in my daily life. My anxiety levels have decreased, and I feel more present in every moment...',
    comments: 24,
    likes: 156,
    tags: ['meditation', 'wellness']
  },
  {
    id: '2',
    author: 'SpiritualSeeker',
    avatar: 'https://ui-avatars.com/api/?name=SpiritualSeeker',
    time: '5h ago',
    title: 'Understanding chakras for beginners',
    content: 'If you are new to spiritual practices, understanding chakras can seem overwhelming. Let me share my beginner-friendly guide to the seven main chakras...',
    comments: 18,
    likes: 142,
    tags: ['spirituality']
  },
  {
    id: '3',
    author: 'ZenMaster',
    avatar: 'https://ui-avatars.com/api/?name=ZenMaster',
    time: '1d ago',
    title: 'Simple mindfulness exercises for busy people',
    content: 'You do not need hours of free time to practice mindfulness. Here are 5 simple exercises you can do in under 5 minutes, perfect for busy schedules...',
    comments: 32,
    likes: 203,
    tags: ['mindfulness', 'wellness']
  },
  {
    id: '4',
    author: 'GrowthJourney',
    avatar: 'https://ui-avatars.com/api/?name=GrowthJourney',
    time: '2d ago',
    title: 'Overcoming self-doubt through self-reflection',
    content: 'Self-doubt can be paralyzing, but through consistent self-reflection and mindful practices, we can learn to overcome these limiting beliefs...',
    comments: 45,
    likes: 278,
    tags: ['growth', 'mindfulness']
  },
  {
    id: '5',
    author: 'PeacefulPath',
    avatar: 'https://ui-avatars.com/api/?name=PeacefulPath',
    time: '3d ago',
    title: 'Creating a sacred space at home',
    content: 'Your environment affects your spiritual practice. Here is how I created a peaceful corner in my small apartment for meditation and reflection...',
    comments: 29,
    likes: 184,
    tags: ['spirituality', 'meditation']
  }
];
import { Note, Category } from '../components/notes/types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Notes', icon: 'sticky-note' },
  { id: 'video', name: 'From Videos', icon: 'play-circle' },
  { id: 'book', name: 'From Books', icon: 'book' },
  { id: 'other', name: 'Other', icon: 'lightbulb-o' }
];

export const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    title: 'React Native Animations',
    content: 'Key points about animations:\n- Use LayoutAnimation for simple transitions\n- Animated API for complex animations',
    source: {
      type: 'video',
      title: 'Animation Tutorial',
      link: 'https://example.com/video'
    },
    category: 'video',
    timestamp: new Date().toISOString(),
    isFavorite: false
  }
];
import { Event, Category, Filter } from '../components/events/types';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Introduction to React Native',
    organizer: 'Tech Academy',
    location: 'Virtual Meeting',
    date: '2024-04-20',
    time: '10:00',
    image: 'https://picsum.photos/seed/react/400/200',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    category: 'development',
    isFeatured: false,
    isVirtual: true,
    isSaved: false,
    attendees: 156
  },
  {
    id: '2',
    title: 'UI/UX Design Workshop',
    organizer: 'Design Community',
    location: 'Creative Hub, Downtown',
    date: '2024-04-25',
    time: '14:00',
    image: 'https://picsum.photos/seed/design/400/200',
    description: 'Hands-on workshop focusing on modern UI/UX design principles.',
    category: 'design',
    isFeatured: false,
    isVirtual: false,
    isSaved: false,
    attendees: 45
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    organizer: 'Growth Hub',
    location: 'Virtual Meeting',
    date: '2024-05-01',
    time: '11:00',
    image: 'https://picsum.photos/seed/marketing/400/200',
    description: 'Master the latest digital marketing strategies and tools.',
    category: 'marketing',
    isFeatured: false,
    isVirtual: true,
    isSaved: false,
    attendees: 230
  },
  {
    id: '4',
    title: 'Startup Networking Event',
    organizer: 'Founder\'s Club',
    location: 'Innovation Center',
    date: '2024-05-05',
    time: '18:00',
    image: 'https://picsum.photos/seed/startup/400/200',
    description: 'Connect with fellow entrepreneurs and investors.',
    category: 'networking',
    isFeatured: false,
    isVirtual: false,
    isSaved: false,
    attendees: 85
  }
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Events', icon: 'calendar' },
  { id: 'development', name: 'Development', icon: 'code' },
  { id: 'design', name: 'Design', icon: 'paint-brush' },
  { id: 'marketing', name: 'Marketing', icon: 'line-chart' },
  { id: 'networking', name: 'Networking', icon: 'users' }
];

export const FILTERS: Filter[] = [
  { id: 'all', label: 'All Events' },
  { id: 'virtual', label: 'Virtual' },
  { id: 'inperson', label: 'In Person' },
  { id: 'upcoming', label: 'Upcoming' }
];
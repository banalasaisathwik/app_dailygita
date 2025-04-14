export interface Event {
  id: string;
  title: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  image: string;
  description: string;
  category: string;
  isFeatured: boolean;
  isVirtual: boolean;
  isSaved: boolean;
  attendees: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Filter {
  id: string;
  label: string;
}

export interface ThemeColors {
  text: string;
  background: string;
  tint: string;
  card: string;
  border: string;
  gray: {
    [key: number]: string;
  };
  info: string;
  warning: string;
  subtle: string;
}
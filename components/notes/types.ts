export interface Note {
  id: string;
  title: string;
  content: string;
  source: {
    type: 'video' | 'book' | 'other';
    title?: string;
    link?: string;
  };
  category: string;
  timestamp: string;
  isFavorite: boolean;
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
  warning: string;
  subtle: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
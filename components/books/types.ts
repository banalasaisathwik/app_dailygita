export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  category: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  isInReadingList: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface ThemeColors {
  tint: string;
  text: string;
  card: string;
  border: string;
  gray: {
    [key: number]: string;
  };
  subtle: string;
  background: string;
}
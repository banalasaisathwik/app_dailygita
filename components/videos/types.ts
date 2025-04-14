export interface Video {
  id: string;
  description: string;
  videoUrl: string;
  category: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  isSaved: boolean;
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
export interface Discussion {
  id: string;
  author: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  comments: number;
  likes: number;
  tags: string[];
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
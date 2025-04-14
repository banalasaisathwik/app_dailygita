import { Platform } from 'react-native';

interface VideoMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  speaker: string;
}

export const getVideoMetadata = async (url: string): Promise<VideoMetadata> => {
  try {
    const response = await fetch(`YOUR_API_ENDPOINT/metadata?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return {
      title: data.title,
      thumbnail: data.thumbnail_url,
      duration: data.duration,
      views: data.view_count,
      speaker: data.author_name
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return {
      title: 'Unable to load video details',
      thumbnail: 'https://via.placeholder.com/120x80',
      duration: '00:00',
      views: '0',
      speaker: 'Unknown'
    };
  }
};
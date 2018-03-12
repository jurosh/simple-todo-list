import { Share } from 'react-native';

export const share = (title: string, message: string) => {
  Share.share({
    title,
    message
  });
};

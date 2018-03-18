import Expo from 'expo';

export const takePhoto = async (): Promise<Expo.ImagePicker.ImageResult> => {
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
  if (permission.status !== 'granted') {
    throw new Error('[camera] missing permission');
  }
  return Expo.ImagePicker.launchCameraAsync({
    mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
    base64: true
  } as any);
};

export const pickExistingPhoto = async (): Promise<Expo.ImagePicker.ImageResult> =>
  Expo.ImagePicker.launchImageLibraryAsync({
    mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
    base64: true
  } as any);

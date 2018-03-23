import { NavigationScreenProp, NavigationActions } from 'react-navigation';

export const navigateAndReset = (
  navigation: NavigationScreenProp<any>,
  route: string,
  params = {}
) => {
  navigation.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: route,
          params
        })
      ]
    })
  );
};

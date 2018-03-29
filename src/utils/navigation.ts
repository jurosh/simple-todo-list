import { NavigationScreenProp, NavigationActions } from 'react-navigation';

export const navigateAndReset = (
  navigation: NavigationScreenProp<any>,
  route: string | string[],
  params: {} | Array<{}> = {}
) => {
  let resetPayload;
  if (Array.isArray(route)) {
    resetPayload = {
      index: route.length - 1,
      actions: route.map((routeName, index) =>
        NavigationActions.navigate({ routeName, params: params[index] })
      )
    };
  } else {
    resetPayload = {
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route, params })]
    };
  }
  navigation.dispatch(NavigationActions.reset(resetPayload));
};

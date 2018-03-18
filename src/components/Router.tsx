import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Easing,
  Animated
} from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';
import ListsScreen from './lists/ListsScreen';
import TodosScreen from './todos/TodosScreen';
import AboutScreen from './about/AboutScreen';
import profileImage from './images/profile.png';
import { logout, getUserEmail } from '../api';
import ContactsPickerScreen from './contacts/ContactsPickerScreen';

const Header = props => (
  <ScrollView>
    <View style={styles.profile}>
      <Image style={styles.profileImg} source={profileImage} />
      <Text style={styles.profileText}>{getUserEmail()}</Text>
      <Button title="Log out" color="#6a1b9a" onPress={logout} />
    </View>
    <DrawerItems {...props} />
  </ScrollView>
);

const styles = StyleSheet.create({
  profile: {
    marginVertical: 25,
    alignItems: 'center'
  },
  profileImg: {
    width: 200,
    height: 200
  },
  profileText: {
    marginBottom: 15,
    fontSize: 20
  }
});

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4) as any),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;

    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    return { transform: [{ translateX }] };
  }
});

const StackRouter = StackNavigator(
  {
    Lists: { screen: ListsScreen },
    Todos: { screen: TodosScreen },
    ContactsPicker: { screen: ContactsPickerScreen }
  },
  {
    transitionConfig,
    headerMode: 'none'
  }
);

const DrawerRouter = DrawerNavigator(
  {
    Lists: { screen: StackRouter },
    About: { screen: AboutScreen }
  },
  {
    contentComponent: Header
  }
);

export default DrawerRouter;

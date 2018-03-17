import * as React from 'react';
import {
  TouchableHighlight,
  Image,
  Button,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import hamburgerImage from './images/hamburger.png';
import backImage from './images/back.png';

interface IPros extends NavigationInjectedProps {
  heading: string;
  children: any;
  edit?: boolean;
  onEdit?: (edit: boolean) => void;
  back: () => void;
}

const Layout = ({ children, heading, back, edit, onEdit, navigation }: IPros) => (
  <ScrollView>
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.wrap}>
        <View style={styles.head}>
          <TouchableHighlight
            style={styles.imageClickable}
            onPress={() => navigation.navigate('DrawerOpen')}
          >
            <Entypo name="menu" size={40} style={styles.image} />
          </TouchableHighlight>
          <Text style={styles.heading}>{heading}</Text>
          {onEdit && (
            <TouchableHighlight
              style={styles.imageClickable}
              onPress={() => onEdit(!edit)}
            >
              <Entypo name={edit ? 'check' : 'edit'} size={40} style={styles.image} />
            </TouchableHighlight>
          )}
          {back && (
            <TouchableHighlight style={styles.imageClickable} onPress={back}>
              <Entypo name="back" size={40} style={styles.image} />
            </TouchableHighlight>
          )}
        </View>
        <View>{children}</View>
      </View>
    </KeyboardAvoidingView>
  </ScrollView>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  imageClickable: {
    width: 40,
    height: 40
  },
  head: {
    display: 'flex',
    flexDirection: 'row'
  },
  heading: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center'
  },
  image: {
    backgroundColor: 'white'
  }
});

export default withNavigation(Layout) as any;

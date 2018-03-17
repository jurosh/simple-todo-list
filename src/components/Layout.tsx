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
  footer: any;
}

const Layout = ({ children, heading, back, edit, footer, onEdit, navigation }: IPros) => (
  <ScrollView style={styles.scroller}>
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.topLine} />
      <View style={styles.head}>
        <TouchableHighlight
          style={styles.imageClickable}
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Entypo name="menu" size={40} />
        </TouchableHighlight>
        <Text style={styles.heading}>{heading}</Text>
        {onEdit && (
          <View style={styles.editWrap}>
            <TouchableHighlight onPress={() => onEdit(!edit)}>
              <View style={styles.edit}>
                <Entypo name={edit ? 'check' : 'edit'} size={25} color="white" />
              </View>
            </TouchableHighlight>
          </View>
        )}
        {back && (
          <TouchableHighlight style={styles.imageClickable} onPress={back}>
            <Entypo name="back" size={40} />
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.content}>{children}</View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </KeyboardAvoidingView>
  </ScrollView>
);

const styles = StyleSheet.create({
  scroller: {
    backgroundColor: '#ffff8b'
  },
  imageClickable: {
    width: 40,
    height: 40
  },
  topLine: {
    backgroundColor: '#c9bc1f',
    height: 20
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffee58',
    padding: 10
  },
  heading: {
    flex: 1,
    fontSize: 30,
    marginLeft: 10
  },
  editWrap: {
    paddingHorizontal: 10
  },
  edit: {
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 7.5,
    backgroundColor: '#c9bc1f'
  },
  content: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 40,
    minHeight: 200,
    backgroundColor: '#e0e0e0'
  },
  footer: {
    padding: 10
  }
});

export default withNavigation(Layout) as any;

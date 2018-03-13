import * as React from 'react';
import {
  TouchableHighlight,
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import hamburgerImage from './images/hamburger.png';
import backImage from './images/back.png';

interface IPros extends NavigationInjectedProps {
  heading: string;
  children: any;
  back: () => void;
}

const Layout = ({ children, heading, back, navigation }: IPros) => (
  <ScrollView>
    <View style={styles.wrap}>
      <View style={styles.head}>
        <TouchableHighlight
          style={styles.imageClickable}
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Image style={styles.image} source={hamburgerImage} />
        </TouchableHighlight>
        <Text style={styles.heading}>{heading}</Text>
        {back && (
          <TouchableHighlight style={styles.imageClickable} onPress={back}>
            <Image style={styles.image} source={backImage} />
          </TouchableHighlight>
        )}
      </View>
      <View>{children}</View>
    </View>
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
    width: 40,
    height: 40,
    backgroundColor: 'white'
  }
});

export default withNavigation(Layout) as any;

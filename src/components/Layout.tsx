import * as React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

interface IPros extends NavigationInjectedProps {
  heading: string;
  children: any;
  edit?: boolean;
  onEdit?: (edit: boolean) => void;
  afterContent: () => any;
  back: () => void;
  footer?: () => any;
}

const Layout = ({
  children,
  heading,
  back,
  edit,
  footer,
  afterContent,
  onEdit,
  navigation
}: IPros) => (
  <View style={styles.wrap}>
    <View style={styles.topLine} />
    <ScrollView keyboardShouldPersistTaps="always">
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.head}>
          {back ? (
            <TouchableNativeFeedback style={styles.imageClickable} onPress={back}>
              <MaterialIcons name="arrow-back" size={40} />
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback
              style={styles.imageClickable}
              onPress={() => navigation.navigate('DrawerOpen')}
            >
              <Entypo name="menu" size={40} />
            </TouchableNativeFeedback>
          )}
          <Text style={styles.heading}>{heading}</Text>
          {onEdit && (
            <View style={styles.editWrap}>
              <TouchableNativeFeedback onPress={() => onEdit(!edit)}>
                <View style={styles.edit}>
                  <Entypo name={edit ? 'check' : 'edit'} size={25} color="white" />
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
        <View style={styles.content}>{children}</View>
        {afterContent && <View style={styles.afterContent}>{afterContent()}</View>}
      </KeyboardAvoidingView>
    </ScrollView>
    {footer && <React.Fragment>{footer()}</React.Fragment>}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    height: '100%'
  },
  imageClickable: {
    width: 40,
    height: 40
  },
  topLine: {
    backgroundColor: '#c9bc1f',
    height: StatusBar.currentHeight
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
    minHeight: 200
  },
  afterContent: {
    backgroundColor: '#ffffa8',
    padding: 10
  }
});

export default withNavigation(Layout) as any;

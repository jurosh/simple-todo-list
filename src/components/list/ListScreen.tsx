import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getLists } from '../../api/lists';

interface IProps extends NavigationInjectedProps {}

export default class ListScreen extends React.Component<IProps> {
  render() {
    const { params } = this.props.navigation.state as any;
    const listId = params ? params.listId : null;
    return (
      <View style={styles.wrap}>
        <View style={styles.margin}>
          <Button onPress={() => this.props.navigation.goBack()} title="GO BACK" />
        </View>
        <View style={styles.margin}>
          <Text>Detail {listId}</Text>
        </View>
        <View style={styles.margin}>
          <Button title="ADD NEW" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = {
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  margin: {
    marginVertical: 30
  }
};

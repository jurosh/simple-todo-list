import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Alert,
  Text
} from 'react-native';
import { createList } from '../../api/lists';

export default class AddList extends React.Component {
  state = {
    name: ''
  };

  onAdd = () => {
    const { name } = this.state;
    if (!name) {
      Alert.alert('Enter new list name');
      return;
    }
    createList(this.state.name).then(() => {
      this.setState({ name: '' });
    });
  };

  render() {
    const { name } = this.state;
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />
        <Button title="ADD NEW" onPress={this.onAdd} />
      </View>
    );
  }
}

const styles = {
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  input: {
    paddingVertical: 30
  }
};

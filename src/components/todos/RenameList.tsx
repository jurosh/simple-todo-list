import * as React from 'react';
import {
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  View,
  Alert,
  Text
} from 'react-native';
import { updateList } from '../../api/lists';

interface IProps {
  listId: string;
  listName: string;
}

interface IState {
  text: string;
  loading: boolean;
}

class RenameList extends React.Component<IProps> {
  state: IState = {
    text: this.props.listName,
    loading: false
  };

  onChangeText = text => this.setState({ text });

  onUpdate = () => {
    const { text } = this.state;
    if (!text) {
      Alert.alert('Enter list name');
      return;
    }
    this.setState({ loading: true });
    updateList(this.props.listId, { name: text }).then(() =>
      this.setState({ loading: false })
    );
  };

  render() {
    const { text, loading } = this.state;
    return (
      <View style={styles.wrap}>
        <Text style={styles.text}>Rename listing ?</Text>
        <TextInput value={text} onChangeText={this.onChangeText} />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button onPress={this.onUpdate} title="RENAME" color="#9c4dcc" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    margin: 20,
    padding: 20,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  text: {
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default RenameList;

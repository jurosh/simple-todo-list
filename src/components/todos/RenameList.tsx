import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  TextInput,
  View,
  ScrollView,
  Alert,
  Text
} from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { updateList, ITodo } from '../../api/lists';
import IconInput from '../basic/IconInput';

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
        <TextInput value={text} onChangeText={text => this.setState({ text })} />
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

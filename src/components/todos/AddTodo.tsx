import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  View,
  ScrollView,
  Alert,
  Text
} from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { addTodo, ITodo } from '../../api/lists';
import IconInput from '../basic/IconInput';

interface IProps {
  listId: string;
}

interface IState {
  loading: boolean;
  text: string;
}

class AddTodo extends React.Component<IProps> {
  state: IState = {
    loading: false,
    text: ''
  };

  onAdd = () => {
    const { text } = this.state;
    if (!text) {
      Alert.alert('Enter todo text');
      return;
    }
    this.setState({ loading: true });
    addTodo(this.props.listId, { text }).then(data =>
      this.setState({ loading: false, text: '' })
    );
  };

  render() {
    const { text, loading } = this.state;
    return (
      <View style={styles.wrap}>
        <IconInput
          iconType="entypo"
          icon="new-message"
          text={text}
          onChange={text => this.setState({ text })}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="ADD" onPress={this.onAdd} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});

export default AddTodo;

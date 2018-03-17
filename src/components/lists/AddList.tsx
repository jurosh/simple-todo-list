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
import { createList } from '../../api/lists';
import IconInput from '../basic/IconInput';

interface IProps {
  onAdding: () => void;
}

interface IState {
  loading: boolean;
  name: string;
}

class AddList extends React.Component<IProps & NavigationInjectedProps> {
  state = {
    loading: false,
    name: ''
  };

  onAdd = () => {
    const { name } = this.state;
    if (!name) {
      Alert.alert('Enter new list name');
      return;
    }
    this.setState({ loading: true });
    this.props.onAdding();
    createList(name).then(data => {
      // this.setState({ name: '' });
      this.props.navigation.navigate('Todos', {
        listId: data.id,
        listName: name,
        startAsEditable: true
      });
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <View style={styles.wrap}>
        <IconInput
          iconType="entypo"
          icon="new-message"
          text={name}
          onChange={text => this.setState({ name: text })}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="ADD NEW" onPress={this.onAdd} />
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

export default withNavigation(AddList);

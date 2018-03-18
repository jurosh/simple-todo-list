import * as React from 'react';
import { Button, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { createList } from '../../api/lists';
import IconInput from '../basic/IconInput';

interface IProps {
  onAdded: () => void;
}

interface IState {
  loading: boolean;
  name: string;
}

class AddList extends React.Component<IProps & NavigationInjectedProps, IState> {
  state: IState = {
    loading: false,
    name: ''
  };

  onAdd = () => {
    const { name } = this.state;
    const { navigation, onAdded } = this.props;
    if (!name) {
      Alert.alert('Enter new list name');
      return;
    }
    this.setState({ loading: true });
    createList(name).then(data => {
      onAdded();
      navigation.navigate('Todos', {
        listId: data.id,
        listName: name
      });
    });
  };

  handleNewMessage = text => this.setState({ name: text });

  render() {
    const { name, loading } = this.state;
    return (
      <View style={styles.wrap}>
        <IconInput
          iconType="entypo"
          icon="new-message"
          text={name}
          onChange={this.handleNewMessage}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="ADD NEW" onPress={this.onAdd} color="#6a1b9a" />
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

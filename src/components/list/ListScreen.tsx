import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { queryList, addTodo } from '../../api/lists';

interface IState {
  name: string;
  todos: any[];
}
interface IProps extends NavigationInjectedProps {}

export default class ListScreen extends React.Component<IProps, IState> {
  state: IState = {
    name: '',
    todos: []
  };

  unsubscribe: (() => void) | null = null;

  getListId = () => {
    const { params } = this.props.navigation.state as any;
    if (!params || !params.listId) {
      return;
    }
    return params.listId;
  };

  componentDidMount() {
    const listId = this.getListId();
    if (!listId) {
      return;
    }
    this.unsubscribe = queryList(listId).onSnapshot(snapshot => {
      const { todos, name } = snapshot.data() as any;
      // console.log(todos, name);
      this.setState({ name, todos });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { name, todos } = this.state;
    const listId = this.getListId();
    return (
      <View style={styles.wrap}>
        <View style={styles.margin}>
          <Button onPress={() => this.props.navigation.goBack()} title="GO BACK" />
        </View>
        <View style={styles.margin}>
          <Text>Detail {name}</Text>
          {todos.map((todo, index) => (
            <View key={`${todo.text}_${index}`}>
              <Text>{todo.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.margin}>
          <Button title="ADD NEW" onPress={() => addTodo(listId)} />
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

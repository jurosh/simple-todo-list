import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import AddList from './AddList';
import { queryLists, removeList } from '../../api/lists';

interface IProps extends NavigationInjectedProps {}

interface IState {
  lists: { name: string; id: string; todosCount: number }[];
  loading: boolean;
}

export default class ListsScreen extends React.Component<IProps, IState> {
  state: IState = {
    lists: [],
    loading: true
  };

  listsUnsubscribe: (() => void) | null = null;

  componentDidMount() {
    this.listsUnsubscribe = queryLists().onSnapshot(snapshot => {
      const lists: any[] = [];
      snapshot.forEach(document => {
        const data = document.data();
        lists.push({ name: data.name, id: document.id, todosCount: data.todos.length });
      });
      this.setState({ lists, loading: false });
    });
  }

  componentWillUnmount() {
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }
  }

  render() {
    const { loading, lists } = this.state;
    console.log('State Lists', this.state.lists);
    return (
      <View style={styles.wrap}>
        {loading && <Text style={styles.loading}>Loading...</Text>}
        {lists.map(list => (
          <View key={list.id}>
            <Text
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate('List', {
                  listId: list.id
                })
              }
            >
              {list.name} ({list.todosCount}){' '}
            </Text>
            <Button onPress={() => removeList(list.id)} title="Delete" />
          </View>
        ))}
        <AddList />
      </View>
    );
  }
}

const styles = {
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  loading: {
    fontSize: 22,
    marginVertical: 30
  },
  item: {
    paddingVertical: 30,
    fontSize: 25
  }
};

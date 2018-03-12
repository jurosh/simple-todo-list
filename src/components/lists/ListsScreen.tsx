import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import AddList from './AddList';
import { queryLists } from '../../api/lists';

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
    return (
      <View style={styles.wrap}>
        <Text style={styles.heading}>Todos Lists</Text>
        {loading && <Text style={styles.loading}>Loading...</Text>}
        {lists.map(list => (
          <View style={styles.item} key={list.id}>
            <Text
              style={styles.itemText}
              onPress={() =>
                this.props.navigation.navigate('Todos', {
                  listId: list.id
                })
              }
            >
              {list.name}
            </Text>
            <Text style={styles.count}>{list.todosCount}</Text>
          </View>
        ))}
        <AddList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  heading: {
    fontSize: 30,
    textAlign: 'center'
  },
  loading: {
    fontSize: 22,
    marginVertical: 30
  },
  item: {
    backgroundColor: '#FFFFE0',
    marginVertical: 10,
    padding: 10,
    borderColor: '#FFEA00',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 25,
    flex: 1
  },
  count: {
    backgroundColor: '#FFEA00',
    borderRadius: 100,
    width: 50,
    height: 40,
    fontSize: 25,
    textAlign: 'center'
  }
});

import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  TextInput
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import AddList from './AddList';
import Layout from '../Layout';
import { queryLists, IList } from '../../api/lists';

interface IProps extends NavigationInjectedProps {}

interface IState {
  search: string;
  lists: { name: string; id: string; todosCount: number }[];
  loading: boolean;
}

export default class ListsScreen extends React.Component<IProps, IState> {
  state: IState = {
    search: '',
    lists: [],
    loading: true
  };

  listsUnsubscribe: (() => void) | null = null;

  componentDidMount() {
    this.listsUnsubscribe = queryLists().onSnapshot(snapshot => {
      const lists: any[] = [];
      snapshot.forEach(document => {
        const data = document.data() as IList;
        lists.push({ name: data.name, id: document.id, todosCount: data.count });
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
      <Layout heading="Todos Lists">
        <TextInput
          style={styles.search}
          onChangeText={text => this.setState({ search: text })}
        />
        {loading && <Text style={styles.loading}>Loading...</Text>}
        {lists.map(
          list =>
            list.name.includes(this.state.search) && (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('yellow')}
                key={list.id}
                onPress={() =>
                  this.props.navigation.navigate('Todos', {
                    listId: list.id,
                    listName: list.name
                  })
                }
              >
                <View style={styles.item}>
                  <Text style={styles.itemText}>{list.name}</Text>
                  <Text style={styles.count}>{list.todosCount}</Text>
                </View>
              </TouchableNativeFeedback>
            )
        )}
        <AddList />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    padding: 10,
    margin: 10
  },
  loading: {
    fontSize: 22,
    marginVertical: 30
  },
  item: {
    marginVertical: 10,
    backgroundColor: '#FFFFE0',
    borderColor: '#FFEA00',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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

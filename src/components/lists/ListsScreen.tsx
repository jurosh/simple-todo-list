import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getLists } from '../../api/lists';

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

  componentDidMount() {
    getLists().then(querySnapshot => {
      const lists: any[] = [];
      querySnapshot.forEach(document => {
        const data = document.data();
        console.log(data.name);
        lists.push({ name: data.name, id: document.id, todosCount: data.todos.length });
      });
      this.setState({ lists, loading: false });
    });
  }

  render() {
    const { loading, lists } = this.state;
    console.log('State Lists', this.state.lists);
    return (
      <View style={styles.wrap}>
        {loading && <Text style={styles.loading}>Loading...</Text>}
        {lists.map(list => (
          <Text
            key={list.name}
            style={styles.item}
            onPress={() =>
              this.props.navigation.navigate('List', {
                listId: list.id
              })
            }
          >
            {list.name} ({list.todosCount})
          </Text>
        ))}
        <Button title="ADD NEW" onPress={() => {}} />
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

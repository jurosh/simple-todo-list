import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import AddList from './AddList';
import IconInput from '../basic/IconInput';
import Layout from '../Layout';
import { queryLists, IList } from '../../api/lists';
import { ITodoList, storeLists } from '../../redux/lists';
import { connect } from 'react-redux';
import ListsContainer from './ListsContainer';

interface IProps extends NavigationInjectedProps {
  lists: ITodoList[];
  onFetched: (lists: ITodoList[]) => void;
}

interface IState {
  search: string;
  loading: boolean;
}

class ListsScreen extends React.Component<IProps, IState> {
  state: IState = {
    search: '',
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
      this.props.onFetched(lists);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }
  }

  render() {
    const { search, loading } = this.state;
    return (
      <Layout heading="Todos Lists">
        <IconInput
          iconType="material"
          icon="search"
          text={search}
          onChange={text => this.setState({ search: text })}
        />
        <View style={styles.listings}>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" />
            </View>
          )}
          <ListsContainer
            search={search}
            onItemClick={list =>
              this.props.navigation.navigate('Todos', {
                listId: list.id,
                listName: list.name
              })
            }
          />
        </View>
        <AddList onAdding={() => this.listsUnsubscribe && this.listsUnsubscribe()} />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  listings: {
    position: 'relative',
    minHeight: 100
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  onFetched(lists: ITodoList[]) {
    dispatch(storeLists(lists));
  }
});

export default connect(undefined, mapDispatchToProps)(ListsScreen);

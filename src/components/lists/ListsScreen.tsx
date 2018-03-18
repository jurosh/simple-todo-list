import * as React from 'react';
import {
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  View,
  StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationInjectedProps } from 'react-navigation';
import AddList from './AddList';
import IconInput from '../basic/IconInput';
import Layout from '../Layout';
import { queryLists, IList } from '../../api/lists';
import { ITodoList, storeLists } from '../../redux/lists';
import { connect } from 'react-redux';
import ListsContainer from './ListsContainer';
import PopInputInView from './FadeView';

interface IProps extends NavigationInjectedProps {
  lists: ITodoList[];
  onFetched: (lists: ITodoList[]) => void;
}

interface IState {
  search: string;
  loading: boolean;
  addingNew: boolean;
}

class ListsScreen extends React.Component<IProps, IState> {
  state: IState = {
    search: '',
    loading: true,
    addingNew: false
  };

  listsUnsubscribe: (() => void) | null = null;

  handleSearchType = text => this.setState({ search: text, addingNew: false });

  handleItemClick = list => {
    this.setState({ addingNew: false });
    this.props.navigation.navigate('Todos', { listId: list.id });
  };

  componentDidMount() {
    console.log('Loading Lists...');

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
    console.log('Unmount...');
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }
  }

  handleAdded = () => {
    this.setState({ addingNew: false });
  };

  render() {
    const { search, addingNew, loading } = this.state;
    return (
      <Layout
        heading="Todos Lists"
        footer={() => (
          <React.Fragment>
            {addingNew ? (
              <PopInputInView>
                <AddList onAdded={this.handleAdded} />
              </PopInputInView>
            ) : (
              <TouchableNativeFeedback onPress={() => this.setState({ addingNew: true })}>
                <MaterialIcons
                  name="add-circle"
                  size={55}
                  color="#9c4dcc"
                  style={styles.add}
                />
              </TouchableNativeFeedback>
            )}
          </React.Fragment>
        )}
      >
        <IconInput
          iconType="material"
          icon="search"
          text={search}
          onChange={this.handleSearchType}
        />
        <ListsContainer
          loading={loading}
          search={search}
          onItemClick={this.handleItemClick}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  add: {
    borderRadius: 50,
    width: 55,
    height: 55,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

const mapDispatchToProps = dispatch => ({
  onFetched(lists: ITodoList[]) {
    dispatch(storeLists(lists));
  }
});

export default connect(undefined, mapDispatchToProps)(ListsScreen);

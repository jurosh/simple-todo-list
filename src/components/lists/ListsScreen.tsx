import * as React from 'react';
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

  handleSearchType = text => this.setState({ search: text });

  handleItemClick = list => this.props.navigation.navigate('Todos', { listId: list.id });

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

  handleBeforeAdd = () => {
    if (this.listsUnsubscribe) {
      this.listsUnsubscribe();
    }
  };

  render() {
    const { search, loading } = this.state;
    return (
      <Layout heading="Todos Lists" footer={<AddList onAdding={this.handleBeforeAdd} />}>
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

const mapDispatchToProps = dispatch => ({
  onFetched(lists: ITodoList[]) {
    dispatch(storeLists(lists));
  }
});

export default connect(undefined, mapDispatchToProps)(ListsScreen);

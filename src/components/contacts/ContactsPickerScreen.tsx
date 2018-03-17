import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
  Text,
  TextInput
} from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import Layout from '../Layout';
import IconInput from '../basic/IconInput';
import { getAllContacts } from '../../api/contacts';
import { addContacts, startAddContacts } from '../../redux/contacts';
import { addTodoContact, ITodo } from '../../api/lists';

interface IProps {
  list: { name: string; id: string; firstName: string }[];
  loading: boolean;
  total: number;
  onStartFetch: () => void;
  onFetched: (data: any, hasNext: boolean, total: number) => void;
}

interface IState {
  search: string;
}

const DISPLAYED = 40;

class ContactsPickerScreen extends React.Component<
  IProps & NavigationInjectedProps,
  IState
> {
  state: IState = {
    search: ''
  };

  componentDidMount() {
    if (
      this.props.loading ||
      this.props.list.length === 0 ||
      this.props.list.length < this.props.total
    ) {
      this.props.onStartFetch();
      getAllContacts((data, hasNext, total) => {
        this.props.onFetched(data, hasNext, total);
      });
    }
  }

  componentWillUnmount() {
    // Stop loading
  }

  onSelect = (name: string) => {
    const params = (this.props.navigation.state as any).params;
    addTodoContact(params.listId, { name });
    this.props.navigation.navigate('Todos', {
      listId: params.listId,
      listName: params.listName
    });
  };

  render() {
    const { search } = this.state;
    const { list, total, loading } = this.props;
    const nonDisplayedCount = list.length > DISPLAYED ? list.length + 1 - DISPLAYED : 0;
    return (
      <Layout heading="Pick Contact">
        <IconInput
          iconType="material"
          icon="search"
          text={search}
          onChange={text => this.setState({ search: text.toLowerCase() })}
        />
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        )}
        <Text style={styles.count}>
          {list.length < total && `of ${list.length}`} {total} contacts
        </Text>
        {list
          .filter(
            contact =>
              contact && contact.name && contact.name.toLowerCase().includes(search)
          )
          .slice(0, DISPLAYED)
          .map((contact, index) => (
            <TouchableNativeFeedback
              key={index} /* TODO: contact.id */
              background={TouchableNativeFeedback.Ripple('gray')}
              onPress={() => this.onSelect(contact.name || contact.firstName)}
            >
              <View style={styles.contact}>
                <Text>{contact.name}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        {nonDisplayedCount > 0 && (
          <Text style={styles.more}>And {nonDisplayedCount} more...</Text>
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    margin: 10
  },
  count: {
    textAlign: 'center',
    margin: 10
  },
  contact: {
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  more: {
    margin: 20,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  list: state.contacts.list,
  total: state.contacts.meta.total,
  loading: state.contacts.meta.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartFetch() {
    dispatch(startAddContacts());
  },
  onFetched(data, hasNext, total) {
    dispatch(addContacts(data, { hasNext, total }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withNavigation(ContactsPickerScreen)
);

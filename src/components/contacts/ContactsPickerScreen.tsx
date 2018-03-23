import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import Layout from '../Layout';
import IconInput from '../basic/IconInput';
import { getAllContacts } from '../../api/contacts';
import { addContacts, startAddContacts, IContact } from '../../redux/contacts';
import { addTodoContact } from '../../api/lists';
import { navigateAndReset } from '../../utils/navigation';
import Contact from './Contact';

interface IProps extends NavigationInjectedProps {
  list: IContact[];
  loading: boolean;
  total: number;
  onStartFetch: () => void;
  onFetched: (data: any, hasNext: boolean, total: number) => void;
}

interface IState {
  search: string;
}

const DISPLAYED_COUNT = 40;

class ContactsPickerScreen extends React.Component<IProps, IState> {
  state: IState = {
    search: ''
  };

  handleSearchType = text => this.setState({ search: text });

  componentDidMount() {
    if (
      this.props.loading ||
      this.props.list.length === 0 ||
      this.props.list.length < this.props.total
    ) {
      this.props.onStartFetch();
      getAllContacts((data, hasNext, total) =>
        this.props.onFetched(data, hasNext, total)
      );
    }
  }

  componentWillUnmount() {
    // We might stop loading contacts...
  }

  onSelect = contact => {
    const params = (this.props.navigation.state as any).params;
    console.log(contact);
    addTodoContact(params.listId, {
      id: contact.id,
      name: contact.name || contact.firstName,
      email: contact.emails ? contact.emails[0].email : '',
      phone: contact.phoneNumbers ? contact.phoneNumbers[0].number : '',
      image: contact.thumbnail ? contact.thumbnail.uri : null
    });
    navigateAndReset(this.props.navigation, 'Todos', { listId: params.listId });
  };

  render() {
    const { search } = this.state;
    const { list, total, loading } = this.props;
    const lowercaseSearch = search.toLowerCase();
    const filteredList = list.filter(
      contact => contact && contact.name && contact.name.includes(lowercaseSearch)
    );
    const hiddenCount =
      filteredList.length > DISPLAYED_COUNT
        ? filteredList.length + 1 - DISPLAYED_COUNT
        : 0;
    return (
      <Layout heading="Pick Contact" back={() => this.props.navigation.goBack()}>
        <IconInput
          iconType="material"
          icon="search"
          text={search}
          onChange={this.handleSearchType}
        />
        <Text style={styles.count}>
          {list.length < total && `${list.length} of`} {total} contacts
        </Text>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator color="#9c4dcc" />
          </View>
        ) : (
          filteredList.length === 0 && <Text style={styles.empty}>No contacts found</Text>
        )}
        {filteredList
          .slice(0, DISPLAYED_COUNT)
          .map(contact => (
            <Contact
              name={contact.name || contact.firstName}
              onSelect={() => this.onSelect(contact)}
            />
          ))}
        {hiddenCount > 0 && <Text style={styles.more}>And {hiddenCount} more...</Text>}
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
  more: {
    margin: 20,
    textAlign: 'center'
  },
  empty: {
    margin: 20,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  list: state.contacts.list,
  total: state.contacts.meta.total,
  loading: state.contacts.meta.loading
});

const mapDispatchToProps = dispatch => ({
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

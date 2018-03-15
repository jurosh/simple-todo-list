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
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import Layout from '../Layout';
import { getAllContacts } from '../../api/contacts';
import { addContacts, startAddContacts } from '../../redux/contacts';

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

class ContactsPickerScreen extends React.Component<IProps, IState> {
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

  render() {
    const { search } = this.state;
    const { list, total, loading } = this.props;
    return (
      <Layout heading="Pick Contact">
        <TextInput
          value={search}
          onChangeText={text => this.setState({ search: text.toLowerCase() })}
        />
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        )}
        <Text style={styles.loaderText}>
          {list.length} of {total}
        </Text>
        {list
          .filter(
            contact =>
              contact && contact.name && contact.name.toLowerCase().includes(search)
          )
          .map((contact, index) => (
            <TouchableNativeFeedback
              key={index} /* TODO: contact.id */
              background={TouchableNativeFeedback.Ripple('gray')}
              onPress={() => {
                'TODO';
              }}
            >
              <View style={styles.contact}>
                <Text>{contact.name}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    margin: 10
  },
  loaderText: {
    textAlign: 'center'
  },
  contact: {
    marginVertical: 10,
    backgroundColor: '#FFFFE0',
    borderColor: '#FFEA00',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  }
});

const mapStateToProps = state => ({
  list: state.contacts.list,
  total: state.contacts.meta.total,
  loading: state.contacts.meta.loading
});

const mapDispatchToProps = dispatch => ({
  // onClean() {
  //   dispatch(cleanContacts());
  // },
  onStartFetch() {
    dispatch(startAddContacts());
  },
  onFetched(data, hasNext, total) {
    dispatch(addContacts(data, { hasNext, total }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPickerScreen);

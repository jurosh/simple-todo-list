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
import { connect } from 'react-redux';
import Layout from '../Layout';
import { getAllContacts } from '../../api/contacts';
import { addContacts, startAddContacts } from '../../redux/contacts';

interface IProps {
  list: any[];
  loading: boolean;
  total: number;
  onStartFetch: () => void;
  onFetched: (data: any, hasNext: boolean, total: number) => void;
}

class ContactsPickerScreen extends React.Component<IProps> {
  // state = {
  //   search: '' TODO:
  // }
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
    // const { loading, lists } = this.state;
    console.log(this.props.list[0]);
    return (
      <Layout heading="Pick Contact">
        <Text>
          {this.props.loading && (
            <Text>
              (Loading... {this.props.list.length} of {this.props.total})
            </Text>
          )}
        </Text>
        {this.props.list.map((contact, index) => (
          <Text key={index}>
            Contact {contact.id}, {contact.name}
          </Text>
        ))}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  //
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
    dispatch(addContacts(data, { hasNext, total }, false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPickerScreen);

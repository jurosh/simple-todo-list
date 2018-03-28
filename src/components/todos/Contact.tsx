import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TouchableFeedback from '../basic/TouchableFeedback';
// import { getContact } from '../../api/contacts';

interface IState {
  opened: boolean;
}

class Contact extends React.Component<{ name; email; phone; image }, IState> {
  state: IState = {
    opened: false
  };

  open = () => {
    this.setState({ opened: true });
  };

  render() {
    const { name, image, email, phone } = this.props;
    const { opened } = this.state;
    return (
      <View>
        <TouchableFeedback onPress={this.open}>
          <View style={styles.contact}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <MaterialIcons name="person" size={40} />
            )}
            <Text style={styles.name}>{name}</Text>
          </View>
        </TouchableFeedback>
        {opened ? (
          <View style={styles.more}>
            {email ? <Text>Email: {email}</Text> : null}
            {phone ? <Text>Phone: {phone}</Text> : null}
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contact: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: 40,
    height: 40
  },
  name: {
    marginTop: 7,
    marginLeft: 10,
    fontSize: 20
  },
  more: {
    margin: 20
  }
});

export default Contact;

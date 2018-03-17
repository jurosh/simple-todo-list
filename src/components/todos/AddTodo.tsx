import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  TextInput,
  View,
  ScrollView,
  Alert,
  Text
} from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { addTodo, ITodo } from '../../api/lists';
import IconInput from '../basic/IconInput';

interface IProps {
  uploadPhoto: (photo: any) => void;
  listId: string;
  listName: string;
}

interface IState {
  loading: boolean;
  text: string;
}

class AddTodo extends React.Component<IProps & NavigationInjectedProps> {
  state: IState = {
    loading: false,
    text: ''
  };

  onAdd = () => {
    const { text } = this.state;
    if (!text) {
      Alert.alert('Enter todo text');
      return;
    }
    this.setState({ loading: true });
    addTodo(this.props.listId, { text }).then(data =>
      this.setState({ loading: false, text: '' })
    );
  };

  render() {
    const { text, loading } = this.state;
    const { listId, navigation, listName, uploadPhoto } = this.props;
    return (
      <View style={styles.wrap}>
        <IconInput
          iconType="entypo"
          icon="new-message"
          text={text}
          onChange={text => this.setState({ text })}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="ADD" onPress={this.onAdd} color="#6a1b9a" />
        )}
        <Text style={styles.or}>OR</Text>
        <View style={styles.photos}>
          <TouchableNativeFeedback
            style={styles.actionWrap}
            onPress={() => pickExistingPhoto().then(uploadPhoto)}
          >
            <View style={styles.action}>
              <Entypo name="camera" size={40} color="white" />
              <Text style={styles.actionText}>PICK PHOTO</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.actionWrap}
            onPress={() => takePhoto().then(uploadPhoto)}
          >
            <View style={styles.action}>
              <Entypo name="images" size={40} color="white" />
              <Text style={styles.actionText}>TAKE PHOTO</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={styles.actionWrap}
            onPress={() =>
              navigation.navigate('ContactsPicker', {
                listId,
                listName
              })
            }
          >
            <View style={styles.action}>
              <MaterialIcons name="contacts" size={40} color="white" />
              <Text style={styles.actionText}>ADD CONTACT</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  or: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  photos: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 60
  },
  actionWrap: {
    flex: 1
  },
  action: {
    backgroundColor: '#9c4dcc',
    padding: 10,
    borderRadius: 2,
    margin: 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default withNavigation(AddTodo);

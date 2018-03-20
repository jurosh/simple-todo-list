import * as React from 'react';
import { Button, StyleSheet, ActivityIndicator, View, Alert, Text } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { addTodo } from '../../api/lists';
import IconInput from '../basic/IconInput';
import TouchableFeedback from '../basic/TouchableFeedback';

interface IProps {
  uploadPhoto: (photo: any) => Promise<void>;
  listId: string;
}

interface IState {
  loading: boolean;
  loadingPickImage: boolean;
  loadingTakeImage: boolean;
  text: string;
}

const ActionIcon = ({ loading, text, image, onPress }) => (
  <TouchableFeedback onPress={onPress} disabled={loading}>
    <View style={styles.action}>
      {image}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.actionText}>{text}</Text>
      )}
    </View>
  </TouchableFeedback>
);

class AddTodo extends React.Component<IProps & NavigationInjectedProps> {
  state: IState = {
    loading: false,
    loadingPickImage: false,
    loadingTakeImage: false,
    text: ''
  };

  onAdd = () => {
    const { text } = this.state;
    if (!text) {
      Alert.alert('Enter todo text');
      return;
    }
    this.setState({ loading: true });
    addTodo(this.props.listId, { text }).then(() =>
      this.setState({ loading: false, text: '' })
    );
  };

  handleType = text => this.setState({ text });

  handlePickPhoto = () => {
    this.setState({ loadingPickImage: true });
    pickExistingPhoto()
      .then(this.props.uploadPhoto)
      .then(() => this.setState({ loadingPickImage: false }))
      .catch(() => this.setState({ loadingPickImage: false }));
  };

  handleTakePhoto = () => {
    this.setState({ loadingTakeImage: true });
    takePhoto()
      .then(this.props.uploadPhoto)
      .then(() => this.setState({ loadingTakeImage: false }))
      .catch(() => this.setState({ loadingTakeImage: false }));
  };

  handleAddContact = () =>
    this.props.navigation.navigate('ContactsPicker', { listId: this.props.listId });

  render() {
    const { text, loading, loadingPickImage, loadingTakeImage } = this.state;
    return (
      <View style={styles.wrap}>
        <IconInput
          iconType="entypo"
          icon="new-message"
          text={text}
          onChange={this.handleType}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#9c4dcc" />
        ) : (
          <Button title="ADD" onPress={this.onAdd} color="#6a1b9a" />
        )}
        <Text style={styles.or}>OR</Text>
        <View style={styles.actions}>
          <ActionIcon
            loading={loadingPickImage}
            text="PICK PHOTO"
            image={<Entypo name="camera" size={40} color="white" />}
            onPress={this.handlePickPhoto}
          />
          <ActionIcon
            loading={loadingTakeImage}
            text="TAKE PHOTO"
            image={<Entypo name="images" size={40} color="white" />}
            onPress={this.handleTakePhoto}
          />
          <ActionIcon
            loading={false}
            text="ADD CONTACT"
            image={<MaterialIcons name="contacts" size={40} color="white" />}
            onPress={this.handleAddContact}
          />
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
  actions: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 60
  },
  action: {
    flex: 1,
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

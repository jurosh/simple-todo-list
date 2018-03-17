import * as React from 'react';
import {
  Image,
  Switch,
  Button,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  ScrollView,
  Text,
  TextInput
} from 'react-native';
import Checkbox from '../basic/Checkbox';
import { updateTodo } from '../../api/lists';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { ITodo } from '../../api/lists';
import ImagePreview from 'react-native-image-preview';
import { getAllContacts } from '../../api/contacts';

interface IProps {
  image: string;
}

interface IState {
  opened: boolean;
}

export default class ImageWithPreview extends React.Component<IProps, IState> {
  state: IState = {
    opened: false
  };

  render() {
    const { image } = this.props;
    const { opened } = this.state;
    return (
      <View style={styles.imageWrap}>
        <TouchableNativeFeedback onPress={() => this.setState({ opened: true })}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableNativeFeedback>
        <ImagePreview
          visible={opened}
          source={{ uri: image }}
          close={() => this.setState({ opened: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    maxHeight: 150
  },
  image: {
    height: 100
  }
});

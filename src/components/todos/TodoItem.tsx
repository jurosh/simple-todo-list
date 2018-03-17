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
// import { takePhoto, pickExistingPhoto } from '../../api/camera';
// import { shareTodosList } from './todosShare';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { ITodo } from '../../api/lists';
import ImagePreview from 'react-native-image-preview';
import { getAllContacts } from '../../api/contacts';

interface IProps {
  edit: boolean;
  onDelete: () => void;
  listId: string;
  todoId: string;
  todo: ITodo;
}

interface IState {
  imagePreview: boolean;
}

export default class TodoItem extends React.Component<IProps, IState> {
  state: IState = {
    imagePreview: false
  };

  render() {
    const { todoId, todo, listId, edit, onDelete } = this.props;
    return (
      <View style={styles.item}>
        {edit ? (
          <React.Fragment>
            <MaterialIcons name="delete" size={30} onPress={onDelete} />
            <TextInput value={todo.text} />
            <Entypo name="check" onPress={() => {}} />
          </React.Fragment>
        ) : (
          <View style={styles.checkWrap}>
            <Checkbox
              checked={!!todo.check}
              onClick={() => updateTodo(listId, todoId, { ...todo, check: !todo.check })}
              rightText={todo.text}
            />
          </View>
        )}
        {todo.image && (
          <View style={styles.imageWrap}>
            <TouchableNativeFeedback
              onPress={() => this.setState({ imagePreview: true })}
            >
              <Image source={{ uri: todo.image }} style={styles.image} />
            </TouchableNativeFeedback>
            <ImagePreview
              visible={this.state.imagePreview}
              source={{ uri: todo.image }}
              close={() => this.setState({ imagePreview: false })}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10
  },
  checkWrap: {},
  imageWrap: {
    maxHeight: 150
  },
  image: {
    height: 100
  },
  text: {}
});

import * as React from 'react';
import {
  Image,
  Switch,
  Button,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  ScrollView,
  Text
} from 'react-native';
import Checkbox from '../basic/Checkbox';
import { updateTodo } from '../../api/lists';
// import { takePhoto, pickExistingPhoto } from '../../api/camera';
// import { shareTodosList } from './todosShare';
import { ITodo } from '../../api/lists';
import ImagePreview from 'react-native-image-preview';
import { getAllContacts } from '../../api/contacts';

interface IProps {
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
    const { todoId, todo, listId } = this.props;
    console.log(todoId, todo.image);

    return (
      <View style={styles.item}>
        <View style={styles.checkWrap}>
          <Checkbox
            checked={!!todo.check}
            onClick={() => updateTodo(listId, todoId, { ...todo, check: !todo.check })}
            rightText={todo.text}
          />
        </View>
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

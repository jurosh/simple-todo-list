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
import { updateTodo, ITodo } from '../../api/lists';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import ImageWithPreview from '../basic/ImageWithPreview';
import ImagePreview from 'react-native-image-preview';

interface IProps {
  onDelete: () => void;
  listId: string;
  todoId: string;
  todo: ITodo;
}

interface IState {
  editText: string;
}

export default class TodoEditItem extends React.Component<IProps, IState> {
  state: IState = {
    editText: this.props.todo.text
  };

  save = () => {
    const { todoId, listId } = this.props;
    updateTodo(listId, todoId, {
      text: this.state.editText
    });
  };

  render() {
    const { todoId, todo, listId, onDelete } = this.props;
    const { editText } = this.state;
    return (
      <View style={styles.item}>
        <View style={styles.itemLine}>
          <MaterialIcons name="delete" size={30} onPress={onDelete} />
          <TextInput
            style={styles.input}
            value={editText || todo.text}
            onChangeText={text => this.setState({ editText: text })}
            onEndEditing={this.save}
          />
          {!!editText &&
            editText !== todo.text && (
              <MaterialIcons size={30} name="sync" onPress={this.save} />
            )}
        </View>
        {todo.image && <ImageWithPreview image={todo.image} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10
  },
  itemLine: {
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    flex: 1
  }
});

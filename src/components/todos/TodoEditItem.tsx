import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { updateTodo, ITodo } from '../../api/lists';
import { MaterialIcons } from '@expo/vector-icons';
import Contact from './Contact';
import ImageWithPreview from '../basic/ImageWithPreview';

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

  onChangeText = text => this.setState({ editText: text });

  save = () => {
    const { todoId, listId } = this.props;
    updateTodo(listId, todoId, {
      text: this.state.editText
    });
  };

  render() {
    const { todo, onDelete } = this.props;
    const { editText } = this.state;
    return (
      <View style={styles.item}>
        <View style={styles.itemLine}>
          <MaterialIcons name="delete" size={30} onPress={onDelete} />
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={this.onChangeText}
            onEndEditing={this.save}
          />
          {editText !== todo.text && (
            <MaterialIcons size={30} name="sync" onPress={this.save} />
          )}
        </View>
        {todo.image && <ImageWithPreview image={todo.image} />}
        {todo.contact && (
          <Contact
            name={todo.contact.name}
            email={todo.contact.email}
            phone={todo.contact.phone}
            image={todo.contact.image}
          />
        )}
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
    flex: 1,
    padding: 5
  }
});

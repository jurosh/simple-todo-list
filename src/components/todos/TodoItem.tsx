import * as React from 'react';
import { Image, Switch, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import Checkbox from '../basic/Checkbox';
import { updateTodo } from '../../api/lists';
// import { takePhoto, pickExistingPhoto } from '../../api/camera';
// import { shareTodosList } from './todosShare';
import { ITodo } from '../../api/lists';

interface IProps {
  listId: string;
  todoId: string;
  todo: ITodo;
}

export default class TodoItem extends React.Component<IProps> {
  render() {
    const { todoId, todo, listId } = this.props;
    return (
      <View style={styles.item}>
        <Checkbox
          checked={!!todo.check}
          onClick={() => updateTodo(listId, todoId, { ...todo, check: !todo.check })}
          rightText={todo.text}
        />
        {todo.image && <Image source={{ uri: todo.image }} style={styles.image} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    height: 100
  },
  text: {
    // flex: 1
  }
});

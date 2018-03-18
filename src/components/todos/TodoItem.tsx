import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Checkbox from '../basic/Checkbox';
import Contact from './Contact';
import { updateTodo } from '../../api/lists';
import ImageWithPreview from '../basic/ImageWithPreview';
import { ITodo } from '../../api/lists';

interface IProps {
  listId: string;
  todoId: string;
  todo: ITodo;
}

export default class TodoItem extends React.Component<IProps> {
  onClick = () => {
    const { todoId, todo, listId } = this.props;
    updateTodo(listId, todoId, { ...todo, check: !todo.check });
  };

  render() {
    const { todo } = this.props;
    return (
      <View style={styles.item}>
        <Checkbox checked={!!todo.check} onClick={this.onClick} rightText={todo.text} />
        {todo.image && <ImageWithPreview image={todo.image} />}
        {todo.contactName && <Contact name={todo.contactName} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10
  }
});

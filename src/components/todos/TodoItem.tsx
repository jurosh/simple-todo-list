import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from '../basic/Checkbox';
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
        <View style={styles.checkWrap}>
          <Checkbox checked={!!todo.check} onClick={this.onClick} rightText={todo.text} />
        </View>
        {todo.image && <ImageWithPreview image={todo.image} />}
        {todo.contactName && <Text>{todo.contactName}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10
  },
  checkWrap: {}
});

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
import ImageWithPreview from '../basic/ImageWithPreview';
import { ITodo } from '../../api/lists';
import ImagePreview from 'react-native-image-preview';
import { getAllContacts } from '../../api/contacts';

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
        <View style={styles.checkWrap}>
          <Checkbox
            checked={!!todo.check}
            onClick={() => updateTodo(listId, todoId, { ...todo, check: !todo.check })}
            rightText={todo.text}
          />
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

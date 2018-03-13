import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { queryTodos, addTodo, removeList, uploadTodoImage, ITodo } from '../../api/lists';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { shareTodosList } from './todosShare';
import Layout from '../Layout';
import TodoItem from './TodoItem';
import { ImagePicker } from 'expo';
// import EditableHeading from './EditableHeading';

interface ITodoId extends ITodo {
  id: string;
}

interface IState {
  todos: ITodoId[];
}
interface IProps extends NavigationInjectedProps {}

export default class TodosScreen extends React.Component<IProps, IState> {
  state: IState = {
    todos: []
  };

  unsubscribe: (() => void) | null = null;

  getListId = () => {
    const { params } = this.props.navigation.state as any;
    if (!params || !params.listId) {
      return;
    }
    return params.listId;
  };

  getListName = () => {
    const { params } = this.props.navigation.state as any;
    if (!params || !params.listName) {
      return;
    }
    return params.listName;
  };

  componentDidMount() {
    const listId = this.getListId();
    if (!listId) {
      return;
    }
    this.unsubscribe = queryTodos(listId).onSnapshot(snapshot => {
      const todos = snapshot.docs;
      this.setState({
        todos: todos.map(doc => ({
          ...(doc.data() as ITodo),
          id: doc.id
        }))
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  uploadPhoto = (image: ImagePicker.ImageResult) => {
    if (image.cancelled) {
      return;
    }
    uploadTodoImage(this.getListId(), (image as any).base64);
  };

  render() {
    const { todos } = this.state;
    const name = this.getListName();
    const listId = this.getListId();
    return (
      <Layout heading={name} back={() => this.props.navigation.goBack()}>
        <View style={styles.margin}>
          {todos.map((todo, index) => (
            <TodoItem
              key={`${todo.text}_${index}`}
              todo={todo}
              todoId={todo.id}
              listId={listId}
            />
          ))}
        </View>
        <View style={styles.margin}>
          <Button title="SHARE" onPress={() => shareTodosList(name, todos)} />
        </View>
        <View style={styles.margin}>
          <Button
            onPress={() => {
              this.unsubscribe && this.unsubscribe();
              removeList(listId);
              this.props.navigation.navigate('Lists');
            }}
            title="Delete"
          />
        </View>
        <View style={styles.margin}>
          <Button
            title="ADD NEW"
            onPress={() => addTodo(listId, { text: 'Example Todo' })}
          />
          <Button
            title="PICK PHOTO"
            onPress={() => pickExistingPhoto().then(this.uploadPhoto)}
          />
          <Button title="TAKE PHOTO" onPress={() => takePhoto().then(this.uploadPhoto)} />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    marginVertical: 30
  },
  todoImage: {
    height: 100
  }
});

import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
  Text
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import {
  queryTodos,
  addTodo,
  removeTodo,
  removeList,
  uploadTodoImage,
  ITodo
} from '../../api/lists';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { shareTodosList } from './todosShare';
import AddTodo from './AddTodo';
import Layout from '../Layout';
import TodoItem from './TodoItem';
import { ImagePicker } from 'expo';

interface ITodoId extends ITodo {
  id: string;
}

interface INavigationParams {
  startAsEditable?: boolean;
  listId: string;
  listName: string;
}

interface IProps {
  navigation: {
    navigate: (name: string) => void;
    goBack: () => void;
    state: {
      params: INavigationParams;
    };
  };
}

interface IState {
  loading: boolean;
  todos: ITodoId[];
  editable;
}

export default class TodosScreen extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    todos: [],
    editable: !!this.props.navigation.state.params.startAsEditable
  };

  unsubscribe: (() => void) | null = null;

  getListId = () => this.props.navigation.state.params.listId;

  getListName = () => this.props.navigation.state.params.listName;

  componentDidMount() {
    this.setState({ loading: true });
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
        })),
        loading: false
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
    const { todos, editable, loading } = this.state;
    const name = this.getListName();
    const listId = this.getListId();
    return (
      <Layout
        heading={name}
        back={() => this.props.navigation.goBack()}
        edit={editable}
        onEdit={edit => this.setState({ editable: edit })}
      >
        {editable && (
          <View>
            <Text>Remove listing ?</Text>
            <Button
              onPress={() => {
                this.unsubscribe && this.unsubscribe();
                removeList(listId);
                this.props.navigation.navigate('Lists');
              }}
              title="REMOVE"
            />
          </View>
        )}
        <View style={styles.margin}>
          {loading && <ActivityIndicator size="large" />}
          {todos.map((todo, index) => (
            <TodoItem
              key={`${todo.text}_${index}`}
              onDelete={() => removeTodo(listId, todo.id)}
              edit={editable}
              todo={todo}
              todoId={todo.id}
              listId={listId}
            />
          ))}
        </View>
        <AddTodo listId={listId} />
        <View style={styles.margin}>
          <Button title="SHARE" onPress={() => shareTodosList(name, todos)} />
        </View>
        <View style={styles.photos}>
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
  },
  photos: {
    display: 'flex',
    flexDirection: 'row'
  }
});

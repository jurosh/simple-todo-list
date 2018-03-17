import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
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
import { Entypo } from '@expo/vector-icons';
import { shareTodosList } from './todosShare';
import AddTodo from './AddTodo';
import Layout from '../Layout';
import TodoItem from './TodoItem';
import TodoEditItem from './TodoEditItem';
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
      <React.Fragment>
        <Layout
          heading={name}
          back={() => this.props.navigation.goBack()}
          edit={editable}
          onEdit={edit => this.setState({ editable: edit })}
          footer={
            <AddTodo listId={listId} listName={name} uploadPhoto={this.uploadPhoto} />
          }
        >
          {editable && (
            <View style={styles.removeWrap}>
              <Text style={styles.removeText}>Remove listing ?</Text>
              <Button
                onPress={() => {
                  this.unsubscribe && this.unsubscribe();
                  removeList(listId);
                  this.props.navigation.navigate('Lists');
                }}
                title="REMOVE"
                color="#9c4dcc"
              />
            </View>
          )}
          <View style={styles.margin}>
            {loading && <ActivityIndicator size="large" />}
            {todos.map((todo, index) => (
              <View style={styles.item} key={`${todo.text}_${index}`}>
                {editable ? (
                  <TodoEditItem
                    onDelete={() => removeTodo(listId, todo.id)}
                    todo={todo}
                    todoId={todo.id}
                    listId={listId}
                  />
                ) : (
                  <TodoItem todo={todo} todoId={todo.id} listId={listId} />
                )}
              </View>
            ))}
          </View>
        </Layout>
        <TouchableNativeFeedback onPress={() => shareTodosList(name, todos)}>
          <View style={styles.share}>
            <Entypo name="share" size={40} color="white" />
          </View>
        </TouchableNativeFeedback>
      </React.Fragment>
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
  removeWrap: {
    margin: 20,
    padding: 20,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  removeText: {
    marginBottom: 10,
    textAlign: 'center'
  },
  item: {
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  share: {
    borderRadius: 50,
    width: 55,
    height: 55,
    padding: 5,
    position: 'absolute',
    backgroundColor: '#38006b',
    bottom: 10,
    right: 10
  }
});

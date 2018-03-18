import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {
  queryTodos,
  queryList,
  removeTodo,
  removeList,
  uploadTodoImage,
  ITodo
} from '../../api/lists';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { shareTodosList } from './todosShare';
import AddTodo from './AddTodo';
import Layout from '../Layout';
import TodoItem from './TodoItem';
import TodoEditItem from './TodoEditItem';
import RenameList from './RenameList';
import { ImagePicker } from 'expo';

interface ITodoId extends ITodo {
  id: string;
}

interface INavigationParams {
  startAsEditable?: boolean;
  listId: string;
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
  listName: string;
  editable;
}

export default class TodosScreen extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    todos: [],
    listName: '',
    editable: !!this.props.navigation.state.params.startAsEditable
  };

  unsubscribe: (() => void) | null = null;
  unsubscribeList: (() => void) | null = null;

  getListId = () => this.props.navigation.state.params.listId;

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
    this.unsubscribeList = queryList(listId).onSnapshot(snapshot =>
      this.setState({
        listName: (snapshot.data() as any).name
      })
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.unsubscribeList) {
      this.unsubscribeList();
    }
  }

  uploadPhoto = (image: ImagePicker.ImageResult) => {
    if (image.cancelled) {
      return;
    }
    uploadTodoImage(this.getListId(), (image as any).base64);
  };

  handleDelete = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.unsubscribeList) {
      this.unsubscribeList();
    }
    removeList(this.getListId());
    this.props.navigation.navigate('Lists');
  };

  render() {
    const { todos, listName, editable, loading } = this.state;
    const listId = this.getListId();
    return (
      <React.Fragment>
        <Layout
          heading={listName}
          back={() => this.props.navigation.goBack()}
          edit={editable}
          onEdit={edit => this.setState({ editable: edit })}
          footer={<AddTodo listId={listId} uploadPhoto={this.uploadPhoto} />}
        >
          {editable && <RenameList listId={listId} listName={listName} />}
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
        {editable ? (
          <TouchableNativeFeedback onPress={this.handleDelete}>
            <View style={styles.delete}>
              <MaterialIcons name="delete" size={45} color="white" />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableNativeFeedback onPress={() => shareTodosList(listName, todos)}>
            <View style={styles.share}>
              <Entypo name="share" size={40} color="white" />
            </View>
          </TouchableNativeFeedback>
        )}
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
  },
  delete: {
    backgroundColor: '#dd2c00',
    borderRadius: 50,
    width: 55,
    height: 55,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

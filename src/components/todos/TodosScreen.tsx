import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { queryList, addTodo, removeList, uploadTodoImage } from '../../api/lists';
import { takePhoto, pickExistingPhoto } from '../../api/camera';
import { shareTodosList } from './todosShare';
import Layout from '../Layout';
import { ITodo } from './types';
import { ImagePicker } from 'expo';

interface IState {
  name: string;
  todos: ITodo[];
}
interface IProps extends NavigationInjectedProps {}

export default class TodosScreen extends React.Component<IProps, IState> {
  state: IState = {
    name: '',
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

  componentDidMount() {
    const listId = this.getListId();
    if (!listId) {
      return;
    }
    this.unsubscribe = queryList(listId).onSnapshot(snapshot => {
      const { todos, name } = snapshot.data() as any;
      this.setState({ name, todos });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  uploadPhoto = (image: ImagePicker.ImageResult) => {
    // console.log(Object.keys(image));
    if (image.cancelled) {
      return;
    }
    uploadTodoImage(this.getListId(), (image as any).base64);
  };

  render() {
    const { name, todos } = this.state;
    const listId = this.getListId();
    return (
      <Layout heading={name} back={() => this.props.navigation.goBack()}>
        <View style={styles.margin}>
          {todos.map((todo, index) => (
            <View key={`${todo.text}_${index}`}>
              {todo.image ? (
                <Image source={{ uri: todo.image }} style={styles.todoImage} />
              ) : (
                <Text>{todo.text}</Text>
              )}
            </View>
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

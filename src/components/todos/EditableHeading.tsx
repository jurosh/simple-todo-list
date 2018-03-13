// import * as React from 'react';
// import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
// import { NavigationInjectedProps } from 'react-navigation';
// import { queryList, addTodo, removeList, uploadTodoImage } from '../../api/lists';
// import { takePhoto, pickExistingPhoto } from '../../api/camera';
// import { shareTodosList } from './todosShare';
// import Layout from '../Layout';
// import { ITodo } from './types';
// import { ImagePicker } from 'expo';
// import EditableHeading from './EditableHeading';

// interface IState {
//   edit: boolean;
//   text: string;
// }
// interface IProps {
//   value: string;
// }

// export default class TodosScreen extends React.Component<IProps, IState> {
//   state: IState = {
//     edit: true,
//     text: this.props.value
//   };

//   render() {
//     const { edit, text } = this.state;
//     return (
//         <View>
//             {}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//   margin: {
//     marginVertical: 30
//   },
//   todoImage: {
//     height: 100
//   }
// });

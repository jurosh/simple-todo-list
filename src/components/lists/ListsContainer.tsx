import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import AddList from './AddList';
import IconInput from '../basic/IconInput';
import Layout from '../Layout';
import { queryLists, IList } from '../../api/lists';
import { ITodoList, storeLists } from '../../redux/lists';

interface IProps {
  onItemClick: (list: ITodoList) => void;
  lists: ITodoList[];
  search?: string;
}

const ListsContainer = ({ lists, search = '', onItemClick }: IProps) => (
  <View>
    {lists.filter(list => list.name.includes(search)).map(list => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('yellow')}
        key={list.id}
        onPress={() => onItemClick(list)}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{list.name}</Text>
          <Text style={styles.count}>{list.todosCount}</Text>
        </View>
      </TouchableNativeFeedback>
    ))}
  </View>
);

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    backgroundColor: '#FFFFE0',
    borderColor: '#FFEA00',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 25,
    flex: 1
  },
  count: {
    backgroundColor: '#FFEA00',
    borderRadius: 100,
    width: 50,
    height: 40,
    fontSize: 25,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  lists: state.lists.list
});

export default connect(mapStateToProps)(ListsContainer);

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { ITodoList } from '../../redux/lists';

interface IProps {
  onItemClick: (list: ITodoList) => void;
  lists: ITodoList[];
  loading: boolean;
  search?: string;
}

const ListsContainer = ({ lists, loading, search = '', onItemClick }: IProps) => (
  <View style={styles.wrap}>
    {lists.length === 0 && loading && <ActivityIndicator size="large" />}
    {lists.filter(list => list.name.includes(search)).map(list => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#38006b')}
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
  wrap: {
    minHeight: 100
  },
  item: {
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 25,
    flex: 1
  },
  count: {
    backgroundColor: '#c9bc1f',
    color: 'white',
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

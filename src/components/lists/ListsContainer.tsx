import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ITodoList } from '../../redux/lists';
import TouchableFeedback from '../basic/TouchableFeedback';

interface IProps {
  onItemClick: (list: ITodoList) => void;
  lists: ITodoList[];
  loading: boolean;
  search?: string;
}

const ListsContainer = ({ lists, loading, search = '', onItemClick }: IProps) => {
  const filteredList = lists.filter(list => list.name.includes(search));
  return (
    <View style={styles.wrap}>
      {filteredList.length === 0 &&
        (loading ? (
          <ActivityIndicator size="large" color="#9c4dcc" />
        ) : (
          <Text style={styles.empty}>No lists</Text>
        ))}
      {filteredList.map(list => (
        <TouchableFeedback
          backgroundRippleColor="#38006b"
          key={list.id}
          onPress={() => onItemClick(list)}
        >
          <View style={styles.item}>
            <Text style={styles.itemText}>{list.name}</Text>
            <Text style={styles.count}>{list.todosCount}</Text>
          </View>
        </TouchableFeedback>
      ))}
    </View>
  );
};

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
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20
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

import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Layout from '../Layout';

export default class ListsScreen extends React.Component<NavigationInjectedProps> {
  render() {
    return (
      <Layout heading="About">
        <Text style={styles.heading}>Todos App</Text>
        <Text style={styles.author}>by Juraj Husar</Text>
        <Text style={styles.year}>2018</Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 70,
    fontSize: 30,
    textAlign: 'center'
  },
  author: {
    margin: 10,
    textAlign: 'center'
  },
  year: {
    margin: 10,
    textAlign: 'center'
  }
});

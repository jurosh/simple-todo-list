import * as React from 'react';
import { Image, StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import ImagePreview from 'react-native-image-preview';

interface IProps {
  image: string;
}

interface IState {
  opened: boolean;
}

export default class ImageWithPreview extends React.Component<IProps, IState> {
  state: IState = {
    opened: false
  };

  onOpen = () => {
    this.setState({ opened: true });
  };

  onClose = () => {
    this.setState({ opened: false });
  };

  render() {
    const { image } = this.props;
    const { opened } = this.state;
    return (
      <View style={styles.imageWrap}>
        <TouchableNativeFeedback onPress={this.onOpen}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableNativeFeedback>
        <ImagePreview visible={opened} source={{ uri: image }} close={this.onClose} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    maxHeight: 200
  },
  image: {
    height: 200
  }
});

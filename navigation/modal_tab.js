/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, Text, StyleSheet, Pressable, Modal,
} from 'react-native';

class ModalTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      userName: props.user,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.normalScreen} />
        <Modal visible={this.state.modalVisible} transparent>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Welcome

                {this.state.userName}
                ! Today&apos;s quest is to go to the river
                {' '}
              </Text>
              <Pressable style={styles.button} onPress={() => this.setState({ modalVisible: false })}>
                <Text style={styles.buttonText}>
                  OK
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  normalScreen: {
    fontSize: 80,
  },
  modal: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    marginTop: 90,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 80,
    padding: 40,
    borderRadius: 10,
    flex: 1,
  },
  modalText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 150,
    paddingBottom: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFCC15',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },

});

export default ModalTab;

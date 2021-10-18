// screens/AddNewsfeedScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class AddNewsfeedScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('newsfeed');
    this.state = {
      date: '',
      description: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeNewsfeed() {
    if(this.state.description === ''){
     alert('Fill description!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        date: this.state.date,
        description: this.state.description,
      }).then((res) => {
        this.setState({
          date: '',
          description: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Newsfeed')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Date'}
              value={this.state.date}
              onChangeText={(val) => this.inputValueUpdate(val, 'date')}
          />
        </View>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(val) => this.inputValueUpdate(val, 'description')}
          />
        </View>
        <br></br>
        <br></br>
        <View style={styles.button}>
          <Button
            title='Add Newsfeed'
            onPress={() => this.storeNewsfeed()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddNewsfeedScreen;
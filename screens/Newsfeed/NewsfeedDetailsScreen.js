// screens/NewsfeedDetailsScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class NewsfeedDetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
      description: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('newsfeed').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const newsfeed = res.data();
        this.setState({
          key: res.id,
          date: newsfeed.date,
          description: newsfeed.description,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateNewsfeed() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('newsfeed').doc(this.state.key);
    updateDBRef.set({
      date: this.state.date,
      description: this.state.description,
    }).then((docRef) => {
      this.setState({
        key: '',
        date: '',
        description: '',
        isLoading: false,
      });
      
      this.props.navigation.navigate('Newsfeed');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteNewsfeed() {
    const dbRef = firebase.firestore().collection('newsfeed').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('Newsfeed');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Newsfeed',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteNewsfeed()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
            title='Update'
            onPress={() => this.updateNewsfeed()} 
            color="#19AC52"
          />
          </View>
          <br></br>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
          // onPress={() => this.deleteNewsfeed()} 
            color="#D11A2A"
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
  },
  button: {
    marginBottom: 7, 
  }
})

export default NewsfeedDetailsScreen;
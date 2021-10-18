// screens/CategoryDetailsScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class CategoryDetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      category_name: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('product category').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const category = res.data();
        this.setState({
          key: res.id,
          category_name: category.category_name,
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

  updateCategory() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('product category').doc(this.state.key);
    updateDBRef.set({
      category_name: this.state.category_name,
    }).then((docRef) => {
      this.setState({
        key: '',
        category_name: '',
        isLoading: false,
      });
      
      this.props.navigation.navigate('Category');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteCategory() {
    const dbRef = firebase.firestore().collection('product category').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Category removed from database')
          this.props.navigation.navigate('Category');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Category',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteCategory()},
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
              placeholder={'Name of Category'}
              value={this.state.category_name}
              onChangeText={(val) => this.inputValueUpdate(val, 'category_name')}
          />
        </View>
        <br></br>
        <br></br>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateCategory()} 
            color="#19AC52"
          />
          </View>
          <br></br>
         <View>
          <Button
            title='Delete'
           onPress={this.openTwoButtonAlert}
          // onPress={() => this.deleteCategory()} 
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

export default CategoryDetailsScreen;
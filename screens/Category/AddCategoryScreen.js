// screens/AddCategoryScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class AddCategoryScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('product category');
    this.state = {
      category_name: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeCategory() {
    if(this.state.category_name === ''){
     alert('Fill category name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        category_name: this.state.category_name,
      }).then((res) => {
        this.setState({
          category_name: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Category')
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
              placeholder={'Name of Category'}
              value={this.state.category_name}
              onChangeText={(val) => this.inputValueUpdate(val, 'category_name')}
          />
        </View>
        <br></br>
        <br></br>
        <View style={styles.button}>
          <Button
            title='Add Category'
            onPress={() => this.storeCategory()} 
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

export default AddCategoryScreen;
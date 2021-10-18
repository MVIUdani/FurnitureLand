// screens/AddProductScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class AddProductScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('products');
    this.state = {
      name: '',
      price: '',
      subcategory_name: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeProduct() {
    if(this.state.name === ''){
     alert('Fill product name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        price: this.state.price,
        subcategory_name:this.state.subcategory_name,
      }).then((res) => {
        this.setState({
          name: '',
          price: '',
          subcategory_name: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Product')
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
              placeholder={'Name of Product'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Price of Product'}
              value={this.state.price}
              onChangeText={(val) => this.inputValueUpdate(val, 'price')}
          />
        </View>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Subcategory of Product'}
              value={this.state.subcategory_name}
              onChangeText={(val) => this.inputValueUpdate(val, 'subcategory_name')}
          />
        </View>
        <br></br>
        <br></br>
        <View style={styles.button}>
          <Button
            title='Add Product'
            onPress={() => this.storeProduct()} 
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

export default AddProductScreen;
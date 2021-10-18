// screens/ProductDetailsScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class ProductDetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      subcategory_name: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('products').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const product = res.data();
        this.setState({
          key: res.id,
          name: product.name,
          price: product.price,
          subcategory_name: product.subcategory_name,
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

  updateProduct() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('products').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      price: this.state.price,
      subcategory_name: this.state.subcategory_name,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        price: '',
        subcategory_name: '',
        isLoading: false,
      });
      
      this.props.navigation.navigate('Product');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteProduct() {
    const dbRef = firebase.firestore().collection('products').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('Product');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Product',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteProduct()},
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
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Price'}
              value={this.state.price}
              onChangeText={(val) => this.inputValueUpdate(val, 'price')}
          />
        </View>
        <br></br>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Subcategory'}
              value={this.state.subcategory_name}
              onChangeText={(val) => this.inputValueUpdate(val, 'subcategory_name')}
          />
        </View>
        <br></br>
        <br></br>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateProduct()} 
            color="#19AC52"
          />
          </View>
          <br></br>
         <View>
          <Button
            title='Delete'
           onPress={this.openTwoButtonAlert}
          // onPress={() => this.deleteProduct()} 
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

export default ProductDetailsScreen;
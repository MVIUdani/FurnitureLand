// screens/SubcategoryDetailsScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class SubcategoryDetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      subcategory_name: '',
      category_name: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('product subcategory').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const subcategory = res.data();
        this.setState({
          key: res.id,
          subcategory_name: subcategory.subcategory_name,
          category_name:subcategory.category_name,
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

  updateSubcategory() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('product subcategory').doc(this.state.key);
    updateDBRef.set({
      subcategory_name: this.state.subcategory_name,
      category_name: this.state.category_name,
    }).then((docRef) => {
      this.setState({
        key: '',
        subcategory_name: '',
        category_name: '',
        isLoading: false,
      });
      
      this.props.navigation.navigate('Subcategory');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteSubcategory() {
    const dbRef = firebase.firestore().collection('product subcategory').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Subcategory removed from database')
          this.props.navigation.navigate('Subcategory');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Subcategory',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteSubcategory()},
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
              placeholder={'Name of Subcategory'}
              value={this.state.subcategory_name}
              onChangeText={(val) => this.inputValueUpdate(val, 'subcategory_name')}
          />
        </View>
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
            onPress={() => this.updateSubcategory()} 
            color="#19AC52"
          />
          </View>
          <br></br>
         <View>
          <Button
            title='Delete'
           onPress={this.openTwoButtonAlert}
          // onPress={() => this.deleteSubcategory()} 
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

export default SubcategoryDetailsScreen;
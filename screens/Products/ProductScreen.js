// screens/ProductScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebase';

class ProductScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('products');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, price, subcategory_name} = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        price,
        subcategory_name,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
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
       <Button
        onPress={() => this.props.navigation.navigate('Add Product')}
        title='Go to Add Product'
       // color='#fff'
      />
      <br></br>
          {
            this.state.userArr.map((item, i) => {
              return (
            <ListItem key={i} bottomDivider button onPress={() => {
                    this.props.navigation.navigate('Product Details', {
                      userkey: item.key
                    });
                  }}>
        
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
            </ListItem>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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

export default ProductScreen;
// screens/SubcategoryScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebase';

class SubcategoryScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('product subcategory');
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
      const { subcategory_name, category_name} = res.data();
      userArr.push({
        key: res.id,
        res,
        subcategory_name,
        category_name,
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
        onPress={() => this.props.navigation.navigate('Add Subcategory')}
        title='Go to Add Subcategory'
       // color='#fff'
      />
      <br></br>
          {
            this.state.userArr.map((item, i) => {
              return (
            <ListItem key={i} bottomDivider button onPress={() => {
                    this.props.navigation.navigate('Subcategory Details', {
                      userkey: item.key
                    });
                  }}>
        
        <ListItem.Content>
          <ListItem.Title>{item.subcategory_name}</ListItem.Title>
          <ListItem.Subtitle>{item.category_name}</ListItem.Subtitle>
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

export default SubcategoryScreen;
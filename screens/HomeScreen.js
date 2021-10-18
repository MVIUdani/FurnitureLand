import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, ImageBackground} from 'react-native';

import { IconButton } from '../components';
import Firebase from '../database/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import {HomeStack} from '../navigation/HomeStack';
import Images from '../config/images';

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    /*<ImageBackground source={Images.background} style={styles.background} />*/
    
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome To Furniture Land</Text>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.text}>
       Hi Manager
      <br></br> 
      {user.email}
      </Text>
      <br></br> 
      <ImageBackground source={Images.background} style={styles.background} />
      <br></br>
      <br></br>
       <Button
        onPress={() => navigation.navigate('Employee')}
        title='Manage Employees'
        color='#492D25'
      />
      <br></br>
       <Button
        onPress={() => navigation.navigate('Product')}
        title='Manage Products'
        color='#492D25'
      />
      <br></br>
      <Button
        onPress={() => navigation.navigate('Category')}
        title='Manage Categories'
        color='#492D25'
      />
      <br></br>
      <Button
        onPress={() => navigation.navigate('Subcategory')}
        title='Manage Subcategories'
        color='#492D25'
      />
      <br></br>
       <Button
        onPress={() => navigation.navigate('Newsfeed')}
        title='Manage Newsfeed'
        color='#492D25'
      />
      <br></br>
       <Button
        onPress={() => navigation.navigate('Photo Gallery')}
        title='View Photo Gallery'
        color='#492D25'
      />
      <br></br>
      <br></br>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   /* backgroundColor: '#e93b81',*/
    backgroundColor: '#BD8E4A',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});
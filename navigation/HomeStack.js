import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AddEmployeeScreen from '../screens/Employees/AddEmployeeScreen';
import EmployeeScreen from '../screens/Employees/EmployeeScreen';
import EmployeeDetailsScreen from '../screens/Employees/EmployeeDetailsScreen';
import AddProductScreen from '../screens/Products/AddProductScreen';
import ProductScreen from '../screens/Products/ProductScreen';
import ProductDetailsScreen from '../screens/Products/ProductDetailsScreen';
import AddNewsfeedScreen from '../screens/Newsfeed/AddNewsfeedScreen';
import NewsfeedScreen from '../screens/Newsfeed/NewsfeedScreen';
import NewsfeedDetailsScreen from '../screens/Newsfeed/NewsfeedDetailsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import AddCategoryScreen from '../screens/Category/AddCategoryScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import CategoryDetailsScreen from '../screens/Category/CategoryDetailsScreen';
import AddSubcategoryScreen from '../screens/Subcategory/AddSubcategoryScreen';
import SubcategoryScreen from '../screens/Subcategory/SubcategoryScreen';
import SubcategoryDetailsScreen from '../screens/Subcategory/SubcategoryDetailsScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator //headerMode='none'
     screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Add Employee' component={AddEmployeeScreen} />
      <Stack.Screen name='Employee' component={EmployeeScreen} />
      <Stack.Screen name='Employee Details' component={EmployeeDetailsScreen} />
      <Stack.Screen name='Add Product' component={AddProductScreen} />
      <Stack.Screen name='Product' component={ProductScreen} />
      <Stack.Screen name='Product Details' component={ProductDetailsScreen} />
      <Stack.Screen name='Add Newsfeed' component={AddNewsfeedScreen} />
      <Stack.Screen name='Newsfeed' component={NewsfeedScreen} />
      <Stack.Screen name='Newsfeed Details' component={NewsfeedDetailsScreen} />
      <Stack.Screen name='Photo Gallery' component={GalleryScreen} />
      <Stack.Screen name='Add Category' component={AddCategoryScreen} />
      <Stack.Screen name='Category' component={CategoryScreen} />
      <Stack.Screen name='Category Details' component={CategoryDetailsScreen} />
      <Stack.Screen name='Add Subcategory' component={AddSubcategoryScreen} />
      <Stack.Screen name='Subcategory' component={SubcategoryScreen} />
      <Stack.Screen name='Subcategory Details' component={SubcategoryDetailsScreen} />
      
    </Stack.Navigator>
  );
}
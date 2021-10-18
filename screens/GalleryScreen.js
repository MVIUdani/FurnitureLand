import React, { useState} from 'react';
import { Image, FlatList } from 'react-native'
 
export default function GalleryScreen() {
 
  const [images, setimages] = useState([
    require('../assets/images/image1.jpg'),
    require('../assets/images/image2.jpg'),
    require('../assets/images/image3.jpg'),
    require('../assets/images/image4.jpg'),
    require('../assets/images/image5.jpg'),
    require('../assets/images/image6.jpg'),
    require('../assets/images/image7.jpg'),
    require('../assets/images/image8.jpg'),
    require('../assets/images/image9.jpg'),
    require('../assets/images/image10.jpg'),
    require('../assets/images/image11.jpg'),
    require('../assets/images/image12.jpg')
  ]);

  return (
    <FlatList
      data={images}
      key={"2"}
      numColumns={2}
      renderItem={({ item }) => (
        <Image
          source={item}
          style={{
            width: 180,
            height: 220,
            borderWidth: 2,
            borderColor: "#c35547",
           // resizeMode: "contain",
            margin: 6,
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    />
  );

  }
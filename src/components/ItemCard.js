import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BASE_URL } from '../services/api'


export default function ItemCard({item, onPress}){
  console.log("Item Image url : ", item.primary_image )

  const image_url = item.primary_image.replace("https://127.0.0.1:8000",BASE_URL)
  console.log("New Url : ", image_url)
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{uri:image_url}}
        style={{flex:5, height:'auto',width:'auto'}}
        resizeMode='cover'
      />
      <Text style={{flex:1}}>{item.title}</Text>
      <Text style={{flex:2}}>{item.description}</Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    card:{
        borderWidth:2,
        borderRadius:10,
        height:500,
        width:'93%',
        padding:5,
        margin:12
    }
})
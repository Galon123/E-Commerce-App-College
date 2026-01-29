import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BASE_URL } from '../services/api'


export default function ItemCard({item, onPress}){
  console.log("Item Image url : ", item.primary_image )

  const image_url = item.primary_image.replace("https://127.0.0.1:8000",BASE_URL)
  console.log("New Url : ", image_url)
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{uri:image_url}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.price}>₹{item.price}</Text>

        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
      </View>
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
    },
    image: {
        flex: 5,
        width: '100%',
        borderRadius: 8,
    },
    textContainer: {
        flex: 3,
        paddingTop: 5,
        // justifyContent: 'space-between' // Optional: spreads items out vertically
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#333',
        marginTop:2
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00b894',
        marginTop: 2,
    },
    description: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    }
})
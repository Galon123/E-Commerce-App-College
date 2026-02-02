import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../services/api';

export default function ItemDetailScreen({ route, navigation }) {

  const { item } = route.params;


  let imageUrl = item.primary_image;
  if (imageUrl) {
      imageUrl = imageUrl.replace("https://127.0.0.1:8000", BASE_URL);
      imageUrl = imageUrl.replace("https://localhost:8000", BASE_URL);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
        />

        <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionHeader}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>


      <View style={styles.footer}>
        <Button title="Buy" onPress={() => console.log("Buy : ", item.id)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 20, color: '#00b894', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  description: { fontSize: 16, color: '#555', lineHeight: 24 },
  footer: { marginBottom:20, padding: 20, borderTopWidth: 1, borderTopColor: '#eee' }
});
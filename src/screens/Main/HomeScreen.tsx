import { Ionicons } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard';
import colors from '../../constants/colors';
import api from '../../services/api';


export default function FeedScreen ({ navigation }){

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = async() =>{
        setIsLoading(true);
        try{
            const response = await api.get("/items/feed")
            setItems(response.data);
        }
        catch(error){
            console.log("Error fetching Data : ",error);
            Alert.alert("Feed not retrievable")
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchItems()
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            // 1. Set the Title
            headerTitle: "Feed", 
            
            // 2. Add a "Cart" button on the right
            headerRight: () => (
                <TouchableOpacity 
                    onPress={() => console.log("Go to Cart")} 
                    style={{ marginRight: 15 }} // Add spacing so it's not stuck to the edge
                >
                    <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
            ),

            // Optional: Style the header background
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000', // Color of back button and title
        });
    }, [navigation]);

    if(isLoading){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }


    return(
        <SafeAreaView>
            <FlatList
                data={items}
                renderItem={({ item })=>(
                    <ItemCard
                        item={item}
                        onPress={()=>console.log("Clicked Item : ", item.title)}
                    />
                )}
                keyExtractor={(item)=>item.id.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard';
import colors from '../../constants/colors';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function FeedScreen (){

    const { logout } = useContext(AuthContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchItems = async() =>{
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

    const handleRefresh = async() => {
        setIsRefreshing(true);
        await fetchItems();
        setIsRefreshing(false);
    }

    useEffect(()=>{
        fetchItems()
    },[])
    

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
                ListHeaderComponent={
                    <View style={styles.topBar}>
                        <Text style={styles.headerText}>MarketPlace</Text>
                        <TouchableOpacity style={{alignSelf:'center',backgroundColor:'red'}} onPress={()=>logout()}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    
            }
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
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topBar:{
        justifyContent:'space-between',
        borderWidth:2,
        borderRadius:10,
        margin:5,
        padding:5,
        flexDirection:'row'
    },
    headerText:{
        fontSize:38,
        fontWeight:'bold'
    }
})
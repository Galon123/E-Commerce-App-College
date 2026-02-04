import { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function FeedScreen ({ navigation }){

    const { logout } = useContext(AuthContext);

    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false)

    const [hasMoreData, setHasMoreData] = useState(true);
    const [onEndReachedCalledDuringMomentum, setMomentumFlag] = useState(true);


    const fetchItems = async (skipVal = 0) => {
        try {
            // Call API: "Give me 10 items, skipping the first X"
            const response = await api.get(`/items/feed?skip=${skipVal}&limit=10`);
            const newItems = response.data;

            if (newItems.length === 0) {
                setHasMoreData(false); // No more data left in DB
            } else {
                if (skipVal === 0) {
                    setItems(newItems); // Refresh: Replace all
                } else {
                    setItems(prev => [...prev, ...newItems]); // Append: Add to end
                }
            }
        } catch (error) {
            console.log("Error fetching feed:", error);
            if (skipVal >0)
                setHasMoreData(false);
            Alert.alert("Error", "Could not load feed.");
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    };


   // Triggered when User Pulls Down
    const handleRefresh = useCallback(() => {
        setHasMoreData(true);
        setIsLoading(true); // Show refresh spinner
        fetchItems(0); // Reset to 0
    }, []);

    // Triggered when User Hits Bottom
    const loadMore = useCallback(() => {
        // GUARD CLAUSES:
        // 1. Don't load if we are already loading
        // 2. Don't load if we know DB is empty
        // 3. Don't load if the user didn't actually scroll (The Lock)
        if (isFetchingMore || isLoading || !hasMoreData || onEndReachedCalledDuringMomentum) {
            return;
        }

        setIsFetchingMore(true);
        fetchItems(items.length); // Use current length as the Skip value
    }, [isFetchingMore, isLoading, hasMoreData, onEndReachedCalledDuringMomentum, items.length]);

    useEffect(()=>{
        fetchItems()
    },[])
    

const renderFooter = () => {
        if (!isFetchingMore) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
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
                keyExtractor={(item, index) => item.id.toString() + index} // Unique key
                renderItem={({ item }) => (
                    <ItemCard 
                        item={item} 
                        onPress={() => navigation.navigate('ItemDetail', { item })} 
                    />
                )}
                
                // 🟢 REFRESH PROPS
                refreshing={isRefreshing}
                onRefresh={handleRefresh}

                // 🟢 PAGINATION PROPS
                onEndReached={loadMore}
                onEndReachedThreshold={0.5} // Load when half a screen away from bottom
                
                // 🔒 THE MOMENTUM LOCK
                // When user starts scrolling, unlock the function
                onMomentumScrollBegin={() => setMomentumFlag(false)} 

                // 🟢 FOOTER (Loading Spinner)
                ListFooterComponent={renderFooter}
                
                // Styles
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
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
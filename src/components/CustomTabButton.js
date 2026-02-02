import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'


export default function CustomTabButton({children, onPress}){
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.button}>
            <Ionicons name='add' size={30} color='#fff'/>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        top:-5,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary || 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
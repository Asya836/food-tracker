import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext } from 'react'
import Food from '../components/Food';
import { FoodContext } from '../context/FoodContext';

export default function HomePage({ navigation }) {

    const [selectedButton, setSelectedButton] = useState('Tümü');
    const { foods, getFilteredFoods } = useContext(FoodContext);
    const filteredFoods = getFilteredFoods(selectedButton);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Buzdolabım</Text>
            </View>
            <View>
                <Text style={styles.totalText}>Toplam {foods.length} ürün</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setSelectedButton('Tümü')} style={[styles.filterButton, { marginLeft: 20, backgroundColor: selectedButton === 'Tümü' ? '#3091c1' : '#ffffff' }]}>
                    <Text style={[styles.buttonText, selectedButton === 'Tümü' && { color: '#ffffff' }]}>Tümü</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedButton('Yaklaşan')} style={[styles.filterButton, { marginLeft: 10, backgroundColor: selectedButton === 'Yaklaşan' ? '#3091c1' : '#ffffff' }]}>
                    <Text style={[styles.buttonText, selectedButton === 'Yaklaşan' && { color: '#ffffff' }]}>Yaklaşan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedButton('Geçmiş')} style={[styles.filterButton, { marginLeft: 10, backgroundColor: selectedButton === 'Geçmiş' ? '#3091c1' : '#ffffff' }]}>
                    <Text style={[styles.buttonText, selectedButton === 'Geçmiş' && { color: '#ffffff' }]}>Geçmiş</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}>
                {filteredFoods.length === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16, color: '#999' }}>
                            Henüz ürün eklenmemiş
                        </Text>
                    </View>
                ) : (
                    filteredFoods.map((food) => (
                        <Food key={food.id} food={food} navigation={navigation} />
                    ))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('AddFood')}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#3091c1',
        padding: 30,
        paddingTop: 55,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 26,
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
    },
    totalText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
    },
    filterButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontFamily: 'Montserrat_700Bold',
        color: '#1b1d1e',
        fontSize: 16,
    },
    fabButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3091c1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    fabText: {
        fontSize: 50,
        color: '#ffffff',
        fontFamily: 'Montserrat_700Bold',
        lineHeight: 60,
        textAlign: 'center',
        includeFontPadding: false,
    }

})
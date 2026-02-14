import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { FoodContext } from '../context/FoodContext';

export default function Food({ food, navigation }) {
    const { getDaysRemaining } = useContext(FoodContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    const daysRemaining = getDaysRemaining(food.expiryDate);

    const getStatusText = () => {
        if (daysRemaining < 0) {
            return `❌ ${Math.abs(daysRemaining)} gün geçti`;
        } else if (daysRemaining === 0) {
            return '⚠️ Bugün son gün';
        } else if (daysRemaining <= 7) {
            return `⏳ ${daysRemaining} gün kaldı`;
        } else {
            return `✅ ${daysRemaining} gün kaldı`;
        }
    };

    const getStatusColor = () => {
        if (daysRemaining < 0) return '#a02830';
        if (daysRemaining <= 7) return '#e67e22';
        return '#249639';
    };

    return (
        <View>
            <View style={{ backgroundColor: '#ffffff', padding: 15, marginHorizontal: 15, marginVertical: 8, borderRadius: 8, flexDirection: 'row', borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 22, marginBottom: 5 }}>{food.name}</Text>
                    <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 18, marginBottom: 3 }}>Son kullanma: <Text style={{ fontFamily: 'Montserrat_700Bold' }}>{formatDate(food.expiryDate)}</Text></Text>
                    <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 17, color: getStatusColor() }}>{getStatusText()}</Text>
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('FoodDetail', { foodId: food.id })}>
                        <Text style={{ fontSize: 25, fontFamily: 'Montserrat_700Bold', color: '#a0b0b8' }}>ᐳ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FoodContext } from '../context/FoodContext';

export default function FoodDetailPage({ navigation, route }) {
    const { foodId } = route.params;
    const { foods, updateFood, deleteFood, getDaysRemaining } = useContext(FoodContext);
    const food = foods.find(f => f.id === foodId);

    const [productName, setProductName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (food) {
            setProductName(food.name);
            setSelectedDate(new Date(food.expiryDate));
        }
    }, [food]);

    if (!food) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 18 }}>Ürün bulunamadı</Text>
            </View>
        );
    }

    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 1; i <= 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const formatDate = (date) => {
        if (!date) return 'Tarih Seçin';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const selectDate = (date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
    };

    const handleUpdate = async () => {
        if (!productName.trim()) {
            Alert.alert('Hata', 'Lütfen ürün adı girin');
            return;
        }
        if (!selectedDate) {
            Alert.alert('Hata', 'Lütfen son kullanma tarihi seçin');
            return;
        }

        try {
            await updateFood(foodId, {
                name: productName.trim(),
                expiryDate: selectedDate.toISOString(),
            });
            Alert.alert('Başarılı', 'Ürün başarıyla güncellendi', [
                {
                    text: 'Tamam',
                    onPress: () => navigation.goBack(),
                }
            ]);
        } catch (error) {
            Alert.alert('Hata', 'Ürün güncellenirken bir hata oluştu');
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Ürünü Sil',
            'Bu ürünü silmek istediğinize emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteFood(foodId);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Hata', 'Ürün silinirken bir hata oluştu');
                        }
                    },
                },
            ]
        );
    };

    const formatDateDisplay = (dateString) => {
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
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Ürün Detay</Text>
            </View>
            <View style={{ backgroundColor: '#ffffff', padding: 15, margin: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 22, marginBottom: 5 }}>{food.name}</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 18, marginBottom: 3 }}>Eklenme Tarihi: <Text style={{ fontFamily: 'Montserrat_700Bold' }}>{formatDateDisplay(food.createdAt)}</Text></Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 18, marginBottom: 3 }}>Son kullanma: <Text style={{ fontFamily: 'Montserrat_700Bold' }}>{formatDateDisplay(food.expiryDate)}</Text></Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 17, color: getStatusColor() }}>{getStatusText()}</Text>
            </View>
            <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 18, marginBottom: 10 }}>
                    Ürün Adı
                </Text>
                <TextInput
                    placeholder='Örn:Yumurta'
                    style={{ borderWidth: 2, borderColor: '#cac8c8', padding: 10, borderRadius: 8, fontFamily: 'Montserrat_400Regular' }}
                    value={productName}
                    onChangeText={setProductName}
                />
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 18, marginBottom: 10, marginTop: 30 }}>
                    Son Kullanma Tarihi
                </Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ borderWidth: 2, borderColor: '#cac8c8', padding: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16, color: selectedDate ? '#000' : '#999' }}>
                        {formatDate(selectedDate)}
                    </Text>
                    <Ionicons name="calendar-outline" size={30} color="#3091c1" />
                </TouchableOpacity>
            </View>

            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Tarih Seçin</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                <Ionicons name="close-circle" size={32} color="#3091c1" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.dateList}>
                            {generateDates().map((date, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dateItem}
                                    onPress={() => selectDate(date)}
                                >
                                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View>
                <TouchableOpacity
                    style={{ backgroundColor: '#249639', marginHorizontal: 20, padding: 15, borderRadius: 8, marginTop: 30 }}
                    onPress={handleUpdate}
                >
                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20, color: '#ffffff', textAlign: 'center' }}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#a02830', marginHorizontal: 20, padding: 15, borderRadius: 8, marginTop: 15 }}
                    onPress={handleDelete}
                >
                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20, color: '#ffffff', textAlign: 'center' }}>Sil</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#3091c1',
        padding: 30,
        paddingTop: 55,

    },
    headerText: {
        fontSize: 28,
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        marginLeft: 80,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 55,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold',
        color: '#1b1d1e',
    },
    dateList: {
        padding: 10,
    },
    dateItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dateText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: '#1b1d1e',
    }
})
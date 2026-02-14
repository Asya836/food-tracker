import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FoodContext } from '../context/FoodContext';

export default function AddFoodPage({ navigation }) {
    const [productName, setProductName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { addFood } = useContext(FoodContext);

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

    const handleSave = async () => {
        if (!productName.trim()) {
            Alert.alert('Hata', 'Lütfen ürün adı girin');
            return;
        }
        if (!selectedDate) {
            Alert.alert('Hata', 'Lütfen son kullanma tarihi seçin');
            return;
        }

        try {
            await addFood({
                name: productName.trim(),
                expiryDate: selectedDate.toISOString(),
            });
            Alert.alert('Başarılı', 'Ürün başarıyla eklendi', [
                {
                    text: 'Tamam',
                    onPress: () => navigation.goBack(),
                }
            ]);
        } catch (error) {
            Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Yeni Ürün Ekle</Text>
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
                    style={{ backgroundColor: '#3091c1', marginHorizontal: 20, padding: 15, borderRadius: 8, marginTop: 30 }}
                    onPress={handleSave}
                >
                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20, color: '#ffffff', textAlign: 'center' }}>Kaydet</Text>
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
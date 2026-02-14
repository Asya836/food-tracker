import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {
        try {
            const storedFoods = await AsyncStorage.getItem('foods');
            if (storedFoods) {
                setFoods(JSON.parse(storedFoods));
            }
        } catch (error) {
            console.error('Error loading foods:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveFoods = async (newFoods) => {
        try {
            await AsyncStorage.setItem('foods', JSON.stringify(newFoods));
            setFoods(newFoods);
        } catch (error) {
            console.error('Error saving foods:', error);
        }
    };

    const addFood = async (food) => {
        const newFood = {
            id: Date.now().toString(),
            name: food.name,
            expiryDate: food.expiryDate,
            createdAt: new Date().toISOString(),
        };
        const updatedFoods = [...foods, newFood];
        await saveFoods(updatedFoods);
    };

    const updateFood = async (id, updatedData) => {
        const updatedFoods = foods.map(food =>
            food.id === id ? { ...food, ...updatedData } : food
        );
        await saveFoods(updatedFoods);
    };

    const deleteFood = async (id) => {
        const updatedFoods = foods.filter(food => food.id !== id);
        await saveFoods(updatedFoods);
    };

    const getDaysRemaining = (expiryDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getFilteredFoods = (filter) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return foods.filter(food => {
            const daysRemaining = getDaysRemaining(food.expiryDate);

            if (filter === 'Tümü') {
                return true;
            } else if (filter === 'Yaklaşan') {
                return daysRemaining >= 0 && daysRemaining <= 7;
            } else if (filter === 'Geçmiş') {
                return daysRemaining < 0;
            }
            return true;
        });
    };

    return (
        <FoodContext.Provider
            value={{
                foods,
                loading,
                addFood,
                updateFood,
                deleteFood,
                getDaysRemaining,
                getFilteredFoods,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

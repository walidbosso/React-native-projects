import { FontAwesome5, Foundation } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categoryData } from '../constants/data';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();


    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');

            if (response && response.data) {
                // Filter out categories with pork
                const filteredCategories = response.data.categories.filter(category => !category.strCategory.includes('Pork'));

                setCategories(filteredCategories);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchMeals = async (category = 'beef') => {

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

            if (response && response.data) {
                setMeals(response.data.meals)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchCategories();
        fetchMeals();
    }, []);

    const ChangeCategory = (categ) => {
        fetchMeals(categ);
        setActiveCategory(categ);
        // setMeals([]);
    }


    return (
        <Animated.View
            className="flex-1 bg-white"
            entering={FadeInRight.delay(700).duration(700).springify().damping(8)}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-6"
            >
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require('../assets/logo1.png')} style={{ height: hp(5), width: wp(10) }} />
                    <FontAwesome5 name="bell" size={hp(4)} color="gray" />

                </View>

                <View className="mx-4 space-y-2 mb-2">
                    <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600" >Make your own food,</Text>
                    <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600" >
                        Stay at <Text className='font-bold text-amber-400'>Home</Text>
                    </Text>
                </View>


                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />
                    <View className="bg-white rounded-full p-3">
                        <Foundation name="magnifying-glass" size={hp(2.5)} color="gray" />
                    </View>
                </View>

                <View>
                    {<Categories categories={categories} activeCategory={activeCategory} ChangeCategory={ChangeCategory} />}
                </View>

                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>

            </ScrollView>
        </Animated.View>
    )
}

export default HomeScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

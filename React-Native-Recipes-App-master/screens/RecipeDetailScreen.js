import { AntDesign, FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetailScreen = (props) => {

    let item = props.route.params;

    const [meal, setMeal] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchMealDetails(item.idMeal);
    }, [])

    const fetchMealDetails = async (id) => {

        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    }


    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }


    const getVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (

        loading ? (
            <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">Loading ... </Text>

        ) :
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 4 }}
            >


                <View>
                    <Image
                        className="bg-gray-700"
                        source={{ uri: item.strMealThumb }}
                        style={{ width: '100%', height: hp(54), borderRadius: 32 }}
                    />
                </View>



                <View style={{ paddingHorizontal: 18, paddingVertical: 28 }} >

                    {/* name & origin */}
                    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2 my-2">
                        <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                            {meal?.strMeal}
                        </Text>
                        <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                            {meal?.strArea}
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="py-6  flex-row justify-around">
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <AntDesign name="clockcircleo" size={24} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                    35
                                </Text>
                                <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                    Mins
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <FontAwesome5 name="users" size={24} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                    03
                                </Text>
                                <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <SimpleLineIcons name="fire" size={24} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                    103
                                </Text>
                                <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <MaterialIcons name="tag-faces" size={24} color="black" />

                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">

                                </Text>
                                <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                    Easy
                                </Text>
                            </View>
                        </View>
                    </Animated.View>



                     {/* Ingredients */}
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="my-2 space-y-6">
                        <Text style={{ fontSize: hp(2.5) }} className=" font-bold  text-neutral-700">
                            Ingredients
                        </Text>
                        <View className="space-y-2 ml-3">
                            {
                                ingredientsIndexes(meal).map(i => {
                                    return (
                                        <View key={i} className="flex-row space-x-4">
                                            <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                className="bg-amber-300 rounded-full" />
                                            <View className="flex-row space-x-2">
                                                <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                                                <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </Animated.View>


                    {/* Instructions */}
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="my-2 space-y-4">
                        <Text style={{ fontSize: hp(2.5) }} className="font-bold text-neutral-700">
                            Instructions
                        </Text>
                        <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                            {
                                meal?.strInstructions
                            }
                        </Text>
                    </Animated.View>

                    {
                        meal.strYoutube &&
                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.7) }} className='font-semibold' >
                                See how to make this tasty meal
                            </Text>
                            <View >
                                <YoutubeIframe
                                    videoId={getVideoId(meal.strYoutube)}
                                    height={hp(30)}
                                />
                            </View>
                        </View>

                    }

                </View>
            </ScrollView>
    )
}

export default RecipeDetailScreen
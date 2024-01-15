import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
// import { CachedImage } from '../helpers/image';
import MasonryList from '@react-native-seoul/masonry-list';
import Recipe from './Recipe';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({ categories, meals }) => {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-white">
            <Text className="px-4 font-semibold text-lg text-neutral-600">All Meals</Text>

            <View>
                {
                    (categories.length == 0 || meals.length == 0) ? (
                        <Text>Loading ...</Text>
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <Recipe item={item} index={i} navigation={navigation} />}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }
            </View>
        </View>
    )
}



export default Recipes;
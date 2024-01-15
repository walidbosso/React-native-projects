import React from 'react'
import { Text, Pressable, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { BounceIn } from 'react-native-reanimated';
const Recipe = ({item, index, navigation}) => {

    return (
        <Animated.View entering={BounceIn.delay(index * 100).duration(700).springify().damping(12)}>
            <Pressable
                style={{width: '100%', padding:8}}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('RecipeDetails', { ...item })}
            >
                <Image 
                    className="bg-gray-700"
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%5==0? hp(25): hp(35), borderRadius: 32}}
                />

                <Text style={{ fontSize: hp(1.5) }} className="font-bold ml- text-neutral-700">
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 24) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}

export default Recipe
import React, { useEffect } from 'react'
import { Button, Image, StatusBar, View } from 'react-native'
import { Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {

    const ringpadding1 = useSharedValue(0);
    const ringpadding2 = useSharedValue(0);

    const navigation =useNavigation();

    useEffect(()=> {
        ringpadding1.value = 0;
        ringpadding2.value = 0;

        setTimeout(() => {
            ringpadding1.value = withSpring(ringpadding1.value+ hp(5))
        }, 100);

        setTimeout(() => {
            ringpadding2.value = withSpring(ringpadding2.value+ hp(5.5))
        }, 300);

        // setTimeout(() => navigation.navigate('Home'), 2500);
    }, [])

    return (
        <View className="flex-1 items-center justify-center space-y-10 bg-red-500" onTouchMove={()=> navigation.navigate('Home')}>
            <StatusBar style="light" />
            {/* Logo image with rings */}
            <Animated.View className=" bg-white/20 rounded-full" style={{padding: ringpadding2}} >
                <Animated.View className=" bg-white/20 rounded-full" style={{padding: ringpadding1}} >
                    <Image
                        source={require('../assets/logo1.png')}
                        style={{ width: wp(20), height:hp(10) }}
                    />

                </Animated.View>
            </Animated.View>
            <View className=" flex items-center space-y-2" >
                <Text style={{fontSize: hp(7)}} className="font-medium text-white tracking-widest">Foody</Text>
                <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">Food is always right</Text>
            </View>

        </View>
    )
}

export default WelcomeScreen
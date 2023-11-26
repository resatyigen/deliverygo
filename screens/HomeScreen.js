import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import {
    UserIcon,
    ChevronDownIcon,
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon

} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {

    const navigation = useNavigation();

    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }

        }`).then(data => {
            setFeaturedCategories(data);
        })
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                    className="w-7 h-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                    <Text className="font-bold text-xl">Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                <UserIcon size={35} color="#00CCBB" />
            </View>

            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row space-x-3 bg-gray-200 p-3 flex-1 items-center">
                    <MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput
                        placeholder='Restaurants and cuisines'
                        keyboardType='default'
                    />
                </View>

                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView
                className="bg-gray-100"
            >
                {/* Categories   */}
                <Categories />

                {/* Featured Rows */}


                {
                    featuredCategories?.map(category => (
                        <FeaturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />
                    ))
                }
                {/* 
                <FeaturedRow
                    id="123"
                    title="Featured"
                    description="Paid placement from our partners"
                />

                <FeaturedRow
                    id="1234"
                    title="Tasty Discounts"
                    description="everyone's been enjoying these juicy discounts!"
                />

                <FeaturedRow
                    id="12345"
                    title="Offers near you!"
                    description="Why not support your local restaurant tonight!"
                /> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
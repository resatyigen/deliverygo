import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "category"]
        `).then(data => {
            setCategories(data);
        })
    }, [])


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
        >
            {
                categories?.map(category => (
                    <CategoryCard
                        key={category._id}
                        imgUrl={urlFor(category.image).width(200).url()}
                        title={category.name}
                    />
                ))
            }
            {/* <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 1" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 2" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 3" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 4" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 5" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 6" />
            <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing 7" /> */}
        </ScrollView>
    )
}

export default Categories
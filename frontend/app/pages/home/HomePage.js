import React, {useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';
import {
  Button,
  Center,
  Flex,
  HStack,
  Text,
  View,
} from 'native-base';

import backgroundImage from '../../../assets/backgrounds/school.jpg';
import ApartmentCarousel from '../../components/Apartment Carousel';

function HomePage(props) {
  const {navigation} = props;


  const [data, setdata] = useState({
    listings: [],
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('https://leaslybackend.herokuapp.com/api/sublets?sort_by=date_dec').then((res) =>
      res.json().then((sublets) => {
        // Setting a data from api
        // only one listing rn, feel free to add some
        setdata({
          listings: sublets,
        });
      }),
    );
  }, []);

  const jumbo = {
    pt: '12rem',
    width: '100%',
    height: '30rem',
  };

  const titleText = {
    letterSpacing: 'sm',
    bold: true,
  };

  return (
    <View>
      <ImageBackground source={{uri: backgroundImage}} w="100%">
        <Flex {...jumbo}>
          <Center>
            <Text {...titleText} fontSize="4xl">Welcome to Leasly</Text>
            <Text {...titleText} fontSize="2xl">Find your dream apartment in San Marcos. Browse our listings and search for the perfect home with ease. Start your search today!</Text>
          </Center>
        </Flex>
      </ImageBackground>
      <ApartmentCarousel navigation={navigation} listings={data.listings}/>
      <Center>
        <HStack mt={10} space={10}>
          <Button onPress={() => navigation.navigate('addApartment')}>Create a New Listing</Button>
          <Button onPress={() => navigation.navigate('allApartments')}>View All Apartments</Button>
        </HStack>
      </Center>
    </View>
  );
}

export default HomePage;

import React from 'react';
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

function HomePage(props) {
  const {navigation} = props;

  // text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75)

  const jumbo = {
    mt: '4%',
    pt: '14rem',
    width: '100%',
    height: '40rem',
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

      {/* Carousel listing recent postings? Not necessary at all btw*/}

      {/**/}

      <Center>
        <HStack space={10}>
          <Button onPress={() => navigation.navigate('addApartment')}>Create a New Listing</Button>
          <Button onPress={() => navigation.navigate('allApartments')}>View All Apartments</Button>
        </HStack>
      </Center>
    </View>
  );
}

export default HomePage;

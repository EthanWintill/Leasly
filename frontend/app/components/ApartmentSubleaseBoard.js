import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  Box,
  Button,
  Center,
  Image,
  Text,
  VStack,
  View,
} from 'native-base';
import Carousel from 'react-native-reanimated-carousel';

const ApartmentSubleaseBoard = (props) => {
  /* ---------------------------------- Props --------------------------------- */
  const {navigation, listings} = props;

  /* ---------------------------- Utility Functions --------------------------- */
  const _renderItem = (index) => {
    const item = listings[index];
    return (
      <Center>
        <VStack space={3}
          borderRadius={5}
          h={250}
          p={50}
          ml={25}
          mr={25}>
          <Text fontSize={'xl'}>Subleases Available </Text>
          {item.subleaser_id &&
          <>
            <Image src={`data:image/png;base64,${item.image}`}/>
            <Text> {item.apartment_name}</Text>
            <Text>Poster: {item.subleaser_id}</Text>
            <Text>Floor Plan: {item.bed} bed, {item.bath} bath</Text>
            <Text>Price: ${item.rent}/month</Text>
            <Text>{item.description}</Text>
            <Button
              onPress={() => navigation.navigate('messages', {sublet: item.subleaser_id})}>
                Message
            </Button>
          </>
          }
          <Text fontSize={'xl'}>{item.title}</Text>
          <Text>{item.text}</Text>
        </VStack>
      </Center>
    );
  };

  return (
    <View flex={true} w={'100%'} h={325}>
      <Carousel
        loop
        width={Dimensions.get('window').width}
        height={325}
        autoPlay={true}
        data={listings}
        scrollAnimationDuration={1000}
        renderItem={({index}) => _renderItem(index)}
      />
    </View>
  );
};

export default ApartmentSubleaseBoard;

import React from 'react';
import './ApartmentSubleaseBoard.css';
import {useNavigation} from '@react-navigation/native';

/*
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
*/

const ApartmentSubleaseBoard = ({listings}) => {
  /* ---------------------------------- Props --------------------------------- */
  // const {navigation, listings} = props;
  const navigation = useNavigation();
  /* ---------------------------- Utility Functions --------------------------- */
  /* const _renderItem = (index) => {
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

  */

  return (
    <div className="bountyContainer">
      <p className="bountyTitle">Subleases Available </p>
      <button type="button" className="aptmntViewButton"onClick={() => {
        navigation.navigate('addApartment');
      }}> Post a Sublease </button>
      <div className="bountyView">
        {(listings.length === 0) ? <p className="noSubleases"> No Current Subleases!</p> :
          listings.map((sublet) => {
            if (sublet.subleaser_id) {
              return (
                <div className="bountyCards">
                  <img className="bountyImage" src={`data:image/png;base64,${sublet.image}`} />
                  <div className="bountyGeneral">
                    <p> {sublet.apartment_name}</p>
                    <p> Poster: {sublet.subleaser_id}</p>
                    <p> Floor Plan: {sublet.bed} bed, {sublet.bath} bath</p>
                    <p> Price: ${sublet.rent}/month</p>
                  </div>
                  <div className="bountyDescription">
                    <p> {sublet.description}</p>
                    <button type="button" className="aptmntViewButton" onClick={() => {
                      navigation.navigate('messages', {sublet: sublet.subleaser_id});
                    }}> Message </button>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default ApartmentSubleaseBoard;

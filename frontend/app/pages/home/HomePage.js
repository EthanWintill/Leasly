import React, {useState, useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {useNavigate} from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  HStack,
  Text,
  View,
} from 'native-base';

import Navbar from '../../components/Navbar';

import backgroundImage from '../../imgs/samantha-gades-fIHozNWfcvs-unsplash.jpg';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    listings: [],
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('/api/sublets?sort_by=date_dec').then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        // only one listing rn, feel free to add some
        setdata({
          listings: data,
        });
        console.log(data);
      }),
    );
  }, []);

  // text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75)

  const jumbo = {
    mt: '4%',
    pt: '14rem',
    width: '100%',
    height: '40rem',
  };

  const titleText = {
    shadowColor: 'black',
    shadowOpacity: 0.75,
    elevation: 20,
    letterSpacing: 'sm',
    bold: true,
  };

  return (
    <View>
      <div className="homeNav">
        <Navbar />
      </div>
      <ImageBackground source={{uri: backgroundImage}} w="100%">
        <Flex {...jumbo}>
          <Center>
            <Text {...titleText} fontSize="4xl">Welcome to Leasly</Text>
            <Text {...titleText} fontSize="2xl">Find your dream apartment in San Marcos. Browse our listings and search for the perfect home with ease. Start your search today!</Text>
          </Center>
        </Flex>
      </ImageBackground>

      {/* Carousel listing recent postings? Not necessary at all btw*/}

      <ul>
        {data.listings.map((apartment)=>
          <div key={apartment.rent}>
            <li>{apartment.description}</li>
          </div>,
        )}

      </ul>

      {/**/}

      <Center>
        <HStack space={10}>
          <Button onPress={() => navigate('/addapartment')}>Create a New Listing</Button>
          <Button onPress={() => navigate('/allapartments')}>View All Apartments</Button>
        </HStack>
      </Center>
    </View>
  );
}

export default HomePage;

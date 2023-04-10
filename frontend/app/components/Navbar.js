import React, {useEffect, useState} from 'react';
import {
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  View,
} from 'native-base';
import {
  auth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from '../FirebaseFuncs';
import {Divide as Hamburger} from 'hamburger-react';

import {Theme} from '../Theme';

function NavbarMenu(props) {
  const {navigation, isSignedIn} = props;
  const [isOpen, setIsOpen] = useState(false);

  const signout = () =>{
    signOut(auth).then(() => {
      navigation.navigate('home');
    }).catch((error)=>{
      console.error(error);
    });
  };

  const testAccountSignin = () =>{
    signInWithEmailAndPassword(auth, 'aguestaccount@gmail.com', 'atest123')
        .catch((error)=>{
          // eslint-disable-next-line no-alert
          alert('Test Account not available, please try again later!');
          console.error(error);
        });
  };

  return (
    <Menu placement="bottom left"
      mt={65}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      trigger={(triggerProps) => {
        return (
          <Hamburger
            color={Theme.colors.dark.gray_light}
            toggled={isOpen} toggle={setIsOpen}/>
        );
      }}>
      <Menu.Item onPress={() => navigation.navigate('home')}>Home</Menu.Item>
      {isSignedIn &&
        <Menu.Item onPress={() => navigation.navigate('profile')}>Profile</Menu.Item>
      }
      <Menu.Item onPress={() => navigation.navigate('addApartment')}>Add An Apartment</Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('allApartments')}>View Apartments</Menu.Item>
      {isSignedIn &&
        <Menu.Item onPress={() => navigation.navigate('messages')}>Messages</Menu.Item>
      }
      {isSignedIn &&
        <Menu.Item onPress={() => {
          signout();
          navigation.navigate('home');
        }}>Sign-out</Menu.Item>
      }
      {!isSignedIn &&
        <>
          <Menu.Item onPress={() => testAccountSignin()}>Test Account Sign-in</Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('signin')}>Sign-in</Menu.Item>
        </>
      }
    </Menu>
  );
}

export default function Navbar(props) {
  const {navigation} = props;
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsSignedIn(user);
    });
  }, []);

  return (
    <View variant="accented" h={75}>
      <HStack alignItems="center">
        <HStack ml={5} alignItems="center" justifyContent="flex-start">
          <NavbarMenu isSignedIn={isSignedIn} {...props}/>
          <Button variant="unstyled"
            ml={5}
            _text={{
              fontSize: '4xl',
              letterSpacing: 'sm',
              bold: true,
            }}
            onPress={() => navigation.navigate('home')}>
              Leasly
          </Button>
        </HStack>
        {isSignedIn &&
          <Image margin-left={'auto'} right={0} size={50} borderRadius={100} source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}} alt="Profile_Image"/>
        }
      </HStack>
    </View>
  );
}

export {
  Navbar,
};


import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Center,
  Checkbox,
  Divider,
  Heading,
  Icon,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {
  GoogleMap,
  BicyclingLayer,
  TransitLayer,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

import Draggable from 'react-native-draggable';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';

import useEffectAfterMount from '../../hooks/AfterMountHook';
import MapStyle from './MapStyle';

function MapUserOptions(props) {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isPOICollapsed, setIsPOICollapsed] = useState(false);
  const [height, setHeight] = useState(160);

  const {mapPOIs, setMapPOIs} = props;

  const toggle = (state) => {
    return state === 'off' ? 'on' : 'off';
  };

  return (
    <Draggable >
      <VStack variant={'accented'} rounded={10} w={150} h={height} ml={5} mt={75}>
        <Pressable
          mt={2}
          mr={2}
          alignSelf={'flex-end'}
          onPress={() => setIsMenuCollapsed(!isMenuCollapsed)}>
          <Icon as={MaterialCommunityIcons} name="arrow-collapse" />
        </Pressable>
        <Collapsible collapsed={isMenuCollapsed}>
          <VStack>
            <Pressable ml={5} mt={1} onPress={() => setIsPOICollapsed(!isPOICollapsed)}>
              <Text bold fontSize={'xl'}>POIs</Text>
            </Pressable>
            <Divider />
            <Collapsible collapsed={isPOICollapsed}>
              <Box ml={5} mt={2.5} mb={5}>
                <Checkbox colorScheme="red"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="ticket" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.attraction': toggle(old['poi.attraction']),
                    }));
                  }}
                  defaultIsChecked>
                  Attraction
                </Checkbox>
                <Checkbox colorScheme="orange"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="handshake-outline" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.business': toggle(old['poi.business']),
                    }));
                  }}
                  defaultIsChecked>
                  Business
                </Checkbox>
                <Checkbox colorScheme="yellow"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="account-group-outline" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.government': toggle(old['poi.government']),
                    }));
                  }}
                  defaultIsChecked>
                  Government
                </Checkbox>
                <Checkbox colorScheme="green"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="medical-bag" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.medical': toggle(old['poi.medical']),
                    }));
                  }}
                  defaultIsChecked>
                  Medical
                </Checkbox>
                <Checkbox colorScheme="blue"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="tree" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.park': toggle(old['poi.park']),
                    }));
                  }}
                  defaultIsChecked>
                  Park
                </Checkbox>
                <Checkbox colorScheme="indigo"
                  size="md"
                  icon={<Icon as={<MaterialCommunityIcons name="peace" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.place_of_worship': toggle(old['poi.place_of_worship']),
                    }));
                  }}
                  defaultIsChecked>
                  Religion
                </Checkbox>
                <Checkbox colorScheme="violet"
                  size="md" icon={<Icon as={<MaterialCommunityIcons name="school" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.school': toggle(old['poi.school']),
                    }));
                  }}
                  defaultIsChecked>
                  School
                </Checkbox>
                <Checkbox colorScheme="gray"
                  size="md" icon={<Icon as={<MaterialCommunityIcons name="school" />} />}
                  onPress={() => {
                    setMapPOIs((old) => ({
                      ...old,
                      'poi.sports_complex': toggle(old['poi.sports_complex']),
                    }));
                  }}
                  defaultIsChecked>
                  School
                </Checkbox>
              </Box>
            </Collapsible>
          </VStack>
        </Collapsible>
      </VStack>
    </Draggable>
  );
}

export default function MapPage() {
  /* --------------------------------- States --------------------------------- */
  // Map
  const [hasLocationPerms, setHasLocationPerms] = useState(true);
  const [map, setMap] = useState(null);
  const [mapPOIs, setMapPOIs] = useState({
    'poi.attraction': 'on',
    'poi.business': 'on',
    'poi.government': 'on',
    'poi.medical': 'on',
    'poi.park': 'on',
    'poi.place_of_worship': 'on',
    'poi.school': 'on',
    'poi.sports_complex': 'on',
  });

  // Location
  const [userLocation, setUserLocation] = useState();
  const [userLocationMap, setUserLocationMap] = useState({lat: 0, lng: 0});

  /* ---------------------------- Utility Functions --------------------------- */
  // Load API
  const {isLoaded, loadError} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDuDlAlIKsMkjv-VFiWL4yYkQIbs3akKMw',
  });

  const getUserLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    let location = null;
    if (status !== 'granted') {
      setHasLocationPerms(false);
    } else {
      location = await Location.getCurrentPositionAsync({});
    }
    return location;
  };

  /* -------------------------------- Callbacks ------------------------------- */
  const updateMapPosition = useCallback(async () => {
    if (map !== null) {
      const oldZoom = map.getZoom();
      const bounds = new window.google.maps.LatLngBounds(userLocationMap);
      map.fitBounds(bounds);
      map.setZoom(oldZoom);
    }
  }, [map, userLocationMap]);

  const onMapLoad = useCallback((map) => {
    setMap(map);
    updateMapPosition();
  }, [updateMapPosition]);

  /* --------------------------------- Events --------------------------------- */
  // Get the user's location
  useEffect(() => {
    (async () => {
      setUserLocation(await getUserLocation());
    })();
  }, []);

  // On user location change
  useEffectAfterMount(() => {
    setUserLocationMap({
      lat: userLocation !== null || typeof (userLocation) !== 'undefined' ?
          userLocation.coords.latitude : 0,
      lng: userLocation !== null || typeof (userLocation) !== 'undefined' ?
          userLocation.coords.longitude : 0,
    });
  }, [userLocation]);

  // Update map location
  useEffectAfterMount(() => {
    updateMapPosition();
  }, [userLocationMap]);

  /* ------------------------------ Map Component ----------------------------- */
  // Component properties
  const mapProps = {
    width: '100%',
    height: '100%',
  };

  // Google-Maps specific style options
  const mapStyle = MapStyle.concat(
      [
        {
          featureType: 'poi.attraction',
          stylers: [
            {
              'visibility': mapPOIs['poi.attraction'],
            },
          ],
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              'visibility': mapPOIs['poi.business'],
            },
          ],
        },
        {
          featureType: 'poi.government',
          stylers: [
            {
              'visibility': mapPOIs['poi.government'],
            },
          ],
        },
        {
          featureType: 'poi.medical',
          stylers: [
            {
              'visibility': mapPOIs['poi.medical'],
            },
          ],
        },
        {
          featureType: 'poi.park',
          stylers: [
            {
              'visibility': mapPOIs['poi.park'],
            },
          ],
        },
        {
          featureType: 'poi.place_of_worship',
          stylers: [
            {
              'visibility': mapPOIs['poi.place_of_worship'],
            },
          ],
        },
        {
          featureType: 'poi.school',
          stylers: [
            {
              'visibility': mapPOIs['poi.school'],
            },
          ],
        },
        {
          featureType: 'poi.sports_complex',
          stylers: [
            {
              'visibility': mapPOIs['poi.sports_complex'],
            },
          ],
        },
      ]);

  return (
    <View>
      <Center flex={true} alignItems={'center'} w={'100%'} h={'100%'}>
        {isLoaded && hasLocationPerms &&
            <GoogleMap
              mapContainerStyle={mapProps}
              onLoad={onMapLoad}
              options={{styles: mapStyle}}
              zoom={15}
              clickableIcons={false}>
              <BicyclingLayer/>
              <TransitLayer />
              <Marker position={userLocationMap} cursor={'Current Location'}/>
              <MapUserOptions mapPOIs={mapPOIs} setMapPOIs={setMapPOIs}/>
            </GoogleMap>
        }
        {!isLoaded && hasLocationPerms &&
          <>
            <Spinner accessibilityLabel="Loading map" />
            <Heading fontSize="md">Loading...</Heading>
          </>
        }
        {!isLoaded && !hasLocationPerms &&
            <Text>You need to allow location services to use this feature.</Text>
        }
        {loadError &&
            <Text>Something is WRONG.</Text>
        }
      </Center>
    </View>
  );
}

import React, {useCallback, useEffect, useState} from 'react';
import {
  AlertDialog,
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Text,
  View,
} from 'native-base';
import {
  GoogleMap,
  BicyclingLayer,
  TransitLayer,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

import * as Location from 'expo-location';

import useEffectAfterMount from '../../hooks/AfterMountHook';
import MapStyle from './MapStyle';
import MapMenu from './MapMenu';

const RESPONSES = [
  require('./poi/response10000-0.json'),
  require('./poi/response10000-1.json'),
  require('./poi/response10000-2.json'),
];

const MAPS_LIBRARIES = ['places'];

function MapMarker(props) {
  const {
    info,
    marker,
    allApartmentsArr,
    navigation,
  } = props;
  const [infoVisible, setInfoVisible] = useState(false);

  let apartment = Object.values(allApartmentsArr).filter((apt) => apt.name === info.name);
  if (apartment.length >= 1) {
    apartment = apartment[0];
  }

  return (
    <>
      <Marker onClick={() => setInfoVisible(true)} {...marker}/>
      <AlertDialog isOpen={infoVisible} onClose={() => setInfoVisible(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{info.name}</AlertDialog.Header>
          <AlertDialog.Body>
            <Text>Rating: {info.rating}/5</Text>
            <Text>Tagged: {info.types.toString()}</Text>
          </AlertDialog.Body>
          {!Array.isArray(apartment) &&
            <AlertDialog.Footer>
              <Button onPress={() => {
                setInfoVisible(false);
                navigation.navigate('viewApartment', {apartment});
              }}>
                View Apartment
              </Button>
            </AlertDialog.Footer>
          }
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

export default function MapPage(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {navigation} = props;

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
  const [mapStyle, setMapStyle] = useState(MapStyle.concat([
    {
      featureType: 'poi.attraction',
      stylers: [{'visibility': mapPOIs['poi.attraction']}]},
    {
      featureType: 'poi.business',
      stylers: [{'visibility': mapPOIs['poi.business']}],
    },
    {
      featureType: 'poi.government',
      stylers: [{'visibility': mapPOIs['poi.government']}],
    },
    {
      featureType: 'poi.medical',
      stylers: [{'visibility': mapPOIs['poi.medical']}],
    },
    {
      featureType: 'poi.park',
      stylers: [{'visibility': mapPOIs['poi.park']}],
    },
    {
      featureType: 'poi.place_of_worship',
      stylers: [{'visibility': mapPOIs['poi.place_of_worship']}],
    },
    {
      featureType: 'poi.school',
      stylers: [{'visibility': mapPOIs['poi.school']}],
    },
    {
      featureType: 'poi.sports_complex',
      stylers: [{'visibility': mapPOIs['poi.sports_complex']}],
    },
  ]));
  const [aptMarkersVisible, setAptMarkersVisible] = useState(true);

  // Location
  const [userLocation, setUserLocation] = useState();
  const [userLocationMap, setUserLocationMap] = useState({lat: 0, lng: 0});

  // Listings
  const [allApartmentsArr, setAllApartmentsArr] = useState([]);

  /* ---------------------------- Utility Functions --------------------------- */
  // Load API
  const {isLoaded, loadError} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDuDlAlIKsMkjv-VFiWL4yYkQIbs3akKMw',
    libraries: MAPS_LIBRARIES,
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

  // Update map styles
  useEffectAfterMount(() => {
    setMapStyle(MapStyle.concat([
      {
        featureType: 'poi.attraction',
        stylers: [{'visibility': mapPOIs['poi.attraction']}]},
      {
        featureType: 'poi.business',
        stylers: [{'visibility': mapPOIs['poi.business']}],
      },
      {
        featureType: 'poi.government',
        stylers: [{'visibility': mapPOIs['poi.government']}],
      },
      {
        featureType: 'poi.medical',
        stylers: [{'visibility': mapPOIs['poi.medical']}],
      },
      {
        featureType: 'poi.park',
        stylers: [{'visibility': mapPOIs['poi.park']}],
      },
      {
        featureType: 'poi.place_of_worship',
        stylers: [{'visibility': mapPOIs['poi.place_of_worship']}],
      },
      {
        featureType: 'poi.school',
        stylers: [{'visibility': mapPOIs['poi.school']}],
      },
      {
        featureType: 'poi.sports_complex',
        stylers: [{'visibility': mapPOIs['poi.sports_complex']}],
      },
    ]));
  }, [mapPOIs]);

  // Update google map styles
  useEffectAfterMount(() => {
    const oldZoom = map.getZoom();
    map.setOptions({styles: mapStyle});
    map.setZoom(oldZoom);
  }, [mapStyle]);

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('https://leaslybackend.herokuapp.com/api/apartments').then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setAllApartmentsArr(data);
      }),
    );
  }, []);


  /* ------------------------------ Map Component ----------------------------- */
  // Component properties
  const mapProps = {
    width: '100%',
    height: '100%',
  };

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
              {
                RESPONSES.map((json, key) => {
                  return (
                    <React.Fragment key={key}>
                      {
                        json.results.map((r, k) => {
                          return (
                            <MapMarker
                              key={k}
                              navigation={navigation}
                              allApartmentsArr={allApartmentsArr}
                              marker={{
                                visible: aptMarkersVisible,
                                position: {lat: r.geometry.location.lat, lng: r.geometry.location.lng},
                              }}
                              info={{
                                name: r.name,
                                rating: r.rating,
                                types: r.types,
                              }}/>
                          );
                        })
                      }
                    </React.Fragment>
                  );
                })
              }
              <MapMenu
                mapPOIs={mapPOIs}
                setMapPOIs={setMapPOIs}
                setAptMarkersVisible={setAptMarkersVisible}/>
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

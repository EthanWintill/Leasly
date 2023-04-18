import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Autocomplete} from '@react-google-maps/api';

import Draggable from 'react-native-draggable';
import Collapsible from 'react-native-collapsible';

import FormBuilders from '../../components/builders/form/FormBuilders';
import FormSections from '../../components/builders/form/FormSections';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useEffectAfterMount from '../../hooks/AfterMountHook';

function PointsOfInterestSection(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {setMapPOIs} = props;

  /* ---------------------------- Utility Functions --------------------------- */
  const toggle = (state) => {
    return state === 'off' ? 'on' : 'off';
  };

  /* -------------------------------- Callbacks ------------------------------- */
  const mapPOICallback = useCallback((poi) => {
    setMapPOIs((old) => ({
      ...old,
      [poi]: toggle(old[poi]),
    }));
  }, [setMapPOIs]);

  /* -------------------------------- Component ------------------------------- */
  return (
    <>
      <Text bold fontSize={'xl'} ml={5} mt={5}>
        POIs
      </Text>
      <Divider/>
      {
        FormBuilders.Vertical(
            {
              form: {
                vstack: {
                  ml: 5,
                  mt: 2.5,
                  mb: 5,
                },
              },
            })
            .addSection(
                'checkbox',
                FormSections.Checkbox()
                    .check(
                        'Attraction',
                        () => mapPOICallback('poi.attraction'),
                        [],
                        {
                          colorScheme: 'red',
                          icon: 'ticket',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Business',
                        () => mapPOICallback('poi.business'),
                        [],
                        {
                          colorScheme: 'orange',
                          icon: 'handshake-outline',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Government',
                        () => mapPOICallback('poi.government'),
                        [],
                        {
                          colorScheme: 'yellow',
                          icon: 'account-group-outline',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Medical',
                        () => mapPOICallback('poi.medical'),
                        [],
                        {
                          colorScheme: 'green',
                          icon: 'medical-bag',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Park',
                        () => mapPOICallback('poi.park'),
                        [],
                        {
                          colorScheme: 'blue',
                          icon: 'tree',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Religion',
                        () => mapPOICallback('poi.place_of_worship'),
                        [],
                        {
                          colorScheme: 'indigo',
                          icon: 'peace',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'School',
                        () => mapPOICallback('poi.school'),
                        [],
                        {
                          colorScheme: 'violet',
                          icon: 'school',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    )
                    .check(
                        'Sports',
                        () => mapPOICallback('poi.sports_complex'),
                        [],
                        {
                          colorScheme: 'gray',
                          icon: 'soccer',
                          size: 'md',
                          defaultIsChecked: true,
                        },
                    ))
            .build()
      }
    </>
  );
}

function LocationSection(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {locations} = props;

  /* --------------------------------- States --------------------------------- */
  // Locations
  const [dynamicLocations, setDynamicLocations] = useState(locations);

  /* -------------------------------- Component ------------------------------- */
  return (
    <>
      <VStack>
        <Text bold fontSize={'xl'} ml={5} mt={5}>
          Locations
        </Text>
        <Divider/>
        <Center mt={2}>
          <Button.Group isAttached mx={{
            base: 'auto',
            md: 0,
          }} size="xs">
            <Button>Walk</Button>
            <Button>Drive</Button>
            <Button>Bike</Button>
            <Button>Transit</Button>
          </Button.Group>
        </Center>
        <Box mt={2}>
          {dynamicLocations &&
          Object.keys(dynamicLocations).map((title, key) => {
            return (
              <HStack ml={2} mt={2} space={5} key={key}>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="secondary"
                  onPress={() => setDynamicLocations(Object.fromEntries(Object.entries(dynamicLocations).filter(([k]) => k !== title)))}>
                    Remove
                </Button>
                <Text fontSize={'2xl'}>{title}</Text>
              </HStack>
            );
          })
          }
          <AddLocationButton
            setDynamicLocations={setDynamicLocations}
            icon={{
              size: 'md',
              alignSelf: 'flex-start',
              ml: dynamicLocations ? 0 : 2}} />
        </Box>
      </VStack>
    </>
  );
}

function AddLocationButton(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {setDynamicLocations} = props;
  const {icon} = props;

  /* ---------------------------------- Refs ---------------------------------- */
  // Focus
  const initialFocusRef = useRef(null);

  /* ---------------------------------- State --------------------------------- */
  // Place
  const [autocomplete, setAutocomplete] = useState(null);

  // Form
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  /* -------------------------------- Callbacks ------------------------------- */
  const onAutocompleteLoad = useCallback((ac) => {
    setAutocomplete(ac);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      setAddress(autocomplete.getPlace());
    } else {
      console.error('Autocomplete is not loaded yet!');
    }
  }, [autocomplete]);

  /* -------------------------------- Component ------------------------------- */
  return (
    <>
      <IconButton
        {...icon}
        onPress={() => setIsOpen(true)}
        _icon={{
          as: MaterialCommunityIcons,
          name: 'plus-circle',
        }} />
      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}>
        <Modal.Content w={'25%'}>
          <Modal.CloseButton/>
          <Modal.Header>Add Location</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                value={title}
                ref={initialFocusRef}
                onChangeText={(val) => setTitle(val)}/>
              <FormControl.Label>Address</FormControl.Label>
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}>
                <Input onChangeText={(val) => setAddress(val)}/>
              </Autocomplete>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setTitle('');
                  setAddress('');
                  setIsOpen(false);
                }}>
                Cancel
              </Button>
              <Button onPress={() => {
                setDynamicLocations((old) => ({
                  ...old,
                  [title]: address,
                }));
                setTitle('');
                setAddress('');
                setIsOpen(false);
              }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

function ApartmentSection(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {setAptMarkersVisible} = props;

  /* ---------------------------------- State --------------------------------- */
  const [toggle, setToggle] = useState(true);

  /* --------------------------------- Events --------------------------------- */
  // Toggle change
  useEffectAfterMount(() => {
    setAptMarkersVisible(toggle);
  }, [toggle]);

  /* -------------------------------- Component ------------------------------- */
  return (
    <>
      <Text bold fontSize={'xl'} ml={5} mt={5}>
        Apartments
      </Text>
      <Divider/>
      {

        FormBuilders.Vertical(
            {
              form: {
                vstack: {
                  ml: 5,
                  mt: 2.5,
                  mb: 5,
                },
              },
            })
            .addSection(
                'checkbox',
                FormSections.Checkbox()
                    .check(
                        'Toggle',
                        setToggle,
                        [],
                        {
                          colorScheme: 'red',
                          icon: 'home-city',
                          size: 'md',
                          defaultIsChecked: true,
                        }))
            .build()
      }
    </>
  );
}

export default function MapMenu(props) {
  /* ---------------------------------- Props --------------------------------- */
  const {setMapPOIs, setAptMarkersVisible} = props;

  /* --------------------------------- States --------------------------------- */
  // Collapsible
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  /* -------------------------------- Component ------------------------------- */
  return (
    <Box ml={5} mt={100}>
      <Draggable>
        <ScrollView>
          <Button
            mb={5}
            onPress={() => setIsMenuCollapsed(!isMenuCollapsed)}>
          Toggle Menu
          </Button>
          <Collapsible collapsed={isMenuCollapsed}>
            <Center w={200}>
              <Box variant={'accented'} rounded={10} w={175} h={550}>
                <LocationSection />
                <PointsOfInterestSection setMapPOIs={setMapPOIs}/>
                <ApartmentSection setAptMarkersVisible={setAptMarkersVisible}/>
              </Box>
            </Center>
          </Collapsible>
        </ScrollView>
      </Draggable>
    </Box>
  );
}

export {
  MapMenu,
};

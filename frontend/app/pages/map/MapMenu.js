import React, {useCallback, useState} from 'react';
import {
  Divider,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import Draggable from 'react-native-draggable';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import FormBuilders from '../../components/builders/form/FormBuilders';

export default function MapMenu(props) {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isPOICollapsed, setIsPOICollapsed] = useState(false);
  const [height, setHeight] = useState(160);

  const {mapPOIs, setMapPOIs} = props;

  const toggle = (state) => {
    return state === 'off' ? 'on' : 'off';
  };

  const mapPOICallback = useCallback((poi) => {
    setMapPOIs((old) => ({
      ...old,
      [poi]: toggle(old[poi]),
    }));
  }, [setMapPOIs]);

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
                    .addCheckbox(
                        FormBuilders.Checkbox()
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
            </Collapsible>
          </VStack>
        </Collapsible>
      </VStack>
    </Draggable>
  );
}

export {
  MapMenu,
};

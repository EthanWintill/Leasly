import React from 'react';
import {Text, View, Center, VStack} from 'native-base';

export default function HomePage() {
  return (
    <View w="100%" h="100%">
      <Center w="90%" mt="5">
        <VStack space="3">
          <Text>Leasly HomePage</Text>
        </VStack>
      </Center>
    </View>
  );
}

export {HomePage};

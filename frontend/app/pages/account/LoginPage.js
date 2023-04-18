import {React, useState} from 'react';
import {Box, Button, Center, HStack, Heading, Text, View} from 'native-base';
import {auth, signInWithEmailAndPassword} from '../../util/FirebaseFuncs';

import useEffectAfterMount from '../../hooks/AfterMountHook';
import FormBuilders from '../../components/builders/form/FormBuilders';
import FormSections from '../../components/builders/form/FormSections';

export default function LoginPage(props) {
  const {navigation} = props;

  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginFailed, setLoginFailed] = useState(false);

  useEffectAfterMount(() => {
    if (loginFailed) {
      setLoginFailed(false);
    }
  }, [email, password]);

  /**
   * Logs a user in based on form data.
   *
   * @return {String|null} The error message if error is present, and
   * null of absent.
   */
  const login = async () =>{
    let noError = true;
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          navigation.navigate('home');
        })
        .catch((err) => {
          console.error(`${err.code}: ${err.message}`);
          noError = false;
        });
    return noError;
  };

  // Use builder to create form
  const LoginForm = new FormBuilders.Vertical(
      {
        form: {
          vstack: {
            space: 3,
            mt: 5,
          },
        },
        box: {
          variant: 'rounded_25_accent',
          maxW: 500,
          w: '90%',
          p: 10,
        },
        vstack: {
          space: 3,
          mt: 5,
        },
      })
      .setHeader(
          <Box>
            <Heading size={'lg'} fontWeight={'semibold'}>Welcome</Heading>
            <Heading mt={1} size={'xs'} fontWeight={'medium'}>Sign-in to continue!</Heading>
          </Box>,
      )
      .setFooter(
          <HStack justifyContent={'center'} mt={4}>
            <Text fontSize={'sm'}>Don't have an account? </Text>
            <Button variant={'link'} py={0} onPress={() => navigation.navigate('signup')}>Sign-up</Button>
          </HStack>,
      )
      .addSection(
          'input',
          FormSections.Input({invalidConditions: {
            'login': () => loginFailed,
          }})
              .addLabel('Email')
              .addTextInput(setEmail, ['login'], {isRequired: true})
              .addLabel('Password')
              .addPasswordInput(setPassword, ['login'], {isRequired: true})
              .addError('Please enter a valid email and password.', ['login']),
      )
      .addButton(
          'Forgot Password?',
          {
            variant: 'link',
            px: 0,
            py: 0,
            justifyContent: 'flex-start',
          })
      .addButton(
          'Sign in',
          {
            mt: 5,
            onPress: () => {
              (async () => {
                const allowed = email.length > 0 &&
                  password.length > 0;
                if (allowed && await login()) {
                  navigation.navigate('home');
                } else {
                  setLoginFailed(true);
                }
              })();
            },
          })
      .addButton(
          'Cancel',
          {
            onPress: () => {
              navigation.navigate('home');
            },
          })
      .build();

  return (
    <View>
      <Center w={'100%'} h={'100%'}>
        {LoginForm}
      </Center>
    </View>
  );
}

export {
  LoginPage,
};

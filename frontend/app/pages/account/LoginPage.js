import {React, useState} from 'react';
import {View} from 'native-base';
import {auth, signInWithEmailAndPassword} from '../../util/FirebaseFuncs';

import FormBuilders from '../../components/builders/form/FormBuilders';

export default function LoginPage(props) {
  const {navigation} = props;

  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [databaseError, setDatabaseError] = useState(false);

  /**
   * Logs a user in based on form data.
   *
   * @return {String|null} The error message if error is present, and
   * null of absent.
   */
  const login = async () =>{
    let error = false;
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          navigation.navigate('home');
        })
        .catch((err) => {
          console.error(`${err.code}: ${err.message}`);
          error = true;
        });
    return error;
  };

  // Use builder to create form
  const AccountForm = new FormBuilders.AccountForm(
      {
        form: {
          control: {
            isInvalid: databaseError,
          },
          vstack: {
            space: 3,
            mt: 5,
          },
        },
        center: {
          w: '100%',
          h: '100%',
        },
        box: {
          safeArea: true,
          p: 10,
          py: 8,
          w: '90%',
          maxW: 500,
          variant: 'rounded_25_accent',
        },
        vstack: {
          space: 3,
          mt: 5,
        },
      })
      .setHeader(
          'Welcome',
          {
            size: 'lg',
            fontWeight: 'semibold',
          },
          'Sign in to continue!',
          {
            mt: 1,
            fontWeight: 'medium',
            size: 'xs',
          },
      )
      .addForm(
          {
            elements: [
              {
                element: 'label',
                text: 'Email',
                props: {
                  mt: 2,
                },
              },
              {
                element: 'input',
                props: {
                  type: 'text',
                  isRequired: true,
                  onChangeText: (text) => {
                    setEmail(text);
                  },
                },
              },
              {
                element: 'label',
                text: 'Password',
              },
              {
                element: 'input',
                props: {
                  type: 'password',
                  isRequired: true,
                  onChangeText: (text) => {
                    setPassword(text);
                  },
                },
              },
              {
                element: 'error',
                text: 'Please enter a valid email and password.',
              },
            ],
          },
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
              if (!databaseError) {
                const allowed = email.length > 0 &&
                password.length > 0;
                if (allowed) {
                  login().then((error) => {
                    setDatabaseError(error);
                  });
                }
              }
            },
          })
      .setFooter(
          'Don\'t have an account? ',
          {
            fontSize: 'sm',
          },
          'Sign Up',
          {
            variant: 'link',
            py: 0,
            onPress: () => {
              navigation.navigate('signup');
            },
          },
          {
            mt: 4,
            justifyContent: 'center',
          },
      )
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
      {AccountForm}
    </View>
  );
}

export {
  LoginPage,
};

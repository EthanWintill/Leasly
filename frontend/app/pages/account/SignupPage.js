import React, {useState} from 'react';
import {View} from 'native-base';
import {auth, createUserWithEmailAndPassword} from '../../util/FirebaseFuncs';

import useEffectAfterMount from '../../hooks/AfterMountHook';
import FormBuilders from '../../components/builders/form/FormBuilders';

export default function SignupPage(props) {
  const {navigation} = props;

  // Form Data
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verifiers
  const MIN_PASSWORD_LENGTH = 8;
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordGoodLength, setPasswordGoodLength] = useState(true);
  const [databaseError, setDatabaseError] = useState(false);

  // Events
  useEffectAfterMount(() => {
    setPasswordsMatch(confirmPassword.length === 0 || password === confirmPassword);
  }, [password, confirmPassword]);

  useEffectAfterMount(() => {
    setPasswordGoodLength(password.length === 0 || password.length >= MIN_PASSWORD_LENGTH);
  }, [password]);

  useEffectAfterMount(() => {
    if (databaseError) {
      setDatabaseError(false);
    }
  }, [email, username, password, confirmPassword]);

  /**
   * Creates a user in firebase based on the form data.
   */
  const signup = async () => {
    let error = false;
    await createUserWithEmailAndPassword(auth)
        .then((userCredential) => {
          const userData = {
            email: email,
            password: password,
            username: username,
            userId: userCredential.user.uid, // add user ID to data object
          };

          fetch('https://leaslybackend.herokuapp.com/api/signup',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigation.navigate('home');
              })
              .catch((err) => {
                console.error(err);
                error = true;
              });
        })
        .catch((err) => {
          console.error(`${err.code}: ${err.message}`);
          error = true;
        });
    return error;
  };

  // Use builder to create form
  const AccountForm = FormBuilders.AccountForm(
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
          'Sign up to continue!',
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
                text: 'Username',
              },
              {
                element: 'input',
                props: {
                  type: 'text',
                  isRequired: true,
                  onChangeText: (text) => {
                    setUsername(text);
                  },
                },
              },
              {
                element: 'group',
                form: {
                  isInvalid: !passwordsMatch,
                },
                elements: [
                  {
                    element: 'group',
                    form: {
                      isInvalid: !passwordGoodLength,
                    },
                    elements: [
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
                        text: 'Passwords must be at least 8 characters.',
                      },
                    ],
                  },
                  {
                    element: 'label',
                    text: 'Confirm Password',
                  },
                  {
                    element: 'input',
                    props: {
                      type: 'password',
                      isRequired: true,
                      onChangeText: (text) => {
                        setConfirmPassword(text);
                      },
                    },
                  },
                  {
                    element: 'error',
                    text: 'Passwords must match.',
                  },
                ],
              },
              {
                element: 'error',
                text: 'Please enter a valid email and password.',
              },
            ],
          },
      )
      .addButton(
          'Sign up',
          {
            mt: 5,
            onPress: () => {
              const allowed = passwordsMatch &&
                passwordGoodLength &&
                email.length > 0 &&
                username.length > 0 &&
                password.length > 0 &&
                confirmPassword.length > 0;
              if (allowed) {
                signup().then((error) => {
                  setDatabaseError(error);
                });
              }
            },
          })
      .addButton(
          'Cancel',
          {
            onPress: () => {
              navigation.navigate('home');
            },
          })
      .setFooter(
          'Already have an account? ',
          {
            fontSize: 'sm',
          },
          'Sign In',
          {
            variant: 'link',
            py: 0,
            onPress: () => {
              navigation.navigate('signin');
            },
          },
          {
            mt: 4,
            justifyContent: 'center',
          },
      )
      .build();

  // Create final component
  return (
    <View>
      {AccountForm}
    </View>
  );
}

export {
  SignupPage,
};

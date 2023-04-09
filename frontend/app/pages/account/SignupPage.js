
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {View} from 'native-base';
import {auth, createUserWithEmailAndPassword} from '../../FirebaseFuncs';

import useEffectAfterMount from '../../hooks/AfterMountHook';
import FormBuilders from '../../components/builders/form/FormBuilders';

export default function SignupPage({navigation}) {
  const navigate = useNavigate();

  // Form Data
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verifiers
  const MIN_PASSWORD_LENGTH = 8;
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordPassesChecksum, setPasswordPassesChecksum] = useState(true);

  // Events
  useEffectAfterMount(() => {
    setPasswordsMatch(confirmPassword.length === 0 || password === confirmPassword);
  }, [password, confirmPassword]);

  useEffectAfterMount(() => {
    setPasswordPassesChecksum(password.length === 0 || password.length >= MIN_PASSWORD_LENGTH);
  }, [password]);

  /**
   * Creates a user in firebase based on the form data.
   */
  const createUser = () => {
    createUserWithEmailAndPassword(auth)
        .then((userCredential) => {
          const userData = {
            email: email,
            password: password,
            username: username,
            userId: userCredential.user.uid, // add user ID to data object
          };

          fetch(
              '/api/signup',
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
                navigate('/');
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ': ' + errorMessage);
          document.querySelector('#errorField').innerHTML = 'Please enter a valid email and password';
        });
  };

  // Use builder to create form
  const AccountForm = FormBuilders.AccountForm(
      {
        form: {
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
                    console.log(`Email: ${email}`);
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
                    console.log(`Username: ${username}`);
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
                      isInvalid: !passwordPassesChecksum,
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
                            console.log(`Password: ${email}`);
                            setPassword(text);
                          },
                        },
                      },
                      {
                        element: 'error',
                        text: 'Passwords must be longer than 8 characters.',
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
                        console.log(`Email: ${email}`);
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
            ],
          },
      )
      .addButton(
          'Sign up',
          {
            mt: 5,
            onPress: () => {
              if (passwordsMatch && passwordPassesChecksum && password.length > 0 && confirmPassword.length > 0) {
                createUser();
                navigate('/');
              }
            },
          })
      .addButton(
          'Cancel',
          {
            onPress: () => {
              navigate('/');
            },
          })
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

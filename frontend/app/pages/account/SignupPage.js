import React, {useState} from 'react';
import {Box, Button, Center, HStack, Heading, Text, View} from 'native-base';
import {auth, createUserWithEmailAndPassword, updateProfile, db} from '../../util/FirebaseFuncs';
import{ doc, setDoc} from "firebase/firestore"


import useEffectAfterMount from '../../hooks/AfterMountHook';
import FormBuilders from '../../components/builders/form/FormBuilders';

export default function SignupPage(props) {
  const {navigation} = props;

  /* -------------------------------- Form data ------------------------------- */
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /* ------------------------------- Form states ------------------------------ */
  const MIN_PASSWORD_LENGTH = 8;
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordGoodLength, setPasswordGoodLength] = useState(true);
  const [signupFailed, setSignupFailed] = useState(false);

  /* --------------------------------- Events --------------------------------- */
  // On password change
  useEffectAfterMount(() => {
    setPasswordGoodLength(password.length >= MIN_PASSWORD_LENGTH);
    if (password.length > 0 && confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      if (!passwordsMatch) {
        setPasswordsMatch(true);
      }
    }
  }, [password]);

  // On confirmed password change
  useEffectAfterMount(() => {
    if (password.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      if (!passwordsMatch) {
        setPasswordsMatch(true);
      }
    }
  }, [confirmPassword]);

  // On any change
  useEffectAfterMount(() => {
    if (signupFailed) {
      setSignupFailed(false);
    }
  }, [email, username, password, confirmPassword]);

  /**
   * Creates a user in firebase based on the form data.
   */
  const signup = async () => {
    let error = false;
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          updateProfile(auth.currentUser,{
            displayName: username,
          }).catch((error)=>{
            console.log({error})
          })
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
                createMsgDoc();
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

  /*get username, create document with that name in userData collection, and a field 
    * IMPORTANT field must follow this EXACT formula or it will reset the document everytime there is a write
    * user(map).Inbox(array).(map).conversation(array).(map).UID(string).message(string)
    * the map after inbox needs fields conversation and senderID(string) */
  const createMsgDoc = async () =>{
    const dataStruc ={
      user:{
        Inbox: [
          {
            conversation: [
              
              
            ],
            
          }
        ]
      }
    }
    await setDoc(doc(db,"userData", username), dataStruc);

  }
  // Use builder to create form
  const SignupForm = FormBuilders.Vertical(
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
            <Heading size={'lg'} fontWeight={'semibol'}>Welcome</Heading>
            <Heading mt={1} size={'xs'} fontWeight={'medium'}>Sign-up to continue!</Heading>
          </Box>,
      )
      .setFooter(
          <HStack justifyContent={'center'} mt={4}>
            <Text fontSize={'sm'}>Already have an account? </Text>
            <Button variant={'link'} py={0} onPress={() => navigation.navigate('signin')}>Sign-in</Button>
          </HStack>,
      )
      .addFormGroup(
          FormBuilders.Group({invalidConditions: {
            'signup': () => signupFailed,
            'pass_matches': () => !passwordsMatch,
            'pass_length': () => !passwordGoodLength,
          }})
              .addLabel('Email')
              .addTextInput(setEmail, ['signup'], {isRequired: true})
              .addLabel('Username')
              .addTextInput(setUsername, ['signup'], {isRequired: true})
              .addLabel('Password')
              .addPasswordInput(setPassword, ['signup', 'pass_matches', 'pass_length'], {isRequired: true})
              .addError('Your password must be 8 characters or longer.', ['pass_length'])
              .addLabel('Confirm Password')
              .addPasswordInput(setConfirmPassword, ['signup', 'pass_matches'], {isRequired: true})
              .addError('Passwords do not match!', ['pass_matches'])
              .addError('Failed to sign-up.', ['signup']),
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
              if (allowed && signup()) {
                navigation.navigate('home');
              } else {
                setSignupFailed(true);
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
      .build();

  // Create final component
  return (
    <View>
      <Center w={'100%'} h={'100%'}>
        {SignupForm}
      </Center>
    </View>
  );
}

export {
  SignupPage,
};

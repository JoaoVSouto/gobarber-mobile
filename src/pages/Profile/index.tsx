import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker/src';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Button, Input, UserImage } from '../../components';

import {
  Container,
  Header,
  HeaderTitle,
  UserAvatarContainer,
  UserAvatarButton,
  PasswordGroup,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [isKeyboardOff, setIsKeyboardOff] = useState(true);

  useEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOff(false);
    });

    const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOff(true);
    });

    return () => {
      Keyboard.removeSubscription(keyboardDidShowSub);
      Keyboard.removeSubscription(keyboardDidHideSub);
    };
  }, []);

  const handleUpdateUser = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => val,
            then: Yup.string().min(
              6,
              'Senha é preciso ter no mínimo 6 caracteres',
            ),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => val,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const { data: userData } = await api.put('profile', formData);

        updateUser(userData);

        Alert.alert(
          'Perfil atualizado',
          'Suas informações do perfil foram atualizadas com sucesso!',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api
          .patch('users/avatar', data)
          .then(res => {
            updateUser(res.data);
          })
          .catch(() => {
            Alert.alert(
              'Erro na atualização',
              'Ocorreu um erro ao atualizar seu avatar, tente novamente.',
            );
          });
      },
    );
  }, [updateUser, user.id]);

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Header>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#999591" />
        </TouchableOpacity>

        <HeaderTitle>Meu Perfil</HeaderTitle>

        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="power" size={24} color="#999591" />
        </TouchableOpacity>
      </Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container isKeyboardOpen={!isKeyboardOff}>
            <UserAvatarContainer>
              <UserImage url={user.avatar_url} alt={user.name} width={186} />

              <UserAvatarButton onPress={handleUpdateAvatar}>
                <Icon name="camera" size={20} color="#312E38" />
              </UserAvatarButton>
            </UserAvatarContainer>

            <Form
              ref={formRef}
              onSubmit={handleUpdateUser}
              initialData={{ name: user.name, email: user.email }}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <PasswordGroup>
                <Input
                  ref={oldPasswordInputRef}
                  name="old_password"
                  icon="lock"
                  placeholder="Senha atual"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />

                <Input
                  ref={passwordInputRef}
                  name="password"
                  icon="lock"
                  placeholder="Nova senha"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    confirmPasswordInputRef.current?.focus();
                  }}
                />

                <Input
                  ref={confirmPasswordInputRef}
                  name="password_confirmation"
                  icon="lock"
                  placeholder="Confirmar senha"
                  secureTextEntry
                  textContentType="newPassword"
                  returnKeyType="send"
                  onSubmitEditing={submitForm}
                />
              </PasswordGroup>

              <Button onPress={submitForm}>Confirmar mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

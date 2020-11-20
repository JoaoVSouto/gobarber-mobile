import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';

import { Button, Input } from '../../components';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().min(
          6,
          'Senha é preciso ter no mínimo 6 caracteres',
        ),
      });

      await schema.validate(data, { abortEarly: false });

      // const { name, email, password } = data;

      // await api.post('users', { name, email, password });

      // history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      );
    }
  }, []);

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
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
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={submitForm}
              />

              <Button onPress={submitForm}>Cadastrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {isKeyboardOff && (
        <BackToSignInButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInButtonText>Voltar para o login</BackToSignInButtonText>
        </BackToSignInButton>
      )}
    </>
  );
};

export default SignUp;

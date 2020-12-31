import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import { UserImage } from '../../components';

import { Container, Header, BackButton, HeaderTitle } from './styles';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();

  const navigation = useNavigation();

  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Agendamento</HeaderTitle>

        <UserImage url={user.avatar_url} alt={user.name} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;

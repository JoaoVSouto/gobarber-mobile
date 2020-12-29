import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { UserImage } from '../../components';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserImage url={user.avatar_url} alt={user.name} />
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;

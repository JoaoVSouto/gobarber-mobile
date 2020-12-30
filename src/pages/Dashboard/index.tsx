import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { UserImage } from '../../components';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url?: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    (async () => {
      const { data: providersData } = await api.get('providers');
      setProviders(providersData);
    })();
  }, []);

  const navigateToProfile = useCallback(() => {
    // navigation.navigate('Profile');
    signOut();
  }, [signOut]);

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

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <Username>{item.name}</Username>}
      />
    </Container>
  );
};

export default Dashboard;

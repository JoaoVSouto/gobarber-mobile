import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

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
  ProvidersListTitle,
  ProviderContainer,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
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

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation],
  );

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
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <UserImage
              url={provider.avatar_url}
              alt={provider.name}
              width={72}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta isFirst>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;

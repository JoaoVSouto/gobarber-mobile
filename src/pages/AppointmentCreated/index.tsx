import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();

  const handleOkPressed = useCallback(() => {
    navigation.reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [navigation]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04D361" />

      <Title>Agendamento concluído</Title>
      <Description>
        Terça, dia 14 de março de 2020 às 12:00h com Diego Fernandes
      </Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;

/* eslint-disable import/no-duplicates */
import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/Feather';

import capitalize from '../../utils/capitalize';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
  providerName: string;
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const routeParams = params as RouteParams;

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

  const formattedDate = useMemo(
    () =>
      capitalize(
        format(
          routeParams.date,
          "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
          { locale: ptBR },
        ),
      ),
    [routeParams.date],
  );

  return (
    <Container>
      <Icon name="check" size={80} color="#04D361" />

      <Title>Agendamento concluído</Title>
      <Description>
        {formattedDate} {'\n'}
        com {routeParams.providerName}
      </Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;

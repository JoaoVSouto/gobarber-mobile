import { FlatList, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { Provider } from '.';

interface ProviderContainerProps {
  selected?: boolean;
}

interface ProviderNameProps {
  selected?: boolean;
}

interface HourProps {
  available?: boolean;
  selected?: boolean;
}

interface HourTextProps {
  selected?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${(Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 24}px;
  background-color: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View``;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 40px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background-color: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  margin-right: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
  font-size: 16px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #232129;
  font-size: 16px;
`;

export const Schedule = styled.View`
  padding: 40px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  color: #999591;
  font-family: 'RobotoSlab-Medium';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background-color: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background-color: #ff9000;
  border-radius: 10px;
  margin: 40px 24px 24px;

  justify-content: center;
  align-items: center;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;

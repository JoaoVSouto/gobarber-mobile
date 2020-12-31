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

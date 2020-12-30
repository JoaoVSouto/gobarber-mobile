import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Provider } from '.';

interface ProviderMetaProps {
  isFirst?: boolean;
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

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const Username = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 8px;
`;

export const ProvidersListTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const ProviderContainer = styled(RectButton)`
  background-color: #3e3b47;
  border-radius: 10px;
  padding: 20px 16px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 18px;
`;

export const ProviderMeta = styled.View<ProviderMetaProps>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ isFirst }) => (isFirst ? '12px' : '6px')};
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
  color: #999591;
  font-size: 12px;
`;

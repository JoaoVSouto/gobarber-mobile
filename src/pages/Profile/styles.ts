import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

interface ContainerProps {
  isKeyboardOpen?: boolean;
}

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  padding-top: ${(Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 24}px;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`;

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;

  ${({ isKeyboardOpen }) =>
    isKeyboardOpen &&
    css`
      padding-bottom: 72px;
    `}
`;

export const UserAvatarContainer = styled.View`
  position: relative;
  margin-bottom: 32px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  background-color: #ff9000;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  right: 8px;
`;

export const PasswordGroup = styled.View`
  margin: 24px 0 8px;
`;

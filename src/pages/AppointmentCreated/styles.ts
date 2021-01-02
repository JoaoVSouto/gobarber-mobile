import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 30px;
  margin-top: 24px;
  width: 200px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  margin-top: 40px;
  background-color: #ff9000;
  height: 50px;
  width: 100px;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const OkButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
  color: #312e38;
`;

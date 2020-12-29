import styled from 'styled-components/native';

interface AvatarProps {
  $width: number;
}

interface AvatarPlaceholderContainerProps {
  $width: number;
}

interface AvatarPlaceholderTextProps {
  $width: number;
}

export const Avatar = styled.Image<AvatarProps>`
  width: ${({ $width }) => $width}px;
  height: ${({ $width }) => $width}px;
  border-radius: ${({ $width }) => $width / 2}px;
`;

export const AvatarPlaceholderContainer = styled.View<
  AvatarPlaceholderContainerProps
>`
  background-color: #312e38;
  width: ${({ $width }) => $width}px;
  height: ${({ $width }) => $width}px;
  border-radius: ${({ $width }) => $width / 2}px;

  justify-content: center;
  align-items: center;
`;

export const AvatarPlaceholderText = styled.Text<AvatarPlaceholderTextProps>`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: ${({ $width }) => ($width * 35) / 100}px;
`;

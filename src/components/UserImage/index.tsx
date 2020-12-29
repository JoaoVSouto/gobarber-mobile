import React from 'react';

import getUserInitials from '../../utils/getUserInitials';

import {
  Avatar,
  AvatarPlaceholderContainer,
  AvatarPlaceholderText,
} from './styles';

interface Props {
  url?: string;
  width?: number;
  alt: string;
}

const UserImage: React.FC<Props> = ({ alt, url, width = 56 }) => {
  return url ? (
    <Avatar source={{ uri: url }} $width={width} />
  ) : (
    <AvatarPlaceholderContainer $width={width}>
      <AvatarPlaceholderText $width={width}>
        {getUserInitials(alt)}
      </AvatarPlaceholderText>
    </AvatarPlaceholderContainer>
  );
};

export default UserImage;

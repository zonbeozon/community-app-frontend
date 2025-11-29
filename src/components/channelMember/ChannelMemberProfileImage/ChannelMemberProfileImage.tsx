import { forwardRef } from 'react';
import { ChannelMemberProfileImageProps } from '@/types/channelMember.type';

export const ChannelMemberProfileImage = forwardRef<HTMLImageElement, ChannelMemberProfileImageProps>(
  ({ profile, username, className, ...rest }, ref) => {
    const imageUrl = profile?.imageUrl;
    const altText = `${username || '사용자'}의 프로필 사진`;

    if (imageUrl) {
      return <img src={imageUrl} alt={altText} className={className} ref={ref} {...rest} />;
    }

    return null;
  },
);

ChannelMemberProfileImage.displayName = 'ChannelMemberProfileImage';

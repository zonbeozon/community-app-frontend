import React from 'react';
import * as S from "./ChannelProfileImage.styles";

interface ChannelProfileImageProps extends React.ComponentPropsWithoutRef<'div'> {
  channelInfo: {
    title: string;
    profile: {
      imageUrl: string | null;
    } | null;
  };
  size: 'sm' | 'lg';
}

const ChannelProfileImage = React.forwardRef<HTMLDivElement, ChannelProfileImageProps>(
  ({ channelInfo, size, className, ...props }, ref) => {
    const firstLetter = channelInfo.title ? channelInfo.title[0].toUpperCase() : "?";
    const wrapperClass = size === 'sm' ? S.trigger.wrapper : undefined;
    const imageClass = size === 'sm' ? S.trigger.image : S.profileSection.image;
    const fallbackClass = size === 'sm' ? S.trigger.fallback : S.profileSection.fallback;

    const imageElement = (
      channelInfo.profile?.imageUrl ? (
        <img
          src={channelInfo.profile.imageUrl}
          alt={`${channelInfo.title} 채널의 프로필`}
          className={imageClass}
        />
      ) : (
        <div className={fallbackClass}>{firstLetter}</div>
      )
    );

    return (
      <div
        ref={ref}
        {...props}
        className={`${wrapperClass || ''} ${className || ''}`.trim()}
      >
        {imageElement}
      </div>
    );
  }
);

export default ChannelProfileImage;
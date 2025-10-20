import * as S from "./ChannelProfileImage.styles";

interface ChannelProfileImageProps {
  channelInfo: {
    title: string;
    profile: {
      imageUrl: string | null;
    } | null;
  };
  size: 'sm' | 'lg';
}

const ChannelProfileImage = ({ channelInfo, size }: ChannelProfileImageProps) => {
  const firstLetter = channelInfo.title ? channelInfo.title[0].toUpperCase() : "?";

  const style = {
    wrapper: size === 'sm' ? S.trigger.wrapper : undefined, 
    image: size === 'sm' ? S.trigger.image : S.profileSection.image,
    fallback: size === 'sm' ? S.trigger.fallback : S.profileSection.fallback,
  };

  const imageElement = (
    channelInfo.profile && channelInfo.profile.imageUrl ? (
      <img
        src={channelInfo.profile.imageUrl}
        alt={`${channelInfo.title} 채널의 프로필`}
        className={style.image}
      />
    ) : (
      <div className={style.fallback}>{firstLetter}</div>
    )
  );

  if (style.wrapper) {
    return <div className={style.wrapper}>{imageElement}</div>;
  }
  
  return imageElement;
};

export default ChannelProfileImage;
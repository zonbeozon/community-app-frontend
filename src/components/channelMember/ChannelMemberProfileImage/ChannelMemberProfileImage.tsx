import { ChannelMemberProfileImageProps } from "@/types/channelMember.type";
  
const ChannelMemberProfileImage = ({ profile, username, className }: ChannelMemberProfileImageProps) => {
    const imageUrl = profile?.imageUrl;
    const altText = `${username || "사용자"}의 프로필 사진`;
  
    if (imageUrl) {
      return <img src={imageUrl} alt={altText} className={className} />;
  }
};

export default ChannelMemberProfileImage;
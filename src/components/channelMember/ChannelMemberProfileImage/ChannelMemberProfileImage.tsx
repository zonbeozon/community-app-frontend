interface ChannelMemberProfileImageProps {
    profile: {
      imageUrl: string | null;
    } | null;
    username: string | null;
    className?: string; 
  }
  
const ChannelMemberProfileImage = ({ profile, username, className }: ChannelMemberProfileImageProps) => {
    const imageUrl = profile?.imageUrl;
    const altText = `${username || "사용자"}의 프로필 사진`;
    const fallbackLetter = username ? username[0].toUpperCase() : "?";
  
    if (imageUrl) {
      return <img src={imageUrl} alt={altText} className={className} />;
    }
  
    return <div className={className}>{fallbackLetter}</div>;
  };
  
export default ChannelMemberProfileImage;
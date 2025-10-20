import { Button } from '@/components/ui/button';
import { Pencil, Loader2 } from 'lucide-react';
import { useServerMemberProfileImage } from '@/hooks/servermember/useServerMemberProfileImage';
import * as S from "./ServerMemberProfileImage.styles";

const ServerMemberProfileImage = () => {
  const {
    serverMember,
    isBusy,
    fileInputRef,
    handleFileChange,
    handleEditClick,
  } = useServerMemberProfileImage();

  if (!serverMember) {
    return <div className={S.container} />;
  }

  const profileUrl = serverMember.profile?.imageUrl;
  const username = serverMember.username;
  const fallbackLetter = username ? username[0].toUpperCase() : '?';

  return (
    <>
      <div className={S.container}>
        {profileUrl ? (
          <img src={profileUrl} alt={`${username}의 프로필`} className={S.avatar} />
        ) : (
          <div className={`${S.avatar} ${S.fallback}`}>{fallbackLetter}</div>
        )}

        <Button variant="ghost" size="icon" onClick={handleEditClick} className={S.editButton} disabled={isBusy}>
          <Pencil size={16} />
        </Button>
        
        {isBusy && (
          <div className={S.loaderOverlay}>
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
      />
    </>
  );
};

export default ServerMemberProfileImage;
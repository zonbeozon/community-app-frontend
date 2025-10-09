import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import LogOutButton from "@/components/common/SignOutButton/SignOutButton";
import useDialog  from "@/hooks/common/useDialog";
import useUpdateServerMemberProfile from "@/hooks/serverMember/useUpdateServerMemberProfile";
import useUpdateServerMemberUsername from "@/hooks/serverMember/useUpdateServerMemberUsername";
import useUploadImage from "@/hooks/common/useUploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, Loader2 } from "lucide-react";
import validateServerMember from "@/validations/validateServerMember";
import * as S from "./ServerMemberInfoDialog.styles";

const ServerMemberInfoDialog = () => {
  const { data: serverMember } = useGetMyServerMember();
  const { props: dialogProps, close } = useDialog();
  const { mutate: updateProfileImage, isPending: isUpdatingProfile } = useUpdateServerMemberProfile();
  const { mutate: updateUsername, isPending: isUpdatingUsername } = useUpdateServerMemberUsername();
  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage();
  
  const username = serverMember?.username || "";
  const profile = serverMember?.profile?.imageUrl || "";

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dialogProps.open) {
      setNewUsername(username);
      setIsEditing(false);
      setError(null);
    }
  }, [dialogProps.open, username]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUsername(value);

    if (serverMember) {
      const validationErrors = validateServerMember({ ...serverMember, username: value });
      setError(validationErrors.username || null);
    }
  };

  const handleSave = () => {
    if (error || isUpdatingUsername || newUsername === username) return;

    updateUsername({ username: newUsername }, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };
  
  const startEditing = () => {
    setIsEditing(true);
    setNewUsername(username);
    setError(null);
  };

  const handleEditImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadResult = await uploadImage(file, "profile");
      if (!uploadResult) throw new Error("이미지 업로드에 실패했습니다.");
      
      const { imageId } = uploadResult;
      updateProfileImage({ imageId });
    } catch (err) {
      // Error is handled by the mutation's onError
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!serverMember) {
    return null;
  }
  
  const isBusy = isUpdatingProfile || isUploadingImage;

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <img src={profile} alt={`${username}의 프로필`} className={S.triggerImage} />
      </DialogTrigger>

      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>내 프로필</DialogTitle>
          <DialogDescription className="sr-only">
            서버 프로필을 확인하고 수정할 수 있습니다. 프로필 이미지와 사용자 이름을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className={S.contentWrapper}>
          <div className={S.avatarContainer}>
            <img src={profile} alt="내 프로필 사진" className={S.avatar} />
            <Button variant="ghost" size="icon" onClick={handleEditImageClick} className={S.editImageButton} disabled={isBusy}>
              <Pencil size={16} />
            </Button>
            {isBusy && (
              <div className={S.imageLoaderOverlay}>
                <Loader2 size={24} className="animate-spin" />
              </div>
            )}
          </div>
          
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" className={S.fileInput} disabled={isBusy} />

          <div className={S.usernameContainer}>
            {isEditing ? (
              <div className={S.editForm}>
                <div className={S.inputWrapper}>
                  <Input value={newUsername} onChange={handleUsernameChange} className={S.usernameInput} autoFocus />
                  {error && <p className={S.errorMessage}>{error}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={handleSave} className={S.saveButton} disabled={!!error || isUpdatingUsername || newUsername === username}>
                  {isUpdatingUsername ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                </Button>
              </div>
            ) : (
              <>
                <h2 className={S.username}>{username}</h2>
                <Button variant="ghost" size="icon" onClick={startEditing} className={S.editButton}>
                  <Pencil size={16} />
                </Button>
              </>
            )}
          </div>

          <div className={S.buttonContainer}>
            <div><LogOutButton /></div>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={close} className={S.closeButton}>닫기</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerMemberInfoDialog;
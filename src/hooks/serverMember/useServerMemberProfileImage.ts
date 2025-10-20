import { useRef } from 'react';
import { useAtom } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';
import useUploadImage from '@/hooks/common/image/useUploadImage';
import useUpdateServerMemberProfile from './useUpdateServerMemberProfile';

export const useServerMemberProfileImage = () => {
  const [serverMember, setServerMember] = useAtom(serverMemberAtom);
  
  const { upload: uploadImage, isUploading } = useUploadImage();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateServerMemberProfile();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !serverMember) return;

    try {
      // FormData 인스턴스를 생성하고 파일을 담습니다.
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'profile');

      // 생성된 formData를 API로 전송합니다.
      const { imageId, imageUrl } = await uploadImage(formData);
      
      updateProfile({ imageId }, {
        onSuccess: () => {
          setServerMember({
            ...serverMember,
            profile: { ...serverMember.profile, imageId, imageUrl },
          });
        }
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };
  
  return {
    serverMember,
    isBusy: isUploading || isUpdating,
    fileInputRef,
    handleFileChange,
    handleEditClick,
  };
};
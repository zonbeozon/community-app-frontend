import { useRef } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtom } from 'jotai';
import { useUploadImage } from '@/hooks/common/image/useUploadImage';
import { useUpdateServerMemberProfile } from './useUpdateServerMemberProfile';

export const useServerMemberProfileImage = () => {
  const [serverMember, setServerMember] = useAtom(serverMemberAtom);

  const { upload: uploadImage, isUploading } = useUploadImage();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateServerMemberProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !serverMember) return;

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'profile');

      const { imageId, imageUrl } = await uploadImage(formData);

      updateProfile(
        { imageId },
        {
          onSuccess: () => {
            setServerMember({
              ...serverMember,
              profile: { ...serverMember.profile, imageId, imageUrl },
            });
          },
        },
      );
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
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
